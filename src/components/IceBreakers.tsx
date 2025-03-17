'use client';

import { useState } from 'react';

const iceBreakers = [
  "What's the best adventure you've been on recently?",
  "If you could have dinner with any historical figure, who would it be and why?",
  "What's your favorite way to spend a lazy Sunday?",
  "What's the last book/movie that made you laugh out loud?",
  "If you could instantly master any skill, what would it be?",
  "What's your go-to karaoke song?",
  "What's the most interesting place you've traveled to?",
  "What's your favorite childhood memory?",
  "If you could have any superpower, what would it be and why?",
  "What's the best piece of advice you've ever received?",
  "What's your idea of a perfect first date?",
  "What's the most spontaneous thing you've ever done?",
  "What's your favorite local spot that tourists don't know about?",
  "What's a hobby you'd love to get into but haven't yet?",
  "What's the story behind your name?"
];

export default function IceBreakers({ onSelectPrompt }: { onSelectPrompt: (prompt: string) => void }) {
  const [currentPrompt, setCurrentPrompt] = useState('');
  const [usedPrompts, setUsedPrompts] = useState<Set<string>>(new Set());

  const getRandomPrompt = () => {
    const availablePrompts = iceBreakers.filter(prompt => !usedPrompts.has(prompt));
    if (availablePrompts.length === 0) {
      setUsedPrompts(new Set()); // Reset if all prompts have been used
      return iceBreakers[Math.floor(Math.random() * iceBreakers.length)];
    }
    return availablePrompts[Math.floor(Math.random() * availablePrompts.length)];
  };

  const handleNewPrompt = () => {
    const prompt = getRandomPrompt();
    setCurrentPrompt(prompt);
    setUsedPrompts(prev => new Set([...prev, prompt]));
  };

  const handleSelectPrompt = () => {
    if (currentPrompt) {
      onSelectPrompt(currentPrompt);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h3 className="text-xl font-semibold text-gray-800 mb-4">
        Ice Breakers
      </h3>
      <p className="text-gray-600 mb-6">
        Need help starting the conversation? Try one of these prompts!
      </p>
      
      {currentPrompt ? (
        <div className="bg-rose-50 rounded-lg p-4 mb-4">
          <p className="text-gray-800">{currentPrompt}</p>
        </div>
      ) : (
        <div className="bg-gray-50 rounded-lg p-4 mb-4 text-center text-gray-500">
          Click the button below to get a conversation starter
        </div>
      )}

      <div className="flex gap-3">
        <button
          onClick={handleNewPrompt}
          className="flex-1 bg-rose-100 text-rose-600 px-4 py-2 rounded-full hover:bg-rose-200 transition-colors"
        >
          New Prompt
        </button>
        {currentPrompt && (
          <button
            onClick={handleSelectPrompt}
            className="flex-1 bg-rose-500 text-white px-4 py-2 rounded-full hover:bg-rose-600 transition-colors"
          >
            Use This Prompt
          </button>
        )}
      </div>
    </div>
  );
} 