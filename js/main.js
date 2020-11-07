if ("serviceWorker" in navigator) {
    window.addEventListener("load", function () {
      navigator.serviceWorker
        .register("sw.js")
        .then((res) => console.log("service worker registered"))
        .catch((err) => console.log("service worker not registered", err));
    });
}
 

function indexPage($element,listadePeliculas){
  const mainAppTpl = 
        listadePeliculas.map(
          function(el, index){
          return `<div class="uk-child-width-1-2@s uk-grid-match" uk-grid>
                <div>
                  <div class="uk-card uk-card-default">
                      <div class="uk-card-media-top">
                          <img src="${el.imagen}" width="300" height="250" alt="">
                      </div>
                      <div class="uk-card-body">
                          <h3 class="uk-card-title">${el.titulo}</h3>
                          <p class="uk-text-small">${el.descripcion}</p>
                      </div>
                  </div>
                </div>
              </div>`
        });
  $element.innerHTML = mainAppTpl;
}


function main(url){
  const $app = document.getElementById('app');
  fetch(url+"/flixnet/api/peliculas.php", { method: "get" })
  .then(function(response) {
    return response.json();
  })
  .then(function(data) {
    indexPage($app, data.response)
  })
  .catch(function(err) {
    console.error(err)
  });
}


window.onload = function(e){
  const url = "https://fruiteater.000webhostapp.com"
  main(url);
};