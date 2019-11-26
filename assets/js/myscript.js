function callAjax(titolo) {
  $.ajax({
    url: "https://api.themoviedb.org/4/search/movie",
    method: "GET",
    data: {
      api_key: "0878a4f792be7a8e086e7aa5c1356f41",
      language: "it-IT",
      query: titolo
    },
    success: function(dati) {
      console.log(dati.results);
      var movies = dati.results;
      print(movies);
      if (movies.length>0){
        inputReset();
      }

      //   per ogni object dentro l'array dati.response pusha il template clonato dentro il container #albums
      // dati.results.forEach(z => {
      //   console.log(z);
      //   var sorgente = $("#hb-template").html();
      //   var sorgDigerita = Handlebars.compile(sorgente);
      //   var objRef = {img:z.backdrop_path, title:z.title ,titleOrg:z.original_title,voto:z.vote_average };
      //   var elValorizzato  = sorgDigerita(objRef);
      //   $("#films").append(elValorizzato);

      // });
    },
    error: function() {}
  }); //fine $.ajax
}
function inputReset(){
  $('#cerca').val('');
}
function print(movies) {
  $("#cerca").html("");
  movies.forEach(z => {
    // console.log(z);
    var sorgente = $("#hb-template").html();
    var sorgDigerita = Handlebars.compile(sorgente);
    // save the vote to be used on a function
    var vote = z.vote_average;
    var objRef = {
      img: z.backdrop_path,
      title: z.title,
      titleOrg: z.original_title,
      voto: stars(vote)
    };
    
    var elValorizzato = sorgDigerita(objRef);
    $("#films").append(elValorizzato);
  });
}
function stars(vote){
  var vote5 = Math.floor(vote / 2);
  console.log(vote5);
  var starFont = "";
  for (let i = 0; i < vote5; i++) {
    starFont += '<i class="fas fa-star"> </i>';
  }
  return starFont;
  
}
$(document).ready(function() {
  // .toLowerCase().replace(/ /g,"+");
  $("#invia").click(function() {
    var titolo = $("#cerca")
      .val()
      .toLowerCase()
      .replace(/ /g, "+");
    $("#films").html("");
    console.log(titolo);
    callAjax(titolo);
  });
});
