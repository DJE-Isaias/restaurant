import Link from "next/link";
import "./globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="flex flex-col min-h-screen">
        <header className="bg-primary text-white">
          <nav className="container mx-auto flex justify-between items-center py-4 px-6">
            <h1 className="text-2xl font-bold">Restaurante</h1>
            <ul className="flex space-x-6">
              <li>
                <Link href="/" className="hover:text-secondary">
                  Inicio
                </Link>
              </li>
              <li>
                <Link href="/gallery" className="hover:text-secondary">
                  Galería
                </Link>
              </li>
              <li>
                <Link href="/menu" className="hover:text-secondary">
                  Menú
                </Link>
              </li>
              <li>
                <Link href="/cart" className="hover:text-secondary">
                  Carrito
                </Link>
              </li>
              <li>
                <Link href="/blog" className="hover:text-secondary">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-secondary">
                  Contacto
                </Link>
              </li>
            </ul>
          </nav>
        </header>
        <main className="container mx-auto py-8 flex-grow">{children}</main>
        <footer className="bg-secondary text-white text-center py-4">
          © {new Date().getFullYear()} Restaurante - Todos los derechos
          reservados.
        </footer>
      </body>
    </html>
  );
}
