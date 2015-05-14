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
var dataCache = {};

$(document).ready(function() {

  var getResults = function() {

    // used to loop through returned JSON data and display in the HTML view
    var render = function(data) {
      var resultHTML = '';
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
        resultHTML += '<p class="info"> <strong>Language:</strong> '+language+ ' <strong>URL:</strong> '+repo_url+' <strong>Description:</strong> '+description+'</p>'
        resultHTML += '</li>'
      }
  
      $('#results-container').html(resultHTML);
    }

    // store search term 
    query = $('#search').val();

    // lookup query in cache. if present call render function and don't make the ajax call
    if(query in dataCache) {
      console.log('hit cache', query, dataCache[query]);
      render(dataCache[query]);
      return false;
    } 

    // make the ajax call and build the url 
    $.ajax({
      url: baseUrl+query
    // call a callback - add returned data to dataCache object - call render function
    }).done(function(data) {
      dataCache[query] = data;
      console.log(data);
      render(data);
    });

  }//ends getResults 

  $('#searchButton').click(getResults);

   // show and hide the langauge, followers, url, and description for each result
   $('body').on('click','a', function(e) {
      e.preventDefault();
      $(this).parent('li').find('p.info').slideToggle('fast');
   });


});//ends document.ready




