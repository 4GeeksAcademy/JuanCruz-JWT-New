import React, { useContext } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";
import { Signup } from "../component/signup";
import "../../styles/home.css";



export const Home = () => {
	const { store, actions } = useContext(Context);

	return (
		
			

			
			<div className="container fondoSignup text-center mt-5">


				<h1 className="text-white animate__animated animate__pulse">Bienvenido a la pagina de login</h1>
				< Signup />

				<div className="alert alert-info text-center mx-auto col-6 mt-5">
					{store.message || "Loading message from the backend (make sure your python backend is running)..."}
				</div>

				<p>
					This boilerplate comes with lots of documentation:{" "}
					<a href="https://start.4geeksacademy.com/starters/react-flask">
						Read documentation
					</a>
				</p>

			</div>
		
	);
};