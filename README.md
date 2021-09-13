# Evaluación módulo 1 Adalab

Aquí os presento mi proyecto de evalución del módulo 2

## ¿Qué es?

Se trata de una aplicación web de búsqueda de series de TV que nos permite marcar y desmarcar series como favoritas y guardarlas en el LocalStorage

## ¿Qué partes tiene?

-   **Maquetación**

    Tenemos un header con el título de la página y un main que incluye: - Formulario para la búsqueda de series - Sección para listar los resultados de la búsqueda - Sección para visualizar los favoritos marcados.
    Se ha querido homenajear el estilo de la desaparecida cadena de videoclubs Blockbuster buscando su tipografía y colores corporativos (el logo no lleva la misma tipografía sino similar ya que tiene copyright)

-   **Búsqueda**

    La usuaria introduce una palabra en el campo con el placeholder "Introduce aquí tu serie"

    Al hacer click sobre el botón Buscar, la aplicación se conecta al API abierto de TVMaze para la búsqueda de series y nos devuelve en la sección Resultados de la búsqueda el nombre de las 10 primeras series que coinciden con la palabra introducida junto con su imagen (si el API no tiene imagen nos devolverá una imagen de relleno)

-   **Favoritos**
    Una vez aparecen los resultados de búsqueda, la usuaria puede indicar cuáles son nuestras series favoritas.
    Para ello, al hacer clic sobre una serie:

    -   El color de fondo de la misma cambia a amarillo indicando que es una serie favorita.
    -   Se muestra un listado en la parte izquierda de la pantalla, debajo del formulario de búsqueda, con las series favoritas.

    Las series favoritas siguen apareciendo a la izquierda aunque la usuaria realice otra búsqueda

    Además tenemos la opción de borrar favoritos:

    -   Al hacer clic sobre el icono de una 'x' debajo de cada favorito, se borra el favorito clicado de la lista y del localStorage.
    -   Si clicamos en una serie que figura con fondo amarillo en la seccion de resultados la quita de favoritos
    -   Al realizar una nueva búsqueda, si sale una serie que ya es favorita aparece resaltada en los resultados de búsqueda
    -   Al final de la sección de favoritos tenemos un botón que borra todas las favoritas

-   **Almacenamiento local**
    Se almacena el listado de favoritos en el localStorage. De esta forma, al recargar la página el listado
    de favoritos se muestra.

## ¿Qué teconologías tiene?

He podido aplicar el temario del curso con las siguientes tecnologías:

-   HTML5, CSS3 (Sass, Flexbox, Grid, variables y MediaQueries)
-   Adalab Web Starter Kit (Gulp y Node)
-   GitHub (branches y pages).
-   JavaScript
-   Papel y lapiz para los bocetos.

## ¿Cómo se ejecuta?

1. Descarga este repositorio en zip o clonalo tu dispositivo con el comando `git clone`
2. Abre una terminal en la carpeta Master.
3. Instala dependencias locales con `npm install`
4. Arranca el proyecto con `npm start`
