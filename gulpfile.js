// Utilizamos las dependencias que ya hambiamos instalado
const {src, dest, watch, parallel} = require('gulp') //Retorna muchas funciones

//CSS
const sass = require('gulp-sass')(require('sass')) //Retorna una sola funcion
const plumber = require('gulp-plumber')

const autoprefixer  = require('autoprefixer') //Mejorar el codigo de css
const cssnano = require('cssnano')
const postcss = require('gulp-postcss')

const sourcemaps = require('gulp-sourcemaps') //Leer el css

const terser = require('gulp-terser-js') //Mejoramos el codigo javascript


// Imagenes
const webp = require('gulp-webp');
const imagemin = require('gulp-imagemin')
const cache = require('gulp-cache');
const avif = require('gulp-avif')

function css(done){
    console.log('Compilando SASS')

    // Compilacion de sass

    // -Identificar el archivo sass a compilar
    // Con el pipe indica que ya termino, pipe Compilarlo (sass), pipe Almacenarlo (dest)
    // Los **/* Son una forma recursiva para que lea todos los archivos de sass
    src('src/scss/**/*.scss').pipe( sourcemaps.init()).pipe( plumber() ).pipe( sass() ).pipe(postcss([autoprefixer(), cssnano()])).pipe(sourcemaps.write('.')).pipe( dest('build/css'))
    

    done()
}

function dev (done){
    watch('src/scss/**/*.scss', css)
    // Mandamos llamar la funcion de javascript
    watch('src/js/**/*.js', javascript)
    done();
}
function versionWebp(done){

    const opciones = {
        quality: 50
    };
    src('src/img/**/*.{png,jpg}').pipe(webp(opciones)).pipe(dest('build/imgWebp'))
    done();
}

// Aligeramos las imagenes que setan en src/img y las optimizamos a un nivel de 3
function imagenes (done){
    const opciones = {
        // Optimizamos las imagenes a un nivel de 3
        optimizationLevel: 3
    }
    src('src/img/**/*.{png,jpg}').pipe(cache(imagemin(opciones))).pipe(dest('build/img'))
    done();
}

//Formato mas pequeño para las imagenes
function versionAvif(done){

    const opciones = {
        quality: 50
    };
    src('src/img/**/*.{png,jpg}').pipe(avif(opciones)).pipe(dest('build/imgAvif'))
    done();
}

function javascript(done){
    src('src/js/**/*.js').pipe( sourcemaps.init()).pipe(terser()).pipe(sourcemaps.write('.')).pipe(dest('build/js'));
    done();
}

exports.css = css;
exports.imagenes = imagenes;
exports.versionWebp = versionWebp;
exports.versionAvif = versionAvif;
exports.js = javascript;

//Llamamos todo en una sola tarea
exports.dev = parallel(imagenes,versionWebp,versionAvif, javascript, dev);




