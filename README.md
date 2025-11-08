HUMNAVA Backend (Render-ready)
------------------------------
This Node.js Express app exposes POST /chat which forwards messages to OpenAI (gpt-4o-mini).
It detects user's language and replies warmly (supports English + Hindi).

Files:
- server.js       : main server code
- package.json    : dependencies and start script
- .env.example    : example env variable file

How to deploy on Render (mobile-friendly):
1. Create a GitHub repo (e.g. humnava-backend) and upload these files, OR push this folder to GitHub.
2. On Render.com -> New -> Web Service -> Connect to GitHub and select this repo.
3. Set:
   - Environment: Node
   - Build command: npm install
   - Start command: node server.js
4. Add Environment Variable on Render:
   - OPENAI_API_KEY = <your OpenAI secret key (sk-...)>
5. Deploy. After deploy you'll get a public URL like:
   https://humnava-backend.onrender.com

Frontend usage:
POST to {BACKEND_URL}/chat with JSON { "message": "Your question" }
Response: { "reply": "AI reply text" }

Security:
- Keep OPENAI_API_KEY secret. Do not expose it in client-side code.
