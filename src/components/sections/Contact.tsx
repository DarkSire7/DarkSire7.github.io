import { motion, AnimatePresence } from 'framer-motion';
import { Send, AlertCircle, CheckCircle, Loader2 } from 'lucide-react';
import { useState, memo, useCallback } from 'react';
import type { FormEvent } from 'react';
import StarBorder from '../ui/StarBorder';
import GradientText from '../ui/GradientText';

interface FormErrors {
  name?: string;
  email?: string;
  message?: string;
}

const WEB3FORMS_ACCESS_KEY = '6f210354-c080-4c0e-84da-4e88143eece2';

const ContactComponent = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const validateField = (name: string, value: string): string | undefined => {
    switch (name) {
      case 'name':
        if (!value.trim()) return 'Name is required';
        if (value.trim().length < 2) return 'Name must be at least 2 characters';
        return undefined;
      case 'email':
        if (!value.trim()) return 'Email is required';
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return 'Please enter a valid email';
        return undefined;
      case 'message':
        if (!value.trim()) return 'Message is required';
        if (value.trim().length < 10) return 'Message must be at least 10 characters';
        return undefined;
      default:
        return undefined;
    }
  };

  const handleBlur = (name: string) => {
    setTouched(prev => ({ ...prev, [name]: true }));
    const error = validateField(name, formData[name as keyof typeof formData]);
    setErrors(prev => ({ ...prev, [name]: error }));
  };

  const handleSubmit = useCallback(async (e: FormEvent) => {
    e.preventDefault();
    setSubmitError(null);
    
    const newErrors: FormErrors = {
      name: validateField('name', formData.name),
      email: validateField('email', formData.email),
      message: validateField('message', formData.message),
    };
    
    setErrors(newErrors);
    setTouched({ name: true, email: true, message: true });
    
    if (!newErrors.name && !newErrors.email && !newErrors.message) {
      setIsSubmitting(true);
      
      try {
        const response = await fetch('https://api.web3forms.com/submit', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify({
            access_key: WEB3FORMS_ACCESS_KEY,
            name: formData.name,
            email: formData.email,
            message: formData.message,
            subject: `New Contact Form Message from ${formData.name}`,
            from_name: 'Portfolio Contact Form',
          })
        });

        const result = await response.json();
        
        if (result.success) {
          setIsSubmitted(true);
          setFormData({ name: '', email: '', message: '' });
          setTouched({});
          setTimeout(() => setIsSubmitted(false), 5000);
        } else {
          setSubmitError(result.message || 'Something went wrong. Please try again.');
        }
      } catch {
        setSubmitError('Failed to send message. Please check your connection and try again.');
      } finally {
        setIsSubmitting(false);
      }
    }
  }, [formData]);

  const handleNameChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setFormData(prev => ({ ...prev, name: value }));
    if (touched.name) {
      setErrors(prev => ({ ...prev, name: validateField('name', value) }));
    }
  }, [touched.name]);

  const handleEmailChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setFormData(prev => ({ ...prev, email: value }));
    if (touched.email) {
      setErrors(prev => ({ ...prev, email: validateField('email', value) }));
    }
  }, [touched.email]);

  const handleMessageChange = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    setFormData(prev => ({ ...prev, message: value }));
    if (touched.message) {
      setErrors(prev => ({ ...prev, message: validateField('message', value) }));
    }
  }, [touched.message]);

  const inputBaseClass = "w-full px-4 sm:px-5 py-3 sm:py-4 rounded-lg bg-white/5 border text-white placeholder-gray-500 focus:outline-none transition-all duration-300 text-sm sm:text-base";
  const inputNormalClass = "border-white/10 focus:border-electric-blue/50 focus:bg-white/10";
  const inputErrorClass = "border-red-500/50 bg-red-500/5 focus:border-red-500/70";

  return (
    <section id="contact" className="relative py-16 sm:py-24 lg:py-32 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12 sm:mb-16 lg:mb-20"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black mb-4 sm:mb-6 tracking-tight">
            Let's <GradientText>Connect</GradientText>
          </h2>
          <p className="text-gray-400 text-base sm:text-lg max-w-2xl mx-auto px-4">
            Open to exciting ML opportunities and collaborations
          </p>
        </motion.div>

        <div className="space-y-8 sm:space-y-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass-panel p-6 sm:p-8 lg:p-10"
          >
            <AnimatePresence>
              {isSubmitted && (
                <motion.div
                  initial={{ opacity: 0, y: -20, height: 0 }}
                  animate={{ opacity: 1, y: 0, height: 'auto' }}
                  exit={{ opacity: 0, y: -20, height: 0 }}
                  className="mb-6 p-4 rounded-lg bg-green-500/10 border border-green-500/30 flex items-center gap-3"
                >
                  <CheckCircle size={20} className="text-green-400 flex-shrink-0" />
                  <p className="text-green-300 text-sm sm:text-base">Message sent successfully! I'll get back to you soon.</p>
                </motion.div>
              )}
            </AnimatePresence>

            <AnimatePresence>
              {submitError && (
                <motion.div
                  initial={{ opacity: 0, y: -20, height: 0 }}
                  animate={{ opacity: 1, y: 0, height: 'auto' }}
                  exit={{ opacity: 0, y: -20, height: 0 }}
                  className="mb-6 p-4 rounded-lg bg-red-500/10 border border-red-500/30 flex items-center gap-3"
                >
                  <AlertCircle size={20} className="text-red-400 flex-shrink-0" />
                  <p className="text-red-300 text-sm sm:text-base">{submitError}</p>
                </motion.div>
              )}
            </AnimatePresence>

            <form onSubmit={handleSubmit} className="space-y-5 sm:space-y-6" noValidate>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-300 mb-2 sm:mb-3">
                    Name
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={handleNameChange}
                    onBlur={() => handleBlur('name')}
                    disabled={isSubmitting}
                    className={`${inputBaseClass} ${touched.name && errors.name ? inputErrorClass : inputNormalClass} disabled:opacity-50`}
                    placeholder="Your name"
                  />
                  <AnimatePresence>
                    {touched.name && errors.name && (
                      <motion.div
                        initial={{ opacity: 0, y: -10, height: 0 }}
                        animate={{ opacity: 1, y: 0, height: 'auto' }}
                        exit={{ opacity: 0, y: -10, height: 0 }}
                        className="flex items-center gap-2 mt-2 text-red-400"
                      >
                        <AlertCircle size={14} />
                        <span className="text-xs sm:text-sm">{errors.name}</span>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-300 mb-2 sm:mb-3">
                    Email
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={handleEmailChange}
                    onBlur={() => handleBlur('email')}
                    disabled={isSubmitting}
                    className={`${inputBaseClass} ${touched.email && errors.email ? inputErrorClass : inputNormalClass} disabled:opacity-50`}
                    placeholder="your.email@example.com"
                  />
                  <AnimatePresence>
                    {touched.email && errors.email && (
                      <motion.div
                        initial={{ opacity: 0, y: -10, height: 0 }}
                        animate={{ opacity: 1, y: 0, height: 'auto' }}
                        exit={{ opacity: 0, y: -10, height: 0 }}
                        className="flex items-center gap-2 mt-2 text-red-400"
                      >
                        <AlertCircle size={14} />
                        <span className="text-xs sm:text-sm">{errors.email}</span>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-300 mb-2 sm:mb-3">
                  Message
                </label>
                <textarea
                  value={formData.message}
                  onChange={handleMessageChange}
                  onBlur={() => handleBlur('message')}
                  disabled={isSubmitting}
                  rows={5}
                  className={`${inputBaseClass} resize-none ${touched.message && errors.message ? inputErrorClass : inputNormalClass} disabled:opacity-50`}
                  placeholder="Tell me about your project or opportunity..."
                />
                <AnimatePresence>
                  {touched.message && errors.message && (
                    <motion.div
                      initial={{ opacity: 0, y: -10, height: 0 }}
                      animate={{ opacity: 1, y: 0, height: 'auto' }}
                      exit={{ opacity: 0, y: -10, height: 0 }}
                      className="flex items-center gap-2 mt-2 text-red-400"
                    >
                      <AlertCircle size={14} />
                      <span className="text-xs sm:text-sm">{errors.message}</span>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <motion.div
                whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
                className="w-full pt-2"
              >
                <StarBorder
                  as="button"
                  type="submit"
                  color="#8b5cf6"
                  speed="5s"
                  className="w-full cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 size={18} className="sm:w-5 sm:h-5 animate-spin" />
                      <span className="text-sm sm:text-base">Sending...</span>
                    </>
                  ) : (
                    <>
                      <Send size={18} className="sm:w-5 sm:h-5" />
                      <span className="text-sm sm:text-base">Send Message</span>
                    </>
                  )}
                </StarBorder>
              </motion.div>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export const Contact = memo(ContactComponent);
