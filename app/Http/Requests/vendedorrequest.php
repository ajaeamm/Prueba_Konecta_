<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Http\Exceptions\HttpResponseException;

class vendedorrequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     *
     * @return array
     */
    public function rules()
    {

        return  [
            'documento'=>'required|numeric|unique:vendedores,documento',
            'correo'=>'required|email|unique:vendedores,correo',
            'nombre'=>'required',
            'direccion'=>'required',
        ];

    }

    protected function failedValidation(Validator $validator) {

        throw new HttpResponseException(response()->json($validator->errors()));

    }
}
