'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Mail, Phone, MapPin, Facebook, Twitter, Linkedin, Instagram, ArrowRight } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    services: [
      { name: 'Web Development', href: '/services#web-development' },
      { name: 'Mobile Apps', href: '/services#mobile-apps' },
      { name: 'Testing Services', href: '/services#testing' },
      { name: 'AI/ML Solutions', href: '/solutions#ai-ml' },
      { name: 'Chatbot Development', href: '/solutions#chatbots' },
    ],
    company: [
      { name: 'About Us', href: '/about' },
      { name: 'Our Work', href: '/work' },
      { name: 'Blog', href: '/blog' },
      { name: 'Contact', href: '/contact' },
    ],
    support: [
      { name: 'Help Center', href: '/support' },
      { name: 'Documentation', href: '/docs' },
      { name: 'API Reference', href: '/api' },
      { name: 'Status Page', href: '/status' },
      { name: 'Privacy Policy', href: '/privacy' },
    ]
  };

  const socialLinks = [
    { name: 'Facebook', icon: Facebook, href: '#' },
    { name: 'Twitter', icon: Twitter, href: '#' },
    { name: 'LinkedIn', icon: Linkedin, href: '#' },
    { name: 'Instagram', icon: Instagram, href: '#' },
  ];

  return (
    <footer className="bg-dark text-white">
      {/* Newsletter Section */}
      <div className="border-b border-gray-800">
        <div className="container-custom py-12">
          <div className="max-w-4xl mx-auto text-center">
            <h3 className="text-3xl font-manrope font-bold mb-4">
              Stay Updated with <span className="gradient-text">Botifyx</span>
            </h3>
            <p className="text-gray-400 text-lg mb-8">
              Get the latest insights on web development, AI, and digital transformation
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-primary-500 transition-colors duration-300"
              />
              <button className="btn-primary flex items-center justify-center whitespace-nowrap">
                Subscribe
                <ArrowRight className="ml-2 w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="container-custom py-16">
        <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-1">
            {/* <Link href="/" className="inline-block mb-6">
              <Image
                src="/Botifyx.png"
                alt="Botifyx Logo"
                width={150}
                height={40}
                className="h-10 w-auto brightness-0 invert"
              />
            </Link> */}
            
            <p className="text-gray-400 mb-6 leading-relaxed">
              Transforming businesses through innovative web development, comprehensive testing, 
              and cutting-edge AI solutions.
            </p>

            {/* Contact Info */}
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-primary-500" />
                <a href="mailto:info@botifyx.in" className="text-gray-400 hover:text-white transition-colors duration-300">
                  info@botifyx.in
                </a>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-primary-500" />
                <a href="tel:+919566443876" className="text-gray-400 hover:text-white transition-colors duration-300">
                  +91 95664 43876
                </a>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="w-5 h-5 text-primary-500" />
                <span className="text-gray-400">
                  Bangalore, Karnataka, India
                </span>
              </div>
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-lg font-manrope font-bold mb-6">Services</h4>
            <ul className="space-y-3">
              {footerLinks.services.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-white transition-colors duration-300 flex items-center group"
                  >
                    <span>{link.name}</span>
                    <ArrowRight className="ml-2 w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-lg font-manrope font-bold mb-6">Company</h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-white transition-colors duration-300 flex items-center group"
                  >
                    <span>{link.name}</span>
                    <ArrowRight className="ml-2 w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-lg font-manrope font-bold mb-6">Support</h4>
            <ul className="space-y-3">
              {footerLinks.support.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-white transition-colors duration-300 flex items-center group"
                  >
                    <span>{link.name}</span>
                    <ArrowRight className="ml-2 w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800">
        <div className="container-custom py-6">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="text-gray-400 text-sm mb-4 md:mb-0">
              © {currentYear} Botifyx. All rights reserved.
            </div>
            
            {/* Social Links */}
            {/* <div className="flex items-center space-x-4">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.name}
                    href={social.href}
                    className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center text-gray-400 hover:text-white hover:bg-primary-500 transition-all duration-300 transform hover:scale-110"
                    aria-label={social.name}
                  >
                    <Icon className="w-5 h-5" />
                  </a>
                );
              })}
            </div> */}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;