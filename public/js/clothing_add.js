function addClothing() {
  const newItem = {
    name: document.getElementById("name").value,
    size: document.getElementById("size").value,
    color: document.getElementById("color").value,
    material: document.getElementById("material").value,
  };

  fetch("/add-clothing", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newItem),
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.message === "Clothing item added successfully!") {
        loadClothingItems();
        closeAllPopups();
        openConfirmationPopup(
          "Your clothing item has been added successfully.",
          "add"
        );
      } else {
        displayError(data.message || "Error adding clothing item.");
      }
    })
    .catch(() => displayError("Network error. Please try again later."));
}

function clearForm() {
  document.getElementById("name").value = "";
  document.getElementById("size").value = "XS";
  document.getElementById("color").value = "";
  document.getElementById("material").value = "";
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
