import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;


// ======================================================
// GEMINI
// ======================================================

const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
});

console.log(
    "Gemini API key loaded:",
    Boolean(process.env.GEMINI_API_KEY)
);


// ======================================================
// STARTUPHUB SYSTEM INSTRUCTION
// ======================================================

const STARTUPHUB_SYSTEM_INSTRUCTION = `

You are StartupHub AI Assistant.

You are the official AI assistant for the StartupHub web application.

StartupHub is a startup team-building platform that helps founders
connect with developers and build startup teams.

StartupHub allows users to:

- Explore startup projects
- Discover opportunities
- Founders can create and manage projects
- Developers can browse available projects
- Developers can apply to projects
- Founders can manage applications
- Users can manage their profiles

Your main areas of assistance are:

1. StartupHub
2. Startup projects
3. Founders
4. Developers
5. Team building
6. Project discovery
7. Project applications
8. MVP development
9. Startup ideas
10. Product development
11. Web development
12. Technology
13. Startup planning

IMPORTANT RULES:

- When someone asks "What is StartupHub?",
  explain the StartupHub application.

- Do NOT explain Microsoft Founders Hub,
  Startup India, or another organization
  with a similar name.

- Do not invent users, projects, applications,
  Firebase records, or other database information.

- Do not claim that you can access Firebase data
  unless the application explicitly provides that data.

- If a question is related to StartupHub,
  startups, technology, business, development,
  team building, projects, founders or developers,
  answer helpfully.

- If a question is completely unrelated,
  politely explain that you are mainly designed
  for StartupHub and startup-related assistance.

- Keep responses concise and easy to understand.

- This chatbot is being used as part of a
  college project/demo.

- Do not give unnecessarily long answers.

`;


// ======================================================
// HEALTH CHECK
// ======================================================

app.get("/api/health", (req, res) => {

    res.json({
        success: true,
        message: "StartupHub AI server is running!",
    });

});


// ======================================================
// CHAT API
// ======================================================

app.post("/api/chat", async (req, res) => {

    console.log("\n====================================");
    console.log("STARTUPHUB CHAT REQUEST");
    console.log("====================================");

    try {

        const { message } = req.body;

        console.log("User message:", message);


        // ==============================================
        // VALIDATION
        // ==============================================

        if (
            !message ||
            typeof message !== "string" ||
            !message.trim()
        ) {

            return res.status(400).json({
                success: false,
                message: "Message is required.",
            });

        }


        // ==============================================
        // CHECK API KEY
        // ==============================================

        if (!process.env.GEMINI_API_KEY) {

            console.error(
                "GEMINI_API_KEY is missing."
            );

            return res.status(500).json({
                success: false,
                message:
                    "Gemini API key is not configured on the server.",
            });

        }


        // ==============================================
        // GEMINI REQUEST
        // ==============================================

        console.log(
            "Sending request to Gemini..."
        );

        const response =
            await ai.interactions.create({

                model: "gemini-3.8-flash",

                input: message.trim(),

                system_instruction:
                    STARTUPHUB_SYSTEM_INSTRUCTION,

                generation_config: {

                    // Faster chatbot responses
                    thinking_level: "low",

                    // Keep responses short
                    max_output_tokens: 500,

                },

            });


        console.log(
            "Gemini response received."
        );


        // ==============================================
        // GET RESPONSE TEXT
        // ==============================================

        const reply =
            response?.output_text?.trim();


        console.log(
            "AI reply:",
            reply
        );


        // ==============================================
        // EMPTY RESPONSE
        // ==============================================

        if (!reply) {

            console.error(
                "Gemini returned an empty response."
            );

            return res.status(502).json({

                success: false,

                message:
                    "Gemini returned an empty response.",

            });

        }


        // ==============================================
        // SEND RESPONSE TO REACT
        // ==============================================

        return res.json({

            success: true,

            reply: reply,

        });

    }

    // ==================================================
    // ERROR HANDLING
    // ==================================================

    catch (error) {

        console.error(
            "\n========== GEMINI ERROR =========="
        );

        console.error(
            "Message:",
            error?.message
        );

        console.error(
            "Status:",
            error?.status
        );

        console.error(
            "Code:",
            error?.code
        );

        console.error(
            "Full error:",
            error
        );

        console.error(
            "==================================\n"
        );


        const errorMessage =
            String(error?.message || "").toLowerCase();


        // ==============================================
        // GEMINI FREE-TIER / RATE LIMIT
        // ==============================================

        if (
            error?.status === 429 ||
            error?.code === 429 ||
            errorMessage.includes("limit exceeded") ||
            errorMessage.includes("rate limit") ||
            errorMessage.includes("quota") ||
            errorMessage.includes("requests per day") ||
            errorMessage.includes("free tier")
        ) {

            console.warn(
                "Gemini free-tier quota/rate limit reached."
            );

            return res.status(429).json({

                success: false,

                message:
                    "StartupHub AI has reached today's free AI request limit. Please try again after the quota resets.",

            });

        }


        // ==============================================
        // GEMINI SERVER / TEMPORARY ERROR
        // ==============================================

        if (
            error?.status === 500 ||
            error?.status === 502 ||
            error?.status === 503
        ) {

            return res.status(503).json({

                success: false,

                message:
                    "StartupHub AI is temporarily unavailable. Please try again later.",

            });

        }


        // ==============================================
        // GENERAL ERROR
        // ==============================================

        return res.status(500).json({

            success: false,

            message:
                "StartupHub AI is temporarily unavailable. Please try again later.",

            error:
                process.env.NODE_ENV === "development"
                    ? error?.message
                    : undefined,

        });

    }

});


// ======================================================
// SERVER
// ======================================================

app.listen(PORT, "0.0.0.0", () => {
    console.log(
        `StartupHub AI server running on port ${PORT}`
    );
});
