<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Services\TodoService;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

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
        $todoLists = $this->todoService->getTodoLists();
        return Inertia::render('TodoList', [
            "todoLists" => $todoLists,
        ]);
    }

    // create new todo
    public function create(Request $request)
    {
        $data = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
        ]);

        $todoList = $this->todoService->createTodo($data);

        return Redirect::route('todo.list')->with('success', 'Todo list created successfully!');
    }

    // update todo
    public function update(Request $request)
    {
        // dd($request->all());
        $data = $request->validate([
            'todoId' => 'required|integer|exists:todo_lists,id',
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
        ]);

        $todoList = $this->todoService->updateTodo($data);

        return Redirect::route('todo.list')->with('success', 'Todo list updated successfully!');
    }
}