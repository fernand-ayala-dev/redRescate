import { supabase } from "./supabase";
/**
 * 
 * @param {{send_id: String,email:String, content:String, avata:String}}data 
 */
export async function sendNewGlobalPostMessages({send_id, email, content}) {
  const { data, error } = await supabase
    .from("global_publicaciones_messages")
    .insert({
      send_id,
      email,
      content,
      
    })
    .select()
    .single();
   

  if (error) {
    console.error("Error al enviar mensaje:", error.message);
  }
  return data;
}
/**
 * 
 * @returns {Promise<{id: String, email: String, content: String, created_at: String}[]>}
 */
export async function fetchGlobalPostMessages() {
  const { data, error } = await supabase
    .from("global_publicaciones_messages")
    .select()
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error cargando mensajes:", error.message);
    return[];
  }

  return data;
}
export async function fetchUserPostMessages(userId) {
  
  const { data, error } = await supabase
    .from("global_publicaciones_messages")
    .select()
    .eq("send_id", userId)        
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error cargando mensajes del usuario:", error.message);
    return [];
  }

  return data;
}
/**
 * 
 * @param {(newMessage: {id:String, email: String, content: String, created_at: String})=> void} callback 
 */

export function subscribeGlobalPostMessages(callback) {
  const chatChannel = supabase.channel("global_publicaciones_messages");
  chatChannel.on(
    "postgres_changes",
    {
      event: "INSERT",
      table: "global_publicaciones_messages",
      schema: "public",
    },
    (payload) => {
      callback(payload.new);
    }
  );
  chatChannel.subscribe();

  return() => {
    chatChannel.unsubscribe();
  }
}
