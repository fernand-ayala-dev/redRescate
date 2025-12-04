import { supabase } from "./supabase";
import {
 
  deleteFilePost,
  inferExtensionFromMIME,
} from "./storage";


export async function sendNewGlobalPostMessages({
  send_id,
  email,
  content,
  file_post,
}) {
  const { data, error } = await supabase
    .from("global_publicaciones_messages")
    .insert({ send_id, email, content, file_post })
    .select()
    .single();

  if (error) {
    console.error("Error al enviar mensaje:", error.message);
    throw new Error(error.message);
  }
  return data;
}

export async function fetchGlobalPostMessages() {
  const { data, error } = await supabase
    .from("global_publicaciones_messages")
    .select()
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error cargando mensajes:", error.message);
    return [];
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


export async function updatePostContent(postId, sendId, content) {
  const { data, error } = await supabase
    .from("global_publicaciones_messages")
    .update({ content })
    .eq("id", postId)
    .eq("send_id", sendId)
    .select()
    .single();

  if (error) {
    console.error("Error al actualizar contenido:", error.message);
    throw new Error("No se pudo actualizar el contenido");
  }
  return data;
}

export async function uploadPostImage(file, userId) {
  try {
    if (!file) throw new Error("No hay archivo para subir");

    const ext = inferExtensionFromMIME(file.type);
    const fileName = `${userId}/${crypto.randomUUID()}.${ext}`;

    const { data, error } = await supabase.storage
      .from("file_post")
      .upload(fileName, file);

    if (error) throw error;

    return fileName;

  } catch (error) {
    console.error("Error al cargar imagen", error.message);
    throw new Error("No se pudo subir la imagen");
  }
}


export async function updatePostFile(postId, userId, oldFile, file) {
  try {
    if (!file) {
      console.warn("No hay archivo para actualizar");
      return;
    }
   
    const newFilePath = await uploadPostImage(file, userId);

    if (oldFile) {
      await deleteFilePost(oldFile);
    }

    
    const { data, error } = await supabase
      .from("global_publicaciones_messages")
      .update({ file_post: newFilePath })
      .eq("id", postId)
      .eq("send_id", userId)
      .select()
      .single();

    if (error) throw error;

    return data;
  } catch (error) {
    console.error("Error al actualizar:", error.message);
    throw new Error("No se pudo actualizar el archivo del post");
  }
}


export async function deletePost(post) {
  try {
    if (post.file_post) {
      await deleteFilePost(post.file_post);
    }

    const { data, error } = await supabase
      .from("global_publicaciones_messages")
      .delete()
      .eq("id", post.id)
      .eq("send_id", post.send_id);

    if (error) throw error;

    return data;
  } catch (error) {
    console.error("Error al eliminar post:", error.message);
    throw new Error("No se pudo eliminar la publicación.");
  }
}

export async function fetchPostComments(postId) {
  const { data, error } = await supabase
    .from('post_comments')
    .select('*')
    .eq('post_id', postId)
    .order('created_at', { ascending: true });

  if (error) throw error;
  return data;
}

// Crear un comentario
export async function sendPostComment({ postId, userId, content }) {
  const { data, error } = await supabase
    .from('post_comments')
    .insert([{ post_id: postId, user_id: userId, content }])
    .select()
    .single();

  if (error) throw error;
  return data;
}

// Suscripción en tiempo real (opcional)
export function subscribePostComments(postId, callback) {
  return supabase
    .from(`post_comments:post_id=eq.${postId}`)
    .on('INSERT', payload => callback(payload.new))
    .subscribe();
}


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
chatChannel.on(
   "postgres_changes",
    {
      event: "DELETE",
      table: "global_publicaciones_messages",
      schema: "public",
    },
    (payload) => {
      callback(payload.new);
    }
  );
chatChannel.on(
   "postgres_changes",
    {
      event: "UPDATE",
      table: "global_publicaciones_messages",
      schema: "public",
    },
    (payload) => {
      callback(payload.new);
    }
  );
  chatChannel.subscribe();

  return () => {
    chatChannel.unsubscribe();
  };
}
