'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, ExternalLink } from 'lucide-react';

interface CaseStudyCardProps {
  title: string;
  description: string;
  image: string;
  tags: string[];
  link: string;
}

const CaseStudyCard = ({ title, description, image, tags, link }: CaseStudyCardProps) => {
  return (
    <div className="group bg-white rounded-2xl shadow-lg overflow-hidden card-hover border border-gray-100">
      {/* Image Container */}
      <div className="relative h-48 overflow-hidden">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        
        {/* Hover Overlay */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <Link
            href={link}
            className="bg-white text-primary-500 px-4 py-2 rounded-full font-semibold flex items-center space-x-2 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300"
          >
            <span>View Case Study</span>
            <ExternalLink className="w-4 h-4" />
          </Link>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {tags.map((tag, index) => (
            <span
              key={index}
              className="px-3 py-1 bg-primary-50 text-primary-600 text-xs font-medium rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Title */}
        <h3 className="text-xl font-manrope font-bold text-gray-900 mb-3 group-hover:text-primary-500 transition-colors duration-300">
          {title}
        </h3>

        {/* Description */}
        <p className="text-gray-600 text-sm leading-relaxed mb-4">
          {description}
        </p>

        {/* Read More Link */}
        <Link
          // href={link}
          href="#"
          className="inline-flex items-center text-primary-500 font-semibold text-sm group-hover:text-primary-600 transition-colors duration-300"
        >
          <span>Read full case study</span>
          <ArrowRight className="ml-2 w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
        </Link>
      </div>

      {/* Bottom Border Animation */}
      <div className="h-1 bg-gradient-to-r from-primary-500 to-accent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
    </div>
  );
};

export default CaseStudyCard;