'use client';

import { useState, useEffect, useRef } from 'react';
import { MessageSquare, Code, TestTube, Rocket } from 'lucide-react';

const Process = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
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

  useEffect(() => {
    if (isVisible) {
      const interval = setInterval(() => {
        setActiveStep((prev) => (prev + 1) % 4);
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [isVisible]);

  const steps = [
    {
      icon: MessageSquare,
      title: "Discovery & Planning",
      description: "We start by understanding your business goals, target audience, and technical requirements through detailed consultation.",
      duration: "1-2 weeks",
      color: "text-blue-500",
      bgColor: "bg-blue-50",
      borderColor: "border-blue-200"
    },
    {
      icon: Code,
      title: "Development & Design",
      description: "Our expert team builds your solution using cutting-edge technologies and best practices for optimal performance.",
      duration: "2-8 weeks",
      color: "text-green-500",
      bgColor: "bg-green-50",
      borderColor: "border-green-200"
    },
    {
      icon: TestTube,
      title: "Testing & Quality Assurance",
      description: "Comprehensive testing including functional, performance, and security testing to ensure flawless operation.",
      duration: "1-2 weeks",
      color: "text-purple-500",
      bgColor: "bg-purple-50",
      borderColor: "border-purple-200"
    },
    {
      icon: Rocket,
      title: "Launch & Support",
      description: "Smooth deployment to production with ongoing monitoring, maintenance, and 24/7 technical support.",
      duration: "Ongoing",
      color: "text-primary-500",
      bgColor: "bg-primary-50",
      borderColor: "border-primary-200"
    }
  ];

  return (
    <section ref={sectionRef} className="section-padding bg-gray-50">
      <div className="container-custom">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-manrope font-bold text-gray-900 mb-6">
            Our Proven <span className="gradient-text">Process</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            A systematic approach that ensures quality, efficiency, and success at every stage
          </p>
        </div>

        {/* Desktop Timeline */}
        <div className="hidden lg:block relative">
          {/* Timeline Line */}
          <div className="absolute top-1/2 left-0 w-full h-1 bg-gray-200 transform -translate-y-1/2">
            <div 
              className="h-full bg-gradient-to-r from-primary-500 to-accent transition-all duration-1000 ease-out"
              style={{ width: isVisible ? `${((activeStep + 1) / 4) * 100}%` : '0%' }}
            ></div>
          </div>

          <div className="grid grid-cols-4 gap-8">
            {steps.map((step, index) => {
              const Icon = step.icon;
              const isActive = index <= activeStep;
              
              return (
                <div
                  key={index}
                  className={`relative transition-all duration-500 ${
                    isVisible 
                      ? 'opacity-100 translate-y-0' 
                      : 'opacity-0 translate-y-10'
                  }`}
                  style={{ transitionDelay: `${index * 200}ms` }}
                >
                  {/* Step Circle */}
                  <div className={`relative z-10 w-20 h-20 mx-auto rounded-full border-4 flex items-center justify-center transition-all duration-500 ${
                    isActive 
                      ? `${step.borderColor} ${step.bgColor} scale-110` 
                      : 'border-gray-200 bg-white'
                  }`}>
                    <Icon className={`w-8 h-8 transition-colors duration-500 ${
                      isActive ? step.color : 'text-gray-400'
                    }`} />
                  </div>

                  {/* Step Content */}
                  <div className="mt-8 text-center">
                    <div className={`inline-block px-3 py-1 rounded-full text-xs font-medium mb-3 ${
                      isActive ? `${step.bgColor} ${step.color}` : 'bg-gray-100 text-gray-500'
                    }`}>
                      {step.duration}
                    </div>
                    
                    <h3 className="text-xl font-manrope font-bold text-gray-900 mb-3">
                      {step.title}
                    </h3>
                    
                    <p className="text-gray-600 text-sm leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Mobile Cards */}
        <div className="lg:hidden space-y-6">
          {steps.map((step, index) => {
            const Icon = step.icon;
            
            return (
              <div
                key={index}
                className={`p-6 bg-white rounded-2xl shadow-lg border-l-4 ${step.borderColor} transition-all duration-500 ${
                  isVisible 
                    ? 'opacity-100 translate-x-0' 
                    : 'opacity-0 translate-x-10'
                }`}
                style={{ transitionDelay: `${index * 150}ms` }}
              >
                <div className="flex items-start space-x-4">
                  <div className={`w-12 h-12 ${step.bgColor} rounded-xl flex items-center justify-center flex-shrink-0`}>
                    <Icon className={`w-6 h-6 ${step.color}`} />
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-lg font-manrope font-bold text-gray-900">
                        {step.title}
                      </h3>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${step.bgColor} ${step.color}`}>
                        {step.duration}
                      </span>
                    </div>
                    
                    <p className="text-gray-600 text-sm leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <div className="max-w-2xl mx-auto p-8 bg-white rounded-2xl shadow-lg border border-gray-100">
            <h3 className="text-2xl font-manrope font-bold text-gray-900 mb-4">
              Ready to Start Your Project?
            </h3>
            <p className="text-gray-600 mb-6">
              Let's discuss your requirements and create a custom roadmap for your success
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="/contact" className="btn-primary">
                Get Free Consultation
              </a>
              <a href="https://zcal.co/ramdinesh/30min" target="_blank" rel="noopener noreferrer" className="btn-secondary">
                Schedule a Call
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Process;