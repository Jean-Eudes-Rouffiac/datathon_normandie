$('#filterButtonCarte').click(function(event) {
    console.log("ok");
    // Récupérez la valeur du champ de texte
    var codeINSEEValue = $('#codeINSEEFilterCarte').val();

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

  

  $('#filterFormIdCarte').submit(function(event) {
    console.log("ok");

      var selectedDPEValues = [];
      var selectedGESValues = [];
      var selectedScorePrecaValues = [];
      var selectedConfianceValues = [];
      var isPotentielSelected = false;
      var codeINSEEValue = '';

      // Sélectionnez les éléments de chaque groupe de filtres.
      var dpeCheckboxes = document.querySelectorAll('input[id^="cartedpeCheckbox"]:checked');
      var gesCheckboxes = document.querySelectorAll('input[id^="cartegesCheckbox"]:checked');
      var scorePrecaCheckboxes = document.querySelectorAll('input[id^="carteprecaCheckbox"]:checked');
      var confianceCheckboxes = document.querySelectorAll('input[id^="carteconfianceCheckbox"]:checked');
      var potentielCheckbox = document.querySelector('input[id="cartepotentielCheckboxOui"]');
      var codeINSEEInput = document.getElementById('codeINSEEFilterCarte');

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
          url: "/get_filtered_carte", 
          data: {
            dpe: selectedDPEValues,
            ges: selectedGESValues,
            score_preca: selectedScorePrecaValues,
            confiance: selectedConfianceValues,
            potentiel: isPotentielSelected,
            code_commune_insee: codeINSEEValue,
          },
          success: function(result){
            console.log(result);
            $('#frameId').html(result.iframe);
        }
      });
      event.preventDefault();
  });

$('#resetButtonCarte').click(function() {

    $('input:checkbox').prop('checked', false);
    $('#codeINSEEFilter').val('');


});

