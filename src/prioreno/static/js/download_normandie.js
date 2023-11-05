// ------------------------------------------------------------------------------------------------------
//                   normandie
// ------------------------------------------------------------------------------------------------------

var downloadPNG_logement_normandie = document.getElementById('downloadPNG_logement_normandie');

downloadPNG_logement_normandie.addEventListener('click', function() {
    var url = chart_normandie_logement.toBase64Image('image/png');
    var a = document.createElement('a');
    a.href = url;
    a.download = 'bar-chart-logement-normandie.png';
    a.click();
});

/* var downloadPNG_ges_normandie = document.getElementById('downloadPNG_preca_normandie');

downloadPNG_ges_normandie.addEventListener('click', function() {
    var url = chart_normandie_ges.toBase64Image('image/png');
    var a = document.createElement('a');
    a.href = url;
    a.download = 'bar-chart-preca-normandie.png';
    a.click();
}); */

var downloadPNG_preca_normandie = document.getElementById('downloadPNG_preca_normandie');

downloadPNG_preca_normandie.addEventListener('click', function() {
    var url = chart_normandie_preca.toBase64Image('image/png');
    var a = document.createElement('a');
    a.href = url;
    a.download = 'bar-chart-preca-normandie.png';
    a.click();
});

/* var downloadPNG_confiance_normandie = document.getElementById('downloadPNG_confiance_normandie');

downloadPNG_confiance_normandie.addEventListener('click', function() {
    var url = normandie_confiance_piechart.toBase64Image('image/png');
    var a = document.createElement('a');
    a.href = url;
    a.download = 'pie-chart-confiance-normandie.png';
    a.click();
}); */


function convertTableToCSV_normandie() {
    var table = document.getElementById("dataTablenormandie");
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

document.getElementById("downloadCSV_ville_normandie").addEventListener("click", function() {
    var csvContent = convertTableToCSV_normandie();
    var blob = new Blob([csvContent], { type: "text/csv" });
    var url = URL.createObjectURL(blob);

    var a = document.createElement("a");
    a.href = url;
    a.download = "top_20_villes_preca_normandie.csv";
    a.style.display = "none";

    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
});