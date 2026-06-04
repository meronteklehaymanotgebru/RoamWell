# RoamWell

> **Know your risk. Protect your health. Thrive anywhere in Ethiopia.**

[App Name] is an AI-powered, mobile-first interactive health risk map designed for the **2026 Wellness Hackathon**. It empowers travelers, families, and professionals in Ethiopia to understand region-specific health risks and receive personalized, culturally relevant wellness guidance in real-time.

## 🚀 Key Features
- **🗺️ Interactive Ethiopia Map:** Tap any region (Addis Ababa, Oromia, Afar, etc.) to instantly view baseline health risks (Malaria, Altitude Sickness, Dehydration).
- **🤖 Hybrid AI Health Assistant:** A smart chatbot that combines **real-time web search** (via Tavily API) for live health advisories with a **curated offline knowledge base** for reliable, instant fallback.
- **👤 Personalized Profiles:** Advice adapts dynamically based on age, pregnancy status, and pre-existing conditions.
- **📴 Offline-First Architecture:** Critical health data and chat history are cached locally, ensuring functionality in rural areas with poor connectivity.
- **🌍 Culturally Aware:** Recommends practical, local remedies (e.g., honey, ginger, teff) alongside modern medical advice.

## 🛠️ Tech Stack
- **Frontend:** Next.js 14 (App Router), React, TypeScript, Tailwind CSS
- **UI Components:** shadcn/ui, Lucide Icons
- **State Management:** Zustand (with localStorage persistence)
- **Maps:** Leaflet.js + React-Leaflet (with custom GeoJSON boundaries)
- **AI & Search:** Vercel AI SDK, Groq (Llama 3.1 70B for speed), Tavily Search API (for real-time data)

## 🏆 Hackathon Alignment
- **Track:** Personal Wellness & Lifestyle Intelligence / Nutrition & Lifestyle Innovation
- **Impact:** Bridges the gap between public health data and everyday citizens, preventing avoidable illnesses through proactive knowledge.
- **Revenue Model:** B2B2C partnerships with Ethiopian health insurers, corporate wellness programs, and NGO public health campaigns.

## 🚀 Getting Started
1. Clone the repository: `git clone https://github.com/your-username/tena-ai.git`
2. Install dependencies: `npm install`
3. Set up environment variables (`.env.local`):
   ```env
   GROQ_API_KEY=your_groq_key
   TAVILY_API_KEY=your_tavily_key # For real-time AI search
