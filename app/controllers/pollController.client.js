'use strict';

(function() {

	var apiUrl = window.location.origin + "/app/:id/polls";
	
	$( '#options' ).click( function() {
		$( '#options-input' ).append('<input placeholder="Option" class="option" type="text"></input>');
	});

	$('#submitButton').click( function() {
		var data = { poll_name: null, poll_options: [] };
		data.poll_name = $('#name').val();
		$('.option').each(function() {
    		data.poll_options.push($(this).val());
		});
		console.log(data);
	});

   
})();