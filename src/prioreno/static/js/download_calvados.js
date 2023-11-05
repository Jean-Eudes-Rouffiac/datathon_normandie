// ------------------------------------------------------------------------------------------------------
//                   CALVADOS
// ------------------------------------------------------------------------------------------------------

var downloadPNG_dpe_calvados = document.getElementById('downloadPNG_dpe_calvados');

downloadPNG_dpe_calvados.addEventListener('click', function() {
    var url = chart_calvados_dpe.toBase64Image('image/png');
    var a = document.createElement('a');
    a.href = url;
    a.download = 'bar-chart-dpe-calvados.png';
    a.click();
});

var downloadPNG_ges_calvados = document.getElementById('downloadPNG_ges_calvados');

downloadPNG_ges_calvados.addEventListener('click', function() {
    var url = chart_calvados_ges.toBase64Image('image/png');
    var a = document.createElement('a');
    a.href = url;
    a.download = 'bar-chart-ges-calvados.png';
    a.click();
});

var downloadPNG_preca_calvados = document.getElementById('downloadPNG_preca_calvados');

downloadPNG_preca_calvados.addEventListener('click', function() {
    var url = chart_calvados_preca.toBase64Image('image/png');
    var a = document.createElement('a');
    a.href = url;
    a.download = 'bar-chart-preca-calvados.png';
    a.click();
});

var downloadPNG_confiance_calvados = document.getElementById('downloadPNG_confiance_calvados');

downloadPNG_confiance_calvados.addEventListener('click', function() {
    var url = calvados_confiance_piechart.toBase64Image('image/png');
    var a = document.createElement('a');
    a.href = url;
    a.download = 'pie-chart-confiance-calvados.png';
    a.click();
});


function convertTableToCSV_calvados() {
    var table = document.getElementById("dataTableCalvados");
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

document.getElementById("downloadCSV_ville_calvados").addEventListener("click", function() {
    var csvContent = convertTableToCSV_calvados();
    var blob = new Blob([csvContent], { type: "text/csv" });
    var url = URL.createObjectURL(blob);

    var a = document.createElement("a");
    a.href = url;
    a.download = "top_20_villes_preca_calvados.csv";
    a.style.display = "none";

    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
});