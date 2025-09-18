import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

const getSystemPrompt = (message: string) => {
  const lowerMessage = message.toLowerCase()
  
  // Check if user is asking about the creator
  if (lowerMessage.includes('mausam kar') || lowerMessage.includes('creator') || lowerMessage.includes('developer') || lowerMessage.includes('who made') || lowerMessage.includes('who created')) {
    return `You are a helpful AI assistant for students. The user is asking about the creator of this application. Here's the information about Mausam Kar:

**About Mausam Kar - Creator of this Student Hub Application:**

Mausam Kar is a Computer Science and Engineering student at VIT Bhopal, specializing in Artificial Intelligence and Machine Learning. Originally from Assam, he blends creativity and technology to craft impactful, user-focused solutions.

**Technical Skills:**
- Full-stack development (React.js, HTML5, CSS3, JavaScript, Tailwind CSS)
- Backend (Node.js)
- AI/ML (Python, TensorFlow, NLP)
- UI/UX Design
- Prompt Engineering

**Currently Exploring:**
Cloud Computing (AWS/GCP), DevOps, and Advanced Data Analytics to build scalable and ethical intelligent systems.

**About him:**
Driven by curiosity, Mausam enjoys contributing to open-source projects, participating in hackathons, and experimenting with generative AI. He's passionate about bridging regional innovation with global tech.

Please provide a helpful response about Mausam Kar based on this information. User's question: ${message}`
  }
  
  return `You are a helpful AI assistant for students. This application was created by Mausam Kar, a CS student at VIT Bhopal specializing in AI/ML. Please provide a helpful, educational response to this question: ${message}`
}

serve(async (req) => {
  // Handle CORS
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { message } = await req.json()
    
    if (!message) {
      return new Response(
        JSON.stringify({ error: 'Message is required' }),
        { 
          status: 400, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      )
    }

    // Get Gemini API key from Supabase secrets
    const geminiApiKey = Deno.env.get('GEMINI_API_KEY')
    
    if (!geminiApiKey) {
      return new Response(
        JSON.stringify({ error: 'Gemini API key not configured' }),
        { 
          status: 500, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      )
    }

    // Call Gemini API
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${geminiApiKey}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [{
          parts: [{
            text: getSystemPrompt(message)
          }]
        }],
        generationConfig: {
          temperature: 0.7,
          topK: 40,
          topP: 0.95,
          maxOutputTokens: 1024,
        },
        safetySettings: [
          {
            category: "HARM_CATEGORY_HARASSMENT",
            threshold: "BLOCK_MEDIUM_AND_ABOVE"
          },
          {
            category: "HARM_CATEGORY_HATE_SPEECH",
            threshold: "BLOCK_MEDIUM_AND_ABOVE"
          },
          {
            category: "HARM_CATEGORY_SEXUALLY_EXPLICIT",
            threshold: "BLOCK_MEDIUM_AND_ABOVE"
          },
          {
            category: "HARM_CATEGORY_DANGEROUS_CONTENT",
            threshold: "BLOCK_MEDIUM_AND_ABOVE"
          }
        ]
      })
    })

    if (!response.ok) {
      const error = await response.text()
      console.error('Gemini API error:', error)
      return new Response(
        JSON.stringify({ error: 'Failed to get response from AI' }),
        { 
          status: 500, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      )
    }

    const data = await response.json()
    const aiResponse = data.candidates?.[0]?.content?.parts?.[0]?.text || 'Sorry, I could not generate a response.'

    return new Response(
      JSON.stringify({ response: aiResponse }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    )

  } catch (error) {
    console.error('Function error:', error)
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      { 
        status: 500, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    )
  }
})