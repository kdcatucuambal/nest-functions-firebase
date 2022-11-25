import { EggService, PostI } from './egg.service';
export declare class EggController {
    private readonly eggService;
    constructor(eggService: EggService);
    getPosts(): Promise<FirebaseFirestore.DocumentData[]>;
    getPostById(id: string): Promise<FirebaseFirestore.DocumentData>;
    savePost(post: PostI): Promise<FirebaseFirestore.DocumentReference<FirebaseFirestore.DocumentData>>;
}
