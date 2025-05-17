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
  const { id } = useParams<{ id: string }>(); // Get prediction ID from URL
  const navigate = useNavigate();
  const [prediction, setPrediction] = useState<Prediction | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

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

  return (
    <div className="p-6 bg-[#dad7cd]">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold mb-4 text-[#344e41]">📊 Prediction Details</h2>

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
              <p className="mt-1 text-lg text-[#344e41]">{prediction.predictedYield.toFixed(1)}</p>
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