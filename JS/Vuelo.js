var UrlVuelos ='http://20.216.41.245:90/G4_20/controller/vuelo.php?opc=GetVuelos';
var UrlInsertVuelo='http://20.216.41.245:90/G4_20/controller/vuelo.php?opc=InsertVuelo';
var UrlVuelo = 'http://20.216.41.245:90/G4_20/controller/vuelo.php?opc=GetVuelo';
var UrlUpdateVuelo = 'http://20.216.41.245:90/G4_20/controller/vuelo.php?opc=UpdateVuelo';
var UrlDeleteVuelo = 'http://20.216.41.245:90/G4_20/controller/vuelo.php?opc=DeleteVuelo';

$(document).ready(function(){
    CargarVuelos();

});

function CargarVuelos(){
    $.ajax({
        url: UrlVuelos,
        type: 'GET',
        datatype: 'JSON',
        success: function(reponse){

            var Items = reponse;
            var valores ='';

            for(i=0; i<Items.length; i++){
                valores +=   '<tr>' +
                '<td>' + Items[i].CodigoVuelo + '</td>' + 
                '<td>' + Items[i].CiudadOrigen + '</td>' + 
                '<td>' + Items[i].CiudadDestino + '</td>' + 
                '<td>' + Items[i].FechaVuelo + '</td>' + 
                '<td>' + Items[i].CantidadPasajeros + '</td>' + 
                '<td>' + Items[i].TipoAvion + '</td>' + 
                '<td>' + Items[i].DistanciaKm + '</td>' + 
                '<td>' + '<button class="btn btn-dark" onclick="CargarVuelo('+ Items[i].CodigoVuelo+')">Editar</button>' + '</td>' + 
                '<td>' + '<button class="btn btn-danger" onclick="EliminarVuelo('+ Items[i].CodigoVuelo+')">Eliminar</button>' + '</td>' + 
                

                '</tr>';
                $('#DataVuelos').html(valores);
            }
        }

    });
}

function agregarVuelo(){
    var datosVuelo ={
        CodigoVuelo : $('#CodigoVuelo').val(),
        CiudadOrigen : $('#CiudadOrigen').val(),
        CiudadDestino : $('#CiudadDestino').val(),
        FechaVuelo : $('#FechaVuelo').val(),
        CantidadPasajeros : $('#CantidadPasajeros').val(),
        TipoAvion : $('#TipoAvion').val(), 
        DistanciaKm : $('#DistanciaKm').val(),
    };

    var datosVueloJSON = JSON.stringify(datosVuelo);

    $.ajax({
        url: UrlInsertVuelo,
        type: 'POST',
        data : datosVueloJSON,
        datatype: 'JSON',
        contenttype:'application/json',
        
        success: function(reponse){

            console.log(reponse);
            alert('Vuelo Agregado Correctamente');
        },
        error:function(textStatus, errorThrown){
            alert('Error al agregar el registro' + textStatus + errorThrown)
        }

    });
    alert('Aviso');

}

function CargarVuelo(Codigo_Vuelo){
    var DatosVuelo={
        CodigoVuelo:Codigo_Vuelo
    };

    var datosVueloJSON = JSON.stringify(DatosVuelo);
    $.ajax({
        url: UrlVuelo,
        type: 'POST',
        data : datosVueloJSON,
        datatype: 'JSON',
        contenttype:'application/json',
        
        success: function(reponse){
            var Items = reponse;
             $('#CodigoVuelo').val(Items[0].CodigoVuelo);
             $('#CiudadOrigen').val(Items[0].CiudadOrigen);
             $('#CiudadDestino').val(Items[0].CiudadDestino);
             $('#FechaVuelo').val(Items[0].FechaVuelo);
             $('#CantidadPasajeros').val(Items[0].CantidadPasajeros);
             $('#TipoAvion').val(Items[0].TipoAvion); 
             $('#DistanciaKm').val(Items[0].DistanciaKm);

             var btnActualizar =  '<input type="submit" id="btn_actualizar" onclick="ActualizarVuelo('+ Items[0].CodigoVuelo + ')"' + 
             'value="Actualizar Vuelo" class="btn btn-primary"> </input>';
            $('#btn_agregar_vuelo').html(btnActualizar);  
        }

    });
}

function ActualizarVuelo(Codigo_Vuelo){
    var DatosVuelo = {
        CodigoVuelo : Codigo_Vuelo,
        CiudadOrigen : $('#CiudadOrigen').val(),
        CiudadDestino : $('#CiudadDestino').val(),
        FechaVuelo : $('#FechaVuelo').val(),
        CantidadPasajeros : $('#CantidadPasajeros').val(),
        TipoAvion : $('#TipoAvion').val(), 
        DistanciaKm : $('#DistanciaKm').val()
    };

    var datosVueloJSON = JSON.stringify(DatosVuelo);
    $.ajax({
        url: UrlUpdateVuelo,
        type: 'PUT',
        data : datosVueloJSON,
        datatype: 'JSON',
        contenttype:'application/json',
        
        success: function(reponse){

            console.log(reponse);
            alert('Vuelo Actualizado Correctamente');
        },
        error:function(textStatus, errorThrown){
            alert('Error al actualizar el registro' + textStatus + errorThrown)
        }

    });
    alert('Aviso');

}


function EliminarVuelo(Codigo_Vuelo){
    var DatosVuelo = {
        CodigoVuelo : Codigo_Vuelo
    };

    var datosVueloJSON = JSON.stringify(DatosVuelo);
    $.ajax({
        url: UrlDeleteVuelo,
        type: 'DELETE',
        data : datosVueloJSON,
        datatype: 'JSON',
        contenttype:'application/json',
        
        success: function(reponse){

            console.log(reponse);
        }

    });
    alert('Socio Elminado');
    CargarVuelos();

}




