$(document).ready(function() {

    $("#gusuario").click(function () {

        nombre = $("#nombre").val();
        email = $("#email").val();
        password = $("#password").val();
        role = $("#role").val();

        var datos = new FormData();

        datos.append("nombre", nombre);
        datos.append("email", email);
        datos.append("password", password);
        datos.append("role", role);

        $.ajax({
            headers: {'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')},
            url: "usuario",
            type: "POST",
            data: datos,
            cache: false,
            contentType: false,
            processData: false,
            success: function (respuesta) {



                if (respuesta.data) {

                    if (parseInt(respuesta.code) === 1) {

                        $(document).ready(function () {
                            $(".exampleModal").modal('hide');
                        });

                        $("#tablausuario").prepend("<tr id='id" + respuesta.data[0].id + "'>" +
                            "<th>" + respuesta.data[0].name+ "</th>" +
                            "<th>" + respuesta.data[0].email + "</th>" +
                            "<th>" + respuesta.data[0].role.nombre + "</th>" +
                            "<th><button class='col-md-12 btn btn-primary' type='button'  data-toggle='modal' data-target='#exampleModal" + respuesta.data[0].id + "'>Editar</button></th>" +
                            "<th><button class='col-md-12 btn btn-danger eliminarusuario' type='submit'>Eliminar</button><input type='text' value='" + respuesta.data[0].id + "' id='ideliminarusuario' hidden>" +
                            "</tr>");

                        $("div#contenteditarusuario").prepend("<div class=\"modal fade exampleModal\" id=\"exampleModal" + respuesta.data[0].id + "\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"exampleModalLabel\" aria-hidden=\"true\">\n" +
                            "  <div class=\"modal-dialog\" role=\"document\">\n" +
                            "    <div class=\"modal-content\">\n" +
                            "      <div class=\"modal-header\">\n" +
                            "        <h5 class=\"modal-title\" id=\"exampleModalLabel\">Editar usuario</h5>\n" +
                            "        <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-label=\"Close\">\n" +
                            "          <span aria-hidden=\"true\">&times;</span>\n" +
                            "        </button>\n" +
                            "      </div>\n" +
                            "      <div class=\"modal-body\">\n" +
                            "\n" +
                            "          <input type=\"text\" class=\"form-control\" value='" + respuesta.data[0].name + "' id=\"tempunombre\" name=\"documento\" placeholder=\"Documento\" >\n" +
                            "         <br>\n" +
                            "      \t <input type=\"email\" class=\"form-control\" value='" + respuesta.data[0].email + "' id=\"tempuemail\" name=\"nombre\" placeholder=\"Nombre\" disabled>\n" +
                            "      \t <br>\n" +
                            "      \t <input type=\"password\" class=\"form-control\" id=\"tempupassword\" name=\"password\" placeholder=\"Password\" >\n" +
                            "      \t <br>\n" +
                            " <div class=\"form-group\">\n" +
                            "    <label for=\"exampleFormControlSelect1\">Selecciona Rol</label>\n" +
                            "    <select name=\"role\" class=\"form-control\"  id=\"tempurole\">\n" +
                            "      <option value=\""+respuesta.data[0].role.id+"\" selected=\"true\">"+respuesta.data[0].role.nombre+"</option>\n" +
                            "      <option value=\"1\">Administrador</option>\n" +
                            "      <option value=\"2\">Vendedor</option>\n" +
                            "    </select>\n" +
                            "  </div>"+
                            "      \t  <br>\n" +
                            "\n" +
                            "<input id=\"tempuid\" type=\"text\" value='" + respuesta.data[0].id + "' hidden>\n" +
                            "        <button class=\"btn btn-primary editarusuario\"  id=\"editarusuario\">Editar</button>\n" +
                            "\n" +
                            "      </div>\n" +
                            "\n" +
                            "    </div>\n" +
                            "  </div>\n" +
                            "</div>");

                        $("#nombre").val("");
                        $("#email").val("");
                        $("#password").val("");

                        Swal.fire({
                            type: 'success',
                            title: 'Éxito',
                            text: respuesta.msj,
                            showConfirmButton: false,
                            timer: 2000
                        });

                    }
                }


                if (respuesta.nombre === undefined) {
                    console.log("No mando request")
                } else {
                    Swal.fire({
                        type: 'error',
                        title: 'Error',
                        html: respuesta.nombre[0],
                        showConfirmButton: true,
                    });
                }

                if (respuesta.email === undefined) {
                    console.log("No mando request")
                } else {
                    Swal.fire({
                        type: 'error',
                        title: 'Error',
                        html: respuesta.email[0],
                        showConfirmButton: true,
                    });
                }

                if (respuesta.password === undefined) {
                    console.log("No mando request")
                } else {
                    Swal.fire({
                        type: 'error',
                        title: 'Error',
                        html: respuesta.password[0],
                        showConfirmButton: true,
                    });
                }

                if (respuesta.role === undefined) {
                    console.log("No mando request")
                } else {
                    Swal.fire({
                        type: 'error',
                        title: 'Error',
                        html: respuesta.role[0],
                        showConfirmButton: true,
                    });
                }

            }

        });


    });

    $("#tablausuario").on('click','.eliminarusuario',function(e) {

        let $this = $(this);
        ideliminar =$(this).siblings("#ideliminarusuario").val();

        var datos = new FormData();

        datos.append("ideliminar",ideliminar );


        $.ajax({
            headers: { 'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content') },
            url:"usuario"+ '/' + ideliminar,
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


    $("button#eliminarusuario").click(function(){

        ideliminar =$(this).siblings("#ideliminarusuario").val();
        let $this = $(this);

        var datos = new FormData();

        datos.append("ideliminar",ideliminar );


        $.ajax({
            headers: { 'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content') },
            url:"usuario"+ '/' + ideliminar,
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

    $("button#editarusuario").click(function () {

        nombre = $(this).siblings("#uunombre").val();
        email = $(this).siblings("#uuemail").val();
        password = $(this).siblings("#uupassword").val();
        role = $(this).siblings().children("#uurole").val();
        idedit = $(this).siblings("#uuid").val();
        let $this=$(this);
        console.log(role)

        var datos = new FormData();

        datos.append("nombre", nombre);
        datos.append("email", email);
        datos.append("password", password);
        datos.append("role", role);
        datos.append("id", idedit);

        $.ajax({
            headers: {'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')},
            url: "usuario/"+idedit+"/edit",
            type: "POST",
            data: datos,
            cache: false,
            contentType: false,
            processData: false,
            success: function (respuesta) {
console.log(respuesta.data)
                if (respuesta.data){

                    if (parseInt(respuesta.code)===1){

                        $(document).ready(function() {
                            $(".exampleModal").modal('hide');
                        });

                        $this.parent().parent().parent().parent().siblings().children().children("#id"+respuesta.id).remove();

                        $("#tablausuario").prepend("<tr id='id"+respuesta.id+"'>"+
                            "<th>"+nombre+"</th>"+
                            "<th>"+respuesta.data.email+"</th>"+
                            "<th>"+respuesta.data.role.nombre+"</th>"+
                            "<th><button class='col-md-12 btn btn-primary editarusuario' type='button'  data-toggle='modal' data-target='#exampleModal"+respuesta.id+"'>Editar</button></th>"+
                            "<th><button class='col-md-12 btn btn-danger eliminarusuario' type='submit'>Eliminar</button><input type='text' value='"+respuesta.data.id+"' id='ideliminarusuario' hidden>"+
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


                if(respuesta.role===undefined){
                    console.log("No mando request")
                }else{
                    Swal.fire({
                        type: 'error',
                        title: 'Error',
                        html:  respuesta.role[0],
                        showConfirmButton: true,
                    });
                }

                if(respuesta.password===undefined){
                    console.log("No mando request")
                }else{
                    Swal.fire({
                        type: 'error',
                        title: 'Error',
                        html:  respuesta.password[0],
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

            }

        });


    });


    $("div#contenteditarusuario").on('click','.editarusuario',function(e) {
        nombre = $(this).siblings("#tempunombre").val();
        email= $(this).siblings("#tempuemail").val();
        password = $(this).siblings("#tempupassword").val();
        role = $(this).siblings().children("#tempurole").val();
        idedit = $(this).siblings("#tempuid").val();
        let $this=$(this);
       console.log(nombre,email,password,role,idedit)

        var datos = new FormData();

        datos.append("nombre", nombre);
        datos.append("password", password);
        datos.append("role", role);
        datos.append("id", idedit);

        $.ajax({
            headers: {'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')},
            url: "usuario/"+idedit+"/edit",
            type: "POST",
            data: datos,
            cache: false,
            contentType: false,
            processData: false,
            success: function (respuesta) {
console.log(respuesta.data)
                if (respuesta.data){

                    if (parseInt(respuesta.code)===1){

                        $(document).ready(function() {
                            $(".exampleModal").modal('hide');
                        });

                        $this.parent().parent().parent().parent().parent().siblings().children().children("#id"+respuesta.id).remove();


                        $("#tablausuario").prepend("<tr id='id"+respuesta.id+"'>"+
                            "<th>"+nombre+"</th>"+
                            "<th>"+email+"</th>"+
                            "<th>"+respuesta.data.role.nombre+"</th>"+
                            "<th><button class='col-md-12 btn btn-primary editarusuario' type='button'  data-toggle='modal' data-target='#exampleModal"+respuesta.data.id+"'>Editar</button></th>"+
                            "<th><button class='col-md-12 btn btn-danger eliminarusuario' type='submit'>Eliminar</button><input type='text' value='"+respuesta.data.id+"' id='ideliminarusuario' hidden>"+
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

                if(respuesta.role===undefined){
                    console.log("No mando request")
                }else{
                    Swal.fire({
                        type: 'error',
                        title: 'Error',
                        html:  respuesta.role[0],
                        showConfirmButton: true,
                    });
                }

                if(respuesta.password===undefined){
                    console.log("No mando request")
                }else{
                    Swal.fire({
                        type: 'error',
                        title: 'Error',
                        html:  respuesta.password[0],
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

            }

        });

    });



});
