<?php

namespace App\Http\Controllers;

use DB;
use App\User;
use Carbon\Carbon;
use Illuminate\Http\Request;
use App\Http\Requests\usuariorequest;
use App\Http\Requests\usuarioeditrequest;

class UserController extends Controller
{

        public function __construct()
    {
        $this->middleware('vista');
         $this->middleware('roles:Admin');
    }
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {

         $usuario=User::all();

        return view('usuario.index',compact('usuario'));
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

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(usuariorequest $request)
    {

    $user = new User();
    $user->name = $request->input('nombre');
    $user->email = $request->input('email');
    $user->password = bcrypt($request->input('password'));
    $user->role_id = $request->input('role');
    $user->save();
    $data = User::with('role')->find($user);
    $msj="Guardado Con Exito";
    $code=1;
    return response()->json(array("data"=>$data,"code"=>$code,"msj"=>$msj));

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
    public function edit(usuarioeditrequest $request,$id)
    {
        DB::table('users')->where('id',$id)->update([
            "name"=>$request->input('nombre'),
            "password"=>bcrypt($request->input('password')),
            "role_id"=>$request->input('role'),
            "updated_at"=>Carbon::now(),
        ]);

        $data = User::with('role')->find($id);
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
    public function update(usuariorequest $request, $id)
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

    public  function delete($id){
        $personaid= User::findOrFail($id);

        $personaid->delete();

        $msj="Eliminado";
        $code=1;
        return response()->json(array("code"=>$code,"msj"=>$msj));
    }

}
