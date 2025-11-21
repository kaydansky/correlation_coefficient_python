import { useState } from 'react';
import { Calculator, AlertCircle } from 'lucide-react';
import { DatasetInput } from './components/DatasetInput';
import { ResultDisplay } from './components/ResultDisplay';
import { calculateCorrelation, CorrelationApiError } from './services/correlationApi';
import type { CorrelationType, CorrelationResponse, BothCorrelationResponse } from './types/correlation';

function App() {
  const [arrayX, setArrayX] = useState<number[]>([]);
  const [arrayY, setArrayY] = useState<number[]>([]);
  const [correlationType, setCorrelationType] = useState<CorrelationType>('both');
  const [result, setResult] = useState<CorrelationResponse | BothCorrelationResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleCalculate = async () => {
    setError(null);
    setResult(null);

    if (arrayX.length === 0 || arrayY.length === 0) {
      setError('Please add values to both datasets');
      return;
    }

    if (arrayX.length !== arrayY.length) {
      setError('Both datasets must have the same number of values');
      return;
    }

    if (arrayX.length < 2) {
      setError('Each dataset must contain at least 2 values');
      return;
    }

    setLoading(true);

    try {
      const response = await calculateCorrelation(correlationType, arrayX, arrayY);
      setResult(response);
    } catch (err) {
      if (err instanceof CorrelationApiError) {
        setError(err.message);
      } else {
        setError('An unexpected error occurred');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleClear = () => {
    setArrayX([]);
    setArrayY([]);
    setResult(null);
    setError(null);
  };

  const handleCorrelationTypeChange = (type: CorrelationType) => {
    setCorrelationType(type);
    setResult(null);
    setError(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-slate-50">
      <div className="max-w-5xl mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-3">
            <Calculator className="text-blue-600" size={36} />
            <h1 className="text-4xl font-bold text-gray-900">
              Correlation Calculator
            </h1>
          </div>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Calculate Pearson and Spearman correlation coefficients to measure the statistical relationship between two datasets
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-8 mb-6">
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <DatasetInput
              label="Dataset X"
              values={arrayX}
              onChange={setArrayX}
            />
            <DatasetInput
              label="Dataset Y"
              values={arrayY}
              onChange={setArrayY}
            />
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Correlation Type
            </label>
            <div className="flex gap-3">
              <button
                onClick={() => handleCorrelationTypeChange('pearson')}
                className={`flex-1 py-2.5 px-4 rounded-lg font-medium transition ${
                  correlationType === 'pearson'
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Pearson
              </button>
              <button
                onClick={() => handleCorrelationTypeChange('spearman')}
                className={`flex-1 py-2.5 px-4 rounded-lg font-medium transition ${
                  correlationType === 'spearman'
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Spearman
              </button>
              <button
                onClick={() => handleCorrelationTypeChange('both')}
                className={`flex-1 py-2.5 px-4 rounded-lg font-medium transition ${
                  correlationType === 'both'
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Both
              </button>
            </div>
          </div>

          <div className="flex gap-3">
            <button
              onClick={handleCalculate}
              disabled={loading || arrayX.length === 0 || arrayY.length === 0}
              className="flex-1 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition shadow-md hover:shadow-lg"
            >
              {loading ? 'Calculating...' : 'Calculate Correlation'}
            </button>
            <button
              onClick={handleClear}
              className="px-6 py-3 bg-gray-100 text-gray-700 rounded-lg font-semibold hover:bg-gray-200 transition"
            >
              Clear
            </button>
          </div>

          {error && (
            <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3">
              <AlertCircle className="text-red-600 flex-shrink-0 mt-0.5" size={20} />
              <p className="text-red-800 text-sm">{error}</p>
            </div>
          )}
        </div>

        {result && (
          <ResultDisplay result={result} type={correlationType} />
        )}

        <div className="mt-8 bg-white rounded-xl shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-3">About Correlation Coefficients</h3>
          <div className="space-y-3 text-sm text-gray-600">
            <div>
              <strong className="text-gray-900">Pearson Correlation:</strong> Measures linear relationships between variables. Values range from -1 (perfect negative) to +1 (perfect positive).
            </div>
            <div>
              <strong className="text-gray-900">Spearman Correlation:</strong> Measures monotonic relationships using ranked values. More robust to outliers and non-linear patterns.
            </div>
            <div className="pt-2 border-t border-gray-100">
              <strong className="text-gray-900">Interpretation:</strong>
              <ul className="list-disc list-inside mt-1 space-y-1 ml-2">
                <li>±0.9 to ±1.0: Very strong correlation</li>
                <li>±0.7 to ±0.9: Strong correlation</li>
                <li>±0.5 to ±0.7: Moderate correlation</li>
                <li>±0.3 to ±0.5: Weak correlation</li>
                <li>0.0 to ±0.3: Very weak or no correlation</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
