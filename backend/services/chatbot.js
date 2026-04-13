import Groq from 'groq-sdk'

let groq = null

if (process.env.GROQ_API_KEY) {
  groq = new Groq({
    apiKey: process.env.GROQ_API_KEY,
  })
}

const systemPrompt = `You are a helpful customer support chatbot for Mentneo AI Video, an AI-powered video creation platform. 
You help users with questions about:
- How to create AI videos
- Pricing and plans
- Video delivery and downloads
- Account management
- Technical issues
- General FAQ

Be friendly, concise, and helpful. If you don't know something, suggest contacting support at support@mentneo.com.
Keep responses under 150 words.`

export const getChatbotResponse = async (userMessage) => {
  if (!groq) {
    throw new Error('Groq API key not configured. Please set GROQ_API_KEY in .env file.')
  }

  try {
    const message = await groq.messages.create({
      model: 'mixtral-8x7b-32768',
      max_tokens: 1024,
      system: systemPrompt,
      messages: [
        {
          role: 'user',
          content: userMessage,
        },
      ],
    })

    return message.content[0].text
  } catch (error) {
    console.error('Groq API error:', error)
    throw new Error('Failed to get chatbot response')
  }
}
