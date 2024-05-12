"use client"
import React, { useState } from 'react';
import { Progress } from 'antd'
import { uploadFile } from '../../firebase/firebase.js';

function ImageUpload({ onImageUploaded }: { onImageUploaded: (imageUrl: string) => void }) {
  const [file, setFile] = useState<File | null>(null);
  const [uploadProgress, setUploadProgress] = useState<number>(0); // Nuevo estado para el progreso de carga
  const [previewUrl, setPreviewUrl] = useState<string>(''); // Nuevo estado para la URL de vista previa

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      const imageUrl = URL.createObjectURL(selectedFile); // Crear una URL de objeto para la vista previa
      setPreviewUrl(imageUrl); // Establecer la URL de vista previa
    }
  };

  const handleUpload = async () => {
    if (!file) {
      console.error("Debes seleccionar un archivo primero.");
      return;
    }

    try {
      const url = await uploadFile(file, setUploadProgress); // Pasar setUploadProgress a la función de carga
      onImageUploaded(url);
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };

  return (
    <div className='flex justify-center items-center'>
      <input type="file" name='image' onChange={handleFileChange} />
      <button type="button" onClick={handleUpload}>Cargar imagen</button>
      <Progress percent={uploadProgress} />{/* Mostrar el progreso de carga */}
      {previewUrl && <img src={previewUrl} alt="Preview" style={{ maxWidth: '100%', maxHeight: '200px' }} />} {/* Mostrar la vista previa de la imagen */}
    </div>
  );
}

export default ImageUpload;