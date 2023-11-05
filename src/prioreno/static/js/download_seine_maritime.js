// ------------------------------------------------------------------------------------------------------
//                   seine_maritime
// ------------------------------------------------------------------------------------------------------

var downloadPNG_dpe_seine_maritime = document.getElementById('downloadPNG_dpe_seine_maritime');

downloadPNG_dpe_seine_maritime.addEventListener('click', function() {
    var url = chart_seine_maritime_dpe.toBase64Image('image/png');
    var a = document.createElement('a');
    a.href = url;
    a.download = 'bar-chart-dpe-seine_maritime.png';
    a.click();
});

var downloadPNG_ges_seine_maritime = document.getElementById('downloadPNG_ges_seine_maritime');

downloadPNG_ges_seine_maritime.addEventListener('click', function() {
    var url = chart_seine_maritime_ges.toBase64Image('image/png');
    var a = document.createElement('a');
    a.href = url;
    a.download = 'bar-chart-ges-seine_maritime.png';
    a.click();
});

var downloadPNG_preca_seine_maritime = document.getElementById('downloadPNG_preca_seine_maritime');

downloadPNG_preca_seine_maritime.addEventListener('click', function() {
    var url = chart_seine_maritime_preca.toBase64Image('image/png');
    var a = document.createElement('a');
    a.href = url;
    a.download = 'bar-chart-preca-seine_maritime.png';
    a.click();
});

var downloadPNG_confiance_seine_maritime = document.getElementById('downloadPNG_confiance_seine_maritime');

downloadPNG_confiance_seine_maritime.addEventListener('click', function() {
    var url = seine_maritime_confiance_piechart.toBase64Image('image/png');
    var a = document.createElement('a');
    a.href = url;
    a.download = 'pie-chart-confiance-seine_maritime.png';
    a.click();
});


function convertTableToCSV_seine_maritime() {
    var table = document.getElementById("dataTableseine_maritime");
    var rows = table.rows;
    var csv = [];

    for (var i = 0; i < rows.length; i++) {
        var row = [];
        var cells = rows[i].cells;

        for (var j = 0; j < cells.length; j++) {
            row.push(cells[j].textContent);
        }

        csv.push(row.join(","));
    }

    return csv.join("\n");
}

document.getElementById("downloadCSV_ville_seine_maritime").addEventListener("click", function() {
    var csvContent = convertTableToCSV_seine_maritime();
    var blob = new Blob([csvContent], { type: "text/csv" });
    var url = URL.createObjectURL(blob);

    var a = document.createElement("a");
    a.href = url;
    a.download = "top_20_villes_preca_seine_maritime.csv";
    a.style.display = "none";

    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
});