
import { fetchBaseQuery } from "@reduxjs/toolkit/query";
import { supabase } from "../supabase";

export const customBaseQuery = fetchBaseQuery({ 
    baseUrl: `${process.env.NEXT_PUBLIC_CASTLE_API_URL}/api/v1/`,
    prepareHeaders: async (headers) => {
        // Get the current session from Supabase
        const { data: { session } } = await supabase.auth.getSession();
    
        if (session?.access_token) {
          // Add the Supabase JWT token to the Authorization header
          headers.set('Authorization', `Bearer ${session.access_token}`);
        }
    
        return headers;
      }
})