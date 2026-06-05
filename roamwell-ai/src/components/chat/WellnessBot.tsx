'use client';

import { useEffect, useRef, useState } from 'react';
import { useWellnessStore } from '@/lib/store';
import { regions } from '@/lib/data';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { MessageSquare, X } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

export default function WellnessBot() {
  const {
    selectedRegion,
    userProfile,
    isChatOpen,
    setIsChatOpen,
    activeProfileId,
  } = useWellnessStore();

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const activeProfile =
    activeProfileId === 'main'
      ? userProfile
      : userProfile?.familyMembers.find((m) => m.id === activeProfileId);

  const selectedRegionName = selectedRegion
    ? regions.find((r) => r.id === selectedRegion)?.name
    : null;

  // Auto‑scroll to the latest message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMsg: ChatMessage = { role: 'user', content: input };
    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-active-profile': JSON.stringify(activeProfile),
          'x-selected-region': selectedRegion || '',
        },
        body: JSON.stringify({
          messages: [...messages, userMsg],
        }),
      });
      const data = await res.json();
      setMessages((prev) => [
        ...prev,
        { role: 'assistant', content: data.content },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: 'assistant', content: 'Sorry, something went wrong.' },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isChatOpen) {
    return (
      <Button
        onClick={() => setIsChatOpen(true)}
        className="fixed bottom-6 right-6 rounded-full h-14 w-14 shadow-lg bg-primary hover:bg-primary/90 text-primary-foreground z-50 transition-transform hover:scale-110"
        size="icon"
      >
        <MessageSquare className="h-6 w-6" />
      </Button>
    );
  }

  return (
    <Card className="fixed bottom-6 right-6 w-[26rem] h-[34rem] flex flex-col border-accent/30 shadow-2xl z-50 bg-card/90 backdrop-blur-lg">
      {/* Header */}
      <div className="bg-accent/10 p-4 border-b border-border flex items-center justify-between rounded-t-lg backdrop-blur shrink-0">
        <div>
          <h3 className="font-bold text-accent flex items-center gap-2">
            <MessageSquare className="h-4 w-4" /> RoamWell AI
          </h3>
          {selectedRegionName && (
            <p className="text-xs text-muted-foreground mt-1">
              Context: {selectedRegionName}
            </p>
          )}
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsChatOpen(false)}
          className="h-8 w-8"
        >
          <X className="h-4 w-4" />
        </Button>
      </div>

      {/* Messages – scrollable with auto‑scroll */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={cn(
              'flex',
              msg.role === 'user' ? 'justify-end' : 'justify-start'
            )}
          >
            <div
              className={cn(
                'max-w-[85%] px-4 py-3 rounded-2xl text-sm leading-relaxed',
                msg.role === 'user'
                  ? 'bg-primary text-primary-foreground rounded-br-none'
                  : 'bg-muted/80 text-foreground rounded-bl-none border border-border'
              )}
            >
              {msg.content}
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-muted/80 border border-border px-4 py-3 rounded-2xl rounded-bl-none">
              <div className="flex gap-1.5">
                <span
                  className="w-2 h-2 bg-primary rounded-full animate-bounce"
                  style={{ animationDelay: '0ms' }}
                />
                <span
                  className="w-2 h-2 bg-primary rounded-full animate-bounce"
                  style={{ animationDelay: '150ms' }}
                />
                <span
                  className="w-2 h-2 bg-primary rounded-full animate-bounce"
                  style={{ animationDelay: '300ms' }}
                />
              </div>
            </div>
          </div>
        )}
        {/* Invisible element to scroll to */}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="border-t border-border p-3 rounded-b-lg backdrop-blur shrink-0">
        <form onSubmit={handleSend} className="flex gap-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about health risks..."
            className="flex-1 h-10 text-sm"
            disabled={isLoading}
          />
          <Button
            type="submit"
            size="sm"
            disabled={isLoading || !input.trim()}
            className="h-10 w-10 shrink-0"
          >
            Send
          </Button>
        </form>
      </div>
    </Card>
  );
}