$(document).ready(function() {

    $(document).bind('keypress', function(e) {
        if(e.keyCode==13){
            $('#login').trigger('click');
        }
    });

    $("#login").click(function () {

        email= $("#email").val();
        password= $("#password").val();

        var datos = new FormData();

        datos.append("email", email);
        datos.append("password", password);

        $.ajax({
            headers: {'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')},
            url: "api/auth/login",
            type: "POST",
            data: datos,
            cache: false,
            contentType: false,
            processData: false,
            success: function (respuesta) {

               if(parseInt(respuesta.respuesta)===0){
                    Swal.fire({
                        type: 'error',
                        title: 'Error',
                        text: respuesta.mensaje,
                        showConfirmButton: false,
                        timer: 2000
                    });
                }

                if(parseInt(respuesta.respuesta)===1){
                    Swal.fire({
                        type: 'success',
                        title: 'Éxito',
                        text: respuesta.mensaje,
                        showConfirmButton: false,
                        timer: 2000
                    });
                    $(window).attr('location','/home');
                }

            }
        });


    });


    $("a#logout").click(function () {

        token=$("#token").val();

        $.ajax({
            headers: {'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')},
            url: "api/auth/logout",
            type: "POST",
            cache: false,
            headers: {'Authorization': 'Bearer '+token},
            contentType: false,
            processData: false,
            success: function (respuesta) {

                    Swal.fire({
                        type: 'success',
                        title: 'Éxito',
                        text: respuesta.mensaje,
                        showConfirmButton: false,
                        timer: 2000
                    });

                    $(window).attr('location','/');
                }

        });

    });

});
