import { useState } from 'react';
import { Plus, X } from 'lucide-react';

interface DatasetInputProps {
  label: string;
  values: number[];
  onChange: (values: number[]) => void;
}

export function DatasetInput({ label, values, onChange }: DatasetInputProps) {
  const [inputValue, setInputValue] = useState('');

  const handleAdd = () => {
    const num = parseFloat(inputValue);
    if (!isNaN(num)) {
      onChange([...values, num]);
      setInputValue('');
    }
  };

  const handleRemove = (index: number) => {
    onChange(values.filter((_, i) => i !== index));
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleAdd();
    }
  };

  return (
    <div className="space-y-3">
      <label className="block text-sm font-medium text-gray-700">{label}</label>
      <div className="flex gap-2">
        <input
          type="number"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Enter a number"
          className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
          step="any"
        />
        <button
          onClick={handleAdd}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition flex items-center gap-2"
        >
          <Plus size={18} />
          Add
        </button>
      </div>
      {values.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {values.map((value, index) => (
            <div
              key={index}
              className="flex items-center gap-2 bg-gray-100 px-3 py-1.5 rounded-lg"
            >
              <span className="text-sm font-medium">{value}</span>
              <button
                onClick={() => handleRemove(index)}
                className="text-gray-500 hover:text-red-600 transition"
              >
                <X size={16} />
              </button>
            </div>
          ))}
        </div>
      )}
      <p className="text-xs text-gray-500">Count: {values.length}</p>
    </div>
  );
}
