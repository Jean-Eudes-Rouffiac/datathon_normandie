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


// LOGEMENT normandie
var ctx_normandie_logement = document.getElementById("normandie_logement_barchart");
var chart_normandie_logement = new Chart(ctx_normandie_logement, {
  type: 'horizontalBar',
  data: {
    labels: labels_normandie_logement,
    datasets: [{
      label: "Nombre de logements",
      backgroundColor: [
        'rgba(208,233,238,1)',  // Nuances de bleu
        'rgba(163,215,239,1)', 
        'rgba(112,186,213,1)', 
        'rgba(62,145,185,1)',
        'rgba(30,123,166,1)', 
      ],
      borderColor: [
        'rgba(208,233,238,1)',  // Nuances de bleu
        'rgba(163,215,239,1)', 
        'rgba(112,186,213,1)', 
        'rgba(62,145,185,1)',
        'rgba(30,123,166,1)', 
      ],
      hoverBackgroundColor: "#271b33",
      data: values_normandie_logement,
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


// PRECA normandie
var ctx_normandie_preca = document.getElementById("normandie_preca_barchart");
var chart_normandie_preca = new Chart(ctx_normandie_preca, {
  type: 'bar',
  data: {
    labels: labels_normandie_departement,
    datasets: [{
      label: "1",
      backgroundColor: 'rgba(255,255,127,255)',
      borderColor: 'rgba(255,255,127,255)',
      hoverBackgroundColor: "#271b33",
      data: values_normandie_preca_1,
    },
    {
      label: "2",
      backgroundColor: 'rgba(224,197,89,255)',
      borderColor: 'rgba(224,197,89,255)',
      hoverBackgroundColor: "#271b33",
      data: values_normandie_preca_2,
    },
    {
      label: "3",
      backgroundColor: 'rgba(192,139,58,255)',
      borderColor: 'rgba(192,139,58,255)',
      hoverBackgroundColor: "#271b33",
      data: values_normandie_preca_3,
    },
    {
      label: "4",
      backgroundColor: 'rgba(163,84,32,255)',
      borderColor: 'rgba(163,84,32,255)',
      hoverBackgroundColor: "#271b33",
      data: values_normandie_preca_4,
    },
    {
      label: "5",
      backgroundColor: 'rgba(131,37,12,255)',
      borderColor: 'rgba(131,37,12,255)',
      hoverBackgroundColor: "#271b33",
      data: values_normandie_preca_5,
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
            return value + '%';
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
      display: true
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
          return datasetLabel + ": "  + tooltipItem.yLabel + "%"
        }
    },
    },
  }
});


// PRECA normandie
var ctx_normandie_dpe = document.getElementById("normandie_dpe_barchart");
var chart_normandie_dpe = new Chart(ctx_normandie_dpe, {
  type: 'bar',
  data: {
    labels: labels_normandie_departement_dpe,
    datasets: [{
      label: "A",
      backgroundColor: 'rgba(0, 100, 0, 0.6)',
      borderColor: 'rgba(0, 100, 0, 0.6)',
      hoverBackgroundColor: "#271b33",
      data: values_normandie_dpe_a,
    },
    {
      label: "B",
      backgroundColor: 'rgba(107, 142, 35, 0.6)',
      borderColor: 'rgba(107, 142, 35, 0.6)',
      hoverBackgroundColor: "#271b33",
      data: values_normandie_dpe_b,
    },
    {
      label: "C",
      backgroundColor: 'rgba(154, 205, 50, 0.6)',
      borderColor: 'rgba(154, 205, 50, 0.6)',
      hoverBackgroundColor: "#271b33",
      data: values_normandie_dpe_c,
    },
    {
      label: "D",
      backgroundColor: 'rgba(255, 255, 0, 0.6)',
      borderColor: 'rgba(255, 255, 0, 0.6)',
      hoverBackgroundColor: "#271b33",
      data: values_normandie_dpe_d,
    },
    {
      label: "E",
      backgroundColor: 'rgba(255, 165, 0, 0.6)',
      borderColor: 'rgba(255, 165, 0, 0.6)',
      hoverBackgroundColor: "#271b33",
      data: values_normandie_dpe_e,
    },
    {
      label: "F",
      backgroundColor: 'rgba(255, 69, 0, 0.6)',
      borderColor: 'rgba(255, 69, 0, 0.6)',
      hoverBackgroundColor: "#271b33",
      data: values_normandie_dpe_f,
    }
    ,
    {
      label: "G",
      backgroundColor: 'rgba(255, 0, 0, 0.6)',
      borderColor: 'rgba(255, 0, 0, 0.6)',
      hoverBackgroundColor: "#271b33",
      data: values_normandie_dpe_g,
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
            callbacks: {
              label: function(tooltipItem, chart) {
                var datasetLabel = chart.datasets[tooltipItem.datasetIndex].label || '';
                return datasetLabel + ": "  + tooltipItem.yLabel + "%"
              }
            },
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
            return value + '%';
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
      display: true
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
          return datasetLabel + ": "  + tooltipItem.yLabel + "%"
        }
    },
    },
  }
});



// Potentiel normandie
var ctx_normandie_potentiel = document.getElementById("normandie_potentiel_barchart");
var chart_normandie_potentiel = new Chart(ctx_normandie_potentiel, {
  type: 'bar',
  data: {
    labels: labels_normandie_potentiel,
    datasets: [{
      label: "Taux: ",
      backgroundColor: [
        'rgba(208,233,238,1)',  // Nuances de bleu
        'rgba(163,215,239,1)', 
        'rgba(112,186,213,1)', 
        'rgba(62,145,185,1)',
        'rgba(30,123,166,1)', 
      ],
      borderColor: [
        'rgba(208,233,238,1)',  // Nuances de bleu
        'rgba(163,215,239,1)', 
        'rgba(112,186,213,1)', 
        'rgba(62,145,185,1)',
        'rgba(30,123,166,1)', 
      ],
      hoverBackgroundColor: "#271b33",
      data: values_normandie_potentiel,
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
            return value + '%';
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
          return datasetLabel + ": "  + tooltipItem.yLabel + "%"
        }
    },
    },
  }
});
