import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate, useOutletContext } from 'react-router-dom';
import Swal from 'sweetalert2';

const EditAula = () => {
  const [name, setName] = useState('');
  const [review, setReview] = useState(null)
  const [selectedMateria, setSelectedMateria] = useState('');
  const [materias, setMaterias] = useState([]);
  const [etapas, setEtapas] = useState('');
  const [aulaAtiva, setAulaAtiva] = useState(false); // Bool for 'Sim' or 'Não'
  const { jwtToken } = useOutletContext();
  const location = useLocation();
  const { aula } = location.state || {};
  const navigate = useNavigate();

  useEffect(() => {
    if (jwtToken === '') {
      navigate('/login');
      return;
    }

    if (aula) {
      setName(aula.name);
      setSelectedMateria(aula.materias.length > 0 ? aula.materias[0].id : '');
      setEtapas(aula.size);
      setAulaAtiva(aula.active);
      setReview(aula.review)
    }

    const fetchMaterias = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_BACKEND}/materias`);
        const data = await response.json();
        setMaterias(data);
      } catch (error) {
        console.error('Error fetching materias:', error);
      }
    };

    fetchMaterias();
  }, [aula, jwtToken, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (name?.toString().trim() === '' || etapas?.toString().trim() === '' || selectedMateria?.toString().trim() === '') {
      Swal.fire({
        icon: "error",
        text: "Preencha todos os campos!",
      })
      return
    }

    const updatedAula = {
      name,
      materias: [{ id: parseInt(selectedMateria) }],
      size: etapas,
      active: aulaAtiva,
      review: 0.0,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    try {
      if (aula) {
        // If 'aula' exists, we are updating an existing class
        updatedAula["id"] = aula.id
        updatedAula.review = review
        console.log(aula)
        const response = await fetch(`${process.env.REACT_APP_BACKEND}/home/aulas/${aula.id}`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${jwtToken}`,
          },
          body: JSON.stringify(updatedAula),
        });

        if (!response.ok) {
          throw new Error('Failed to update the class');
        }
      } else {
        // If 'aula' does not exist, we are creating a new class
        const response = await fetch(`${process.env.REACT_APP_BACKEND}/home/aulas/0`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${jwtToken}`,
          },
          body: JSON.stringify(updatedAula),
        });

        if (!response.ok) {
          throw new Error('Failed to create the class');
        }
      }

      // Navigate back to the list of classes after the operation
      navigate('/home/aulas');
    } catch (error) {
      console.error('Error:', error);
      // Optionally, you could show an error message to the user here
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white rounded-lg p-6 shadow-lg animate-fade-in">
      <h2 className="text-2xl font-semibold mb-6 text-center">
        {aula?.id ? 'Editar Aula' : 'Criar Aula'}
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4 animate-fade-in-delay-100">
        {/* Nome da Aula */}
        <div>
          <label className="block text-gray-700 mb-2">Nome da Aula</label>
          <input
            type="text"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Digite o nome da aula"
          />
        </div>

        {/* Matérias */}
        <div>
          <label className="block text-gray-700 mb-2">Matéria</label>
          <select
            name="materia"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            value={selectedMateria}
            onChange={(e) => setSelectedMateria(e.target.value)}
          >
            <option value="">Selecione uma matéria</option>
            {materias.map((materia) => (
              <option key={materia.id} value={materia.id}>
                {materia.materia}
              </option>
            ))}
          </select>
        </div>

        {/* Etapas */}
        <div>
          <label className="block text-gray-700 mb-2">Etapas</label>
          <input
            type="number"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            value={etapas}
            onChange={(e) => setEtapas(e.target.value)}
            placeholder="Digite o número de etapas"
          />
        </div>

        {/* Aula Ativa */}
        <div>
          <label className="block text-gray-700 mb-2">Aula Ativa</label>
          <div className="flex space-x-4">
            <label className="flex items-center">
              <input
                type="radio"
                name="aulaAtiva"
                value={true}
                checked={aulaAtiva === true}
                onChange={() => setAulaAtiva(true)}
              />
              <span className="ml-2">Sim</span>
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="aulaAtiva"
                value={false}
                checked={aulaAtiva === false}
                onChange={() => setAulaAtiva(false)}
              />
              <span className="ml-2">Não</span>
            </label>
          </div>
        </div>

        {/* Submit Button */}
        <div className="text-center">
          <button
            type="submit"
            className="bg-purple-500 hover:bg-purple-600 text-white font-bold py-2 px-4 border-b-4 border-purple-700 hover:border-purple-800 rounded ml-3"
            onClick={() =>
                aula?.id ? Swal.fire({
                  position: "top-end",
                  icon: "success",
                  width: "300px",
                  title: "Aula atualizada!",
                  showConfirmButton: false,
                  timer: 1500
                }) : Swal.fire({
                  position: "top-end",
                  icon: "success",
                  width: "300px",
                  title: "Aula criada!",
                  showConfirmButton: false,
                  timer: 1500
                })}
          >
            {aula?.id ? 'Salvar Alterações' : 'Criar Aula'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditAula;
