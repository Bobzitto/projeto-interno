import React, { useEffect, useState } from 'react';
import { Navigate, useNavigate, useOutletContext } from 'react-router-dom';
import Swal from 'sweetalert2';


const MenuTurmas = () => {
  const { jwtToken} = useOutletContext()
  const [turmas, setTurmas] = useState([]);
  const [sortField, setSortField] = useState('name')
  const [sortOrder, setSortOrder] = useState('asc')
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedEscola, setSelectedEscola] = useState('')

  const fetchTurmas = () => {
    const headers = new Headers();
    headers.append("Content-Type", "application/json")
    headers.append("Authorization", "Bearer " + jwtToken)

    const requestOptions = {
      method: "GET",
      headers: headers,
    }

    fetch(`${process.env.REACT_APP_BACKEND}/home/turmas`, requestOptions)
      .then((response) => response.json())
      .then((data) => {
        console.log(data)
        const processedTurmas = data.map((turma) => {
          return turma;
        })
        setTurmas(processedTurmas)
      })
      .catch((error) => {
        console.log(error)
      });
  }     
  
  useEffect(() => {
    fetchTurmas()
  },[jwtToken])

  const sortTurmas = (field) => {
    const newOrder = sortField === field && sortOrder === 'asc' ? 'desc' : 'asc'
    setSortField(field)
    setSortOrder(newOrder)

    const sortedTurmas = [...turmas].sort((a,b) => {
      if (newOrder === 'asc') {
        return a[field] > b[field] ? 1 : -1
      } else {
        return a[field] < b[field] ? 1 : -1
      }
    })

    setTurmas(sortedTurmas)
  }

  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();



  // Filtered data based on search term and selected escola
  const filteredTurmas = turmas.filter((turma) => {
    const matchesSearch = turma.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesEscola = selectedEscola === '' || turma.school === selectedEscola;
    return matchesSearch && matchesEscola;
  });

  //handling pagination

  
    
  const itemsPerPage = 5;
    
  //calc index
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentTurmas = filteredTurmas.slice(indexOfFirstItem, indexOfLastItem)

  const totalPages = Math.ceil(filteredTurmas.length/itemsPerPage)
  
  const handlePageChange = (newPage) => {
    if(newPage > 0 && newPage <= totalPages){
      setCurrentPage(newPage)
    }
  }

  //handling deletes
  const confirmDelete = (turmaId) => {
    Swal.fire({
      title: "Tem certeza que deseja deletar a turma?",
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
        fetch(`${process.env.REACT_APP_BACKEND}/home/turma/${turmaId}`, requestOptions)
          .then((response) => response.json())
          .then((data) => {
            if(data.error) {
              console.log(data.error)
            } else {
              fetchTurmas()
            }
          })
        Swal.fire({
          title: "Turma deletada!",
          text: "Sua turma foi deletada.",
          icon: "success"
        });
      }
    });
  }


  return (
    <div className="mb-3 animate-fade-in">
      <div className='py-0 flex justify-center items-center space-x-2'> 
        <img src="/arrow.png" className='h-24'></img>          
        <h2 className="text-center text-3xl font-semibold">Minhas Turmas</h2>
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
        
        <button className='bg-purple-500 hover:bg-purple-600 text-white font-bold py-2 px-4 border-b-4 border-purple-700
          hover:border-purple-800 rounded ml-3' onClick={() => navigate('/home/turma/0/edit')}
          >Criar Turma
          </button>
      </div>

      {/* Table */}
      <table className="min-w-full bg-white border border-gray-300 border-separate border-spacing-2 animate-fade-in delay-200">
        <thead>
        <tr className="bg-gray-100">
            <th className="py-2 px-4 border cursor-pointer" onClick={() => sortTurmas('name')}>
              Nome {sortField === 'name' && (sortOrder === 'asc' ? '↑' : '↓')}
            </th>
            <th className="py-2 px-4 border cursor-pointer" onClick={() => sortTurmas('school')}>
              Escola {sortField === 'school' && (sortOrder === 'asc' ? '↑' : '↓')}
            </th>
            <th className="py-2 px-4 border cursor-pointer" onClick={() => sortTurmas('year')}>
              Ano Escolar {sortField === 'year' && (sortOrder === 'asc' ? '↑' : '↓')}
            </th>
            <th className="py-2 px-4 border">Ações</th>
          </tr>
        </thead>
        <tbody>
          {currentTurmas.length > 0 ? (
            currentTurmas.map((turma, index) => (
              <tr key={index} className="hover:bg-gray-50">
                <td className="py-2 px-4 border">{turma.name}</td>
                <td className="py-2 px-4 border">{turma.school}</td>
                <td className="py-2 px-4 border">{turma.year}</td>
                <td className="py-2 px-2 border flex justify-center items-center">
                  <button

                    className="bg-purple-500 hover:bg-purple-600 text-white font-bold py-2 px-4  border-b-4 border-purple-700 hover:border-purple-800 rounded mr-4"
                    onClick={() => navigate(`/home/turma/${turma.id}/edit`, { state: { turma } })}
                  >
                    Editar Turma
                  </button>
                  <button 
                    className='bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4  border-b-4 border-red-700 hover:border-red-800 rounded'
                    onClick={() => confirmDelete(turma.id)}
                  >
                    Deletar Turma
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="py-2 px-4 border text-center">Nenhuma turma encontrada</td>
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

export default MenuTurmas;