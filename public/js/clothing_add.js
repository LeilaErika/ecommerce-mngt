function addClothing() {
  // Retrieve input values from form fields
  const clothingData = {
    name: document.getElementById("name").value,
    size: document.getElementById("size").value,
    color: document.getElementById("color").value,
    material: document.getElementById("material").value,
  };

  // Basic validation for required fields
  if (
    !clothingData.name ||
    !clothingData.size ||
    !clothingData.color ||
    !clothingData.material
  ) {
    // alert("All fields are required!");
    return;
  }

  // Send the POST request
  fetch("/api/add-clothing", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(clothingData),
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.message === "Clothing item added successfully!") {
        // Show success pop-up
        showSuccessPopup();

        // Clear form fields after successful addition
        document.getElementById("name").value = "";
        document.getElementById("size").value = "XS";
        document.getElementById("color").value = "";
        document.getElementById("material").value = "";

        // Optionally close the form
        closePopup();
      } else {
        alert(data.message || "Error adding clothing item.");
      }
    })
    .catch((err) => {
      console.error("Error:", err);
      alert("Network error. Please try again later.");
    });
}

function showSuccessPopup() {
  document.getElementById("successPopup").style.display = "block";
  setTimeout(() => {
    closeSuccessPopup();
  }, 3000); // Auto-close after 3 seconds
}

function closeSuccessPopup() {
  document.getElementById("successPopup").style.display = "none";
}
