import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import apiClient from "../../api/axiosConfig";

// Types
type WeatherConditions = {
  temperatureMax: number;
  temperatureMin: number;
  humidity: number;
  windSpeed: number;
};

type Prediction = {
  id: string;
  cropType: string;
  fieldSize: number;
  soilType: string;
  weatherConditions: WeatherConditions;
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
          cropType: data.cropType,
          fieldSize: data.fieldSize,
          soilType: data.soilType,
          weatherConditions: data.weatherConditions,
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
    <div className="p-6">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold mb-4">📊 Prediction Details</h2>

        {error && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg">
            {error}
          </div>
        )}

        {isLoading && (
          <div className="p-6 text-center text-gray-500">Loading prediction details...</div>
        )}

        {!isLoading && !error && prediction && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-sm font-medium text-gray-500 uppercase">Crop Type</h3>
              <p className="mt-1 text-lg text-gray-900">{prediction.cropType}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-500 uppercase">Field Size (ha)</h3>
              <p className="mt-1 text-lg text-gray-900">{prediction.fieldSize}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-500 uppercase">Soil Type</h3>
              <p className="mt-1 text-lg text-gray-900">{prediction.soilType}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-500 uppercase">Predicted Yield (q/ha)</h3>
              <p className="mt-1 text-lg text-gray-900">{prediction.predictedYield.toFixed(1)}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-500 uppercase">Prediction Date</h3>
              <p className="mt-1 text-lg text-gray-900">{prediction.predictionDate}</p>
            </div>
            <div className="col-span-1 md:col-span-2">
              <h3 className="text-sm font-medium text-gray-500 uppercase mb-2">Weather Conditions</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <span className="text-sm text-gray-600">Max Temperature (°C):</span>
                  <p className="text-lg text-gray-900">{prediction.weatherConditions.temperatureMax}</p>
                </div>
                <div>
                  <span className="text-sm text-gray-600">Min Temperature (°C):</span>
                  <p className="text-lg text-gray-900">{prediction.weatherConditions.temperatureMin}</p>
                </div>
                <div>
                  <span className="text-sm text-gray-600">Humidity (%):</span>
                  <p className="text-lg text-gray-900">{prediction.weatherConditions.humidity}</p>
                </div>
                <div>
                  <span className="text-sm text-gray-600">Wind Speed (km/h):</span>
                  <p className="text-lg text-gray-900">{prediction.weatherConditions.windSpeed}</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {!isLoading && !error && !prediction && (
          <div className="p-6 text-center text-gray-500">No prediction data available.</div>
        )}

        <div className="mt-6 flex justify-end">
          <button
            onClick={() => navigate("/past-predictions")}
            className="bg-brand-500 text-white px-6 py-2 rounded-lg hover:bg-brand-600 transition-colors"
          >
            Back to Past Predictions
          </button>
        </div>
      </div>
    </div>
  );
};

export default PredictionDetail;