import { Metadata } from 'next';
import { Check, Star, Zap, Crown, ArrowRight, HelpCircle } from 'lucide-react';
import PricingCards from '@/components/PricingCards';
import LeadForm from '@/components/LeadForm';

export const metadata: Metadata = {
  title: 'Pricing - Botifyx | Transparent Web Development Pricing',
  description: 'Clear, transparent pricing for web development, AI solutions, and testing services. No hidden fees. Get started with our flexible plans.',
  keywords: 'web development pricing, AI solutions cost, testing services pricing, transparent pricing, Botifyx rates',
};

export default function PricingPage() {
  const addOns = [
    {
      name: "AI Chatbot Integration",
      price: "₹15,000",
      description: "Add intelligent chatbot to your website"
    },
    {
      name: "Advanced Security Testing",
      price: "₹25,000",
      description: "Comprehensive security audit and penetration testing"
    },
    {
      name: "Performance Optimization",
      price: "₹20,000",
      description: "Speed optimization and Core Web Vitals improvement"
    },
    {
      name: "Mobile App Development",
      price: "₹50,000",
      description: "Native or cross-platform mobile application"
    },
    {
      name: "SEO Package",
      price: "₹12,000",
      description: "Complete SEO setup and optimization"
    },
    {
      name: "Content Management System",
      price: "₹18,000",
      description: "Custom CMS for easy content updates"
    }
  ];

  const faqs = [
    {
      question: "What's included in the support period?",
      answer: "Our support includes bug fixes, security updates, performance monitoring, technical assistance, and minor feature updates. We also provide training for your team to manage the system effectively."
    },
    {
      question: "Can I upgrade or downgrade my plan?",
      answer: "Yes, you can change your plan at any time. We'll work with you to ensure a smooth transition and adjust pricing accordingly based on your new requirements."
    },
    {
      question: "Do you offer custom pricing for unique requirements?",
      answer: "Absolutely! Every business has unique needs. We offer custom pricing for projects that don't fit our standard plans. Contact us for a personalized quote."
    },
    {
      question: "What payment methods do you accept?",
      answer: "We accept bank transfers, UPI, credit/debit cards, and can set up payment plans for larger projects. We typically work with 50% upfront and 50% on completion."
    },
    {
      question: "Is there a money-back guarantee?",
      answer: "Yes, we offer a 30-day satisfaction guarantee. If you're not completely satisfied with our work, we'll refund your payment or work to make it right."
    },
    {
      question: "How long does a typical project take?",
      answer: "Project timelines vary based on complexity. Simple websites take 2-4 weeks, while complex applications can take 2-6 months. We provide detailed timelines during consultation."
    }
  ];

  const testimonials = [
    {
      name: "Rajesh Kumar",
      company: "StartupTech",
      content: "Botifyx delivered exceptional value. The Professional plan was perfect for our growing startup.",
      rating: 5
    },
    {
      name: "Priya Sharma",
      company: "E-commerce Plus",
      content: "Transparent pricing and no hidden costs. They delivered exactly what was promised.",
      rating: 5
    }
  ];

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="section-padding bg-gradient-to-br from-gray-50 to-primary-50">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-manrope font-bold text-gray-900 mb-6">
              Simple, <span className="gradient-text">Transparent</span> Pricing
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 leading-relaxed mb-8">
              No hidden fees, no surprises. Choose the plan that fits your needs and budget.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="#pricing" className="btn-primary">
                View Pricing Plans
              </a>
              <a href="/contact" className="btn-secondary">
                Get Custom Quote
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Main Pricing Section */}
      <section id="pricing">
        <PricingCards />
      </section>

      {/* Add-ons Section */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-manrope font-bold text-gray-900 mb-6">
              Popular <span className="gradient-text">Add-ons</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Enhance your project with these additional services
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {addOns.map((addon, index) => (
              <div key={index} className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 card-hover">
                <div className="flex items-start justify-between mb-4">
                  <h3 className="text-lg font-manrope font-bold text-gray-900">
                    {addon.name}
                  </h3>
                  <div className="text-2xl font-bold text-primary-500">
                    {addon.price}
                  </div>
                </div>
                <p className="text-gray-600 mb-4">
                  {addon.description}
                </p>
                <button className="w-full btn-secondary text-sm">
                  Add to Project
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Value Proposition */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-manrope font-bold text-gray-900 mb-6">
                Why Choose <span className="gradient-text">Botifyx</span>?
              </h2>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <Check className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">No Hidden Costs</h3>
                    <p className="text-gray-600">What you see is what you pay. All costs are transparent upfront.</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <Check className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Quality Guarantee</h3>
                    <p className="text-gray-600">30-day satisfaction guarantee on all our work.</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <Check className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Flexible Payment</h3>
                    <p className="text-gray-600">Multiple payment options and flexible payment plans available.</p>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <Check className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Ongoing Support</h3>
                    <p className="text-gray-600">Comprehensive support and maintenance included in all plans.</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <Check className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Expert Team</h3>
                    <p className="text-gray-600">Work with experienced developers and designers.</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <Check className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Modern Technology</h3>
                    <p className="text-gray-600">Latest technologies and best practices in every project.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
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
              Get answers to common questions about our pricing and services
            </p>
          </div>

          <div className="max-w-4xl mx-auto space-y-6">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
                <div className="flex items-start space-x-4">
                  <HelpCircle className="w-6 h-6 text-primary-500 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="text-xl font-manrope font-bold text-gray-900 mb-3">
                      {faq.question}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-manrope font-bold text-gray-900 mb-6">
              Ready to Get <span className="gradient-text">Started</span>?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Contact us for a free consultation and custom quote for your project
            </p>
          </div>

          <LeadForm />
        </div>
      </section>
    </div>
  );
}