'use client';

import { useState, FormEvent } from 'react';
import emailjs from '@emailjs/browser';
import portfolioData from '@/portfolio-data.json5';
import CopyEmailButton from './CopyEmailButton';

export default function Contact() {
  const { contact } = portfolioData;
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('sending');
    setErrorMessage('');

    try {
      // Send email directly via EmailJS from browser
      const result = await emailjs.send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
        {
          user_name: formData.name,
          user_email: formData.email,
          subject: formData.subject,
          message: formData.message,
        },
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!
      );

      if (result.text === 'OK') {
        setStatus('success');
        setFormData({
          name: '',
          email: '',
          subject: '',
          message: ''
        });
      } else {
        throw new Error('Failed to send message');
      }
    } catch (error) {
      setStatus('error');
      setErrorMessage(
        error instanceof Error 
          ? error.message 
          : 'Failed to send message. Please try again or email me directly.'
      );
      console.error('Email submission error:', error);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <section id="contact" className="section bg-bg-primary">
      <div className="container">
        <h2 className="section-title">{contact.title}</h2>
        
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Left Side - Contact Info */}
            <div className="bento-card">
              <h3 className="text-xl font-bold text-text-primary mb-4">
                Let's Connect
              </h3>
              <p className="text-sm text-text-secondary mb-6 leading-relaxed">
                {contact.subtitle}
              </p>

              {/* Contact Details */}
              <div className="space-y-4">
                {/* Email */}
                <CopyEmailButton email={contact.email}>
                  <a 
                    href={`mailto:${contact.email}`}
                    className="flex items-center gap-3 p-3 bg-bg-tertiary rounded-2xl hover:bg-bg-primary transition-colors border border-border-color group"
                  >
                    <div className="w-10 h-10 rounded-xl bg-accent-primary/10 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-accent-primary">
                        <rect x="2" y="4" width="20" height="16" rx="2"/>
                        <path d="M22 7l-10 7L2 7"/>
                      </svg>
                    </div>
                    <div className="flex-1">
                      <p className="text-xs text-text-tertiary">Email</p>
                      <p className="text-sm font-medium text-text-primary">{contact.email}</p>
                    </div>
                  </a>
                </CopyEmailButton>

                {/* Phone */}
                <a 
                  href={`tel:${contact.phone}`}
                  className="flex items-center gap-3 p-3 bg-bg-tertiary rounded-2xl hover:bg-bg-primary transition-colors border border-border-color group"
                >
                  <div className="w-10 h-10 rounded-xl bg-accent-primary/10 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-accent-primary">
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-xs text-text-tertiary">Phone</p>
                    <p className="text-sm font-medium text-text-primary">{contact.phone}</p>
                  </div>
                </a>

                {/* WhatsApp */}
                {contact.whatsapp && (
                  <CopyEmailButton copyText={contact.whatsapp}>
                    <a 
                      href={contact.whatsapp}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 p-3 bg-bg-tertiary rounded-2xl hover:bg-bg-primary transition-colors border border-border-color group"
                    >
                      <div className="w-10 h-10 rounded-xl bg-green-500/10 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className="text-green-500">
                          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                        </svg>
                      </div>
                      <div>
                        <p className="text-xs text-text-tertiary">WhatsApp</p>
                        <p className="text-sm font-medium text-text-primary">Message me</p>
                      </div>
                    </a>
                  </CopyEmailButton>
                )}

                {/* Location */}
                <div className="flex items-center gap-3 p-3 bg-bg-tertiary rounded-2xl border border-border-color">
                  <div className="w-10 h-10 rounded-xl bg-accent-primary/10 flex items-center justify-center flex-shrink-0">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-accent-primary">
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                      <circle cx="12" cy="10" r="3" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-xs text-text-tertiary">Location</p>
                    <p className="text-sm font-medium text-text-primary">{contact.location}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Side - Contact Form */}
            <div className="bento-card">
              <h3 className="text-base font-semibold text-text-primary mb-4">
                Send a Message
              </h3>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Name */}
                <input
                  type="text"
                  name="name"
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2.5 text-sm bg-bg-tertiary border border-border-color rounded-xl text-text-primary placeholder-text-tertiary focus:outline-none focus:border-accent-primary transition-all"
                />

                {/* Email */}
                <input
                  type="email"
                  name="email"
                  placeholder="Email Address"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2.5 text-sm bg-bg-tertiary border border-border-color rounded-xl text-text-primary placeholder-text-tertiary focus:outline-none focus:border-accent-primary transition-all"
                />

                {/* Subject */}
                <input
                  type="text"
                  name="subject"
                  placeholder="Subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2.5 text-sm bg-bg-tertiary border border-border-color rounded-xl text-text-primary placeholder-text-tertiary focus:outline-none focus:border-accent-primary transition-all"
                />

                {/* Message */}
                <textarea
                  name="message"
                  placeholder="Your Message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  className="w-full px-4 py-2.5 text-sm bg-bg-tertiary border border-border-color rounded-xl text-text-primary placeholder-text-tertiary focus:outline-none focus:border-accent-primary transition-all resize-none"
                />

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={status === 'sending'}
                  className="w-full px-6 py-3 bg-accent-primary text-white font-medium text-sm rounded-full hover:bg-accent-secondary transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {status === 'sending' ? 'Sending...' : 'Send Message'}
                </button>

                {/* Status Messages */}
                {status === 'success' && (
                  <div className="p-3 bg-green-500/10 border border-green-500 rounded-xl text-green-600 dark:text-green-400 text-center text-sm font-medium">
                    ✓ Message sent! I'll reply soon.
                  </div>
                )}
                {status === 'error' && (
                  <div className="p-3 bg-red-500/10 border border-red-500 rounded-xl text-red-600 dark:text-red-400 text-center text-sm">
                    ✗ {errorMessage}
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
