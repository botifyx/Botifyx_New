import React, { useState } from 'react';
import { LightningBoltIcon, ShieldCheckIcon, CpuChipIcon, SupportIcon } from './icons/FeatureIcons';
import FeatureModal from './FeatureModal';

interface Feature {
  // FIX: Replaced JSX.Element with React.ReactElement to resolve 'Cannot find namespace JSX' error.
  icon: React.ReactElement;
  title: string;
  description: string;
  details: string;
}

const features: Feature[] = [
  {
    icon: <LightningBoltIcon className="w-8 h-8 text-brand-accent" />,
    title: "Lightning Fast Development",
    description: "Rapid prototyping and development cycles that get your product to market faster than ever before.",
    details: "At Botifyx, we leverage agile methodologies and modern DevOps practices to accelerate the entire development lifecycle. Our CI/CD pipelines, automated testing, and reusable component libraries mean we can build, test, and deploy features with incredible speed and efficiency. This approach not only reduces time-to-market but also allows for iterative feedback and continuous improvement, ensuring the final product is perfectly aligned with your business objectives."
  },
  {
    icon: <ShieldCheckIcon className="w-8 h-8 text-brand-accent" />,
    title: "Enterprise Security",
    description: "Comprehensive security testing and implementation to protect your business and customer data.",
    details: "Security isn't an afterthought; it's embedded in our DNA. We follow a 'security-by-design' principle, integrating robust security measures at every stage of development. Our services include comprehensive vulnerability assessments, penetration testing, static and dynamic code analysis (SAST/DAST), and adherence to industry standards like OWASP Top 10. We ensure your application is fortified against threats, protecting your data, reputation, and user trust."
  },
  {
    icon: <CpuChipIcon className="w-8 h-8 text-brand-accent" />,
    title: "AI-Powered Solutions",
    description: "Cutting-edge AI and ML integration to automate processes and enhance user experiences.",
    details: "Unlock the power of Artificial Intelligence with Botifyx. We specialize in developing and integrating custom AI/ML models to solve complex business challenges. From intelligent chatbots and recommendation engines to predictive analytics and natural language processing (NLP), our solutions are designed to automate workflows, derive actionable insights from data, and create personalized, engaging user experiences that set you apart from the competition."
  },
  {
    icon: <SupportIcon className="w-8 h-8 text-brand-accent" />,
    title: "24/7 Expert Support",
    description: "Round-the-clock technical support and maintenance to ensure your systems run smoothly.",
    details: "Your project's launch is just the beginning of our partnership. We offer comprehensive, round-the-clock support and maintenance packages to ensure your application remains performant, secure, and up-to-date. Our dedicated support team is available 24/7 to address any issues, perform routine maintenance, and provide expert assistance, giving you the peace of mind to focus on your core business."
  }
];

const Features: React.FC = () => {
  const [selectedFeature, setSelectedFeature] = useState<Feature | null>(null);

  return (
    <>
      <section id="why-us" className="py-20">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white">Why Choose Botifyx?</h2>
            <p className="mt-4 text-gray-600 dark:text-gray-400">
              We combine technical expertise with business acumen to deliver solutions that drive real results. Click on a feature to learn more.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <button 
                key={index} 
                onClick={() => setSelectedFeature(feature)}
                className="group text-left bg-gray-50 dark:bg-brand-dark-2 p-6 rounded-lg shadow-sm border border-transparent hover:border-brand-secondary transition-all duration-300 hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-brand-accent cursor-pointer"
              >
                <div className="flex items-center justify-center w-16 h-16 mb-6 rounded-full bg-brand-primary/10 transition-transform duration-300 ease-in-out group-hover:scale-110">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">{feature.title}</h3>
                <p className="text-gray-600 dark:text-gray-400">{feature.description}</p>
              </button>
            ))}
          </div>
        </div>
      </section>

      {selectedFeature && (
        <FeatureModal feature={selectedFeature} onClose={() => setSelectedFeature(null)} />
      )}
    </>
  );
};

export default Features;