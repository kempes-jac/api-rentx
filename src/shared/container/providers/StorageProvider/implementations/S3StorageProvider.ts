import upload from '@config/upload';
import { S3 } from 'aws-sdk';
import { resolve } from 'path';
import fs from 'fs';
import mime from 'mime';
import { IStorageProvider } from "../IStorageProvider";


class S3StorageProvider implements IStorageProvider {
  private client: S3;

  constructor(){
    this.client = new S3({
      region: process.env.AWS_BUCKET_REGION,

    });
  }

  async save(file: string, folder: string): Promise<string> {
    const originalName = resolve(upload.tmpFolder, file);
    const fileContent = await fs.promises.readFile(originalName);
    const mimeType = mime.getType(originalName)
    try {
      await this.client.putObject({
        Bucket: `${process.env.AWS_BUCKET}/${folder}`,
        Key: file,
        ACL: "public-read",
        Body: fileContent,
        ContentType: mimeType
      }).promise();
      
    } catch (error) {
      console.error(error);
      
    }

    await fs.promises.unlink(originalName);
    
    return file;
  }


  async delete(file: string, folder: string): Promise<void> {
    this.client.deleteObject(
      {
        Bucket: `${process.env.AWS_BUCKET}/${folder}`,
        Key: file
      }
    );
  }

}

export { S3StorageProvider }