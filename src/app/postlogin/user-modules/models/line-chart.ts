import { Label, Color } from 'ng2-charts';
import { ChartType, ChartOptions, ChartDataSets } from 'chart.js';

export var lineChartData:ChartDataSets[] = [

    { data: [65, 59, 80, 81, 56, 55, 40], label: 'My First dataset' },
    { data: [28, 48, 40, 19, 86, 27, 90], label: 'My Second dataset' },
    { data: [45, 25, 16, 36, 67, 18, 76], label: 'My Third dataset - No bezier' }
  
  ];
  export var lineChartLabels: Label[] = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
  export var lineChartOptions: ChartOptions = {
    animation: {
      duration: 1000, // general animation time
      easing: 'easeOutBack'
    },
    hover: {
      animationDuration: 1000, // duration of animations when hovering an item
      mode: 'label'
    },
    responsiveAnimationDuration: 1000, // animation duration after a resize
    responsive: true,
    maintainAspectRatio: false,
    legend: {
      position: 'bottom',
    },
    scales: {
      xAxes: [{
        display: true,
        gridLines: {
          color: "#f3f3f3",
          drawTicks: false,
        },
        scaleLabel: {
          display: true,
          labelString: 'Month'
        }
      }],
      yAxes: [{
        display: true,
        gridLines: {
          color: "#f3f3f3",
          drawTicks: false,
        },
        scaleLabel: {
          display: true,
          labelString: 'Value'
        }
      }]
    },
    title: {
      display: true,
      text: 'Chart.js Line Chart - Legend'
    }
  };
  export var lineChartColors: Color[] = [
  
    {
  
    //   fill: false,
      borderDash: [5, 5],
      borderColor: "#9C27B0",
      pointBorderColor: "#9C27B0",
      pointBackgroundColor: "#FFF",
      pointBorderWidth: 2,
      pointHoverBorderWidth: 2,
      pointRadius: 4,
    },
    {
  
    //   fill: false,
      borderDash: [5, 5],
      borderColor: "#00A5A8",
      pointBorderColor: "#00A5A8",
      pointBackgroundColor: "#FFF",
      pointBorderWidth: 2,
      pointHoverBorderWidth: 2,
      pointRadius: 4,
    },
    {
    //   lineTension: 0,
    //   fill: false,
      borderColor: "#FF7D4D",
      pointBorderColor: "#FF7D4D",
      pointBackgroundColor: "#FFF",
      pointBorderWidth: 2,
      pointHoverBorderWidth: 2,
      pointRadius: 4,
    },
  
  ];
  export var lineChartLegend = true;
  export var lineChartType: ChartType = 'line';