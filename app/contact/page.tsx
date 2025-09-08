import { Metadata } from 'next';
import { Mail, Phone, MapPin, Clock, MessageSquare, Calendar } from 'lucide-react';
import LeadForm from '@/components/LeadForm';

export const metadata: Metadata = {
  title: 'Contact Us - Botifyx | Get Free Consultation',
  description: 'Get in touch with Botifyx for your web development, testing, and AI solution needs. Free consultation available. Contact us today!',
  keywords: 'contact Botifyx, free consultation, web development contact, AI solutions contact',
};

export default function ContactPage() {
  const contactInfo = [
    {
      icon: Mail,
      title: "Email Us",
      details: "info@botifyx.in",
      description: "Send us an email and we'll respond within 24 hours",
      action: "mailto:info@botifyx.in",
      color: "text-blue-500",
      bgColor: "bg-blue-50"
    },
    {
      icon: Phone,
      title: "Call Us",
      details: "+91 95664 43876",
      description: "Speak directly with our team for immediate assistance",
      action: "tel:+919566443876",
      color: "text-green-500",
      bgColor: "bg-green-50"
    },
    {
      icon: MessageSquare,
      title: "WhatsApp",
      details: "Chat with us",
      description: "Quick responses and instant communication",
      action: "https://wa.me/919566443876",
      color: "text-green-600",
      bgColor: "bg-green-50"
    },
    {
      icon: Calendar,
      title: "Schedule a Call",
      details: "Book a meeting",
      description: "30-minute free consultation to discuss your project",
      action: "https://zcal.co/ramdinesh/30min",
      color: "text-primary-500",
      bgColor: "bg-primary-50"
    }
  ];

  const officeHours = [
    { day: "Monday - Friday", hours: "9:00 AM - 9:00 PM IST" },
    { day: "Saturday", hours: "10:00 AM - 7:00 PM IST" },
    { day: "Sunday", hours: "10:00 AM - 4:00 PM IST" }
  ];

  const faqs = [
    {
      question: "How long does a typical project take?",
      answer: "Project timelines vary based on complexity. Simple websites take 2-4 weeks, while complex applications can take 2-6 months. We provide detailed timelines during consultation."
    },
    {
      question: "Do you provide ongoing support?",
      answer: "Yes, we offer comprehensive support packages including maintenance, updates, monitoring, and technical assistance to ensure your solution runs smoothly."
    },
    {
      question: "What technologies do you work with?",
      answer: "We specialize in modern technologies including React, Next.js, Node.js, Python, AI/ML frameworks, and cloud platforms like AWS and Azure."
    },
    {
      question: "Can you work with our existing team?",
      answer: "Absolutely! We can integrate with your existing development team, provide consulting services, or take full ownership of your project based on your needs."
    }
  ];

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="section-padding bg-gradient-to-br from-gray-50 to-primary-50">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-manrope font-bold text-gray-900 mb-6">
              Let's Build Something <span className="gradient-text">Amazing</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 leading-relaxed mb-8">
              Ready to transform your digital presence? Get in touch for a free consultation and let's discuss your project.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="#contact-form" className="btn-primary">
                Start Your Project
              </a>
              <a href="https://zcal.co/ramdinesh/30min" target="_blank" rel="noopener noreferrer" className="btn-secondary">
                Schedule Free Call
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Methods */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-manrope font-bold text-gray-900 mb-6">
              Get in <span className="gradient-text">Touch</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Choose the communication method that works best for you
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {contactInfo.map((info, index) => {
              const Icon = info.icon;
              return (
                <a
                  key={index}
                  href={info.action}
                  target={info.action.startsWith('http') ? '_blank' : undefined}
                  rel={info.action.startsWith('http') ? 'noopener noreferrer' : undefined}
                  className={`group p-8 bg-white rounded-2xl shadow-lg border-2 border-gray-100 hover:border-primary-200 card-hover transition-all duration-300`}
                >
                  <div className={`w-16 h-16 ${info.bgColor} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className={`w-8 h-8 ${info.color}`} />
                  </div>
                  
                  <h3 className="text-xl font-manrope font-bold text-gray-900 mb-2">
                    {info.title}
                  </h3>
                  
                  <p className={`${info.color} font-semibold mb-3`}>
                    {info.details}
                  </p>
                  
                  <p className="text-gray-600 text-sm">
                    {info.description}
                  </p>
                </a>
              );
            })}
          </div>
        </div>
      </section>

      {/* Office Hours & Location */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Office Hours */}
            <div className="bg-white p-8 rounded-2xl shadow-lg">
              <div className="flex items-center mb-6">
                <Clock className="w-8 h-8 text-primary-500 mr-3" />
                <h3 className="text-2xl font-manrope font-bold text-gray-900">
                  Office Hours
                </h3>
              </div>
              
              <div className="space-y-4">
                {officeHours.map((schedule, index) => (
                  <div key={index} className="flex justify-between items-center py-3 border-b border-gray-100 last:border-b-0">
                    <span className="font-medium text-gray-900">{schedule.day}</span>
                    <span className="text-gray-600">{schedule.hours}</span>
                  </div>
                ))}
              </div>
              
              <div className="mt-6 p-4 bg-primary-50 rounded-lg">
                <p className="text-sm text-primary-700">
                  <strong>Emergency Support:</strong> Available 24/7 for critical issues with existing projects
                </p>
              </div>
            </div>

            {/* Location */}
            <div className="bg-white p-8 rounded-2xl shadow-lg">
              <div className="flex items-center mb-6">
                <MapPin className="w-8 h-8 text-primary-500 mr-3" />
                <h3 className="text-2xl font-manrope font-bold text-gray-900">
                  Our Location
                </h3>
              </div>
              
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Headquarters</h4>
                  <p className="text-gray-600">
                    Bangalore, Karnataka<br />
                    India
                  </p>
                </div>
                
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Service Areas</h4>
                  <p className="text-gray-600">
                    We serve clients globally with remote collaboration and on-site visits available in major Indian cities.
                  </p>
                </div>
              </div>
              
              <div className="mt-6 p-4 bg-green-50 rounded-lg">
                <p className="text-sm text-green-700">
                  <strong>Remote First:</strong> We work with clients worldwide through digital collaboration tools
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section id="contact-form" className="section-padding">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-manrope font-bold text-gray-900 mb-6">
              Start Your <span className="gradient-text">Project</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Tell us about your project and we'll get back to you with a detailed proposal within 24 hours
            </p>
          </div>

          <LeadForm />
        </div>
      </section>

      {/* FAQ Section */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-manrope font-bold text-gray-900 mb-6">
              Frequently Asked <span className="gradient-text">Questions</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Quick answers to common questions about our services and process
            </p>
          </div>

          <div className="max-w-4xl mx-auto space-y-6">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
                <h3 className="text-xl font-manrope font-bold text-gray-900 mb-4">
                  {faq.question}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <p className="text-gray-600 mb-4">
              Have more questions? We're here to help!
            </p>
            <a href="mailto:info@botifyx.in" className="btn-primary">
              Ask Your Question
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}