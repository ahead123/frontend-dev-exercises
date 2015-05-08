/*
    # Endpoint URL #
    
    https://api.github.com/legacy/repos/search/{query}
    legacy search is deprecated according to github api - v3 is recommended
    
    Note: Github imposes a rate limit of 60 request per minute. Documentation can be found at http://developer.github.com/v3/.
    
    # Example Response JSON #
    
    {
      "meta": {...},
      "data": {
        "repositories": [
          {
            "type": string,
            "watchers": number,
            "followers": number,
            "username": string,
            "owner": string,
            "created": string,
            "created_at": string,
            "pushed_at": string,
            "description": string,
            "forks": number,
            "pushed": string,
            "fork": boolean,
            "size": number,
            "name": string,
            "private": boolean,
            "language": number
          },
          {...},
          {...}
        ]
      }
    }
*/

var query;
var baseUrl = 'https://api.github.com/search/repositories?q=';
$(document).ready(function() {

  var getResults = function() {

    query = $('#search').val();

    $.getJSON(baseUrl+query, function(data){
      console.log(data);

      var resultHTML = '';

      for(var i = 0; i < data.items.length; i++) {
        resultHTML += '<li>'
        resultHTML += 'Repository: <a href="#">'+data.items[i].name+'</a>' + ' ' + 'Username: <a href="#">'+data.items[i].owner.login+'</a>'
        resultHTML += '</li>'
      }

      $('#results-container').html(resultHTML);

    });

  }//ends getResults 

  $('#searchButton').click(getResults);

});//ends document.ready




