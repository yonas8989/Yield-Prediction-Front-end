import { useState } from "react";
import {
  GridIcon,
  CalenderIcon,
} from "../../icons";

// Types
type Prediction = {
  id: string;
  date: string;
  region: string;
  cropType: string;
  temperature: number;
  rainfall: number;
  humidity: number;
  soilType: string;
  ndvi: number;
  predictedYield: number;
  confidence: number;
};

// Mock data - Replace with actual API calls
const mockPredictions: Prediction[] = [
  {
    id: "1",
    date: "2024-03-15",
    region: "North Region",
    cropType: "Wheat",
    temperature: 25.5,
    rainfall: 120,
    humidity: 65,
    soilType: "Loamy",
    ndvi: 0.75,
    predictedYield: 45.2,
    confidence: 0.92,
  },
  {
    id: "2",
    date: "2024-03-15",
    region: "North Region",
    cropType: "Wheat",
    temperature: 25.5,
    rainfall: 120,
    humidity: 65,
    soilType: "Loamy",
    ndvi: 0.75,
    predictedYield: 45.2,
    confidence: 0.92,
  },
  {
    id: "3",
    date: "2024-03-15",
    region: "North Region",
    cropType: "Wheat",
    temperature: 25.5,
    rainfall: 120,
    humidity: 65,
    soilType: "Loamy",
    ndvi: 0.75,
    predictedYield: 45.2,
    confidence: 0.92,
  },
  {
    id: "4",
    date: "2024-03-15",
    region: "North Region",
    cropType: "Wheat",
    temperature: 25.5,
    rainfall: 120,
    humidity: 65,
    soilType: "Loamy",
    ndvi: 0.75,
    predictedYield: 45.2,
    confidence: 0.92,
  },
  // Add more mock data as needed
];

const PastPrediction = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCrop, setSelectedCrop] = useState("");
  const [selectedRegion, setSelectedRegion] = useState("");
  const [showNewPredictionForm, setShowNewPredictionForm] = useState(false);
  const [newPrediction, setNewPrediction] = useState({
    region: "",
    cropType: "",
    temperature: "",
    rainfall: "",
    humidity: "",
    soilType: "",
    ndvi: "",
  });

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleNewPredictionSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Add API call here
    console.log("New prediction submitted:", newPrediction);
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">🌾 Past Predictions</h1>
        <button
          onClick={() => setShowNewPredictionForm(!showNewPredictionForm)}
          className="bg-brand-500 text-white px-4 py-2 rounded-lg hover:bg-brand-600 transition-colors"
        >
          {showNewPredictionForm ? "View Past Predictions" : "New Prediction"}
        </button>
      </div>

      {showNewPredictionForm ? (
        // New Prediction Form
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">🎯 New Prediction</h2>
          <form onSubmit={handleNewPredictionSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Region</label>
                <input
                  type="text"
                  value={newPrediction.region}
                  onChange={(e) => setNewPrediction({ ...newPrediction, region: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-brand-500 focus:ring-brand-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Crop Type</label>
                <select
                  value={newPrediction.cropType}
                  onChange={(e) => setNewPrediction({ ...newPrediction, cropType: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-brand-500 focus:ring-brand-500"
                  required
                >
                  <option value="">Select Crop</option>
                  <option value="wheat">Wheat</option>
                  <option value="rice">Rice</option>
                  <option value="corn">Corn</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Temperature (°C)</label>
                <input
                  type="number"
                  value={newPrediction.temperature}
                  onChange={(e) => setNewPrediction({ ...newPrediction, temperature: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-brand-500 focus:ring-brand-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Rainfall (mm)</label>
                <input
                  type="number"
                  value={newPrediction.rainfall}
                  onChange={(e) => setNewPrediction({ ...newPrediction, rainfall: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-brand-500 focus:ring-brand-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Humidity (%)</label>
                <input
                  type="number"
                  value={newPrediction.humidity}
                  onChange={(e) => setNewPrediction({ ...newPrediction, humidity: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-brand-500 focus:ring-brand-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Soil Type</label>
                <select
                  value={newPrediction.soilType}
                  onChange={(e) => setNewPrediction({ ...newPrediction, soilType: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-brand-500 focus:ring-brand-500"
                  required
                >
                  <option value="">Select Soil Type</option>
                  <option value="loamy">Loamy</option>
                  <option value="clay">Clay</option>
                  <option value="sandy">Sandy</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">NDVI</label>
                <input
                  type="number"
                  step="0.01"
                  value={newPrediction.ndvi}
                  onChange={(e) => setNewPrediction({ ...newPrediction, ndvi: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-brand-500 focus:ring-brand-500"
                  required
                />
              </div>
            </div>
            <div className="flex justify-end">
              <button
                type="submit"
                className="bg-brand-500 text-white px-6 py-2 rounded-lg hover:bg-brand-600 transition-colors"
              >
                Predict Yield
              </button>
            </div>
          </form>
        </div>
      ) : (
        // Past Predictions Table
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
                />
              </div>
              <div className="flex gap-2">
                <select
                  value={selectedCrop}
                  onChange={(e) => setSelectedCrop(e.target.value)}
                  className="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent"
                >
                  <option value="">All Crops</option>
                  <option value="wheat">Wheat</option>
                  <option value="rice">Rice</option>
                  <option value="corn">Corn</option>
                </select>
                <select
                  value={selectedRegion}
                  onChange={(e) => setSelectedRegion(e.target.value)}
                  className="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent"
                >
                  <option value="">All Regions</option>
                  <option value="north">North Region</option>
                  <option value="south">South Region</option>
                  <option value="east">East Region</option>
                  <option value="west">West Region</option>
                </select>
              </div>
            </div>
          </div>
          <div className="overflow-x-auto">
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
                    Region
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Crop Type
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Predicted Yield
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Confidence
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {mockPredictions.map((prediction) => (
                  <tr key={prediction.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {prediction.date}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {prediction.region}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {prediction.cropType}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {prediction.predictedYield} q/ha
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <div className="flex items-center">
                        <div className="w-16 bg-gray-200 rounded-full h-2.5">
                          <div
                            className="bg-brand-500 h-2.5 rounded-full"
                            style={{ width: `${prediction.confidence * 100}%` }}
                          ></div>
                        </div>
                        <span className="ml-2">{Math.round(prediction.confidence * 100)}%</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <button className="text-brand-500 hover:text-brand-600">
                        View Details
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default PastPrediction; 