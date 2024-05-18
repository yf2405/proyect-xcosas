// pages/api/upload.js
import { initializeApp } from "firebase/app";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';

const firebaseConfig = {
  // Tu configuración de Firebase
};

const firebaseApp = initializeApp(firebaseConfig);
const storage = getStorage(firebaseApp);

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const file = req.files.file;
      const storageRef = ref(storage, file.name);
      const uploadTask = uploadBytesResumable(storageRef, file.data);

      uploadTask.on('state_changed', 
        (snapshot) => {
          // Puedes mostrar el progreso de la subida si lo deseas
        },
        (error) => {
          console.error('Error uploading file: ', error);
          res.status(500).json({ error: 'Error uploading file' });
        },
        async () => {
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
          res.status(200).json({ downloadURL });
        }
      );
    } catch (error) {
      console.error('Error handling upload: ', error);
      res.status(500).json({ error: 'Error handling upload' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}

export const config = {
  api: {
    bodyParser: {
      sizeLimit: '5mb', // Ajusta el límite de tamaño de archivo si es necesario
    },
  },
};
