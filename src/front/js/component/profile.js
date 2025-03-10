import React, { useContext, useState, useEffect } from "react";
import { Context } from "../store/appContext";
import { Button, Card, Container, Row, Col } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import "../../styles/home.css";



export const Profile = () => {
    const { userOut, setUserOut } = useContext(Context)
    const { actions, store } = useContext(Context);
    const navigate = useNavigate();

    const projects = [
        {
            title: "Mamma Mia",
            description: "Proyecto de fin de curso. Una pagina que integra inteligencia artificial y permite generar recetas de cocina.",
            image: "https://img.freepik.com/foto-gratis/platos-comida-vegana_1084-74.jpg?t=st=1740850932~exp=1740854532~hmac=a333824a18cc5725e91fb54192b8f3b662b7d00e904c4f2c2263e88e088434f8&w=1380"
        },
        {
            title: "StarWars API",
            description: "Una API de SW con modelo de datos y relaciones entre planetas y personajes",
            image: "https://img.freepik.com/foto-gratis/asentamiento-exploracion-tecnologica_23-2151768701.jpg?semt=ais_hybrid"
        }
    ]

    const handleLogout = () => {
        // limpiar user data del localStorage
        localStorage.removeItem("authToken");
        localStorage.removeItem("user");
        actions.logout();
        // success message
        alert("You have successfully logged out.");
        navigate("/");
    };

    return (

        <div className="container containerProfile col-10">
            <div className="row my-4">

                <div className="col md-8">

                    <h2 className="text-white">{store.user.email}</h2>
                    <p className="text-white">
                        Estos son algunos de los proyectos hechos en clase!!! 
                    </p>

                </div>
            </div>
            <div className="row">
                {projects.map((project, index) => (
                    <div className="col md-4 mb-4" key={index}>
                        <Card>
                            <Card.Img variant="top" src={project.image} />
                            <Card.Body>
                                <Card.Title>{project.title}</Card.Title>
                                <Card.Text>{project.description}</Card.Text>
                            </Card.Body>
                        </Card>
                    </div>
                ))}
            </div>
        </div>

    )
};

/* 
 <div className="col md-4" >
                        
                    </div>*/