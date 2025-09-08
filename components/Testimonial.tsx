'use client';

import Image from 'next/image';
import { Star, Quote } from 'lucide-react';

interface TestimonialProps {
  name: string;
  company: string;
  role: string;
  content: string;
  avatar: string;
}

const Testimonial = ({ name, company, role, content, avatar }: TestimonialProps) => {
  return (
    <div className="group bg-white p-8 rounded-2xl shadow-lg border border-gray-100 card-hover relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-primary-50 to-transparent rounded-full transform translate-x-16 -translate-y-16 group-hover:scale-150 transition-transform duration-500"></div>
      
      {/* Quote Icon */}
      <div className="relative z-10 mb-6">
        <Quote className="w-8 h-8 text-primary-500 opacity-50" />
      </div>

      {/* Rating */}
      <div className="flex items-center space-x-1 mb-4">
        {[...Array(5)].map((_, index) => (
          <Star
            key={index}
            className="w-5 h-5 text-yellow-400 fill-current"
          />
        ))}
      </div>

      {/* Content */}
      <blockquote className="text-gray-700 text-lg leading-relaxed mb-6 relative z-10">
        "{content}"
      </blockquote>

      {/* Author */}
      <div className="flex items-center space-x-4 relative z-10">
        <div className="relative">
          <Image
            src={avatar}
            alt={name}
            width={56}
            height={56}
            className="rounded-full object-cover ring-4 ring-white shadow-lg"
          />
          <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-2 border-white flex items-center justify-center">
            <div className="w-2 h-2 bg-white rounded-full"></div>
          </div>
        </div>
        
        <div>
          <h4 className="font-manrope font-bold text-gray-900 text-lg">
            {name}
          </h4>
          <p className="text-gray-600 text-sm">
            {role} at <span className="font-semibold text-primary-500">{company}</span>
          </p>
        </div>
      </div>

      {/* Hover Effect */}
      <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-primary-500 to-accent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
    </div>
  );
};

export default Testimonial;