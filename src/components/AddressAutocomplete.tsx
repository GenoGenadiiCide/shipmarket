import { useState } from 'react';
import { MapPin, CheckCircle2 } from 'lucide-react';

interface AddressAutocompleteProps {
  label: string;
  placeholder?: string;
  required?: boolean;
  value?: string;
  onChange?: (value: string, data: any) => void;
  error?: string;
}

export function AddressAutocomplete({
  label,
  placeholder = 'Start typing an address...',
  required = false,
  value = '',
  onChange,
  error
}: AddressAutocompleteProps) {
  const [inputValue, setInputValue] = useState(value);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState<any>(null);

  // Mock suggestions
  const mockSuggestions = [
    { id: 1, mainText: '123 Main Street', secondaryText: 'New York, NY 10001', lat: 40.7128, lng: -74.0060 },
    { id: 2, mainText: '456 Oak Avenue', secondaryText: 'Los Angeles, CA 90001', lat: 34.0522, lng: -118.2437 },
    { id: 3, mainText: '789 Elm Street', secondaryText: 'Chicago, IL 60601', lat: 41.8781, lng: -87.6298 },
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setInputValue(val);
    setSelectedAddress(null);
    setShowSuggestions(val.length > 2);
    onChange?.(val, null);
  };

  const handleSelectSuggestion = (suggestion: any) => {
    setInputValue(`${suggestion.mainText}, ${suggestion.secondaryText}`);
    setSelectedAddress(suggestion);
    setShowSuggestions(false);
    onChange?.(suggestion.mainText, suggestion);
  };

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-900">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      
      <div className="relative">
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          onFocus={() => inputValue.length > 2 && setShowSuggestions(true)}
          placeholder={placeholder}
          className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
            error ? 'border-red-500' : 'border-gray-300'
          }`}
        />

        {showSuggestions && (
          <div className="absolute z-20 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-y-auto">
            {mockSuggestions.map(suggestion => (
              <div
                key={suggestion.id}
                onClick={() => handleSelectSuggestion(suggestion)}
                className="flex items-start gap-2 p-3 hover:bg-blue-50 cursor-pointer transition-colors"
              >
                <MapPin className="h-4 w-4 text-blue-500 mt-0.5 flex-shrink-0" />
                <div>
                  <div className="text-sm font-medium text-gray-900">{suggestion.mainText}</div>
                  <div className="text-xs text-gray-500">{suggestion.secondaryText}</div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {selectedAddress && (
        <div className="flex items-center gap-2 text-xs text-green-600">
          <CheckCircle2 className="h-3 w-3" />
          <span>Address selected from suggestions</span>
        </div>
      )}

      {!selectedAddress && inputValue && (
        <p className="text-xs text-gray-500">
          Please select an address from the suggestions above
        </p>
      )}

      {error && <p className="text-xs text-red-500">{error}</p>}

      {selectedAddress && (
        <div className="bg-blue-50 border border-blue-100 rounded-md p-3 space-y-1">
          <p className="text-sm text-blue-900">
            <strong>Selected:</strong> {selectedAddress.mainText}, {selectedAddress.secondaryText}
          </p>
          <p className="text-xs text-blue-700">
            Coordinates: {selectedAddress.lat}, {selectedAddress.lng}
          </p>
        </div>
      )}
    </div>
  );
}
