'use client';

import { ToastContainer, toast, } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
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
        toast.success('Mensaje enviado con éxito!',);// Actualiza el estado del mensaje de confirmación
        setFormData({ // Limpia el formulario
          firstName: '',
          lastName: '',
          email: '',
          phone: '',
          address: '',
        });
      }, (err) => {
        console.log('FAILED...', err);
        toast.error('Error al enviar el mensaje, inténtalo de nuevo.');
      });
  };

  return (
    <div className="mt-4 p-5 shadow-md  rounded-md w-full">
      <h3 className="text-xl font-bold">Llena tus datos y pagas cuando recibas</h3>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
        <label htmlFor="username" className="text-slate-500 mb-2 block">Nombre</label>
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleInputChange}
            className="p-3 rounded block mb-2 bg-slate-900 text-slate-300 w-full"
            required
          />
        </div>
        <div className="mb-4">
        <label htmlFor="username" className="text-slate-500 mb-2 block">Apellido</label>
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleInputChange}
            className="p-3 rounded block mb-2 bg-slate-900 text-slate-300 w-full"
            required
          />
        </div>
        <div className="mb-4">
        <label htmlFor="username" className="text-slate-500 mb-2 block">Correo (Opcional)</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            className="p-3 rounded block mb-2 bg-slate-900 text-slate-300 w-full"
          />
        </div>
        <div className="mb-4">
        <label htmlFor="username" className="text-slate-500 mb-2 block">Célular</label>
          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
             className="p-3 rounded block mb-2 bg-slate-900 text-slate-300 w-full"
            required
          />
        </div>
        <div className="mb-4">
        <label htmlFor="username" className="text-slate-500 mb-2 block">Dirección de entrega ( Ciudad, Incluye torre, apto, barrio, etc)</label>
          <textarea
            name="address"
            value={formData.address}
            onChange={handleInputChange}
             className="p-3 rounded block mb-2 bg-slate-900 text-slate-300 w-full"
            required
          />
        </div>
        <Button
          type="submit"
          variant="secondary"
        >
          Enviar
        </Button>
      </form>
      <ToastContainer position="top-left"/>

    </div>
  );
};

export default ContactForm;