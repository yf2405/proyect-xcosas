'use client';

import React, { useState } from 'react';
import emailjs from 'emailjs-com';
import { Button } from './ui/button';

const ContactForm = ({ cart }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const templateParams = {
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      phone: formData.phone,
      address: formData.address,
      cart: JSON.stringify(cart),
    };

    emailjs.send('service_ywo0qcd', 'template_17dx3po', templateParams, 'xuIyODiDl5KVYjvlk')
      .then((response) => {
        console.log('SUCCESS!', response.status, response.text);
        // Aquí puedes agregar cualquier lógica adicional como notificaciones o redirección
      }, (err) => {
        console.log('FAILED...', err);
      });
  };

  return (
    <div className="mt-4 p-5  shadow-md rounded-md w-full">
      <h3 className="text-xl font-bold">Llena tus datos y pagas cuando recibas </h3>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Nombre</label>
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleInputChange}
            className="mt-1 p-3 border border-gray-300 rounded-md w-full"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Apellido</label>
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleInputChange}
            className="mt-1 p-3 border border-gray-300 rounded-md w-full"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Correo (Opcional)</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            className="mt-1 p-3 border border-gray-300 rounded-md w-full"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Célular</label>
          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
            className="mt-1 p-3 border border-gray-300 rounded-md w-full"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Dirección de entrega (Incluye torre, apto, barrio, etc)</label>
          <textarea
            name="address"
            value={formData.address}
            onChange={handleInputChange}
            className="mt-1 p-2 border border-gray-300 rounded-md w-full"
            required
          />
        </div>
        <Button
          type="submit"
          variant= "secondary">
        
          Enviar
        </Button>
      </form>
    </div>
  );
};

export default ContactForm;