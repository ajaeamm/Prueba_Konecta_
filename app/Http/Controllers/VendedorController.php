<?php

namespace App\Http\Controllers;

use DB;
use App\Http\Requests\vendedorrequest;
use App\Vendedor;
use Carbon\Carbon;
use Illuminate\Http\Request;



class VendedorController extends Controller
{
             public function __construct()
    {
        $this->middleware('vista');

    }
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
           $vendedor=Vendedor::all();

      return view('vendedor.index',compact('vendedor'));
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }


    public function store(vendedorrequest $request)
    {
        $vendedor=Vendedor::create($request->all());
        $msj="Guardado Con Exito";
        $code=1;
        return response()->json(array("data"=>$vendedor,"code"=>$code,"msj"=>$msj));

    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit(vendedorrequest $request, $id)
    {
        $personaid= Vendedor::findOrFail($id);

        $personaid->update($request->all());
        $data=$request->all();
        $msj="Editado Con Exito";
        $code=1;
        return response()->json(array("data"=>$data,"code"=>$code,"msj"=>$msj,"id"=>$id));

    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {

    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {

    }

    public function delete($id){
        $personaid= Vendedor::findOrFail($id);

        $personaid->delete();

        $msj="Eliminado";
        $code=1;
        return response()->json(array("code"=>$code,"msj"=>$msj));
    }

}
