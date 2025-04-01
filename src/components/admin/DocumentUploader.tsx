
import React, { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Trash2, Upload, FileText, Check } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Document, getDocuments, deleteDocument } from '@/services/documentService';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';

const DocumentUploader = () => {
  const [documents, setDocuments] = useState<Document[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();
  const { user } = useAuth();

  useEffect(() => {
    loadDocuments();
  }, []);

  const loadDocuments = async () => {
    setIsLoading(true);
    try {
      const docs = await getDocuments();
      setDocuments(docs);
    } catch (error) {
      console.error('Error loading documents:', error);
      toast({
        title: 'Error',
        description: 'Failed to load documents',
        variant: 'destructive'
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.length) return;
    
    setIsUploading(true);
    
    for (const file of Array.from(e.target.files)) {
      // Check file type
      if (!['application/pdf', 'text/plain', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'].includes(file.type)) {
        toast({
          title: "Invalid file type",
          description: `${file.name} is not a supported document type. Please upload PDF, TXT, DOC, or DOCX files.`,
          variant: "destructive"
        });
        continue;
      }
      
      try {
        // Read file content
        const content = await readFileContent(file);
        
        // Upload to Supabase via edge function
        const { data, error } = await supabase.functions.invoke('process-document', {
          body: {
            name: file.name,
            content
          }
        });
        
        if (error || !data.success) {
          throw new Error(error?.message || data?.error || 'Failed to upload document');
        }
        
        toast({
          title: "Document uploaded",
          description: `Successfully uploaded ${file.name}`,
        });
      } catch (error) {
        console.error('Error uploading document:', error);
        toast({
          title: "Upload failed",
          description: `Failed to upload ${file.name}`,
          variant: "destructive"
        });
      }
    }
    
    // Refresh the documents list
    await loadDocuments();
    
    setIsUploading(false);
    // Clear the input
    e.target.value = '';
  };

  const handleDelete = async (id: string) => {
    try {
      const success = await deleteDocument(id);
      
      if (success) {
        // Update the local state
        setDocuments(prev => prev.filter(doc => doc.id !== id));
        
        toast({
          title: "Document removed",
          description: "The document has been removed from your knowledge base.",
        });
      }
    } catch (error) {
      console.error('Error deleting document:', error);
      toast({
        title: "Error",
        description: "Failed to delete document",
        variant: "destructive"
      });
    }
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
  };

  const formatDate = (isoDate: string): string => {
    return new Date(isoDate).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getFileTypeLabel = (mimeType: string): string => {
    const types: Record<string, string> = {
      'application/pdf': 'PDF',
      'text/plain': 'TXT',
      'application/msword': 'DOC',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': 'DOCX'
    };
    return types[mimeType] || 'Document';
  };

  // Helper function to read file content
  const readFileContent = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      
      reader.onload = (event) => {
        if (event.target?.result) {
          resolve(event.target.result as string);
        } else {
          reject(new Error('Failed to read file'));
        }
      };
      
      reader.onerror = () => {
        reject(new Error('Error reading file'));
      };
      
      reader.readAsText(file);
    });
  };

  // If not authenticated, show message
  if (!user) {
    return (
      <div className="border rounded-lg p-8 text-center">
        <div className="flex flex-col items-center justify-center">
          <FileText className="h-12 w-12 text-muted-foreground mb-4" />
          <h3 className="text-lg font-medium">Authentication Required</h3>
          <p className="text-muted-foreground mt-2">
            Please log in to manage your knowledge base documents.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Knowledge Base Documents</h2>
        
        <div className="relative">
          <Input
            id="file-upload"
            type="file"
            className="hidden"
            onChange={handleFileChange}
            multiple
            accept=".pdf,.txt,.doc,.docx,application/pdf,text/plain,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
          />
          <Button 
            onClick={() => document.getElementById('file-upload')?.click()}
            disabled={isUploading}
          >
            {isUploading ? (
              <>Uploading <Upload className="ml-2 h-4 w-4 animate-bounce" /></>
            ) : (
              <>Upload Documents <Upload className="ml-2 h-4 w-4" /></>
            )}
          </Button>
        </div>
      </div>

      <div className="text-sm text-muted-foreground">
        Upload PDF, TXT, DOC, or DOCX files that will be used by the AI to provide relevant answers to user queries.
      </div>
      
      {isLoading ? (
        <div className="border rounded-lg p-8 text-center">
          <div className="flex flex-col items-center justify-center">
            <FileText className="h-12 w-12 text-muted-foreground mb-4 animate-pulse" />
            <h3 className="text-lg font-medium">Loading documents...</h3>
          </div>
        </div>
      ) : documents.length > 0 ? (
        <div className="border rounded-lg overflow-hidden">
          <table className="w-full">
            <thead className="bg-muted">
              <tr>
                <th className="text-left py-2 px-4">Document</th>
                <th className="text-left py-2 px-4">Type</th>
                <th className="text-left py-2 px-4">Size</th>
                <th className="text-left py-2 px-4">Uploaded</th>
                <th className="text-right py-2 px-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {documents.map((doc) => (
                <tr key={doc.id} className="border-t">
                  <td className="py-3 px-4 flex items-center">
                    <FileText className="h-4 w-4 mr-2 text-muted-foreground" />
                    <span className="font-medium">{doc.name}</span>
                  </td>
                  <td className="py-3 px-4">
                    {getFileTypeLabel(doc.type)}
                  </td>
                  <td className="py-3 px-4">
                    {formatFileSize(doc.size)}
                  </td>
                  <td className="py-3 px-4">
                    {formatDate(doc.date)}
                  </td>
                  <td className="py-3 px-4 text-right">
                    <Button 
                      variant="ghost" 
                      size="icon"
                      onClick={() => handleDelete(doc.id)}
                    >
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="border rounded-lg p-8 text-center">
          <div className="flex flex-col items-center justify-center">
            <FileText className="h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-medium">No documents uploaded</h3>
            <p className="text-muted-foreground mt-2 mb-4">
              Upload documents to build your knowledge base for AI-powered responses
            </p>
            <Button 
              onClick={() => document.getElementById('file-upload')?.click()}
              disabled={isUploading}
            >
              Upload Your First Document
            </Button>
          </div>
        </div>
      )}
      
      <div className="bg-muted p-4 rounded-lg">
        <h3 className="font-medium mb-2 flex items-center">
          <Check className="h-4 w-4 text-green-500 mr-2" />
          Recommendations for Good Results
        </h3>
        <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
          <li>Use well-structured documents with clear headings and sections</li>
          <li>Include relevant keywords and terminology that users might search for</li>
          <li>Keep documents focused on specific topics rather than broad overviews</li>
          <li>Regularly update documents to ensure information remains current</li>
        </ul>
      </div>
    </div>
  );
};

export default DocumentUploader;
