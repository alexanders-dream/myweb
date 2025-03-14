
import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';

type ServiceData = {
  id: string;
  title: string;
  description: string;
  videoUrl: string;
  features: string[];
};

// Mock data - in a real app, this would come from a database
const initialServices: ServiceData[] = [
  {
    id: 'ai',
    title: 'AI Solutions',
    description: 'Harness the power of AI to automate processes, gain insights, and create personalized experiences for your customers.',
    videoUrl: 'https://www.youtube.com/embed/5p248yoa3oE',
    features: [
      'Predictive analytics and data modeling',
      'AI-powered customer experiences',
      'Process automation and optimization',
      'Natural language processing solutions',
      'Computer vision implementation'
    ]
  },
  {
    id: 'xr',
    title: 'XR Development',
    description: 'Create immersive experiences that blend digital and physical worlds using AR, VR, and MR technologies.',
    videoUrl: 'https://www.youtube.com/embed/2JgEzN7LYVo',
    features: [
      'Virtual showrooms and product visualizations',
      'Augmented reality applications',
      'Virtual reality training solutions',
      'Mixed reality workplace innovations',
      'Immersive brand experiences'
    ]
  },
  {
    id: 'multimedia',
    title: 'Multimedia Production',
    description: 'Engage your audience with compelling multimedia content designed for the digital age.',
    videoUrl: 'https://www.youtube.com/embed/GtL1huin9EE',
    features: [
      'Interactive storytelling experiences',
      'Video production and animation',
      '3D modeling and visualization',
      'Digital marketing assets',
      'Social media content strategies'
    ]
  }
];

const ServicesEditor = () => {
  const [services, setServices] = useState<ServiceData[]>(() => {
    const savedServices = localStorage.getItem('siteServices');
    return savedServices ? JSON.parse(savedServices) : initialServices;
  });
  const { toast } = useToast();

  const handleServiceChange = (id: string, field: keyof ServiceData, value: string | string[]) => {
    setServices(prev => 
      prev.map(service => 
        service.id === id ? { ...service, [field]: value } : service
      )
    );
  };

  const handleFeatureChange = (serviceId: string, index: number, value: string) => {
    setServices(prev => 
      prev.map(service => {
        if (service.id === serviceId) {
          const updatedFeatures = [...service.features];
          updatedFeatures[index] = value;
          return { ...service, features: updatedFeatures };
        }
        return service;
      })
    );
  };

  const handleAddFeature = (serviceId: string) => {
    setServices(prev => 
      prev.map(service => {
        if (service.id === serviceId) {
          return { ...service, features: [...service.features, ''] };
        }
        return service;
      })
    );
  };

  const handleRemoveFeature = (serviceId: string, index: number) => {
    setServices(prev => 
      prev.map(service => {
        if (service.id === serviceId) {
          const updatedFeatures = [...service.features];
          updatedFeatures.splice(index, 1);
          return { ...service, features: updatedFeatures };
        }
        return service;
      })
    );
  };

  const handleSave = () => {
    // In a real app, this would save to a database
    localStorage.setItem('siteServices', JSON.stringify(services));
    toast({
      title: "Services updated",
      description: "Your service changes have been saved.",
    });
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">Edit Services</h2>
      
      {services.map((service) => (
        <div key={service.id} className="p-4 border rounded-lg space-y-4">
          <div>
            <Label htmlFor={`title-${service.id}`}>Service Title</Label>
            <Input
              id={`title-${service.id}`}
              value={service.title}
              onChange={(e) => handleServiceChange(service.id, 'title', e.target.value)}
              className="mb-2"
            />
          </div>
          
          <div>
            <Label htmlFor={`description-${service.id}`}>Description</Label>
            <Textarea
              id={`description-${service.id}`}
              value={service.description}
              onChange={(e) => handleServiceChange(service.id, 'description', e.target.value)}
              rows={3}
            />
          </div>
          
          <div>
            <Label htmlFor={`video-${service.id}`}>YouTube Video URL (Embed URL)</Label>
            <Input
              id={`video-${service.id}`}
              value={service.videoUrl}
              onChange={(e) => handleServiceChange(service.id, 'videoUrl', e.target.value)}
              placeholder="https://www.youtube.com/embed/XXXXXXXXXXX"
            />
            <p className="text-xs text-muted-foreground mt-1">
              Use the embed URL format: https://www.youtube.com/embed/XXXXXXXXXXX
            </p>
          </div>
          
          <div className="space-y-2">
            <Label>Features</Label>
            {service.features.map((feature, index) => (
              <div key={index} className="flex items-center gap-2">
                <Input
                  value={feature}
                  onChange={(e) => handleFeatureChange(service.id, index, e.target.value)}
                />
                <button
                  type="button"
                  onClick={() => handleRemoveFeature(service.id, index)}
                  className="px-2 py-1 bg-destructive text-destructive-foreground rounded-md hover:bg-destructive/90"
                >
                  Remove
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={() => handleAddFeature(service.id)}
              className="px-3 py-1 bg-secondary text-secondary-foreground rounded-md hover:bg-secondary/90"
            >
              Add Feature
            </button>
          </div>
        </div>
      ))}
      
      <button
        onClick={handleSave}
        className="bg-primary text-primary-foreground px-4 py-2 rounded-md hover:bg-primary/90 transition-colors"
      >
        Save Services
      </button>
    </div>
  );
};

export default ServicesEditor;
