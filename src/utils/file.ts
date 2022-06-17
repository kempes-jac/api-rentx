import fs from "fs";

export const deleteFile = async (fileName: string) => { 

  try {
    await fs.promises.stat(fileName);
    await fs.promises.unlink(fileName);
  } catch (error) {
    return;
  }
}