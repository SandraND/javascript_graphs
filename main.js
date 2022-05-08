const xAxis = [];
const yAxis = [];
let isFirstLoad = true;

function counter() {
  let timeleft = 30;

  const refreshTimer = setInterval(() => {
    if (timeleft <= 0) {
      timeleft = 30;
    }
    document.getElementById('app').value = 30 - timeleft;
    document.getElementById(
      'app',
    ).innerHTML = `<p>The charts will refresh in ${timeleft} seconds.</p>`;
    timeleft -= 1;
  }, 1000);
}

counter();

function chartSet() {
  const ctx = document.getElementById('myChart').getContext('2d');
  const myChart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: xAxis,
      datasets: [
        {
          label: 'Random datas',
          data: yAxis,
          backgroundColor: 'rgba(255, 99, 132, 0.2)',
          borderColor: 'rgba(255, 99, 132, 1)',
          borderWidth: 1,
        },
      ],
    },
    options: {
      animation: {
        duration: 2,
      },
      legend: {
        display: true,
      },
      scales: {
        yAxes: [
          {
            ticks: {
              beginAtZero: true,
            },
          },
        ],
      },
    },
  });
}

function resetChart() {
  fetch('https://canvasjs.com/services/data/datapoints.php')
    .then(
      (data) => data.json(),
      (error) => console.warn("Didn't work"),
    )
    .then((dataList) => {
      dataList.forEach((elt) => {
        xAxis.push(elt[0]);
        yAxis.push(elt[1]);
        chartSet();
      });
    });
}

function isFirstLoadChart() {
  if (document.cookie) {
    document.cookie = 'Name=Value';
    resetChart();
    isFirstLoad = false;
  } else {
    alert("perhaps you must change browser.Something in this page can't  load.");
  }

  if (isFirstLoad === false) {
    console.log('here we go');
    setInterval(resetChart, 30000);
  }
}

isFirstLoadChart();
resetChart();
chartSet();
