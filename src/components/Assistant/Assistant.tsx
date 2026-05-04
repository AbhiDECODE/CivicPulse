'use client';

import React, { useState, useRef, useEffect } from 'react';
import styles from './Assistant.module.css';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, Send, X, Bot, User, Loader2 } from 'lucide-react';
import { createClient } from '@insforge/sdk';

interface Message {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

const SYSTEM_PROMPT = `
You are the CivicPulse AI, an expert assistant specializing in the election process. 
Your goal is to help users understand election timelines, voting rules, eligibility, and procedures in an interactive and easy-to-follow way.

Guidelines:
1. Be impartial, professional, and encouraging.
2. Provide accurate information based on standard democratic election processes (primarily focused on India but adaptable).
3. If asked about specific dates, refer to official election commission websites for the most current data.
4. Explain complex terms (like "Model Code of Conduct", "EVM", "Affidavit") in simple language.
5. Encourage civic participation and voting.
6. If you don't know something for sure, advise the user to check with their local Election Commission office.

Keep your responses concise and well-structured using bullet points where appropriate.
`;

const Assistant: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: 'Hello! I am your CivicPulse assistant. Ask me anything about the election process, voting rules, or timelines.' }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Initialize InsForge client
  const insforge = createClient({
    baseUrl: process.env.NEXT_PUBLIC_INSFORGE_BASE_URL || '',
    anonKey: process.env.NEXT_PUBLIC_INSFORGE_API_KEY || '',
  });

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = { role: 'user', content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const completion = await insforge.ai.chat.completions.create({
        model: 'google/gemini-3-pro-image-preview',
        messages: [
          { role: 'system', content: SYSTEM_PROMPT },
          ...messages.map(m => ({ role: m.role, content: m.content })),
          { role: 'user', content: input }
        ],
        temperature: 0.7,
        maxTokens: 500,
      });

      const aiContent = completion.choices[0].message.content;
      
      if (aiContent) {
        setMessages(prev => [...prev, { role: 'assistant', content: aiContent }]);
      } else {
        throw new Error('No response content');
      }
    } catch (error) {
      console.error('AI Error:', error);
      setMessages(prev => [...prev, { role: 'assistant', content: 'I apologize, but I am having trouble connecting right now. Please try again later.' }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <motion.button 
        className={styles.toggleBtn}
        onClick={() => setIsOpen(true)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <MessageSquare size={24} />
        <span>Ask AI Assistant</span>
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div 
            className={styles.chatWindow}
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
          >
            <div className={styles.header}>
              <div className={styles.headerInfo}>
                <div className={styles.botIcon}>
                  <Bot size={20} />
                </div>
                <div>
                  <h3 className={styles.headerTitle}>CivicPulse AI</h3>
                  <span className={styles.status}>Online | Election Expert</span>
                </div>
              </div>
              <button className={styles.closeBtn} onClick={() => setIsOpen(false)}>
                <X size={20} />
              </button>
            </div>

            <div className={styles.messagesList}>
              {messages.map((msg, index) => (
                <div key={index} className={`${styles.messageWrapper} ${styles[msg.role]}`}>
                  <div className={styles.avatar}>
                    {msg.role === 'assistant' ? <Bot size={16} /> : <User size={16} />}
                  </div>
                  <div className={styles.messageContent}>
                    {msg.content}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className={`${styles.messageWrapper} ${styles.assistant}`}>
                  <div className={styles.avatar}>
                    <Bot size={16} />
                  </div>
                  <div className={styles.messageContent}>
                    <Loader2 className={styles.spinner} size={16} />
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            <div className={styles.footer}>
              <input 
                type="text" 
                placeholder="Ask about voting rules..." 
                className={styles.input}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              />
              <button 
                className={styles.sendBtn}
                onClick={handleSend}
                disabled={!input.trim() || isLoading}
              >
                <Send size={20} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Assistant;
