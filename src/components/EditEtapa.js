import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import aulasData from '../assets/aulasData'; // Adjust the import path as needed

const EditEtapa = () => {
  const { aulaId, etapaId } = useParams();
  const [etapa, setEtapa] = useState(null);

  useEffect(() => {
    const aula = aulasData.find(a => a.id === parseInt(aulaId));
    if (aula) {
      const etapa = aula.steps.find(step => step.number === parseInt(etapaId));
      setEtapa(etapa);
    }
  }, [aulaId, etapaId]);

  if (!etapa) {
    return <div>Etapa não encontrada</div>;
  }

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-lg p-6 shadow-lg mt-8">
      <h2 className="text-2xl font-semibold mb-6 text-center">Editar Etapa {etapaId}</h2>
      {/* Add form fields to edit the etapa here */}
    </div>
  );
};

export default EditEtapa;