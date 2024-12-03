import React, { useState, useEffect } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import aulasData from "../assets/aulasData"; // Import the mock data
import Swal from "sweetalert2";

const MenuAulas = () => {
  const { isMenuOpen } = useOutletContext();
  const [aulas, setAulas] = useState([]); // Set initial state to an empty array
  const [sortField, setSortField] = useState("name");
  const [sortOrder, setSortOrder] = useState("asc");
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const navigate = useNavigate();

  const handleDelete = (id) => {
    Swal.fire({
      title: 'Tem certeza?',
      text: "Você não poderá reverter isso!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Sim, deletar!',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        const index = aulasData.findIndex(aula => aula.id === id);
        if (index !== -1) {
          aulasData.splice(index, 1);
          Swal.fire(
            'Deletado!',
            'A aula foi deletada.',
            'success'
          );
          // Optionally, you can force a re-render or navigate to another page
          navigate('/home/aulas');
        }
      }
    });
  };

  // Load aulasData into state when the component mounts
  useEffect(() => {
    setAulas(aulasData); // Set the aulas state with the imported data
  }, []);

  // Filtered and sorted data
  const filteredAulas = aulas
    .filter((aula) =>
      aula.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      if (sortField === "steps") {
        return sortOrder === "asc" ? a.steps - b.steps : b.steps - a.steps;
      }
      const fieldA = a[sortField]?.toLowerCase();
      const fieldB = b[sortField]?.toLowerCase();
      return sortOrder === "asc"
        ? fieldA.localeCompare(fieldB)
        : fieldB.localeCompare(fieldA);
    });

  // Pagination
  const itemsPerPage = 5;
  const totalPages = Math.ceil(filteredAulas.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentAulas = filteredAulas.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  // Handle sorting
  const sortAulas = (field) => {
    const newOrder =
      sortField === field && sortOrder === "asc" ? "desc" : "asc";
    setSortField(field);
    setSortOrder(newOrder);
  };

  return (
    <div
      className={`transition-all duration-300 z-80 mb-3 animate-fade-in ${
        isMenuOpen ? "ml-[16.6667%]" : "ml-0"
      }`}
    >
      {/* Header */}
      <div className="py-0 flex justify-center items-center space-x-2 mt-8">
        <img src="/arrow.png" className="h-24" alt="Arrow" />
        <h2 className="text-center text-3xl font-semibold">Minhas Aulas</h2>
        <img
          src="/arrow.png"
          className="h-24 transform scale-x-[-1]"
          alt="Arrow"
        />
      </div>
      <hr className="my-4" />

      {/* Search and Add Button */}
      <div className="flex justify-center mb-4">
        <input
          type="text"
          placeholder="Buscar por nome"
          className="border border-gray-300 rounded-l-md px-4 py-2"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button
          className="bg-purple-500 hover:bg-purple-600 text-white font-bold py-2 px-4 rounded ml-3"
          onClick={() => navigate("/home/aulas/0/edit")}
        >
          Criar Aula
        </button>
      </div>

      {/* Table */}
      <table className="min-w-full bg-white border border-gray-300 border-separate border-spacing-2">
        <thead>
          <tr className="bg-gray-100">
            <th
              className="py-2 px-4 border cursor-pointer"
              onClick={() => sortAulas("name")}
            >
              Nome {sortField === "name" && (sortOrder === "asc" ? "↑" : "↓")}
            </th>
            <th
              className="py-2 px-4 border cursor-pointer"
              onClick={() => sortAulas("schoolYear")}
            >
              Ano Escolar{" "}
              {sortField === "schoolYear" &&
                (sortOrder === "asc" ? "↑" : "↓")}
            </th>
            <th
              className="py-2 px-4 border cursor-pointer"
              onClick={() => sortAulas("steps")}
            >
              Etapas{" "}
              {sortField === "steps" && (sortOrder === "asc" ? "↑" : "↓")}
            </th>
            <th
              className="py-2 px-4 border cursor-pointer"
              onClick={() => sortAulas("subject")}
            >
              Matéria{" "}
              {sortField === "subject" &&
                (sortOrder === "asc" ? "↑" : "↓")}
            </th>
            <th className="py-2 px-4 border">Ações</th>
          </tr>
        </thead>
        <tbody>
          {currentAulas.length > 0 ? (
            currentAulas.map((aula, index) => (
              <tr key={index} className="hover:bg-gray-50">
                <td className="py-2 px-4 border">{aula.name}</td>
                <td className="py-2 px-4 border">{aula.schoolYear}</td>
                <td className="py-2 px-4 border">{aula.steps}</td>
                <td className="py-2 px-4 border">{aula.subject}</td>
                <td className="py-2 px-4 border flex justify-center items-center">
                  <button
                    className="bg-purple-500 hover:bg-purple-600 text-white font-bold py-2 px-4 rounded mr-4"
                    onClick={() =>
                      navigate(`/home/aulas/${aula.id}/edit`, {
                        state: { aula },
                      })
                    }
                  >
                    Editar
                  </button>
                  <button
              className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
              onClick={() => handleDelete(aula.id)}
            >
              Deletar
            </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="py-2 px-4 border text-center">
                Nenhuma aula encontrada
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Pagination Controls */}
      <div className="flex justify-center items-center mt-4">
        <button
          className="px-4 py-2 bg-gray-200 text-gray-700 rounded mr-2"
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Anterior
        </button>
        <span className="px-4">
          Página {currentPage} de {totalPages}
        </span>
        <button
          className="px-4 py-2 bg-gray-200 text-gray-700 rounded ml-2"
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Próxima
        </button>
      </div>
    </div>
  );
};

export default MenuAulas;
