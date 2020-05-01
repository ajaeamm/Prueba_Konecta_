@extends('layouts.app')

@section('content')


<div class="container">
    <br>

<h2 style="text-align: center;">Usuarios</h2>

<button class="col-md-2 btn btn-primary" type="button" data-toggle="modal" data-target="#exampleModal">
  Registrar Usuarios
</button>
    <br>
<br>

<table class="table">
  <thead>
    <tr>
      <th scope="col">Usuario</th>
      <th scope="col">Email</th>
      <th scope="col">Rol</th>
      <th></th>
      <th></th>
    </tr>
  </thead>
  <tbody id="tablausuario">
   @foreach($usuario as $usuarios)
		<tr id="id{{$usuarios->id}}">
			<th>{{ $usuarios->name }}</th>
			<th>{{ $usuarios->email }}</th>
			<th>{{ $usuarios->role->nombre }}</th>
			<th><button class="col-md-12 btn btn-primary" type="button"  data-toggle="modal" data-target="#exampleModal{{$usuarios->id}}">Editar</button></th>
			<th>
                <button id="eliminarusuario" class="col-md-12  btn btn-danger" type="submit">Eliminar</button>
                <input type="text" value="{{$usuarios->id}}" id="ideliminarusuario" hidden>
            </th>
		</tr>

		@endforeach

  </tbody>
</table>


 @foreach($usuario as $usuarios)

	<div class="modal fade exampleModal" id="exampleModal{{ $usuarios->id}}" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">Registrar Cliente</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">

    <input type="text" class="form-control" id="uunombre"  name="nombre" placeholder="Nombre" value="{{ $usuarios->name }}" >
         <br>
   <input type="text" class="form-control" id="uuemail" value="{{ $usuarios->email }}" disabled>
     	 <br>
     	 <input type="password" class="form-control" id="uupassword"  name="password" placeholder="*****" >
     	 <br>
     	    <div class="form-group">
    <label for="exampleFormControlSelect1">Selecciona Rol</label>
    <select name="role" class="form-control"  id="uurole">
      <option value="{{ $usuarios->role->id }}" selected="true">{{ $usuarios->role->nombre }}</option>
      <option value="1">Administrador</option>
      <option value="2">Vendedor</option>
    </select>
  </div>
   <br>
          <input id="uuid" type="text" value="{{$usuarios->id}}" hidden>
        <button type="submit" id="editarusuario" class="btn btn-primary" >Editar</button>

      </div>

    </div>
  </div>
</div>

	@endforeach

<div class="modal fade exampleModal" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">Registrar Usuarios</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">

          <input type="text" class="form-control" id="nombre"  name="nombre" placeholder="Nombre" >
         <br>
      	 <input type="text" class="form-control" id="email"  name="email" placeholder="Email" >
      	 <br>
      	  <input type="password" class="form-control" id="password" name="password" placeholder="Password" >
      	  <br>
      	    <div class="form-group">
    <label for="exampleFormControlSelect1">Selecciona Rol</label>
    <select name="role" class="form-control" id="role" >
        <option value="0" disabled selected>Selecciona Rol</option>
      <option value="1">Administrador</option>
      <option value="2">Vendedor</option>
    </select>
  </div>
      	   <br>
        <button id="gusuario" type="submit" class="btn btn-primary" >Guardar</button>

      </div>

    </div>
  </div>
</div>

<div id="contenteditarusuario">

</div>
</div>
@stop
