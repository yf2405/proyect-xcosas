"use client"
import {uploadFile} from '../../firebase/firebase.js'
import React, { useState } from 'react'


 function ImageUpload() {
  const [file, setFile] = useState(null);
  const handleSubmit = (e:any) => {
    e.preventDefault();
    uploadFile(file);
  }
  return (
    <form onSubmit={handleSubmit}>
    <div className='flex justify-center items-center h-screen'>
       <input type="file" name='' id='' onChange={e => setFile(e.target.files[0])} />
      <button>Cargar</button>
    </div>
    </form>
  )
}

export default ImageUpload