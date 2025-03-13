
import React from 'react';
import { SidebarProvider } from '@/components/ui/sidebar';
import AppSidebar from '@/components/AppSidebar';
import PricingTiers from '@/components/PricingTiers';
import { BrainCircuit, Sparkles, Bot, Database, Cpu, BarChart } from 'lucide-react';

const AIService = () => {
  const pricingTiers = [
    {
      name: 'Basic',
      price: '$2,500',
      description: 'Essential AI solutions for small businesses and startups.',
      features: [
        { text: 'AI Consultation (10 hours)', included: true },
        { text: 'Custom ML Model Training', included: true },
        { text: 'Data Analysis', included: true },
        { text: 'API Integration', included: true },
        { text: 'Performance Monitoring', included: true },
        { text: 'Model Retraining', included: false },
        { text: 'Enterprise Support', included: false },
        { text: 'Custom Data Pipeline', included: false },
      ],
      buttonText: 'Get Started',
    },
    {
      name: 'Advanced',
      price: '$5,000',
      description: 'Comprehensive AI solutions for growing businesses.',
      features: [
        { text: 'AI Consultation (25 hours)', included: true },
        { text: 'Custom ML Model Training', included: true },
        { text: 'Data Analysis', included: true },
        { text: 'API Integration', included: true },
        { text: 'Performance Monitoring', included: true },
        { text: 'Quarterly Model Retraining', included: true },
        { text: 'Priority Support', included: true },
        { text: 'Custom Data Pipeline', included: false },
      ],
      buttonText: 'Get Started',
      isHighlighted: true,
    },
    {
      name: 'Enterprise',
      price: 'Custom',
      description: 'Full-scale AI transformation for large organizations.',
      features: [
        { text: 'Unlimited AI Consultation', included: true },
        { text: 'Custom ML Model Training', included: true },
        { text: 'Advanced Data Analysis', included: true },
        { text: 'API Integration', included: true },
        { text: 'Real-time Performance Monitoring', included: true },
        { text: 'Monthly Model Retraining', included: true },
        { text: 'Dedicated Support Team', included: true },
        { text: 'Custom Data Pipeline', included: true },
      ],
      buttonText: 'Contact Us',
    },
  ];

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <AppSidebar />
        <div className="flex-1 overflow-auto">
          <main className="max-w-7xl mx-auto px-4 py-12">
            <div className="mb-16">
              <h1 className="text-4xl font-bold mb-6">AI Solutions</h1>
              <p className="text-xl text-muted-foreground mb-8">
                Transform your business with cutting-edge artificial intelligence solutions tailored to your needs.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
                <div className="bg-card p-6 rounded-xl border border-border">
                  <BrainCircuit className="h-10 w-10 text-primary mb-4" />
                  <h3 className="text-xl font-bold mb-2">Predictive Analytics</h3>
                  <p className="text-muted-foreground">
                    Leverage your data to forecast trends, behaviors, and outcomes with impressive accuracy.
                  </p>
                </div>
                
                <div className="bg-card p-6 rounded-xl border border-border">
                  <Bot className="h-10 w-10 text-primary mb-4" />
                  <h3 className="text-xl font-bold mb-2">Conversational AI</h3>
                  <p className="text-muted-foreground">
                    Create engaging, personalized chatbots and virtual assistants for customer service and support.
                  </p>
                </div>
                
                <div className="bg-card p-6 rounded-xl border border-border">
                  <Sparkles className="h-10 w-10 text-primary mb-4" />
                  <h3 className="text-xl font-bold mb-2">Computer Vision</h3>
                  <p className="text-muted-foreground">
                    Implement image and video analysis for object detection, recognition, and classification.
                  </p>
                </div>
                
                <div className="bg-card p-6 rounded-xl border border-border">
                  <Database className="h-10 w-10 text-primary mb-4" />
                  <h3 className="text-xl font-bold mb-2">Data Mining</h3>
                  <p className="text-muted-foreground">
                    Discover patterns and extract valuable insights from large datasets to drive decision-making.
                  </p>
                </div>
                
                <div className="bg-card p-6 rounded-xl border border-border">
                  <Cpu className="h-10 w-10 text-primary mb-4" />
                  <h3 className="text-xl font-bold mb-2">AI Infrastructure</h3>
                  <p className="text-muted-foreground">
                    Build scalable machine learning pipelines and infrastructure to support your AI initiatives.
                  </p>
                </div>
                
                <div className="bg-card p-6 rounded-xl border border-border">
                  <BarChart className="h-10 w-10 text-primary mb-4" />
                  <h3 className="text-xl font-bold mb-2">Recommendation Systems</h3>
                  <p className="text-muted-foreground">
                    Develop personalized recommendation engines to enhance user experience and boost engagement.
                  </p>
                </div>
              </div>

              <div className="mb-16">
                <h2 className="text-3xl font-bold mb-4">Our Approach</h2>
                <p className="text-lg mb-4">
                  We follow a proven methodology to deliver successful AI solutions:
                </p>
                <ol className="list-decimal pl-5 space-y-2">
                  <li className="text-lg">Discovery - Understanding your business needs and data landscape</li>
                  <li className="text-lg">Strategy - Developing a tailored AI roadmap</li>
                  <li className="text-lg">Development - Building and training custom models</li>
                  <li className="text-lg">Integration - Seamlessly incorporating AI into your existing systems</li>
                  <li className="text-lg">Monitoring - Ensuring performance and continuous improvement</li>
                </ol>
              </div>
            </div>

            <PricingTiers 
              serviceTitle="AI Solutions"
              serviceDescription="Choose the right plan for your artificial intelligence needs with our flexible pricing options."
              tiers={pricingTiers}
            />
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default AIService;
