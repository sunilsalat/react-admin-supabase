import { supabaseAuthProvider } from "ra-supabase";
import { supabase } from "../db/supabase";

export const authProvider = supabaseAuthProvider(supabase, {
  getIdentity: async (user) => {
    const { data, error } = await supabase
      .from("profile")
      .select("id, name")
      .match({ email: user.email })
      .single();

    if (!data || error) {
      throw new Error("Failed to authenticate user");
    }

    return {
      id: data.id,
      fullName: `${data.first_name} ${data.last_name}`,
    };
  },
});
