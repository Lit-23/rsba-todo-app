import { Head, Link } from '@inertiajs/react';

export default function Welcome({ auth }) {

    return (
        <>
            <Head title="Welcome" />

            <div className="bg-gray-50 min-h-screen flex flex-col">
                <header className="py-10 border-b px-6">
                    <nav className="flex flex-1 justify-end">
                        {auth.user ? (
                            <Link
                                href={route('todo.list')}
                                className="rounded-md px-5 py-2 bg-black text-white hover:bg-white border hover:border-black hover:text-black transition duration-300"
                            >
                                Todo List
                            </Link>
                        ) : (
                            <div className="flex gap-2">
                                <Link
                                    href={route('login')}
                                    className="rounded-md px-5 py-2 bg-black text-white hover:bg-white border hover:border-black hover:text-black transition duration-300"
                                >
                                    Log in
                                </Link>
                                <Link
                                    href={route('register')}
                                    className="rounded-md px-5 py-2 bg-white text-black border border-black hover:bg-black hover:text-white transition duration-300"
                                >
                                    Register
                                </Link>
                            </div>
                        )}
                    </nav>
                </header>
                
                <main className="flex flex-col items-center justify-center py-20 px-6">
                    <h1 className="text-4xl font-bold text-center text-gray-900">
                        Welcome to the Todo App
                    </h1>
                    <p className="mt-4 text-lg text-center text-gray-600">
                        A simple and elegant way to manage your tasks.
                    </p>
                </main>

                <footer className="mt-auto p-10 bg-black text-gray-300 text-center px-6">
                    © {new Date().getFullYear()} Rommel Marquez. All rights reserved.
                </footer>
            </div>

        </>
    );
}
