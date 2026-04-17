import { Helmet } from 'react-helmet-async';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'react-hot-toast';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('Message sent! We will get back to you soon.', {
      style: { background: '#0A0A0A', color: '#F5F0E8', borderRadius: '0px' },
    });
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  return (
    <div className="bg-bg-light min-h-screen py-24">
      <Helmet>
        <title>Contact Us — AVELLIN</title>
      </Helmet>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-16 text-center">
          <h1 className="text-5xl font-heading text-primary uppercase tracking-[0.3em]">Contact Us</h1>
          <div className="h-1 w-24 bg-secondary mx-auto mt-8" />
        </div>

        <div className="grid lg:grid-cols-2 gap-16">
          {/* Contact Info */}
          <div className="space-y-12">
            <div>
              <h2 className="font-heading text-3xl text-primary mb-6">Get in Touch</h2>
              <p className="text-text-light leading-relaxed mb-10">
                Have a question about our premium collections or need assistance with an order? 
                Our team is here to provide you with the luxury service you deserve.
              </p>
              
              <div className="space-y-6">
                <div className="flex items-start gap-5">
                  <div className="p-4 bg-white border border-accent">
                    <Mail className="w-6 h-6 text-secondary" />
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-widest text-text-light font-bold mb-1">Email Support</p>
                    <a href="mailto:shopwithavellinsupport@gmail.com" className="text-lg font-heading text-primary hover:text-secondary transition-colors">
                      shopwithavellinsupport@gmail.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-5">
                  <div className="p-4 bg-white border border-accent">
                    <Phone className="w-6 h-6 text-secondary" />
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-widest text-text-light font-bold mb-1">WhatsApp & Call</p>
                    <p className="text-lg font-heading text-primary">+234 810 000 0000</p>
                  </div>
                </div>

                <div className="flex items-start gap-5">
                  <div className="p-4 bg-white border border-accent">
                    <MapPin className="w-6 h-6 text-secondary" />
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-widest text-text-light font-bold mb-1">Showroom</p>
                    <p className="text-lg font-heading text-primary">Lekki Phase 1, Lagos, Nigeria</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-8 bg-primary text-white border-l-4 border-secondary">
              <p className="text-sm italic leading-relaxed">
                "For instant help, use our chatbot in the bottom corner of your screen."
              </p>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white border border-accent p-8 md:p-12 shadow-sm">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-widest font-bold text-text-light">Full Name</label>
                  <input 
                    required
                    type="text" 
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="w-full border-b border-accent py-3 focus:outline-none focus:border-secondary transition-colors font-body" 
                    placeholder="Enter your name"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-widest font-bold text-text-light">Email Address</label>
                  <input 
                    required
                    type="email" 
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className="w-full border-b border-accent py-3 focus:outline-none focus:border-secondary transition-colors font-body" 
                    placeholder="Enter your email"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-widest font-bold text-text-light">Subject</label>
                <input 
                  required
                  type="text" 
                  value={formData.subject}
                  onChange={(e) => setFormData({...formData, subject: e.target.value})}
                  className="w-full border-b border-accent py-3 focus:outline-none focus:border-secondary transition-colors font-body" 
                  placeholder="What is this regarding?"
                />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-widest font-bold text-text-light">Message</label>
                <textarea 
                  required
                  rows={5}
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                  className="w-full border-b border-accent py-3 focus:outline-none focus:border-secondary transition-colors font-body resize-none" 
                  placeholder="How can we help you today?"
                />
              </div>

              <button 
                type="submit"
                className="w-full bg-primary text-white py-5 px-10 text-xs uppercase tracking-[0.2em] font-bold hover:bg-secondary transition-all shadow-xl flex items-center justify-center gap-3"
              >
                <Send className="w-4 h-4" /> Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
