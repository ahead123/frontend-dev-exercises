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

  $('#brand').show().animate({'left':'-=150px'}, 1200);
  $('#header > h1').fadeIn(2000);
  $('#search').fadeIn('fast').animate({'marginTop': '40px'}, 1000);
  $('#searchButton').fadeIn('fast').animate({'marginTop': '10px'}, 1200);

  var getResults = function() {

    // used to loop through returned JSON data and display in the HTML view
    var render = function(data) {

      $('#results-container').html(' ');
      var resultHTML = '';
      var language;
      var followers;
      var repo_url;
      var description;
      var resultCounter;
      var avatar;

      for(var i = 0; i < data.items.length; i++) {
        language = data.items[i].language;
        repo_url = data.items[i].html_url;
        description = data.items[i].description;
        followers = data.items[i].watchers;
        resultCounter = data.items.length;
        avatar = data.items[i].owner.avatar_url;
        resultHTML += '<li class="listItem">'
        resultHTML += '<span>Repository: <a href="#" class="resultLinks">'+data.items[i].name+'</a></span><br/>' + ' ' + '<span>Username: '+data.items[i].owner.login+'</span>'+'<img class="userAvatar" src="'+avatar+'">'
        resultHTML += '<p class="info"> <strong>Language:</strong> <span class="languageText">'+language+'</span><br/><strong>URL:</strong> <a href="'+repo_url+'" class="resultLinks">'+repo_url+' </a><br/>'+' '+'<strong>Description:</strong> <span class="redText">'+description+'</span><br/> <strong>Followers:</strong> <span class="twitterBlue">'+followers+'</span></p>'
        resultHTML += '</li>'
      }
  
      $('#results-container').append(resultHTML);
      $('#resultCount').fadeIn('fast').html('<a id="closer" href="#">close X</a> <br/><br/>('+resultCounter+') Repos showing for keyword '+'"'+query.toUpperCase()+'"'+'<br /><p>Scroll down to see the results!</p>'+'<p>And click on each repo name for more info!</p>'+'<a href="#gohere" class="dynamicLink"><i class="fa fa-caret-down fa-3x"></i></a>');
      $('#search').val(' ');
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
  
  // binds enter keypress event to getResults function
  $('#searchButton').click(getResults);

  $('input#search').keypress(function (e) {
    if (e.which == 13) {
      getResults();
    }
  });

  $('input#search').on('focus',function() {
    $('#resultCount').hide('fast');
  });

  $('body').on('click', 'a#closer', function() {
    $('#resultCount').hide('fast');
  })

   // show and hide the langauge, followers, url, and description for each result
   $('body').on('click','span', function(e) {
      e.preventDefault();
      $(this).parent('li').find('p.info').slideToggle('fast');
   });

   $('body').on('click', 'a.dynamicLink', function(e) {
      e.preventDefault();
      var target = $('#results-container');
      $('html, body').animate({
          scrollTop: target.offset().top
      }, 1000);
   });


});//ends document.ready




