


document.addEventListener('DOMContentLoaded', function(){
    iniciarApp();
})

function iniciarApp(){
    //Ponemos la navegacion fija
    navegacionFija();

    crearGaleria();

    //Que se direccione un poco mas suave 
    scrollNav();
}

function crearGaleria(){
    //Buscamos el selector donde vamos a inyectar las imagenes 
    const galeria = document.querySelector('.galeria-imagenes')

    for(let i = 1; i<= 12; i++){
        console.log(i)
        const imagen = document.createElement('picture');
        imagen.innerHTML = `<source srcset="build/imgAvif/thumb/${i}.avif" type ="image/avif" >
        <source srcset="build/imgWebp/thumb/${i}.webp" type ="image/webp" >

        <img loading="lazy" width="200" height="300" src="build/img/thumb/${i}.jpg" alt="Imagen de galeria">'; `

        imagen.onclick = function(){
            mostrarImagen(i);
        }
        galeria.appendChild(imagen);
    }
}

function mostrarImagen(index){
    console.log('Mostrando imagen....');

    const imagen = document.createElement('picture');

    imagen.innerHTML = `<source srcset="build/imgAvif/grande/${index}.avif" type ="image/avif" >
    <source srcset="build/imgWebp/grande/${index}.webp" type ="image/webp" >

    <img loading="lazy" width="200" height="300" src="build/img/grande/${index}.jpg" alt="Imagen de galeria">'; `;

    //Crear overlay con la imagen
    const overlay = document.createElement('div');
    overlay.appendChild(imagen);
    overlay.classList.add('overlay');
    // Para que se quite con presionar en cualquier lugar
    overlay.onclick = function(){
         // Para quitar la clase que se fije
         const body = document.querySelector('body')
         body.classList.remove('fijar-body')
 
         //Remove es una funcion de javascript
 
         overlay.remove();
    }

    //Boton para cerrar el modal
    const cerrarModal = document.createElement('p');
    cerrarModal.textContent = 'X';
    cerrarModal.classList.add('btn-cerrar');
    cerrarModal.onclick = function(){
        // Para quitar la clase que se fije
        const body = document.querySelector('body')
        body.classList.remove('fijar-body')

        //Remove es una funcion de javascript

        overlay.remove();
    }
    // Lo agregamos en el overlay
    overlay.appendChild(cerrarModal);

    // Buscamos el lugar en el documento para agregar las varibles
    const body = document.querySelector('body');
    body.appendChild(overlay);
    // Clase para que no pueda dar scroll
    body.classList.add('fijar-body')

}
// Funcion para ir rapido a una seccion
function scrollNav(){
    const enlaces = document.querySelectorAll('.navegacion-principal');

    enlaces.forEach( enlace =>{
        enlace.addEventListener('click', function(e){

            e.preventDefault();
            const direccion = e.target.attributes.href.value;
            const seccion = document.querySelector(direccion);

            seccion.scrollIntoView({
                behavior: "smooth"
            });
        })
    })
}

// Navegacion fija 
function navegacionFija(){
    const barra = document.querySelector('.header');

    //Cuando llegue a sobre-festival, hacemos que aparezca el header de nuevo
    const sobreFestival = document.querySelector('.sobre-festival')

    const body = document.querySelector('body');

    window.addEventListener('scroll', function(){
        const w = sobreFestival.getBoundingClientRect() 

        if(w.top <0){
            //Ya pase el elemento
            barra.classList.add('fijo')
            body.classList.add('body-scroll')
        }
        else{
            barra.classList.remove('fijo')
            body.classList.remove('body-scroll')
        }
    })
}








