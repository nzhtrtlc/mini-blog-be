import { AuthResponse, User } from '@supabase/supabase-js';
import { supabase } from '../config/supabase';

export class AuthService {
  async signUp(email: string, password: string): Promise<AuthResponse> {
    const response = await supabase.auth.signUp({
      email,
      password,
    });

    if (response.error) {
      throw response.error;
    }

    return response;
  }

  async signIn(email: string, password: string): Promise<AuthResponse> {
    const response = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (response.error) {
      throw response.error;
    }

    return response;
  }

  async signOut(): Promise<void> {
    const { error } = await supabase.auth.signOut();

    if (error) {
      throw error;
    }
  }

  async getCurrentUser(): Promise<User | null> {
    const { data: { user }, error } = await supabase.auth.getUser();

    if (error) {
      throw error;
    }

    return user;
  }
}

export const authService = new AuthService();
