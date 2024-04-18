let currentPageNumber = 1; // Variable to keep track of the current page number
const pageSize = 25; // Records per page
let medicalTransactionData = []; // Array to store all medical transaction data
let isGptClicked = false; // Flag to track if "Gpt" link is clicked

function fetchHospitalData() {
    // Fetch hospitals data from the API
    fetch('http://localhost:8080/api/hospitals')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            console.log("Fetching hospital data...");
            return response.json(); // Parse the JSON response
        })
        .then(data => {
            // Process hospital data and populate table
            populateHospitalTable(data);
            // Re-enable table if previously disabled by "Gpt" link
            if (isGptClicked) enableTable();
        })
        .catch(error => {
            console.error('There was a problem with fetching hospital data:', error);
        });

    // Remove textboxes if they exist
    removeTextBoxes();
}

function fetchPatientData() {
    // Fetch patient data from the API
    fetch('http://localhost:8080/api/patients')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            console.log("Fetching patient data...");
            return response.json(); // Parse the JSON response
        })
        .then(data => {
            // Process patient data and populate table
            populatePatientTable(data);
            // Re-enable table if previously disabled by "Gpt" link
            if (isGptClicked) enableTable();
        })
        .catch(error => {
            console.error('There was a problem with fetching patient data:', error);
        });

    // Remove textboxes if they exist
    removeTextBoxes();
}

function fetchMedicalTransactionData() {
    const startIndex = (currentPageNumber - 1) * pageSize;
    const apiUrl = `http://localhost:8080/api/transactions?startIndex=${startIndex}&pageSize=${pageSize}`;

    // Fetch medical transaction data from the API
    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            console.log("Fetching medical transaction data...");
            return response.json(); // Parse the JSON response
        })
        .then(data => {
            // Store the fetched data
            medicalTransactionData = data;

            // Process medical transaction data and populate table
            populateMedicalTransactionTable();

            // Enable or disable pagination buttons based on current page number
            updatePaginationButtons();

            // Re-enable table if previously disabled by "Gpt" link
            if (isGptClicked) enableTable();
        })
        .catch(error => {
            console.error('There was a problem with fetching medical transaction data:', error);
        });

    // Remove textboxes if they exist
    removeTextBoxes();
}

function populateHospitalTable(data) {
    const tableBody = document.querySelector('#hospitalTable tbody');
    if (!tableBody) return; // Exit if table body is null
    tableBody.innerHTML = ''; // Clear existing table rows

    // Add rows to the table body
    data.forEach(hospitalData => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${hospitalData.hospital_ID}</td>
            <td>${hospitalData.hospital_Name}</td>
            <td>${hospitalData.hospital_Type_ID}</td>
            <td>${hospitalData.hospital_TeachCenter ? 'Yes' : 'No'}</td>
            <td>${hospitalData.hospital_PhoneNumber}</td>
            <td>${hospitalData.hospital_Address}</td>
        `;
        tableBody.appendChild(row);
    });
}

function populatePatientTable(data) {
    const tableBody = document.querySelector('#hospitalTable tbody');
    if (!tableBody) return; // Exit if table body is null
    tableBody.innerHTML = ''; // Clear existing table rows

    // Add rows to the table body
    data.forEach(patientData => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${patientData.patientID}</td>
            <td>${patientData.firstName}</td>
            <td>${patientData.lastName}</td>
            <td>${patientData.dateOfBirth}</td>
            <td>${patientData.gender}</td>
            <td>${patientData.address}</td>
            <td>${patientData.rxNumber_IDI}</td>
            <td>${patientData.phoneNumber}</td>
            <td>${patientData.email}</td>
            <td>${patientData.emergencyContact}</td>
            <td>${patientData.bloodType}</td>
            <td>${patientData.allergies}</td>
            <td>${patientData.medicalHistory}</td>
            <td>${patientData.primaryCarePhysician}</td>
            <td>${patientData.insuranceProvider}</td>
            <td>${patientData.insurancePolicyNumber}</td>
            <td>${patientData.nextOfKin}</td>
            <td>${patientData.maritalStatus}</td>
            <td>${patientData.occupation}</td>
            <td>${patientData.language}</td>
            <td>${patientData.ethnicity}</td>
            <td>${patientData.religion}</td>
            <td>${patientData.dateAdmitted}</td>
            <td>${patientData.dischargeDate}</td>
            <td>${patientData.roomNumber}</td>
            <td>${patientData.hospitalId}</td>
        `;
        tableBody.appendChild(row);
    });
}

function populateMedicalTransactionTable() {
    const tableBody = document.querySelector('#hospitalTable tbody');
    if (!tableBody) return; // Exit if table body is null
    // Clear existing table rows
    tableBody.innerHTML = '';

    // Calculate start and end index for the current page
    const startIndex = (currentPageNumber - 1) * pageSize;
    const endIndex = Math.min(startIndex + pageSize, medicalTransactionData.length);

    // Add rows to the table body
    for (let i = startIndex; i < endIndex; i++) {
        const transactionData = medicalTransactionData[i];
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${transactionData.rxNumber}</td>
            <td>${transactionData.patient_ID}</td>
            <td>${transactionData.date_Filled}</td>
            <td>${transactionData.medical_TransactionID}</td>
            <td>${transactionData.ndc}</td>
        `;
        tableBody.appendChild(row);
    }
}

function updatePaginationButtons() {
    // Enable or disable previous button based on current page number
    const prevButton = document.getElementById('prevButton');
    if (currentPageNumber <= 1) {
        prevButton.disabled = true;
    } else {
        prevButton.disabled = false;
    }

    // Enable or disable next button based on current page number and total number of records
    const nextButton = document.getElementById('nextButton');
    if (currentPageNumber * pageSize >= medicalTransactionData.length) { // Assuming 5000 total records
        nextButton.disabled = true;
    } else {
        nextButton.disabled = false;
    }
}

// Remove textboxes function
function removeTextBoxes() {
    const textBox1 = document.getElementById('textBox1');
    const textBox2 = document.getElementById('textBox2');
    if (textBox1) textBox1.remove();
    if (textBox2) textBox2.remove();
    const button = document.getElementById('submitButton');
    if (button) button.remove();
}

// Enable table function
function enableTable() {
    const table = document.getElementById('hospitalTable');
    if (table) table.style.display = 'table';
}

// Add event listener to "Gpt" link
document.getElementById('linkGpt').addEventListener('click', function(event) {
    event.preventDefault(); // Prevent default link behavior
    // Remove the table
    const table = document.getElementById('hospitalTable');
    if (table) table.style.display = 'none';
    // Add textboxes and button
    addFormAndTextBoxes();
    // Update flag
    enableTextBox1();
    // Add logic for button
    submitButtonClickHandler();
    isGptClicked = true;
});

// Enable textbox1 function
function enableTextBox1() {
    const textBox1 = document.getElementById('textBox1');
    if (textBox1) textBox1.disabled = false;

    // Enable the submit button
    const button = document.getElementById('submitButton');
    if (button) button.disabled = false;
}

// Add textboxes function
function addFormAndTextBoxes() {
    const form = document.createElement('form');
    form.id = 'myForm';
    form.addEventListener('submit', function (event){
        event.preventDefault();
        submitFormData();
    })

    // Create textboxes
    const textBox1 = document.createElement('input');
    textBox1.type = 'text';
    textBox1.className = 'form-control mt-2';
    textBox1.placeholder = 'Textbox 1';
    textBox1.id = 'textBox1';



    const textBox2 = document.createElement('input');
    textBox2.type = 'text';
    textBox2.className = 'form-control mt-2';
    textBox2.placeholder = 'Textbox 2';
    textBox2.id = 'textBox2';

    // Add textboxes to the container
    const container = document.querySelector('.col-md-9');
    if (!container) return; // Exit if container is null
    container.appendChild(textBox1);
    container.appendChild(textBox2);

    // Create button
    const button = document.createElement('button');
    button.textContent = 'Submit';
    button.className = 'btn btn-primary mt-2';
    button.id = 'submitButton';

    // Add button to the container
    container.appendChild(button);

    // Disable textboxes and button initially
    textBox1.disabled = true;
    textBox2.disabled = true;
    button.disabled = true;
}

// Initial fetch on page load
document.addEventListener('DOMContentLoaded', function () {

});


function submitButtonClickHandler() {
    document.getElementById('submitButton').addEventListener('click', function(){
        console.log("Button works!");
        let textBox1 = document.getElementById('textBox1');
        let text = textBox1.value
        if (text !== ""){
            textBox1.value = 'Sending Request...';

            // Prepare the data to send
            const data = { textBox1: text };

            // Send a POST request using Fetch API
            fetch('http://localhost:8080/home/submitFormData', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            })
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    return response.json();
                })
                .then(data => {
                    console.log('Data received from server:', data);
                })
                .catch(error => {
                    console.error('There was a problem with the request:', error);
                });
        }else  {
            textBox1.value = 'Please enter a value';
        }

    });
}

function submitFormData(){
    // Retrieve form data
    const form = document.getElementById('myForm');
    const formData = new FormData(form);

    // Example: Log form data to the console
    for (let [name, value] of formData) {
        console.log(`${name}: ${value}`);
    }

    // Example: Send form data to the backend using fetch API
    fetch('http://localhost:8080/submit', {
        method: 'POST',
        body: formData
    })
        .then(response => response.json())
        .then(data => {
            console.log('Form submission successful:', data);
            // Handle response from the backend if needed
        })
        .catch(error => {
            console.error('Error submitting form:', error);
        });
}

// Add event listeners for links
document.getElementById('linkHospitals').addEventListener('click', function(event) {
    event.preventDefault(); // Prevent default link behavior
    fetchHospitalData(); // Fetch hospital data
});

document.getElementById('linkPatients').addEventListener('click', function(event) {
    event.preventDefault(); // Prevent default link behavior
    fetchPatientData(); // Fetch patient data
});

document.getElementById('linkTransactions').addEventListener('click', function(event) {
    event.preventDefault(); // Prevent default link behavior
    fetchMedicalTransactionData(); // Fetch medical transaction data
});
