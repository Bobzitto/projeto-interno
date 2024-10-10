import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate, useOutletContext } from 'react-router-dom';
import Swal from 'sweetalert2';

const EditTurma = () => {
    const [name, setName] = useState('');
    const [school, setSchool] = useState(null)
    const [year, setYear] = useState('');
    const { jwtToken } = useOutletContext();
    const location = useLocation();
    const { turma } = location.state || {};
    const navigate = useNavigate();

    useEffect(() => {
        if (jwtToken === '') {
            navigate('/login');
            return;
        }

        if (turma) {
            setName(turma.name);
            setSchool(turma.school);
            setYear(turma.year)
        }

    }, [turma, jwtToken, navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (name.trim() === '' || school.trim() === '' || year.trim() === '') {
            Swal.fire({
                icon: "error",
                text: "Preencha todos os campos!",
            })
            return
        }

        const updatedTurma = {
            name,
            school: school,
            year: year,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
        };

        try {
            if (turma) {
                // If 'turma' exists, we are updating an existing class
                updatedTurma["id"] = turma.id
                console.log(turma)
                const response = await fetch(`${process.env.REACT_APP_BACKEND}/home/turmas/${turma.id}`, {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${jwtToken}`,
                    },
                    body: JSON.stringify(updatedTurma),
                });

                if (!response.ok) {
                    throw new Error('Failed to update the class');
                }
            } else {
                // If 'turma' does not exist, we are creating a new class
                const response = await fetch(`${process.env.REACT_APP_BACKEND}/home/turmas/0`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${jwtToken}`,
                    },
                    body: JSON.stringify(updatedTurma),
                });

                if (!response.ok) {
                    throw new Error('Failed to create the class');
                }
            }

            // Navigate back to the list of classes after the operation
            navigate('/home/turmas');
        } catch (error) {
            console.error('Error:', error);
            // Optionally, you could show an error message to the user here
        }
    };

    return (
        <div className="max-w-md mx-auto bg-white rounded-lg p-6 shadow-lg animate-fade-in">
            <h2 className="text-2xl font-semibold mb-6 text-center">
                {turma?.id ? 'Editar Turma' : 'Criar Turma'}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4 animate-fade-in-delay-100">
                {/* Nome da Turma */}
                <div>
                    <label className="block text-gray-700 mb-2">Nome da Turma</label>
                    <input
                        type="text"
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Digite o nome da Turma"
                    />
                </div>


                {/* Escola */}
                <div>
                    <label className="block text-gray-700 mb-2">Escola</label>
                    <input
                        type="string"
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                        value={school}
                        onChange={(e) => setSchool(e.target.value)}
                        placeholder="Digite o nome da escola"
                    />
                </div>

                {/*ano escolar*/}
                <div>
                    <label className="block text-gray-700 mb-2">Ano Escolar</label>
                    <input
                        type="text"
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                        value={year}
                        onChange={(e) => setYear(e.target.value)}
                        placeholder="Digite o ano escolar"
                    />
                </div>

                {/* Submit Button */}
                <div className="text-center">
                    <button
                        type="submit"
                        className="bg-purple-500 hover:bg-purple-600 text-white font-bold py-2 px-4 border-b-4 border-purple-700 hover:border-purple-800 rounded ml-3"
                        onClick={() =>
                            turma?.id ? Swal.fire({
                                position: "top-end",
                                icon: "success",
                                width: "300px",
                                title: "Turma atualizada!",
                                showConfirmButton: false,
                                timer: 1500
                            }) : Swal.fire({
                                position: "top-end",
                                icon: "success",
                                width: "300px",
                                title: "Turma criada!",
                                showConfirmButton: false,
                                timer: 1500
                            })}
                    >
                        {turma?.id ? 'Salvar Alterações' : 'Criar Turma'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default EditTurma;
