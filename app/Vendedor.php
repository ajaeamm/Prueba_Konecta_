<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Vendedor extends Model
{
    protected $table='vendedores';

    protected $fillable=['documento','nombre','correo','direccion'];
}
