import React from 'react';
import { CheckCircle, BellRing } from 'lucide-react';

interface ThankYouMessageProps {
  food: string;
  onRequestNotification: () => void;
}

const ThankYouMessage: React.FC<ThankYouMessageProps> = ({ food, onRequestNotification }) => {
  return (
    <div className="bg-white rounded-xl shadow-lg p-8 transition-all duration-300 ease-in-out animate-fade-in">
      <div className="flex justify-center mb-6">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full">
          <CheckCircle className="w-8 h-8 text-green-600" />
        </div>
      </div>
      
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-4">¡Gracias!</h2>
      
      <div className="bg-gray-50 rounded-lg p-4 mb-6">
        <p className="text-gray-600 mb-2 font-medium">Tu comida:</p>
        <p className="text-gray-800 font-medium">{food}</p>
      </div>
      
      <p className="text-center text-gray-700 mb-8">
        Estamos trabajando en esta funcionalidad. ¿Quieres que te avisemos cuando esté lista?
      </p>
      
      <div className="flex flex-col sm:flex-row gap-4">
        <button
          onClick={onRequestNotification}
          className="flex-1 inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors duration-150"
        >
          <BellRing className="mr-2 h-5 w-5" />
          Sí, avísenme
        </button>
        
        <button
          onClick={() => window.location.reload()}
          className="flex-1 inline-flex items-center justify-center px-5 py-3 border border-gray-300 text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors duration-150"
        >
          No, gracias
        </button>
      </div>
    </div>
  );
};

export default ThankYouMessage;