"use client";

import { motion } from "framer-motion";
import { Mail, MapPin, Phone, Instagram, MessageCircle } from "lucide-react";

export default function ContactPage() {
  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className="bg-[var(--color-paper)] min-h-screen pt-32 pb-20 px-6"
    >
      <div className="max-w-4xl mx-auto">
        <header className="mb-20 text-center">
          <span className="uppercase tracking-[0.4em] text-[10px] font-bold opacity-40 block mb-6">Connect with us</span>
          <h1 className="font-[family-name:var(--font-serif)] text-5xl lg:text-7xl mb-8 italic">Get in Touch</h1>
          <p className="text-lg opacity-60 max-w-xl mx-auto font-medium">
            Whether it&apos;s a custom commission, a collaboration, or just a 
            hello, we&apos;d love to hear from you.
          </p>
        </header>

        <div className="grid md:grid-cols-2 gap-16 lg:gap-24 items-start">
          {/* CONTACT INFO */}
          <div className="space-y-12">
            <section className="space-y-6">
              <h3 className="text-[10px] uppercase tracking-[0.3em] font-bold opacity-30 italic">Direct Lines</h3>
              <div className="space-y-4">
                <a 
                  href="mailto:thequillandinkcompany@gmail.com"
                  className="flex items-center gap-4 group"
                >
                  <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm group-hover:bg-[var(--color-accent)] group-hover:text-white transition-all duration-500">
                    <Mail className="w-4 h-4" />
                  </div>
                  <span className="font-medium opacity-70 group-hover:opacity-100 transition-opacity">thequillandinkcompany@gmail.com</span>
                </a>
                <a 
                  href="tel:+919324580059"
                  className="flex items-center gap-4 group"
                >
                  <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm group-hover:bg-[var(--color-accent)] group-hover:text-white transition-all duration-500">
                    <Phone className="w-4 h-4" />
                  </div>
                  <span className="font-medium opacity-70 group-hover:opacity-100 transition-opacity">+91 9324580059</span>
                </a>
              </div>
            </section>

            <section className="space-y-6">
              <h3 className="text-[10px] uppercase tracking-[0.3em] font-bold opacity-30 italic">Studio Location</h3>
              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm shrink-0">
                  <MapPin className="w-4 h-4" />
                </div>
                <p className="font-medium opacity-70 leading-relaxed">
                  Shop no 3, Yogi Smriti, D -15,<br />
                  Yogi Nagar Marg, Yogi Nagar,<br />
                  Borivali West, Mumbai,<br />
                  Maharashtra 400091
                </p>
              </div>
            </section>

            <section className="space-y-6">
              <h3 className="text-[10px] uppercase tracking-[0.3em] font-bold opacity-30 italic">Social Presence</h3>
              <div className="flex gap-6">
                <a 
                  href="https://www.instagram.com/quillandinkco._?igsh=MTlpbnFzczY2MDZu" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="opacity-50 hover:opacity-100 hover:text-[var(--color-accent)] transition-all"
                >
                  <Instagram className="w-5 h-5" />
                </a>
              </div>
            </section>
          </div>

          {/* QUICK FORM / CTA */}
          <div className="bg-white p-10 lg:p-12 rounded-sm shadow-2xl space-y-8 border-t-8 border-[var(--color-accent)]">
            <h2 className="font-[family-name:var(--font-serif)] text-3xl italic">Start a Conversation</h2>
            <p className="text-sm opacity-60 leading-relaxed font-medium">
              We aim to respond to all inquiries within 24–48 hours. For urgent 
              personalised requirements, please reach out via WhatsApp.
            </p>
            <a
              href="https://wa.me/919324580059"
              target="_blank"
              rel="noopener noreferrer"
              className="
                flex items-center justify-center gap-4
                bg-[var(--color-ink)] text-white
                px-8 py-5 rounded-sm
                text-[10px] uppercase tracking-[0.2em] font-bold
                hover:bg-[var(--color-accent)] transition-all duration-500
                w-full
              "
            >
              <MessageCircle className="w-5 h-5" />
              Inquiry on WhatsApp
            </a>
          </div>
        </div>
      </div>
    </motion.main>
  );
}
