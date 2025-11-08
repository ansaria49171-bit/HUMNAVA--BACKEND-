import express from "express";
import cors from "cors";
import fetch from "node-fetch";

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => res.send("Humnava backend is running ✅"));

app.post("/chat", async (req, res) => {
  try {
    const userMessage = (req.body?.message || "").toString().trim();
    if (!userMessage) return res.status(400).json({ error: "Empty message" });

    const systemPrompt = "You are Humnava — an empathetic AI companion. Reply warmly, briefly, and in the user's language (detect Hindi/English/Hinglish). Be helpful and situation-aware.";

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userMessage }
        ],
        max_tokens: 350,
        temperature: 0.8
      })
    });

    if (!response.ok) {
      const errText = await response.text();
      console.error("OpenAI error:", response.status, errText);
      return res.status(500).json({ error: "OpenAI request failed", detail: errText });
    }

    const data = await response.json();
    const reply = data.choices?.[0]?.message?.content?.trim() || "Sorry, I couldn't reply right now.";
    res.json({ reply });
  } catch (err) {
    console.error("Server error:", err);
    res.status(500).json({ error: "Server error", detail: String(err) });
  }
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(f"Humnava backend running on port {port}"));
