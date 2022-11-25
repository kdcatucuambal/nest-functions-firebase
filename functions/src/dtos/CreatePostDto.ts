import { IsNotEmpty } from 'class-validator';

export class CreatePostDto {
    
    @IsNotEmpty({message: 'Title is required'})
    public title: string;

    @IsNotEmpty({message: 'Content is required'})
    public content: string;

    @IsNotEmpty({message: 'Author is required'})
    public author: string;

}