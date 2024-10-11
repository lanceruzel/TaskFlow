<?php

namespace App\Http\Controllers;

use App\Models\Project;
use Illuminate\Container\Attributes\Auth;
use Illuminate\Http\Request;

class ProjectController extends Controller
{
    public function index(Request $request){
        return response()->json(Project::where('owner_id', $request->user()->id)->orderBy('id','desc')->get());
    }

    public function store(Request $request){
        $validated = $request->validate([
            'project_title' => 'required|min:5',
        ]);

        $project = Project::create([
            'owner_id' => $request->user()->id,
            'project_title' => $validated['project_title'],
        ]);

        return [
            'project' => $project,
            'message' => [
                'severity' => 'success',
                'summary' => 'Success',
                'detail' => 'Project has been successfully added.',
            ]
        ];
    }

    public function show($id){
        $project = Project::with(['tasks.user'])->findOrFail($id);
        return response()->json($project);
    }

    public function update(Request $request){
    }

    public function destroy($id){

    }
}
