let currentPageNumber = 1; // Variable to keep track of the current page number
const pageSize = 25; // Records per page
let medicalTransactionData = []; // Array to store all medical transaction data
let isGptClicked = false; // Flag to track if "Gpt" link is clicked

// Function to fetch hospital data from the API
function fetchHospitalData() {
    fetch('http://localhost:8080/api/hospitals')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            console.log("Fetching hospital data...");
            return response.json(); // Parse the JSON response
        })
        .then(data => {
            populateHospitalTable(data);
            if (isGptClicked) enableTable();
        })
        .catch(error => {
            console.error('There was a problem with fetching hospital data:', error);
        });
    removeTextBoxes();
}

// Function to fetch patient data from the API
function fetchPatientData() {
    fetch('http://localhost:8080/api/patients')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            console.log("Fetching patient data...");
            return response.json(); // Parse the JSON response
        })
        .then(data => {
            populatePatientTable(data);
            if (isGptClicked) enableTable();
        })
        .catch(error => {
            console.error('There was a problem with fetching patient data:', error);
        });
    removeTextBoxes();
}

// Function to fetch medical transaction data from the API
function fetchMedicalTransactionData() {
    const startIndex = (currentPageNumber - 1) * pageSize;
    const apiUrl = `http://localhost:8080/api/transactions?startIndex=${startIndex}&pageSize=${pageSize}`;

    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            console.log("Fetching medical transaction data...");
            return response.json(); // Parse the JSON response
        })
        .then(data => {
            medicalTransactionData = data;
            populateMedicalTransactionTable();
            updatePaginationButtons();
            if (isGptClicked) enableTable();
        })
        .catch(error => {
            console.error('There was a problem with fetching medical transaction data:', error);
        });
    removeTextBoxes();
}

// Function to populate hospital table
function populateHospitalTable(data) {
    const tableBody = document.querySelector('#hospitalTable tbody');
    if (!tableBody) return; // Exit if table body is null
    tableBody.innerHTML = ''; // Clear existing table rows

    data.forEach((hospitalData, index) => {
        if (index === 0) {
            const headerRow = document.createElement('tr');
            Object.keys(hospitalData).forEach(key => {
                const th = document.createElement('th');
                th.textContent = key;
                headerRow.appendChild(th);
            });
            tableBody.appendChild(headerRow);
        }

        const row = document.createElement('tr');
        Object.values(hospitalData).forEach(value => {
            const td = document.createElement('td');
            td.textContent = value;
            row.appendChild(td);
        });
        tableBody.appendChild(row);
    });
}

// Function to populate patient table
function populatePatientTable(data) {
    const tableBody = document.querySelector('#hospitalTable tbody');
    if (!tableBody) return; // Exit if table body is null
    tableBody.innerHTML = ''; // Clear existing table rows

    if (data.length > 0) {
        const headerRow = document.createElement('tr');
        Object.keys(data[0]).forEach(key => {
            const th = document.createElement('th');
            th.textContent = key;
            headerRow.appendChild(th);
        });
        tableBody.appendChild(headerRow);
    }

    data.forEach(patientData => {
        const row = document.createElement('tr');
        Object.values(patientData).forEach(value => {
            const td = document.createElement('td');
            td.textContent = value;
            row.appendChild(td);
        });
        tableBody.appendChild(row);
    });
}

// Function to populate medical transaction table
function populateMedicalTransactionTable() {
    const tableBody = document.querySelector('#hospitalTable tbody');
    if (!tableBody) return; // Exit if table body is null
    tableBody.innerHTML = ''; // Clear existing table rows

    // Ensure medicalTransactionData is not empty
    if (medicalTransactionData.length === 0) return;

    // Create header row
    const headerRow = document.createElement('tr');
    Object.keys(medicalTransactionData[0]).forEach(key => {
        const th = document.createElement('th');
        th.textContent = key;
        headerRow.appendChild(th);
    });
    tableBody.appendChild(headerRow);

    // Populate table with data
    medicalTransactionData.forEach(transactionData => {
        const row = document.createElement('tr');
        Object.values(transactionData).forEach(value => {
            const td = document.createElement('td');
            td.textContent = value;
            row.appendChild(td);
        });
        tableBody.appendChild(row);
    });
}

// Function to remove textboxes if they exist
function removeTextBoxes() {
    const textBox1 = document.getElementById('textBox1');
    const textBox2 = document.getElementById('textBox2');
    if (textBox1) textBox1.remove();
    if (textBox2) textBox2.remove();
    const button = document.getElementById('submitButton');
    if (button) button.remove();
}

// Function to update pagination buttons
function updatePaginationButtons() {
    const prevButton = document.getElementById('prevButton');
    const nextButton = document.getElementById('nextButton');
    if (!prevButton || !nextButton) return;

    prevButton.disabled = currentPageNumber <= 1;
    nextButton.disabled = currentPageNumber * pageSize >= medicalTransactionData.length;
}

// Function to remove textboxes if they exist
function removeTextBoxes() {
    const textBox1 = document.getElementById('textBox1');
    const textBox2 = document.getElementById('textBox2');
    if (textBox1) textBox1.remove();
    if (textBox2) textBox2.remove();
    const button = document.getElementById('submitButton');
    if (button) button.remove();
}

// Function to enable table
function enableTable() {
    const table = document.getElementById('hospitalTable');
    if (table) table.style.display = 'table';
}

// Event listener for "Gpt" link
document.getElementById('linkGpt').addEventListener('click', function (event) {
    event.preventDefault();
    const table = document.getElementById('hospitalTable');
    if (table) table.style.display = 'none';
    addFormAndTextBoxes();
    enableTextBox1();
    submitButtonClickHandler();
    isGptClicked = true;
});

// Function to enable textbox1
function enableTextBox1() {
    const textBox1 = document.getElementById('textBox1');
    if (textBox1) textBox1.disabled = false;

    const button = document.getElementById('submitButton');
    if (button) button.disabled = false;
}

// Function to add textboxes and button
function addFormAndTextBoxes() {
    const form = document.createElement('form');
    form.id = 'myForm';
    form.addEventListener('submit', function (event) {
        event.preventDefault();
        submitFormData();
    });

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

    const container = document.querySelector('.col-md-9');
    if (!container) return;
    container.appendChild(textBox1);
    container.appendChild(textBox2);

    const button = document.createElement('button');
    button.textContent = 'Submit';
    button.className = 'btn btn-primary mt-2';
    button.id = 'submitButton';

    container.appendChild(button);

    textBox1.disabled = true;
    textBox2.disabled = true;
    button.disabled = true;
}

// Function to handle submit button click
function submitButtonClickHandler() {
    document.getElementById('submitButton').addEventListener('click', function () {
        console.log("Button works!");
        let textBox1 = document.getElementById('textBox1');
        let text = textBox1.value;
        if (text !== "") {
            textBox1.value = 'Sending Request...';
            const data = {textBox1: text};
            fetch('http://localhost:8080/home/submitFormData', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
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
        } else {
            textBox1.value = 'Please enter a value';
        }
    });
}

// Function to submit form data
function submitFormData() {
    const form = document.getElementById('myForm');
    const formData = new FormData(form);

    for (let [name, value] of formData) {
        console.log(`${name}: ${value}`);
    }

    fetch('http://localhost:8080/submit', {
        method: 'POST',
        body: formData
    })
        .then(response => response.json())
        .then(data => {
            console.log('Form submission successful:', data);
        })
        .catch(error => {
            console.error('Error submitting form:', error);
        });
}

// Event listeners for links
document.getElementById('linkHospitals').addEventListener('click', function (event) {
    event.preventDefault();
    fetchHospitalData();
});

document.getElementById('linkPatients').addEventListener('click', function (event) {
    event.preventDefault();
    fetchPatientData();
});

document.getElementById('linkTransactions').addEventListener('click', function (event) {
    event.preventDefault();
    fetchMedicalTransactionData();
});

// Initial fetch on page load
document.addEventListener('DOMContentLoaded', function () {
    fetchHospitalData();
});
