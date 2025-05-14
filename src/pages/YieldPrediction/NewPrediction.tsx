import { useState } from "react";
import { useNavigate } from "react-router-dom";
import apiClient from "../../api/axiosConfig";

// Types
type WeatherConditions = {
  temperatureMax: string;
  temperatureMin: string;
  humidity: string;
  windSpeed: string;
};

type PredictionInput = {
  cropType: string;
  fieldSize: string;
  soilType: string;
  weatherConditions: WeatherConditions;
};

const NewPrediction = () => {
  const [newPrediction, setNewPrediction] = useState<PredictionInput>({
    cropType: "",
    fieldSize: "",
    soilType: "",
    weatherConditions: {
      temperatureMax: "",
      temperatureMin: "",
      humidity: "",
      windSpeed: "",
    },
  });
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleNewPredictionSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccessMessage(null);
    setIsSubmitting(true);

    // Prepare payload
    const payload = {
      cropType: newPrediction.cropType,
      fieldSize: parseFloat(newPrediction.fieldSize),
      soilType: newPrediction.soilType,
      weatherConditions: {
        temperatureMax: parseFloat(newPrediction.weatherConditions.temperatureMax),
        temperatureMin: parseFloat(newPrediction.weatherConditions.temperatureMin),
        humidity: parseFloat(newPrediction.weatherConditions.humidity),
        windSpeed: parseFloat(newPrediction.weatherConditions.windSpeed),
      },
    };

    // Validate payload
    if (
      !payload.cropType ||
      isNaN(payload.fieldSize) ||
      !payload.soilType ||
      isNaN(payload.weatherConditions.temperatureMax) ||
      isNaN(payload.weatherConditions.temperatureMin) ||
      isNaN(payload.weatherConditions.humidity) ||
      isNaN(payload.weatherConditions.windSpeed)
    ) {
      setError("Please fill in all fields with valid numbers.");
      setIsSubmitting(false);
      return;
    }

    // Log payload for debugging
    console.log("Sending payload:", payload);

    try {
      // Get token from localStorage
      const token = localStorage.getItem("token");
      if (!token) {
        setError("You must be logged in to make a prediction. Please log in.");
        setIsSubmitting(false);
        return;
      }

      // Make API call with Authorization header
      const response = await apiClient.post(
        "/api/v1/yields/predict",
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Prediction response:", response.data);

      // Display success message
      setSuccessMessage(response.data.message || "Prediction created successfully!");

      // Reset form
      setNewPrediction({
        cropType: "",
        fieldSize: "",
        soilType: "",
        weatherConditions: {
          temperatureMax: "",
          temperatureMin: "",
          humidity: "",
          windSpeed: "",
        },
      });

      // Redirect to /past-predictions after 2 seconds
      setTimeout(() => {
        navigate("/past-predictions");
      }, 2000);
    } catch (err: any) {
      console.error("Error submitting prediction:", err);
      let errorMessage = "Failed to submit prediction. Please try again.";
      if (err.response?.status === 401 || err.response?.data?.message?.toLowerCase().includes("login")) {
        errorMessage = "You must be logged in to make a prediction. Please log in.";
      } else if (err.response?.data?.message || err.response?.data?.error) {
        errorMessage = err.response.data.message || err.response.data.error;
      }
      setError(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="p-6">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold mb-4">🎯 New Prediction</h2>
        {error && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg">
            {error}
          </div>
        )}
        {successMessage && (
          <div className="mb-4 p-3 bg-green-100 text-green-700 rounded-lg">
            {successMessage}
          </div>
        )}
        <form onSubmit={handleNewPredictionSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Crop Type</label>
              <select
                value={newPrediction.cropType}
                onChange={(e) => setNewPrediction({ ...newPrediction, cropType: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-brand-500 focus:ring-brand-500"
                required
                disabled={isSubmitting}
              >
                <option value="">Select Crop</option>
                <option value="Wheat">Wheat</option>
                <option value="Rice">Rice</option>
                <option value="Corn">Corn</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Field Size (ha)</label>
              <input
                type="number"
                step="0.1"
                min="0"
                value={newPrediction.fieldSize}
                onChange={(e) => setNewPrediction({ ...newPrediction, fieldSize: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-brand-500 focus:ring-brand-500"
                required
                disabled={isSubmitting}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Soil Type</label>
              <select
                value={newPrediction.soilType}
                onChange={(e) => setNewPrediction({ ...newPrediction, soilType: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-brand-500 focus:ring-brand-500"
                required
                disabled={isSubmitting}
              >
                <option value="">Select Soil Type</option>
                <option value="Loam">Loam</option>
                <option value="Clay">Clay</option>
                <option value="Sandy">Sandy</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Max Temperature (°C)</label>
              <input
                type="number"
                value={newPrediction.weatherConditions.temperatureMax}
                onChange={(e) =>
                  setNewPrediction({
                    ...newPrediction,
                    weatherConditions: { ...newPrediction.weatherConditions, temperatureMax: e.target.value },
                  })
                }
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-brand-500 focus:ring-brand-500"
                required
                disabled={isSubmitting}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Min Temperature (°C)</label>
              <input
                type="number"
                value={newPrediction.weatherConditions.temperatureMin}
                onChange={(e) =>
                  setNewPrediction({
                    ...newPrediction,
                    weatherConditions: { ...newPrediction.weatherConditions, temperatureMin: e.target.value },
                  })
                }
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-brand-500 focus:ring-brand-500"
                required
                disabled={isSubmitting}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Humidity (%)</label>
              <input
                type="number"
                min="0"
                max="100"
                value={newPrediction.weatherConditions.humidity}
                onChange={(e) =>
                  setNewPrediction({
                    ...newPrediction,
                    weatherConditions: { ...newPrediction.weatherConditions, humidity: e.target.value },
                  })
                }
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-brand-500 focus:ring-brand-500"
                required
                disabled={isSubmitting}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Wind Speed (km/h)</label>
              <input
                type="number"
                step="0.1"
                min="0"
                value={newPrediction.weatherConditions.windSpeed}
                onChange={(e) =>
                  setNewPrediction({
                    ...newPrediction,
                    weatherConditions: { ...newPrediction.weatherConditions, windSpeed: e.target.value },
                  })
                }
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-brand-500 focus:ring-brand-500"
                required
                disabled={isSubmitting}
              />
            </div>
          </div>
          <div className="flex justify-end">
            <button
              type="submit"
              className={`bg-brand-500 text-white px-6 py-2 rounded-lg hover:bg-brand-600 transition-colors ${
                isSubmitting ? "opacity-50 cursor-not-allowed" : ""
              }`}
              disabled={isSubmitting}
            >
              {isSubmitting ? "Submitting..." : "Predict Yield"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewPrediction;