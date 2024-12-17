<?php

namespace App\Http\Controllers;

use App\Models\Task;
use Illuminate\Http\Request;

class TaskController extends Controller
{
    //
    public function show($id){
        return response()->json(Task::where('project_id', $id)->orderBy('updated_at','asc')->get());
    }

    public function store(Request $request){
        $validated = $request->validate([
            'project_id' => 'required',
            'title' => 'required|min:5',
        ]);

        Task::create([
            'project_id' => $validated['project_id'],
            'assigned_id' => $request->assigned_id,
            'title' => $validated['title']
        ]);

        return [
            'message' => [
                'severity' => 'success',
                'summary' => 'Success',
                'detail' => 'Task has been successfully added.',
            ]
        ];
    }

    public function update($id, Request $request){
        $task = Task::find($id);

        $validated = null;

        if($request->title){
            $validated = $request->validate([
                'title' => 'min:5'
            ]);

            $task->title = $validated['title'];
        }

        if($request->status){
            $task->status = $request->status;
        }

        $task->save();

        return [
            'message' => [
                'severity' => 'success',
                'summary' => 'Success',
                'detail' => 'Task has been successfully updated.',
            ]
        ];
    }

    public function destroy($id, Request $request){
        $task = Task::find($id);

        if (!$task) {
            return response()->json([
                'message' => [
                    'severity' => 'danger',
                    'summary' => 'Error',
                    'detail' => 'Task not found.',
                ]
            ], 404);
        }

        $task->delete();

        return response()->json([
            'message' => [
                'severity' => 'success',
                'summary' => 'Success',
                'detail' => 'Project has been successfully deleted.',
            ]
        ]);
    }
}
