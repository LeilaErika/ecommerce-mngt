// function addClothing() {
//     // Retrieve input values from form fields
//     const clothingData = {
//         name: document.getElementById("name").value,
//         size: document.getElementById("size").value,
//         color: document.getElementById("color").value,
//         material: document.getElementById("material").value
//     };

//     // Basic validation for required fields
//     if (!clothingData.name || !clothingData.size || !clothingData.color || !clothingData.material) {
//         document.getElementById("message"8).innerHTML = 'All fields are required!';
//         document.getElementById("message").setAttribute("class", "text-danger");
//         return;
//     }

//     // Prepare and send the POST request
//     const request = new XMLHttpRequest();
//     request.open("POST", "/api/add-clothing", true); // Ensure the URL matches your backend route
//     request.setRequestHeader('Content-Type', 'application/json');

//     // Handle the response from the server
//     request.onload = function () {
//         const response = JSON.parse(request.responseText);

//         // Check for success message
//         if (response.message === 'Clothing item added successfully!') {
//             document.getElementById("message").innerHTML = 'Added Clothing: ' + clothingData.name + '!';
//             document.getElementById("message").setAttribute("class", "text-success");

//             // Clear form fields
//             document.getElementById("name").value = "";
//             document.getElementById("size").value = "";
//             document.getElementById("color").value = "";
//             document.getElementById("material").value = "";
//         } else {
//             document.getElementById("message").innerHTML = response.message || 'Unable to add clothing item!';
//             document.getElementById("message").setAttribute("class", "text-danger");
//         }
//     };

//     // Handle request errors
//     request.onerror = function () {
//         document.getElementById("message").innerHTML = 'Network error, please try again.';
//         document.getElementById("message").setAttribute("class", "text-danger");
//     };

//     // Send the JSON data to the server
//     request.send(JSON.stringify(clothingData));
// }

// public/js/clothing_add.js

// function addClothing() {
//     // Retrieve input values from form fields
//     const clothingData = {
//         name: document.getElementById("name").value,
//         size: document.getElementById("size").value,
//         color: document.getElementById("color").value,
//         material: document.getElementById("material").value
//     };

//     // Basic validation for required fields
//     if (!clothingData.name || !clothingData.size || !clothingData.color || !clothingData.material) {
//         document.getElementById("message").innerHTML = 'All fields are required!';
//         document.getElementById("message").setAttribute("class", "text-danger");
//         return;
//     }

//     // Prepare and send the POST request
//     const request = new XMLHttpRequest();
//     request.open("POST", "/api/add-clothing", true);
//     request.setRequestHeader('Content-Type', 'application/json');

//     // Handle the response from the server
//     request.onload = function () {
//         const response = JSON.parse(request.responseText);

//         // Check for success message
//         if (response.message === 'Clothing item added successfully!') {
//             document.getElementById("message").innerHTML = 'Added Clothing: ' + clothingData.name + '!';
//             document.getElementById("message").setAttribute("class", "text-success");

//             // Clear form fields
//             document.getElementById("name").value = "";
//             document.getElementById("size").value = "";
//             document.getElementById("color").value = "";
//             document.getElementById("material").value = "";
//         } else {
//             document.getElementById("message").innerHTML = response.message || 'Unable to add clothing item!';
//             document.getElementById("message").setAttribute("class", "text-danger");
//         }
//     };

//     // Handle request errors
//     request.onerror = function () {
//         document.getElementById("message").innerHTML = 'Network error, please try again.';
//         document.getElementById("message").setAttribute("class", "text-danger");
//     };

//     // Send the JSON data to the server
//     request.send(JSON.stringify(clothingData));
// }

// function addClothing() {
//     // Retrieve input values from form fields
//     const clothingData = {
//         name: document.getElementById("name").value,
//         size: document.getElementById("size").value,
//         color: document.getElementById("color").value,
//         material: document.getElementById("material").value
//     };

//     // Basic validation for required fields
//     if (!clothingData.name || !clothingData.size || !clothingData.color || !clothingData.material) {
//         document.getElementById("message").innerHTML = 'All fields are required!';
//         document.getElementById("message").setAttribute("class", "text-danger");
//         return;
//     }

//     // Send the POST request
//     fetch('/api/add-clothing', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(clothingData)
//     })
//     .then(response => response.json())
//     .then(data => {
//         if (data.message === 'Clothing item added successfully!') {
//             // Display success message
//             document.getElementById("message").innerHTML = 'Clothing item added successfully!';
//             document.getElementById("message").setAttribute("class", "text-success");

//             // Clear form fields after successful addition
//             document.getElementById("name").value = "";
//             document.getElementById("size").value = "XS"; // Set to default or initial value
//             document.getElementById("color").value = "";
//             document.getElementById("material").value = "";

//             // Optionally close the popup after adding
//             closePopup();
//         } else {
//             // Display error message if the server responds with an error
//             document.getElementById("message").innerHTML = data.message || 'Error adding clothing item.';
//             document.getElementById("message").setAttribute("class", "text-danger");
//         }
//     })
//     .catch(err => {
//         console.error('Error:', err);
//         document.getElementById("message").innerHTML = 'Network error. Please try again later.';
//         document.getElementById("message").setAttribute("class", "text-danger");
//     });
// }

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
