import { useState } from "react";
//import logo from "@/public/odisseia_novo.png";
import { ReactComponent as FriendsIcon } from "../assets/friends.svg";
import { ReactComponent as MessagesIcon } from "../assets/messages.svg";
import { ReactComponent as NotificationsIcon } from "../assets/notifications.svg";
import { ReactComponent as BurgerIcon } from "../assets/burger.svg";

const Topbar = ({ toggleMenu }) => {
  const [isOpen, setIsOpen] = useState(null);

  const togglePopover = (id) => {
    setIsOpen(isOpen === id ? null : id);
  };

  return (
    <div className="fixed top-0 left-0 right-0 z-50 h-12 bg-gray-100 border-b flex justify-between items-center px-4">
      {/* Left Section: Hamburger Menu and Logo */}
      <div className="flex items-center space-x-4">
        {/* Hamburger Menu */}
        <button className="p-2 focus:outline-none" onClick={toggleMenu}>
          <BurgerIcon />
        </button>
        <img src="/odisseia_novo.png" alt="Odisseia Logo" className="h-8" />
      </div>
      <div className="text-gray-600"></div>
      <div className="flex items-center space-x-12 relative ml-auto mr-8">
        {" "}
        {/* Added mr-4 */}
        {/* Friends Icon with Popover */}
        <div className="relative">
          <button
            className="focus:outline-none"
            onMouseEnter={() => togglePopover("friends")}
            onMouseLeave={() => togglePopover(null)}
          >
            <FriendsIcon />
          </button>

          {/* Popover Content for Friends */}
          {isOpen === "friends" && (
            <div className="absolute right-0 mt-2 w-64 p-4 bg-white rounded-lg shadow-lg border z-10">
              <p className="text-gray-800 font-semibold mb-2">
                Lista de Amigos
              </p>
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
            onMouseEnter={() => togglePopover("messages")}
            onMouseLeave={() => togglePopover(null)}
          >
            <MessagesIcon />
          </button>

          {/* Popover Content for Messages */}
          {isOpen === "messages" && (
            <div className="absolute right-0 mt-2 w-64 p-4 bg-white rounded-lg shadow-lg border z-10">
              <p className="text-gray-800 font-semibold mb-2">Mensagens</p>
              <table className="table-auto w-full text-left">
                <tbody>
                  <tr className="bg-gray-100">
                    <td className="px-2 py-1 text-sm">
                      Mensagem de João Henrique: "Oi, eu queria..."
                    </td>
                  </tr>
                  <tr>
                    <td className="px-2 py-1 text-sm">
                      Mensagem de Thrall: "A horda não é mais a mesma..."
                    </td>
                  </tr>
                  <tr className="bg-gray-100">
                    <td className="px-2 py-1 text-sm">
                      Mensagem de Ignácio: "Instala o treco do AMD"
                    </td>
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
            onMouseEnter={() => togglePopover("notifications")}
            onMouseLeave={() => togglePopover(null)}
          >
            <NotificationsIcon />
          </button>

          {/* Popover Content for Notifications */}
          {isOpen === "notifications" && (
            <div className="absolute right-0 mt-2 w-64 p-4 bg-white rounded-lg shadow-lg border z-10">
              <p className="text-gray-800 font-semibold mb-2">Notificações</p>
              <table className="table-auto w-full text-left">
                <tbody>
                  <tr className="bg-gray-100">
                    <td className="px-2 py-1 text-sm">
                      O aluno César completou a aula 'Biodiversidade'.
                    </td>
                  </tr>
                  <tr>
                    <td className="px-2 py-1 text-sm">
                      A aula 'Valores e Cultura' está para expirar. 24 dos 31
                      alunos a completaram.
                    </td>
                  </tr>
                  <tr className="bg-gray-100">
                    <td className="px-2 py-1 text-sm">
                      O evento do Odisseia 'Jornada Infantil' começa dia 20/10!
                    </td>
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
