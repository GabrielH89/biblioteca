import { useEffect, useState } from "react";
import axios from "axios";
import AddFormLivro from "../livro/AddFormLivro"; // Importe o componente de formulário
import '../../styles/livro/HomeProfessor.css';
import { Link, useNavigate } from "react-router-dom";

interface Livro {
  idLivro: number;
  titulo: string;
  autor: string;
  capa: string;
  editora: string;
  ano_publicacao: number;
  genero: string;
  idProfessor: number;
  createdAt: number;
  updatedAt: number;
}

function HomeProfessor() {
  const [livros, setLivros] = useState<Livro[]>([]);
  const [error, setError] = useState("");
  const [isSidebarVisible, setIsSidebarVisible] = useState(true);
  const [isAddFormVisible, setIsAddFormVisible] = useState(false); // Controle de exibição do formulário
  const [confirmLogout, setConfirmLogout] = useState(false); 

  const navigate = useNavigate();

  useEffect(() => {
    const fetchLivros = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get<Livro[]>("http://localhost:4000/livros", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setLivros(response.data);
      } catch (error) {
        setError("Não foi possível carregar os livros.");
        console.log("Error " + error);
      }
    };
    fetchLivros();
  }, []);

  const toggleAddForm = () => {
    setIsAddFormVisible(!isAddFormVisible);
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("idUser");
    navigate("/");
  }

  const openLogoutPopup = () => {
    setConfirmLogout(true);
  }

  const closeLogoutPopup = () => {
    setConfirmLogout(false);
  }

  return (
    <div className={`homeProfessor ${isSidebarVisible ? "sidebar-visible" : ""}`}>
      <button
        className="toggle-sidebar"
        onClick={() => setIsSidebarVisible(!isSidebarVisible)}
      >
        {isSidebarVisible ? "Esconder Menu" : "Mostrar Menu"}
      </button>
      {isSidebarVisible && (
        <div className="sidebar">
          <ul>
            <li>
              <button onClick={toggleAddForm}>Cadastrar Livros</button>
            </li>
            <li>
              <Link to={"/personal-info"}>
                <button>Informações Pessoais</button>
              </Link>
            </li>
          </ul>
          <button className="logout" onClick={openLogoutPopup}>Sair</button>
        </div>
      )}
      <div className="content">
        {isAddFormVisible ? (
          <div className="popup">
            <button className="close-popup" onClick={toggleAddForm}>
              Fechar
            </button>
            <AddFormLivro onClose={toggleAddForm} /> {/* Passando função de fechamento */}
          </div>
        ) : (
          <>
            <h2>Livros Disponíveis</h2>
            {error && <p className="error">{error}</p>}
            {livros.length > 0 ? (
              <div className="livro-container">
                {livros.map((livro) => (
                  <div className="livro-card" key={livro.idLivro}>
                    <img
                      src={`http://localhost:4000/uploads/${livro.capa}`}
                      alt={livro.titulo}
                      className="livro-capa"
                    />
                    <h3>{livro.titulo}</h3>
                    <p>Autor: {livro.autor}</p>
                    <p>Editora: {livro.editora}</p>
                    <p>Ano: {livro.ano_publicacao}</p>
                    <p>Gênero: {livro.genero}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p>Nenhum livro cadastrado.</p>
            )}
          </>
        )}
      </div>
      {confirmLogout && (
        <div className="logout-popup">
          <div className="popup-content">
            <p>Tem certeza que deseja sair da conta?</p>
            <button className="confirm-btn" onClick={logout}>Sim</button>
            <button className="cancel-btn" onClick={closeLogoutPopup}>Não</button>
          </div>  
        </div>
      )}
    </div>
  );
}

export default HomeProfessor;
