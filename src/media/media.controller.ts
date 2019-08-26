import { Controller, UseInterceptors, Post, UploadedFiles, Get, Param, Res, Delete } from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import * as path from 'path';
import * as fs from 'fs';
import { Response } from 'express';
import { MediaService } from './media.service';

@Controller('media')
export class MediaController {
    constructor(private readonly mediaService: MediaService) { }
    @Get(':id')
    getFile(@Param('id') id, @Res() res: Response) {
        const filePath = path.join(__dirname, `../../upload/${id}`);
        res.setHeader('content-type', 'image/jpg');
        res.sendFile(filePath);
    }

    @Post('upload')
    @UseInterceptors(FilesInterceptor('files'))
    uploadFile(@UploadedFiles() files) {
        return this.mediaService.storeFiles(files);
    }

    @Delete(':id')
    async removeFile(@Param('id') id) {
        const filePath = path.join(__dirname, `../../upload/${id}`);
        try {
            const file = await this.mediaService.removeFile(id);
            fs.unlinkSync(filePath);
        } catch (err) {
            return err;
        }
    }

}
