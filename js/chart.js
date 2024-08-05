var ctx4 = document.querySelector(".chart-4");
const chart1 = new Chart(ctx4, {
    type: 'doughnut',
    data: {
        labels: ['Red', 'Orange', 'Yellow'],
        datasets: [
            {
                label: 'Dataset 1',
                data: [12, 19, 3,],
                backgroundColor: [
                    'rgba(0, 193, 255, 1)',
                    'rgba(75, 146, 169, 1)',
                    'rgba(106, 214, 249, 1)'
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

var ctx5 =  document.querySelector(".chart-5");
const chart2 = new Chart(ctx5, {
    type: 'line',
    data: {
        labels: 'dataset',
        datasets: [
            {
                label: 'Dataset 1',
                data: [12, 19, 3, 16, 10, 11, 13],
                borderColor: 'rgba(106, 214, 249, 1)',
                backgroundColor: 'rgba(106, 214, 249, 1)',
                pointStyle: 'circle',
                pointRadius: 4,
                pointHoverRadius: 15
            }
        ]
    }, options: {
        responsive: true,
    }
})

var ctx7 =  document.querySelector(".chart-7");
const chart3 = new Chart(ctx7, {
    type: 'line',
    data: {
        labels: 'dataset',
        datasets: [
            {
                label: 'Dataset 1',
                data: [12, 19, 3, 5, 2, 4, 1, 1],
                borderColor: 'rgba(106, 214, 249, 1)',
                backgroundColor: 'rgba(106, 214, 249, 1)',
                pointStyle: 'circle',
                pointRadius: 0,
                pointHoverRadius: 15
            }
        ]
    }, options: {
        responsive: true,
    }
})
