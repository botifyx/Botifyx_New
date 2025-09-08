import { Metadata } from 'next';
import { Code, Smartphone, TestTube, Shield, Zap, Users, Globe, Cpu } from 'lucide-react';
import LeadForm from '@/components/LeadForm';

export const metadata: Metadata = {
  title: 'Services - Botifyx | Web Development, Testing & AI Solutions',
  description: 'Comprehensive web development, mobile apps, testing services, and AI solutions. Full-stack development, security testing, performance optimization, and more.',
  keywords: 'web development, mobile apps, testing services, AI solutions, full-stack development, security testing',
};

export default function ServicesPage() {
  const services = [
    {
      icon: Code,
      title: "Full-Stack Web Development",
      description: "End-to-end web application development using modern technologies like React, Next.js, Node.js, and cloud platforms.",
      features: [
        "Custom web applications",
        "E-commerce platforms",
        "Content management systems",
        "API development & integration",
        "Database design & optimization",
        "Cloud deployment & scaling"
      ],
      color: "text-blue-500",
      bgColor: "bg-blue-50",
      borderColor: "border-blue-200"
    },
    {
      icon: Smartphone,
      title: "Mobile App Development",
      description: "Native and cross-platform mobile applications for iOS and Android with seamless user experiences.",
      features: [
        "React Native development",
        "Native iOS & Android apps",
        "Progressive Web Apps (PWA)",
        "App Store optimization",
        "Push notifications",
        "Offline functionality"
      ],
      color: "text-green-500",
      bgColor: "bg-green-50",
      borderColor: "border-green-200"
    },
    {
      icon: TestTube,
      title: "Functional Testing",
      description: "Comprehensive testing to ensure your application works flawlessly across all scenarios and user interactions.",
      features: [
        "Manual testing",
        "Automated testing",
        "User acceptance testing",
        "Cross-browser testing",
        "API testing",
        "Regression testing"
      ],
      color: "text-purple-500",
      bgColor: "bg-purple-50",
      borderColor: "border-purple-200"
    },
    {
      icon: Zap,
      title: "Performance Testing",
      description: "Optimize your application's speed, scalability, and reliability under various load conditions.",
      features: [
        "Load testing",
        "Stress testing",
        "Volume testing",
        "Performance monitoring",
        "Bottleneck identification",
        "Optimization recommendations"
      ],
      color: "text-yellow-500",
      bgColor: "bg-yellow-50",
      borderColor: "border-yellow-200"
    },
    {
      icon: Shield,
      title: "Security Testing",
      description: "Protect your applications and data with comprehensive security assessments and vulnerability testing.",
      features: [
        "Vulnerability assessment",
        "Penetration testing",
        "Security code review",
        "OWASP compliance",
        "Data encryption",
        "Security monitoring"
      ],
      color: "text-red-500",
      bgColor: "bg-red-50",
      borderColor: "border-red-200"
    },
    {
      icon: Cpu,
      title: "AI/ML Solutions",
      description: "Integrate artificial intelligence and machine learning to automate processes and enhance user experiences.",
      features: [
        "Custom AI models",
        "Natural language processing",
        "Computer vision",
        "Predictive analytics",
        "Recommendation systems",
        "Process automation"
      ],
      color: "text-primary-500",
      bgColor: "bg-primary-50",
      borderColor: "border-primary-200"
    },
    {
      icon: Users,
      title: "Chatbot Development",
      description: "Intelligent chatbots that provide 24/7 customer support and enhance user engagement.",
      features: [
        "AI-powered chatbots",
        "Multi-platform integration",
        "Natural conversation flow",
        "Analytics & insights",
        "Custom training",
        "Continuous learning"
      ],
      color: "text-accent",
      bgColor: "bg-cyan-50",
      borderColor: "border-cyan-200"
    },
    {
      icon: Globe,
      title: "Website Design",
      description: "Beautiful, responsive websites that convert visitors into customers with modern design principles.",
      features: [
        "Responsive design",
        "UI/UX optimization",
        "Brand identity",
        "SEO optimization",
        "Performance optimization",
        "Accessibility compliance"
      ],
      color: "text-pink-500",
      bgColor: "bg-pink-50",
      borderColor: "border-pink-200"
    }
  ];

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="section-padding bg-gradient-to-br from-gray-50 to-primary-50">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-manrope font-bold text-gray-900 mb-6">
              Our <span className="gradient-text">Services</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 leading-relaxed mb-8">
              Comprehensive digital solutions to transform your business and accelerate growth
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="#services" className="btn-primary">
                Explore Services
              </a>
              <a href="#contact" className="btn-secondary">
                Get Custom Quote
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section id="services" className="section-padding">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-manrope font-bold text-gray-900 mb-6">
              What We <span className="gradient-text">Offer</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              From concept to deployment, we provide end-to-end solutions tailored to your business needs
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => {
              const Icon = service.icon;
              return (
                <div
                  key={index}
                  className={`group p-8 bg-white rounded-2xl shadow-lg border-2 ${service.borderColor} card-hover transition-all duration-500`}
                >
                  <div className={`w-16 h-16 ${service.bgColor} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className={`w-8 h-8 ${service.color}`} />
                  </div>
                  
                  <h3 className="text-2xl font-manrope font-bold text-gray-900 mb-4">
                    {service.title}
                  </h3>
                  
                  <p className="text-gray-600 mb-6 leading-relaxed">
                    {service.description}
                  </p>

                  <ul className="space-y-2">
                    {service.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center text-sm text-gray-700">
                        <div className={`flex-shrink-0`}></div>
                        {feature}
                      </li>
                    ))}
                  </ul>

                  <div className="mt-6 pt-6 border-t border-gray-100">
                    <a
                      href="#contact"
                      className={`inline-flex items-center ${service.color} font-semibold text-sm hover:underline`}
                    >
                      Learn more about {service.title.toLowerCase()}
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-manrope font-bold text-gray-900 mb-6">
              Our Service <span className="gradient-text">Process</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              A proven methodology that ensures quality delivery and client satisfaction
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            {[
              {
                step: "01",
                title: "Discovery",
                description: "Understanding your requirements, goals, and technical specifications"
              },
              {
                step: "02",
                title: "Planning",
                description: "Creating detailed project roadmap, timeline, and resource allocation"
              },
              {
                step: "03",
                title: "Development",
                description: "Building your solution using best practices and modern technologies"
              },
              {
                step: "04",
                title: "Delivery",
                description: "Testing, deployment, and ongoing support for your success"
              }
            ].map((item, index) => (
              <div key={index} className="text-center">
                <div className="w-20 h-20 bg-primary-500 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-6">
                  {item.step}
                </div>
                <h3 className="text-xl font-manrope font-bold text-gray-900 mb-4">
                  {item.title}
                </h3>
                <p className="text-gray-600">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section id="contact" className="section-padding">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-manrope font-bold text-gray-900 mb-6">
              Ready to Get <span className="gradient-text">Started</span>?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Let's discuss your project requirements and create a custom solution for your business
            </p>
          </div>

          <LeadForm />
        </div>
      </section>
    </div>
  );
}