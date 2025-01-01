import { useEffect, useState } from "react";
import axios from "axios";
import '../../styles/livro/HomeAluno.css';
import { Link } from "react-router-dom";

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

function HomeAluno() {
  const [livros, setLivros] = useState<Livro[]>([]);
  const [error, setError] = useState("");
  const [isSidebarVisible, setIsSidebarVisible] = useState(true);

  useEffect(() => {
    const fetchLivros = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get<Livro[]>("http://localhost:4000/livros", {
          headers: {
            'Authorization': `Bearer ${token}`,
          }
        });

        setLivros(response.data);
      } catch (error) {
        setError("Não foi possível carregar os livros.");
        console.log(error);
      }
    };
    fetchLivros();
  }, []);

  return (
    <div className={`homeAluno ${isSidebarVisible ? "sidebar-visible" : ""}`}>
      <button
        className="toggle-sidebar"
        onClick={() => setIsSidebarVisible(!isSidebarVisible)}
      >
        {isSidebarVisible ? "Esconder Menu" : "Mostrar Menu"}
      </button>
      {isSidebarVisible && (
        <div className="sidebar">
          <ul>
            <li><Link to={"/borrowed-books"}><button>Livros Emprestados</button></Link></li>
            <li><Link to={"/personal-info"}><button>Informações Pessoais</button></Link></li>
          </ul>
          <button className="logout">Sair</button>
        </div>
      )}
      <div className="content">
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
      </div>
    </div>
  );
}

export default HomeAluno;
  