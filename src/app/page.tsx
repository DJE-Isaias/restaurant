export default function HomePage() {
  return (
    <section className="text-center py-16">
      <h1 className="text-4xl font-bold mb-4">
        Bienvenidos a Nuestro Restaurante
      </h1>
      <p className="text-lg mb-8">
        Disfruta de los mejores platos en un ambiente agradable. Explora nuestro
        menú, galería y más.
      </p>
      <a
        href="/menu"
        className="bg-primary text-white px-6 py-3 rounded-lg hover:bg-secondary"
      >
        Ver Menú
      </a>
    </section>
  );
}
