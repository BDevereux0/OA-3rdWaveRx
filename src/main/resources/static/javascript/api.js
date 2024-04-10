let currentPageNumber = 1; // Variable to keep track of the current page number
const pageSize = 25; // Records per page
let medicalTransactionData = []; // Array to store all medical transaction data

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
        })
        .catch(error => {
            console.error('There was a problem with fetching hospital data:', error);
        });
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
        })
        .catch(error => {
            console.error('There was a problem with fetching patient data:', error);
        });
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
        })
        .catch(error => {
            console.error('There was a problem with fetching medical transaction data:', error);
        });
}


function populateHospitalTable(data) {
    const tableBody = document.querySelector('#hospitalTable tbody');
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

// Previous button click event listener
document.getElementById('prevButton').addEventListener('click', function(event) {
    event.preventDefault();
    currentPageNumber--; // Decrement current page number
    populateMedicalTransactionTable(); // Populate table for previous page
});

// Next button click event listener
document.getElementById('nextButton').addEventListener('click', function(event) {
    event.preventDefault();
    currentPageNumber++; // Increment current page number
    populateMedicalTransactionTable(); // Populate table for next page
});

// Initial fetch on page load
document.addEventListener('DOMContentLoaded', function () {

});

