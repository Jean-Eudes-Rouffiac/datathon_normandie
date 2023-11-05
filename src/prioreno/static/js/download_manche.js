// ------------------------------------------------------------------------------------------------------
//                   manche
// ------------------------------------------------------------------------------------------------------

var downloadPNG_dpe_manche = document.getElementById('downloadPNG_dpe_manche');

downloadPNG_dpe_manche.addEventListener('click', function() {
    var url = chart_manche_dpe.toBase64Image('image/png');
    var a = document.createElement('a');
    a.href = url;
    a.download = 'bar-chart-dpe-manche.png';
    a.click();
});

var downloadPNG_ges_manche = document.getElementById('downloadPNG_ges_manche');

downloadPNG_ges_manche.addEventListener('click', function() {
    var url = chart_manche_ges.toBase64Image('image/png');
    var a = document.createElement('a');
    a.href = url;
    a.download = 'bar-chart-ges-manche.png';
    a.click();
});

var downloadPNG_preca_manche = document.getElementById('downloadPNG_preca_manche');

downloadPNG_preca_manche.addEventListener('click', function() {
    var url = chart_manche_preca.toBase64Image('image/png');
    var a = document.createElement('a');
    a.href = url;
    a.download = 'bar-chart-preca-manche.png';
    a.click();
});

var downloadPNG_confiance_manche = document.getElementById('downloadPNG_confiance_manche');

downloadPNG_confiance_manche.addEventListener('click', function() {
    var url = manche_confiance_piechart.toBase64Image('image/png');
    var a = document.createElement('a');
    a.href = url;
    a.download = 'pie-chart-confiance-manche.png';
    a.click();
});


function convertTableToCSV_manche() {
    var table = document.getElementById("dataTablemanche");
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

document.getElementById("downloadCSV_ville_manche").addEventListener("click", function() {
    var csvContent = convertTableToCSV_manche();
    var blob = new Blob([csvContent], { type: "text/csv" });
    var url = URL.createObjectURL(blob);

    var a = document.createElement("a");
    a.href = url;
    a.download = "top_20_villes_preca_manche.csv";
    a.style.display = "none";

    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
});