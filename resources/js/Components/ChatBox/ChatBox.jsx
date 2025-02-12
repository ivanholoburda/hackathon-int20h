import React, { useState } from "react";
import axios from "axios";

export default function ChatBox({ messages, roomId }) {
    const [message, setMessage] = useState("");

    const sendMessage = () => {
        if (message.trim() !== '') {
            axios.post(`/rooms/${roomId}/send-message`, {
                message: message,
            })
            setMessage("");
        }
    }

    return (
        <div className="h-[400px] bg-white shadow-lg rounded-lg flex flex-col absolute ml-[700px] mt-4 mr-4 p-4">
            <div className="flex-1 overflow-y-auto">
                {messages.map((msg, index) => (
                    <div key={index} className="mb-2 p-2 bg-gray-100 rounded-lg">
                        <span className="text-sm font-bold">{msg.user.name}:</span>
                        <p className="text-sm">{msg.message}</p>
                    </div>
                ))}
            </div>
            <div className="mt-2 flex">
                <input
                    type="text"
                    className="flex-1 p-2 border rounded-lg"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Введіть повідомлення..."
                />
                <button
                    className="ml-2 px-4 py-2 bg-green-600 text-white rounded-lg"
                    onClick={sendMessage}
                >
                    Відправити
                </button>
            </div>
        </div>
    );
}
