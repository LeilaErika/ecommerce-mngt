function updateClothing(updatedItem) {
  fetch(`/update-clothing/${updatedItem.id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(updatedItem),
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.message === "Clothing item updated successfully!") {
        // Reload the list of clothing items
        loadClothingItems();
        // Close the form
        closeAllPopups();
        // Show confirmation message
        openConfirmationPopup(
          "Your clothing item has been updated successfully.",
          "edit"
        );
      } else {
        // Handle error if update fails
        displayError(data.message || "Error updating clothing item.");
      }
    })
    .catch(() => displayError("Network error. Please try again later."));
}

function editClothing() {
  const updatedItem = {
    id: document.getElementById("editId").value, // Get the ID from the hidden field
    name: document.getElementById("editName").value,
    size: document.getElementById("editSize").value,
    color: document.getElementById("editColor").value,
    material: document.getElementById("editMaterial").value,
  };

  // Call the function to update the clothing item
  updateClothing(updatedItem);
}

function openEditForm(itemId) {
  closeAllPopups(); // This will hide the add popup if it's open
  const nameInput = document.getElementById("editName");
  const sizeInput = document.getElementById("editSize");
  const colorInput = document.getElementById("editColor");
  const materialInput = document.getElementById("editMaterial");
  const editIdInput = document.getElementById("editId");
  const saveButton = document.getElementById("saveEditButton");

  if (
    nameInput &&
    sizeInput &&
    colorInput &&
    materialInput &&
    saveButton &&
    editIdInput
  ) {
    fetch(`/get-clothing/${itemId}`)
      .then((response) => response.json())
      .then((item) => {
        nameInput.value = item.name;
        sizeInput.value = item.size;
        colorInput.value = item.color;
        materialInput.value = item.material;
        editIdInput.value = item.id;
        document.getElementById("editPopupForm").style.display = "flex"; // Show the edit popup
      })
      .catch((error) => console.error("Error fetching item:", error));
  } else {
    console.error("One or more form elements are missing in the DOM.");
  }
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
