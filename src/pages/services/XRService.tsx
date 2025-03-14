
import React, { useState, useEffect } from 'react';
import { SidebarProvider } from '@/components/ui/sidebar';
import AppSidebar from '@/components/AppSidebar';
import PricingTiers from '@/components/PricingTiers';
import VideoBackground from '@/components/VideoBackground';
import { Layers, Glasses, Smartphone, GalleryHorizontal, Laptop, CaseSensitive } from 'lucide-react';

const XRService = () => {
  const [videoUrl, setVideoUrl] = useState('https://www.youtube.com/embed/2JgEzN7LYVo');
  
  // Try to load service data from localStorage
  useEffect(() => {
    const savedServices = localStorage.getItem('siteServices');
    if (savedServices) {
      try {
        const parsedServices = JSON.parse(savedServices);
        const xrService = parsedServices.find((s: any) => s.id === 'xr');
        if (xrService && xrService.videoUrl) {
          setVideoUrl(xrService.videoUrl);
        }
      } catch (e) {
        console.error('Failed to parse saved services', e);
      }
    }
  }, []);

  const pricingTiers = [
    {
      name: 'Basic',
      price: '$3,000',
      description: 'Entry-level XR solutions for small businesses.',
      features: [
        { text: 'XR Consultation (10 hours)', included: true },
        { text: 'Single Platform Development', included: true },
        { text: '3D Asset Creation (5 assets)', included: true },
        { text: 'Basic Interaction Design', included: true },
        { text: 'Quality Assurance', included: true },
        { text: 'Advanced Interaction', included: false },
        { text: 'Enterprise Support', included: false },
        { text: 'Multi-platform Deployment', included: false },
      ],
      buttonText: 'Get Started',
    },
    {
      name: 'Advanced',
      price: '$6,500',
      description: 'Comprehensive XR solutions for growing businesses.',
      features: [
        { text: 'XR Consultation (25 hours)', included: true },
        { text: 'Dual Platform Development', included: true },
        { text: '3D Asset Creation (15 assets)', included: true },
        { text: 'Advanced Interaction Design', included: true },
        { text: 'Quality Assurance', included: true },
        { text: 'User Testing', included: true },
        { text: 'Priority Support', included: true },
        { text: 'Multi-platform Deployment', included: false },
      ],
      buttonText: 'Get Started',
      isHighlighted: true,
    },
    {
      name: 'Enterprise',
      price: 'Custom',
      description: 'Full-scale XR deployment for large organizations.',
      features: [
        { text: 'Unlimited XR Consultation', included: true },
        { text: 'Multi-platform Development', included: true },
        { text: 'Unlimited 3D Asset Creation', included: true },
        { text: 'Complex Interaction Design', included: true },
        { text: 'Comprehensive QA', included: true },
        { text: 'Complete User Testing Suite', included: true },
        { text: 'Dedicated Support Team', included: true },
        { text: 'Multi-platform Deployment', included: true },
      ],
      buttonText: 'Contact Us',
    },
  ];

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <AppSidebar />
        <div className="flex-1 overflow-auto">
          <main>
            <VideoBackground videoUrl={videoUrl} title="XR Development" />
            
            <div className="max-w-7xl mx-auto px-4 py-8">
              <p className="text-xl text-muted-foreground mb-8">
                Create immersive experiences with augmented, virtual, and mixed reality solutions that transform how users interact with your brand.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
                <div className="bg-card p-6 rounded-xl border border-border">
                  <Glasses className="h-10 w-10 text-primary mb-4" />
                  <h3 className="text-xl font-bold mb-2">Virtual Reality (VR)</h3>
                  <p className="text-muted-foreground">
                    Immersive simulations and environments for training, entertainment, and product visualization.
                  </p>
                </div>
                
                <div className="bg-card p-6 rounded-xl border border-border">
                  <Smartphone className="h-10 w-10 text-primary mb-4" />
                  <h3 className="text-xl font-bold mb-2">Augmented Reality (AR)</h3>
                  <p className="text-muted-foreground">
                    Enhance real-world environments with digital overlays for retail, education, and industrial applications.
                  </p>
                </div>
                
                <div className="bg-card p-6 rounded-xl border border-border">
                  <Layers className="h-10 w-10 text-primary mb-4" />
                  <h3 className="text-xl font-bold mb-2">Mixed Reality (MR)</h3>
                  <p className="text-muted-foreground">
                    Blend physical and digital worlds for interactive experiences that respond to your environment.
                  </p>
                </div>
                
                <div className="bg-card p-6 rounded-xl border border-border">
                  <GalleryHorizontal className="h-10 w-10 text-primary mb-4" />
                  <h3 className="text-xl font-bold mb-2">Interactive 3D</h3>
                  <p className="text-muted-foreground">
                    Web-based 3D experiences that work across devices without specialized hardware.
                  </p>
                </div>
                
                <div className="bg-card p-6 rounded-xl border border-border">
                  <Laptop className="h-10 w-10 text-primary mb-4" />
                  <h3 className="text-xl font-bold mb-2">XR Training</h3>
                  <p className="text-muted-foreground">
                    Immersive training solutions for complex procedures, safety protocols, and skill development.
                  </p>
                </div>
                
                <div className="bg-card p-6 rounded-xl border border-border">
                  <CaseSensitive className="h-10 w-10 text-primary mb-4" />
                  <h3 className="text-xl font-bold mb-2">Digital Twins</h3>
                  <p className="text-muted-foreground">
                    Create virtual replicas of physical objects, processes, or systems for simulation and optimization.
                  </p>
                </div>
              </div>

              <div className="mb-16">
                <h2 className="text-3xl font-bold mb-4">Development Process</h2>
                <p className="text-lg mb-4">
                  Our structured approach ensures high-quality XR experiences:
                </p>
                <ol className="list-decimal pl-5 space-y-2">
                  <li className="text-lg">Concept - Defining project scope and user experience goals</li>
                  <li className="text-lg">Design - Creating 3D assets, interaction flows, and user interfaces</li>
                  <li className="text-lg">Development - Building the XR application using cutting-edge technologies</li>
                  <li className="text-lg">Testing - Rigorous quality assurance and user testing</li>
                  <li className="text-lg">Deployment - Supporting launch across target platforms</li>
                </ol>
              </div>

              <PricingTiers 
                serviceTitle="XR Development"
                serviceDescription="Select the XR development package that aligns with your project requirements and business goals."
                tiers={pricingTiers}
              />
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default XRService;
