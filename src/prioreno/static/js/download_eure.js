// ------------------------------------------------------------------------------------------------------
//                   eure
// ------------------------------------------------------------------------------------------------------

var downloadPNG_dpe_eure = document.getElementById('downloadPNG_dpe_eure');

downloadPNG_dpe_eure.addEventListener('click', function() {
    var url = chart_eure_dpe.toBase64Image('image/png');
    var a = document.createElement('a');
    a.href = url;
    a.download = 'bar-chart-dpe-eure.png';
    a.click();
});

var downloadPNG_ges_eure = document.getElementById('downloadPNG_ges_eure');

downloadPNG_ges_eure.addEventListener('click', function() {
    var url = chart_eure_ges.toBase64Image('image/png');
    var a = document.createElement('a');
    a.href = url;
    a.download = 'bar-chart-ges-eure.png';
    a.click();
});

var downloadPNG_preca_eure = document.getElementById('downloadPNG_preca_eure');

downloadPNG_preca_eure.addEventListener('click', function() {
    var url = chart_eure_preca.toBase64Image('image/png');
    var a = document.createElement('a');
    a.href = url;
    a.download = 'bar-chart-preca-eure.png';
    a.click();
});

var downloadPNG_confiance_eure = document.getElementById('downloadPNG_confiance_eure');

downloadPNG_confiance_eure.addEventListener('click', function() {
    var url = eure_confiance_piechart.toBase64Image('image/png');
    var a = document.createElement('a');
    a.href = url;
    a.download = 'pie-chart-confiance-eure.png';
    a.click();
});


function convertTableToCSV_eure() {
    var table = document.getElementById("dataTableeure");
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

document.getElementById("downloadCSV_ville_eure").addEventListener("click", function() {
    var csvContent = convertTableToCSV_eure();
    var blob = new Blob([csvContent], { type: "text/csv" });
    var url = URL.createObjectURL(blob);

    var a = document.createElement("a");
    a.href = url;
    a.download = "top_20_villes_preca_eure.csv";
    a.style.display = "none";

    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
});