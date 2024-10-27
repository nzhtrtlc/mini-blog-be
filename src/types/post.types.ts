export type Post = {
  id: string;
  title: string;
  slug: string;
  description: string;
  content: string;
  featured_image?: string;
  status: "draft" | "published";
  created_at: Date;
  updated_at: Date;
};

export type CreatePostDTO = Omit<Post, "id" | "created_at" | "updated_at">;

export type UpdatePostDTO = Partial<CreatePostDTO>;

export type PostResponse = {
  data: Post | null;
  error: string | null;
};

export type PostsListResponse = {
  data: Post[];
  error: string | null;
};
