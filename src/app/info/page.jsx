import React from 'react';

const InfoPage = () => {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Cómo Navegar y Hacer Pedidos en Xcosas</h1>
      
      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Inicio (Home)</h2>
        <p>
          En nuestra página de inicio, podrás ver una selección de nuestros productos exclusivos. Estos artículos son seleccionados cuidadosamente para ofrecerte lo mejor y lo más difícil de encontrar en Colombia.
        </p>
        <p>
          Explora la variedad de productos disponibles y encuentra lo que necesitas. Cada producto tiene una imagen, un nombre y un precio para facilitar tu experiencia de compra.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Carrito de Compras (Cart)</h2>
        <p>
          En el carrito de compras, podrás ver todos los productos que has agregado. Aquí, tienes la opción de revisar los artículos seleccionados, eliminar aquellos que ya no desees comprar, y ver el total de tu pedido.
        </p>
        <p>
          Una vez que estés listo para realizar tu pedido, simplemente sigue las instrucciones para completar tu compra.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Redes Sociales</h2>
        <p>
          En la parte superior de nuestra página, encontrarás enlaces a nuestras redes sociales. Síguenos en <a href="https://www.instagram.com/your-instagram" target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">Instagram</a> y <a href="https://www.facebook.com/your-facebook" target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">Facebook</a> para mantenerte al día con las últimas novedades y ofertas exclusivas.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Nuestro Enfoque</h2>
        <p>
          En Xcosas, nos especializamos en ofrecer productos exclusivos y difíciles de encontrar en Colombia. Nos enorgullecemos de la calidad y singularidad de nuestros artículos, y estamos comprometidos a brindarte la mejor experiencia de compra posible.
        </p>
      </section>
    </div>
  );
};

export default InfoPage;
