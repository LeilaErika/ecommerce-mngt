// Popup Handling Functions
function openAddPopup() {
  closeAllPopups(); // This will ensure both forms are hidden before showing add popup.
  document.getElementById("popupTitle").innerText = "Add Clothing";
  document.getElementById("saveAddButton").onclick = addClothing;
  document.getElementById("popupForm").style.display = "flex";
  clearForm(); // Clear the form fields before opening
}

function openConfirmationPopup(
  message = "Your item has been added/updated successfully.",
  type = "add"
) {
  closeConfirmationPopups(); // Close all other popups first
  const confirmationPopup = document.getElementById(
    type === "add" ? "confirmationPopupAdd" : "confirmationPopupEdit"
  );
  confirmationPopup.querySelector("p").innerText = message; // Set the message in the popup
  confirmationPopup.classList.add("show"); // Show the selected popup
}

function closeAllPopups() {
  document.getElementById("editPopupForm").style.display = "none";
  document.getElementById("popupForm").style.display = "none";
}

function closeConfirmationPopups() {
  // Close all popups by removing the 'show' class
  document.getElementById("confirmationPopupAdd").classList.remove("show");
  document.getElementById("confirmationPopupEdit").classList.remove("show");
}

function getItemById(id) {
  return fetch(`/get-clothing/${id}`)
    .then((response) => response.json())
    .catch((error) => console.error("Error fetching item by ID:", error));
}

// UI Update Functions
function displayProduct(item) {
  const productItem = document.createElement("div");
  productItem.classList.add("product-item");
  productItem.innerHTML = `
    <h3>${item.name}</h3>
    <p><strong>Size:</strong> ${item.size}</p>
    <p><strong>Color:</strong> ${item.color}</p>
    <p><strong>Material:</strong> ${item.material}</p>
    <button class="edit-button" data-id="${item.id}">Edit</button>
`;
  const editButton = productItem.querySelector(".edit-button");
  editButton.addEventListener("click", () => openEditForm(item.id));
  document.getElementById("productList").appendChild(productItem);
}

function loadClothingItems() {
  fetch("/get-clothing")
    .then((response) => response.json())
    .then((data) => {
      document.getElementById("productList").innerHTML = "";
      data.forEach((item) => displayProduct(item));
    })
    .catch((error) => console.error("Error:", error));
}

function displayError(message) {
  document.getElementById("message").innerHTML = message;
  document.getElementById("message").setAttribute("class", "text-danger");
}

// Initialization
window.onload = loadClothingItems;
