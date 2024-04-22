
let expenses = [];
let totalAmount = 0;
const categorySelect = document.getElementById('category_select');
const amountInput = document.getElementById('amount_input');
const InfoInput = document.getElementById('info');
const dateInput = document.getElementById('date_input');
const addBtn = document.getElementById('add_btn');
const expenseTableBody = document.getElementById('expense-table-body');
const totalAmountCell = document.getElementById('total-amount');
const fileInput = document.getElementById('fileInput');

addBtn.addEventListener('click', async function (event) {
    
    const category = categorySelect.value;
    const info = InfoInput.value;
    const amount = Number(amountInput.value);
    const date = dateInput.value;
    event.preventDefault();
    if (category === '') {
        alert('Please select a category');
        return;
    }
    if (isNaN(amount) || amount <= 0) {
        alert('Please enter a valid amount');
        return;
    }
    if (info === '') {
        alert('Please enter a valid info');
        return;
    }
    if (date === '') {
        alert('Please select a date');
        return;
    }
    
    console.log('Adding entry manually...');
    if(totalAmount<amount && category=="Expense"){
        alert('expense should be less than total income');
        return ;
    }
    addEntryToTable({ category, amount, info, date });

    try {
        await axios.post("http://localhost:5000/add",{category,amount,info,date}).then((res)=>{ 
            if(res.data.message === 'success'){
            addEntryToTable({ category, amount, info, date });}
        }           
        )
    } catch (error) {
        console.error('Error adding entry:', error);
    }

});


fileInput.addEventListener('change', handleFileUpload);

function handleFileUpload(event) {
    const file = event.target.files[0];
    const formData = new FormData();
    formData.append('file', file);
    
    axios.post('http://localhost:5000/upload', formData)
    .then(response => {
        const data = response.data;
        data.forEach(entry => {
            addEntryToTable(entry);
        });
    })
    .catch(error => console.error('Error uploading file:', error));

}

function addEntryToTable(entry) {
    expenses.push(entry);
    const newRow = expenseTableBody.insertRow();

    const categoryCell = newRow.insertCell();
    const amountCell = newRow.insertCell();
    const infoCell = newRow.insertCell();
    const dateCell = newRow.insertCell();
    const deleteCell = newRow.insertCell();

    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';
    deleteBtn.classList.add('delete-btn');
    deleteBtn.addEventListener('click', function () {
        const index = expenses.findIndex(item => item === entry);
        if (entry.category === 'Income') {
            totalAmount -= entry.amount;
        } else {
            totalAmount += entry.amount;
        }
        totalAmountCell.textContent = totalAmount;
        expenses.splice(index, 1);
        expenseTableBody.removeChild(newRow);
    });

    // Update total amount
    if (entry.category === 'Income') {
        totalAmount += entry.amount;
    } else {
        totalAmount -= entry.amount;
    }
    totalAmountCell.textContent = totalAmount;

    categoryCell.textContent = entry.category;
    amountCell.textContent = entry.amount;
    infoCell.textContent = entry.info;
    dateCell.textContent = entry.date;
    deleteCell.appendChild(deleteBtn);
}
