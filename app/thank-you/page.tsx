import { Metadata } from 'next';
import { CheckCircle, Calendar, MessageSquare, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Thank You - Botifyx | We\'ll Be In Touch Soon',
  description: 'Thank you for contacting Botifyx. We\'ve received your message and will respond within 24 hours.',
};

export default function ThankYouPage() {
  const nextSteps = [
    {
      icon: CheckCircle,
      title: "Message Received",
      description: "We've received your project details and requirements",
      status: "completed"
    },
    {
      icon: MessageSquare,
      title: "Initial Review",
      description: "Our team will review your requirements within 4 hours",
      status: "in-progress"
    },
    {
      icon: Calendar,
      title: "Detailed Response",
      description: "You'll receive a comprehensive proposal within 24 hours",
      status: "pending"
    }
  ];

  const quickActions = [
    {
      title: "Schedule a Call",
      description: "Book a 30-minute consultation to discuss your project in detail",
      link: "https://zcal.co/ramdinesh/30min",
      icon: Calendar,
      color: "text-primary-500",
      bgColor: "bg-primary-50"
    },
    {
      title: "Chat on WhatsApp",
      description: "Get instant responses to quick questions",
      link: "https://wa.me/919566443876",
      icon: MessageSquare,
      color: "text-green-500",
      bgColor: "bg-green-50"
    }
  ];

  return (
    <div className="pt-20 min-h-screen bg-gradient-to-br from-gray-50 to-primary-50">
      <div className="container-custom section-padding">
        <div className="max-w-4xl mx-auto">
          {/* Success Message */}
          <div className="text-center mb-16">
            <div className="w-24 h-24 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-8 animate-bounce-slow">
              <CheckCircle className="w-12 h-12 text-white" />
            </div>
            
            <h1 className="text-5xl md:text-6xl font-manrope font-bold text-gray-900 mb-6">
              Thank <span className="gradient-text">You!</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-600 leading-relaxed mb-8">
              We've received your message and are excited to work with you. 
              Our team will review your requirements and get back to you soon.
            </p>

            <div className="inline-flex items-center px-6 py-3 bg-white rounded-full shadow-lg border border-gray-200">
              <div className="w-3 h-3 bg-green-500 rounded-full mr-3 animate-pulse"></div>
              <span className="text-gray-700 font-medium">Response within 24 hours guaranteed</span>
            </div>
          </div>

          {/* Next Steps */}
          <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8 mb-12">
            <h2 className="text-3xl font-manrope font-bold text-gray-900 mb-8 text-center">
              What Happens Next?
            </h2>

            <div className="space-y-6">
              {nextSteps.map((step, index) => {
                const Icon = step.icon;
                return (
                  <div key={index} className="flex items-start space-x-4">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 ${
                      step.status === 'completed' 
                        ? 'bg-green-500 text-white' 
                        : step.status === 'in-progress'
                        ? 'bg-primary-500 text-white animate-pulse'
                        : 'bg-gray-200 text-gray-500'
                    }`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-900 mb-1">
                        {step.title}
                      </h3>
                      <p className="text-gray-600">
                        {step.description}
                      </p>
                    </div>

                    {step.status === 'completed' && (
                      <CheckCircle className="w-6 h-6 text-green-500" />
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {quickActions.map((action, index) => {
              const Icon = action.icon;
              return (
                <a
                  key={index}
                  href={action.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`group p-8 bg-white rounded-2xl shadow-lg border-2 border-gray-100 hover:border-primary-200 card-hover transition-all duration-300`}
                >
                  <div className={`w-16 h-16 ${action.bgColor} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className={`w-8 h-8 ${action.color}`} />
                  </div>
                  
                  <h3 className="text-xl font-manrope font-bold text-gray-900 mb-3">
                    {action.title}
                  </h3>
                  
                  <p className="text-gray-600 mb-4">
                    {action.description}
                  </p>

                  <div className={`inline-flex items-center ${action.color} font-semibold text-sm group-hover:underline`}>
                    <span>Get started now</span>
                    <ArrowRight className="ml-2 w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </div>
                </a>
              );
            })}
          </div>

          {/* Additional Information */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 text-center">
            <h3 className="text-2xl font-manrope font-bold text-gray-900 mb-4">
              While You Wait...
            </h3>
            
            <p className="text-gray-600 mb-6">
              Explore our portfolio and learn more about how we can help transform your business
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/work" className="btn-secondary">
                View Our Work
              </Link>
              <Link href="/blog" className="btn-primary">
                Read Our Blog
              </Link>
            </div>
          </div>

          {/* Contact Information */}
          <div className="text-center mt-12 p-6 bg-white/50 rounded-xl">
            <p className="text-gray-600 mb-2">
              Need immediate assistance?
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <a href="mailto:info@botifyx.in" className="text-primary-500 hover:underline font-medium">
                info@botifyx.in
              </a>
              <span className="hidden sm:block text-gray-400">|</span>
              <a href="tel:+919566443876" className="text-primary-500 hover:underline font-medium">
                +91 95664 43876
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}