import { TrendingUp, TrendingDown, Minus } from 'lucide-react';
import type { CorrelationResponse, BothCorrelationResponse } from '../types/correlation';

interface ResultDisplayProps {
  result: CorrelationResponse | BothCorrelationResponse | null;
  type: 'pearson' | 'spearman' | 'both';
}

function ResultCard({ title, data }: { title: string; data: CorrelationResponse }) {
  const getIcon = () => {
    if (data.coefficient > 0.1) return <TrendingUp className="text-green-600" size={24} />;
    if (data.coefficient < -0.1) return <TrendingDown className="text-red-600" size={24} />;
    return <Minus className="text-gray-600" size={24} />;
  };

  const getStrength = () => {
    const abs = Math.abs(data.coefficient);
    if (abs >= 0.9) return 'Very Strong';
    if (abs >= 0.7) return 'Strong';
    if (abs >= 0.5) return 'Moderate';
    if (abs >= 0.3) return 'Weak';
    return 'Very Weak';
  };

  const getColorClass = () => {
    const abs = Math.abs(data.coefficient);
    if (abs >= 0.7) return 'text-green-700';
    if (abs >= 0.4) return 'text-blue-700';
    return 'text-gray-700';
  };

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
        {getIcon()}
      </div>
      <div className="space-y-2">
        <div className="flex justify-between items-baseline">
          <span className="text-sm text-gray-600">Coefficient:</span>
          <span className={`text-2xl font-bold ${getColorClass()}`}>
            {data.coefficient.toFixed(4)}
          </span>
        </div>
        <div className="flex justify-between items-baseline">
          <span className="text-sm text-gray-600">Percentage:</span>
          <span className="text-lg font-semibold text-gray-700">{data.percentage}</span>
        </div>
        <div className="pt-2 border-t border-gray-100">
          <span className="text-xs text-gray-500">Strength: </span>
          <span className="text-sm font-medium text-gray-700">{getStrength()}</span>
        </div>
      </div>
    </div>
  );
}

export function ResultDisplay({ result, type }: ResultDisplayProps) {
  if (!result) return null;

  if (type === 'both' && 'pearson' in result && 'spearman' in result) {
    return (
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-gray-900">Results</h2>
        <div className="grid md:grid-cols-2 gap-4">
          <ResultCard title="Pearson Correlation" data={result.pearson} />
          <ResultCard title="Spearman Correlation" data={result.spearman} />
        </div>
      </div>
    );
  }

  const title = type === 'pearson' ? 'Pearson Correlation' : 'Spearman Correlation';
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold text-gray-900">Result</h2>
      <ResultCard title={title} data={result as CorrelationResponse} />
    </div>
  );
}
