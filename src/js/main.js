/* eslint-disable indent */
'use strict';

// Variables
const input = document.querySelector('.js_input'); // me traigo el input
const btnSearch = document.querySelector('.js_btn-search'); //me traigo el botón de favoritos
let favorites = document.querySelector('.js_fav'); // me traigo la lista de fav
let list = document.querySelector('.js_list'); // me traigo la lista de rtdos
const btnReset = document.querySelector('.js_btn-reset'); //me traigo el boton de reset
const numero = document.querySelector('.js-results');

//variable para el array que de el fetch
let arrayShows = [];
//variable de favoritos
let arrayFavs = [];

let arrayNumero = [2, 5, 9];
//Función para búsqueda Fetch

function handleSearch(ev) {
    ev.preventDefault(); // para que nos e recargue automaticamnete
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

function handleNumero() {
    for (const number of arrayNumero) {
        if (arrayShows.length >= number) {
            console.log(
                `El numero de resultados es: ${arrayShows.length} y es mayor que ${number}`
            );
        } else {
            console.log(
                `El numero de resultados es: ${arrayShows.length} y es menor que ${number}`
            );
        }
    }
}
numero.addEventListener('click', handleNumero);
//Función para pintar la búsqueda
function paintShows() {
    let html = '';
    //si el elemento que quiero pintar está en arrayfav añadele la clase favorite
    let favClass = '';
    for (const data of arrayShows) {
        const isFav = isFavorite(data); // obtengo lo que me devuelve la funcion que comprueba si es favorito
        if (isFav) {
            favClass = 'favorite';
            favorites.innerHTML += html; // si lo es le añado la clase y lo meto en el html de favoritos
        } else {
            favClass = '';
        }

        if (data.show.image === null) {
            //si no tiene imagen pinto este html
            html += ` <li id = "${data.show.id}"
            class = "list-show js_list-show ${favClass}"> `;
            html += ` <div class = "result js_result "> `;
            html += ` <h2 class = "js_showName showName"> ${data.show.name} </h2>`;
            html += `<p>${data.show.premiered}`;
            html += `<img class="js-image img" src="https://via.placeholder.com/210x295/ffffff/666666/?text=TV"/>`;
            html += `</div></li>`;
        } else {
            //si tiene pinto este otro
            html += `<li id="${data.show.id}" class="list-show js_list-show ${favClass}">`;
            html += `<div class="result js_result ">`;
            html += `<h2 class="js_showName showName">${data.show.name}</h2>`;
            html += `<p>${data.show.premiered}`;
            html += `<img class="js-image img" src="${data.show.image.medium}"/>`;
            html += `</div></li>`;
        }
    }
    numero.innerHTML = arrayShows.length;
    list.innerHTML = html; // meto la busqueda en la lista del html
    listenShows(); //después de modificar el html escucho de nuevo los eventos
}
//Función para coger los favoritos
function handleFavs(ev) {
    // obtengo el id de la serie clickada
    const selectedShow = parseInt(ev.currentTarget.id);
    //busco la serie clickada en el arrayshows
    const objectClicked = arrayShows.find((data) => {
        return data.show.id === selectedShow;
    }); //busco si la serie clicada esta en arrayfavs
    const favoritesFound = arrayFavs.findIndex((fav) => {
        return fav.show.id === selectedShow;
    });
    if (favoritesFound === -1) {
        arrayFavs.push(objectClicked);
        // añadir con un push la serie clickada buscar en arrayShows el elemento de array shows que tenga ese id y añadirlo a arrayFavs
    } else {
        //si no lo saco de favoritos con splice con el indice del elto que quiiero borrar y que solo es un elto
        arrayFavs.splice(favoritesFound, 1);
    }
    paintShows(); //vuelvo a pintar la busqueda
    paintFavs(); //vulvo a pintar los que son favs
}

// función escucho eventos sobre los elementos del array
function listenShows() {
    //selecciono los elementos pintados en la lisat
    const listShows = document.querySelectorAll('.js_list-show');
    //recorro el arrayShows y escucho que al hacer click me seleccione que sea fav
    for (const showEl of listShows) {
        showEl.addEventListener('click', handleFavs);
    }
}
//Función que verifica si es favorito
function isFavorite(data) {
    //compruebo que la serie está en favoritos comparando los datos del arrayshows con los del array fav
    const favoriteFound = arrayFavs.find((fav) => {
        return fav.show.id === data.show.id;
    });
    if (favoriteFound === undefined) {
        return false; //si no está en favoritos
    } else {
        return true; //si está en favoritos
    }
}
//Función para pintar los favoritos
function paintFavs() {
    let htmlFav = ''; //creo una vble para meter el html de fav
    for (const fav of arrayFavs) {
        //para la constante fav de arrayfavs creo html dependiendo de si tien o no imagen
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
    favorites.innerHTML = htmlFav; //meto los favoritos en el html
    setInLocalStorage(); //almaceno favs en localstorage
    clickedIcon(); //ecsucho el icono de favs
}
//funcion para almacenar en local storage
function setInLocalStorage() {
    //transformo a string el array de favs
    const stringFavs = JSON.stringify(arrayFavs);
    //añadimos alo local storage el arrayfav en string
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
        paintFavs(); //cada vez que modifico pinto en favoritas
    }
}

// quitar favs

//escucho el icono
function clickedIcon() {
    const deleteIcons = document.querySelectorAll('.js_icon');
    for (const deleteIcon of deleteIcons) {
        //si pulso el icono aplico la funcion removefavs
        deleteIcon.addEventListener('click', removeFav);
    }
}

//funcion para quitar de favoritos al pulsar el icono
function removeFav(event) {
    const icon = parseInt(event.currentTarget.id); //cojo el evento del icono
    const favFound = arrayFavs.findIndex((fav) => fav.id === icon);

    arrayFavs.splice(favFound, 1);

    setInLocalStorage();
    paintFavs();
    paintShows();
}

//funcion para quitar todos los favoritos al pulsar reset
function removeAllFavs() {
    arrayFavs = []; //lo dejo vacio
    setInLocalStorage();
    paintFavs();
    paintShows();
}
//escucho el botón de borrar
btnReset.addEventListener('click', removeAllFavs);
//escucho el boton de búsqueda
btnSearch.addEventListener('click', handleSearch);
getLocalStorage();