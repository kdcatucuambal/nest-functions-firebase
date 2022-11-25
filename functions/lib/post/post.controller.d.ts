import { PostService } from './post.service';
import { CreatePostDto } from '../dtos/CreatePostDto';
export declare class PostController {
    private readonly postService;
    constructor(postService: PostService);
    getPosts(): Promise<FirebaseFirestore.DocumentData[]>;
    getPostById(id: string): Promise<FirebaseFirestore.DocumentData>;
    savePost(post: CreatePostDto): Promise<FirebaseFirestore.DocumentReference<FirebaseFirestore.DocumentData>>;
    getPostsPaginated(limit: number, lastKey: string): Promise<FirebaseFirestore.DocumentData[]>;
}
