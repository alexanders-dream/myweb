
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.39.7'
import OpenAI from 'https://esm.sh/openai@4.29.0'

// Define CORS headers for browser requests
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

Deno.serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders, status: 204 })
  }

  try {
    // Create a Supabase client with the project URL and anon key
    const supabaseUrl = Deno.env.get('SUPABASE_URL') ?? ''
    const supabaseAnonKey = Deno.env.get('SUPABASE_ANON_KEY') ?? ''
    const supabase = createClient(supabaseUrl, supabaseAnonKey)

    // Get the authorization header from the request
    const authHeader = req.headers.get('Authorization')
    if (!authHeader) {
      return new Response(
        JSON.stringify({ error: 'No authorization header' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 401 }
      )
    }

    // Get the JWT token from the authorization header
    const token = authHeader.replace('Bearer ', '')

    // Verify the JWT token and get the user
    const { data: { user }, error: userError } = await supabase.auth.getUser(token)
    if (userError || !user) {
      return new Response(
        JSON.stringify({ error: 'Invalid token' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 401 }
      )
    }

    // Parse the request body
    const { name, content } = await req.json()

    // Check if the document data is valid
    if (!name || !content) {
      return new Response(
        JSON.stringify({ error: 'Invalid document data' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 400 }
      )
    }

    // Get the user's AI settings to use the appropriate API key
    const { data: aiSettings, error: aiSettingsError } = await supabase
      .from('ai_settings')
      .select('api_key, provider')
      .eq('user_id', user.id)
      .single()
    
    if (aiSettingsError) {
      console.error('Error fetching AI settings:', aiSettingsError)
      return new Response(
        JSON.stringify({ error: 'Failed to fetch AI settings' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 500 }
      )
    }

    // Generate embedding if API key is available
    let embedding = null
    if (aiSettings.api_key && aiSettings.provider === 'openai') {
      try {
        const openai = new OpenAI({
          apiKey: aiSettings.api_key
        })

        const response = await openai.embeddings.create({
          model: 'text-embedding-ada-002',
          input: content.substring(0, 8000) // Limit input to avoid token limits
        })

        if (response.data && response.data.length > 0) {
          embedding = response.data[0].embedding
        }
      } catch (error) {
        console.error('Error generating embedding:', error)
        // Continue without embedding if there's an error
      }
    }

    // Store the document in the database
    const { data: document, error: insertError } = await supabase
      .from('knowledge_base_docs')
      .insert({
        user_id: user.id,
        name,
        content,
        embedding
      })
      .select()
    
    if (insertError) {
      console.error('Error storing document:', insertError)
      return new Response(
        JSON.stringify({ error: 'Failed to store document' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 500 }
      )
    }

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: 'Document processed and stored successfully',
        hasEmbedding: embedding !== null
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  } catch (err) {
    console.error('Error processing document:', err)
    return new Response(
      JSON.stringify({ error: 'Internal server error', details: err.message }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 500 }
    )
  }
})
