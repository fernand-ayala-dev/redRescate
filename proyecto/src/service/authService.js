import { supabase } from "./supabase";
import { getUserProfileById, createUserProfile,updateUserProfile } from "./userService.js";
import { uploadFile, deleteFile, getFileURL, inferExtensionFromMIME } from "./storage";

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
  notifyAll()
}

loadCurrentUserAuthState();

async function loadCurrentUserAuthState() {
  const { data, error } = await supabase.auth.getUser();

 
  if (error || !data.user) {
    console.warn("No hay un usuario Autentificado");
    setUser({ id: null, email: null });
    return; 
  }


  const basicUser = {
    id: data.user.id,
    email: data.user.email,
  };

  setUser(basicUser);

  await loadUserFullProfile(basicUser.id);
}

async function loadUserFullProfile() {
  if (!user.id) return;
  const profile = await getUserProfileById(user.id);
  if (profile) {
    setUser(profile);
  }
}


/**
 *Registrar usuario
 * @param {String} email
 * @param {String} password
 */
export async function register(email, password) {
  if (password.length < 6) {
    return { ok: false, message: "La contraseña debe tener al menos 6 caracteres." };
  }

  try {
    const { data, error } = await supabase.auth.signUp({ email, password });

    if (error) return { ok: false, message: error.message };

    // Crear perfil vacío en tu tabla de usuarios
    const newProfile = {
      id: data.user.id,
      email: data.user.email,
      display_name: "",
      avatar: null,
      biografia: "",
    };
    await createUserProfile(newProfile); setUser(newProfile);

    return { ok: true, user: newProfile };

  } catch (err) {
    return { ok: false, message: "Error inesperado en el registro." };
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
    console.error("Error al iniciar sesión:", error.message);
   throw new Error("Credenciales inválidas");
  }

  console.log("Usuario inició sesión con éxito.", data);

 
  setUser({
    id: data.user.id,
    email: data.user.email,
  });

  await loadUserFullProfile();

  return data.user;
}

/**
 * Cerrar sesión
 */
export async function logout() {
  await supabase.auth.signOut();

  setUser({
    id: null,
    email: null,
     display_name: null,
    biografia: null,
    avatar: null,
 
  });
}

export async function updateAuthProfile(data) {
  try {
    await updateUserProfile(user.id, data);

   setUser({
      ...user,
      ...data,
    });
  } catch (error) {
    console.error("Error al actualizar usuario:", error.er);
  }
}

export async function updateAuthUserAvatar(file) {
  try { 
    const ext = inferExtensionFromMIME(file.type);
    const avatar = `${user.id}/${crypto.randomUUID()}.${ext}`;

   
    await uploadFile(avatar, file);
   
    if (user.avatar) {
      await deleteFile(user.avatar);
    }

    
    await updateUserProfile(user.id, { avatar: avatar });
    
    setUser({ avatar: avatar });

  } catch (error) {
    console.error(error);
    throw new Error("No se pudo actualizar el avatar");
  }
}

/**
 * Observer
 *Registrar al usuario
 * @param {(userState: {id: String|null, email: String|null}) => void} callback
 * @returns {() => void} 
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
