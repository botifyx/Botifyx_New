import { Metadata } from 'next';
import { ExternalLink, Calendar, Users, Zap, Shield, Cpu, Globe } from 'lucide-react';
import CaseStudyCard from '@/components/CaseStudyCard';
import LeadForm from '@/components/LeadForm';

export const metadata: Metadata = {
  title: 'Our Work - Botifyx | Portfolio & Case Studies',
  description: 'Explore our portfolio of successful web development, AI/ML, and testing projects. See how we\'ve helped businesses transform digitally.',
  keywords: 'portfolio, case studies, web development projects, AI solutions, client work, Botifyx projects',
};

export default function WorkPage() {
  const featuredProjects = [
    {
      title: "E-commerce Platform Transformation",
      description: "Complete redesign and development of a high-traffic e-commerce platform with advanced security testing and performance optimization.",
      image: "https://images.pexels.com/photos/230544/pexels-photo-230544.jpeg?auto=compress&cs=tinysrgb&w=800",
      tags: ["Full-Stack", "E-commerce", "Security Testing", "Performance"],
      link: "/work/ecommerce-platform",
      client: "RetailTech Solutions",
      duration: "4 months",
      results: ["300% faster load times", "99.9% uptime", "40% increase in conversions"]
    },
    {
      title: "AI-Powered Customer Service Bot",
      description: "Intelligent chatbot with natural language processing that handles 80% of customer queries automatically.",
      image: "https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=800",
      tags: ["AI/ML", "Chatbot", "NLP", "Automation"],
      link: "/work/ai-chatbot",
      client: "TechSupport Inc.",
      duration: "3 months",
      results: ["80% query automation", "90% faster response", "60% cost reduction"]
    },
    {
      title: "Secure Banking Mobile App",
      description: "High-security mobile banking application with comprehensive functional and security testing.",
      image: "https://images.pexels.com/photos/4386321/pexels-photo-4386321.jpeg?auto=compress&cs=tinysrgb&w=800",
      tags: ["Mobile", "Security", "Banking", "Testing"],
      link: "/work/mobile-banking",
      client: "SecureBank Ltd.",
      duration: "6 months",
      results: ["Zero security breaches", "5-star app rating", "1M+ downloads"]
    },
    {
      title: "Healthcare Management System",
      description: "Comprehensive healthcare management platform with patient records, appointment scheduling, and telemedicine features.",
      image: "https://images.pexels.com/photos/4386431/pexels-photo-4386431.jpeg?auto=compress&cs=tinysrgb&w=800",
      tags: ["Healthcare", "Full-Stack", "HIPAA Compliant", "Telemedicine"],
      link: "/work/healthcare-system",
      client: "MedCare Solutions",
      duration: "8 months",
      results: ["50% admin efficiency", "HIPAA compliant", "24/7 availability"]
    },
    {
      title: "Real Estate Analytics Platform",
      description: "AI-powered real estate analytics platform with predictive pricing models and market trend analysis.",
      image: "https://images.pexels.com/photos/1370704/pexels-photo-1370704.jpeg?auto=compress&cs=tinysrgb&w=800",
      tags: ["AI/ML", "Analytics", "Real Estate", "Predictive Models"],
      link: "/work/real-estate-analytics",
      client: "PropTech Innovations",
      duration: "5 months",
      results: ["95% price accuracy", "Real-time insights", "30% faster decisions"]
    },
    {
      title: "EdTech Learning Platform",
      description: "Interactive online learning platform with video streaming, progress tracking, and AI-powered recommendations.",
      image: "https://images.pexels.com/photos/4144923/pexels-photo-4144923.jpeg?auto=compress&cs=tinysrgb&w=800",
      tags: ["EdTech", "Video Streaming", "AI Recommendations", "Learning"],
      link: "/work/edtech-platform",
      client: "EduFuture Academy",
      duration: "7 months",
      results: ["10K+ active users", "85% completion rate", "4.8/5 user rating"]
    }
  ];

  const technologies = [
    { name: "React/Next.js", icon: Globe, projects: 25 },
    { name: "Node.js", icon: Cpu, projects: 20 },
    { name: "Python/AI", icon: Cpu, projects: 15 },
    { name: "Mobile Apps", icon: Zap, projects: 12 },
    { name: "Security Testing", icon: Shield, projects: 18 },
    { name: "Cloud/AWS", icon: Globe, projects: 22 }
  ];

  const stats = [
    { number: "50+", label: "Projects Completed", icon: Zap },
    { number: "30+", label: "Happy Clients", icon: Users },
    { number: "99.9%", label: "Uptime Achieved", icon: Shield },
    { number: "24/7", label: "Support Available", icon: Calendar }
  ];

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="section-padding bg-gradient-to-br from-gray-50 to-primary-50">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-manrope font-bold text-gray-900 mb-6">
              Our <span className="gradient-text">Work</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 leading-relaxed mb-8">
              Discover how we've helped businesses transform their digital presence with innovative solutions
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="#projects" className="btn-primary">
                View Projects
              </a>
              <a href="/contact" className="btn-secondary">
                Start Your Project
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="grid md:grid-cols-4 gap-8">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div key={index} className="text-center p-6 bg-white rounded-2xl shadow-lg border border-gray-100">
                  <div className="w-16 h-16 bg-primary-50 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon className="w-8 h-8 text-primary-500" />
                  </div>
                  <div className="text-3xl font-bold text-primary-500 mb-2">{stat.number}</div>
                  <div className="text-gray-600 font-medium">{stat.label}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Featured Projects */}
      <section id="projects" className="section-padding bg-gray-50">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-manrope font-bold text-gray-900 mb-6">
              Featured <span className="gradient-text">Projects</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              A showcase of our most impactful projects across various industries
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProjects.map((project, index) => (
              <div key={index} className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100 card-hover">
                <CaseStudyCard {...project} />
                
                {/* Additional Project Details */}
                <div className="p-6 border-t border-gray-100">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-gray-500">Client:</span>
                      <div className="font-semibold text-gray-900">{project.client}</div>
                    </div>
                    <div>
                      <span className="text-gray-500">Duration:</span>
                      <div className="font-semibold text-gray-900">{project.duration}</div>
                    </div>
                  </div>
                  
                  <div className="mt-4">
                    <span className="text-gray-500 text-sm">Key Results:</span>
                    <ul className="mt-2 space-y-1">
                      {project.results.map((result, resultIndex) => (
                        <li key={resultIndex} className="text-sm text-gray-700 flex items-center">
                          <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                          {result}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Technologies */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-manrope font-bold text-gray-900 mb-6">
              Technologies We <span className="gradient-text">Master</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our expertise spans across modern technologies and frameworks
            </p>
          </div>

          <div className="grid md:grid-cols-3 lg:grid-cols-6 gap-6">
            {technologies.map((tech, index) => {
              const Icon = tech.icon;
              return (
                <div key={index} className="text-center p-6 bg-white rounded-xl shadow-lg border border-gray-100 card-hover">
                  <div className="w-12 h-12 bg-primary-50 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Icon className="w-6 h-6 text-primary-500" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-1">{tech.name}</h3>
                  <p className="text-sm text-gray-600">{tech.projects} projects</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-manrope font-bold text-gray-900 mb-6">
              Ready to Start Your <span className="gradient-text">Project</span>?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Let's discuss how we can help transform your business with our proven expertise
            </p>
          </div>

          <LeadForm />
        </div>
      </section>
    </div>
  );
}