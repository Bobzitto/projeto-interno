import React, { useEffect, useState, useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import aulasData from '../assets/aulasData'; 
import Etapa from './Etapa'; 

const schoolYears = {
  "Ensino Fundamental I": ["1º ano", "2º ano", "3º ano", "4º ano", "5º ano"],
  "Ensino Fundamental II": ["6º ano", "7º ano", "8º ano", "9º ano"],
  "Ensino Médio": ["1º ano do Ensino Médio", "2º ano do Ensino Médio", "3º ano do Ensino Médio"]
};

const subjects = {
  "Ensino Fundamental I": ["Matemática", "Português", "Ciências", "História", "Geografia"],
  "Ensino Fundamental II": ["Matemática", "Português", "Ciências", "História", "Geografia", "Inglês"],
  "Ensino Médio": ["Matemática", "Português", "Física", "Química", "Biologia", "História", "Geografia", "Inglês", "Sociologia", "Filosofia"]
};

const EditAula = () => {
  const [name, setName] = useState('');
  const [schoolYear, setSchoolYear] = useState('');
  const [steps, setSteps] = useState(1);
  const [subject, setSubject] = useState('');
  const [publicLesson, setPublicLesson] = useState(false);
  const [content, setContent] = useState('');
  const [distance, setDistance] = useState('');
  const location = useLocation();
  const { aula } = location.state || {};
  const navigate = useNavigate();

  useEffect(() => {
    if (aula) {
      setName(aula.name);
      setSchoolYear(aula.schoolYear);
      setSteps(aula.steps);
      setSubject(aula.subject);
      setPublicLesson(aula.public);
      setContent(aula.content);
      setDistance(aula.distance);
    }
  }, [aula]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (name.trim() === '' || subject.trim() === '') {
      Swal.fire({
        icon: "error",
        text: "Preencha todos os campos!",
      });
      return;
    }

    const updatedAula = {
      id: aula ? aula.id : aulasData.length + 1,
      name,
      schoolYear,
      steps: Number(steps),
      subject,
      public: publicLesson,
      content,
      distance,
    };

    if (aula) {
      const index = aulasData.findIndex(a => a.id === aula.id);
      aulasData[index] = updatedAula;
      Swal.fire({
        position: "top-end",
        icon: "success",
        width: "300px",
        title: "Aula atualizada!",
        showConfirmButton: false,
        timer: 1500
      });
    } else {
      aulasData.push(updatedAula);
      Swal.fire({
        position: "top-end",
        icon: "success",
        width: "300px",
        title: "Aula criada!",
        showConfirmButton: false,
        timer: 1500
      });
    }

    navigate('/home/aulas');
  };

  const handleSchoolYearChange = (e) => {
    setSchoolYear(e.target.value);
    setSubject(''); // Reset subject when school year changes
  };

  const level = useMemo(() => {
    for (const [level, years] of Object.entries(schoolYears)) {
      if (years.includes(schoolYear)) {
        return level;
      }
    }
    return null;
  }, [schoolYear]);

  const subjectOptions = useMemo(() => {
    return level ? subjects[level] : [];
  }, [level]);

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-lg p-6 shadow-lg mt-8 animate-fade-in">
      <h2 className="text-2xl font-semibold mb-6 text-center">
        {aula ? 'Editar Aula' : 'Criar Aula'}
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4 animate-fade-in-delay-100">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
          {/* Nome da Aula */}
          <div className="md:col-span-1">
            <label className="block text-gray-700 mb-2">Nome da Aula</label>
            <input
              type="text"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Digite o nome da aula"
            />
          </div>

          {/* Ano Escolar */}
          <div className="md:col-span-1">
            <label className="block text-gray-700 mb-2">Ano Escolar</label>
            <select
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              value={schoolYear}
              onChange={handleSchoolYearChange}
            >
              <option value="" disabled>Selecione o ano escolar</option>
              {Object.entries(schoolYears).map(([level, years]) => (
                <optgroup key={level} label={level}>
                  {years.map(year => (
                    <option key={year} value={year}>{year}</option>
                  ))}
                </optgroup>
              ))}
            </select>
          </div>

          {/* Aula Pública */}
          <div className="md:col-span-1 flex items-center">
            <label className="block text-gray-700 mb-2 mr-4">Aula Pública</label>
            <label className="relative inline-flex cursor-pointer items-center">
              <input
                type="checkbox"
                className="peer sr-only"
                checked={publicLesson}
                onChange={() => setPublicLesson(!publicLesson)}
              />
              <div className="peer h-6 w-11 rounded-full border bg-slate-200 after:absolute after:left-[2px] after:top-0.5 after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-purple-800 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:ring-green-300"></div>
            </label>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Etapas */}
          <div>
            <label className="block text-gray-700 mb-2">Etapas</label>
            <select
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              value={steps}
              onChange={(e) => setSteps(e.target.value)}
            >
              {[1, 2, 3, 4, 5, 6].map(step => (
                <option key={step} value={step}>{step}</option>
              ))}
            </select>
          </div>

          {/* Matéria */}
          <div>
            <label className="block text-gray-700 mb-2">Matéria</label>
            <select
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              disabled={!schoolYear}
            >
              <option value="" disabled>{schoolYear ? 'Selecione a matéria' : 'Selecione o ano escolar'}</option>
              {subjectOptions.map(subject => (
                <option key={subject} value={subject}>{subject}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Conteúdo */}
        <div>
          <label className="block text-gray-700 mb-2">Conteúdo</label>
          <textarea
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Digite o conteúdo da aula"
          />
        </div>

        {/* Distância */}
        <div>
          <label className="block text-gray-700 mb-2">Distância</label>
          <input
            type="text"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            value={distance}
            onChange={(e) => setDistance(e.target.value)}
            placeholder="Digite a modalidade (Presencial/Online)"
          />
        </div>

        {/* Render Etapas */}
        <div className="space-y-2">
          {Array.from({ length: steps }, (_, i) => (
            <Etapa key={i + 1} number={i + 1} />
          ))}
        </div>

        {/* Submit Button */}
        <div className="text-center">
          <button
            type="submit"
            className="bg-purple-500 hover:bg-purple-600 text-white font-bold py-2 px-4 border-b-4 border-purple-700 hover:border-purple-800 rounded ml-3"
          >
            {aula ? 'Salvar Alterações' : 'Criar Aula'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditAula;