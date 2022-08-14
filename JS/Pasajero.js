var UrlPasajeros = 'http://20.216.41.245:90/G4_20/controller/pasajero.php?opc=GetPasajeros';
var UrlInsertPasajero = 'http://20.216.41.245:90/G4_20/controller/pasajero.php?opc=InsertPasajero';
var UrlGetPasajero = 'http://20.216.41.245:90/G4_20/controller/pasajero.php?opc=GetPasajero';
var UrlUpdatePasajero = 'http://20.216.41.245:90/G4_20/controller/pasajero.php?opc=UpdatePasajero';
var UrlDeletePasajero = 'http://20.216.41.245:90/G4_20/controller/pasajero.php?opc=DeletePasajero';

$(document).ready(function(){
   CargarPasajeros();
})

function CargarPasajeros(){
    $.ajax({
        url: UrlPasajeros,
        type: 'GET',
        datatype: 'JSON',
        success: function(reponse){
            var MiItems = reponse;
            var Valores = '';

            for(i=0; i<MiItems.length; i++){
              Valores += '<tr>' + 
              '<td>'+ MiItems[i].CodigoPasajero +'</td>'+
              '<td>'+ MiItems[i].Nombres +'</td>'+
              '<td>'+ MiItems[i].Apellidos +'</td>'+
              '<td>'+ MiItems[i].Fecha_Registro +'</td>'+
              '<td>'+ MiItems[i].Nacionalidad +'</td>'+
              '<td>'+ MiItems[i].Numero_Telefonico +'</td>'+
              '<td>'+ MiItems[i].Email +'</td>'+
              '<td>'+
              '<button class="btn btn-info" onclick="CargarPasajero('+ MiItems[i].CodigoPasajero+')">Editar</button>'+
              '</td>'+
              '<td>'+
              '<button class="btn btn-danger" onclick="Eliminar_Pasajero('+ MiItems[i].CodigoPasajero+')">Eliminar</button>'+
              '</td>'+
            '</tr>';
              $('#DataPasajeros').html(Valores);
            }
        }
    })
}


function AgregarPasajero(){
    var datosPasajeros = {
    CodigoPasajero:$('#CodigoPasajero').val(),
    Nombres:$('#Nombres').val(),
    Apellidos:$('#Apellidos').val(),
    Fecha_Registro:$('#Fecha_Registro').val(),
    Nacionalidad:$('#Nacionalidad').val(),
    Numero_Telefonico:$('#Numero_Telefonico').val(),
    Email:$('#Email').val(), 
    };
    var datosPasajerosjson = JSON.stringify(datosPasajeros);
    alert(datosPasajerosjson);

    $.ajax({
        url: UrlInsertPasajero,
        type: 'POST',
        data: datosPasajerosjson,
        datatype: 'JSON',
        contenttype: 'application/json',
        success: function(reponse){
            console.log(reponse);
            alert('Pasajero Agregado Correctamente');
        },
        error: function(textStatus, errorThrow){
            alert ('Error al agregar pasajero' + textStatus + errorThrow);
        }
    });
    alert('Aviso');
}

function CargarPasajero(codigo_pasajero){
    var datosPasajero = {
        CodigoPasajero: codigo_pasajero
    };
    var datospasajerojson = JSON.stringify(datosPasajero);

    $.ajax({
        url: UrlGetPasajero,
        type: 'POST',
        data: datospasajerojson,
        datatype: 'JSON',
        contentType: 'application/json',

        success: function(reponse){
            var MiItems = reponse;
            $('#CodigoPasajero').val(MiItems[0].CodigoPasajero);
            $('#Nombres').val(MiItems[0].Nombres);
            $('#Apellidos').val(MiItems[0].Apellidos);
            $('#Fecha_Registro').val(MiItems[0].Fecha_Registro);
            $('#Nacionalidad').val(MiItems[0].Nacionalidad);
            $('#Numero_Telefonico').val(MiItems[0].Numero_Telefonico);
            $('#Email').val(MiItems[0].Email);

            var btnactualizar = '<input type="submit" id="btn_actualizar" onclick="Actualizar_Pasajero(' + MiItems[0].CodigoPasajero + ')"'+
            'value="Actualizar Pasajero" class="btn btn-primary"></input>';
            $('#btn_agregar_pasajero').html(btnactualizar);
        }
    });
}

function Actualizar_Pasajero(codigo_pasajero){
  var datosPasajero = {
     CodigoPasajero: codigo_pasajero,
     Nombres:$('#Nombres').val(),
     Apellidos:$('#Apellidos').val(),
     Fecha_Registro:$('#Fecha_Registro').val(),
     Nacionalidad:$('#Nacionalidad').val(),
     Numero_Telefonico:$('#Numero_Telefonico').val(),
     Email:$('#Email').val(), 
  };
  var datosPasajerojson = JSON.stringify(datosPasajero);

  $.ajax({
    url: UrlUpdatePasajero,
    type: 'PUT',
    data: datosPasajerojson,
    datatype: 'JSON',
    contentType: 'application/json',
    success: function (reponse){
        console.log(reponse);
        alert("¡Pasajero Actualizado!");
    },
    error: function(textStatus, errorThrow){
        alert('Error al Actualizar Pasajero' + textStatus + errorThrow);
    }
  });
  alert('Aviso');
}

function Eliminar_Pasajero(codigo_pasajero){
   var datosPasajero = {
      CodigoPasajero: codigo_pasajero
   };
   var datosPasajerojson = JSON.stringify(datosPasajero);

   $.ajax({
    url: UrlDeletePasajero,
    type: 'DELETE',
    data: datosPasajerojson,
    datatype: 'JSON',
    contentType: 'application/json',
    success: function(reponse){
        console.log(reponse);
    }
});
alert("¡Pasajero Eliminado!");
CargarPasajeros();
}