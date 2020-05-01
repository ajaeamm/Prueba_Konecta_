<?php

namespace App\Http\Middleware;

use App\Http\Controllers\AuthController;
use Closure;

class AutenticacionVista
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
        $valor=session()->get('token');
        if(empty($valor)){
            return redirect('/');
        }else{
            return $next($request);
        }

    }
}
