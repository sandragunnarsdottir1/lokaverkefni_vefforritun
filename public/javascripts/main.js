$(document).ready(function() {
  'use strict';


  $('.ch').click(function(e){
    e.preventDefault();
    var allLi = document.querySelectorAll('.ch');
    for (var i = 0; i < allLi.length; i++){
      allLi[i].classList.remove('active');
    };

    var channel = $(this).attr('id');
    $(this).addClass("active");
    //table(channel);
    getChannel(channel);


  });



  var trHTML = '';

/*
//var i = 0;
//var results= [a];
function table (name) {

  if(document.querySelector('tr') !== null ){
    $('tbody').empty();
    $('tbody').append('<tr><td colspan="5">Hleð gögnum...</td></tr>');
  }  
  $.ajax({
    url: 'dagskrain/stod',
    type: 'GET',
    data: 'idChannel='+name+'',
    success: function (response) {
      var trHTML = '';
      //var i = 0;
      //var results = response.results;
      //var time = results[i].starttime;
      //var title = results[i].title + ' ('+ results[i].episode +' af '+results[i].series + ')';
     // var length = results[i].duration;
      $.each(response, function (i,results) {
        for (var i = 0; i < results.length; i++){ 
          var t = results[i].starttime.split(/[- :]/);
          var timi = t[3] +':'+ t[4];
          var title = "";
          var episode = results[i].episode; 
          var series = results[i].series;
          if (episode=== '' || episode === '1' && series === '' || series === '1') {
            title = results[i].title;
          }
          else{
            title = results[i].title + ' ('+episode+' af '+series+ ')';
          }
  

          trHTML += '<tr><td>' + timi + 
          '</td><td>' + title +
          '</td><td>' + results[i].duration +
          '</td><td><a>' + 'Nánar lýsing' + 
          '</a></td></tr>';      
        }
    });
      if(document.querySelector('tr') !== null ){
        $('tbody').empty();
      }  
      $('tbody').append(trHTML);    

    }

  });
}
 */ 




  
  function getChannel (name) {
    trHTML = '';
    if(document.querySelector('tr') !== null ){
      $('tbody').empty();
      $('tbody').append('<tr><td colspan="5">Hleð gögnum...</td></tr>');
    }; 
    $.ajax({
    url: 'dagskrain/stod',
    type: 'GET',
    data: 'idChannel='+name+'',
    success: function (response) {
      $.each(response, function (i,results) {
        for (var i = 0; i < results.length; i++) {
          var data = [];
          data.push(results[i].starttime.split(/[- :]/));
          data.push(results[i].title);
          data.push(results[i].episode);
          data.push(results[i].series);
          data.push(results[i].duration);

          data.push(results[i].description);
          data.push(results[i].live);
          data.push(results[i].premier);
          data.push(results[i].originalTitle);
          data.push(results[i].shortDescription);
          data.push(results[i].aspectRatio);

      
          createTable(data);
        };
      });
      insertTableToWeb();
    }  
    });
        
  };




 
  function createTable(data) {
  //console.log('tókst að gera createTable')

    var time = data [0][3] + ':' + data [0][4]; 
    var title = data[1];
    var episodeOfSeries = '';
    if (!(data[2] === '' || data[2] === '1' && data[3] === '' || data[3] === '1')) {
      episodeOfSeries = ' ('+data[2]+' af '+data[3]+ ')';
    };
    var duration = data[4];

    trHTML += '<tr><td>' + time + 
   '</td><td>' + title + episodeOfSeries +
   '</td><td>' + duration +
   '</td><td><a>' + 'Nánar lýsing' + 
   '</a></td></tr>';   

   // console.log(trrHTML)
       
  };

  function insertTableToWeb () {
  
    if(document.querySelector('tr') !== null ){
      $('tbody').empty();
    };  
    $('tbody').append(trHTML);    
  };







   


  getChannel('ruv');

});
