import * as admin from 'firebase-admin';
export interface PostI {
    title: string;
    content: string;
}
export declare class EggService {
    getPosts(): Promise<admin.firestore.DocumentData[]>;
    getPostById(id: string): Promise<admin.firestore.DocumentData>;
    savePost(post: PostI): Promise<admin.firestore.DocumentReference<admin.firestore.DocumentData>>;
}
