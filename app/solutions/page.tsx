import { Metadata } from 'next';
import { Bot, Brain, Cpu, Zap, MessageSquare, BarChart3, Shield, Workflow } from 'lucide-react';
import CaseStudyCard from '@/components/CaseStudyCard';
import LeadForm from '@/components/LeadForm';

export const metadata: Metadata = {
  title: 'AI/ML Solutions & Chatbots - Botifyx | Intelligent Automation',
  description: 'Advanced AI/ML solutions and intelligent chatbots. Custom machine learning models, natural language processing, computer vision, and automation solutions.',
  keywords: 'AI solutions, machine learning, chatbots, automation, NLP, computer vision, predictive analytics',
};

export default function SolutionsPage() {
  const solutions = [
    {
      icon: Bot,
      title: "Intelligent Chatbots",
      description: "AI-powered conversational agents that provide 24/7 customer support and enhance user engagement.",
      features: [
        "Natural language understanding",
        "Multi-platform integration",
        "Contextual conversations",
        "Sentiment analysis",
        "Analytics dashboard",
        "Continuous learning"
      ],
      benefits: [
        "Reduce support costs by 60%",
        "24/7 availability",
        "Instant response times",
        "Scalable customer service"
      ],
      color: "text-blue-500",
      bgColor: "bg-blue-50",
      borderColor: "border-blue-200"
    },
    {
      icon: Brain,
      title: "Machine Learning Models",
      description: "Custom ML models tailored to your business needs for predictive analytics and intelligent decision making.",
      features: [
        "Predictive analytics",
        "Classification models",
        "Recommendation systems",
        "Anomaly detection",
        "Time series forecasting",
        "Model deployment & monitoring"
      ],
      benefits: [
        "Data-driven insights",
        "Automated decision making",
        "Improved accuracy",
        "Competitive advantage"
      ],
      color: "text-purple-500",
      bgColor: "bg-purple-50",
      borderColor: "border-purple-200"
    },
    {
      icon: MessageSquare,
      title: "Natural Language Processing",
      description: "Advanced NLP solutions for text analysis, sentiment analysis, and language understanding.",
      features: [
        "Text classification",
        "Sentiment analysis",
        "Named entity recognition",
        "Language translation",
        "Content generation",
        "Document processing"
      ],
      benefits: [
        "Automated content analysis",
        "Improved customer insights",
        "Multilingual support",
        "Enhanced user experience"
      ],
      color: "text-green-500",
      bgColor: "bg-green-50",
      borderColor: "border-green-200"
    },
    {
      icon: Cpu,
      title: "Computer Vision",
      description: "Image and video analysis solutions for object detection, recognition, and automated visual inspection.",
      features: [
        "Object detection & recognition",
        "Image classification",
        "Facial recognition",
        "Quality inspection",
        "Video analytics",
        "Real-time processing"
      ],
      benefits: [
        "Automated quality control",
        "Enhanced security",
        "Reduced manual inspection",
        "Real-time monitoring"
      ],
      color: "text-red-500",
      bgColor: "bg-red-50",
      borderColor: "border-red-200"
    },
    {
      icon: BarChart3,
      title: "Predictive Analytics",
      description: "Forecast trends, predict outcomes, and make data-driven decisions with advanced analytics solutions.",
      features: [
        "Demand forecasting",
        "Risk assessment",
        "Customer behavior prediction",
        "Market trend analysis",
        "Performance optimization",
        "Real-time dashboards"
      ],
      benefits: [
        "Better planning & forecasting",
        "Risk mitigation",
        "Optimized operations",
        "Increased profitability"
      ],
      color: "text-yellow-500",
      bgColor: "bg-yellow-50",
      borderColor: "border-yellow-200"
    },
    {
      icon: Workflow,
      title: "Process Automation",
      description: "Intelligent automation solutions to streamline workflows and eliminate repetitive tasks.",
      features: [
        "Robotic process automation",
        "Workflow optimization",
        "Document processing",
        "Data extraction",
        "Task scheduling",
        "Integration APIs"
      ],
      benefits: [
        "Increased efficiency",
        "Reduced errors",
        "Cost savings",
        "Employee satisfaction"
      ],
      color: "text-primary-500",
      bgColor: "bg-primary-50",
      borderColor: "border-primary-200"
    }
  ];

  const caseStudies = [
    {
      title: "E-commerce Recommendation Engine",
      description: "AI-powered product recommendation system that increased sales by 35% through personalized suggestions.",
      image: "https://images.pexels.com/photos/230544/pexels-photo-230544.jpeg?auto=compress&cs=tinysrgb&w=800",
      tags: ["Machine Learning", "E-commerce", "Recommendations"],
      link: "/work/recommendation-engine"
    },
    {
      title: "Customer Service Chatbot",
      description: "Intelligent chatbot that handles 80% of customer queries automatically, reducing response time by 90%.",
      image: "https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=800",
      tags: ["Chatbot", "NLP", "Customer Service"],
      link: "/work/customer-chatbot"
    },
    {
      title: "Quality Control Vision System",
      description: "Computer vision solution for automated quality inspection in manufacturing, achieving 99.5% accuracy.",
      image: "https://images.pexels.com/photos/2599244/pexels-photo-2599244.jpeg?auto=compress&cs=tinysrgb&w=800",
      tags: ["Computer Vision", "Manufacturing", "Quality Control"],
      link: "/work/quality-vision"
    }
  ];

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="section-padding bg-gradient-to-br from-gray-50 to-primary-50">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-manrope font-bold text-gray-900 mb-6">
              AI/ML <span className="gradient-text">Solutions</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 leading-relaxed mb-8">
              Transform your business with intelligent automation, predictive analytics, and cutting-edge AI solutions
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="#solutions" className="btn-primary">
                Explore Solutions
              </a>
              <a href="#contact" className="btn-secondary">
                Get AI Consultation
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Solutions Grid */}
      <section id="solutions" className="section-padding">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-manrope font-bold text-gray-900 mb-6">
              Our AI/ML <span className="gradient-text">Solutions</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Harness the power of artificial intelligence to automate processes, gain insights, and drive innovation
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {solutions.map((solution, index) => {
              const Icon = solution.icon;
              return (
                <div
                  key={index}
                  className={`group p-8 bg-white rounded-2xl shadow-lg border-2 ${solution.borderColor} card-hover transition-all duration-500`}
                >
                  <div className="flex items-start space-x-6">
                    <div className={`w-16 h-16 ${solution.bgColor} rounded-2xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300`}>
                      <Icon className={`w-8 h-8 ${solution.color}`} />
                    </div>
                    
                    <div className="flex-1">
                      <h3 className="text-2xl font-manrope font-bold text-gray-900 mb-3">
                        {solution.title}
                      </h3>
                      
                      <p className="text-gray-600 mb-6 leading-relaxed">
                        {solution.description}
                      </p>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6 mt-6">
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3">Features</h4>
                      <ul className="space-y-2">
                        {solution.features.map((feature, featureIndex) => (
                          <li key={featureIndex} className="flex items-center text-sm text-gray-700">
                            <div className={`flex-shrink-0`}></div>
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3">Benefits</h4>
                      <ul className="space-y-2">
                        {solution.benefits.map((benefit, benefitIndex) => (
                          <li key={benefitIndex} className="flex items-center text-sm text-gray-700">
                            <div className="flex-shrink-0"></div>
                            {benefit}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="mt-6 pt-6 border-t border-gray-100">
                    <a
                      href="#contact"
                      className={`inline-flex items-center ${solution.color} font-semibold text-sm hover:underline`}
                    >
                      Learn more about {solution.title.toLowerCase()}
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Case Studies */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-manrope font-bold text-gray-900 mb-6">
              AI Success <span className="gradient-text">Stories</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              See how our AI/ML solutions have transformed businesses across industries
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {caseStudies.map((study, index) => (
              <CaseStudyCard key={index} {...study} />
            ))}
          </div>
        </div>
      </section>

      {/* Technology Stack */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-manrope font-bold text-gray-900 mb-6">
              Our AI/ML <span className="gradient-text">Tech Stack</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We use cutting-edge technologies and frameworks to build robust AI solutions
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            {[
              { name: "TensorFlow", category: "Deep Learning" },
              { name: "PyTorch", category: "Neural Networks" },
              { name: "scikit-learn", category: "Machine Learning" },
              { name: "OpenCV", category: "Computer Vision" },
              { name: "spaCy", category: "NLP" },
              { name: "Hugging Face", category: "Transformers" },
              { name: "AWS SageMaker", category: "ML Platform" },
              { name: "Docker", category: "Deployment" }
            ].map((tech, index) => (
              <div key={index} className="text-center p-6 bg-white rounded-xl shadow-lg border border-gray-100 card-hover">
                <div className="w-16 h-16 bg-primary-50 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Cpu className="w-8 h-8 text-primary-500" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">{tech.name}</h3>
                <p className="text-sm text-gray-600">{tech.category}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section id="contact" className="section-padding bg-gray-50">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-manrope font-bold text-gray-900 mb-6">
              Ready to Implement <span className="gradient-text">AI Solutions</span>?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Let's discuss how AI can transform your business and create competitive advantages
            </p>
          </div>

          <LeadForm />
        </div>
      </section>
    </div>
  );
}