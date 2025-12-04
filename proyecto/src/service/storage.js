import { supabase } from "./supabase";

export async function uploadFile(name, file, bucket = "avatars") {
    const { error } = await supabase.storage
        .from(bucket)
        .upload(name, file);

    if (error) throw error;
}



export function getFileURL(name, bucket = "avatars") {
  
    return supabase.storage
        .from(bucket)
        .getPublicUrl(name).data.publicUrl;
}

/**
 * 
 * @param {string} name 
 * @param {string} bucket 
 */
export async function deleteFile(name, bucket = 'avatars') {
  const { error } = await supabase
    .storage
    .from(bucket)
    .remove([name]); 

  if (error) {
    console.error('[storage.js deleteFile] Error:', error);
    throw new Error(error.message);
  }
}

export async function uploadFilePost(name, file, bucket = "file_post") {
    const { error } = await supabase.storage
        .from(bucket)
        .upload(name, file);

    if (error) throw error;
}

export function getFileURLPost(name, bucket = "file_post") {
  
    return supabase.storage
        .from(bucket)
        .getPublicUrl(name).data.publicUrl;
}
export async function deleteFilePost(name, bucket = 'file_post') {
  const { error } = await supabase
    .storage
    .from(bucket)
    .remove([name]); 

  if (error) {
    console.error('[storage.js deleteFile] Error:', error);
    throw new Error(error.message);
  }
}



export function inferExtensionFromMIME(mime) {
  const map = {
    "image/jpeg": "jpg",
    "image/png": "png",
    "image/webp": "webp",
    "image/gif": "gif",
  };

  return map[mime] || "jpg"; 
}


