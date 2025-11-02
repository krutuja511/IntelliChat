import "dotenv/config";

const getOpenAIAPIResponse = async (message) => {
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
    },
    body: JSON.stringify({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "user",
          content: message,
        },
      ],
    }),
  };

  try {
    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", options);

    const data = await response.json();

    if (!response.ok) {
      console.error("OpenAI API Error:", data);
      return "Sorry, I couldn’t get a response from OpenAI.";
    }

    if (!data.choices || !data.choices[0] || !data.choices[0].message) {
      console.error("Unexpected OpenAI API response:", data);
      return "No valid response received from OpenAI.";
    }

    return data.choices[0].message.content;
  } catch (err) {
    console.error(" Fetch error in OpenAI API:", err);
    return "Something went wrong while connecting to OpenAI API.";
  }
};

export default getOpenAIAPIResponse;

