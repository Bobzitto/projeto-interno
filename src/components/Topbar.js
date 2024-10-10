import { useState } from 'react';

const Topbar = () => {
  const [isOpen, setIsOpen] = useState(null);

  const togglePopover = (id) => {
    setIsOpen(isOpen === id ? null : id);
  };

  return (
    <div className="h-14 bg-gray-100 border-b flex justify-between items-center px-4">
      <div className="text-gray-600"></div>
      <div className="flex items-center space-x-12 relative ml-auto mr-8"> {/* Added mr-4 */}
        {/* Friends Icon with Popover */}
        <div className="relative">
          <button
            className="focus:outline-none"
            onMouseEnter={() => togglePopover('friends')}
            onMouseLeave={() => togglePopover(null)}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
              <circle cx="9" cy="7" r="4"></circle>
              <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
              <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
            </svg>
          </button>

          {/* Popover Content for Friends */}
          {isOpen === 'friends' && (
            <div className="absolute right-0 mt-2 w-64 p-4 bg-white rounded-lg shadow-lg border z-10">
              <p className="text-gray-800 font-semibold mb-2">Lista de Amigos</p>
              <table className="table-auto w-full text-left">
                <thead>
                  <tr>
                    <th className="px-2 py-1 text-sm text-gray-600">Nome</th>
                    <th className="px-2 py-1 text-sm text-gray-600">Status</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="px-2 py-1 text-sm">John Doe</td>
                    <td className="px-2 py-1 text-sm text-green-500">Online</td>
                  </tr>
                  <tr>
                    <td className="px-2 py-1 text-sm">Jane Smith</td>
                    <td className="px-2 py-1 text-sm text-red-500">Offline</td>
                  </tr>
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Messages Icon with Popover */}
        <div className="relative">
          <button
            className="focus:outline-none"
            onMouseEnter={() => togglePopover('messages')}
            onMouseLeave={() => togglePopover(null)}
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 0 1-.825-.242m9.345-8.334a2.126 2.126 0 0 0-.476-.095 48.64 48.64 0 0 0-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0 0 11.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155" />
</svg>

          </button>

          {/* Popover Content for Messages */}
          {isOpen === 'messages' && (
            <div className="absolute right-0 mt-2 w-64 p-4 bg-white rounded-lg shadow-lg border z-10">
              <p className="text-gray-800 font-semibold mb-2">Mensagens</p>
              <table className="table-auto w-full text-left">
                <tbody>
                  <tr className="bg-gray-100">
                    <td className="px-2 py-1 text-sm">Mensagem de João Henrique: "Oi, eu queria..."</td>
                  </tr>
                  <tr>
                    <td className="px-2 py-1 text-sm">Mensagem de Thrall: "A horda não é mais a mesma..."</td>
                  </tr>
                  <tr className="bg-gray-100">
                    <td className="px-2 py-1 text-sm">Mensagem de Ignácio: "Instala o treco do AMD"</td>
                  </tr>
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Notifications Icon with Popover */}
        <div className="relative">
          <button
            className="focus:outline-none"
            onMouseEnter={() => togglePopover('notifications')}
            onMouseLeave={() => togglePopover(null)}
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0M3.124 7.5A8.969 8.969 0 0 1 5.292 3m13.416 0a8.969 8.969 0 0 1 2.168 4.5" />
</svg>

          </button>

          {/* Popover Content for Notifications */}
          {isOpen === 'notifications' && (
            <div className="absolute right-0 mt-2 w-64 p-4 bg-white rounded-lg shadow-lg border z-10">
              <p className="text-gray-800 font-semibold mb-2">Notificações</p>
              <table className="table-auto w-full text-left">
                <tbody>
                  <tr className="bg-gray-100">
                    
                    <td className="px-2 py-1 text-sm">O aluno César completou a aula 'Biodiversidade'.</td>
                  </tr>
                  <tr>
                    <td className="px-2 py-1 text-sm">A aula 'Valores e Cultura' está para expirar. 24 dos 31 alunos a completaram.</td>
                  </tr>
                  <tr className="bg-gray-100">
                    <td className="px-2 py-1 text-sm">O evento do Odisseia 'Jornada Infantil' começa dia 20/10!</td>
                  </tr>
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* User Icon or Profile Picture */}
      <div className="h-10 w-10 bg-gray-300 rounded-full"></div>
    </div>
  );
};

export default Topbar;
