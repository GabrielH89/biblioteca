import axios from "axios";
import { useEffect, useState } from "react"
import '../../styles/user/PersonalInformations.css';

export interface UserDatas {
    name: string,
    email: string,
    telefone: string
}

function PersonalInformations() {
    const [userData, setUserData] = useState<UserDatas | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            const token = localStorage.getItem('token');
            const response = await axios.get<UserDatas>("http://localhost:4000/users", {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            setUserData(response.data);
        }
        fetchData();
    }, [])

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
        </div>
    )
}

export default PersonalInformations