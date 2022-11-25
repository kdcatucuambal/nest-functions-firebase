import { Injectable } from '@nestjs/common';
import * as admin from 'firebase-admin';
import { CreatePostDto } from '../dtos/CreatePostDto';




@Injectable()
export class PostService {

    public async getPosts() {
        const posts = await admin.firestore().collection("posts").get();
        return posts.docs.map(post => post.data());
    }

    public async getPostById(id: string) {
        const post = await admin.firestore().collection("posts").doc(id).get();
        return post.data();
    }

    public async savePost(post: CreatePostDto) {
        const postToSave = { 
            ...post, 
            createdAt: admin.firestore.FieldValue.serverTimestamp(), 
            updatedAt: admin.firestore.FieldValue.serverTimestamp() 
        };
        return await admin.firestore().collection("posts").add(postToSave);
    }


    public async getPostsPaginated(limit: number, lastKey: string) {
        const first = admin.firestore().collection('posts').orderBy('createdAt', 'desc').limit(limit)
        .select('title', 'content');
        let query: FirebaseFirestore.Query<FirebaseFirestore.DocumentData>;
        if (lastKey) {
            const last = await admin.firestore().collection('posts').doc(lastKey).get();
            query = first.startAfter(last);
        }
        else {
            query = first;
        }
        const posts = await query.get();
        return posts.docs.map(post => post.data());
    }

    public async getPostsWhenIndexContains(randoms: number[]){
        //break the array into chunks of 10 to avoid the 10 limit of the in operator
        const chunks = this.chunkArray(randoms, 10);
        const promises = chunks.map(chunk => this.getWhenIndexContains(chunk, 'posts'));
        const posts = await Promise.all(promises);
        return posts.flat();
    }

    private chunkArray(randoms: number[], chunkSize: number) {
        const chunks = [];
        for (let i = 0; i < randoms.length; i += chunkSize) {
            chunks.push(randoms.slice(i, i + chunkSize));
        }
        return chunks;
    }


    private async getWhenIndexContains(randoms: number[], collection: string){
        const posts = await admin.firestore().collection(collection)
            .where('index', 'in', randoms)
            .get();
        return posts.docs.map(post => post.data());
    }

    // private getRandomNumbersWithoutRepetitions(min: number, max: number, quantity: number) {
    //     const numbers = [];
    //     while (numbers.length < quantity) {
    //         const random = Math.floor(Math.random() * (max - min + 1)) + min;
    //         if (!numbers.includes(random)) {
    //             numbers.push(random);
    //         }
    //     }
    //     return numbers;
    // }


}
