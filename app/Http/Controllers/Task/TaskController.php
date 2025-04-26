<?php

namespace App\Http\Controllers\Task;

use App\Http\Controllers\Controller;
use App\Models\Task;
use Illuminate\Http\Request;
use Inertia\Inertia;

class TaskController extends Controller
{
    public function index(Request $request)
    {
        $perPage = $request->integer('per_page', 10);
        $search = $request->string('search');

        $query = Task::query();

        if ($search) {
            $query->where('name', 'like', "%{$search}%");
        }

        $tasks = $query->paginate($perPage)->appends($request->query());

        return Inertia::render('task/index', [
            'tasks' => $tasks,
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
