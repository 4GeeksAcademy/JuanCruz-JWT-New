const getState = ({ getStore, getActions, setStore }) => {
  return {
    store: {
      message: null,
      registerUser: [],
      authToken: localStorage.getItem("authToken") || null,
      user: JSON.parse(localStorage.getItem("user")) || null,
    },

    actions: {
      getMessage: async () => {
        try {
          console.log("Backend URL:", process.env.BACKEND_URL);
          const resp = await fetch(`${process.env.BACKEND_URL}/api/hello`);
          if (!resp.ok) throw new Error("Error al obtener el mensaje");

          const data = await resp.json();
          setStore({ message: data.message });
          return data;
        } catch (error) {
          console.log("Error loading message from backend:", error);
        }
      },

      registerUser: async (formData) => {
        try {
          const response = await fetch(
            `${process.env.BACKEND_URL}/api/register`,
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(formData),
            }
          );

          if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || "Error en el registro");
          }

          console.log("Registro exitoso");
          return true;
        } catch (error) {
          console.error("Error al registrar el usuario:", error.message);
          return false;
        }
      },

      getAllUsers: async () => {
        try {
          const response = await fetch(`${process.env.BACKEND_URL}/api/users`, {
            method: "GET",
            headers: { "Content-Type": "application/json" },
          });

          if (!response.ok) throw new Error("Error al cargar usuarios");

          const data = await response.json();
          setStore({ registerUser: data });
          return data;
        } catch (error) {
          console.error("Error al cargar los datos de usuarios:", error);
          return null;
        }
      },

      loginUser: async (email, password) => {
        try {
          const response = await fetch(`${process.env.BACKEND_URL}/api/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password }),
            mode: "cors",
          });

          if (!response.ok) {
            const errorData = await response.json();
            throw new Error(
              errorData.message || "Error en el inicio de sesión"
            );
          }

          const data = await response.json();
          setStore({ authToken: data.access_token, user: data.user });
          localStorage.setItem("authToken", data.access_token);
          localStorage.setItem("user", JSON.stringify(data.user));

          console.log("Inicio de sesión exitoso");
          return true;
        } catch (error) {
          console.error("Error al iniciar sesión:", error.message);
          return false;
        }
      },

      logout: () => {
        setStore({ authToken: null, user: null });
        localStorage.removeItem("authToken");
        localStorage.removeItem("user");
        console.log("Sesión cerrada");
      },

      getData: () => {
        setStore({
          authToken: localStorage.getItem("authToken") || null,
          user: JSON.parse(localStorage.getItem("user")) || null,
        });
      },
    },
  };
};

export default getState;
