import { supabase } from "./supabase";

let ChatCache = {};

function addToPrivateChatCache(sendId, receiverId, data) {
  const key = [sendId, receiverId].sort().join("_");
  ChatCache[key] = data;
}

function getFromPrivateChatCache(sendId, receiverId) {
  const key = [sendId, receiverId].sort().join("_");
  return ChatCache[key] || null;
}

export async function createChat(sendId, receiverId) {
  const [user1, user2] = [sendId, receiverId].sort();

  const { data, error } = await supabase
    .from("chats_global")
    .insert({
      user_id1: user1,
      user_id2: user2,
    })
    .select()
    

  if (error) {
    console.error("Error al crear el chat privado: ", error);
    throw new Error(error.message);
  }

  return data[0];
}

export async function getChatFor(sendId, receiverId) {
  

  const [user1, user2] = [sendId, receiverId].sort();

  const { data, error } = await supabase
    .from("chats_global")
    .select()
    .eq("user_id1", user1)
    .eq("user_id2", user2);
    

  if (error) {
    console.error("Error al buscar el chat privado:", error);
    throw new Error(error.message);
  }

  //if (data) addToPrivateChatCache(sendId, receiverId, data);

   return data[0] || null;
}
/*
export async function getOrCreateChatFor(sendId, receiverId) {
  const cached = getFromPrivateChatCache(sendId, receiverId);
  if (cached) return cached;

  let chat = await getChatFor(sendId, receiverId);

  if (chat === null) {
    chat = await createChat(sendId, receiverId);
  }

  addToPrivateChatCache(sendId, receiverId, chat);

  return chat;
}*/

export async function sendChatMessage(sendId, receiverId, content) {
  const chat = await getChatFor(sendId, receiverId);

  if (!chat) {
    chat = await createChat(sendId, receiverId);
    addToPrivateChatCache(sendId, receiverId, chat);
  }

  const { error } = await supabase.from("chat_messages").insert({
    chat_id: chat.id,
    send_id: sendId,
    content,
  });

  if (error) throw new Error(error.message);
}

export async function fetchChatLastMessages(sendId, receiverId) {
  let chat = await getChatFor(sendId, receiverId);

  const { data, error } = await supabase
    .from("chat_messages")
    .select()
    .eq("chat_id", chat.id);
  //.order("created_at", { ascending: true });

  if (error) {
    console.error("Error al traer los mensajes del chat privado: ", error);
    throw new Error(error.message);
  }
  return data;
}

export async function subscribeToChatNewMessages(sendId, receiverId, callback) {
  const chat = await getChatFor(sendId, receiverId);

  if (!chat) return () => {};
  const channel = supabase.channel("chat_messages");

  channel.on(
    "postgres_changes",
    {
      event: "INSERT",
      table: "chat_messages",
      filter: `chat_id=eq.` + chat.id,
    },
    (payload) => callback(payload.new)
  );

  channel.subscribe();

  return () => channel.unsubscribe();
}
