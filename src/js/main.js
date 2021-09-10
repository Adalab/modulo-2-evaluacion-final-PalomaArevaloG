"use strict";
// Variables
const input = document.querySelector(".js_input");
const btnSearch = document.querySelector(".js_btn-search");
const fav = document.querySelector(".js_fav");
const list = document.querySelector(".js_list");

//variable para el array que de el fetch
let arrayShows = [];
let arrayFavs = [];

// //busqueda
function handleSearch(ev) {
    ev.preventDefault();
    let shows = input.value;
    fetch(`//api.tvmaze.com/search/shows?q=${shows}`)
        .then((response) => response.json())
        .then((data) => {
            arrayShows = data;

            paintShows();
        });
}
//pintar busqueda
function paintShows() {
    let html = "";
    for (const data of arrayShows) {
        console.log(data);
        console.log(data.show.name);
        if (data.show.image === null) {
            html += `<li class="js_list-show">`;
            html += `<div class="js_result">`;
            html += `<h2 class="js_showName">${data.show.name}</h2>`;
            html += `<img class="js-image" src="https://via.placeholder.com/210x295/ffffff/666666/?text=TV"/>`;
            html += `</div></li>`;
        } else {
            html += `<li class="js_list-show">`;
            html += `<div class="js_result">`;
            html += `<h2 class="js_showName">${data.show.name}</h2>`;
            html += `<img class="js-image" src="${data.show.image.medium}"/>`;
            html += `</div></li>`;
        }
    }
    list.innerHTML = html;
}

// //pintar favs
// function paintFavs() {}
// //almacenar
// function LocalStorage() {}
// //quitar favs
// function removeFavs() {}
//escucho el boton

btnSearch.addEventListener("click", handleSearch);