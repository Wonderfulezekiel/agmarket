'use client';

import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle2 } from 'lucide-react';

export default function ContactPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) return;
    setSent(true);
    setName('');
    setEmail('');
    setSubject('');
    setMessage('');
    setTimeout(() => {
      setSent(false);
    }, 4000);
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 space-y-16">
      
      {/* Header */}
      <div className="max-w-3xl space-y-4">
        <span className="text-xs font-bold text-emerald-600 uppercase tracking-wider block">Get in Touch</span>
        <h1 className="font-serif text-4xl sm:text-5xl font-bold text-zinc-900 leading-tight">
          We&apos;re Here to Help You Thrive.
        </h1>
        <p className="text-lg text-zinc-600 leading-relaxed">
          Have questions about verification badges, store onboarding, custom delivery rules, or experiencing a transaction dispute? Contact our operations team.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 pt-4">
        
        {/* Support channels list */}
        <div className="lg:col-span-1 space-y-8">
          
          <div className="border border-zinc-200 rounded-2xl p-6 bg-zinc-50 space-y-4">
            <h3 className="font-serif text-lg font-bold text-zinc-900">Direct Contacts</h3>
            
            <div className="space-y-4 text-sm text-zinc-600">
              <div className="flex gap-3">
                <MapPin className="h-5 w-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-zinc-800">Headquarters</h4>
                  <p className="text-xs text-zinc-500 mt-1">12 Agriculture Way, Victoria Island, Lagos</p>
                </div>
              </div>
              <div className="flex gap-3">
                <Phone className="h-5 w-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-zinc-800">Operations Phone</h4>
                  <p className="text-xs text-zinc-500 mt-1">+234 800-AGMARKET (24/7)</p>
                </div>
              </div>
              <div className="flex gap-3">
                <Mail className="h-5 w-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-zinc-800">Support Email</h4>
                  <p className="text-xs text-zinc-500 mt-1">support@agmarket.com</p>
                </div>
              </div>
            </div>
          </div>

          <div className="border border-zinc-200 rounded-2xl p-6 bg-zinc-50 space-y-2 text-xs text-zinc-500 leading-relaxed">
            <h4 className="font-bold text-zinc-800 mb-1">Response Guarantee</h4>
            <p>Our average support ticket response time is <strong>under 3 hours</strong> for verified farmers and <strong>under 12 hours</strong> for general marketplace customers.</p>
          </div>

        </div>

        {/* Contact Form */}
        <div className="lg:col-span-2 border border-zinc-200 rounded-3xl p-6 sm:p-8 bg-white shadow-sm space-y-6">
          <h3 className="font-serif text-2xl font-bold text-zinc-900">Submit a Support Ticket</h3>
          
          {sent ? (
            <div className="py-12 bg-emerald-50 border border-emerald-100 rounded-2xl flex flex-col items-center justify-center text-center p-6 space-y-3">
              <CheckCircle2 className="h-10 w-10 text-emerald-600" />
              <h4 className="font-bold text-zinc-900">Support Ticket Submitted</h4>
              <p className="text-xs text-zinc-500 max-w-sm">We have received your message. One of our support representatives will contact you via email shortly.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-zinc-700 uppercase tracking-wider block">Full Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Kolawole Davies"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full rounded-lg border border-zinc-300 p-2.5 text-sm outline-none focus:border-emerald-600"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-zinc-700 uppercase tracking-wider block">Email Address</label>
                  <input
                    type="email"
                    required
                    placeholder="e.g. kola@davies.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full rounded-lg border border-zinc-300 p-2.5 text-sm outline-none focus:border-emerald-600"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-zinc-700 uppercase tracking-wider block">Subject</label>
                <input
                  type="text"
                  placeholder="e.g. Question about setting custom delivery zones"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="w-full rounded-lg border border-zinc-300 p-2.5 text-sm outline-none focus:border-emerald-600"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-zinc-700 uppercase tracking-wider block">Message Details</label>
                <textarea
                  required
                  rows={5}
                  placeholder="Type details of your inquiry or report here..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full rounded-lg border border-zinc-300 p-2.5 text-sm outline-none focus:border-emerald-600"
                />
              </div>

              <button
                type="submit"
                className="inline-flex items-center gap-1.5 rounded-lg bg-emerald-600 px-6 py-3 text-xs font-semibold text-white shadow-sm hover:bg-emerald-700 transition-colors"
              >
                <Send className="h-4 w-4" />
                Submit Support Ticket
              </button>
            </form>
          )}
        </div>

      </div>

    </div>
  );
}
