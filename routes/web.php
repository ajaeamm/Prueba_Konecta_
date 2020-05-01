<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('auth.login');
});

Auth::routes();

Route::get('/home', 'HomeController@index')->name('home');
Route::resource('usuario', 'UserController');
Route::resource('vendedor', 'VendedorController');
Route::post('vendedor/{vendedor}','VendedorController@delete')->name('vendedor.delete');
Route::post('vendedor/{vendedor}/edit','VendedorController@edit')->name('vendedor.edit');
Route::post('usuario/{usuario}','UserController@delete')->name('usuario.delete');
Route::post('usuario/{usuario}/edit','UserController@edit')->name('usuario.edit');
