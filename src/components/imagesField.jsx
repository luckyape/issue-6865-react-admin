import { useWatch } from "react-hook-form";
import { storage } from "../App";
import { ImageInput, ImageField, Button } from "react-admin";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

export const ImagesField = () => {
  const media = useWatch({ name: "media", defaultValue: [] });
  const uploadImagesToStorage = async (media, tempFolderId) => {
    const imageBlobPromises = media.map(async ({ rawFile: file, src }) => {
      if (!file) {
        // If there's no file to process, return the original src URL.
        return { blob: null, src };
      }
      const imageBlob = file;
      return { blob: imageBlob, src: undefined }; // We don't return the original src if there's a blob
    });

    const imageBlobs = await Promise.all(imageBlobPromises);

    const uploadPromises = imageBlobs.map(async ({ blob, src }) => {
      const storageRef = ref(storage, `temp/${tempFolderId}/${blob.name}`);
      console.info(`Uploading Bytes ${`temp/${tempFolderId}/${blob.name}`}`);
      return await uploadBytes(storageRef, blob);
    });

    const urlPromises = (await Promise.all(uploadPromises)).map(
      async (snapshot) => {
        return await getDownloadURL(snapshot.ref);
      }
    );
    // Await the upload promises and filter out any null or undefined results
    return (await Promise.all(urlPromises)).filter(
      (url) => url !== null && url !== undefined
    );
  };

  const fetchRecomendation = async () => {
    if (media && media.length) {
      const urls = await uploadImagesToStorage(media, "testTemp");
      console.info(urls);
    }
  };

  return (
    <>
      <Button onClick={fetchRecomendation}>
        <span>Upload</span>
      </Button>

      <ImageInput
        variant="outlined"
        source="media"
        label=" "
        accept="image/*"
        multiple
      >
        <ImageField source="src" title="title" />
      </ImageInput>
    </>
  );
};
