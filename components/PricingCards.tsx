'use client';

import { useState, useEffect, useRef } from 'react';
import { Check, Star, Zap, Crown } from 'lucide-react';

const PricingCards = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const plans = [
    {
      name: "Starter",
      icon: Star,
      description: "Perfect for small businesses and startups",
      monthlyPrice: 2999,
      yearlyPrice: 29990,
      features: [
        "Basic website development",
        "Responsive design",
        "Basic SEO optimization",
        "Contact form integration",
        "3 months support",
        "2 revision rounds"
      ],
      popular: false,
      color: "text-blue-500",
      bgColor: "bg-blue-50",
      borderColor: "border-blue-200"
    },
    {
      name: "Professional",
      icon: Zap,
      description: "Ideal for growing businesses with advanced needs",
      monthlyPrice: 7999,
      yearlyPrice: 79990,
      features: [
        "Full-stack web application",
        "Custom functionality",
        "Advanced testing suite",
        "Performance optimization",
        "6 months support",
        "Unlimited revisions",
        "Basic AI integration",
        "Security testing"
      ],
      popular: true,
      color: "text-primary-500",
      bgColor: "bg-primary-50",
      borderColor: "border-primary-200"
    },
    {
      name: "Enterprise",
      icon: Crown,
      description: "Complete solution for large organizations",
      monthlyPrice: 19999,
      yearlyPrice: 199990,
      features: [
        "Enterprise-grade development",
        "Advanced AI/ML solutions",
        "Comprehensive testing",
        "24/7 priority support",
        "12 months support",
        "Unlimited revisions",
        "Custom integrations",
        "Security audit",
        "Performance monitoring",
        "Dedicated project manager"
      ],
      popular: false,
      color: "text-purple-500",
      bgColor: "bg-purple-50",
      borderColor: "border-purple-200"
    }
  ];

  return (
    <section ref={sectionRef} className="section-padding bg-gradient-to-br from-gray-50 to-white">
      <div className="container-custom">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-manrope font-bold text-gray-900 mb-6">
            Choose Your <span className="gradient-text">Perfect Plan</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Transparent pricing with no hidden fees. All plans include our quality guarantee.
          </p>

          {/* Billing Toggle */}
          <div className="inline-flex items-center bg-white rounded-full p-1 shadow-lg border border-gray-200">
            <button
              onClick={() => setBillingCycle('monthly')}
              className={`px-6 py-2 rounded-full font-medium transition-all duration-300 ${
                billingCycle === 'monthly'
                  ? 'bg-primary-500 text-white shadow-md'
                  : 'text-gray-600 hover:text-primary-500'
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setBillingCycle('yearly')}
              className={`px-6 py-2 rounded-full font-medium transition-all duration-300 relative ${
                billingCycle === 'yearly'
                  ? 'bg-primary-500 text-white shadow-md'
                  : 'text-gray-600 hover:text-primary-500'
              }`}
            >
              Yearly
              <span className="absolute -top-2 -right-2 bg-green-500 text-white text-xs px-2 py-1 rounded-full">
                Save 20%
              </span>
            </button>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => {
            const Icon = plan.icon;
            const price = billingCycle === 'monthly' ? plan.monthlyPrice : plan.yearlyPrice;
            const period = billingCycle === 'monthly' ? 'month' : 'year';
            
            return (
              <div
                key={index}
                className={`relative bg-white rounded-2xl shadow-xl border-2 overflow-hidden transition-all duration-500 ${
                  plan.popular 
                    ? 'border-primary-500 scale-105 shadow-2xl' 
                    : plan.borderColor
                } ${
                  isVisible 
                    ? 'opacity-100 translate-y-0' 
                    : 'opacity-0 translate-y-10'
                }`}
                style={{ transitionDelay: `${index * 150}ms` }}
              >
                {/* Popular Badge */}
                {plan.popular && (
                  <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    <div className="bg-gradient-to-r from-primary-500 to-accent text-white px-6 py-2 rounded-full text-sm font-bold shadow-lg">
                      Most Popular
                    </div>
                  </div>
                )}

                <div className="p-8">
                  {/* Header */}
                  <div className="text-center mb-8">
                    <div className={`w-16 h-16 ${plan.bgColor} rounded-2xl flex items-center justify-center mx-auto mb-4`}>
                      <Icon className={`w-8 h-8 ${plan.color}`} />
                    </div>
                    
                    <h3 className="text-2xl font-manrope font-bold text-gray-900 mb-2">
                      {plan.name}
                    </h3>
                    
                    <p className="text-gray-600 text-sm mb-6">
                      {plan.description}
                    </p>

                    {/* Price */}
                    <div className="mb-6">
                      <div className="flex items-baseline justify-center">
                        <span className="text-gray-500 text-lg">₹</span>
                        <span className="text-4xl font-bold text-gray-900">
                          {price.toLocaleString('en-IN')}
                        </span>
                        <span className="text-gray-500 text-lg ml-1">/{period}</span>
                      </div>
                      {billingCycle === 'yearly' && (
                        <div className="text-sm text-green-600 font-medium mt-1">
                          Save ₹{((plan.monthlyPrice * 12) - plan.yearlyPrice).toLocaleString('en-IN')} per year
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Features */}
                  <div className="space-y-4 mb-8">
                    {plan.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-center space-x-3">
                        <Check className="w-5 h-5 text-green-500 flex-shrink-0" />
                        <span className="text-gray-700 text-sm">{feature}</span>
                      </div>
                    ))}
                  </div>

                  {/* CTA Button */}
                  <button
                    className={`w-full py-4 px-6 rounded-xl font-semibold transition-all duration-300 ${
                      plan.popular
                        ? 'bg-primary-500 hover:bg-primary-600 text-white shadow-lg hover:shadow-xl transform hover:scale-105'
                        : 'bg-gray-100 hover:bg-gray-200 text-gray-900 hover:shadow-lg'
                    }`}
                  >
                    Get Started
                  </button>
                </div>

                {/* Bottom Accent */}
                <div className={`h-2 bg-gradient-to-r ${
                  plan.popular 
                    ? 'from-primary-500 to-accent' 
                    : `from-${plan.color.split('-')[1]}-400 to-${plan.color.split('-')[1]}-600`
                }`}></div>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <div className="max-w-2xl mx-auto p-8 bg-white rounded-2xl shadow-lg border border-gray-100">
            <h3 className="text-2xl font-manrope font-bold text-gray-900 mb-4">
              Need a Custom Solution?
            </h3>
            <p className="text-gray-600 mb-6">
              Every business is unique. Let's create a tailored plan that fits your specific requirements and budget.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="/contact" className="btn-primary">
                Request Custom Quote
              </a>
              <a href="https://zcal.co/ramdinesh/30min" target="_blank" rel="noopener noreferrer" className="btn-secondary">
                Schedule Consultation
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PricingCards;