'use strict';

(function() {

	var apiUrl = window.location.origin + "/api/:id/polls";
	
	$( '#options' ).click( function() {
		$( '#options-input' ).append('<input placeholder="Option" class="option" type="text"></input>');
	});

	$('#submitButton').click( function() {
		var data = { name: "", options: [] };
		data.name = $('#name').val();
		$('.option').each(function() {
			var optionText = $(this).val();
			if (optionText !== "") {
    			data.options.push({ text: optionText, votes: [] });
			}
		});
		if (data.name === "" || data.options.length < 2) {
			// alert user
		} else {
			$.post(apiUrl, data, function(data) {
				if (data) {
					console.log("Got this data: " + data);
				}
				
				//window.location.replace(window.location.origin + "/viewpolls");
			})
		}
	});

   
})();