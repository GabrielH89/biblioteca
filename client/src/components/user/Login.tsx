import { useState } from "react"
import { Link, useNavigate } from "react-router-dom";
import axios, {AxiosError} from "axios";
import "../../styles/user/SignIn.css";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    
    const handleLogin = async (e: {preventDefault: () => void;}) => {
        try{    
            e.preventDefault();
            if(email.trim().length > 0 || password.trim().length > 0) {
                const response = await axios.post("http://localhost:4000/users/login", {
                    email: email,
                    password: password
                });
                console.log("Response: " + response.data);
                const token = response.data.token; // Supondo que o token esteja na resposta como 'token'
                localStorage.setItem('token', token);
                navigate("/homealuno");
            }else{
                alert("Preencha o email e senha");
            }
        }catch(error) {
            if((error as AxiosError).response && (error as AxiosError).response?.status === 400 || 
            (error as AxiosError).response && (error as AxiosError).response?.status) {
                alert("Email ou senha inválidos");
            }else{
                console.log("Error: " + error);
            }  
        }
    }

    return (
        <div className="signInContainer">
        <form className="signInForm">
            <h2>Login</h2>
            <div className="formGroup">
            <label>Email:</label>
            <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
            />
            </div>
            <div className="formGroup">
            <label>Password:</label>
            <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
            />
            </div>
            <div className='login-btn'>
                <button type="submit" onClick={handleLogin}>Login</button>
            </div>
            <p>Não possui uma conta? <Link to="signUp">Cadastre-se</Link></p>
        </form>
        </div>
    )
}

export default Login