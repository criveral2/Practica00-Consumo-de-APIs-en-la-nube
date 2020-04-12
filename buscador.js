
var resultadospag=0;

function buscarPeliculas(pagina) {
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

                resultadospag=datos.totalResults;

                console.log(resultadospag);
               

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
                    paginar(pagina);

                });

                document.getElementById("idfoto").innerHTML = detalles;

            }
        };
        xmlhttp.open("GET", "http://www.omdbapi.com/?apikey=6880f25c&s=" + nombree + "&plot=full&page="+pagina, true);
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
        <p>Titulo: `+ pelicula.Title  + ` </p>
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




function paginar(paginaa){
    console.log("-------------------entrosimo-----------------------");
    console.log(paginaa)

   var controlador = 0;
   controlador = Math.abs(resultadospag/10) ;

  
if(paginaa >= controlador){
    var n="";
    n += `
          
            <nav>
            <ul class="pager">

                <li class="previous"><a href="#" onclick="buscarPeliculas(`+ (paginaa-1) +`)">Aterior </a></li> 

                <li  class="disabled" ><a href="">`+ paginaa +`</a></li>

                <li class="next disabled"><a href="#" onclick="buscarPeliculas(`+ (paginaa) +`)" >Siguiente &larr; </a></li> 

            </ul>
            </nav>


            `

}else{
    if(paginaa <= 1){
        var n="";
        n += `
              
                <nav>
                <ul class="pager">
    
                    <li class="previous disabled"><a href="#" onclick="buscarPeliculas(`+ (paginaa) +`)">Aterior </a></li> 
    
                    <li  class="disabled" ><a href="">`+ paginaa +`</a></li>
    
                    <li class="next"><a href="#" onclick="buscarPeliculas(`+ (paginaa+1) +`)" >Siguiente &larr; </a></li> 
    
                </ul>
                </nav>
    
    
                `


    }else{
        var n="";
        n += `
              
                <nav>
                <ul class="pager">
    
                    <li class="previous"><a href="#" onclick="buscarPeliculas(`+ (paginaa-1) +`)">Aterior </a></li> 
    
                    <li  class="disabled" ><a href="">`+ paginaa +`</a></li>
    
                    <li class="next"><a href="#" onclick="buscarPeliculas(`+ (paginaa+1) +`)" >Siguiente &larr; </a></li> 
    
                </ul>
                </nav>
    
    
                `
    }
}


    document.getElementById("navegar").innerHTML=n;



}




















