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
      var resultOverlay = '';
      var language;
      var followers;
      var repo_url;
      var description;

      for(var i = 0; i < data.items.length; i++) {
        language = data.items[i].language;
        repo_url = data.items[i].git_url;
        description = data.items[i].description;
        resultHTML += '<li class="listItem">'
        resultHTML += 'Repository: <a class="overlayOpen" href="#">'+data.items[i].name+'</a>' + ' ' + 'Username: '+data.items[i].owner.login
        resultHTML += '<p class="info">'+language+ ' '+repo_url+' '+description+'</p>'
        resultHTML += '</li>'
      }
      

      $('#results-container').html(resultHTML);
      
      // clicking an a tag will fire a function that opens an overlay
      // overlay should show the repos language, followers, url, and description
      

    });

  }//ends getResults 

  $('#searchButton').click(getResults);

   $('body').on('click','a', function(e) {
        e.preventDefault();
        $(this).parent('li').find('p.info').slideToggle('fast');
      });


});//ends document.ready




