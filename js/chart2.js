import { previewSales } from "./style/modal.js";

var ctx = document.querySelector(".chart-1-canvas");
var chart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: [
            "January", 
            "Febuary", 
            "March", 
            "April", 
            "May", 
            "June", 
            "July"],
            datasets: [{
                label: "Series1",
                data: [50, 60, 70, 80, 90, 100, 100],
                fill: true,
                borderColor: 'rgba(106, 214, 249, 1)',
                backgroundColor: 'rgba(106, 214, 249, 1)',
                borderWidth: 1
            }]
    }, options: {
        responsive: true, // Instruct chart js to respond nicely.
        maintainAspectRatio: false // Add to prevent default behaviour of full-width/height
      }
})

var ctx2 = document.querySelector(".chart-2-canvas");
var myChart2 = new Chart(ctx2, {
    type: 'doughnut',
    data: {
        labels: ['Red', 'Orange'],
        datasets: [
            {
            label: 'Dataset 1',
            data: [5, 20],
            backgroundColor: [
                'rgba(0, 193, 255, 1)',
                'rgba(75, 146, 169, 1)'
            ]
            }
        ]
    }, options: {
        responsive: true,
        plugins: {
            legend: {
                position: 'bottom',
            }
        }
    },
})

document.addEventListener("DOMContentLoaded", function () {
    const modalContainer = document.querySelector(".modal-place");
    const tdElements = document.querySelectorAll("td.week");
    let dataCategory = [
        { category: "Meat", qty: "30" },
        { category: "Fish", qty: "50" },
        { category: "Others", qty: "80" }
    ];

    // Define a mapping of name values to month names
    const monthNames = {
        'm-1': 'Jan',
        'm-2': 'Feb',
        'm-3': 'March',
        'm-4': 'April',
        'm-5': 'May',
        'm-6': 'June',
        'm-7': 'July',
    };

    tdElements.forEach(function (td) {
        td.addEventListener("click", function () {
            // Retrieve the data attributes to determine the modal content
            const week = td.getAttribute("data-week");
            const name = td.getAttribute("data-name");

            // Use the month name from the mapping
            const monthName = monthNames[name] || 'Unknown Month';

            const header = document.createElement("div");
            header.classList.add("header-m");
            header.innerHTML = `<h2>${monthName} week ${week}</h2>`;

            const modal = document.createElement("div");
            modal.classList.add("modal");

            const bar_chart = createHorizontalBarChart(dataCategory);
            const donut_chart = createDoughnutChart(dataCategory);

            // Append the modal to the modal container
            modalContainer.innerHTML = '';
            modalContainer.appendChild(header)
            modalContainer.appendChild(modal);
            modal.appendChild(bar_chart);
            modal.appendChild(donut_chart);

            
        });
    });
});


function createHorizontalBarChart(dataCategory) {
    const bar_chart = document.createElement("div");
    bar_chart.classList.add("horizontal-bar");
    let text = "";

    for (const category of dataCategory) {
        text += `
            <div class="detail2">
                <label>${category.category}</label>
                <span>${category.qty} items</span>
            </div>
            <div class="background" style="width: 100%; height: 20px;">
                <div class="bar-length" style="width: ${category.qty}%; height: 20px;"></div>
            </div>
            <br>
        `;
    }

    bar_chart.innerHTML = text;
    return bar_chart;
}

function createDoughnutChart() {
    const chart_container = document.createElement("div");
    chart_container.classList.add("doughnut-chart");
    
    // Append the chart_container to the document body or any desired parent element
    document.body.appendChild(chart_container);

    const donut_chart = document.createElement("canvas");

    var ctx = donut_chart.getContext("2d");
    new Chart(ctx, {
        type: "doughnut",
        data: {
            labels: ["Dataset", "Dataset2"],
            datasets: [
                {
                    data: [10,80],
                    backgroundColor: [
                        'rgba(255, 255, 255, 1)',
                        'rgba(106, 214, 249, 1)',
                        // Add more colors if you have more categories
                    ]
                }
            ]
        }
    });

    chart_container.appendChild(donut_chart);
    return chart_container;
}

previewSales()





