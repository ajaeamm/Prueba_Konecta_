@extends('layouts.app')

@section('content')
    <div class="container">
<br>
<h2 style="text-align: center;">Vendedor</h2>
<button class="col-md-2 btn btn-primary" type="button" data-toggle="modal" data-target="#exampleModal">
  Registrar vendedor
</button>
        <br>
<br>

<table class="table">
  <thead>
    <tr>
      <th scope="col">Identificacion</th>
      <th scope="col">Nombre</th>
      <th scope="col">Correo</th>
      <th scope="col">Direccion</th>
        <th></th>
        <th></th>
    </tr>
  </thead>
  <tbody id="tablavendedor">
   @foreach($vendedor as $vendedores)
		<tr id="id{{$vendedores->id}}">
      <th>{{ $vendedores->documento }}</th>
			<th>{{ $vendedores->nombre }}</th>
			<th>{{ $vendedores->correo }}</th>
			<th>{{ $vendedores->direccion }}</th>
			<th><button class="col-md-12 btn btn-primary" type="button" data-toggle="modal" data-target="#exampleModal{{$vendedores->id}}">Editar</button></th>
			<th>
                <button id="eliminar" class="col-md-12  btn btn-danger" type="submit">Eliminar</button>
                <input type="text" value="{{$vendedores->id}}" id="ideliminar" hidden>
            </th>
		</tr>

		@endforeach
  </tbody>
</table>

   @foreach($vendedor as $vendedores)

<div class="modal fade exampleModal" id="exampleModal{{ $vendedores->id}}" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">Editar vendedor</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">

    <input type="number" class="form-control" id="udocumento"  name="documento" placeholder="Documento" value="{{ $vendedores->documento }}" >
         <br>
   <input type="text" class="form-control" id="unombre" name="nombre" placeholder="Nombre" value="{{ $vendedores->nombre }}" >
         <br>
   <input type="email" class="form-control" id="ucorreo" name="correo" placeholder="Correo" value="{{ $vendedores->correo }}" >
          <br>
    <input type="text" class="form-control" id="udireccion" name="direccion" placeholder="direccion" value="{{ $vendedores->direccion }}" >
           <br>
          <input id="uid" type="text" value="{{$vendedores->id}}" hidden>
        <button id="editar" class="btn btn-primary" >Editar</button>

      </div>

    </div>
  </div>
</div>

@endforeach

<div class="modal fade exampleModal" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">Registrar vendedor</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">

          <input type="number" class="form-control" id="documento" name="documento" placeholder="Documento" >
         <br>
      	 <input type="text" class="form-control" id="nombre" name="nombre" placeholder="Nombre" >
      	 <br>
      	  <input type="email" class="form-control" id="correo" name="correo" placeholder="Correo" >
      	  <br>
      	   <input type="text" class="form-control" id="direccion" name="direccion" placeholder="Direccion" >
      	   <br>

        <button class="btn btn-primary" id="gvendedor">Guardar</button>

      </div>

    </div>
  </div>
</div>

        <div id="contenteditar">

        </div>

</div>
@stop
