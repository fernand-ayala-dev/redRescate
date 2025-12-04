import { supabase } from "./supabase";

/**
 *
 * @param {String} id
 * @returns {Promise<{id: String, email: String, display_name: String|null, biografia: String|null, avatar: String|null, created_at: String}>}
 */
export async function getUserProfileById(id) {
  const { data, error } = await supabase
    .from("my_profile")
    .select()
    .eq("id", id)
    .limit(1)
    .single();

  if (error) {
    console.log("error al traer el perfil del usuario", id, error);
    return null;
  }

  return data;
}
/**
 *
 * @param {{id:String,email: String, display_name: String|null, biografia: String|null, avatar: String|null}} data
 */
export async function createUserProfile(data) {
  const { error } = await supabase.from("my_profile").insert( {
    id: data.id,
    email: data.email,
    display_name: data.display_name ?? null,
    biografia: data.biografia ?? null,
    avatar: data.avatar ?? null,});

  if (error) {
    console.log("error al traer el perfil del usuario", id, error);
    throw new Error(error.message);
  }

   
}
/**
 *
 * @param {String} id
 * @param {{display_name: String|null, biografia: String|null, avatar: String|null}} data
 */
export async function updateUserProfile(id, data) {
  const { error } = await supabase.from("my_profile").update(data).eq("id", id);

  if (error) {
    console.log("error al actualizar perfil del usuario", id, error);
    throw new Error(error.message);
  }
}



export async function fechtAllUserProfiles() {
  const { data, error } = await supabase
    .from("my_profile")
    .select()
    .order("created_at", { ascending: true });

  if (error) {
    console.error("Error al obtener usuarios:", error.message);
    return [];
  }

  return data;
}