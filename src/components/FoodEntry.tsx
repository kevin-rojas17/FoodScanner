import React from 'react';
import { Utensils } from 'lucide-react';

interface FoodEntryProps {
  food: string;
  handleFoodChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  isValid: boolean;
}

const FoodEntry: React.FC<FoodEntryProps> = ({ food, handleFoodChange, isValid }) => {
  return (
    <div>
      <label htmlFor="food" className="block text-sm font-medium text-gray-700 mb-1">
        ¿Qué comiste?
      </label>
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Utensils className="h-5 w-5 text-gray-400" />
        </div>
        <input
          type="text"
          id="food"
          name="food"
          value={food}
          onChange={handleFoodChange}
          className={`block w-full pl-10 pr-4 py-3 border ${
            isValid ? 'border-gray-300' : 'border-red-500'
          } rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm transition-colors duration-150`}
          placeholder="Ej: arroz, pollo, jugo"
        />
      </div>
      {!isValid && (
        <p className="mt-2 text-sm text-red-600">
          Por favor ingresa lo que comiste.
        </p>
      )}
      <p className="mt-2 text-xs text-gray-500">
        Puedes escribir varios alimentos separados por comas.
      </p>
    </div>
  );
};

export default FoodEntry;