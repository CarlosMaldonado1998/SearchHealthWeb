import { storage } from "../lib/firebase";

let Photos;

export default Photos = {
  savePhotoCenter: (uid, file) => {
    return storage.ref(`/medicalCenters/${uid}--${file.name}`);
  },
};
