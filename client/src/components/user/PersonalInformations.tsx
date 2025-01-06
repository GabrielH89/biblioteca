import axios from "axios";
import { useEffect, useState } from "react";
import '../../styles/user/PersonalInformations.css';
import { useNavigate } from "react-router-dom";

export interface UserDatas {
    name: string,
    email: string,
    telefone: string
}

function PersonalInformations() {
    const [userData, setUserData] = useState<UserDatas | null>(null);
    const [confirmDeleteAccount, setConfirmDeleteAccount] = useState(false);
    const [successPopup, setSuccessPopup] = useState(false); // Estado para o pop-up de sucesso
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            const token = localStorage.getItem('token');
            const response = await axios.get<UserDatas>("http://localhost:4000/users", {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            setUserData(response.data);
        };
        fetchData();
    }, []);

    const deleteAccount = async () => {
        try {
            const token = localStorage.getItem('token');
            await axios.delete("http://localhost:4000/users/delete", {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            setSuccessPopup(true); // Exibir o pop-up de sucesso
        } catch (error) {
            console.log("Error: " + error);
        }
    };

    const closeSuccessPopup = () => {
        setSuccessPopup(false);
        localStorage.removeItem('token'); // Remover token do usuário
        navigate("/"); // Redirecionar para a página inicial
    };

    const openAccountDeleteProp = () => {
        setConfirmDeleteAccount(true);
    };

    const closeAccountDeleteProp = () => {
        setConfirmDeleteAccount(false);
    };

    return (
        <div className="personal-info-container">
            <h2>Informações pessoais</h2>
            <form className="personal-info-form">
                <div>
                    <label htmlFor="name">Name:</label>
                    <input
                        id="name"
                        type="text"
                        value={userData?.name || ""}
                        readOnly // Campo não editável
                    />
                </div>
                <div>
                    <label htmlFor="email">Email:</label>
                    <input
                        id="email"
                        type="email"
                        value={userData?.email || ""}
                        readOnly // Campo não editável
                    />
                </div>
                <div>
                    <label htmlFor="telefon">Phone:</label>
                    <input
                        id="telefon"
                        type="tel"
                        value={userData?.telefone || ""}
                        readOnly // Campo não editável
                    />
                </div>
            </form>
            <button className="delete-account" onClick={openAccountDeleteProp}>Deletar conta</button>
            {confirmDeleteAccount && (
                <div className="deleteAccount-popup">
                    <div className="deleteAcccountPopup-content">
                        <p>Tem certeza que deseja excluir a sua conta?</p>
                        <button className="confirm-btn" onClick={deleteAccount}>Sim</button>
                        <button className="cancel-btn" onClick={closeAccountDeleteProp}>Não</button>
                    </div>
                </div>
            )}
            {successPopup && (
                <div className="success-popup">
                    <div className="success-popup-content">
                        <p>Conta excluída com sucesso!</p>
                        <button className="confirm-btn" onClick={closeSuccessPopup}>OK</button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default PersonalInformations;
