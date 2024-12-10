// app.js
const map = L.map('map').setView([20, 0], 10); // Set initial view to world map

// Load OpenStreetMap tiles
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
}).addTo(map);

// Dummy data for diseases (latitude, longitude, and cases)
const diseaseData = [
    {disease: 'Measles', location: 'Enugu', cases: 50, deaths: 2},
    {disease: 'Cholera', location: 'Kano', cases: 100, deaths: 6},
];

// Function to add markers to the map
function addMarker(location, cases) {
    L.marker(location)
        .addTo(map)
        .bindPopup<b>(`Cases: ${cases}</b><br>
        diseaseName: ${diseaseName}</b><br>
        deaths: ${deaths}
        `)
        .openPopup();
}

// Add existing cases to the map (if any)
diseaseData.forEach(data => {
    addMarker(data.location, data.cases);
});

// Show modal on button click
document.getElementById('addCaseBtn').addEventListener('click', function() {
    $('#caseModal').modal('show');
});

// Handle form submission
document.getElementById('caseForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const latitude = parseFloat(document.getElementById('latitude').value);
    const longitude = parseFloat(document.getElementById('longitude').value);
    const cases = parseInt(document.getElementById('cases').value);
    const diseaseNameInput =(document.getElementByid('diseaseName').value.trim);
    const deaths = parseInt(document.getElementByid('deaths').value);

    // Add new case to the array
    diseaseData.push({ location: [latitude, longitude], cases });

    // Add marker to the map
    addMarker([latitude, longitude], cases);

    // Close the modal
    $('#caseModal').modal('hide');

    // Reset form fields
    this.reset();
});

// Find current location button functionality
document.getElementById('findLocationBtn').addEventListener('click', function() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
            const lat = position.coords.latitude;
            const lon = position.coords.longitude;

            document.getElementById('latitude').value = lat;
            document.getElementById('longitude').value = lon;

            // Optionally, you can pan the map to this location
            map.setView([lat, lon], 13);
        }, function() {
            alert("Unable to retrieve your location.");
        });
    } else {
        alert("Geolocation is not supported by this browser.");
    }
});
