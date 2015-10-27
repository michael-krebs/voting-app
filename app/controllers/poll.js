$(function(){

	var apiUrl = window.location.origin + "/api/poll/";
	
	var id = $('#hidden').text();
	
	var currentUserId = null;
	
	$.get(apiUrl + id, function(data) {
		
		$.get(window.location.origin + '/api/user_data', function(userData) {
			
			currentUserId = userData.id;

			var hasVoted = false;
			
			data.options.forEach(function(option) {
				option.votes.forEach( function(vote) {
					if (vote === currentUserId) {
						$('#voteButton').hide();
						hasVoted = true;
					}
				});
			});

			if (data.userId !== userData.id) {
				$('#deleteButton').remove();
			} else {
				$('#deleteButton').click( function() {
					
					$.ajax({
						url: '/poll/' + id,
						type: 'DELETE'
					}, function() {
						console.log("got to here");
					});
					
					window.location.replace(window.location.origin + "/viewpolls");
				});
			}
			
			$("#poll-name").text(data.pollName);
			$("#poll-author").text('created by ' + data.username);
			
			var optionIndex = 0;
			
			data.options.forEach(function(option) {
				if (hasVoted) {
					$('#options').append('<div class="pollOption"><p><span class="numVotes"> '
					+ option.votes.length + '</span>' + option.text +'</p></div>');
				}
				else {
					$('#options').append('<div class="pollOption"><p><span class="numVotes"> '
					+ option.votes.length + '</span><input name="optionsGroup" type="radio" id='
					+ optionIndex + ' /><label for=' + optionIndex + '>' + option.text +
					'</label></p></div>');
				}
				optionIndex++;
			});
			
			$("input[id=0]").prop("checked", "checked");
			
			$('#voteButton').click(function() {
				var index = $("input[name=optionsGroup]:checked").prop('id');
				var data = { "optionIndex": index, "userId": currentUserId };
				$.post("/poll/" + id, data, function(result) {
					if (result == "no login") {
						window.location.replace(window.location.origin + "/login");
					} else {
						window.location.reload();
					}
				});
			});
		});
	});
});