
$(function() {
	
  var apiUrl = window.location.origin + "/poll/";
	
	$.get('/api/:id/polls', function(data) {
		data.forEach( function(poll) {
			$('#poll-list').append('<a href=' + apiUrl + poll._id +'><h4 class="poll-list-item">' + poll.pollName + '</h4></a>');
	  });
	});
	
});