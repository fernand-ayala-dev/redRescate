import { supabase } from "./supabase";
/**
 * 
 * @param {{email:String, content:String}}data 
 */
export async function sendNewGlobalPostMessages({ email, content }) {
  const { data, error } = await supabase
    .from("global_publicaciones_messages")
    .insert({
      email,
      content,
    })
    .select();
   

  if (error) {
    console.error("Error al enviar mensaje:", error.message);
  }
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
}
