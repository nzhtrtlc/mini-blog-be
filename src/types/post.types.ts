export type Post = {
  id: string; // UUID
  title: string;
  slug: string;
  description: string;
  content: string;
  featured_image?: string; // optional
  status: "draft" | "published";
  created_at: Date; // Supabase otomatik oluşturuyor
  updated_at: Date; // Supabase otomatik güncelliyor
};

// Yeni post oluştururken kullanılacak tip
export type CreatePostDTO = Omit<Post, "id" | "created_at" | "updated_at">;

// Post güncellerken kullanılacak tip - tüm alanlar optional
export type UpdatePostDTO = Partial<CreatePostDTO>;

// Post response tipi - API response'ları için
export type PostResponse = {
  data: Post | null;
  error: string | null;
};

// Posts list response tipi
export type PostsListResponse = {
  data: Post[];
  error: string | null;
};
