
import React, { useState, useEffect } from 'react';
import { SidebarProvider } from '@/components/ui/sidebar';
import AppSidebar from '@/components/AppSidebar';
import PricingTiers from '@/components/PricingTiers';
import VideoBackground from '@/components/VideoBackground';
import { Video, Film, Image, Megaphone, Palette, FileVideo } from 'lucide-react';

const MultimediaService = () => {
  const [videoUrl, setVideoUrl] = useState('https://www.youtube.com/embed/GtL1huin9EE');
  
  // Try to load service data from localStorage
  useEffect(() => {
    const savedServices = localStorage.getItem('siteServices');
    if (savedServices) {
      try {
        const parsedServices = JSON.parse(savedServices);
        const multimediaService = parsedServices.find((s: any) => s.id === 'multimedia');
        if (multimediaService && multimediaService.videoUrl) {
          setVideoUrl(multimediaService.videoUrl);
        }
      } catch (e) {
        console.error('Failed to parse saved services', e);
      }
    }
  }, []);

  const pricingTiers = [
    {
      name: 'Basic',
      price: '$1,800',
      description: 'Essential multimedia content for small businesses.',
      features: [
        { text: 'Creative Consultation (5 hours)', included: true },
        { text: 'Video Production (1 video)', included: true },
        { text: 'Basic Animation', included: true },
        { text: 'Social Media Assets (5 designs)', included: true },
        { text: 'Basic Editing', included: true },
        { text: 'Premium Stock Assets', included: false },
        { text: 'Custom Music', included: false },
        { text: 'Interactive Content', included: false },
      ],
      buttonText: 'Get Started',
    },
    {
      name: 'Advanced',
      price: '$4,200',
      description: 'Comprehensive multimedia solutions for growing brands.',
      features: [
        { text: 'Creative Consultation (15 hours)', included: true },
        { text: 'Video Production (3 videos)', included: true },
        { text: 'Advanced Animation', included: true },
        { text: 'Social Media Assets (20 designs)', included: true },
        { text: 'Professional Editing', included: true },
        { text: 'Premium Stock Assets', included: true },
        { text: 'Custom Music', included: true },
        { text: 'Interactive Content', included: false },
      ],
      buttonText: 'Get Started',
      isHighlighted: true,
    },
    {
      name: 'Enterprise',
      price: 'Custom',
      description: 'Full-scale multimedia campaigns for large organizations.',
      features: [
        { text: 'Unlimited Creative Consultation', included: true },
        { text: 'Video Production (10+ videos)', included: true },
        { text: 'Premium Animation', included: true },
        { text: 'Social Media Assets (50+ designs)', included: true },
        { text: 'Professional Editing', included: true },
        { text: 'Premium Stock Assets', included: true },
        { text: 'Custom Music', included: true },
        { text: 'Interactive Content', included: true },
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
            <VideoBackground videoUrl={videoUrl} title="Multimedia Production" />
            
            <div className="max-w-7xl mx-auto px-4 py-8">
              <p className="text-xl text-muted-foreground mb-8">
                Create compelling multimedia content that captivates your audience and brings your brand's story to life.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
                <div className="bg-card p-6 rounded-xl border border-border">
                  <Film className="h-10 w-10 text-primary mb-4" />
                  <h3 className="text-xl font-bold mb-2">Video Production</h3>
                  <p className="text-muted-foreground">
                    Professional video content for marketing, training, and storytelling purposes.
                  </p>
                </div>
                
                <div className="bg-card p-6 rounded-xl border border-border">
                  <Image className="h-10 w-10 text-primary mb-4" />
                  <h3 className="text-xl font-bold mb-2">Visual Design</h3>
                  <p className="text-muted-foreground">
                    Eye-catching visual assets that strengthen your brand identity and messaging.
                  </p>
                </div>
                
                <div className="bg-card p-6 rounded-xl border border-border">
                  <Video className="h-10 w-10 text-primary mb-4" />
                  <h3 className="text-xl font-bold mb-2">Animation</h3>
                  <p className="text-muted-foreground">
                    Engage audiences with 2D and 3D animations that simplify complex ideas and entertain.
                  </p>
                </div>
                
                <div className="bg-card p-6 rounded-xl border border-border">
                  <Megaphone className="h-10 w-10 text-primary mb-4" />
                  <h3 className="text-xl font-bold mb-2">Content Marketing</h3>
                  <p className="text-muted-foreground">
                    Strategic multimedia content designed to reach and engage your target audience.
                  </p>
                </div>
                
                <div className="bg-card p-6 rounded-xl border border-border">
                  <Palette className="h-10 w-10 text-primary mb-4" />
                  <h3 className="text-xl font-bold mb-2">Brand Development</h3>
                  <p className="text-muted-foreground">
                    Cohesive visual storytelling that strengthens your brand's presence and identity.
                  </p>
                </div>
                
                <div className="bg-card p-6 rounded-xl border border-border">
                  <FileVideo className="h-10 w-10 text-primary mb-4" />
                  <h3 className="text-xl font-bold mb-2">Interactive Media</h3>
                  <p className="text-muted-foreground">
                    Engaging interactive experiences that increase audience participation and retention.
                  </p>
                </div>
              </div>

              <div className="mb-16">
                <h2 className="text-3xl font-bold mb-4">Our Creative Process</h2>
                <p className="text-lg mb-4">
                  We follow a strategic approach to multimedia production:
                </p>
                <ol className="list-decimal pl-5 space-y-2">
                  <li className="text-lg">Discovery - Understanding your brand, audience, and goals</li>
                  <li className="text-lg">Concept - Developing creative concepts and storyboards</li>
                  <li className="text-lg">Production - Creating high-quality assets with professional equipment</li>
                  <li className="text-lg">Post-Production - Editing, effects, and polishing</li>
                  <li className="text-lg">Delivery - Optimizing for various platforms and distribution</li>
                </ol>
              </div>

              <PricingTiers 
                serviceTitle="Multimedia Production"
                serviceDescription="Select the multimedia package that best fits your content needs and budget."
                tiers={pricingTiers}
              />
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default MultimediaService;
