const API_BASE_URL =
    import.meta.env.VITE_API_URL ||
    "https://startuphub-api.vercel.app";

const API_URL =
    `${API_BASE_URL.replace(/\/$/, "")}/api/chat`;

class AIService {

    async getResponse(message) {

        try {

            console.log(
                "Sending message to StartupHub AI:",
                message
            );

            const response = await fetch(API_URL, {

                method: "POST",

                headers: {
                    "Content-Type": "application/json",
                },

                body: JSON.stringify({
                    message: message.trim(),
                }),

            });

            const data = await response.json();

            console.log(
                "StartupHub AI response:",
                data
            );

            if (!response.ok || !data.success) {

                throw new Error(
                    data?.message ||
                    `Server error: ${response.status}`
                );

            }

            if (!data.reply) {

                throw new Error(
                    "StartupHub AI returned an empty response."
                );

            }

            return data.reply;

        } catch (error) {

            console.error(
                "StartupHub AI Service Error:",
                error
            );

            throw error;

        }

    }

}

export default new AIService();