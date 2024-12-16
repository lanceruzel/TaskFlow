<?php

namespace App\Http\Controllers;

use App\Models\Project;
use Illuminate\Container\Attributes\Auth;
use Illuminate\Http\Request;

class ProjectController extends Controller
{
    public function index(Request $request){
        return response()->json(Project::where('owner_id', $request->user()->id)->with('tasks')->orderBy('id','asc')->get());
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

    public function show($id, Request $request){
        $project = $request->user()->projects()->with('tasks')->find($id);
        
        return response()->json($project);
    }

    public function update($id, Request $request){
        $validated = $request->validate([
            'project_title' => 'required|min:5',
        ]);

        $project = $request->user()->projects()->find($id);
        $project->project_title = $validated['project_title'];
        $project->save();

        return [
            'project' => $project,
            'message' => [
                'severity' => 'success',
                'summary' => 'Success',
                'detail' => 'Project has been successfully updated.',
            ]
        ];
    }

    public function destroy($id, Request $request){
        $project = $request->user()->projects()->find($id);

        if (!$project) {
            return response()->json([
                'message' => [
                    'severity' => 'danger',
                    'summary' => 'Error',
                    'detail' => 'Project not found.',
                ]
            ], 404);
        }

        $project->delete();

        return response()->json([
            'message' => [
                'severity' => 'success',
                'summary' => 'Success',
                'detail' => 'Project has been successfully deleted.',
            ]
        ]);
    }
}
