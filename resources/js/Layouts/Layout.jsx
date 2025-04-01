import React, { useState } from "react";
import { Link, usePage } from "@inertiajs/react";
import { Menu, X } from "lucide-react";

export default function Layout({ children }) {
    const { user } = usePage().props;
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <div className="min-h-screen flex flex-col bg-[#e8f5e9]">
            <header className="bg-gradient-to-r bg-gradient-to-r from-[#388E3C] to-[#4CAF50] shadow-lg">
                <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                    <div className="flex items-center justify-between">
                        <Link
                            href="/"
                            className="text-white text-4xl font-extrabold tracking-wide transition duration-500 transform hover:scale-125 hover:rounded-lg hover:text-white"
                            style={{
                                fontFamily: "'Poppins', sans-serif",
                                textShadow: "2px 2px 6px rgba(0, 0, 0, 0.2)",
                            }}
                        >
                            RzhadQuestStaging
                        </Link>

                        <div className="md:hidden">
                            <button
                                onClick={() => setMenuOpen(!menuOpen)}
                                className="text-white focus:outline-none"
                            >
                                {menuOpen ? <X size={32} /> : <Menu size={32} />}
                            </button>
                        </div>

                        <div className="hidden md:flex space-x-10 flex-1 justify-center">
                            <Link
                                href="/"
                                className="text-white text-xl font-medium hover:text-gray-100 transition duration-300 hover:bg-white hover:text-green-500 px-4 py-2 rounded-lg"
                            >
                                Головна
                            </Link>
                            <Link
                                href="/quests"
                                className="text-white text-xl font-medium hover:text-gray-100 transition duration-300 hover:bg-white hover:text-green-500 px-4 py-2 rounded-lg"
                            >
                                Квести
                            </Link>
                            <Link
                                href="/leaderboard"
                                className="text-white text-xl font-medium hover:text-gray-100 transition duration-300 hover:bg-white hover:text-green-500 px-4 py-2 rounded-lg"
                            >
                                Рейтинг авторів
                            </Link>
                        </div>

                        <div className="hidden md:flex items-center">
                            {user ? (
                                <Link
                                    href="/profile"
                                    className="text-white text-xl font-medium hover:text-gray-100 transition duration-300 hover:bg-white hover:text-green-500 px-4 py-2 rounded-lg"
                                >
                                    Профіль
                                </Link>
                            ) : (
                                <Link
                                    href="/login"
                                    className="text-white text-xl font-medium hover:text-gray-100 transition duration-300 hover:bg-white hover:text-green-500 px-4 py-2 rounded-lg"
                                >
                                    Увійти
                                </Link>
                            )}
                        </div>
                    </div>
                </nav>

                {menuOpen && (
                    <div className="md:hidden bg-green-600 py-4 px-6 flex flex-col space-y-4">
                        <Link
                            href="/"
                            className="text-white text-xl font-medium hover:text-gray-100 transition duration-300"
                            onClick={() => setMenuOpen(false)}
                        >
                            Головна
                        </Link>
                        <Link
                            href="/quests"
                            className="text-white text-xl font-medium hover:text-gray-100 transition duration-300"
                            onClick={() => setMenuOpen(false)}
                        >
                            Квести
                        </Link>
                        <Link
                            href="/leaderboard"
                            className="text-white text-xl font-medium hover:text-gray-100 transition duration-300"
                            onClick={() => setMenuOpen(false)}
                        >
                            Рейтинг авторів
                        </Link>
                        {user ? (
                            <Link
                                href="/profile"
                                className="text-white text-xl font-medium hover:text-gray-100 transition duration-300"
                                onClick={() => setMenuOpen(false)}
                            >
                                Профіль
                            </Link>
                        ) : (
                            <Link
                                href="/login"
                                className="text-white text-xl font-medium hover:text-gray-100 transition duration-300"
                                onClick={() => setMenuOpen(false)}
                            >
                                Увійти
                            </Link>
                        )}
                    </div>
                )}
            </header>

            <main className="flex-1 mx-auto container px-4 sm:px-6 lg:px-8 py-8">
                {children}
            </main>
        </div>
    );
}
