
import React, { useState } from 'react';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';

type ContentSection = {
  id: string;
  title: string;
  content: string;
};

// Mock data - in a real app, this would come from a database
const initialContent: ContentSection[] = [
  {
    id: 'hero',
    title: 'Hero Section',
    content: 'Alexander Oguso - Digital Transformation Services'
  },
  {
    id: 'about',
    title: 'About Section',
    content: 'Helping businesses transform digitally through AI, XR, and multimedia solutions.'
  },
  {
    id: 'contact',
    title: 'Contact Information',
    content: 'Email: contact@alexanderoguso.com\nPhone: (555) 123-4567'
  }
];

const ContentEditor = () => {
  const [contentSections, setContentSections] = useState<ContentSection[]>(initialContent);
  const { toast } = useToast();

  const handleContentChange = (id: string, field: 'title' | 'content', value: string) => {
    setContentSections(prev => 
      prev.map(section => 
        section.id === id ? { ...section, [field]: value } : section
      )
    );
  };

  const handleSave = () => {
    // In a real app, this would save to a database
    localStorage.setItem('siteContent', JSON.stringify(contentSections));
    toast({
      title: "Changes saved",
      description: "Your content changes have been saved.",
    });
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">Edit Website Content</h2>
      
      {contentSections.map((section) => (
        <div key={section.id} className="p-4 border rounded-lg space-y-3">
          <div>
            <Label htmlFor={`title-${section.id}`}>{section.title} Title</Label>
            <Input
              id={`title-${section.id}`}
              value={section.title}
              onChange={(e) => handleContentChange(section.id, 'title', e.target.value)}
              className="mb-2"
            />
          </div>
          
          <div>
            <Label htmlFor={`content-${section.id}`}>Content</Label>
            <Textarea
              id={`content-${section.id}`}
              value={section.content}
              onChange={(e) => handleContentChange(section.id, 'content', e.target.value)}
              rows={4}
            />
          </div>
        </div>
      ))}
      
      <button
        onClick={handleSave}
        className="bg-primary text-primary-foreground px-4 py-2 rounded-md hover:bg-primary/90 transition-colors"
      >
        Save Changes
      </button>
    </div>
  );
};

export default ContentEditor;
