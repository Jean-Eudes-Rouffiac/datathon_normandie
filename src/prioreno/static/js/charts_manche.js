// Set new default font family and font color to mimic Bootstrap's default styling
Chart.defaults.global.defaultFontFamily = 'Nunito', '-apple-system,system-ui,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif';
Chart.defaults.global.defaultFontColor = '#858796';

function number_format(number, decimals, dec_point, thousands_sep) {
    number = (number + '').replace(',', '').replace(' ', '');
    var n = !isFinite(+number) ? 0 : +number,
        prec = !isFinite(+decimals) ? 0 : Math.abs(decimals),
        sep = (typeof thousands_sep === 'undefined') ? ' ' : thousands_sep, // Utilisez un espace comme séparateur de milliers
        dec = (typeof dec_point === 'undefined') ? '.' : dec_point,
        s = '',
        toFixedFix = function(n, prec) {
            var k = Math.pow(10, prec);
            return '' + Math.round(n * k) / k;
        };
    s = (prec ? toFixedFix(n, prec) : '' + Math.round(n)).split('.');
    if (s[0].length > 3) {
        s[0] = s[0].replace(/\B(?=(?:\d{3})+(?!\d))/g, sep);
    }
    return s.join(dec); // Supprime les décimales s'il n'y en a pas
}


// DPE manche
var ctx_manche_dpe = document.getElementById("manche_dpe_barchart");
var chart_manche_dpe = new Chart(ctx_manche_dpe, {
  type: 'bar',
  data: {
    labels: labels_manche_dpe,
    datasets: [{
      label: "Nombre de logements",
      backgroundColor: [
        'rgba(0, 100, 0, 0.6)',  // Vert foncé
        'rgba(107, 142, 35, 0.6)',  // Vert clair
        'rgba(154, 205, 50, 0.6)',  // Vert très clair 
        'rgba(255, 255, 0, 0.6)',  // Jaune
        'rgba(255, 165, 0, 0.6)',  // Orange
        'rgba(255, 69, 0, 0.6)',  // Orange foncé
        'rgba(255, 0, 0, 0.6)'  // Rouge
      ],
      borderColor: [
        'rgba(0, 100, 0, 0.6)',  // Vert foncé
        'rgba(107, 142, 35, 0.6)',  // Vert clair
        'rgba(154, 205, 50, 0.6)',  // Vert très clair 
        'rgba(255, 255, 0, 0.6)',  // Jaune
        'rgba(255, 165, 0, 0.6)',  // Orange
        'rgba(255, 69, 0, 0.6)',  // Orange foncé
        'rgba(255, 0, 0, 0.6)'  // Rouge
      ],
      hoverBackgroundColor: "#271b33",
      data: values_manche_dpe,
    }],
  },
  options: {
    maintainAspectRatio: false,
    layout: {
      padding: {
        left: 10,
        right: 25,
        top: 25,
        bottom: 0
      }
    },
    scales: {
      xAxes: [{
        time: {
          unit: 'month'
        },
        gridLines: {
          display: false,
          drawBorder: false
        },
        ticks: {
          maxTicksLimit: 6
        },
        maxBarThickness: 25,
      }],
      yAxes: [{
        ticks: {
          min: 0,
          maxTicksLimit: 5,
          padding: 10,
          callback: function(value, index, values) {
            return number_format(value, 2, '.', ' ');
          }
        },
        gridLines: {
          color: "rgb(234, 236, 244)",
          zeroLineColor: "rgb(234, 236, 244)",
          drawBorder: false,
          borderDash: [2],
          zeroLineBorderDash: [2]
        }
      }],
    },
    legend: {
      display: false
    },
    tooltips: {
      titleMarginBottom: 10,
      titleFontColor: '#6e707e',
      titleFontSize: 14,
      backgroundColor: "rgb(255,255,255)",
      bodyFontColor: "#858796",
      borderColor: '#dddfeb',
      borderWidth: 1,
      xPadding: 15,
      yPadding: 15,
      displayColors: false,
      caretPadding: 10,
      callbacks: {
        label: function(tooltipItem, chart) {
          var datasetLabel = chart.datasets[tooltipItem.datasetIndex].label || '';
          return datasetLabel + ": " + number_format(tooltipItem.yLabel, 2, '.', ' ');
        }
      }
    },
  }
});


// GES manche
var ctx_manche_ges = document.getElementById("manche_ges_barchart");
var chart_manche_ges = new Chart(ctx_manche_ges, {
  type: 'bar',
  data: {
    labels: labels_manche_ges,
    datasets: [{
      label: "Nombre de logements",
      backgroundColor: [
        'rgba(167,218,249,255)',  // Bleu ciel
        'rgba(141,180,213,255)',  // Bleu clair
        'rgba(117,146,176,255)',  // Bleu moyen
        'rgba(95,109,144,255)',  // Bleu foncé
        'rgba(76,81,111,255)',  // Bleu marine
        'rgba(57,55,79,255)',  // Violet foncé
        'rgba(39,27,51,255)'  // Violet foncé
      ],
      borderColor: [
        'rgba(167,218,249,255)',  // Bleu ciel
        'rgba(141,180,213,255)',  // Bleu clair
        'rgba(117,146,176,255)',  // Bleu moyen
        'rgba(95,109,144,255)',  // Bleu foncé
        'rgba(76,81,111,255)',  // Bleu marine
        'rgba(57,55,79,255)',  // Violet foncé
        'rgba(39,27,51,255)'  // Violet foncé
      ],
      hoverBackgroundColor: "#271b33",
      data: values_manche_ges,
    }],
  },
  options: {
    maintainAspectRatio: false,
    layout: {
      padding: {
        left: 10,
        right: 25,
        top: 25,
        bottom: 0
      }
    },
    scales: {
      xAxes: [{
        time: {
          unit: 'month'
        },
        gridLines: {
          display: false,
          drawBorder: false
        },
        ticks: {
          maxTicksLimit: 6
        },
        maxBarThickness: 25,
      }],
      yAxes: [{
        ticks: {
          min: 0,
          maxTicksLimit: 5,
          padding: 10,
          callback: function(value, index, values) {
            return number_format(value, 2, '.', ' ');
          }
        },
        gridLines: {
          color: "rgb(234, 236, 244)",
          zeroLineColor: "rgb(234, 236, 244)",
          drawBorder: false,
          borderDash: [2],
          zeroLineBorderDash: [2]
        }
      }],
    },
    legend: {
      display: false
    },
    tooltips: {
      titleMarginBottom: 10,
      titleFontColor: '#6e707e',
      titleFontSize: 14,
      backgroundColor: "rgb(255,255,255)",
      bodyFontColor: "#858796",
      borderColor: '#dddfeb',
      borderWidth: 1,
      xPadding: 15,
      yPadding: 15,
      displayColors: false,
      caretPadding: 10,
      callbacks: {
        label: function(tooltipItem, chart) {
          var datasetLabel = chart.datasets[tooltipItem.datasetIndex].label || '';
          return datasetLabel + ": " + number_format(tooltipItem.yLabel, 2, '.', ' ');
        }
      }
    },
  }
});


// PRECA manche
var ctx_manche_preca = document.getElementById("manche_preca_barchart");
var chart_manche_preca = new Chart(ctx_manche_preca, {
  type: 'horizontalBar',
  data: {
    labels: labels_manche_preca,
    datasets: [{
      label: "Nombre de foyers: ",
      backgroundColor: [
        'rgba(255,255,127,255)',  // Vert
        'rgba(224,197,89,255)',  // Jaune
        'rgba(192,139,58,255)',  // Orange clair
        'rgba(163,84,32,255)',  // Orange foncé
        'rgba(131,37,12,255)',  // Rouge foncé
      ],
      borderColor: [
        'rgba(255,255,127,255)',  // Vert
        'rgba(224,197,89,255)',  // Jaune
        'rgba(192,139,58,255)',  // Orange clair
        'rgba(163,84,32,255)',  // Orange foncé
        'rgba(131,37,12,255)',  // Rouge foncé
      ],
      hoverBackgroundColor: "#271b33",
      data: values_manche_preca,
    }],
  },
  options: {
    maintainAspectRatio: false,
    layout: {
      padding: {
        left: 10,
        right: 25,
        top: 25,
        bottom: 0
      }
    },
    scales: {
      xAxes: [{
        ticks: {
            min: 0,
            maxTicksLimit: 5,
            padding: 10,
            callback: function(value, index, values) {
              return number_format(value, 2, '.', ' ');
            }
          },
        gridLines: {
          display: false,
          drawBorder: false
        },
        ticks: {
          maxTicksLimit: 6
        },
        maxBarThickness: 25,
      }],
      yAxes: [{
        ticks: {
          min: 0,
          maxTicksLimit: 5,
          padding: 10,
          callback: function(value, index, values) {
            return number_format(value, 2, '.', ' ');
          }
        },
        gridLines: {
          color: "rgb(234, 236, 244)",
          zeroLineColor: "rgb(234, 236, 244)",
          drawBorder: false,
          borderDash: [2],
          zeroLineBorderDash: [2]
        }
      }],
    },
    legend: {
      display: false
    },
    tooltips: {
      titleMarginBottom: 10,
      titleFontColor: '#6e707e',
      titleFontSize: 14,
      backgroundColor: "rgb(255,255,255)",
      bodyFontColor: "#858796",
      borderColor: '#dddfeb',
      borderWidth: 1,
      xPadding: 15,
      yPadding: 15,
      displayColors: false,
      caretPadding: 10,
      callbacks: {
        label: function(tooltipItem, chart) {
          var datasetLabel = chart.datasets[tooltipItem.datasetIndex].label || '';
          return datasetLabel + ": " + number_format(tooltipItem.xLabel, 2, '.', ' ');
        }
      }
    },
  }
});




// CONFIANCE manche
var ctx_confiance_manche = document.getElementById("manche_confiance_piechart");
var manche_confiance_piechart = new Chart(ctx_confiance_manche, {
  type: 'doughnut',
  data: {
    labels: labels_manche_confiance,
    datasets: [{
      data: values_manche_confiance,
      backgroundColor: ['#1cc88a', '#36b9cc', '#858796'],
      hoverBackgroundColor: ['#2e59d9', '#17a673', '#2c9faf'],
      hoverBorderColor: "rgba(234, 236, 244, 1)",
    }],
  },
  options: {
    maintainAspectRatio: false,
    tooltips: {
      backgroundColor: "rgb(255,255,255)",
      bodyFontColor: "#858796",
      borderColor: '#dddfeb',
      borderWidth: 1,
      xPadding: 15,
      yPadding: 15,
      displayColors: false,
      caretPadding: 10,
    },
    legend: {
      display: false
    },
    cutoutPercentage: 80,
  },
});
