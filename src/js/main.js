"use strict";
// Variables
const input = document.querySelector(".js_input");
const btnSearch = document.querySelector(".js_btn-search");
let favorites = document.querySelector(".js_fav");
let list = document.querySelector(".js_list");

//variable para el array que de el fetch
let arrayShows = [];
//VARIABLE DE FAVORITOS
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
    let favClass = "";
    //si el elto que quiero pintar está en arrayfav añadele la clase favorite

    for (const data of arrayShows) {
        const isFav = isFavorite(data);
        if (isFav) {
            favClass = "favorite";
        } else {
            favClass = "";
        }

        if (data.show.image === null) {
            html += `<li id="${data.show.id}" class="list-show js_list-show ${favClass}">`;
            html += `<div class="result js_result ">`;
            html += `<h2 class="js_showName">${data.show.name}</h2>`;
            html += `<img class="js-image" src="https://via.placeholder.com/210x295/ffffff/666666/?text=TV"/>`;
            html += `</div></li>`;
        } else {
            html += `<li id="${data.show.id}" class="list-show js_list-show ${favClass}">`;
            html += `<div class="result js_result ">`;
            html += `<h2 class="js_showName">${data.show.name}</h2>`;
            html += `<img class="js-image" src="${data.show.image.medium}"/>`;
            html += `</div></li>`;
        }
    }
    list.innerHTML = html;
    listenShows();
}
//PINTAR FAVS
function handleFavs(ev) {
    const selectedShow = parseInt(ev.currentTarget.id);

    const objectClicked = arrayShows.find((fav) => {
        return fav.show.id === selectedShow;
    });
    const favoritesFound = arrayFavs.findIndex((fav) => {
        return fav.id === selectedShow;
    });
    if (favoritesFound === -1) {
        arrayFavs.push(objectClicked);
        // añadir con un push la serie clickada buscar en arrayShows el elemento de array shows que tenga ese id y añadirlo a arrayFavs
    } else {
        arrayFavs.splice(favoritesFound, 1);
    }
    paintShows();
}

function listenShows() {
    const listShows = document.querySelectorAll(".js_list-show");

    for (const showEl of listShows) {
        showEl.addEventListener("click", handleFavs);
    }
}
//verifica si es favorito
function isFavorite(data) {
    const favoriteFound = arrayFavs.find((fav) => {
        return fav.show.id === data.show.id;
    });
    if (favoriteFound === undefined) {
        return false;
    } else {
        return true;
    }
}
// //almacenar
// function LocalStorage() {}
// //quitar favs
// function removeFavs() {}
//escucho el boton

btnSearch.addEventListener("click", handleSearch);