import Hero from '@/components/Hero';
import ValueProps from '@/components/ValueProps';
import Process from '@/components/Process';
import CaseStudyCard from '@/components/CaseStudyCard';
import Testimonial from '@/components/Testimonial';
// import PricingCards from '@/components/PricingCards';

export default function Home() {
  const caseStudies = [
    {
      title: "E-commerce Platform Overhaul",
      description: "Complete redesign and development of a high-traffic e-commerce platform with advanced security testing.",
      image: "https://images.pexels.com/photos/230544/pexels-photo-230544.jpeg?auto=compress&cs=tinysrgb&w=800",
      tags: ["Full-Stack", "Security Testing", "Performance"],
      link: "/work/ecommerce-platform"
    },
    {
      title: "AI-Powered Chatbot Solution",
      description: "Custom chatbot development with natural language processing for customer service automation.",
      image: "https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=800",
      tags: ["AI/ML", "Chatbot", "Automation"],
      link: "/work/ai-chatbot"
    },
    {
      title: "Mobile Banking App",
      description: "Secure mobile banking application with comprehensive functional and security testing.",
      image: "https://images.pexels.com/photos/4386321/pexels-photo-4386321.jpeg?auto=compress&cs=tinysrgb&w=800",
      tags: ["Mobile", "Security", "Banking"],
      link: "/work/mobile-banking"
    }
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      company: "TechStart Inc.",
      role: "CTO",
      content: "Botifyx delivered our project ahead of schedule with exceptional quality. Their testing approach caught critical issues we never would have found.",
      avatar: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150"
    },
    {
      name: "Michael Chen",
      company: "Digital Solutions Ltd",
      role: "Product Manager",
      content: "The AI chatbot they built for us increased our customer satisfaction by 40%. Outstanding work and ongoing support.",
      avatar: "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150"
    }
  ];

  return (
    <>
      <Hero />
      <ValueProps />
      <Process />
      
      {/* Case Studies Section */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-manrope font-bold text-gray-900 mb-6">
              Our Latest <span className="gradient-text">Success Stories</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              See how we've helped businesses transform their digital presence with cutting-edge solutions
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {caseStudies.map((study, index) => (
              <CaseStudyCard key={index} {...study} />
            ))}
          </div>
          
          <div className="text-center mt-12">
            <a href="/work" className="btn-primary inline-block">
              View All Case Studies
            </a>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-manrope font-bold text-gray-900 mb-6">
              What Our <span className="gradient-text">Clients Say</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Don't just take our word for it - hear from the businesses we've helped succeed
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <Testimonial key={index} {...testimonial} />
            ))}
          </div>
        </div>
      </section>

      {/* <PricingCards /> */}
    </>
  );
}