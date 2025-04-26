<?php

namespace App\Services;
use Illuminate\Http\Request;
use DB;
use Illuminate\Support\Facades\Storage;
use App\Models\TodoList;
use Illuminate\Support\Facades\Auth;

class TodoService
{
    /**
     * Create a new class instance.
     */
    public function __construct()
    {
        //
    }

    // Get all todo lists for the authenticated user
    public function getTodoLists()
    {
        try{

            $todoLists = Auth::user()->todoLists; // get the todo list using Eloquent Relationship
            return $todoLists;

        } catch (\Exception $e) {

            return ['success' => false, 'message' => 'Get todo lists failed: ' . $e->getMessage()];

        }
    }

    // create new todo
    public function createTodo($data)
    {
        try{
            $newTodo = TodoList::create([
                'user_id' => Auth::id(),
                'title' => $data['title'],
                'description' => $data['description']
            ]);
            return ['success' => true, 'message' => 'Added task successfully!'];

            // // using Eloquent Relationship
            // $user = Auth::user();
            // $newTodo = $user->todoLists()->create([
            //     'title' => $data['title'],
            //     'description' => $data['description'],
            // ]);

        } catch (\Exception $e) {

            return ['success' => false, 'message' => 'Add task failed: ' . $e->getMessage()];

        }
    }

    // update todo
    public function updateTodo($data)
    {
        try{
            $updateTodo = TodoList::where("id", $data["todoId"])->update([
                'title' => $data['title'],
                'description' => $data['description'],
                'updated_at' => now()
            ]);
            return ['success' => true, 'message' => 'Updated todo successfully!'];

        } catch (\Exception $e) {

            return ['success' => false, 'message' => 'Updated todo failed: ' . $e->getMessage()];

        }
    }


}
