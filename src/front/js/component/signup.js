import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import { Link, useNavigate } from "react-router-dom";
//import "../../styles/home.css"; 

export const Signup = () => {

    const { actions } = useContext(Context);
    const navigate = useNavigate()
    const [error, setError] = useState("");
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
    });

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData({ ...formData, [id]: value });
    };
    
    const handleChangeBarr = (e) => {
        const { id, value } = e.target;
        setFormData({ ...formData, [id]: value });
        evaluateStrength(value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const success = await actions.registerUser(formData); 
            if (success) {
                alert("Usuario creado con éxito, inicia sesion");
                navigate("/loginView");
            }
        } catch (error) {
            // Mostrar el mensaje de error del servidor
            alert(error.message || "Error al registrar el usuario");
        }
    };
    // para la barra de ls contrasenas
    const [password, setPassword] = useState('');
    const [strength, setStrength] = useState(0);

    const evaluateStrength = (pwd) => {
        let score = 0;

        if (pwd.length >= 8) score++; // Longitud mínima
        if (/[A-Z]/.test(pwd)) score++; // Contiene mayúsculas
        if (/[a-z]/.test(pwd)) score++; // Contiene minúsculas
        if (/[0-9]/.test(pwd)) score++; // Contiene números
        if (/[^A-Za-z0-9]/.test(pwd)) score++; // Contiene caracteres especiales

        setStrength(score);
    };

    const getProgressBarColor = () => {
        switch (strength) {
            case 1:
                return 'bg-danger'; 
            case 2:
                return 'bg-warning'; 
            case 3:
                return 'bg-info'; 
            case 4:
                return 'bg-primary'; 
            case 5:
                return 'bg-success'; 
            default:
                return 'bg-secondary'; 
        }
    };


    return (
        <div className="container text-white">
            <div className="row">
                <div className="col-md-6 offset-md-3">
                 
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="name">Tu nombre</label>
                            <input
                                type="text"
                                className="form-control inputStyle"
                                id="name"
                                placeholder="Pon aqui tu nombre"
                                value={formData.name}
                                onChange={handleChange}
                                required

                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="email">E-mail</label>
                            <input
                                type="email"
                                className="form-control inputStyle"
                                id="email"
                                placeholder="Pon aqui tu email"
                                value={formData.email}
                                onChange={handleChange}
                                required

                            />
                            <small id="emailHelp" className="form-text text-white"></small>
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <input
                                type="password"
                                className="form-control inputStyle"
                                id="password"
                                placeholder="8 caracteres, incluye mayuscula, minuscula, un numero y un caracter esp. ;)"
                                value={formData.password}
                                onChange={handleChangeBarr}
                                required

                            />
                        </div>
                        <div className="mt-2 mb-2">
                            <div className="progress" style={{ height: '6px' }}>
                                <div
                                    className={`progress-bar ${getProgressBarColor()}`}
                                    role="progressbar"
                                    style={{ width: `${(strength / 5) * 100}%` }}
                                    aria-valuenow={strength}
                                    aria-valuemin="0"
                                    aria-valuemax="5"
                                ></div>
                            </div>
                        </div>
                        <button type="submit" className="me-2 mt-2">Crear usuario</button>
                        <Link to="/loginView">
                            <button className="me-2 mt-2">Ir a login</button>
                        </Link>
                    </form>
                </div>
            </div>
        </div>
    );
};