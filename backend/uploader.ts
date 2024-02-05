import { v2 as cloudinary, UploadApiResponse } from "cloudinary";

export const cloudinaryFileUploadMethod = async (file: string) => {
  return await new Promise<string>((resolve, reject) => {
    try {
      cloudinary.uploader.upload(
        file,
        { resource_type: "auto" },
        (err: unknown, res: UploadApiResponse | undefined) => {
          if (err) {
            console.error(err);
            reject(err);
          } else {
            if (res && res.secure_url) {
              resolve(res.secure_url);
            } else {
              reject(
                new Error(
                  "Invalid or missing secure_url in the Cloudinary response.",
                ),
              );
            }
          }
        },
      );
    } catch (e) {
      console.error(e);
      reject(e);
    }
  });
};
