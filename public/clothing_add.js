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
function addClothing() {
    // Retrieve input values from form fields
    const clothingData = {
        name: document.getElementById("name").value,
        size: document.getElementById("size").value,
        color: document.getElementById("color").value,
        material: document.getElementById("material").value
    };

    // Basic validation for required fields
    if (!clothingData.name || !clothingData.size || !clothingData.color || !clothingData.material) {
        document.getElementById("message").innerHTML = 'All fields are required!';
        document.getElementById("message").setAttribute("class", "text-danger");
        return;
    }

    // Prepare and send the POST request
    const request = new XMLHttpRequest();
    request.open("POST", "/api/add-clothing", true);
    request.setRequestHeader('Content-Type', 'application/json');

    // Handle the response from the server
    request.onload = function () {
        const response = JSON.parse(request.responseText);
        
        // Check for success message
        if (response.message === 'Clothing item added successfully!') {
            document.getElementById("message").innerHTML = 'Added Clothing: ' + clothingData.name + '!';
            document.getElementById("message").setAttribute("class", "text-success");

            // Clear form fields
            document.getElementById("name").value = "";
            document.getElementById("size").value = "";
            document.getElementById("color").value = "";
            document.getElementById("material").value = "";
        } else {
            document.getElementById("message").innerHTML = response.message || 'Unable to add clothing item!';
            document.getElementById("message").setAttribute("class", "text-danger");
        }
    };

    // Handle request errors
    request.onerror = function () {
        document.getElementById("message").innerHTML = 'Network error, please try again.';
        document.getElementById("message").setAttribute("class", "text-danger");
    };

    // Send the JSON data to the server
    request.send(JSON.stringify(clothingData));
}
