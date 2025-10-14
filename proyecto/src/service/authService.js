import { supabase } from "./supabase";
import { getUserProfileById, createUserProfile,updateUserProfile } from "./userService.js";

let user = {
  id: null,
  email: null,
  display_name: null,
  biografia: null,
  avatar: null,
};

let observers = [];

if (localStorage.getItem("user")) {
  user = JSON.parse(localStorage.getItem("user"));
}

loadCurrentUserAuthState();


async function loadCurrentUserAuthState() {
  const { data, error } = await supabase.auth.getUser();

  if (error) {
    console.warn("No hay un usuario Autentificado");
    return;
  }

  setUser({
    id: data.user.id,
    email: data.user.email,
  });

  loadUserFullProfile();
}

async function loadUserFullProfile() {
  setUser(await getUserProfileById(user.id));
}

/**
 *Registrar usuario
 * @param {String} email
 * @param {String} password
 */
export async function register(email, password) {
  try {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      throw new Error("Error al crear usuario: " + error.message);
   
    }

    console.log("Usuario registrado con éxito.", data);

    // Crear el perfil del usuario en tabla "my_profile"
    await createUserProfile({
      id: data.user.id,
      email: data.user.email,
    });

    // Actualizar el estado global del usuario
    setUser({
      id: data.user.id,
      email: data.user.email,
    });
  } catch (error) {
    console.error("Error al registrar usuario:", error);
  }
}


/**
 * inicio de sesion
 * @param {String} email
 * @param {String} password
 */

export async function login(email, password) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  if (error) {
    console.error("Error al crear usuario");
  }
  console.log("Usuario inicion sesion con exito.", data);

  setUser({
    id: data.user.id,
    email: data.user.email,
  });

  loadUserFullProfile();
}

/**
 * Cerrar sesión
 */
export async function logout() {
  supabase.auth.signOut();

  setUser({
    id: null,
    email: null,
  });
}

export async function updateAuthProfile(data) {
  try {
    await updateUserProfile(user.id, data);

    setUser(data);
  } catch (error) {
    console.error("Error al actualizar usuario:", error.er);
  }
}


/**
 * Observer
 *Registrar al usuario
 * @param {(userState: {id: String|null, email: String|null}) => void} callback
 * @returns {() => void} Función para cancelar la suscripción.
 */

export function subscribeToAuthStateChanges(callback) {
  observers.push(callback);

  console.log("controlando mis observers" , observers);
  notify(callback);

  return ()=> {
    observers= observers.filter(obs => callback !== obs);
      console.log("observers removido" , observers);
  }
}

/**
 *
 * @param {(userState: {id: String|null, email: String|null}) => void} callback
 */
function notify(callback) {
  callback({ ...user });
}
/**
 * notificar a todos los obversers registrados
 */

function notifyAll() {
  observers.forEach(notify);
}

/**
 * 
 * @param {*} data 
 */
function setUser(data) {
  user = {
    ...user,
    ...data,
  };

  if (user.id) {
    localStorage.setItem("user", JSON.stringify(user));
  } else {
    localStorage.removeItem("user");
  }

  notifyAll();
}
