import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { GridIcon, CalenderIcon } from "../../icons";
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
  userId: string;
  cropType: string;
  fieldSize: number;
  soilType: string;
  weatherConditions: WeatherConditions;
  predictedYield: number;
  predictionDate: string;
  createdAt: string;
  updatedAt: string;
};

const PastPrediction = () => {
  const [predictions, setPredictions] = useState<Prediction[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCrop, setSelectedCrop] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  // Fetch predictions on mount
  useEffect(() => {
    const fetchPredictions = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const token = localStorage.getItem("token");
        if (!token) {
          setError("You must be logged in to view predictions. Please log in.");
          setIsLoading(false);
          return;
        }

        const response = await apiClient.get("/api/v1/yields/history", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const history = response.data.data.history || [];
        // Map API response to Prediction type
        const formattedPredictions: Prediction[] = history.map((item: any) => ({
          id: item._id,
          userId: item.userId,
          cropType: item.cropType,
          fieldSize: item.fieldSize,
          soilType: item.soilType,
          weatherConditions: item.weatherConditions,
          predictedYield: item.predictedYield,
          predictionDate: new Date(item.predictionDate).toLocaleDateString(),
          createdAt: item.createdAt,
          updatedAt: item.updatedAt,
        }));

        setPredictions(formattedPredictions);
      } catch (err: any) {
        console.error("Error fetching predictions:", err);
        let errorMessage = "Failed to load predictions. Please try again.";
        if (err.response?.status === 401 || err.response?.data?.message?.toLowerCase().includes("login")) {
          errorMessage = "You must be logged in to view predictions. Please log in.";
        } else if (err.response?.data?.message || err.response?.data?.error) {
          errorMessage = err.response.data.message || err.response.data.error;
        }
        setError(errorMessage);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPredictions();
  }, []);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  // Filter predictions based on search term and crop
  const filteredPredictions = predictions.filter((prediction) => {
    const matchesSearch =
      prediction.cropType.toLowerCase().includes(searchTerm.toLowerCase()) ||
      prediction.soilType.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCrop = selectedCrop ? prediction.cropType.toLowerCase() === selectedCrop.toLowerCase() : true;
    return matchesSearch && matchesCrop;
  });

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">🌾 Past Predictions</h1>
      </div>

      {error && (
        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg">
          {error}
        </div>
      )}

      <div className="bg-white rounded-lg shadow-md">
        <div className="p-4 border-b border-gray-200">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                <GridIcon className="w-5 h-5" />
              </div>
              <input
                type="text"
                placeholder="Search predictions..."
                value={searchTerm}
                onChange={handleSearch}
                className="pl-10 pr-4 py-2 w-full rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent"
                disabled={isLoading}
              />
            </div>
            <div className="flex gap-2">
              <select
                value={selectedCrop}
                onChange={(e) => setSelectedCrop(e.target.value)}
                className="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent"
                disabled={isLoading}
              >
                <option value="">All Crops</option>
                <option value="wheat">Wheat</option>
                <option value="rice">Rice</option>
                <option value="corn">Corn</option>
              </select>
            </div>
          </div>
        </div>
        <div className="overflow-x-auto">
          {isLoading ? (
            <div className="p-6 text-center text-gray-500">Loading predictions...</div>
          ) : filteredPredictions.length === 0 ? (
            <div className="p-6 text-center text-gray-500">No predictions found.</div>
          ) : (
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    <div className="flex items-center">
                      <CalenderIcon className="w-4 h-4 mr-2" />
                      Date
                    </div>
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Crop Type
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Field Size (ha)
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Soil Type
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Max Temp (°C)
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Min Temp (°C)
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Humidity (%)
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Wind Speed (km/h)
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Predicted Yield (q/ha)
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredPredictions.map((prediction) => (
                  <tr key={prediction.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {prediction.predictionDate}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {prediction.cropType}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {prediction.fieldSize}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {prediction.soilType}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {prediction.weatherConditions.temperatureMax}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {prediction.weatherConditions.temperatureMin}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {prediction.weatherConditions.humidity}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {prediction.weatherConditions.windSpeed}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {prediction.predictedYield.toFixed(1)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <button
                        onClick={() => navigate(`/predictions/${prediction.id}`)}
                        className="bg-brand-500 text-white px-4 py-1 rounded-lg hover:bg-brand-600 transition-colors"
                      >
                        View
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default PastPrediction;