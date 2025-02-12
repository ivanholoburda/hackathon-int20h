
import { Link } from "@inertiajs/react";

export default function Home() {
    return (
        <div className="text-center py-12">
            <h1 className="text-4xl font-bold text-gray-800">Ласкаво просимо!</h1>
            <p className="mt-4 text-lg text-gray-600">
                RzhadQuest - це платформа для створення та проходження інтерактивних квестів із використанням мультимедійних елементів.
            </p>

            <div className="mt-6 flex flex-col sm:flex-row justify-center space-y-4 sm:space-x-6 sm:space-y-0">
                <Link
                    href="/quests"
                    className="bg-[#66bb6a] text-white px-8 py-4 rounded-full shadow-lg text-lg font-semibold transition transform hover:bg-[#388E3C] hover:scale-105 duration-300"
                >
                    Переглянути квести
                </Link>
                <Link
                    href="/quests/create"
                    className="bg-[#5c6bc0] text-white px-8 py-4 rounded-full shadow-lg text-lg font-semibold transition transform hover:bg-[#3f51b5] hover:scale-105 duration-300"
                >
                    Створити квест
                </Link>
                <Link
                    href="/rooms"
                    className="bg-[#66bb6a] text-white px-8 py-4 rounded-full shadow-lg text-lg font-semibold transition transform hover:bg-[#388E3C] hover:scale-105 duration-300"
                >
                    Активні кімнати
                </Link>
            </div>


            <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                <div className="p-6 bg-white shadow-md rounded-lg">
                    <h3 className="text-xl font-semibold text-gray-800">🔍 Інтерактивні завдання</h3>
                    <p className="mt-2 text-gray-600">Використовуйте текст, зображення та запитання для створення
                        унікальних випробувань.</p>
                </div>
                <div className="p-6 bg-white shadow-md rounded-lg">
                    <h3 className="text-xl font-semibold text-gray-800">🏆 Система рейтингів</h3>
                    <p className="mt-2 text-gray-600">Створюйте квести, отримайте позитивні відгуки від інших гравців та
                        піднімайтеся в рейтингу авторів!</p>
                </div>
                <div className="p-6 bg-white shadow-md rounded-lg">
                    <h3 className="text-xl font-semibold text-gray-800">👥 Змагальні квести</h3>
                    <p className="mt-2 text-gray-600">Проходьте квестами групами та змагайтесь з іншими учасниками.</p>
                </div>
            </div>
        </div>
    );
}
