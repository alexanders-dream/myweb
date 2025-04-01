
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";

export type Document = {
  id: string;
  name: string;
  size: number;
  date: string;
  type: string;
};

// Get documents from Supabase
export const getDocuments = async (): Promise<Document[]> => {
  try {
    const { data: { session } } = await supabase.auth.getSession();
    
    if (!session) {
      return [];
    }
    
    const { data, error } = await supabase
      .from('knowledge_base_docs')
      .select('id, name, content, created_at')
      .eq('user_id', session.user.id);
    
    if (error) {
      console.error('Error loading documents:', error);
      return [];
    }
    
    return data.map(doc => ({
      id: doc.id,
      name: doc.name,
      size: doc.content.length,
      date: doc.created_at,
      type: getDocumentType(doc.name)
    }));
  } catch (error) {
    console.error('Error loading documents:', error);
    return [];
  }
};

// Delete document from Supabase
export const deleteDocument = async (id: string): Promise<boolean> => {
  try {
    const { data: { session } } = await supabase.auth.getSession();
    
    if (!session) {
      toast({
        title: "Not authenticated",
        description: "Please log in to delete documents",
        variant: "destructive"
      });
      return false;
    }
    
    const { error } = await supabase
      .from('knowledge_base_docs')
      .delete()
      .eq('id', id)
      .eq('user_id', session.user.id);
    
    if (error) {
      console.error('Error deleting document:', error);
      toast({
        title: "Error",
        description: "Failed to delete document",
        variant: "destructive"
      });
      return false;
    }
    
    return true;
  } catch (error) {
    console.error('Error deleting document:', error);
    return false;
  }
};

// Upload document to Supabase via edge function
export const uploadDocument = async (name: string, content: string): Promise<boolean> => {
  try {
    const { data: { session } } = await supabase.auth.getSession();
    
    if (!session) {
      toast({
        title: "Not authenticated",
        description: "Please log in to upload documents",
        variant: "destructive"
      });
      return false;
    }
    
    const { data, error } = await supabase.functions.invoke('process-document', {
      body: {
        name,
        content
      }
    });
    
    if (error || !data.success) {
      console.error('Error uploading document:', error || data.error);
      toast({
        title: "Error",
        description: "Failed to upload document",
        variant: "destructive"
      });
      return false;
    }
    
    return true;
  } catch (error) {
    console.error('Error uploading document:', error);
    return false;
  }
};

// Helper function to determine document type
const getDocumentType = (fileName: string): string => {
  const extension = fileName.split('.').pop()?.toLowerCase() || '';
  const extensionMap: Record<string, string> = {
    'pdf': 'application/pdf',
    'txt': 'text/plain',
    'doc': 'application/msword',
    'docx': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
  };
  
  return extensionMap[extension] || 'application/octet-stream';
};
