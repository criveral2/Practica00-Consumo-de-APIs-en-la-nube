
function buscarPeliculas() {
    var nombree = "";
    nombree = document.getElementById("nombre").value;
    console.log(nombree);
    var detalles = "";
    var info = "";
    if (nombree == "") {
        detalles = "<p> No se encontraron resultados </p>";
        document.getElementById("idfoto").innerHTML = detalles;

    } else {
        if (window.XMLHttpRequest) {
            xmlhttp = new XMLHttpRequest();
        } else {
            xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
        }
        xmlhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                var datos = JSON.parse(this.responseText)
                console.log(datos);

                datos.Search.forEach(pelicula => {
                    console.log(pelicula.imdbID);


                    detalles += `
                    <div class="container mt-5 pt-5  ">
                    <div class="card-deck ">
            
                        <div class="card mb-4">
                            <div class=" containerimg ">
                                <img class="card-img-top image "  src="${pelicula.Poster}">
                                    <div class="overlay">
                                    <div class="text" id="inectar">
                                    <h1><b>`+ pelicula.Title + `</b></h1><br></br>
                                    <a href="#in"    onclick=\"CargarInformacion('${pelicula.imdbID}')\" >INFORMACION</a>
                                    </div>
                                  </div>
                              
                            </div>

                            </div>


                        </div>
                    </div>
                    </div>
                
                        `;


                });

                document.getElementById("idfoto").innerHTML = detalles;

            }
        };
        xmlhttp.open("GET", "http://www.omdbapi.com/?apikey=6880f25c&s=" + nombree + "&plot=full", true);
        xmlhttp.send();
    }
    return false;

}

function CargarInformacion(id) {
    console.log(id);
    var contenido = "";

    if (window.XMLHttpRequest) {
        xmlhttp = new XMLHttpRequest();
    } else {
        xmlhttp = new ActiveXObject("Microssoft.XMLHTTP")
    }

    xmlhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var pelicula = JSON.parse(this.responseText)
            console.log(pelicula.Genre);
            contenido += `
            <div class="container p-3 my-3 bg-primary text-white col-sm-4">
            <div class="container-fluid">
                <img src="`+ pelicula.Poster + `" class="rounded" alt="Cinque Terre" width="304" height="236">
            </div>
            

        </div>
        <div class="container p-3 my-3 bg-primary text-white col-sm-8">
        <p>Titulo: `+ pelicula.Title + ` </p>
        <p>Año: `+ pelicula.Year + ` </p>
        <p>Genero: `+ pelicula.Genre + ` </p>
        <p>Duracion: `+ pelicula.Runtime + `</p>
        <p>Idiomas: `+ pelicula.Language + `</p>
        <p>Reparto: `+ pelicula.Actors + `</p>
        <p>Premios: `+ pelicula.Awards + `</p>
        <p>Resumen: `+ pelicula.Plot + `</p>
        <p>Produccion: `+ pelicula.Production + `</p>

        </div>
          `;

            document.getElementById("deta").innerHTML = contenido;


        }

    }
    xmlhttp.open("GET", "http://www.omdbapi.com/?apikey=447abae5&i=" + id + "&plot=full", true);
    xmlhttp.send();







}




















