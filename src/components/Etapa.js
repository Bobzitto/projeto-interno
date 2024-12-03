import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ReactComponent as DownArrowIcon } from '../assets/down-arrow.svg'; // Adjust the import path as needed

const Etapa = ({ number, aulaId }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/home/aulas/${aulaId}/etapas/${number}/edit`);
  };

  return (
    <div
      className="flex items-center justify-between p-2 border rounded-lg cursor-pointer hover:bg-gray-100"
      onClick={handleClick}
    >
      <span className="text-sm font-semibold">Etapa {number}</span>
      <DownArrowIcon className="w-4 h-4" />
    </div>
  );
};

export default Etapa;