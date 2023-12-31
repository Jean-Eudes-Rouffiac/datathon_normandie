// ------------------------------------------------------------------------------------------------------
//                   orne
// ------------------------------------------------------------------------------------------------------

var downloadPNG_dpe_orne = document.getElementById('downloadPNG_dpe_orne');

downloadPNG_dpe_orne.addEventListener('click', function() {
    var url = chart_orne_dpe.toBase64Image('image/png');
    var a = document.createElement('a');
    a.href = url;
    a.download = 'bar-chart-dpe-orne.png';
    a.click();
});

var downloadPNG_ges_orne = document.getElementById('downloadPNG_ges_orne');

downloadPNG_ges_orne.addEventListener('click', function() {
    var url = chart_orne_ges.toBase64Image('image/png');
    var a = document.createElement('a');
    a.href = url;
    a.download = 'bar-chart-ges-orne.png';
    a.click();
});

var downloadPNG_preca_orne = document.getElementById('downloadPNG_preca_orne');

downloadPNG_preca_orne.addEventListener('click', function() {
    var url = chart_orne_preca.toBase64Image('image/png');
    var a = document.createElement('a');
    a.href = url;
    a.download = 'bar-chart-preca-orne.png';
    a.click();
});

var downloadPNG_confiance_orne = document.getElementById('downloadPNG_confiance_orne');

downloadPNG_confiance_orne.addEventListener('click', function() {
    var url = orne_confiance_piechart.toBase64Image('image/png');
    var a = document.createElement('a');
    a.href = url;
    a.download = 'pie-chart-confiance-orne.png';
    a.click();
});


function convertTableToCSV_orne() {
    var table = document.getElementById("dataTableorne");
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

document.getElementById("downloadCSV_ville_orne").addEventListener("click", function() {
    var csvContent_orne = convertTableToCSV_orne();
    var blob_orne = new Blob([csvContent_orne], { type: "text/csv" });
    var url_orne = URL.createObjectURL(blob_orne);

    var a_orne = document.createElement("a");
    a_orne.href = url_orne;
    a_orne.download = "top_20_villes_preca_orne.csv";
    a_orne.style.display = "none";

    document.body.appendChild(a_orne);
    a_orne.click();
    document.body.removeChild(a_orne);
    URL.revokeObjectURL(url);
});