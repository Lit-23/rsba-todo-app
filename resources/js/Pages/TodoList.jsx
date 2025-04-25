import PrimaryButton from '@/Components/PrimaryButton';
import TodoCard from '@/Components/TodoComp/TodoCard';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { FaPlus } from "react-icons/fa6";

export default function TodoList() {
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
                                <h2 className='text-2xl font-bold'>Tasks</h2>
                                <PrimaryButton>
                                    <FaPlus className='mr-2'/> Add Task
                                </PrimaryButton>
                            </div>
                            <div>
                                <TodoCard />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
