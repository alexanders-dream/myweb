
import { useState } from 'react';
import { Brain, Layers, Video, Globe, ArrowRight, Bot, Smartphone, Database, FileCode } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Service {
  id: string;
  icon: React.ReactNode;
  title: string;
  description: string;
  benefits: string[];
}

const Services = () => {
  const [activeService, setActiveService] = useState<string>('ai');
  
  const services: Service[] = [
    {
      id: 'ai',
      icon: <Brain className="w-8 h-8" />,
      title: 'Artificial Intelligence',
      description: 'Harness the power of AI to automate processes, gain insights, and create personalized experiences for your customers.',
      benefits: [
        'Predictive analytics and data modeling',
        'AI-powered customer experiences',
        'Process automation and optimization',
        'Natural language processing solutions',
        'Computer vision implementation'
      ]
    },
    {
      id: 'xr',
      icon: <Layers className="w-8 h-8" />,
      title: 'Extended Reality (XR)',
      description: 'Create immersive experiences that blend digital and physical worlds using AR, VR, and MR technologies.',
      benefits: [
        'Virtual showrooms and product visualizations',
        'Augmented reality applications',
        'Virtual reality training solutions',
        'Mixed reality workplace innovations',
        'Immersive brand experiences'
      ]
    },
    {
      id: 'multimedia',
      icon: <Video className="w-8 h-8" />,
      title: 'Multimedia Content',
      description: 'Engage your audience with compelling multimedia content designed for the digital age.',
      benefits: [
        'Interactive storytelling experiences',
        'Video production and animation',
        '3D modeling and visualization',
        'Digital marketing assets',
        'Social media content strategies'
      ]
    },
    {
      id: 'digital',
      icon: <Globe className="w-8 h-8" />,
      title: 'Digital Transformation',
      description: 'Strategically evolve your business with comprehensive digital transformation solutions.',
      benefits: [
        'Digital strategy development',
        'Technology stack optimization',
        'Business process digitization',
        'Cloud migration services',
        'Digital workplace solutions'
      ]
    }
  ];
  
  const activeServiceData = services.find(service => service.id === activeService);
  
  return (
    <section id="services" className="py-20 md:py-32 overflow-hidden relative">
      <div className="absolute inset-0 noise-bg opacity-50 pointer-events-none"></div>
      <div className="section-container relative z-10">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between mb-12 md:mb-20">
            <div className="mb-10 md:mb-0">
              <h2 className="section-title">
                Our <span className="gradient-text from-indigo-600 via-purple-600 to-indigo-600">Services</span>
              </h2>
              <p className="section-subtitle max-w-2xl">
                We provide end-to-end solutions that help organizations adapt, innovate, and thrive in the digital era.
              </p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {/* Service Categories */}
            <div className="col-span-1">
              <div className="flex flex-col space-y-4 sticky top-24">
                {services.map((service) => (
                  <button
                    key={service.id}
                    onClick={() => setActiveService(service.id)}
                    className={cn(
                      "flex items-start p-4 rounded-lg text-left transition-all duration-300 ease-in-out",
                      activeService === service.id
                        ? "bg-secondary shadow-md"
                        : "hover:bg-secondary/50"
                    )}
                  >
                    <div className={cn(
                      "flex-shrink-0 mr-4 p-2 rounded-md transition-colors",
                      activeService === service.id
                        ? "bg-primary text-white"
                        : "bg-secondary"
                    )}>
                      {service.icon}
                    </div>
                    <div>
                      <h3 className="font-medium text-lg mb-1">{service.title}</h3>
                      <p className="text-sm text-muted-foreground line-clamp-2">
                        {service.description}
                      </p>
                    </div>
                  </button>
                ))}
              </div>
            </div>
            
            {/* Service Details */}
            <div className="col-span-1 md:col-span-2">
              <div className="glass-panel rounded-2xl p-6 md:p-8 transition-all duration-500 ease-in-out">
                <h3 className="text-2xl md:text-3xl font-bold mb-4 flex items-center">
                  {activeServiceData?.icon}
                  <span className="ml-3">{activeServiceData?.title}</span>
                </h3>
                
                <p className="text-lg mb-8">
                  {activeServiceData?.description}
                </p>
                
                <h4 className="text-lg font-medium mb-4">Key Benefits</h4>
                <ul className="space-y-3 mb-8">
                  {activeServiceData?.benefits.map((benefit, index) => (
                    <li key={index} className="flex items-start">
                      <div className="flex-shrink-0 w-5 h-5 rounded-full bg-primary/10 text-primary flex items-center justify-center mr-3 mt-0.5">
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>
                
                <div className="flex justify-start">
                  <a 
                    href="#contact" 
                    className="flex items-center space-x-2 text-primary hover:text-primary/80 transition-colors"
                  >
                    <span>Discuss your project</span>
                    <ArrowRight className="w-4 h-4" />
                  </a>
                </div>
              </div>
              
              {/* Technology Icons */}
              <div className="mt-10 grid grid-cols-3 sm:grid-cols-5 gap-6 text-center">
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center mb-2">
                    <Bot className="w-6 h-6 text-primary" />
                  </div>
                  <span className="text-sm text-muted-foreground">AI Models</span>
                </div>
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center mb-2">
                    <Smartphone className="w-6 h-6 text-primary" />
                  </div>
                  <span className="text-sm text-muted-foreground">Mobile AR</span>
                </div>
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center mb-2">
                    <Database className="w-6 h-6 text-primary" />
                  </div>
                  <span className="text-sm text-muted-foreground">Big Data</span>
                </div>
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center mb-2">
                    <FileCode className="w-6 h-6 text-primary" />
                  </div>
                  <span className="text-sm text-muted-foreground">ML Ops</span>
                </div>
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center mb-2">
                    <Globe className="w-6 h-6 text-primary" />
                  </div>
                  <span className="text-sm text-muted-foreground">Cloud</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;
