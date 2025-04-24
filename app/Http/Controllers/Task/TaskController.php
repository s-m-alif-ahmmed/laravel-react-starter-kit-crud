<?php

namespace App\Http\Controllers\Task;

use App\Http\Controllers\Controller;
use App\Models\Task;
use Illuminate\Http\Request;
use Inertia\Inertia;

class TaskController extends Controller
{
    public function index()
    {
        return Inertia::render('task/index',[
            'tasks' => Task::all(),
        ]);
    }

    public function create()
    {
        return Inertia::render('task/create');
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'nullable|string|max:255',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
        ]);

        $task = new Task();
        $task->name = $request->name;

        if ($request->hasFile('image')) {
            $task->image = $request->file('image')->store('uploads/task', 'public');
        }

        $task->save();

        return redirect()->route('task.index')->with('success', 'Task created successfully!');
    }

    public function show(Task $task)
    {
        return Inertia::render('task/show', [
            'task' => $task,
        ]);
    }

    public function edit(Task $task)
    {
        return Inertia::render('task/edit', [
            'task' => $task,
        ]);
    }

    public function update(Request $request, Task $task)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
        ]);


        if ($request->filled('name')) {
            $task->name = $request->input('name');
        }

        if ($request->hasFile('image')) {
            if ($task->image && file_exists(public_path($task->image))) {
                unlink(public_path($task->image));
            }

            $image = $request->file('image');
            $imageName = time() . '_' . uniqid() . '.' . $image->getClientOriginalExtension();
            $image->move(public_path('uploads/task'), $imageName);

            $task->image = 'uploads/task/' . $imageName;
        }

        $task->save();

        return redirect()->route('task.index');
    }

    public function destroy(Task $task)
    {
        $task->delete();
        return redirect()->route('task.index');
    }


}
