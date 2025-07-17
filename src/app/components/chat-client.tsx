// app/components/chat-client.tsx

'use client';

import { useChat } from '@ai-sdk/react';

export default function ChatClient() {
  const { messages, input, handleInputChange, handleSubmit, isLoading, error } =
    useChat();

  return (
    <div className='flex flex-col w-full max-w-2xl min-h-screen mx-auto py-8'>
      {/* Header remains the same */}

      {/* Message List */}
      <div className='flex-grow p-6 overflow-y-auto bg-white'>
        <div className='flex flex-col space-y-4'>
          {messages.map((m) => (
            <div
              key={m.id}
              className={`whitespace-pre-wrap p-3 rounded-lg ${
                m.role === 'user'
                  ? 'bg-blue-500 text-white self-end'
                  : 'bg-gray-200 text-gray-800 self-start'
              }`}
            >
              <span className='font-bold'>
                {m.role === 'user' ? 'You: ' : 'AI: '}
              </span>
              {m.content}
            </div>
          ))}

          {isLoading && (
            <div className='bg-gray-100 p-3 rounded-lg self-start'>
              <span className='font-bold'>AI: </span>
              <span className='animate-pulse'>Sedang mengetik...</span>
            </div>
          )}

          {error && (
            <div className='bg-red-100 text-red-700 p-3 rounded-lg'>
              Error: {error.message || 'Terjadi kesalahan saat menghubungi AI'}
            </div>
          )}
        </div>
      </div>

      {/* Input form remains the same */}
      <form
        onSubmit={handleSubmit}
        className='p-4 border-t bg-gray-50 rounded-b-lg'
      >
        <div className='flex items-center'>
          <input
            className='flex-grow w-full px-4 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500'
            value={input}
            placeholder='Ketik pesan Anda...'
            onChange={handleInputChange}
            disabled={isLoading}
          />
          <button
            type='submit'
            className='ml-4 px-6 py-2 bg-blue-600 text-white rounded-full font-semibold hover:bg-blue-700 disabled:bg-blue-300'
            disabled={isLoading || !input.trim()}
          >
            {isLoading ? 'Mengirim...' : 'Kirim'}
          </button>
        </div>
      </form>
    </div>
  );
}
