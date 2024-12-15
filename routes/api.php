<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\ProjectController;
use App\Http\Controllers\TaskController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::post('/auth/register', [AuthController::class, 'register']);
Route::post('/auth/login', [AuthController::class, 'login']);
Route::post('/auth/logout', [AuthController::class, 'logout'])->middleware('auth:sanctum');

Route::get('/project/index', [ProjectController::class, 'index'])->middleware('auth:sanctum');
Route::post('/project/store', [ProjectController::class, 'store'])->middleware('auth:sanctum');
Route::get('/project/show/{id}', [ProjectController::class, 'show'])->middleware('auth:sanctum');

Route::get('/task/show/{id}', [TaskController::class, 'show'])->middleware('auth:sanctum');
Route::post('/task/store', [TaskController::class, 'store'])->middleware('auth:sanctum');
Route::put('/task/update/{id}', [TaskController::class, 'update'])->middleware('auth:sanctum');