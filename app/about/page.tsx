import { Metadata } from 'next';
import { Users, Target, Award, Globe, Heart, Lightbulb, Shield, Zap } from 'lucide-react';
import Image from 'next/image';

export const metadata: Metadata = {
  title: 'About Us - Botifyx | Expert Web Development Team',
  description: 'Learn about Botifyx - a passionate team of developers, designers, and AI specialists dedicated to building exceptional digital solutions.',
  keywords: 'about Botifyx, web development team, AI specialists, company story, mission, values',
};

export default function AboutPage() {
  const team = [
    {
      name: "Arjun Patel",
      role: "Founder & CEO",
      image: "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=300",
      bio: "Full-stack developer with 8+ years of experience in building scalable web applications and AI solutions."
    },
    {
      name: "Priya Sharma",
      role: "CTO & AI Lead",
      image: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=300",
      bio: "AI/ML expert with expertise in natural language processing and computer vision applications."
    },
    {
      name: "Rahul Kumar",
      role: "Lead Developer",
      image: "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=300",
      bio: "Frontend specialist passionate about creating beautiful, user-friendly interfaces and experiences."
    },
    {
      name: "Sneha Gupta",
      role: "QA & Testing Lead",
      image: "https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=300",
      bio: "Quality assurance expert ensuring every project meets the highest standards of reliability and security."
    }
  ];

  const values = [
    {
      icon: Heart,
      title: "Client-First Approach",
      description: "We put our clients' success at the center of everything we do, building long-term partnerships based on trust and results."
    },
    {
      icon: Lightbulb,
      title: "Innovation & Excellence",
      description: "We stay ahead of technology trends and continuously improve our skills to deliver cutting-edge solutions."
    },
    {
      icon: Shield,
      title: "Security & Reliability",
      description: "We prioritize security and reliability in every project, ensuring your business and data are always protected."
    },
    {
      icon: Zap,
      title: "Speed & Efficiency",
      description: "We deliver projects on time without compromising quality, helping you get to market faster."
    }
  ];

  const stats = [
    { number: "50+", label: "Projects Completed" },
    { number: "30+", label: "Happy Clients" },
    { number: "5+", label: "Years Experience" },
    { number: "99.9%", label: "Client Satisfaction" }
  ];

  const timeline = [
    {
      year: "2019",
      title: "Company Founded",
      description: "Started as a small team with a big vision to transform businesses through technology."
    },
    {
      year: "2020",
      title: "First Major Client",
      description: "Delivered our first enterprise-level project, establishing our reputation for quality."
    },
    {
      year: "2021",
      title: "AI Specialization",
      description: "Expanded into AI/ML solutions, helping clients automate and optimize their processes."
    },
    {
      year: "2022",
      title: "Team Expansion",
      description: "Grew our team to include specialists in security testing and mobile development."
    },
    {
      year: "2023",
      title: "50+ Projects",
      description: "Reached the milestone of 50+ successful projects across various industries."
    },
    {
      year: "2024",
      title: "Innovation Focus",
      description: "Continuing to innovate with cutting-edge technologies and expanding our service offerings."
    }
  ];

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="section-padding bg-gradient-to-br from-gray-50 to-primary-50">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-manrope font-bold text-gray-900 mb-6">
              About <span className="gradient-text">Botifyx</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 leading-relaxed mb-8">
              We're a passionate team of developers, designers, and AI specialists dedicated to building exceptional digital solutions that drive business growth.
            </p>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl md:text-5xl font-manrope font-bold text-gray-900 mb-6">
                Our <span className="gradient-text">Mission</span>
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed mb-6">
                To empower businesses with innovative technology solutions that drive growth, efficiency, and success. We believe in building fast, testing hard, and shipping secure solutions that make a real difference.
              </p>
              <p className="text-lg text-gray-600 leading-relaxed">
                Our vision is to be the go-to technology partner for businesses looking to transform their digital presence and leverage the power of AI and modern web technologies.
              </p>
            </div>
            
            <div className="relative">
              <div className="bg-white p-8 rounded-2xl shadow-xl border border-gray-100">
                <div className="grid grid-cols-2 gap-6">
                  {stats.map((stat, index) => (
                    <div key={index} className="text-center">
                      <div className="text-3xl font-bold text-primary-500 mb-2">{stat.number}</div>
                      <div className="text-sm text-gray-600">{stat.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-manrope font-bold text-gray-900 mb-6">
              Our <span className="gradient-text">Values</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              The principles that guide everything we do
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <div key={index} className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 text-center card-hover">
                  <div className="w-16 h-16 bg-primary-50 rounded-2xl flex items-center justify-center mx-auto mb-6">
                    <Icon className="w-8 h-8 text-primary-500" />
                  </div>
                  <h3 className="text-xl font-manrope font-bold text-gray-900 mb-4">
                    {value.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {value.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-manrope font-bold text-gray-900 mb-6">
              Meet Our <span className="gradient-text">Team</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              The talented individuals behind Botifyx's success
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <div key={index} className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100 card-hover">
                <div className="relative h-64">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-manrope font-bold text-gray-900 mb-2">
                    {member.name}
                  </h3>
                  <p className="text-primary-500 font-semibold mb-3">
                    {member.role}
                  </p>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {member.bio}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-manrope font-bold text-gray-900 mb-6">
              Our <span className="gradient-text">Journey</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Key milestones in our growth and evolution
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="relative">
              {/* Timeline Line */}
              <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-primary-200"></div>
              
              <div className="space-y-12">
                {timeline.map((item, index) => (
                  <div key={index} className="relative flex items-start space-x-8">
                    {/* Timeline Dot */}
                    <div className="w-16 h-16 bg-primary-500 rounded-full flex items-center justify-center text-white font-bold text-lg flex-shrink-0 relative z-10">
                      {item.year}
                    </div>
                    
                    {/* Content */}
                    <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 flex-1">
                      <h3 className="text-xl font-manrope font-bold text-gray-900 mb-3">
                        {item.title}
                      </h3>
                      <p className="text-gray-600 leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-manrope font-bold text-gray-900 mb-6">
              Ready to Work <span className="gradient-text">Together</span>?
            </h2>
            <p className="text-xl text-gray-600 leading-relaxed mb-8">
              Let's discuss how we can help transform your business with our expertise and passion for technology.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="/contact" className="btn-primary">
                Start Your Project
              </a>
              <a href="/work" className="btn-secondary">
                View Our Work
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}