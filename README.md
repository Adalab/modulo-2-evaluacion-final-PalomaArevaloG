- [ x] Búsqueda
  - [ x]Al hacer clic sobre el botón de Buscar, la aplicación debe conectarse al API abierto de TVMaze para búsqueda de series. Os recomendamos echar un vistazo al JSON que devuelve una petición de búsqueda para ver qué datos son los que necesitamos: https://api.tvmaze.com/search/shows?q=girls
  - [x ]Para construir la URL de búsqueda hay que recoger el texto que ha introducido la usuaria en el campo de búsqueda.
  - [x] Por cada show contenido en el resultado de la búsqueda hay que pintar una tarjeta donde mostramos una imagen de la serie y el título.
  - [x] Algunas de las series que devuelve el API no tienen imagen. En ese caso hay que mostrar una imagen de relleno. Podemos crear una imagen de relleno con el servicio de placeholder.com donde en la propia URL indicamos el tamaño, colores, texto: https://via.placeholder.com/210x295/ffffff/666666/?text=TV.
    - [x]Si buscamos la serie dexter veremos que algunas de las series devueltas por el API no tienen imagen.
    - [x]Si buscamos la serie tronos veremos que todas las series devueltas por el API sí tienen imagen.
  - [x]Para pintar la información en la página se puede elegir entre hacerlo de forma básica con innerHTML o manipulando de forma avanzada el DOM.
    notas

* Usad la dirección del enlace anterior, pero sin https: ni http:
  //api.tvmaze.com/search/shows?q=girls
* Usad ev.preventDefault() para evitar que se recargue la página involuntariamente.

- [] Favoritos -[x]Una vez aparecen los resultados de búsqueda, la usuaria puede indicar cuáles son nuestras series favoritas.Para ello, al hacer clic sobre una serie debe pasar lo siguiente: -[x]El color de fondo y el de fuente se intercambian, indicando que es una serie favorita.
  -[]Hay que mostrar un listado en la parte izquierda de la pantalla, debajo del formulario de búsqueda,con las series favoritas. Os recomendamos crear un variable o constante de tipo array en JS para almacenar las series favoritas.
  -[]Las series favoritas deben seguir apareciendo a la izquierda aunque la usuaria realice otra búsqueda

- [] Almacenamiento local
  -[]Hay que almacenar el listado de favoritos en el localStorage. De esta forma, al recargar la página el listado de favoritos se debe mostrarse.
- [] Bonus: Borrar favoritos
  - []Como bonus, os proponemos la opción de borrar favoritos. Al hacer clic sobre el icono de una 'x' al lado de cada favorito, hay que borrar el favorito clicado de la lista y del localStorage.
  - []Para terminar de rematar nuestra app de series, nos gustaría poder añadir/quitar como favorito al hacer clic sobre una serie del lado de la derecha. Y que, si realizamos una nueva búsqueda y sale una serie que ya es favorita, aparezca ya resaltada en los resultados de búsqueda (con colores de fondo y texto intercambiados).
  - [] Y ya sería fantástico si al final de la lista de favoritos hay un botón para borrarlos todos los favoritos a la vez.
- [] Bonus: Afinar maquetación
