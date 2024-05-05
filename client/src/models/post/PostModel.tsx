export interface Post{
    title: string;
    description?: string;
    image_src?: string;
    upVotes: number;
    downVotes: number;
    comments: String[];
    userName: string;
    content: string;
}