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
    <main className="flex h-[calc(100vh-3.5rem)] flex-col p-4">
      <div className="mx-auto flex h-full w-full max-w-md flex-col">
        <input
          className="mb-4 w-full rounded border p-2"
          onChange={(e) => setUserName(e.target.value)}
          placeholder="Enter your name"
          type="text"
          value={userName}
        />
        <div className="mb-4 flex-1 overflow-y-auto">
          {messages
            ?.sort((a, b) => a._creationTime - b._creationTime)
            .map(({ _id, userName: msgUserName, text: msgText }) => (
              <div className="mb-2" key={_id}>
                <strong>{msgUserName}:</strong> {msgText}
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
