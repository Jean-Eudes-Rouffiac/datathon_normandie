$('#filterButtonTable').click(function(event) {
    // Récupérez la valeur du champ de texte
    var codeINSEEValue = $('#codeINSEEFilter').val();

    // Vérifiez si la valeur est vide
    if (codeINSEEValue.trim() === '') {
      // Affiche une alerte avec Toastr
      toastr.error("Veuillez entrer un code commune INSEE.");
      event.preventDefault();
    } else if (!/^\d{5}$/.test(codeINSEEValue)) {
        // Affiche une alerte avec Toastr
        toastr.error("Le code INSEE doit contenir exactement 5 chiffres.");
        event.preventDefault();
    }
  });

  

  $('#filterFormId').submit(function(event) {

      var dataTable = $('#dataTable').DataTable();
      dataTable.destroy();
      

      var selectedDPEValues = [];
      var selectedGESValues = [];
      var selectedScorePrecaValues = [];
      var selectedConfianceValues = [];
      var isPotentielSelected = false;
      var codeINSEEValue = '';

      // Sélectionnez les éléments de chaque groupe de filtres.
      var dpeCheckboxes = document.querySelectorAll('input[id^="dpeCheckbox"]:checked');
      var gesCheckboxes = document.querySelectorAll('input[id^="gesCheckbox"]:checked');
      var scorePrecaCheckboxes = document.querySelectorAll('input[id^="precaCheckbox"]:checked');
      var confianceCheckboxes = document.querySelectorAll('input[id^="confianceCheckbox"]:checked');
      var potentielCheckbox = document.querySelector('input[id="potentielCheckboxOui"]');
      var codeINSEEInput = document.getElementById('codeINSEEFilter');

      // Récupérez les valeurs finales de chaque filtre.
      dpeCheckboxes.forEach(function (checkbox) {
          selectedDPEValues.push(checkbox.value);
      });

      gesCheckboxes.forEach(function (checkbox) {
          selectedGESValues.push(checkbox.value);
      });

      scorePrecaCheckboxes.forEach(function (checkbox) {
          selectedScorePrecaValues.push(checkbox.value);
      });

      confianceCheckboxes.forEach(function (checkbox) {
          selectedConfianceValues.push(checkbox.value);
      });

      isPotentielSelected = potentielCheckbox ? potentielCheckbox.checked : false;
      codeINSEEValue = codeINSEEInput.value;

      // Affichez les valeurs finales des filtres dans la console.
      console.log("Valeurs finales du filtre DPE :", selectedDPEValues);
      console.log("Valeurs finales du filtre GES :", selectedGESValues);
      console.log("Valeurs finales du filtre Score précarité :", selectedScorePrecaValues);
      console.log("Valeurs finales du filtre Confiance :", selectedConfianceValues);
      console.log("Filtre Potentiel énergétique sélectionné :", isPotentielSelected);
      console.log("Valeur du champ de texte Code INSEE :", codeINSEEValue);


      $.ajax({
          type: 'POST',
          url: "/get_filtered_data", 
          data: {
            dpe: selectedDPEValues,
            ges: selectedGESValues,
            score_preca: selectedScorePrecaValues,
            confiance: selectedConfianceValues,
            potentiel: isPotentielSelected,
            code_commune_insee: codeINSEEValue,
          },
          success: function(data) {
            console.log(data)
            $('#dataTable').DataTable({
              data: data,
              columns: [
                  { data: 'Departement' },
                  { data: 'Commune' },
                  { data: 'Adresse' },
                  { data: 'Nombre de logements' },
                  { data: 'DPE' },
                  { data: 'GES' },
                  { data: 'Score Précarite' },
                  { data: 'Confiance' },
                  { data: 'Potentiel - Commune' },
                  { data: 'Potentiel - Adresse' },
                  { data: 'Potentiel - DPE' }
              ], 
              "pageLength": 50, // Définit le nombre de lignes par page par défaut à 50
              "lengthMenu": [10, 25, 50, 100, 200] // Définit les options de nombre de lignes par page
            }); 
          }
      });
      event.preventDefault();
  });


$('#resetButtonTable').click(function() {
  var dataTable = $('#dataTable').DataTable();
  dataTable.clear().draw();
  
  $('input:checkbox').prop('checked', false);
  $('#codeINSEEFilter').val('');

});


function convertTableToCSV_all() {
  var table = document.getElementById("dataTable");
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


document.getElementById("downloadCSV_datatable").addEventListener("click", function() {
  var csvContent = convertTableToCSV_all();
  var blob = new Blob([csvContent], { type: "text/csv" });
  var url = URL.createObjectURL(blob);

  var a = document.createElement("a");
  a.href = url;
  a.download = "csv_datatable.csv";
  a.style.display = "none";

  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
});

$('#dataTable').DataTable({
  "pageLength": 50, // Définit le nombre de lignes par page par défaut à 50
  "lengthMenu": [10, 25, 50, 100, 200], // Définit les options de nombre de lignes par page
  // ... autres options et colonnes ...
});