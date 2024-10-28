export type CreatePostRequest = {
  title: string;
  slug: string;
  description: string;
  content: string;
  status: "draft" | "published";
};

export type UpdatePostRequest = Partial<CreatePostRequest>;

export type PostResponse<T> = {
  success: boolean;
  data?: T;
  error?: string;
};
