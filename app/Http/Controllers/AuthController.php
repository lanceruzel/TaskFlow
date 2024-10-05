<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules\Password;

class AuthController extends Controller
{
    public function register(Request $request){  
        $validated = $request->validate([
            'first_name' => 'required|max:255',
            'last_name' => 'required|max:255',
            'email' => 'required|email|unique:users',
            'password' => [
                'required', 
                'confirmed', 
                // Password::min(8)->letters()->mixedCase()->numbers()->symbols(),
            ],
        ]);

        $user = User::create($validated);
        $token = $user->createToken($user->email);

        return [
            'user' => $user,
            'token' => $token->plainTextToken,
            'message' => [
                    'severity' => 'success',
                    'summary' => 'Success',
                    'detail' => 'Account created. You can now log in.',
                ]
        ];
    }   

    public function login(Request $request){
        $validated = $request->validate([
            'email' => 'required|email',
            'password' => 'required',
        ]);

        $user = User::where('email', $validated['email'])->first();

        if(!$user || !Hash::check($validated['password'], $user->password)){
            return [
                'message' => [
                    'severity' => 'error',
                    'summary' => 'Error',
                    'detail' => 'The provided credentials are incorrect.',
                ]
            ];
        }

        $token = $user->createToken($user->email);

        return [
            'user' => $user,
            'token' => $token->plainTextToken
        ];
    }

    public function logout(Request $request){
        $request->user()->tokens()->delete();
        
        return [
            'message' => [
                'severity' => 'success',
                'summary' => 'Success',
                'detail' => 'You have been logged out.',
            ]
        ];
    }
}
