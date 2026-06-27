import { GoogleGenerativeAI } from "@google/generative-ai"

const apiKey = process.env.GEMINI_API_KEY || ""
const genAI = new GoogleGenerativeAI(apiKey)

export async function POST(req: Request) {
  try {
    if (!apiKey) {
      console.error("HATA: GEMINI_API_KEY bulunamadı! .env.local dosyasını kontrol edin.");
      return new Response(JSON.stringify({ text: "[]", error: "API key eksik." }), {
        status: 200,
        headers: { "Content-Type": "application/json" }
      });
    }

    const body = await req.json()

    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash"
    })

    const prompt = `
      Create a detailed daily travel itinerary for:
      Destination: ${body.destination || "Paris"}
      Duration: ${body.duration || "3"} days
      Budget: ${body.budget || "medium"}
      Interests: ${body.interests ? body.interests.join(", ") : ""}

      Return ONLY a raw JSON array matching the structure below. 
      DO NOT wrap the response in \`\`\`json or \`\`\` code blocks. Do not add any text before or after the JSON.

      [
        {
          "day": 1,
          "date": "Day 1",
          "activities": [
            {
              "id": "1",
              "time": "09:00 AM",
              "title": "Morning Exploration",
              "location": "City Center",
              "type": "activity",
              "description": "Start exploring the beautiful streets."
            }
          ]
        }
      ]
    `

    const result = await model.generateContent(prompt)
    let responseText = result.response.text().trim()

    if (responseText.startsWith("```")) {
      responseText = responseText.replace(/```json|```/g, "").trim()
    }

    return new Response(JSON.stringify({ text: responseText }), {
      status: 200,
      headers: { "Content-Type": "application/json" }
    })

  } catch (error: any) {
    console.error("Backend hatası:", error)
    return new Response(JSON.stringify({ text: "[]", error: error.message }), {
      status: 200,
      headers: { "Content-Type": "application/json" }
    })
  }
}