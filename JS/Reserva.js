var UrlReserva = 'http://20.216.41.245:90/G4_20/controller/reserva.php?opc=GetReservas';
var UrlInsertReserva = 'http://20.216.41.245:90/G4_20/controller/reserva.php?opc=InsertReserva';
var UrlGetReserva = 'http://20.216.41.245:90/G4_20/controller/reserva.php?opc=GetReserva';
var UrlUpdateReserva = 'http://20.216.41.245:90/G4_20/controller/reserva.php?opc=UpdateReserva';
var UrlDeleteReserva = 'http://20.216.41.245:90/G4_20/controller/reserva.php?opc=DeleteReserva';


$(document).ready(function(){
    CargarReservas();
});

function CargarReservas(){
    $.ajax({
        url: UrlReserva,
        type: 'GET',
        datatype: 'JSON',
        success: function(reponse){
            var MiItems = reponse;
            var Valores= '';
            for(i=0; MiItems.length; i++){
                Valores += '<tr>'+
                '<td>'+ MiItems[i].idReservacion +'</td>'+
                '<td>'+ MiItems[i].CodigoVuelo +'</td>'+
                '<td>'+ MiItems[i].CodigoPasajero +'</td>'+
                '<td>'+ MiItems[i].NombrePasajero +'</td>'+
                '<td>'+ MiItems[i].CiudadDestino +'</td>'+
                '<td>'+ MiItems[i].FechaVuelo +'</td>'+
                '<td>'+ MiItems[i].PrecioVuelo +'</td>'+
                '<td>'+
                '<button class="btn btn-info" onclick="CargarReserva('+MiItems[i].idReservacion +')">Editar</button>'+
                '</td>'+
                '<td>'+
                '<button class="btn btn-danger" onclick="EliminarReserva('+MiItems[i].idReservacion +')">Eliminar</button>'+
                '</td>'+
                
            '</tr>';
            $('#DataReserva').html(Valores);          
          }

        }
    });
}
function AgregarReserva(){
    var datosreserva = {
        idReservacion :$('#idReservacion').val(),
        CodigoVuelo :$('#CodigoVuelo').val(),
        CodigoPasajero :$('#CodigoPasajero').val(),
        NombrePasajero :$('#NombrePasajero').val(),
        CiudadDestino :$('#CiudadDestino').val(),
        FechaVuelo :$('#FechaVuelo').val(),
        PrecioVuelo :$('#PrecioVuelo').val()
    };
    var datosreservajson =JSON.stringify(datosreserva);

    $.ajax({
        url: UrlInsertReserva,
        type: 'POST',
        data: datosreservajson,
        datatype: 'JSON',
        contenttype: 'application/json',
        success: function(reponse){
            console.log(reponse);
            alert('Reservacion Agregada Exitosamente');
        },
        error: function(textStatus, errorThrown ){
            alert('Error Al Agregar La Reservacion'+ textStatus + errorThrown);
        }

    });
    alert('Aviso');
    CargarReservas();
}

function CargarReserva(Id_Reserva){
    var datosreserva = {
        idReservacion: Id_Reserva
    };

    var datosreservajson =JSON.stringify(datosreserva);
    $.ajax({
        url: UrlGetReserva,
        type: 'POST',
        data: datosreservajson,
        datatype: 'JSON',
        contenttype: 'application/json',

        success: function(response){
            var MiItems = response;
            $('#idReservacion').val(MiItems[0].idReservacion);
            $('#CodigoVuelo').val(MiItems[0].CodigoVuelo);
            $('#CodigoPasajero').val(MiItems[0].CodigoPasajero);
            $('#NombrePasajero').val(MiItems[0].NombrePasajero);
            $('#CiudadDestino').val(MiItems[0].CiudadDestino);
            $('#FechaVuelo').val(MiItems[0].FechaVuelo);
            $('#PrecioVuelo').val(MiItems[0].PrecioVuelo);
            var btnactualizar = '<input type="submit" id="btn_actualizar" onclick="ActualizarReserva(' + MiItems[0].idReservacion + ')"'+
            'value="Actualizar Reservacion" class="btn btn-primary"></input>';
            $('#btnagregarreserva').html(btnactualizar);


        }
    });
    alert('Aviso');
}

function ActualizarReserva(Id_Reserva){
    var datosreserva ={
        idReservacion :Id_Reserva,
        CodigoVuelo :$('#CodigoVuelo').val(),
        CodigoPasajero :$('#CodigoPasajero').val(),
        NombrePasajero :$('#NombrePasajero').val(),
        CiudadDestino :$('#CiudadDestino').val(),
        FechaVuelo :$('#FechaVuelo').val(),
        PrecioVuelo :$('#PrecioVuelo').val()
    };
    var datosreservajson =JSON.stringify(datosreserva);

    $.ajax({
        url: UrlUpdateReserva,
        type: 'PUT',
        data: datosreservajson,
        datatype: 'JSON',
        contenttype: 'application/json',
        success: function(reponse){
            console.log(reponse);
            alert('Reservacion Actualizada');
        },
        error: function(textStatus, errorThrown ){
            alert('Error Al Actualizar La Reservacion'+ textStatus + errorThrown);
        }
    });
    alert('Aviso');
}

function EliminarReserva(Id_Reserva){
    var datosreserva = {
        idReservacion: Id_Reserva
    };

    var datosreservajson =JSON.stringify(datosreserva);

    $.ajax({
        url: UrlDeleteReserva,
        type: 'DELETE',
        data: datosreservajson,
        datatype: 'JSON',
        contenttype: 'application/json',
        success: function(response){
            console.log(response);
        }
    });
    alert('Reservacion Eliminada Exitosamente');
    CargarReservas();
}