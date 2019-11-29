function callAjax(url, titolo, type) { //Ajax set up from SEARCH-FUNTION
  $.ajax({
    url: url,
    method: "GET",
    data: {
      api_key: "0878a4f792be7a8e086e7aa5c1356f41",
      language: "it-IT",
      query: titolo
    },
    success: function(dati) {
      console.log(dati.results);
      var elements = dati.results;
      print(type, elements);
      if (elements.length > 0) {
        inputReset();
      }
    },
    error: function() {}
  }); //fine $.ajax
}
function inputReset() { //reset type input 
  $("#cerca").val("");
}
function print(type, elements) {//  OUTPUT
  $("#cerca").html("");
  var sorgente = $("#movies").html();
  var sorgDigerita = Handlebars.compile(sorgente);
  elements.forEach(z => { //cicle to every array object
    // console.log(z);
    // save the vote to be used on a function
    var title, orig_title, printOuput;
    if (type == "movie") {
      title = z.title;
      orig_title = z.original_title;
      printOuput = $("#films");
    } else {
      title = z.name;
      orig_title = z.original_name;
      printOuput = $("#tvSeries");
    }
    var vote = z.vote_average;
    var flag = z.original_language;
    var objRef = {
      img: z.backdrop_path,
      title: title,
      titleOrg: orig_title,
      lingua: z.original_language,
      nazione: nation(flag),
      voto: z.vote_average + " " + stars(vote),
      trama: z.overview
    };

    var elValorizzato = sorgDigerita(objRef);
    printOuput.append(elValorizzato);
  });
}

function stars(vote) {//star counters
  var vote5 = Math.floor(vote / 2);
  var vuoto5 = 5 - vote5;
  console.log(vote5);
  var starFont = "";
  for (let i = 0; i < 5; i++) {
    //   if (i <= vote5) {
    //     starFont += '<i class="fas fa-star"> </i>';
    //   }else{
    //     starFont += '<i class="far fa-star"></i>';
    //   }
    // OPERATORE TERNARNIO
    starFont +=
      i <= vote5
        ? '<i class="fas fa-star"> </i>'
        : '<i class="far fa-star"></i>';
  }
  return starFont;
}

function nation(flag) { //display flags by language 
  var paese = ["it", "cn", "en", "ja", "fr", "hi"];
  // if (flag === "it") {
  //   paese = 'it.png';
  // }else if (flag === "cn") {
  //   paese = 'cn.png';
  // }else if (flag === "en") {
  //   paese = 'uk.png';
  // }else if (flag === "ja") {
  //   paese = 'jp.png';
  // }else if (flag === "fr") {
  //   paese = 'fr.png';
  // }else if (flag === "hi") {
  //   paese = 'hi.png';
  // }else {
  //   paese = 'cn.png';
  // }
  if (paese.includes(flag)) {
    return flag + ".png";
  }
  return "";
}
function reset() {//reset #films and #tvSeries HTML
  
  $("#films").html("");
  $("#tvSeries").html("");
}
function search() { //get the element title lowercase it and replace spaces reset html and set up the link
  
  var titolo = $("#cerca")
    .val()
    .toLowerCase()
    .replace(/ /g, "+");
  reset();

  var urlMovie = "https://api.themoviedb.org/3/search/movie";
  var urlTv = "https://api.themoviedb.org/3/search/tv";
  callAjax(urlMovie, titolo, "movie");
  callAjax(urlTv, titolo, "tv");
}

$(document).ready(function() {
  $("#invia").click(search);

  $(this).on("mouseenter mouseleave", ".cardBody", function(e) {
    var pict = $(this).css("background-image");
    pict = pict.replace(/(?:^url\(["']?|["']?\)$)/g, "");
    var bg = e.type === "mouseenter" ? pict : " ";
    $("#backBg").css("background-image", "url(" + bg + ")");
  });//fine function mouse leave e mouse enter

});
