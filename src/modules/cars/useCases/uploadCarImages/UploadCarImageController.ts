import { Request, Response } from "express";
import { container } from "tsyringe";
import { UploadCarImagesUseCase } from "./UploadCarImagesUseCase";

interface IFIles{
  filename: string
}

class UploadCarImagesController{

  async handle( request: Request, response: Response ): Promise<Response>{
    const { id } = request.params;
    const imagesNames = ( request.files as IFIles[]).map( file => file.filename );

    const uploadCarImagesUseCase = container.resolve(UploadCarImagesUseCase);

    await uploadCarImagesUseCase.execute({ car_id: id, images_names: imagesNames});

    return response.status(201).send();
  }

}

export { UploadCarImagesController }