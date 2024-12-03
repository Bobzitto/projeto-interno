import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import aulasData from '../assets/aulasData'; // Adjust the import path as needed
import Swal from 'sweetalert2';

const EditEtapa = () => {
  const { aulaId, etapaId } = useParams();
  const [etapa, setEtapa] = useState(null);
  const [description, setDescription] = useState('');
  const [type, setType] = useState('');
  const [contentType, setContentType] = useState('');
  const [videoLink, setVideoLink] = useState('');
  const [textContent, setTextContent] = useState('');
  const [exerciseType, setExerciseType] = useState('');
  const [exercises, setExercises] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const aula = aulasData.find(a => a.id === parseInt(aulaId));
    if (aula) {
      const etapa = aula.etapas.find(step => step.number === parseInt(etapaId));
      if (etapa) {
        setEtapa(etapa);
        setDescription(etapa.description);
        setType(etapa.type);
        if (etapa.type === 'content') {
          setContentType(etapa.contentType);
          setVideoLink(etapa.videoLink);
          setTextContent(etapa.textContent);
        } else if (etapa.type === 'exercise') {
          setExerciseType(etapa.exerciseType);
          setExercises(etapa.exercises);
        }
      }
    }
  }, [aulaId, etapaId]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const aulaIndex = aulasData.findIndex(a => a.id === parseInt(aulaId));
    if (aulaIndex !== -1) {
      const etapaIndex = aulasData[aulaIndex].etapas.findIndex(step => step.number === parseInt(etapaId));
      if (etapaIndex !== -1) {
        const updatedEtapa = {
          number: parseInt(etapaId),
          type,
          description,
          contentType: type === 'content' ? contentType : '',
          videoLink: type === 'content' && contentType === 'video' ? videoLink : '',
          textContent: type === 'content' && contentType === 'text' ? textContent : '',
          exerciseType: type === 'exercise' ? exerciseType : '',
          exercises: type === 'exercise' ? exercises : []
        };
        aulasData[aulaIndex].etapas[etapaIndex] = updatedEtapa;
        Swal.fire({
          position: "top-end",
          icon: "success",
          width: "300px",
          title: "Etapa atualizada!",
          showConfirmButton: false,
          timer: 1500
        });
        navigate(`/home/aulas/${aulaId}/edit`, { state: { aula: aulasData[aulaIndex] } });
      }
    }
  };

  if (!etapa) {
    return <div>Etapa não encontrada</div>;
  }

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-lg p-6 shadow-lg mt-8">
      <h2 className="text-2xl font-semibold mb-6 text-center">Editar Etapa {etapaId}</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-gray-700 mb-2">Descrição</label>
          <input
            type="text"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Digite a descrição da etapa"
          />
        </div>
        <div>
          <label className="block text-gray-700 mb-2">Tipo</label>
          <select
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            value={type}
            onChange={(e) => setType(e.target.value)}
          >
            <option value="" disabled>Selecione o tipo</option>
            <option value="content">Conteúdo</option>
            <option value="exercise">Exercício</option>
          </select>
        </div>
        {type === 'content' && (
          <>
            <div>
              <label className="block text-gray-700 mb-2">Tipo de Conteúdo</label>
              <select
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                value={contentType}
                onChange={(e) => setContentType(e.target.value)}
              >
                <option value="" disabled>Selecione o tipo de conteúdo</option>
                <option value="video">Vídeo</option>
                <option value="text">Texto</option>
              </select>
            </div>
            {contentType === 'video' && (
              <div>
                <label className="block text-gray-700 mb-2">Link do Vídeo</label>
                <input
                  type="text"
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  value={videoLink}
                  onChange={(e) => setVideoLink(e.target.value)}
                  placeholder="Digite o link do vídeo"
                />
              </div>
            )}
            {contentType === 'text' && (
              <div>
                <label className="block text-gray-700 mb-2">Conteúdo do Texto</label>
                <textarea
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  value={textContent}
                  onChange={(e) => setTextContent(e.target.value)}
                  placeholder="Digite o conteúdo do texto"
                />
              </div>
            )}
          </>
        )}
        {type === 'exercise' && (
          <>
            <div>
              <label className="block text-gray-700 mb-2">Tipo de Exercício</label>
              <select
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                value={exerciseType}
                onChange={(e) => setExerciseType(e.target.value)}
              >
                <option value="" disabled>Selecione o tipo de exercício</option>
                <option value="true_false">Verdadeiro ou Falso</option>
                <option value="multiple_choice">Múltipla Escolha</option>
                <option value="dissertative">Dissertativo</option>
              </select>
            </div>
            {/* Add form fields to edit the exercises here */}
          </>
        )}
        <div className="text-center">
          <button
            type="submit"
            className="bg-purple-500 hover:bg-purple-600 text-white font-bold py-2 px-4 border-b-4 border-purple-700 hover:border-purple-800 rounded"
          >
            Salvar Alterações
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditEtapa;