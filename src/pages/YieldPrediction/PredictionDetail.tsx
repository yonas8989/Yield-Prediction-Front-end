import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import apiClient from "../../api/axiosConfig";

// Types
type Prediction = {
  id: string;
  name: string;
  elevation: number;
  year: number;
  precipitation: number;
  relativeHumidity: number;
  sunshineHours: number;
  temperatureMin: number;
  temperatureMax: number;
  windSpeed: number;
  predictedYield: number;
  predictionDate: string;
};

const PredictionDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [prediction, setPrediction] = useState<Prediction | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState<{ sender: string; text: string }[]>([]);
  const [userInput, setUserInput] = useState("");

  useEffect(() => {
    const fetchPrediction = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const token = localStorage.getItem("token");
        if (!token) {
          setError("You must be logged in to view prediction details. Redirecting to login...");
          setTimeout(() => navigate("/login"), 2000);
          setIsLoading(false);
          return;
        }

        const response = await apiClient.get(`/api/v1/yields/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = response.data.data.prediction;
        const formattedPrediction: Prediction = {
          id: data._id,
          name: data.name,
          elevation: data.elevation,
          year: data.year,
          precipitation: data.precipitation,
          relativeHumidity: data.relativeHumidity,
          sunshineHours: data.sunshineHours,
          temperatureMin: data.temperatureMin,
          temperatureMax: data.temperatureMax,
          windSpeed: data.windSpeed,
          predictedYield: data.predictedYield,
          predictionDate: new Date(data.predictionDate).toLocaleDateString(),
        };

        setPrediction(formattedPrediction);
        // Initialize chat with a default Gemini message
        setChatMessages([
          {
            sender: "Gemini",
            text: `Let's analyze the yield prediction for ${formattedPrediction.name} in ${formattedPrediction.year}. The predicted yield is ${formattedPrediction.predictedYield} q/ha. Would you like me to reason about factors affecting this yield or suggest ways to maximize production?`,
          },
        ]);
      } catch (err: any) {
        console.error("Error fetching prediction:", err);
        let errorMessage = "Failed to load prediction details. Please try again.";
        if (err.response?.status === 401 || err.response?.data?.message?.toLowerCase().includes("login")) {
          errorMessage = "You must be logged in to view prediction details. Redirecting to login...";
          setTimeout(() => navigate("/login"), 2000);
        } else if (err.response?.status === 404) {
          errorMessage = "Prediction not found.";
        } else if (err.response?.data?.message || err.response?.data?.error) {
          errorMessage = err.response.data.message || err.response.data.error;
        }
        setError(errorMessage);
      } finally {
        setIsLoading(false);
      }
    };

    if (id) {
      fetchPrediction();
    } else {
      setError("Invalid prediction ID.");
      setIsLoading(false);
    }
  }, [id, navigate]);

  const handleChatToggle = () => {
    setIsChatOpen(!isChatOpen);
  };

  const handleSendMessage = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && userInput.trim() && prediction) {
      const newUserMessage = { sender: "User", text: userInput };
      setChatMessages((prev) => [...prev, newUserMessage]);
      setUserInput("");

      try {
        const token = localStorage.getItem("token");
        if (!token) {
          setChatMessages((prev) => [
            ...prev,
            { sender: "Gemini", text: "Error: You must be logged in to send messages." },
          ]);
          setTimeout(() => navigate("/login"), 2000);
          return;
        }

        const response = await apiClient.post(
          "/api/v1/chat/send",
          {
            predictionId: prediction.id,
            message: userInput,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setChatMessages((prev) => [
          ...prev,
          { sender: "Gemini", text: response.data.data.message.message },
        ]);
      } catch (err: any) {
        console.error("Error sending chat message:", err);
        let errorMessage = "Error: Failed to get response from Gemini.";
        if (err.response?.status === 401) {
          errorMessage = "Error: Session expired. Redirecting to login...";
          setTimeout(() => navigate("/login"), 2000);
        } else if (err.response?.status === 404) {
          errorMessage = "Error: Prediction not found.";
        } else if (err.response?.data?.message) {
          errorMessage = `Error: ${err.response.data.message}`;
        }
        setChatMessages((prev) => [...prev, { sender: "Gemini", text: errorMessage }]);
      }
    }
  };

  return (
    <div className="p-6 bg-[#dad7cd] min-h-screen">
      <div className="bg-white rounded-lg shadow-md p-6 max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-[#344e41]">📊 Prediction Details</h2>
          <button
            onClick={handleChatToggle}
            className="bg-[#588157] text-white px-4 py-2 rounded-lg hover:bg-[#344e41] transition-colors flex items-center gap-2"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
              />
            </svg>
            {isChatOpen ? "Close Chat" : "Chat with Gemini"}
          </button>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg">
            {error}
          </div>
        )}

        {isLoading && (
          <div className="p-6 text-center text-[#344e41]">Loading prediction details...</div>
        )}

        {!isLoading && !error && prediction && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-sm font-medium text-[#344e41] uppercase">Location</h3>
              <p className="mt-1 text-lg text-[#344e41]">{prediction.name}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-[#344e41] uppercase">Year</h3>
              <p className="mt-1 text-lg text-[#344e41]">{prediction.year}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-[#344e41] uppercase">Elevation (m)</h3>
              <p className="mt-1 text-lg text-[#344e41]">{prediction.elevation}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-[#344e41] uppercase">Precipitation (mm)</h3>
              <p className="mt-1 text-lg text-[#344e41]">{prediction.precipitation.toFixed(1)}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-[#344e41] uppercase">Relative Humidity (%)</h3>
              <p className="mt-1 text-lg text-[#344e41]">{prediction.relativeHumidity.toFixed(1)}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-[#344e41] uppercase">Sunshine Hours (hrs)</h3>
              <p className="mt-1 text-lg text-[#344e41]">{prediction.sunshineHours.toFixed(1)}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-[#344e41] uppercase">Min Temperature (°C)</h3>
              <p className="mt-1 text-lg text-[#344e41]">{prediction.temperatureMin.toFixed(1)}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-[#344e41] uppercase">Max Temperature (°C)</h3>
              <p className="mt-1 text-lg text-[#344e41]">{prediction.temperatureMax.toFixed(1)}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-[#344e41] uppercase">Wind Speed (km/h)</h3>
              <p className="mt-1 text-lg text-[#344e41]">{prediction.windSpeed.toFixed(1)}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-[#344e41] uppercase">Predicted Yield (q/ha)</h3>
              <p className="mt-1 text-lg text-[#344e41]">{prediction.predictedYield}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-[#344e41] uppercase">Prediction Date</h3>
              <p className="mt-1 text-lg text-[#344e41]">{prediction.predictionDate}</p>
            </div>
          </div>
        )}

        {!isLoading && !error && !prediction && (
          <div className="p-6 text-center text-[#344e41]">No prediction data available.</div>
        )}

        {isChatOpen && (
          <div className="mt-6 bg-[#f4f4f4] rounded-lg p-4">
            <h3 className="text-lg font-semibold text-[#344e41] mb-4">Chat with Gemini</h3>
            <div className="h-64 overflow-y-auto bg-white rounded-lg p-4 mb-4">
              {chatMessages.map((message, index) => (
                <div
                  key={index}
                  className={`mb-2 p-2 rounded-lg ${
                    message.sender === "User"
                      ? "bg-[#588157] text-white ml-auto max-w-[80%]"
                      : "bg-[#e0e0e0] text-[#344e41] max-w-[80%]"
                  }`}
                >
                  <p className="text-sm font-medium">{message.sender}</p>
                  <p>{message.text}</p>
                </div>
              ))}
            </div>
            <input
              type="text"
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              onKeyDown={handleSendMessage}
              placeholder="Type your message and press Enter..."
              className="w-full p-2 border border-[#dad7cd] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#588157]"
            />
          </div>
        )}

        <div className="mt-6 flex justify-end">
          <button
            onClick={() => navigate("/past-predictions")}
            className="bg-[#3a5a40] text-white px-6 py-2 rounded-lg hover:bg-[#344e41] transition-colors"
          >
            Back to Past Predictions
          </button>
        </div>
      </div>
    </div>
  );
};

export default PredictionDetail;