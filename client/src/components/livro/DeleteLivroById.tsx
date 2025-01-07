import { useState } from "react";
import axios from "axios";
import '../../styles/livro/DeleteLivroById.css';

interface DeleteLivroProps {
  idLivro: number;
  onDelete: () => void;
}

function DeleteLivroById({ idLivro, onDelete }: DeleteLivroProps) {
  const [isConfirmPopupVisible, setIsConfirmPopupVisible] = useState(false);

  const handleDelete = async () => {
    try {
      const token = sessionStorage.getItem("token");
      await axios.delete(`http://localhost:4000/livros/${idLivro}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      alert("Livro excluído com sucesso");
      onDelete();
    } catch (error) {
      console.log("Error: " + error);
    }
  };

  const openConfirmPopup = () => {
    setIsConfirmPopupVisible(true);
  };

  const closeConfirmPopup = () => {
    setIsConfirmPopupVisible(false);
  };

  const confirmDelete = () => {
    handleDelete();
    closeConfirmPopup();
  };

  return (
    <div>
      <button className="delete-livro" onClick={openConfirmPopup}>
        Deletar Livro
      </button>
      {isConfirmPopupVisible && (
        <div className="popup-overlay">
          <div className="popup-content">
            <p>Tem certeza que deseja deletar este livro?</p>
            <button className="confirm-btn" onClick={confirmDelete}>
              Sim
            </button>
            <button className="cancel-btn" onClick={closeConfirmPopup}>
              Cancelar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default DeleteLivroById;
