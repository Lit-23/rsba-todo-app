<?php

namespace App\Services;
use Illuminate\Http\Request;
use DB;
use Carbon\Carbon;
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

    //
    public function createTodoList($data)
    {
        try{
            $newTodo = TodoList::create([
                'user_id' => Auth::id(),
                'title' => $data['title'],
                'description' => $data['description']
            ]);

            return ['success' => true, 'message' => 'Added task successfully!'];

        } catch (\Exception $e) {

            return ['success' => false, 'message' => 'Add task failed: ' . $e->getMessage()];

        }
    }


}
