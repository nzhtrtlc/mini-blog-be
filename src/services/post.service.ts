import { supabase } from '../config/supabase';
import type { Post } from '../types/post.types';

export class PostService {
  async getAllPosts(): Promise<Post[]> {
    const { data, error } = await supabase
      .from('posts')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      throw new Error(`Error fetching posts: ${error.message}`);
    }

    return data || [];
  }

  async getPublishedPosts(): Promise<Post[]> {
    const { data, error } = await supabase
      .from('posts')
      .select('*')
      .eq('status', 'published')
      .order('created_at', { ascending: false });

    if (error) {
      throw new Error(`Error fetching published posts: ${error.message}`);
    }

    return data || [];
  }

  async getPostBySlug(slug: string): Promise<Post | null> {
    const { data, error } = await supabase
      .from('posts')
      .select('*')
      .eq('slug', slug)
      .single();

    if (error) {
      if (error.code === 'PGRST116') { // no rows returned
        return null;
      }
      throw new Error(`Error fetching post: ${error.message}`);
    }

    return data;
  }
}

export const postService = new PostService();
