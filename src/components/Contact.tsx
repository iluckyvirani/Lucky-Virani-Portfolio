import React, { useState } from 'react';
import { Mail, Phone, MapPin, Github, Linkedin, Send, CheckCircle, Loader2  } from 'lucide-react';
import { useForm, ValidationError } from '@formspree/react';

const Contact = () => {
  const [, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

    const [state, handleSubmit] = useForm("xqarjpqr");

const handleChange = (
  e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
) => {
  const { name, value } = e.target;
  setFormData((prev) => ({ ...prev, [name]: value }));
};

  const contactInfo = [
    {
      icon: Mail,
      label: 'Email',
      value: 'luckyvirani555@gmail.com',
      link: "mailto:luckyvirani555@gmail.com"
    },
    {
      icon: Phone,
      label: 'Phone',
      value: '+91 6396345932',
      link: 'tel:+916396345932'
    },
    {
      icon: MapPin,
      label: 'Location',
      value: 'Noida, India',
      link: 'https://maps.google.com/?q=Noida,India'
    }
  ];

  const socialLinks = [
    {
      icon: Github,
      label: 'GitHub',
      url: 'https://github.com/iluckyvirani',
      color: 'hover:text-ink'
    },
    {
      icon: Linkedin,
      label: 'LinkedIn',
      url: 'https://www.linkedin.com/in/lucky-virani/',
      color: 'hover:text-blue-ink'
    },
    {
      icon: Mail,
      label: 'Email',
      // url: "mailto:luckyvirani555@gmail.com",
      color: 'hover:text-red-600'
    }
  ];

  return (
    <section id="contact" className="py-20 paper-dots">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="font-hand text-6xl font-bold text-ink mb-4">Get In Touch</h2>
          <div className="w-24 h-1 bg-ink mx-auto mb-6"></div>
          <p className="text-lg text-ink/70 max-w-2xl mx-auto">
            Ready to collaborate on your next project? Let's discuss how we can bring your ideas to life.
          </p>
        </div>

        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-bold text-ink mb-6">Contact Information</h3>
              <div className="space-y-4">
                {contactInfo.map((info, index) => (
                  <a
                    key={index}
                    href={info.link}
                    target={info.link.startsWith('http') ? '_blank' : undefined}
                    rel={info.link.startsWith('http') ? 'noopener noreferrer' : undefined}
                    className="flex items-center space-x-4 p-4 bg-[#fffdf7] rounded-xl shadow-md hover:shadow-lg transition-shadow duration-200 group"
                  >
                    <div className="bg-ink p-3 rounded-lg group-hover:scale-110 transition-transform duration-200">
                      <info.icon className="text-white" size={20} />
                    </div>
                    <div>
                      <p className="text-sm text-ink/60 font-medium">{info.label}</p>
                      <p className="text-ink font-semibold">{info.value}</p>
                    </div>
                  </a>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-2xl font-bold text-ink mb-6">Follow Me</h3>
              <div className="flex space-x-4">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.label === 'Email' ? 'mailto:luckyvirani555@gmail.com' : social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`bg-[#fffdf7] p-4 rounded-xl shadow-md hover:shadow-lg transition-all duration-200 text-ink/70 ${social.color} transform hover:scale-110`}
                    title={social.label}
                  >
                    <social.icon size={24} />
                  </a>
                ))}
              </div>
            </div>

            <div className="bg-ink rounded-xl p-8 text-white">
              <h3 className="text-xl font-bold mb-4">Let's Work Together!</h3>
              <p className="mb-4">
                I'm always interested in new opportunities and exciting projects.
                If you're hiring a full stack or AI developer for your team,
                I'd love to hear from you.
              </p>
              <div className="flex items-center space-x-2">
                <CheckCircle size={20} />
                <span>Open to full-time Full Stack & AI roles</span>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-[#fffdf7] sketch-box shadow-[4px_5px_0_#26231f] p-8">
            <h3 className="text-2xl font-bold text-ink mb-6">Send Message</h3>

            {state.succeeded ? (
              <div className="text-center py-12">
                <CheckCircle className="text-green-600 mx-auto mb-4" size={48} />
                <h4 className="text-xl font-semibold text-ink mb-2">Message Sent!</h4>
                <p className="text-ink/70">Thank you for reaching out. I'll get back to you soon.</p>
              </div>
            ) : (
              <form   onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-ink/80 mb-2">
                      Full Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      // value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-[#fffdf7] text-ink placeholder:text-ink/40 border-2 border-ink/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-marker focus:border-transparent transition-colors duration-200"
                      placeholder="Your name"
                    />
                     <ValidationError 
        prefix="name" 
        field="name"
        errors={state.errors}
      />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-ink/80 mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      // value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-[#fffdf7] text-ink placeholder:text-ink/40 border-2 border-ink/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-marker focus:border-transparent transition-colors duration-200"
                      placeholder="your.email@example.com"
                    />
                     <ValidationError 
        prefix="Email" 
        field="email"
        errors={state.errors}
      />
                  </div>
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-ink/80 mb-2">
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    // value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-[#fffdf7] text-ink placeholder:text-ink/40 border-2 border-ink/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-marker focus:border-transparent transition-colors duration-200"
                    placeholder="What's this about?"
                  />
                                  <ValidationError prefix="subject" field="subject" errors={state.errors} />

                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-ink/80 mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    // value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    className="w-full px-4 py-3 bg-[#fffdf7] text-ink placeholder:text-ink/40 border-2 border-ink/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-marker focus:border-transparent transition-colors duration-200 resize-none"
                    placeholder="Tell me about your project..."
                  ></textarea>
                   <ValidationError 
        prefix="Message" 
        field="message"
        errors={state.errors}
      />
                </div>

              <button
  type="submit"
  disabled={state.submitting}
  className={`w-full bg-ink text-white py-3 px-6 rounded-lg
    hover:shadow-lg transition-all duration-200 flex items-center justify-center space-x-2
    transform hover:scale-105 ${
      state.submitting ? 'opacity-75 cursor-not-allowed' : ''
    }`}
>
  {state.submitting ? (
    <>
      <Loader2 className="animate-spin" size={20} />
      <span>Sending...</span>
    </>
  ) : (
    <>
      <Send size={20} />
      <span>Send Message</span>
    </>
  )}
</button>

              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;