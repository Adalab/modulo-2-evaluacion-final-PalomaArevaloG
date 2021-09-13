/* eslint-disable indent */
'use strict';

// Variables
const input = document.querySelector('.js_input');
const btnSearch = document.querySelector('.js_btn-search');
let favorites = document.querySelector('.js_fav');
let list = document.querySelector('.js_list');

const btnReset = document.querySelector('.js_btn-reset');

//variable para el array que de el fetch
let arrayShows = [];
//variable de favoritos
let arrayFavs = [];

//Función para búsqueda Fetch

function handleSearch(ev) {
    ev.preventDefault();
    let shows = input.value;
    fetch(`//api.tvmaze.com/search/shows?q=${shows}`)
        .then((response) => response.json())
        .then((data) => {
            arrayShows = data;
            paintShows();
            paintFavs();
            setInLocalStorage();
        });
}
//Función para pintar la búsqueda
function paintShows() {
    let html = '';
    //si el elemento que quiero pintar está en arrayfav añadele la clase favorite
    let favClass = '';
    for (const data of arrayShows) {
        const isFav = isFavorite(data);
        if (isFav) {
            favClass = 'favorite';
            favorites.innerHTML += html;
        } else {
            favClass = '';
        }

        if (data.show.image === null) {
            html += `<li id="${data.show.id}" class="list-show js_list-show ${favClass}">`;
            html += `<div class="result js_result ">`;
            html += `<h2 class="js_showName showName">${data.show.name}</h2>`;
            html += `<img class="js-image img" src="https://via.placeholder.com/210x295/ffffff/666666/?text=TV"/>`;
            html += `</div></li>`;
        } else {
            html += `<li id="${data.show.id}" class="list-show js_list-show ${favClass}">`;
            html += `<div class="result js_result ">`;
            html += `<h2 class="js_showName showName">${data.show.name}</h2>`;
            html += `<img class="js-image img" src="${data.show.image.medium}"/>`;
            html += `</div></li>`;
        }
    }
    list.innerHTML = html;
    listenShows();
}
//Función para coger los favoritos
function handleFavs(ev) {
    const selectedShow = parseInt(ev.currentTarget.id);

    const objectClicked = arrayShows.find((fav) => {
        return fav.show.id === selectedShow;
    });
    const favoritesFound = arrayFavs.findIndex((fav) => {
        return fav.show.id === selectedShow;
    });
    if (favoritesFound === -1) {
        arrayFavs.push(objectClicked);
        // añadir con un push la serie clickada buscar en arrayShows el elemento de array shows que tenga ese id y añadirlo a arrayFavs
    } else {
        arrayFavs.splice(favoritesFound, 1);
    }
    paintShows();
    paintFavs();
}

// Función para coger los favoritos
function listenShows() {
    const listShows = document.querySelectorAll('.js_list-show');

    for (const showEl of listShows) {
        showEl.addEventListener('click', handleFavs);
    }
}
//Función que verifica si es favorito
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
//Función para pintar los favoritos
function paintFavs() {
    let htmlFav = '';
    for (const fav of arrayFavs) {
        if (fav.show.image === null) {
            htmlFav += `<li id="${fav.show.id}" class="list-show js_list-show">`;
            htmlFav += `<div class="result js_result ">`;
            htmlFav += `<h2 class="js_showName showName">${fav.show.name}</h2>`;
            htmlFav += `<img class="js-image img-fav" src="https://via.placeholder.com/210x295/ffffff/666666/?text=TV"/><i class="fas fa-times js_icon"></i>`;
            htmlFav += `</div></li>`;
        } else {
            htmlFav += `<li id="${fav.show.id}" class="list-show js_list-show">`;
            htmlFav += `<div class="result js_result ">`;
            htmlFav += `<h2 class="js_showName showName">${fav.show.name}</h2>`;
            htmlFav += `<img class="js-image img-fav" src="${fav.show.image.medium}"/><i class="fas fa-times js_icon"></i>`;
            htmlFav += `</div></li>`;
        }
    }
    favorites.innerHTML = htmlFav;
    setInLocalStorage(); //almaceno favs en localstorage
    clickedIcon();
}
//funcion para almacenar en local storage
function setInLocalStorage() {
    const stringFavs = JSON.stringify(arrayFavs);
    localStorage.setItem('arrayFavs', stringFavs);
}
//funcion para buscar en local storage
function getLocalStorage() {
    //Obtenemos lo que hay en el local storage
    const localStorageFavs = localStorage.getItem('arrayFavs');
    //preguntamos si lo que me ha devuelto está vacío o no
    if (localStorageFavs === null) {
        //si está vacio ejecuto fetch
        handleSearch();
        //y si no pintamos lo que está en localstorage
    } else {
        const arrayLocalStorage = JSON.parse(localStorageFavs);
        arrayFavs = arrayLocalStorage;
        paintFavs();
    }
}

// quitar favs

//escucho el icono
function clickedIcon() {
    const deleteIcons = document.querySelectorAll('.js_icon');
    for (const deleteIcon of deleteIcons) {
        deleteIcon.addEventListener('click', removeFav);
    }
}

//funcion para quitar de favoritos al pulsar el icono
function removeFav(event) {
    const icon = parseInt(event.currentTarget.id);
    const favFound = arrayFavs.findIndex((fav) => fav.id === icon);

    arrayFavs.splice(favFound, 1);

    setInLocalStorage();
    paintFavs();
    paintShows();
}

//funcion para quitar todos los favoritos al pulsar reset
function removeAllFavs() {
    arrayFavs = [];
    setInLocalStorage();
    paintFavs();
    paintShows();
}
//escucho el botón de borrar
btnReset.addEventListener('click', removeAllFavs);
//escucho el boton de búsqueda
btnSearch.addEventListener('click', handleSearch);
getLocalStorage();