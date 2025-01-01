import axios from "axios";
import { useEffect, useState } from "react";
import '../../styles/livro/AddFormLivro.css';

interface AddFormLivroProps {
  onClose: () => void; // Função para fechar o formulário
}

function AddFormLivro({ onClose }: AddFormLivroProps) {
  const [titulo, setTitulo] = useState("");
  const [autor, setAutor] = useState("");
  const [capa, setCapa] = useState<File | null>(null);
  const [editora, setEditora] = useState("");
  const [anoPublicacao, setAnoPublicacao] = useState("");
  const [genero, setGenero] = useState("");
  const [professorId, setProfessorId] = useState<number | null>(null);

  useEffect(() => {
    const idProfessor = localStorage.getItem("idProfessor");
    if (idProfessor) {
      setProfessorId(Number(idProfessor));
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("titulo", titulo);
    formData.append("autor", autor);
    formData.append("editora", editora);
    formData.append("ano_publicacao", anoPublicacao);
    formData.append("genero", genero);
    formData.append("idProfessor", String(professorId));

    if (capa) {
      formData.append("capa", capa);
    }

    try {
      const token = localStorage.getItem("token");
      await axios.post("http://localhost:4000/livros", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      alert("Livro cadastrado com sucesso");
      onClose(); // Fechar o formulário após o cadastro
    } catch (error) {
      console.log("Error: " + error);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setCapa(e.target.files[0]);
    }
  };

  return (
    <div className="add-form-livro">
      <h2>Cadastrar Livro</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Título:</label>
          <input
            type="text"
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Autor:</label>
          <input
            type="text"
            value={autor}
            onChange={(e) => setAutor(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Capa (Imagem):</label>
          <input
            type="file"
            onChange={handleFileChange}
            required
          />
        </div>
        <div>
          <label>Editora:</label>
          <input
            type="text"
            value={editora}
            onChange={(e) => setEditora(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Ano de Publicação:</label>
          <input
            type="number"
            value={anoPublicacao}
            onChange={(e) => setAnoPublicacao(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Gênero:</label>
          <input
            type="text"
            value={genero}
            onChange={(e) => setGenero(e.target.value)}
            required
          />
        </div>
        <button type="submit">Cadastrar Livro</button>
        
      </form>
    </div>
  );
}

export default AddFormLivro;
