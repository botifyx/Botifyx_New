'use client';

import { useState, useEffect, useRef } from 'react';
import { Zap, Shield, Cpu, Headphones } from 'lucide-react';

const ValueProps = () => {
  const [isVisible, setIsVisible] = useState(false);
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

  const valueProps = [
    {
      icon: Zap,
      title: "Lightning Fast Development",
      description: "Rapid prototyping and development cycles that get your product to market faster than ever before.",
      color: "text-yellow-500",
      bgColor: "bg-yellow-50",
      borderColor: "border-yellow-200"
    },
    {
      icon: Shield,
      title: "Enterprise Security",
      description: "Comprehensive security testing and implementation to protect your business and customer data.",
      color: "text-green-500",
      bgColor: "bg-green-50",
      borderColor: "border-green-200"
    },
    {
      icon: Cpu,
      title: "AI-Powered Solutions",
      description: "Cutting-edge AI and ML integration to automate processes and enhance user experiences.",
      color: "text-primary-500",
      bgColor: "bg-primary-50",
      borderColor: "border-primary-200"
    },
    {
      icon: Headphones,
      title: "24/7 Expert Support",
      description: "Round-the-clock technical support and maintenance to ensure your systems run smoothly.",
      color: "text-accent",
      bgColor: "bg-cyan-50",
      borderColor: "border-cyan-200"
    }
  ];

  return (
    <section ref={sectionRef} className="section-padding bg-white">
      <div className="container-custom">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-manrope font-bold text-gray-900 mb-6">
            Why Choose <span className="gradient-text">Botifyx</span>?
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We combine technical expertise with business acumen to deliver solutions that drive real results
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {valueProps.map((prop, index) => {
            const Icon = prop.icon;
            return (
              <div
                key={index}
                className={`group p-8 rounded-2xl border-2 ${prop.borderColor} ${prop.bgColor} card-hover transition-all duration-500 ${
                  isVisible 
                    ? 'opacity-100 translate-y-0' 
                    : 'opacity-0 translate-y-10'
                }`}
                style={{ transitionDelay: `${index * 150}ms` }}
              >
                <div className={`w-16 h-16 ${prop.bgColor} rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <Icon className={`w-8 h-8 ${prop.color}`} />
                </div>
                
                <h3 className="text-xl font-manrope font-bold text-gray-900 mb-4">
                  {prop.title}
                </h3>
                
                <p className="text-gray-600 leading-relaxed">
                  {prop.description}
                </p>

                {/* Hover Effect */}
                <div className="mt-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className={`w-full h-1 ${prop.color.replace('text-', 'bg-')} rounded-full transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500`}></div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <div className="inline-flex items-center space-x-4 p-6 bg-gradient-to-r from-primary-50 to-accent/10 rounded-2xl border border-primary-100">
            <div className="text-left">
              <h3 className="text-lg font-semibold text-gray-900">Ready to get started?</h3>
              <p className="text-gray-600">Let's discuss your project requirements</p>
            </div>
            <a href="/contact" className="btn-primary whitespace-nowrap">
              Get Free Consultation
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ValueProps;