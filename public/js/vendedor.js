$(document).ready(function() {

    $("#gvendedor").click(function () {

        documento = $("#documento").val();
        nombre = $("#nombre").val();
        correo = $("#correo").val();
        direccion = $("#direccion").val();

        var datos = new FormData();

        datos.append("documento", documento);
        datos.append("nombre", nombre);
        datos.append("correo", correo);
        datos.append("direccion", direccion);

        $.ajax({
            headers: {'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')},
            url: "vendedor",
            type: "POST",
            data: datos,
            cache: false,
            contentType: false,
            processData: false,
            success: function (respuesta) {



                 if (respuesta.data){

                     if (parseInt(respuesta.code)===1){

                         $(document).ready(function() {
                             $(".exampleModal").modal('hide');
                         });

                         $("#tablavendedor").prepend("<tr id='id"+respuesta.data.id+"'>"+
                             "<th>"+respuesta.data.documento+"</th>"+
                             "<th>"+respuesta.data.nombre+"</th>"+
                             "<th>"+respuesta.data.correo+"</th>"+
                             "<th>"+respuesta.data.direccion+"</th>"+
                             "<th><button class='col-md-12 btn btn-primary' type='button'  data-toggle='modal' data-target='#exampleModal"+respuesta.data.id+"'>Editar</button></th>"+
                             "<th><button class='col-md-12 btn btn-danger eliminar' type='submit'>Eliminar</button><input type='text' value='"+respuesta.data.id+"' id='ideliminar' hidden>"+
                             "</tr>");

                         $("div#contenteditar").prepend("<div class=\"modal fade exampleModal\" id=\"exampleModal"+respuesta.data.id+"\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"exampleModalLabel\" aria-hidden=\"true\">\n" +
                             "  <div class=\"modal-dialog\" role=\"document\">\n" +
                             "    <div class=\"modal-content\">\n" +
                             "      <div class=\"modal-header\">\n" +
                             "        <h5 class=\"modal-title\" id=\"exampleModalLabel\">Editar vendedor</h5>\n" +
                             "        <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-label=\"Close\">\n" +
                             "          <span aria-hidden=\"true\">&times;</span>\n" +
                             "        </button>\n" +
                             "      </div>\n" +
                             "      <div class=\"modal-body\">\n" +
                             "\n" +
                             "          <input type=\"number\" class=\"form-control\" value='"+respuesta.data.documento+"' id=\"tempdocumento\" name=\"documento\" placeholder=\"Documento\" >\n" +
                             "         <br>\n" +
                             "      \t <input type=\"text\" class=\"form-control\" value='"+respuesta.data.nombre+"' id=\"tempnombre\" name=\"nombre\" placeholder=\"Nombre\" >\n" +
                             "      \t <br>\n" +
                             "      \t  <input type=\"email\" class=\"form-control\" value='"+respuesta.data.correo+"' id=\"tempcorreo\" name=\"correo\" placeholder=\"Correo\" >\n" +
                             "      \t  <br>\n" +
                             "      \t   <input type=\"text\" class=\"form-control\" value='"+respuesta.data.direccion+"' id=\"tempdireccion\" name=\"direccion\" placeholder=\"Direccion\" >\n" +
                             "      \t   <br>\n" +
                             "\n" +
                             "<input id=\"tempid\" type=\"text\" value='"+respuesta.data.id+"' hidden>\n"+
                             "        <button class=\"btn btn-primary editar\"  id=\"editar\">Editar</button>\n" +
                             "\n" +
                             "      </div>\n" +
                             "\n" +
                             "    </div>\n" +
                             "  </div>\n" +
                             "</div>");

                         $("#documento").val("");
                         $("#nombre").val("");
                         $("#correo").val("");
                         $("#direccion").val("");

                         Swal.fire({
                             type: 'success',
                             title: 'Éxito',
                             text: respuesta.msj,
                             showConfirmButton: false,
                             timer: 2000
                         });

                     }
                 }


                if(respuesta.direccion===undefined){
                    console.log("No mando request")
                }else{
                    Swal.fire({
                        type: 'error',
                        title: 'Error',
                        html:  respuesta.direccion[0],
                        showConfirmButton: true,
                    });
                }

                if(respuesta.correo===undefined){
                    console.log("No mando request")
                }else{
                    Swal.fire({
                        type: 'error',
                        title: 'Error',
                        html:  respuesta.correo[0],
                        showConfirmButton: true,
                    });
                }

                if(respuesta.nombre===undefined){
                    console.log("No mando request")
                }else{
                    Swal.fire({
                        type: 'error',
                        title: 'Error',
                        html:  respuesta.nombre[0],
                        showConfirmButton: true,
                    });
                }

                if(respuesta.documento===undefined){
                   console.log("No mando request")
                }else{
                        Swal.fire({
                            type: 'error',
                            title: 'Error',
                            html:  respuesta.documento[0],
                            showConfirmButton: true,
                        });
                }

                }

        });


    });

    $("#tablavendedor").on('click','.eliminar',function(e) {

        let $this = $(this);
        ideliminar =$(this).siblings("#ideliminar").val();

        var datos = new FormData();

        datos.append("ideliminar",ideliminar );


        $.ajax({
            headers: { 'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content') },
            url:"vendedor"+ '/' + ideliminar,
            type: "POST",
            data: datos,
            cache: false,
            contentType: false,
            processData: false,
            success: function(respuesta){
                if (parseInt(respuesta.code)===1){
                    Swal.fire({
                        type: 'error',
                        title: respuesta.msj,
                        showConfirmButton: false,
                        timer: 2000
                    });

                    $this.parent().parent("tr").remove();
                }else{
                    Swal.fire({
                        type: 'error',
                        title: 'Error Interno',
                        showConfirmButton: false,
                        timer: 2000
                    });
                }
            }
        });


    });


    $("button#eliminar").click(function(){

        ideliminar =$(this).siblings("#ideliminar").val();
        let $this = $(this);

        var datos = new FormData();

        datos.append("ideliminar",ideliminar );


        $.ajax({
            headers: { 'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content') },
            url:"vendedor"+ '/' + ideliminar,
            method:'POST',
            data: datos,
            cache: false,
            contentType: false,
            processData: false,
            success: function(respuesta){

                if (parseInt(respuesta.code)===1){
                    Swal.fire({
                        type: 'error',
                        title: respuesta.msj,
                        showConfirmButton: false,
                        timer: 2000
                    });

                    $this.parent().parent("tr").remove();
                }else{
                    Swal.fire({
                        type: 'error',
                        title: 'Error Interno',
                        showConfirmButton: false,
                        timer: 2000
                    });
                }



            }
        });


    });


    $("button#editar").click(function () {

        documento = $(this).siblings("#udocumento").val();
        nombre = $(this).siblings("#unombre").val();
        correo = $(this).siblings("#ucorreo").val();
        direccion = $(this).siblings("#udireccion").val();
        idedit = $(this).siblings("#uid").val();
        let $this=$(this);

        var datos = new FormData();

        datos.append("documento", documento);
        datos.append("nombre", nombre);
        datos.append("correo", correo);
        datos.append("direccion", direccion);
        datos.append("id", idedit);

        $.ajax({
            headers: {'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')},
            url: "vendedor/"+idedit+"/edit",
            type: "POST",
            data: datos,
            cache: false,
            contentType: false,
            processData: false,
            success: function (respuesta) {

                if (respuesta.data){

                    if (parseInt(respuesta.code)===1){

                        $(document).ready(function() {
                            $(".exampleModal").modal('hide');
                        });

                        $this.parent().parent().parent().parent().siblings().children().children("#id"+respuesta.id).remove();

                        $("#tablavendedor").prepend("<tr id='id"+respuesta.id+"'>"+
                            "<th>"+respuesta.data.documento+"</th>"+
                            "<th>"+respuesta.data.nombre+"</th>"+
                            "<th>"+respuesta.data.correo+"</th>"+
                            "<th>"+respuesta.data.direccion+"</th>"+
                            "<th><button class='col-md-12 btn btn-primary editar' type='button'  data-toggle='modal' data-target='#exampleModal"+respuesta.id+"'>Editar</button></th>"+
                            "<th><button class='col-md-12 btn btn-danger eliminar' type='submit'>Eliminar</button><input type='text' value='"+respuesta.data.id+"' id='ideliminar' hidden>"+
                            "</tr>");

                        Swal.fire({
                            type: 'success',
                            title: 'Éxito',
                            text: respuesta.msj,
                            showConfirmButton: false,
                            timer: 2000
                        });

                    }
                }


                if(respuesta.direccion===undefined){
                    console.log("No mando request")
                }else{
                    Swal.fire({
                        type: 'error',
                        title: 'Error',
                        html:  respuesta.direccion[0],
                        showConfirmButton: true,
                    });
                }

                if(respuesta.correo===undefined){
                    console.log("No mando request")
                }else{
                    Swal.fire({
                        type: 'error',
                        title: 'Error',
                        html:  respuesta.correo[0],
                        showConfirmButton: true,
                    });
                }

                if(respuesta.nombre===undefined){
                    console.log("No mando request")
                }else{
                    Swal.fire({
                        type: 'error',
                        title: 'Error',
                        html:  respuesta.nombre[0],
                        showConfirmButton: true,
                    });
                }

                if(respuesta.documento===undefined){
                    console.log("No mando request")
                }else{
                    Swal.fire({
                        type: 'error',
                        title: 'Error',
                        html:  respuesta.documento[0],
                        showConfirmButton: true,
                    });
                }

            }

        });


    });


    $("div#contenteditar").on('click','.editar',function(e) {
        documento = $(this).siblings("#tempdocumento").val();
        nombre = $(this).siblings("#tempnombre").val();
        correo = $(this).siblings("#tempcorreo").val();
        direccion = $(this).siblings("#tempdireccion").val();
        idedit = $(this).siblings("#tempid").val();
        let $this=$(this);


        var datos = new FormData();

        datos.append("documento", documento);
        datos.append("nombre", nombre);
        datos.append("correo", correo);
        datos.append("direccion", direccion);
        datos.append("id", idedit);

        $.ajax({
            headers: {'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')},
            url: "vendedor/"+idedit+"/edit",
            type: "POST",
            data: datos,
            cache: false,
            contentType: false,
            processData: false,
            success: function (respuesta) {

                if (respuesta.data){

                    if (parseInt(respuesta.code)===1){

                        $(document).ready(function() {
                            $(".exampleModal").modal('hide');
                        });

                        $this.parent().parent().parent().parent().parent().siblings().children().children("#id"+respuesta.id).remove();


                        $("#tablavendedor").prepend("<tr id='id"+respuesta.id+"'>"+
                            "<th>"+respuesta.data.documento+"</th>"+
                            "<th>"+respuesta.data.nombre+"</th>"+
                            "<th>"+respuesta.data.correo+"</th>"+
                            "<th>"+respuesta.data.direccion+"</th>"+
                            "<th><button class='col-md-12 btn btn-primary editar' type='button'  data-toggle='modal' data-target='#exampleModal"+respuesta.data.id+"'>Editar</button></th>"+
                            "<th><button class='col-md-12 btn btn-danger eliminar' type='submit'>Eliminar</button><input type='text' value='"+respuesta.data.id+"' id='ideliminar' hidden>"+
                            "</tr>");

                        Swal.fire({
                            type: 'success',
                            title: 'Éxito',
                            text: respuesta.msj,
                            showConfirmButton: false,
                            timer: 2000
                        });

                    }
                }


                if(respuesta.direccion===undefined){
                    console.log("No mando request")
                }else{
                    Swal.fire({
                        type: 'error',
                        title: 'Error',
                        html:  respuesta.direccion[0],
                        showConfirmButton: true,
                    });
                }

                if(respuesta.correo===undefined){
                    console.log("No mando request")
                }else{
                    Swal.fire({
                        type: 'error',
                        title: 'Error',
                        html:  respuesta.correo[0],
                        showConfirmButton: true,
                    });
                }

                if(respuesta.nombre===undefined){
                    console.log("No mando request")
                }else{
                    Swal.fire({
                        type: 'error',
                        title: 'Error',
                        html:  respuesta.nombre[0],
                        showConfirmButton: true,
                    });
                }

                if(respuesta.documento===undefined){
                    console.log("No mando request")
                }else{
                    Swal.fire({
                        type: 'error',
                        title: 'Error',
                        html:  respuesta.documento[0],
                        showConfirmButton: true,
                    });
                }

            }

        });

    });

});
