const { describe, it, before, after, beforeEach, afterEach } = require("mocha");
const { expect } = require("chai");
const chai = require("chai");
const chaiHttp = require("chai-http");
const fs = require("fs");
const path = require("path");

chai.use(chaiHttp);

const { app, server } = require("../index");

// Path to resource.json
const dataPath = path.join(__dirname, "../utils/resource.json");

let baseUrl;

describe("Clothing API", () => {
  before(async () => {
    const { address, port } = await server.address();
    baseUrl = `http://${address == "::" ? "localhost" : address}:${port}`;
  });

  after(() => {
    return new Promise((resolve) => {
      server.close(() => {
        resolve();
      });
    });
  });

  let clothingId;

  // Preserve and restore the original resource.json content
  let originalData;

  before((done) => {
    // Save the original content of resource.json
    fs.readFile(dataPath, "utf8", (err, data) => {
      if (err && err.code !== "ENOENT") return done(err);
      originalData = data ? JSON.parse(data) : [];
      done();
    });
  });

  after((done) => {
    // Restore the original content of resource.json
    fs.writeFile(dataPath, JSON.stringify(originalData, null, 2), (err) => {
      if (err) return done(err);
      done();
    });
  });

  describe("PUT /update-clothing/:id", () => {
    beforeEach((done) => {
      const sampleItem = {
        id: "test123",
        name: "Test Clothing",
        size: "M",
        color: "Red",
        material: "Cotton",
      };

      fs.readFile(dataPath, "utf8", (err, data) => {
        if (err && err.code !== "ENOENT") return done(err);
        let clothingData = data ? JSON.parse(data) : [];
        clothingData.push(sampleItem);

        fs.writeFile(dataPath, JSON.stringify(clothingData, null, 2), (err) => {
          if (err) return done(err);
          clothingId = sampleItem.id;
          done();
        });
      });
    });

    afterEach((done) => {
      fs.readFile(dataPath, "utf8", (err, data) => {
        if (err) return done(err);
        let clothingData = JSON.parse(data);
        clothingData = clothingData.filter((item) => item.id !== clothingId);

        fs.writeFile(dataPath, JSON.stringify(clothingData, null, 2), (err) => {
          if (err) return done(err);
          done();
        });
      });
    });

    it("should update an existing clothing item", (done) => {
      const updatedData = {
        name: "Updated Clothing",
        size: "L",
        color: "Blue",
        material: "Silk",
      };

      chai
        .request(baseUrl)
        .put(`/update-clothing/${clothingId}`)
        .send(updatedData)
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.have.property(
            "message",
            "Clothing item updated successfully!"
          );

          const updatedClothing = JSON.parse(fs.readFileSync(dataPath, "utf8"));
          expect(
            updatedClothing.find((item) => item.id === clothingId)
          ).to.include({
            id: clothingId,
            ...updatedData,
          });
          done();
        });
    });

    it("should return 400 if required fields are missing", (done) => {
      const incompleteData = { name: "Incomplete Clothing" };

      chai
        .request(baseUrl)
        .put(`/update-clothing/${clothingId}`)
        .send(incompleteData)
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.body).to.have.property(
            "message",
            "All fields are required!"
          );
          done();
        });
    });

    it("should return 404 if the clothing item is not found", (done) => {
      const updatedData = {
        name: "Non-existent Clothing",
        size: "L",
        color: "Green",
        material: "Wool",
      };

      chai
        .request(baseUrl)
        .put("/update-clothing/nonexistent123")
        .send(updatedData)
        .end((err, res) => {
          expect(res).to.have.status(404);
          expect(res.body).to.have.property(
            "message",
            "Clothing item not found!"
          );
          done();
        });
    });

    it("should return 500 if there is a server error", (done) => {
      const originalWriteFile = fs.writeFile;
      fs.writeFile = (path, data, callback) => {
        callback(new Error("Simulated file write error"));
      };

      const updatedData = {
        name: "Clothing with Server Error",
        size: "XL",
        color: "Black",
        material: "Polyester",
      };

      chai
        .request(baseUrl)
        .put(`/update-clothing/${clothingId}`)
        .send(updatedData)
        .end((err, res) => {
          expect(res).to.have.status(500);
          expect(res.body).to.have.property("message", "Server error");

          fs.writeFile = originalWriteFile;
          done();
        });
    });
  });
});
