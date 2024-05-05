const urlParams = new URLSearchParams(window.location.search);
const userID = urlParams.get('userID');

let travel = 0;
let food = 0;
let etc = 0;

// access the data from mongo. 
// make sure this always matches with routes/transactions.js GET
fetch(`/api/mongoDB/transaction?userID=${userID}`).then(response => {
    console.log(response);
    return response.json(); // do we REALLY need this if we do chart.js after?
})
    .then(data => {
        console.log(data);

        // process the data that was returned here.
        // need to split it up even further - into merch_name, category etc.
        data.forEach(transaction => {
            console.log(`Merchant: ${transaction.merchantName}, Cost: $${transaction.cost}, Category: ${transaction.category}`);
            console.log('---------------------');

            // doing calculations for the chart
            if (transaction.category.includes('Travel') || transaction.category.includes('Airlines')){
                travel += Math.abs(transaction.cost);
            }else if (transaction.category.includes('Food') || transaction.category.includes('Restaurants')){
                food += Math.abs(transaction.cost);
            }else{
                etc += Math.abs(transaction.cost);
            }
        })

        // chart.js items here
        // Data for the chart
        const chartData = {
            datasets: [{
                data: [travel, food, etc],
                backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
                hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56']
            }],
            labels: ['Travel', 'Food', 'Misc.']
        };

        // Configuration options
        const options = {
            responsive: true,
            maintainAspectRatio: false
        };

        // Get the context of the canvas element we want to select
        const ctx = document.getElementById('myDoughnutChart').getContext('2d');

        // Create the doughnut chart
        const myDoughnutChart = new Chart(ctx, {
            type: 'doughnut',
            data: chartData,
            options: options
        });


    })
    .catch(error => {
        console.error('API call to mongo failed. Check fetch');
    })

// fetch for the bills
document.addEventListener('DOMContentLoaded', async() => {
    try{
        const billList = document.getElementById('bill-list');
        billList.innerHTML = ''; // clear out everything so there's no duplicates
        
        const response = await fetch('/api/mongoDB/bills');
        const fetchedBills = await response.json();

        // since bills is essentially a 2D array
        fetchedBills.forEach(userBill => {
            userBill.bills.forEach(bill => {
                const listElement = document.createElement('li');
                listElement.textContent = bill.name;
                billList.appendChild(listElement);
            });
        });

    }catch (error){
        console.error("Error getting bills. Triggered from dashboard.js. \n\t===> ", error);
    }
});