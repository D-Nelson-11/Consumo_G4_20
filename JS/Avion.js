var UrlAviones = "http://20.216.41.245:90/G4_20/controller/avion.php?opc=GetAviones";
var UrlInsertAvion ="http://20.216.41.245:90/G4_20/controller/avion.php?opc=InsertAvion";
var UrlGetAvion ="http://20.216.41.245:90/G4_20/controller/avion.php?opc=GetAvion";
var UrlUpdateAvion ="http://20.216.41.245:90/G4_20/controller/avion.php?opc=UpdateAvion";
var UrlDeleteAvion ="http://20.216.41.245:90/G4_20/controller/avion.php?opc=DeleteAvion";

$(document).ready(function(){
    CargarAviones();
});

function CargarAviones(){
    $.ajax({
        url: UrlAviones,
        type: 'GET',
        datatype: 'JSON',
        success: function(reponse){
            var MiItems = reponse;
            var Valores= '';

            for(i=0; i<MiItems.length; i++){
                Valores += '<tr>'+
                '<td>'+ MiItems[i].NumeroAvion +'</td>'+
                '<td>'+ MiItems[i].TipoAvion +'</td>'+
                '<td>'+ MiItems[i].HorasVuelo +'</td>'+
                '<td>'+ MiItems[i].CapacidadPasajeros +'</td>'+
                '<td>'+ MiItems[i].FechaPrimerVuelo +'</td>'+
                '<td>'+ MiItems[i].PaisConstruccion +'</td>'+
                '<td>'+ MiItems[i].CantidadVuelos +'</td>'+
                '<td>'+
                '<button class="btn btn-info" onclick="CargarAvion('+ MiItems[i].NumeroAvion +')">Editar</button>'+
                '</td>'+
                '<td>'+
                '<button class="btn btn-danger" onclick="EliminarAvion('+ MiItems[i].NumeroAvion +')">Eliminar</button>'+
                '</td>'+
            '</tr>';
            $('#DataAviones').html(Valores);
            }
        }
    });
}

function AgregarAvion(){
    var datosavion = {
        NumeroAvion:$('#NumeroAvion').val(),
        TipoAvion:$('#TipoAvion').val(),
        HorasVuelo:$('#HorasVuelo').val(),
        CapacidadPasajeros:$('#CapacidadPasajeros').val(),
        FechaPrimerVuelo:$('#FechaPrimerVuelo').val(),
        PaisConstruccion:$('#PaisConstruccion').val(),
        CantidadVuelos:$('#CantidadVuelos').val(),
    };
    var datosavionjson = JSON.stringify(datosavion);
    alert(datosavionjson);

    $.ajax({
        url: UrlInsertAvion,
        type: 'POST',
        data: datosavionjson,
        datatype: 'JSON',
        contenttype: 'application/json',
        success: function(reponse){
            console.log(reponse);
            alert('¡¡Avion agregado con exito!!');
        },
        error: function(textStatus, errorThrow){
            alert('¡¡Error al agregar Avion!!'+ textStatus + errorThrow);
        }
    });
    alert('Aviso');
}

function CargarAvion(idavion){
    var datosavion = {
        NumeroAvion: idavion
    };
    var datosavionjson = JSON.stringify(datosavion);

    $.ajax({
        url: UrlGetAvion,
        type: 'POST',
        data: datosavionjson,
        contenttype: 'aplication/json',
        success: function (response){
            var MiItems = response;
            $('#NumeroAvion').val(MiItems[0].NumeroAvion);
            $('#TipoAvion').val(MiItems[0].TipoAvion);
            $('#HorasVuelo').val(MiItems[0].HorasVuelo);
            $('#CapacidadPasajeros').val(MiItems[0].CapacidadPasajeros);
            $('#FechaPrimerVuelo').val(MiItems[0].FechaPrimerVuelo);
            $('#PaisConstruccion').val(MiItems[0].PaisConstruccion);
            $('#CantidadVuelos').val(MiItems[0].CantidadVuelos);
            var btnactualizar ='<input type="submit" id="btn_actualizar" onclick="ActualizarAvion(' + MiItems[0].NumeroAvion + ')"'+
            'value="Acualizar Avion" class="btn btn-primary"></input>';
            $('#btnagregaravion').html(btnactualizar);
        }
    });
}

function ActualizarAvion(idavion){
    var datosavion = {
        NumeroAvion :idavion,
        TipoAvion:$('#TipoAvion').val(),
        HorasVuelo: $('#HorasVuelo').val(),
        CapacidadPasajeros: $('#CapacidadPasajeros').val(),
        FechaPrimerVuelo: $('#FechaPrimerVuelo').val(),
        PaisConstruccion: $('#PaisConstruccion').val(),
        CantidadVuelos: $('#CantidadVuelos').val(),
    };
    var datosavionjson = JSON.stringify(datosavion);
    //alert(datosavionjson);

    $.ajax({
        url: UrlUpdateAvion,
        type: 'PUT',
        data: datosavionjson,
        datatype: 'JSON',
        contenttype: 'application/json',
        success: function(reponse){
            console.log(reponse);
            alert("Avion Actualizado!!");
        },
        error: function(textStatus, errorThrow ){
            alert('Error al Actualizar Avion'+ textStatus + errorThrow);
        }
    });
    alert('Aviso');
}

function EliminarAvion(idavion){
    var datosavion ={
        NumeroAvion: idavion
    };
    var datosavionjson = JSON.stringify(datosavion);

    $.ajax({
        url: UrlDeleteAvion,
        type: 'DELETE',
        data: datosavionjson,
        datatype: 'JSON',
        contentType: 'aplication/json',
        success: function (response){
            console.log(response);
            alert("Avion Eliminado!!");
            CargarAviones();
        },
        error: function(textStatus, errorThrow){
            alert('¡¡Error al eliminar Avion!!'+ textStatus + errorThrow);
        }
    });
    alert('Aviso');  
}

