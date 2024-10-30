// // src/App.tsx
// import React, { useState } from 'react';
// import Header from './components/Header';
// import Sidebar from './components/Sidebar';
// import Greeting from './components/Greeting';
// import QuickAccessButtons from './components/QuickAccessButtons';
// import MessageInput from './components/MessageInput';

// const App: React.FC = () => {
//   const [isSidebarOpen, setIsSidebarOpen] = useState(false);

//   const toggleSidebar = () => {
//     setIsSidebarOpen(!isSidebarOpen);
//   };

//   return (
//     <div className="min-h-screen flex flex-col">
//       <Header onToggleSidebar={toggleSidebar} />
//       {isSidebarOpen && <Sidebar />}
//       <main className="flex-grow container mx-auto px-4">
//         <Greeting />
//         <QuickAccessButtons />
//       </main>
//       <MessageInput />
//     </div>
//   );
// };

// export default App;


import React, { useEffect, useRef, useState } from 'react';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Greeting from './components/Greeting';
import QuickAccessButtons from './components/QuickAccessButtons';
import MessageInput from './components/MessageInput';
import { ThreadMessage } from "openai/resources/beta/threads/messages/messages";
import Markdown from 'markdown-to-jsx';
import axios from "axios";

// const BASE_URL = process.env.BASE_URL;
// if (!BASE_URL) {
//     throw new Error("Missing BASE_URL environment variable.");
// }
const BASE_URL = import.meta.env.VITE_BASE_URL;
if (!BASE_URL) {
    throw new Error("Missing VITE_BASE_URL environment variable.");
}

const App: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const threadId = useRef<string | undefined>(undefined);
  const scrollContainer = useRef<HTMLDivElement>(null);
  const [runId, setRunId] = useState<string | undefined>(undefined);
  const [messages, setMessages] = useState<ThreadMessage[]>([]);
  const [message, setMessage] = useState<string>("");

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  // Chat functionality
  async function createThread(): Promise<void> {
    if (threadId.current === undefined) {
      const storedThreadId = localStorage.getItem("threadId");
      if (storedThreadId) {
        threadId.current = storedThreadId;
        await updateMessages();
      }
    }

    if (threadId.current !== undefined) {
      return;
    }

    const { data } = await axios.post(`${BASE_URL}/chat/new`);
    threadId.current = data.threadId;
    localStorage.setItem("threadId", threadId.current!);
  }

  async function sendMessage(text: string): Promise<void> {
    if (runId !== undefined) {
      return;
    }

    const { data } = await axios.post(`${BASE_URL}/chat/send`, {
      threadId: threadId.current,
      text,
    });

    setRunId(data.runId);
  }

  async function handleSendMessage(text: string): Promise<void> {
    const messageToSend = text.trim();
    setMessage(""); // Clear for the next message
    await sendMessage(messageToSend);
  }

  async function updateMessages(): Promise<void> {
    const { data } = await axios.post(`${BASE_URL}/chat/list`, {
      threadId: threadId.current,
      runId: runId,
    });

    const { messages, status } = data;
    messages.reverse();
    setMessages(messages);

    if (runId && status === "completed") {
      setTimeout(() => {
        setRunId(undefined);
      }, 5000);
    }
  }

  function getRoleName(role: string): string {
    return role === "user" ? "You" : role === "assistant" ? "AI" : role;
  }

  function renderMessage(message: ThreadMessage) {
    return (
      <div className="flex gap-3 my-4 text-gray-600 text-sm">
        <span className="relative flex shrink-0 overflow-hidden rounded-full w-8 h-8">
          <div className="rounded-full bg-gray-100 border p-1">
            {message.role === "assistant" ? (
              <svg stroke="none" fill="black" strokeWidth="1.5" viewBox="0 0 24 24" height="20" width="20">
                <path d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456z"/>
              </svg>
            ) : (
              <svg stroke="none" fill="black" strokeWidth="0" viewBox="0 0 16 16" height="20" width="20">
                <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0Zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4Z"/>
              </svg>
            )}
          </div>
        </span>
        <div className="flex flex-col">
          {message.content.map((content, index) => {
            if (content.type === "text") {
              return (
                <div key={index} className="leading-relaxed">
                  {index === 0 && (
                    <span className="block font-bold text-gray-700">
                      {getRoleName(message.role)}
                    </span>
                  )}
                  <Markdown>{content.text.value}</Markdown>
                </div>
              );
            }
            return null;
          })}
        </div>
      </div>
    );
  }

  useEffect(() => {
    createThread().catch(err => {
      console.error(`Failed to create message thread.`);
      console.error(err);
    });
  }, []);

  useEffect(() => {
    if (runId === undefined) {
      return;
    }

    const timer = setInterval(() => {
      updateMessages();
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, [runId]);

  useEffect(() => {
    if (scrollContainer.current) {
      scrollContainer.current.scrollTop = scrollContainer.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div className="min-h-screen flex flex-col">
      <Header onToggleSidebar={toggleSidebar} />
      {isSidebarOpen && <Sidebar />}
      <main className="flex-grow container mx-auto px-4 flex flex-col">
        <Greeting />
        <QuickAccessButtons />
        
        {/* Chat Messages Container */}
        <div 
          ref={scrollContainer}
          className="flex-grow overflow-y-auto mb-6 pr-4 mt-4"
        >
          {messages.map((message, index) => renderMessage(message))}
          
          {runId !== undefined && (
            <div className="flex justify-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
            </div>
          )}
        </div>
      </main>
      
      <MessageInput 
        onSendMessage={handleSendMessage}
        disabled={runId !== undefined}
        value={message}
        onChange={setMessage}
      />
    </div>
  );
};

export default App;