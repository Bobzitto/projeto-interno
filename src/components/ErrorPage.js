import React from 'react';
import { Link } from 'react-router-dom';

const ErrorPage = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">Página em Construção</h2>
        <p className="text-gray-600 mb-6">Essa página ainda está em construção!</p>
        <Link to="/home" className="bg-purple-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-purple-600 transition">
          Voltar para Home
        </Link>
      </div>
    </div>
  );
};

export default ErrorPage;