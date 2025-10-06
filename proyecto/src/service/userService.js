import { supabase } from "./supabase";

/**
 * 
 * @param {String} id 
 * @returns {Promise<{id: String, email: String, display_name: String|null, bio: String|null, career: String|null, created_at: String}>}
 */
export async function getUserProfileById(id) {
    const {data, error} =await supabase
    .from('my_profile')
    .select()
    .eq('id', id)
    .limit(1)
    .single();

    if(error){
        console.log('error al traer el perfil del usuario' , id , error)
    }

    return data;
}

export async function createUserProfile(data) {
    const {error} = await supabase
.from('my_profile')
.insert(data);
 if(error){
        console.log('error al traer el perfil del usuario' , id , error)
    }

    
}

export async function updateUserProfile(id, data) {
    const { error} =await supabase
    .from('my_profile')
    .update(data)
    .eq('id', id);
    
    if(error){
        console.log('error al actualizar perfil del usuario' , id , error)
    }
}