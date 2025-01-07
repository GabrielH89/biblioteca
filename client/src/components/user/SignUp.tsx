import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios, { AxiosError } from "axios";
import '../../styles/user/SignUp.css';
import InputMask from 'react-input-mask';

function SignUp() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [telefone, setTelefone] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [role, setRole] = useState(""); // Estado para armazenar a role
    const [matricula, setMatricula] = useState("");
    const [disciplina, setDisciplina] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    useEffect(() => {
        if (errorMessage) {
            const timer = setTimeout(() => {
                setErrorMessage("");
            }, 5000); // Mensagem desaparece após 5 segundos
            return () => clearTimeout(timer); // Limpa o temporizador se o componente for desmontado
        }
    }, [errorMessage]);

    const handleRoleChange = (selectedRole: string) => {
        setRole(selectedRole);
        setMatricula("");
        setDisciplina("");
    };

    const handleSignUp = async (e: React.FormEvent) => {
        e.preventDefault();

        // Validação de email e senha com regex
        const regexEmail = /^[a-zA-Z0-9._-]+@[a-zA-Z.-]+\.[a-zA-Z]{2,4}$/;
        const regexPassword = /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*]).{6,}$/;

        if (!regexEmail.test(email)) {
            setErrorMessage("Insira um email válido");
            return;
        }

        if (!regexPassword.test(password)) {
            setErrorMessage("A senha deve conter pelo menos 6 caracteres, incluindo letra maiúscula, minúscula, número e caractere especial.");
            return;
        }

        if (password !== confirmPassword) {
            setErrorMessage("Senha e confirmação de senha não batem.");
            return;
        }

        if (!role) {
            setErrorMessage("Escolha uma role: Aluno ou Professor.");
            return;
        }

        try {
            const formData = new FormData();
            formData.append("name", name);
            formData.append("email", email);
            formData.append("telefone", telefone);
            formData.append("password", password);
            formData.append("role", role);
    
            // Adiciona os campos opcionais dependendo da role
            if (role === "aluno") {
                formData.append("matricula", matricula);
            } else if (role === "professor") {
                formData.append("disciplina", disciplina);
            }

            await axios.post("http://localhost:4000/users/register", formData, {
                headers: {
                    "Content-Type": "application/json",
                }
            });

            setName("");
            setEmail("");
            setTelefone("");
            setPassword("");
            setConfirmPassword("");
            setRole("");
            setMatricula("");
            setDisciplina("");
            setErrorMessage("");

            alert("Cadastro realizado com sucesso!");

        } catch (error) {
            if ((error as AxiosError).response && (error as AxiosError).response?.status === 400) {
                setErrorMessage("Usuário já existente, tente se cadastrar com outro");
                console.log(name)
                console.log(email)
                console.log(telefone)
                console.log(password)
                console.log(role)
                if (errorMessage) {
                    setTimeout(() => {
                        setErrorMessage("");
                    }, 5000);
                }
            } else {
                console.log("Error: " + error);
            }
        }
    };

    return (
        <div>
            <form className="signUpForm" onSubmit={handleSignUp}>
                {errorMessage && 
                     <div className="error-message" style={{ backgroundColor: '#B22222', color: 'white', 
                        padding: '10px', marginBottom: '10px', borderRadius: '5px', textAlign: 'center', fontSize: '1.1rem' }}>
                {errorMessage}</div>}
                <h2>Cadastro</h2>
                <div className="formGroup">
                    <label>Nome:</label>
                    <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
                </div>
                <div className="formGroup">
                    <label>Email:</label>
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                </div>
                <div className="formGroup">
                    <label>Telefone:</label>
                    <InputMask mask="99-99999-9999" type="text" value={telefone}
                    placeholder="Ex: XX-XXXXX-XXXX" onChange={(e) => setTelefone(e.target.value)} required
                    />
                </div>
                <div className="formGroup">
                    <label>Senha:</label>
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                </div>
                <div className="formGroup">
                    <label>Confirmar senha:</label>
                    <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
                </div>

                <div className="formGroup">
                    <label>Role:</label>
                    <div>
                        <label>
                            <input
                                type="checkbox"
                                checked={role === "aluno"}
                                onChange={() => handleRoleChange("aluno")}
                            />
                            Aluno
                        </label>
                        <label>
                            <input
                                type="checkbox"
                                checked={role === "professor"}
                                onChange={() => handleRoleChange("professor")}
                            />
                            Professor
                        </label>
                    </div>
                </div>

                {/* Campos condicionais */}
                {role === "aluno" && (
                    <div className="formGroup">
                        <label>Matrícula:</label>
                        <InputMask mask="99999" type="text" value={matricula}
                        placeholder="5 dígitos(números)" onChange={(e) => setMatricula(e.target.value)} required
                        />
                    </div>
                )}
                {role === "professor" && (
                    <div className="formGroup">
                        <label>Disciplina:</label>
                        <input
                            type="text"
                            value={disciplina}
                            onChange={(e) => setDisciplina(e.target.value)}
                            required
                        />
                    </div>
                )}

                <div className="signUp-btn">
                    <button type="submit">Cadastrar</button>
                </div>
                <p>
                    Já possui uma conta? <Link to="/">Entrar</Link>
                </p>
            </form>
        </div>
    );
}

export default SignUp;
