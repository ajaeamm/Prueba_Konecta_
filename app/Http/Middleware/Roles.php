<?php

namespace App\Http\Middleware;

use Closure;

class Roles
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next,$role)
    {
        $valor=session()->get('user');
        if($valor[0]->role->key==$role){
            return $next($request);
        }

        return redirect('/home');
    }
}
