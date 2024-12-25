import { useEffect, useState } from "react";
import axios from "axios";
import '../../styles/livro/HomeAluno.css';

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
  useEffect(() => {
    const fetchLivros = async () => {
      try{
        const token = localStorage.getItem('token');
        const response = await axios.get<Livro[]>("http://localhost:4000/livros", {
          headers: {
            'Authorization': `Bearer ${token}`,
          }
        });
        
        setLivros(response.data);
        console.log(response.data); 
      }catch(error) {
        setError("was not poossible")
        console.log(error);
      } 
    };
    fetchLivros();
  }, [])

  return (
    <div className="homeAluno">
    <h2>Livros Disponíveis</h2>
    {error && <p className="error">{error}</p>}
    {livros.length > 0 ? (
      <div className="livro-container">
        {livros.map((livro) => (
          <div className="livro-card" key={livro.idLivro}>
            <img
              src={`http://localhost:4000/uploads/${livro.capa}`} // Altere se necessário para o caminho correto das imagens.
              alt={livro.titulo}
              className="livro-capa"
              onLoad={() => console.log('Image loaded successfully')}
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
  )
}

export default HomeAluno