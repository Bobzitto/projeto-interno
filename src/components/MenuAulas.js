import React, { useContext, useEffect, useState } from 'react';
import { Navigate, useNavigate, useOutlet, useOutletContext } from 'react-router-dom';
import Swal from 'sweetalert2';


const MenuAulas = () => {
  const { jwtToken} = useOutletContext()
  const [aulas, setAulas] = useState([]);
  const [sortField, setSortField] = useState('name')
  const [sortOrder, setSortOrder] = useState('asc')
  const [currentPage, setCurrentPage] = useState(1);
 
  const fetchAulas = () => {
    const headers = new Headers();
    headers.append("Content-Type", "application/json")
    headers.append("Authorization", "Bearer " + jwtToken)

    const requestOptions = {
      method: "GET",
      headers: headers,
    }

    fetch(`${process.env.REACT_APP_BACKEND}/home/aulas`, requestOptions)
      .then((response) => {
        console.log(response.status)
        return response.json()})
      .then((data) => {
        
        console.log(data)
        const processedAulas = data.map((aula) => {
          if(aula.materias) {
            aula.materias = Object.values(aula.materias)
          } else {
            aula.materias = []
          }
          return aula
      })
        setAulas(processedAulas);
        
      })
      .catch(err => {
        console.log(err)
      })
      
  };
  

  useEffect( () => {
    fetchAulas()
  }, [jwtToken])
    

  const sortAulas = (field) => {
    const newOrder = sortField === field && sortOrder === 'asc' ? 'desc' : 'asc'
    setSortField(field)
    setSortOrder(newOrder)

    const sortedAulas = [...aulas].sort((a,b) => {
      if (newOrder === 'asc') {
        return a[field] > b[field] ? 1 : -1
      } else {
        return a[field] < b[field] ? 1 : -1
      }
    })

    setAulas(sortedAulas)
  }



  const [searchTerm, setSearchTerm] = useState('');
  const [selectedMateria, setSelectedMateria] = useState('');
  const navigate = useNavigate();

  // Filtered data based on search term and selected materia
  const filteredAulas = aulas.filter((aula) => {
    const matchesSearch = aula.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesMateria = selectedMateria === '' || 
    aula.materias.some(materia => materia.materia === selectedMateria);
    return matchesSearch && matchesMateria;
  });

   //handling pagination

  
    
    const itemsPerPage = 5;
    
    //calc index
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentAulas = filteredAulas.slice(indexOfFirstItem, indexOfLastItem)

    const totalPages = Math.ceil(filteredAulas.length/itemsPerPage)
    
    const handlePageChange = (newPage) => {
      if(newPage > 0 && newPage <= totalPages){
        setCurrentPage(newPage)
      }
    }

    const confirmDelete = (aulaId) => {
      Swal.fire({
        title: "Tem certeza que deseja deletar a aula?",
        text: "Essa ação não pode ser revertida!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "##",
        confirmButtonText: "Sim, deletar!"
      }).then((result) => {
        if (result.isConfirmed) {
            let headers = new Headers();
            headers.append("Authorization", "Bearer " + jwtToken)
            const requestOptions = {
              method: "DELETE",
              headers: headers,
            }
          fetch(`${process.env.REACT_APP_BACKEND}/home/aulas/${aulaId}`, requestOptions)
            .then((response) => response.json())
            .then((data) => {
              if(data.error) {
                console.log(data.error)
              } else {
                fetchAulas()
              }
            })
          Swal.fire({
            title: "Aula deletada!",
            text: "Sua aula foi deletada.",
            icon: "success"
          });
        }
      });
    }
   

  return (
    <div className="mb-3 animate-fade-in">
      <div className='py-0 flex justify-center items-center space-x-2'> 
        <img src="/arrow.png" className='h-24'></img>          
        <h2 className="text-center text-3xl font-semibold">Minhas Aulas</h2>
        <img src="/arrow.png" className='h-24 transform scale-x-[-1]'></img>        
      </div> 
      <hr className="my-4" />

      {/* Search and Select Box */}
      
      <div className="flex justify-center mb-4 animate-fade-in delay-100">
        <input
          type="text"
          placeholder="Nome"
          className="border border-gray-300 rounded-l-md px-4 py-2"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <select
          className="border border-gray-300 rounded-r-md px-4 py-2"
          value={selectedMateria}
          onChange={(e) => setSelectedMateria(e.target.value)}
        >
          <option value="">Selecionar Matéria</option>
          <option value="Física">Física</option>
          <option value="Matemática">Matemática</option>
          <option value="Português">Português</option>
          <option value="História">História</option>
          <option value="Geografia">Geografia</option>
          <option value="Sociologia">Sociologia</option>
          <option value="Filosofia">Filosofia</option>
          <option value="Inglês">Inglês</option>
          <option value="Artes">Artes</option>
        </select>
        
        <button className='bg-purple-500 hover:bg-purple-600 text-white font-bold py-2 px-4 border-b-4 border-purple-700 hover:border-purple-800 rounded ml-3' onClick={() => navigate('/home/aulas/0/edit')}
          >Criar Aula
          </button>
      </div>

      {/* Table */}
      <table className="min-w-full bg-white border border-gray-300 border-separate border-spacing-2 animate-fade-in delay-200">
        <thead>
        <tr className="bg-gray-100">
            <th className="py-2 px-4 border cursor-pointer" onClick={() => sortAulas('name')}>
              Nome {sortField === 'name' && (sortOrder === 'asc' ? '↑' : '↓')}
            </th>
            <th className="py-2 px-4 border cursor-pointer" onClick={() => sortAulas('materia')}>
              Matéria {sortField === 'materia' && (sortOrder === 'asc' ? '↑' : '↓')}
            </th>
            <th className="py-2 px-4 border cursor-pointer" onClick={() => sortAulas('size')}>
              Etapas {sortField === 'size' && (sortOrder === 'asc' ? '↑' : '↓')}
            </th>
            <th className="py-2 px-4 border cursor-pointer" onClick={() => sortAulas('active')}>
              Aula Ativa {sortField === 'active' && (sortOrder === 'asc' ? '↑' : '↓')}
            </th>
            <th className="py-2 px-4 bordercursor-pointer" onClick={() => sortAulas('review')}>
              Review {sortField === 'review' && (sortOrder === 'asc' ? '↑' : '↓')}</th>
            <th className="py-2 px-4 border">Ações</th>
          </tr>
        </thead>
        <tbody>
          {currentAulas.length > 0 ? (
            currentAulas.map((aula, index) => (
              <tr key={index} className="hover:bg-gray-50">
                <td className="py-2 px-4 border">{aula.name}</td>
                <td className="py-2 px-4 border">{aula.materias.length > 0 ? 
                (aula.materias.map((materia) => (
                  <div key={materia.id}>{materia.materia}</div>))) : (<div>Sem matéria definida</div>)}</td>
                <td className="py-2 px-4 border">{aula.size}</td>
                <td className="py-2 px-4 border">{aula.active ? "Sim" : "Não"}</td>
                <td className="py-2 px-4 border">{aula.review}</td>
                <td className="py-2 px-2 border flex justify-center items-center">
                  <button

                    className="bg-purple-500 hover:bg-purple-600 text-white font-bold py-2 px-4  border-b-4 border-purple-700 hover:border-purple-800 rounded mr-4"
                    onClick={() => navigate(`/home/aulas/${aula.id}/edit`, { state: { aula } })}
                  >
                    Editar Aula
                  </button>
                  <button 
                    className='bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4  border-b-4 border-red-700 hover:border-red-800 rounded'
                    onClick={() => confirmDelete(aula.id)}
                  >
                    Deletar Aula
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="py-2 px-4 border text-center">Nenhuma aula encontrada</td>
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
        <span className="px-4">{`Página ${currentPage} de ${totalPages}`}</span>
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
}

export default MenuAulas;