<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Services\TodoService;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Http\Request;

class TodoController extends Controller
{
    protected $todoService;

    public function __construct(TodoService $todoService)
    {
        $this->todoService = $todoService;
        // date_default_timezone_set('');
    }

    public function index()
    {
        // $todoLists = $this->todoService->getTodoLists();
        // return Inertia::render('Todo/Todo', [
        //     "userId" => auth()->user()->id,
        //     "todoLists" => $todoLists,
        // ]);
        return Inertia::render('TodoList');
    }

    public function create(Request $request)
    {
        // dd($request->all());
        $data = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
        ]);

        $todoList = $this->todoService->createTodoList($data);

        return Redirect::route('todo.list')->with('success', 'Todo list created successfully!');
    }
}