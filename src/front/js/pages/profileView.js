import React, { useContext } from "react";
import { Profile } from "../component/profile";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";
import imagenFondo from "../../img/imagenFondo.png";

export const ProfileView = () => {
  const { actions,store } = useContext(Context);
  const navigate = useNavigate();

  const handleDeleteUser = async () => {
    console.log("Botón de eliminar cuenta presionado");
    const success = await actions.deleteUser();
    console.log("Respuesta de deleteUser:", success);
    if (success) {
      navigate("/");
    } else {
      alert("Error al eliminar el usuario.");
    }
  };

  return (
    <div
      className="image-container"
      style={{ backgroundImage: `url(${imagenFondo})` }}
    >
      
      <div className="container" style={{ position: "relative", zIndex: 1 }}>
        <div className="col-8 mx-auto">
          <Profile />
          
        </div>
      </div>
    </div>
  );
};