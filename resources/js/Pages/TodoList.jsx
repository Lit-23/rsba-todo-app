import PrimaryButton from '@/Components/PrimaryButton';
import TodoModal from '@/Components/TodoComp/TodoModal';
import TodoCard from '@/Components/TodoComp/TodoCard';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { useState } from 'react';
import { FaPlus } from "react-icons/fa6";
import TodoInput from '@/Components/TodoComp/TodoInput';
import axios from "axios";

export default function TodoList({ todoLists }) {
    console.log("todoLists", todoLists);
    const [showModal, setShowModal] = useState(false);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    const handleCreateTodo = (e) => {
        e.preventDefault();
        
        axios.post('/create-todo', {title, description}).then(function (response) {
            if(response.status === 200){
                console.log("stat200",response);
            }
        }).catch(function (error) {
            console.log("statError",error);
        });

        setShowModal(false);
        // alert(`Todo Created: ${title} - ${description}`);
    }
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
                                        <TodoCard key={todo.id} todo={todo} />
                                    )) : <p className='text-center uppercase font-bold text-gray-600'>No todos found</p>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* MODALS */}
            {/* START ------------------ CREATE TODO ------------------ START */}
            <TodoModal isOpen={showModal} onClose={() => setShowModal(false)}>
                <h2 className="text-xl font-bold mb-4">Create Todo</h2>
                <form onSubmit={handleCreateTodo}>
                
                    <TodoInput
                        label="Task Title"
                        name="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Enter your task title"
                    />
                    <TodoInput
                        label="Task Description"
                        name="title"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
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
            {/* END   ------------------ CREATE TODO ------------------   END */}

        </AuthenticatedLayout>
    );
}
