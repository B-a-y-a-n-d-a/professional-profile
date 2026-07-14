import React, { useEffect, useState } from 'react';

interface TypewriterTextProps {
  words: string[];
  typingSpeedMs?: number;
  deletingSpeedMs?: number;
  pauseMs?: number;
  className?: string;
}

export default function TypewriterText({
  words,
  typingSpeedMs = 80,
  deletingSpeedMs = 40,
  pauseMs = 1500,
  className = ''
}: TypewriterTextProps) {
  const [wordIndex, setWordIndex] = useState(0);
  const [text, setText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentWord = words[wordIndex % words.length];

    if (!isDeleting && text === currentWord) {
      const pauseTimeout = setTimeout(() => setIsDeleting(true), pauseMs);
      return () => clearTimeout(pauseTimeout);
    }

    if (isDeleting && text === '') {
      setIsDeleting(false);
      setWordIndex((prev) => (prev + 1) % words.length);
      return;
    }

    const timeout = setTimeout(() => {
      setText((prev) =>
        isDeleting ? currentWord.slice(0, prev.length - 1) : currentWord.slice(0, prev.length + 1)
      );
    }, isDeleting ? deletingSpeedMs : typingSpeedMs);

    return () => clearTimeout(timeout);
  }, [text, isDeleting, wordIndex, words, typingSpeedMs, deletingSpeedMs, pauseMs]);

  return (
    <span className={className}>
      {text}
      <span className="inline-block w-[1ch] animate-pulse">|</span>
    </span>
  );
}
