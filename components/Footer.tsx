import React, { useState } from 'react';
import LogoIcon from './icons/LogoIcon';
import { InstagramIcon, LinkedInIcon, LocationMarkerIcon, MailIcon, PhoneIcon, CheckCircleIcon, XCircleIcon } from './icons/FeatureIcons';


interface FormErrors {
    fullName?: string;
    email?: string;
    phone?: string;
    service?: string;
    budget?: string;
    details?: string;
}

const Footer: React.FC = () => {
    const initialFormState = {
        fullName: '',
        email: '',
        phone: '',
        company: '',
        service: '',
        budget: '',
        details: ''
    };
    
    const [formData, setFormData] = useState(initialFormState);
    const [errors, setErrors] = useState<FormErrors>({});
    const [showSuccess, setShowSuccess] = useState(false);
    const [showErrorSummary, setShowErrorSummary] = useState(false);
    
    const [newsletterEmail, setNewsletterEmail] = useState('');
    const [newsletterError, setNewsletterError] = useState('');
    const [newsletterSuccess, setNewsletterSuccess] = useState(false);

    const validateContactForm = () => {
        const newErrors: FormErrors = {};
        if (!formData.fullName) newErrors.fullName = 'Full Name is required.';
        if (!formData.email) {
            newErrors.email = 'Email Address is required.';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Email Address is invalid.';
        }
        if (!formData.phone) newErrors.phone = 'Phone Number is required.';
        if (!formData.service) newErrors.service = 'Please select a service.';
        if (!formData.budget) newErrors.budget = 'Please select a budget range.';
        if (!formData.details) newErrors.details = 'Project Details are required.';
        return newErrors;
    };

    const handleContactSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formErrors = validateContactForm();
        if (Object.keys(formErrors).length > 0) {
            setErrors(formErrors);
            setShowSuccess(false);
            setShowErrorSummary(true);
        } else {
            setErrors({});
            setShowErrorSummary(false);
            
            const subject = encodeURIComponent(`Project Inquiry from ${formData.fullName}`);
            const body = encodeURIComponent(
`New project inquiry from the Botifyx website:

Full Name: ${formData.fullName}
Email: ${formData.email}
Phone: ${formData.phone}
Company: ${formData.company || 'N/A'}
Service of Interest: ${formData.service}
Budget Range: ${formData.budget}

Project Details:
${formData.details}

---
This email was generated from the contact form on the Botifyx website.`
            );
            
            const mailtoLink = `mailto:info@botifyx.in?cc=${formData.email}&subject=${subject}&body=${body}`;
            window.location.href = mailtoLink;

            setShowSuccess(true);
            setFormData(initialFormState);
            setTimeout(() => setShowSuccess(false), 5000);
        }
    };
    
    const handleNewsletterSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!newsletterEmail || !/\S+@\S+\.\S+/.test(newsletterEmail)) {
            setNewsletterError('Please enter a valid email address.');
            setNewsletterSuccess(false);
        } else {
            setNewsletterError('');
            setNewsletterSuccess(true);
            setNewsletterEmail('');
            setTimeout(() => setNewsletterSuccess(false), 5000);
        }
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prevState => ({ ...prevState, [name]: value }));
        if (showErrorSummary) {
            setShowErrorSummary(false);
        }
    };

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    const element = document.getElementById(targetId.substring(1));
    if (element) {
        const headerOffset = 80; // Height of the fixed header
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
        });
    }
  };

  const servicesList = [
    'Full-Stack Web Development', 'Mobile App Development', 'Functional Testing',
    'Performance Testing', 'Security Testing', 'AI/ML Solutions',
    'Chatbot Development', 'Website Design'
  ];
  
  const socialLinks = [
    { name: 'Instagram', href: 'https://www.instagram.com/botifyx.in/', icon: InstagramIcon },
    { name: 'LinkedIn', href: 'https://www.linkedin.com/company/botifyx', icon: LinkedInIcon },
  ];

  return (
    <footer id="contact" className="bg-gray-100 dark:bg-brand-dark-2 border-t border-gray-200 dark:border-brand-primary/20 pt-20 pb-12">
      <div className="container mx-auto px-6">
        {/* Contact Form Section */}
        <div className="bg-white dark:bg-brand-dark p-8 md:p-12 rounded-2xl border border-gray-200 dark:border-brand-primary/20 max-w-4xl mx-auto shadow-md">
            <div className="text-center">
                <h3 className="text-3xl font-bold text-gray-900 dark:text-white">Ready to Get Started?</h3>
                <p className="mt-3 text-gray-600 dark:text-gray-400">Tell us about your project and we'll get back to you within 24 hours.</p>
            </div>
            {showSuccess && (
                <div className="mt-6 flex items-center bg-green-500/20 border border-green-500 text-green-300 px-4 py-3 rounded-lg">
                    <CheckCircleIcon className="w-6 h-6 mr-3 flex-shrink-0" />
                    <span>Thank you for your inquiry! Your email client is opening with a pre-filled message for you to send.</span>
                </div>
            )}
            {showErrorSummary && (
                <div className="mt-6 flex items-center bg-red-500/20 border border-red-500 text-red-300 px-4 py-3 rounded-lg">
                    <XCircleIcon className="w-6 h-6 mr-3 flex-shrink-0" />
                    <span>There were some errors with your submission. Please review the fields below.</span>
                </div>
            )}
            <form onSubmit={handleContactSubmit} noValidate className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
                <div>
                    <input type="text" name="fullName" value={formData.fullName} onChange={handleChange} placeholder="Full Name *" className={`w-full bg-gray-100 dark:bg-brand-dark-2 text-gray-800 dark:text-gray-200 border ${errors.fullName ? 'border-red-500' : 'border-transparent dark:border-brand-dark-2'} focus:border-brand-primary p-3 rounded-lg outline-none transition-colors`} />
                    {errors.fullName && <p className="text-red-400 text-sm mt-1">{errors.fullName}</p>}
                </div>
                <div>
                    <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email Address *" className={`w-full bg-gray-100 dark:bg-brand-dark-2 text-gray-800 dark:text-gray-200 border ${errors.email ? 'border-red-500' : 'border-transparent dark:border-brand-dark-2'} focus:border-brand-primary p-3 rounded-lg outline-none transition-colors`} />
                    {errors.email && <p className="text-red-400 text-sm mt-1">{errors.email}</p>}
                </div>
                <div>
                    <input type="tel" name="phone" value={formData.phone} onChange={handleChange} placeholder="Phone Number *" className={`w-full bg-gray-100 dark:bg-brand-dark-2 text-gray-800 dark:text-gray-200 border ${errors.phone ? 'border-red-500' : 'border-transparent dark:border-brand-dark-2'} focus:border-brand-primary p-3 rounded-lg outline-none transition-colors`} />
                    {errors.phone && <p className="text-red-400 text-sm mt-1">{errors.phone}</p>}
                </div>
                <div>
                    <input type="text" name="company" value={formData.company} onChange={handleChange} placeholder="Company Name" className="w-full bg-gray-100 dark:bg-brand-dark-2 text-gray-800 dark:text-gray-200 border border-transparent dark:border-brand-dark-2 focus:border-brand-primary p-3 rounded-lg outline-none transition-colors" />
                </div>
                <div>
                    <select name="service" value={formData.service} onChange={handleChange} className={`w-full bg-gray-100 dark:bg-brand-dark-2 text-gray-800 dark:text-gray-200 border ${errors.service ? 'border-red-500' : 'border-transparent dark:border-brand-dark-2'} focus:border-brand-primary p-3 rounded-lg outline-none transition-colors`}>
                        <option value="">Select a service *</option>
                        {servicesList.map(s => <option key={s} value={s}>{s}</option>)}
                    </select>
                    {errors.service && <p className="text-red-400 text-sm mt-1">{errors.service}</p>}
                </div>
                <div>
                    <select name="budget" value={formData.budget} onChange={handleChange} className={`w-full bg-gray-100 dark:bg-brand-dark-2 text-gray-800 dark:text-gray-200 border ${errors.budget ? 'border-red-500' : 'border-transparent dark:border-brand-dark-2'} focus:border-brand-primary p-3 rounded-lg outline-none transition-colors`}>
                        <option value="">Select a budget range *</option>
                        <option value="< $5,000">&lt; $5,000</option>
                        <option value="$5,000 - $10,000">$5,000 - $10,000</option>
                        <option value="$10,000 - $25,000">$10,000 - $25,000</option>
                        <option value="$25,000+">$25,000+</option>
                    </select>
                    {errors.budget && <p className="text-red-400 text-sm mt-1">{errors.budget}</p>}
                </div>
                <div className="md:col-span-2">
                    <textarea name="details" value={formData.details} onChange={handleChange} placeholder="Project Details *" rows={4} className={`w-full bg-gray-100 dark:bg-brand-dark-2 text-gray-800 dark:text-gray-200 border ${errors.details ? 'border-red-500' : 'border-transparent dark:border-brand-dark-2'} focus:border-brand-primary p-3 rounded-lg outline-none transition-colors`}></textarea>
                    {errors.details && <p className="text-red-400 text-sm mt-1">{errors.details}</p>}
                </div>
                <div className="md:col-span-2 text-center">
                    <button type="submit" className="w-full sm:w-auto bg-gradient-to-r from-brand-primary to-brand-secondary text-white font-semibold py-3 px-10 rounded-lg text-lg hover:opacity-90 transition-opacity duration-300">
                        Send Inquiry
                    </button>
                </div>
            </form>
        </div>
        
        {/* Footer Links and Info */}
        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-12 text-center md:text-left">
            {/* Column 1: Logo & Socials */}
            <div className="flex flex-col items-center md:items-start">
                <LogoIcon className="h-12 w-auto mb-4" showTagline={true} />
                <p className="text-gray-600 dark:text-gray-400 text-sm max-w-xs mx-auto md:mx-0">Aify. Autofy. Amplify. Your vision, engineered with precision and intelligence.</p>
                <div className="flex space-x-4 mt-6">
                    {socialLinks.map(link => (
                        <a key={link.name} href={link.href} target="_blank" rel="noopener noreferrer" className="text-gray-500 dark:text-gray-400 hover:text-brand-primary dark:hover:text-brand-accent transition-colors">
                            <link.icon className="w-6 h-6" />
                        </a>
                    ))}
                </div>
            </div>

            {/* Column 2: Quick Links */}
            <div>
                <h4 className="font-semibold text-gray-900 dark:text-white mb-4">Quick Links</h4>
                <ul className="space-y-3">
                    <li><a href="#home" onClick={(e) => handleNavClick(e, '#home')} className="text-gray-600 dark:text-gray-400 hover:text-brand-primary dark:hover:text-brand-accent transition-colors">Home</a></li>
                    <li><a href="#services" onClick={(e) => handleNavClick(e, '#services')} className="text-gray-600 dark:text-gray-400 hover:text-brand-primary dark:hover:text-brand-accent transition-colors">Services</a></li>
                    <li><a href="#why-us" onClick={(e) => handleNavClick(e, '#why-us')} className="text-gray-600 dark:text-gray-400 hover:text-brand-primary dark:hover:text-brand-accent transition-colors">Why Us</a></li>
                    <li><a href="#blog" onClick={(e) => handleNavClick(e, '#blog')} className="text-gray-600 dark:text-gray-400 hover:text-brand-primary dark:hover:text-brand-accent transition-colors">Blog</a></li>
                </ul>
            </div>

            {/* Column 3: Contact Info */}
            <div>
                <h4 className="font-semibold text-gray-900 dark:text-white mb-4">Contact Info</h4>
                <div className="space-y-4 text-gray-600 dark:text-gray-400">
                    <div className="flex items-start space-x-3">
                        <LocationMarkerIcon className="w-5 h-5 mt-1 text-brand-secondary flex-shrink-0" />
                        <span>Upkar Springs Fields, Attibele Hobli, Bengaluru, Karnataka 562107, IN</span>
                    </div>
                    <div className="flex items-start space-x-3">
                        <MailIcon className="w-5 h-5 mt-1 text-brand-secondary flex-shrink-0" />
                        <a href="mailto:info@botifyx.in" className="hover:text-brand-primary dark:hover:text-brand-accent transition-colors">info@botifyx.in</a>
                    </div>
                    <div className="flex items-start space-x-3">
                        <PhoneIcon className="w-5 h-5 mt-1 text-brand-secondary flex-shrink-0" />
                        <a href="tel:+919566443876" className="hover:text-brand-primary dark:hover:text-brand-accent transition-colors">+91 95664 43876</a>
                    </div>
                </div>
                <div className="mt-6">
                    <h5 className="font-semibold text-gray-900 dark:text-white text-base mb-3">Stay Updated</h5>
                    <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">Subscribe to our newsletter for the latest insights.</p>
                    <form onSubmit={handleNewsletterSubmit} noValidate>
                        <div className="flex justify-center md:justify-start">
                            <input 
                                type="email" 
                                value={newsletterEmail}
                                onChange={(e) => setNewsletterEmail(e.target.value)}
                                placeholder="Your email" 
                                className="w-full max-w-[200px] bg-gray-200 dark:bg-brand-dark text-gray-800 dark:text-gray-200 p-2 rounded-l-lg outline-none focus:ring-2 focus:ring-brand-primary"
                            />
                            <button type="submit" className="bg-brand-primary text-white font-semibold px-4 rounded-r-lg hover:bg-brand-secondary transition-colors">&rarr;</button>
                        </div>
                        {newsletterError && <p className="text-red-400 text-sm mt-1">{newsletterError}</p>}
                        {newsletterSuccess && <p className="text-green-400 text-sm mt-1">Thank you for subscribing!</p>}
                    </form>
                </div>
            </div>
        </div>

        {/* Copyright */}
        <div className="mt-20 pt-8 border-t border-gray-200 dark:border-brand-primary/20 text-center text-sm text-gray-500 dark:text-gray-400">
            <p>&copy; {new Date().getFullYear()} Botifyx. All rights reserved. Designed and developed with ❤️.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;