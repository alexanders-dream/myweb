
import React from 'react';
import { SidebarProvider } from '@/components/ui/sidebar';
import AppSidebar from '@/components/AppSidebar';
import PricingTiers from '@/components/PricingTiers';
import { Database, LineChart, ServerCog, Share2, PieChart, FileSpreadsheet } from 'lucide-react';

const DataService = () => {
  const pricingTiers = [
    {
      name: 'Basic',
      price: '$2,000',
      description: 'Essential data analytics for small businesses.',
      features: [
        { text: 'Data Consultation (8 hours)', included: true },
        { text: 'Data Cleansing & Preparation', included: true },
        { text: 'Basic Data Visualization', included: true },
        { text: 'Monthly Reports', included: true },
        { text: 'Data Storage (up to 100GB)', included: true },
        { text: 'Advanced Analytics', included: false },
        { text: 'Real-time Dashboards', included: false },
        { text: 'Custom Data Pipeline', included: false },
      ],
      buttonText: 'Get Started',
    },
    {
      name: 'Advanced',
      price: '$4,500',
      description: 'Comprehensive analytics for growing businesses.',
      features: [
        { text: 'Data Consultation (20 hours)', included: true },
        { text: 'Data Cleansing & Preparation', included: true },
        { text: 'Advanced Data Visualization', included: true },
        { text: 'Weekly Reports', included: true },
        { text: 'Data Storage (up to 500GB)', included: true },
        { text: 'Predictive Analytics', included: true },
        { text: 'Interactive Dashboards', included: true },
        { text: 'Custom Data Pipeline', included: false },
      ],
      buttonText: 'Get Started',
      isHighlighted: true,
    },
    {
      name: 'Enterprise',
      price: 'Custom',
      description: 'Full-scale data solutions for large organizations.',
      features: [
        { text: 'Unlimited Data Consultation', included: true },
        { text: 'Advanced Data Cleansing', included: true },
        { text: 'Custom Visualization Suite', included: true },
        { text: 'Daily Reports & Alerts', included: true },
        { text: 'Unlimited Data Storage', included: true },
        { text: 'Advanced Predictive Models', included: true },
        { text: 'Real-time Interactive Dashboards', included: true },
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
              <h1 className="text-4xl font-bold mb-6">Data Analytics</h1>
              <p className="text-xl text-muted-foreground mb-8">
                Unlock the power of your data with comprehensive analytics solutions that drive informed decision-making.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
                <div className="bg-card p-6 rounded-xl border border-border">
                  <Database className="h-10 w-10 text-primary mb-4" />
                  <h3 className="text-xl font-bold mb-2">Data Management</h3>
                  <p className="text-muted-foreground">
                    Comprehensive data collection, cleaning, and storage solutions to ensure high-quality inputs.
                  </p>
                </div>
                
                <div className="bg-card p-6 rounded-xl border border-border">
                  <LineChart className="h-10 w-10 text-primary mb-4" />
                  <h3 className="text-xl font-bold mb-2">Business Intelligence</h3>
                  <p className="text-muted-foreground">
                    Transform raw data into actionable insights with interactive dashboards and reports.
                  </p>
                </div>
                
                <div className="bg-card p-6 rounded-xl border border-border">
                  <PieChart className="h-10 w-10 text-primary mb-4" />
                  <h3 className="text-xl font-bold mb-2">Data Visualization</h3>
                  <p className="text-muted-foreground">
                    Create compelling visual representations of complex data to communicate insights effectively.
                  </p>
                </div>
                
                <div className="bg-card p-6 rounded-xl border border-border">
                  <ServerCog className="h-10 w-10 text-primary mb-4" />
                  <h3 className="text-xl font-bold mb-2">Big Data Processing</h3>
                  <p className="text-muted-foreground">
                    Handle large volumes of data with scalable processing solutions for complex analytics.
                  </p>
                </div>
                
                <div className="bg-card p-6 rounded-xl border border-border">
                  <Share2 className="h-10 w-10 text-primary mb-4" />
                  <h3 className="text-xl font-bold mb-2">Data Integration</h3>
                  <p className="text-muted-foreground">
                    Connect data from multiple sources to create unified analytics and reporting systems.
                  </p>
                </div>
                
                <div className="bg-card p-6 rounded-xl border border-border">
                  <FileSpreadsheet className="h-10 w-10 text-primary mb-4" />
                  <h3 className="text-xl font-bold mb-2">Custom Reporting</h3>
                  <p className="text-muted-foreground">
                    Develop tailored reports and analytics solutions that address your specific business questions.
                  </p>
                </div>
              </div>

              <div className="mb-16">
                <h2 className="text-3xl font-bold mb-4">Our Data Analytics Process</h2>
                <p className="text-lg mb-4">
                  We follow a proven methodology to turn your data into business value:
                </p>
                <ol className="list-decimal pl-5 space-y-2">
                  <li className="text-lg">Assessment - Evaluate existing data and business objectives</li>
                  <li className="text-lg">Collection - Gather and integrate data from relevant sources</li>
                  <li className="text-lg">Processing - Clean, transform, and prepare data for analysis</li>
                  <li className="text-lg">Analysis - Apply statistical methods and analytics models</li>
                  <li className="text-lg">Visualization - Create intuitive dashboards and reports</li>
                  <li className="text-lg">Implementation - Deploy solutions and train your team</li>
                </ol>
              </div>
            </div>

            <PricingTiers 
              serviceTitle="Data Analytics"
              serviceDescription="Choose the analytics package that best suits your business needs and data complexity."
              tiers={pricingTiers}
            />
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default DataService;
