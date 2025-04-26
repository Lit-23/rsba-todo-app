import PrimaryButton from '@/Components/PrimaryButton';
import TodoModal from '@/Components/TodoComp/TodoModal';
import TodoCard from '@/Components/TodoComp/TodoCard';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import { FaPlus } from "react-icons/fa6";
import TodoInput from '@/Components/TodoComp/TodoInput';
import axios from "axios";

export default function TodoList({ todoLists }) {
    // console.log("todoLists", todoLists);
    const [showModal, setShowModal] = useState(false);
    const [todoData, setTodoData] = useState({
        modalTitle: 'Create Todo',
        todoId: null,
        title: '',
        description: '',
    });

    // handle change todo data
    const handleChangeTodoData = (name, value) => {
        setTodoData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    }

    // handle reset tododata
    const handleTodoDataReset = () => {
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
            }
        }).catch(function (error) {
            console.log("statError",error);
        });

        setShowModal(false);
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
            // handle delete todo
            alert(`Todo Deleted: ${todo_data.title}`);
        }
    }

    // handle update todo
    const handleUpdateTodoDetails = (e) => {
        e.preventDefault();
        
        axios.post('/update-todo', todoData).then(function (response) {
            if(response.status === 200){
                setShowModal(false);
                console.log("stat200",response);
            }
        }).catch(function (error) {
            // setShowModal(false);
            console.log("statError",error);
        });
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
                                    onClick={() => setShowModal(true)}
                                >
                                    <FaPlus className='mr-2'/> Add Todo
                                </PrimaryButton>
                            </div>
                            <div>
                                {
                                    todoLists.length > 0 ? todoLists.map((todo) => (
                                        <TodoCard key={todo.id} todo={todo} onSubmit={handleUpdateDeleteTodo} />
                                    )) : <p className='text-center uppercase font-bold text-gray-600'>No todos found</p>
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
                
                    <TodoInput
                        label="Task Title"
                        name="title"
                        value={todoData.title}
                        onChange={(e) => handleChangeTodoData('title',e.target.value)}
                        placeholder="Enter your task title"
                    />
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

        </AuthenticatedLayout>
    );
}
