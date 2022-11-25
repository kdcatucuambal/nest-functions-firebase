import { Body, Controller, Get, Param, ParseIntPipe, Post } from '@nestjs/common';
import { PostService } from './post.service';
import { CreatePostDto } from '../dtos/CreatePostDto';



@Controller('posts')
export class PostController {

    constructor(private readonly postService: PostService) { }
    
    @Get()
    public async getPosts() {
        return this.postService.getPosts();
    }

    @Get('/:id')
    public async getPostById(@Param('id') id: string) {
        return this.postService.getPostById(id);
    }

    @Post()
    public async savePost(@Body() post: CreatePostDto) {
        return this.postService.savePost(post);
    }

    @Get('/paginated/:limit/:lastKey?')
    public async getPostsPaginated(@Param('limit', ParseIntPipe ) limit: number, @Param('lastKey') lastKey: string) {
        return this.postService.getPostsPaginated(limit, lastKey);
    }

}
