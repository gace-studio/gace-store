import { Injectable } from '@nestjs/common';
import { Media } from './media.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class MediaService {
    constructor(@InjectRepository(Media) private readonly mediaRepository: Repository<Media>) { }

    async storeFiles(files: any[]) {
        const data = this.mediaRepository.create(files.map(file => {
            return {
                name: file.originalname,
                mimetype: file.mimetype,
                filename: file.filename,
                path: file.path,
            };
        }));
        return await this.mediaRepository.save(data);
    }

    async removeFile(id: string) {
        return await this.mediaRepository.delete({filename: id});
    }
}
