
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
    const { query, sessionId } = await req.json()

    // Check if query is valid
    if (!query || typeof query !== 'string') {
      return new Response(
        JSON.stringify({ error: 'Invalid query' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 400 }
      )
    }

    // Get the user's AI settings
    const { data: aiSettings, error: aiSettingsError } = await supabase
      .from('ai_settings')
      .select('*')
      .eq('user_id', user.id)
      .single()
    
    if (aiSettingsError) {
      console.error('Error fetching AI settings:', aiSettingsError)
      return new Response(
        JSON.stringify({ error: 'Failed to fetch AI settings' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 500 }
      )
    }

    // Get the user's previous messages in this session
    const { data: previousMessages, error: messagesError } = await supabase
      .from('chat_history')
      .select('*')
      .eq('user_id', user.id)
      .eq('session_id', sessionId)
      .order('created_at', { ascending: true })
    
    if (messagesError) {
      console.error('Error fetching chat history:', messagesError)
      return new Response(
        JSON.stringify({ error: 'Failed to fetch chat history' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 500 }
      )
    }

    // Store the user's query
    const { error: insertError } = await supabase
      .from('chat_history')
      .insert({
        user_id: user.id,
        session_id: sessionId,
        role: 'user',
        content: query
      })
    
    if (insertError) {
      console.error('Error storing user query:', insertError)
      // Don't return an error, continue processing
    }

    // Get relevant documents if RAG is enabled
    let relevantDocuments = []
    if (aiSettings.rag_enabled) {
      const { data: docs, error: docsError } = await supabase
        .from('knowledge_base_docs')
        .select('name, content')
        .eq('user_id', user.id)
        .limit(5)
      
      if (!docsError && docs.length > 0) {
        relevantDocuments = docs
      }
    }

    // Use fallback API response if no API key is provided
    if (!aiSettings.api_key) {
      // Create a simulated response
      const simulatedResponse = simulateAIResponse(query, relevantDocuments)

      // Store the simulated response
      await supabase
        .from('chat_history')
        .insert({
          user_id: user.id,
          session_id: sessionId,
          role: 'system',
          content: simulatedResponse
        })

      return new Response(
        JSON.stringify({ response: simulatedResponse }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    // Set up the appropriate AI provider client
    let aiResponse = ''
    if (aiSettings.provider === 'openai') {
      const openai = new OpenAI({
        apiKey: aiSettings.api_key
      })

      // Format the conversation history
      const messages = []
      
      // Add system prompt
      messages.push({
        role: 'system',
        content: aiSettings.system_prompt
      })

      // Add relevant document context if available
      if (relevantDocuments.length > 0) {
        const context = relevantDocuments.map(doc => `Document: ${doc.name}\nContent: ${doc.content}`).join('\n\n')
        messages.push({
          role: 'system',
          content: `Here are some relevant documents from the knowledge base:\n\n${context}`
        })
      }

      // Add chat history
      previousMessages.forEach(msg => {
        messages.push({
          role: msg.role,
          content: msg.content
        })
      })

      // Add current query
      messages.push({
        role: 'user',
        content: query
      })

      // Call OpenAI API
      const completion = await openai.chat.completions.create({
        model: aiSettings.model,
        messages,
        temperature: aiSettings.temperature,
        max_tokens: aiSettings.max_tokens
      })

      aiResponse = completion.choices[0].message.content || 'No response generated.'
    } else {
      // Fallback for other providers (not implemented)
      aiResponse = `Provider ${aiSettings.provider} is not fully implemented yet. Using simulated response.`
      aiResponse += '\n\n' + simulateAIResponse(query, relevantDocuments)
    }

    // Store the AI response
    await supabase
      .from('chat_history')
      .insert({
        user_id: user.id,
        session_id: sessionId,
        role: 'system',
        content: aiResponse
      })

    return new Response(
      JSON.stringify({ response: aiResponse }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  } catch (err) {
    console.error('Error processing request:', err)
    return new Response(
      JSON.stringify({ error: 'Internal server error', details: err.message }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 500 }
    )
  }
})

// Helper function to simulate AI response for demo purposes
function simulateAIResponse(query: string, documents: any[]): string {
  const lowerQuery = query.toLowerCase()
  let response = 'Based on my analysis'
  
  if (documents.length > 0) {
    response += ' of your knowledge base'
  }
  
  response += ', Alexander Oguso offers comprehensive digital transformation services including AI solutions, XR experiences, and multimedia content creation.'
  
  if (lowerQuery.includes('ai')) {
    response += ' Our AI solutions include custom models, predictive analytics, and machine learning implementations.'
  }
  
  if (lowerQuery.includes('xr')) {
    response += ' Our XR experiences provide immersive AR and VR applications for customer engagement and employee training.'
  }
  
  if (lowerQuery.includes('multimedia')) {
    response += ' Our multimedia content includes interactive presentations, data visualizations, and engaging digital storytelling.'
  }
  
  response += ' Would you like more specific information about any of these services?'
  
  return response
}
