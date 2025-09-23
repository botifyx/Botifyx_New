'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowRight, Play, CheckCircle } from 'lucide-react';

const Hero = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const features = [
    "Lightning-fast development",
    "Comprehensive testing suite",
    "Enterprise-grade security",
    "24/7 support & maintenance"
  ];

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-gray-50 via-white to-primary-50">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse-slow"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-accent/20 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse-slow"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-primary-50 rounded-full mix-blend-multiply filter blur-2xl opacity-50"></div>
      </div>

      <div className="container-custom relative z-10 pt-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Content */}
          <div className={`space-y-8 transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}>
            <div className="space-y-6">
              <div className="inline-flex items-center px-4 py-2 bg-primary-100 text-primary-700 rounded-full text-sm font-medium">
                <span className="w-2 h-2 bg-primary-500 rounded-full mr-2 animate-pulse"></span>
                Trusted by 50+ businesses worldwide
              </div>
              
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-manrope font-bold text-gray-900 leading-tight">
                Build fast.{' '}
                <span className="gradient-text">Test hard.</span>{' '}
                Ship secure.
              </h1>
              
              <p className="text-xl md:text-2xl text-gray-600 leading-relaxed max-w-2xl">
                Transform your digital vision into reality with our comprehensive development, 
                testing, and AI solutions. From concept to deployment, we ensure your success.
              </p>
            </div>

            {/* Feature List */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {features.map((feature, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                  <span className="text-gray-700 font-medium">{feature}</span>
                </div>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Link href="/contact" className="btn-primary inline-flex items-center justify-center group">
                Start my prototype
                <ArrowRight className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" />
              </Link>
              
              <Link href="/work" className="btn-secondary inline-flex items-center justify-center group">
                <Play className="mr-2 w-5 h-5" />
                View our work
              </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 pt-8 border-t border-gray-200">
              <div className="text-center">
                <div className="text-3xl font-bold text-primary-500">50+</div>
                <div className="text-sm text-gray-600">Projects Delivered</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary-500">99.9%</div>
                <div className="text-sm text-gray-600">Uptime Guarantee</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary-500">24/7</div>
                <div className="text-sm text-gray-600">Support Available</div>
              </div>
            </div>
          </div>

          {/* Right Column - Visual */}
          <div className={`relative transition-all duration-1000 delay-300 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}>
            <div className="relative">
              {/* Main Image Container */}
              <div className="relative bg-white rounded-2xl shadow-2xl p-8 transform rotate-3 hover:rotate-0 transition-transform duration-500">
                <div className="bg-gradient-to-br from-primary-500 to-primary-700 rounded-xl p-6 text-white">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                      <div className="text-sm opacity-75">Live Project</div>
                    </div>
                    <div className="space-y-2">
                      <div className="h-4 bg-white/20 rounded animate-pulse"></div>
                      <div className="h-4 bg-white/20 rounded w-3/4 animate-pulse"></div>
                      <div className="h-4 bg-white/20 rounded w-1/2 animate-pulse"></div>
                    </div>
                    <div className="flex space-x-2 pt-4">
                      <div className="w-8 h-8 bg-green-400 rounded-full flex items-center justify-center">
                        <CheckCircle className="w-4 h-4 text-green-800" />
                      </div>
                      <div className="w-8 h-8 bg-yellow-400 rounded-full animate-spin"></div>
                      <div className="w-8 h-8 bg-blue-400 rounded-full animate-bounce"></div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating Elements */}
              <div className="absolute -top-4 -left-4 w-16 h-16 bg-accent rounded-full flex items-center justify-center shadow-lg animate-bounce-slow">
                <span className="text-white font-bold">AI</span>
              </div>
              
              <div className="absolute -bottom-4 -right-4 w-20 h-20 bg-green-500 rounded-full flex items-center justify-center shadow-lg animate-pulse-slow">
                <CheckCircle className="w-8 h-8 text-white" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;