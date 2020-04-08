
function buscarPeliculas(){
    var nombree ="";
    nombree = document.getElementById("nombre").value;
    console.log(nombree);
    var detalles ="";
    if(nombree=""){
        detalles = "<td> No se encontraron resultados </td>";
        document.getElementById("Informacion").innerHTML= detalles;

    }else{
        if(window.XMLHttpRequest){
            xmlhttp = new XMLHttpRequest();
        }else{
            xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
        }
        xmlhttp.onreadystatechange = function(){
            if(this.readyState == 4 && this.status == 200){
                var datos = JSON.parse(this.responseText)
                console.log(datos);

                datos.Search.forEach(pelicula => {
                    detalles += "<tr>"+
                                "<td><a href='#' onclick=\"buscraPeliculas('"+ pelicula.imdbID+"')\"> Mas </a></td>" +
                                "<td>" + pelicula.Title + "</td>" +
                                "<td>" + pelicula.Year + "</td>" +
                                "<td>" + pelicula.Type + "</td>" +
                                "<td><img src = "+pelicula.Poster +"></td>"+
                                "</tr>";

                });
                document.getElementById("Informacion").innerHTML = detalles;
            }
        };
        xmlhttp.open("GET","http://www.omdbapi.com/?apikey=6880f25c&s="+ nombree +"&plot=full",true);
        xmlhttp.send();
    }
    return false;
    
}







