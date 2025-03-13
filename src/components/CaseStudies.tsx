
import { useState } from 'react';
import { ArrowRight, ExternalLink } from 'lucide-react';
import { cn } from '@/lib/utils';

interface CaseStudy {
  id: string;
  title: string;
  category: string;
  description: string;
  image: string;
  results: {
    metric: string;
    value: string;
  }[];
}

const CaseStudies = () => {
  const [activeCaseIndex, setActiveCaseIndex] = useState(0);
  
  const caseStudies: CaseStudy[] = [
    {
      id: 'retail-ai',
      title: 'AI-Powered Retail Experience',
      category: 'Artificial Intelligence',
      description: 'Developed an AI-powered recommendation system for a luxury retail brand, increasing conversion rates and average order value through personalized shopping experiences.',
      image: 'https://images.unsplash.com/photo-1581287053822-fd7bf4f4bfec?q=80&w=2662&auto=format&fit=crop',
      results: [
        { metric: 'Conversion Rate', value: '+28%' },
        { metric: 'Avg. Order Value', value: '+35%' },
        { metric: 'Customer Retention', value: '+40%' }
      ]
    },
    {
      id: 'vr-training',
      title: 'VR Safety Training Platform',
      category: 'Extended Reality',
      description: 'Created an immersive VR training platform for industrial safety procedures, reducing training time and improving knowledge retention among employees.',
      image: 'https://images.unsplash.com/photo-1622979135160-18e2d87e0358?q=80&w=2574&auto=format&fit=crop',
      results: [
        { metric: 'Training Time', value: '-45%' },
        { metric: 'Knowledge Retention', value: '+67%' },
        { metric: 'Safety Incidents', value: '-51%' }
      ]
    },
    {
      id: 'digital-transformation',
      title: 'Digital Transformation Strategy',
      category: 'Digital Transformation',
      description: 'Guided a legacy financial services company through a comprehensive digital transformation, modernizing their tech stack and optimizing customer journeys.',
      image: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?q=80&w=2670&auto=format&fit=crop',
      results: [
        { metric: 'Operational Costs', value: '-32%' },
        { metric: 'Customer Satisfaction', value: '+48%' },
        { metric: 'Process Efficiency', value: '+72%' }
      ]
    }
  ];
  
  const activeCase = caseStudies[activeCaseIndex];
  
  return (
    <section id="case-studies" className="py-20 md:py-32 bg-secondary/30">
      <div className="section-container">
        <div className="text-center mb-16">
          <h2 className="section-title">
            Case <span className="gradient-text from-indigo-600 via-purple-600 to-indigo-600">Studies</span>
          </h2>
          <p className="section-subtitle mx-auto">
            Explore how we've helped organizations across industries achieve their digital transformation goals.
          </p>
        </div>
        
        <div className="flex justify-center mb-10">
          <div className="flex space-x-2 p-1 bg-secondary rounded-full">
            {caseStudies.map((caseStudy, index) => (
              <button
                key={caseStudy.id}
                onClick={() => setActiveCaseIndex(index)}
                className={cn(
                  "py-2 px-4 text-sm font-medium rounded-full transition-all duration-300",
                  activeCaseIndex === index
                    ? "bg-primary text-white shadow-md"
                    : "text-foreground hover:bg-secondary-foreground/5"
                )}
              >
                {caseStudy.category}
              </button>
            ))}
          </div>
        </div>
        
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            {/* Image */}
            <div className="order-2 lg:order-1 relative">
              <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-xl transition-all duration-500">
                <img
                  src={activeCase.image}
                  alt={activeCase.title}
                  className="w-full h-full object-cover transform transition-transform duration-700 hover:scale-105"
                />
              </div>
              
              {/* Results */}
              <div className="grid grid-cols-3 gap-4 mt-4">
                {activeCase.results.map((result, index) => (
                  <div key={index} className="glass-panel rounded-xl p-4 text-center transform transition-transform duration-300 hover:translate-y-[-5px]">
                    <div className="text-2xl md:text-3xl font-bold text-primary mb-1">
                      {result.value}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {result.metric}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Content */}
            <div className="order-1 lg:order-2">
              <div className="mb-4">
                <span className="inline-block px-3 py-1 bg-primary/10 text-primary text-sm font-medium rounded-full mb-4">
                  {activeCase.category}
                </span>
                <h3 className="text-2xl md:text-4xl font-bold mb-4">
                  {activeCase.title}
                </h3>
                <p className="text-lg text-muted-foreground mb-6">
                  {activeCase.description}
                </p>
                
                <ul className="space-y-3 mb-8">
                  <li className="flex items-start">
                    <div className="flex-shrink-0 w-5 h-5 rounded-full bg-primary/10 text-primary flex items-center justify-center mr-3 mt-0.5">
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span>Identified key business challenges</span>
                  </li>
                  <li className="flex items-start">
                    <div className="flex-shrink-0 w-5 h-5 rounded-full bg-primary/10 text-primary flex items-center justify-center mr-3 mt-0.5">
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span>Developed custom technology solutions</span>
                  </li>
                  <li className="flex items-start">
                    <div className="flex-shrink-0 w-5 h-5 rounded-full bg-primary/10 text-primary flex items-center justify-center mr-3 mt-0.5">
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span>Implemented seamless integration</span>
                  </li>
                  <li className="flex items-start">
                    <div className="flex-shrink-0 w-5 h-5 rounded-full bg-primary/10 text-primary flex items-center justify-center mr-3 mt-0.5">
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span>Provided ongoing support and optimization</span>
                  </li>
                </ul>
                
                <a 
                  href="#contact" 
                  className="inline-flex items-center space-x-2 text-primary hover:text-primary/80 transition-colors group"
                >
                  <span>Discuss a similar project</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CaseStudies;
