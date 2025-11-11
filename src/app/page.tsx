"use client";

import { useMutation, useQuery } from "convex/react";
import { useState } from "react";
import { api } from "~/convex/_generated/api";

export default function Home() {
  const messages = useQuery(api.message.get);
  const addMessage = useMutation(api.message.add);
  const [userName, setUserName] = useState("");
  const [text, setText] = useState("");

  const handleSend = () => {
    if (userName && text) {
      addMessage({ userName, text });
      setText("");
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className="w-full max-w-md">
        <input
          className="mb-4 w-full rounded border p-2"
          onChange={(e) => setUserName(e.target.value)}
          placeholder="Enter your name"
          type="text"
          value={userName}
        />
        <div className="mb-4">
          {messages
            ?.sort((a, b) => a._creationTime - b._creationTime)
            .map(({ _id, userName, text }) => (
              <div className="mb-2" key={_id}>
                <strong>{userName}:</strong> {text}
              </div>
            ))}
        </div>
        <div className="flex">
          <input
            className="flex-1 rounded-l border p-2"
            onChange={(e) => setText(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleSend()}
            placeholder="Type a message"
            type="text"
            value={text}
          />
          <button
            className="rounded-r bg-blue-500 p-2 text-white"
            onClick={handleSend}
            type="button"
          >
            Send
          </button>
        </div>
      </div>
    </main>
  );
}
