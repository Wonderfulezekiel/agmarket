'use client';

import React, { useState, useEffect } from 'react';
import { useAppStore, Message } from '@/lib/store';
import { Send, User, Store, ArrowLeft, MessageSquare } from 'lucide-react';

export default function BuyerMessagesPage() {
  const { currentUser, messages, sendMessage, users } = useAppStore();
  const [mounted, setMounted] = useState(false);
  const [activePartnerId, setActivePartnerId] = useState<string | null>(null);
  const [replyText, setReplyText] = useState('');

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted || !currentUser) return null;

  // Filter messages involving this buyer
  const buyerMessages = messages.filter(
    m => m.senderId === currentUser.id || m.receiverId === currentUser.id
  );

  // Group messages by chat partner (the other person, who is the farmer)
  const chatPartnersMap = new Map<string, { partnerName: string; lastMessage: Message }>();
  
  buyerMessages.forEach(msg => {
    const partnerId = msg.senderId === currentUser.id ? msg.receiverId : msg.senderId;
    
    // Resolve full store name from user records if possible
    const resolvedUser = users.find(u => u.id === partnerId);
    const resolvedName = resolvedUser ? (resolvedUser.storeName || resolvedUser.name) : 'Farmer';

    const existing = chatPartnersMap.get(partnerId);
    if (!existing || new Date(msg.createdAt) > new Date(existing.lastMessage.createdAt)) {
      chatPartnersMap.set(partnerId, {
        partnerName: resolvedName,
        lastMessage: msg
      });
    }
  });

  const chatPartners = Array.from(chatPartnersMap.entries()).map(([id, data]) => ({
    id,
    ...data
  })).sort((a, b) => new Date(b.lastMessage.createdAt).getTime() - new Date(a.lastMessage.createdAt).getTime());

  // Set active partner if not set and chat partners are available
  if (chatPartners.length > 0 && !activePartnerId) {
    setActivePartnerId(chatPartners[0].id);
  }

  // Get active conversation messages
  const activeConversation = activePartnerId
    ? buyerMessages.filter(
        m => (m.senderId === currentUser.id && m.receiverId === activePartnerId) ||
             (m.senderId === activePartnerId && m.receiverId === currentUser.id)
      ).sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime())
    : [];

  const activePartner = chatPartners.find(p => p.id === activePartnerId);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!replyText.trim() || !activePartnerId) return;

    sendMessage(activePartnerId, replyText);
    setReplyText('');
  };

  return (
    <div className="space-y-6 h-[calc(100vh-140px)] flex flex-col">
      
      {/* Header */}
      <div>
        <h1 className="font-serif text-3xl font-bold text-zinc-900">Chat Messages</h1>
        <p className="text-sm text-zinc-500 mt-1">Chat directly with local growers to arrange deliveries or ask about stock availability.</p>
      </div>

      {/* Main chat UI */}
      {chatPartners.length === 0 ? (
        <div className="flex-grow border border-dashed border-zinc-300 rounded-3xl p-12 text-center flex flex-col items-center justify-center space-y-4">
          <MessageSquare className="h-12 w-12 text-zinc-300" />
          <p className="text-zinc-500 text-sm font-medium">You have no active chats right now.</p>
          <p className="text-xs text-zinc-400">Visit the marketplace, select a product, and click &quot;Chat with Farmer&quot; to begin.</p>
        </div>
      ) : (
        <div className="flex-grow grid grid-cols-1 md:grid-cols-3 border border-zinc-200 bg-white rounded-2xl overflow-hidden shadow-xs">
          
          {/* Partners list sidebar */}
          <div className={`md:col-span-1 border-r border-zinc-200 flex flex-col h-full ${activePartnerId ? 'hidden md:flex' : 'flex'}`}>
            <div className="p-4 border-b border-zinc-150 bg-zinc-50">
              <h3 className="text-xs font-bold text-zinc-900 uppercase tracking-wider">Farmer Conversations</h3>
            </div>
            
            <div className="flex-grow overflow-y-auto divide-y divide-zinc-100">
              {chatPartners.map((partner) => (
                <button
                  key={partner.id}
                  onClick={() => setActivePartnerId(partner.id)}
                  className={`w-full text-left p-4 hover:bg-zinc-50/50 flex gap-3 items-start transition-colors ${activePartnerId === partner.id ? 'bg-emerald-50/30 border-r-2 border-emerald-600' : ''}`}
                >
                  <div className="h-9 w-9 rounded-full bg-zinc-100 text-zinc-500 flex items-center justify-center flex-shrink-0">
                    <Store className="h-5 w-5 text-emerald-600" />
                  </div>
                  <div className="min-w-0 flex-grow">
                    <div className="flex justify-between items-baseline">
                      <h4 className="text-xs font-bold text-zinc-900 truncate">{partner.partnerName}</h4>
                      <span className="text-[9px] text-zinc-400">
                        {new Date(partner.lastMessage.createdAt).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                      </span>
                    </div>
                    <p className="text-xs text-zinc-500 truncate mt-1">
                      {partner.lastMessage.text}
                    </p>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Conversation chat box area */}
          <div className={`md:col-span-2 flex flex-col h-full ${!activePartnerId ? 'hidden md:flex' : 'flex'}`}>
            {activePartner ? (
              <>
                {/* Chat partner header banner */}
                <div className="p-4 border-b border-zinc-200 bg-zinc-50 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => setActivePartnerId(null)}
                      className="md:hidden p-1 text-zinc-500 hover:bg-zinc-100 rounded"
                    >
                      <ArrowLeft className="h-5 w-5" />
                    </button>
                    <div className="h-8 w-8 rounded-full bg-zinc-200 text-zinc-500 flex items-center justify-center">
                      <Store className="h-4.5 w-4.5 text-emerald-600" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-zinc-900">{activePartner.partnerName}</h4>
                      <span className="text-[10px] text-zinc-400 font-semibold uppercase">Farmer Store</span>
                    </div>
                  </div>
                </div>

                {/* Message logs list scrollable */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-zinc-50/50">
                  {activeConversation.map((msg) => {
                    const isMe = msg.senderId === currentUser.id;
                    return (
                      <div
                        key={msg.id}
                        className={`flex flex-col max-w-[75%] ${isMe ? 'ml-auto items-end' : 'mr-auto items-start'}`}
                      >
                        {/* Render associated product topic banner if exists */}
                        {msg.productId && msg.productName && (
                          <div className="bg-zinc-100 text-zinc-500 text-[10px] rounded-t-lg px-2.5 py-1 border-x border-t border-zinc-200 font-semibold mb-[-2px]">
                            Topic: {msg.productName}
                          </div>
                        )}
                        <div
                          className={`rounded-2xl px-4 py-2 text-sm shadow-2xs leading-relaxed ${isMe ? 'bg-emerald-600 text-white rounded-tr-none' : 'bg-white text-zinc-800 border border-zinc-200 rounded-tl-none'}`}
                        >
                          <p>{msg.text}</p>
                        </div>
                        <span className="text-[9px] text-zinc-400 mt-1 font-semibold">
                          {new Date(msg.createdAt).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                        </span>
                      </div>
                    );
                  })}
                </div>

                {/* Input action form reply */}
                <form onSubmit={handleSend} className="p-4 border-t border-zinc-200 bg-white flex gap-3">
                  <input
                    type="text"
                    required
                    placeholder={`Reply to ${activePartner.partnerName}...`}
                    value={replyText}
                    onChange={(e) => setReplyText(e.target.value)}
                    className="flex-grow rounded-lg border border-zinc-300 px-4 py-2.5 text-sm outline-none focus:border-emerald-600"
                  />
                  <button
                    type="submit"
                    className="rounded-lg bg-emerald-600 px-4 text-white hover:bg-emerald-700 transition-colors flex items-center justify-center"
                    aria-label="Send Message"
                  >
                    <Send className="h-4.5 w-4.5" />
                  </button>
                </form>
              </>
            ) : (
              <div className="flex-1 flex items-center justify-center text-center p-6 text-zinc-500">
                Select a conversation to display messages.
              </div>
            )}
          </div>

        </div>
      )}

    </div>
  );
}
