import React, { useState } from 'react';
import { Salad, Send, Mail, ArrowRight } from 'lucide-react';
import FoodEntry from './FoodEntry';
import ThankYouMessage from './ThankYouMessage';
import emailjs from '@emailjs/browser';




const CalorieCalculator: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);
  const [food, setFood] = useState('');
  const [email, setEmail] = useState('');
  const [isValidFood, setIsValidFood] = useState(true);
  const [isValidEmail, setIsValidEmail] = useState(true);
  const [showEmailInput, setShowEmailInput] = useState(false);
  const [notificationRequested, setNotificationRequested] = useState(false);
  const [isLoading, setIsLoading] = useState(false);


  const validateFood = (value: string) => {
    return value.trim().length > 0;
  };

  const validateEmail = (value: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(value);
  };

  const handleFoodChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setFood(value);
    setIsValidFood(validateFood(value));
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEmail(value);
    setIsValidEmail(validateEmail(value));
  };
  const sendEmailToUser = async () => {
    setIsLoading(true);
    const templateParams = {
      user_email: email, // este es el correo ingresado por el usuario
    };
  
    try {
      await emailjs.send(
        'service_g1epp3e',
        'template_hfk5cnb',
        templateParams,
        'C7oURaS00jbn7w3SC'         
      );
      console.log('Correo enviado al usuario correctamente');
      setNotificationRequested(true);
    } catch (error) {
      console.error('Error al enviar el correo:', error);
    }finally {
      setIsLoading(false); // termina el spinner
    }
  };
  

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateFood(food)) {
      setIsValidFood(false);
      return;
    }
    
    setSubmitted(true);
  };

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateEmail(email)) {
      setIsValidEmail(false);
      return;
    }
    sendEmailToUser(); // Enviar correo al usuario
    setNotificationRequested(true);
  };

  if (submitted && !showEmailInput) {
    return (
      <ThankYouMessage 
        food={food}
        onRequestNotification={() => setShowEmailInput(true)}
      />
    );
  }

  if (showEmailInput) {
    return (
      <div className="bg-white rounded-xl shadow-lg p-8 transition-all duration-300 ease-in-out animate-fade-in">
        {isLoading ? (
        <div className="flex flex-col items-center justify-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-green-600 border-opacity-50"></div>
          <p className="text-gray-600 text-sm">Enviando correo...</p>
        </div>
        ): notificationRequested ? (
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
              <Mail className="w-8 h-8 text-green-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">¡Perfecto!</h2>
            <p className="text-gray-600 mb-6">
              Te avisaremos en <span className="font-medium text-green-600">{email}</span> cuando 
              nuestra calculadora de calorías esté lista.
            </p>
            <button
              onClick={() => window.location.reload()}
              className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors duration-150"
            >
              Volver al inicio
            </button>
          </div>
        ) : (
          <>
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-2">¡Mantente informado!</h2>
              <p className="text-gray-600">
                Deja tu correo electrónico y te avisaremos tan pronto como la calculadora esté lista.
              </p>
            </div>

            <form onSubmit={handleEmailSubmit} className="space-y-6">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Correo electrónico
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={email}
                    onChange={handleEmailChange}
                    className={`block w-full pl-10 pr-4 py-3 border ${
                      isValidEmail ? 'border-gray-300' : 'border-red-500'
                    } rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm transition-colors duration-150`}
                    placeholder="tu@correo.com"
                  />
                </div>
                {!isValidEmail && (
                  <p className="mt-2 text-sm text-red-600">
                    Por favor ingresa un correo electrónico válido.
                  </p>
                )}
              </div>

              <div className="flex items-center justify-between space-x-4">
                <button
                  type="button"
                  onClick={() => setShowEmailInput(false)}
                  className="px-5 py-3 text-base font-medium text-gray-700 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors duration-150"
                >
                  No, gracias
                </button>
                <button
                  type="submit"
                  className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors duration-150"
                >
                  Notificarme
                  <ArrowRight className="ml-2 -mr-1 h-5 w-5" />
                </button>
              </div>
            </form>
          </>
        )}
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-lg p-8 transition-all duration-300 ease-in-out animate-fade-in">
      <div className="flex justify-center mb-6">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full">
          <Salad className="w-8 h-8 text-green-600" />
        </div>
      </div>
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-2">Calculadora de Calorías</h1>
      <p className="text-center text-gray-600 mb-8">
        Escribe lo que comiste y te diremos cuántas calorías tiene.
      </p>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <FoodEntry 
          food={food} 
          handleFoodChange={handleFoodChange}
          isValid={isValidFood}
        />

        <button
          type="submit"
          className="w-full inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors duration-150"
        >
          Calcular calorías
          <Send className="ml-2 -mr-1 h-5 w-5" />
        </button>
      </form>
    </div>
  );
};

export default CalorieCalculator;