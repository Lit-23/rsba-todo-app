import PrimaryButton from '@/Components/PrimaryButton';
import TodoModal from '@/Components/TodoComp/TodoModal';
import TodoCard from '@/Components/TodoComp/TodoCard';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import { FaPlus } from "react-icons/fa6";
import { MdOutlineErrorOutline } from "react-icons/md";
import TodoInput from '@/Components/TodoComp/TodoInput';
import axios from "axios";
import { router } from '@inertiajs/react'

export default function TodoList({ data }) {
    // console.log("todoLists", todoLists);
    const [todoLists, setTodoLists] = useState(data);
    const [showModal, setShowModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [todoData, setTodoData] = useState({
        modalTitle: 'Create Todo',
        todoId: null,
        title: '',
        description: '',
    });
    const [deleteTodo, setDeleteTodo] = useState({
        todoId: null,
        title: ''
    });
    const [error, setError] = useState(null);

    // handle change todo data
    const handleChangeTodoData = (name, value) => {
        setTodoData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    }

    // handle reset tododata
    const handleTodoDataReset = () => {
        setError(null);
        setTodoData({
            modalTitle: 'Create Todo',
            todoId: null,
            title: '',
            description: '',
        });
    }

    // handle create todo
    const handleCreateTodo = (e) => {
        e.preventDefault();
        
        axios.post('/create-todo', {
            title: todoData.title, 
            description: todoData.description
        }).then(function (response) {
            if(response.status === 200){
                console.log("stat200",response);
                setError(null);
                setTodoLists((prevTodos) => [response.data.todo, ...prevTodos]);
                setShowModal(false);
            }
        }).catch(function (error) {
            console.log("statError",error);
            console.log("title",error.response.data.errors.title[0]);
            setError(error.response.data.errors.title[0]);
        });
    }

    // handle update or delete todo
    const handleUpdateDeleteTodo = (action, todo_data) => {
        console.log(action, todo_data);
        if(action === "edit"){
            handleChangeTodoData('modalTitle', 'Update Todo');
            handleChangeTodoData('todoId', todo_data.id);
            handleChangeTodoData('title', todo_data.title);
            handleChangeTodoData('description', todo_data.description);
            setShowModal(true);
        }else if(action === "delete"){
            setDeleteTodo({
                todoId: todo_data.id,
                title: todo_data.title
            });
            setShowDeleteModal(true);
        }
    }

    // handle update todo
    const handleUpdateTodoDetails = (e) => {
        e.preventDefault();
        
        axios.post('/update-todo', todoData).then(function (response) {
            if(response.status === 200){
                setTodoLists((prevTodos) => prevTodos.map((todo) => {
                    if(todo.id === todoData.todoId){
                        return {
                            ...todo,
                            title: todoData.title,
                            description: todoData.description
                        }
                    }
                    return todo;
                }));
                setShowModal(false);
                setError(null);
                console.log("stat200",response);
            }
        }).catch(function (error) {
            // setShowModal(false);
            console.log("statError",error);
            console.log("title",error.response.data.errors.title[0]);
            setError(error.response.data.errors.title[0]);
        });
    }

    // handle delete todo
    const handleDeleteTodo = () => {
        // axios.delete(`/delete-todo`, { params: { todoId: deleteTodo.todoId } })
        // .then(function (response) {
        //     if (response.status === 200) {
        //         setShowDeleteModal(false);
        //         console.log("stat200", response);
        //     }
        // })
        // .catch(function (error) {
        //     console.log("statError", error);
        // });
        router.delete(`/delete-todo?todoId=${deleteTodo.todoId}`, {
            onSuccess: () => {
                setTodoLists((prevTodos) => prevTodos.filter((todo) => todo.id !== deleteTodo.todoId));
                setShowDeleteModal(false);
            },
            onError: (error) => {}
        })
    }

    useEffect(() => {
        console.log("todoData", todoData);
    }, [todoData]);

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Todo List
                </h2>
            }
        >
            <Head title="TodoList" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <div className='mb-6 flex justify-between'>
                                <h2 className='text-2xl font-bold'>Todos</h2>
                                <PrimaryButton
                                    onClick={() => {setShowModal(true); handleTodoDataReset();}}
                                >
                                    <FaPlus className='mr-2'/> Add Todo
                                </PrimaryButton>
                            </div>
                            <div className='flex flex-col gap-2'>
                                {
                                    todoLists.length > 0 ? todoLists.map((todo) => (
                                        <TodoCard key={todo.id} todo={todo} onSubmit={handleUpdateDeleteTodo} />
                                    )) : <p className='text-center uppercase font-bold border rounded-md text-gray-600 p-6 bg-gray-50'>No todos found</p>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* MODALS */}
            {/* START ------------------ CREATE OR UPDATE TODO ------------------ START */}
            <TodoModal isOpen={showModal} onClose={() => {setShowModal(false); handleTodoDataReset()}}>
                <h2 className="text-xl font-bold mb-4">{todoData.modalTitle}</h2>
                <form onSubmit={
                    todoData.modalTitle === 'Create Todo' && !todoData.todoId ? handleCreateTodo 
                    : todoData.modalTitle === 'Update Todo' && todoData.todoId ? handleUpdateTodoDetails
                    : alert('Error: Something went wrong')
                }>
                
                    <div className='mb-2'>
                        <TodoInput
                            label="Task Title"
                            name="title"
                            value={todoData.title}
                            onChange={(e) => handleChangeTodoData('title',e.target.value)}
                            placeholder="Enter your task title"
                            className={`${error && 'border-red-500'}`}
                        />
                        <small className='text-red-600'>{error}</small>
                    </div>
                    <TodoInput
                        label="Task Description"
                        name="description"
                        value={todoData.description}
                        onChange={(e) => handleChangeTodoData('description',e.target.value)}
                        placeholder="Enter your task description"
                    />

                    <div className='flex'>
                        <button
                            className="mt-2 ml-auto px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded"
                        >
                            Submit
                        </button>
                    </div>
                
                </form>
            </TodoModal>
            {/* END   ------------------ CREATE OR UPDATE TODO ------------------   END */}

            
            {/* START --------------------- DELETE TODO --------------------- START */}
            <TodoModal isOpen={showDeleteModal} onClose={() => setShowDeleteModal(false)}>
                <div className='flex justify-center mb-4'>
                    <MdOutlineErrorOutline className='h-20 w-20 text-red-500'/>
                </div>
                <h2 className="text-3xl text-center font-bold">Are you sure?</h2>
                <div className='text-center mb-4'>You wont be able to revert this!</div>
                <div className='text-center'><span className='font-bold'>Title: </span>{deleteTodo.title}</div>

                <div className='flex justify-end mt-2'>
                    <button
                        className="px-4 py-2 uppercase text-white bg-blue-400 hover:bg-white hover:border hover:border-blue-400 hover:text-blue-400 rounded"
                        onClick={() => setShowDeleteModal(false)}
                    >
                        Cancel
                    </button>
                    <button
                        className="ml-2 px-4 py-2 uppercase border border-red-500 text-red-500 hover:text-white hover:bg-red-500 rounded"
                        onClick={handleDeleteTodo}
                    >
                        Delete
                    </button>
                </div>
                
            </TodoModal>
            {/* END   --------------------- DELETE TODO ---------------------   END */}

        </AuthenticatedLayout>
    );
}
