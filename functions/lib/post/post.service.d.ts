import * as admin from 'firebase-admin';
import { CreatePostDto } from '../dtos/CreatePostDto';
export declare class PostService {
    getPosts(): Promise<admin.firestore.DocumentData[]>;
    getPostById(id: string): Promise<admin.firestore.DocumentData>;
    savePost(post: CreatePostDto): Promise<admin.firestore.DocumentReference<admin.firestore.DocumentData>>;
    getPostsPaginated(limit: number, lastKey: string): Promise<admin.firestore.DocumentData[]>;
    getPostsWhenIndexContains(randoms: number[]): Promise<admin.firestore.DocumentData[]>;
    private chunkArray;
    private getWhenIndexContains;
}
