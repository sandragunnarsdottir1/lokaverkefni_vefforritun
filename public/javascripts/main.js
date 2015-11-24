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
    getChannel(channel);

    //console.log('id er ' + $(this)  )
  });




  var trHTML = '';
  
  function getChannel (name) {
    trHTML = '';
    if(document.querySelector('tr') !== null ){
      $('tbody').empty();
      $('tbody').append('<tr><td colspan="4">Hleð gögnum...</td></tr>');
    }; 
    $.ajax({
    url: 'dagskrain/stod',
    type: 'GET',
    data: 'idChannel='+name+'',
    success: function (response) {
      $.each(response, function (i,results) {
        for (var i = 0; i < results.length; i++) {
          var data = [];
          data.push(results[i].starttime.split(/[- :]/)); // 0
          data.push(results[i].title);  // 1
          data.push(results[i].episode); // 2
          data.push(results[i].series);  // 3
          data.push(results[i].duration.split(/[:]/));  // 4

          data.push(results[i].description);  // 5
          data.push(results[i].live);  // 6
          data.push(results[i].premier);  // 7
          data.push(results[i].originaltitle);  // 8
          data.push(results[i].shortdescription);  // 9
          data.push(results[i].aspectratio);  // 10
          
      
          createTable(data, i);
        };
      });
      insertTableToWeb();
    }  
    });
        
  };




 
  function createTable(data, id) {
  //console.log('tókst að gera createTable')

    var time = data [0][3] + ':' + data [0][4]; 
    var title = data[1];
    var episodeOfSeries = '';
    if (!(data[2] === '' || data[2] === '1' && data[3] === '' || data[3] === '1')) {
      episodeOfSeries = ' ('+data[2]+' af '+data[3]+ ')';
    };

    var duration = data[4][0]+':'+data[4][1];
    var description = data[5];
    var live = data[6];
    var premier = data[7];
    var aspectRatio = data[10];


    var link = '<a href="#" class="moreAbout" id="'+ id +'">'+
    '<span id="'+ id +'" class="glyphicon glyphicon-plus" aria-hidden="true"></span></a>';
    

    trHTML += '<tr>' +
                '<td>' + time + ''+
                '</td>' +
                '<td>' + title + episodeOfSeries + ''+
                '</td>' +
                '<td>' + duration + ''+
                '</td>'+
                '<td>'+ link +
                '</td>'+
              '</tr>'+
  
              '<tr class ="moreDetails hidden" id="'+id+'">'+
                '<td colspan="2" rowspan="3">' + 'Um Myndan: </br> '+description+' ' + ''+
                '</td>'+
                '<td>' + 'Beint:' + ''+
                '</td>'+
                '<td>' + live + ''+
                '</td>'+
              '</tr>'+
              '<tr class ="moreDetails hidden" id="'+id+'">'+
                '<td>' + 'Frumsýnd:' + ''+
                '</td>'+
                '<td>' + premier + ''+
                '</td>'+
              '</tr>'+
              '<tr class ="moreDetails hidden" id="'+id+'">'+
                '<td>' + 'Hlutfall:' + ''+
                '</td>'+
                '<td>' + aspectRatio + ''+
                '</td>'+
              '</tr>';
    
      //console.log('link er ' + link)
    

  };

  function insertTableToWeb () {
  
    if(document.querySelector('tr') !== null ){
      $('tbody').empty();
    };
    //console.log(trHTML);  
    $('tbody').append(trHTML);    

    $('.moreAbout').click(moreDetails);

  
  };

  function moreDetails(e) {
    e.preventDefault();
  
    var id = $(this).attr('id');
    var a = $('#'+id+'.glyphicon');
    var k = $('#'+id+'.moreDetails').hasClass('hidden');
    var p = $('#'+id+'.moreDetails')
    if(k){
      a[0].classList.remove('glyphicon-plus');  
      p[0].classList.remove('hidden');
      p[1].classList.remove('hidden');
      p[2].classList.remove('hidden');
      a[0].classList.add('glyphicon-minus');  
    }
    else
    {
      a[0].classList.remove('glyphicon-minus'); 
      p[0].classList.add('hidden');
      p[1].classList.add('hidden');
      p[2].classList.add('hidden');  
      a[0].classList.add('glyphicon-plus'); 
    };


  };





   


  getChannel('ruv');

});
