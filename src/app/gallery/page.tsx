"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

export default function GalleryPage() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [images, setImages] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchImages() {
      try {
        const res = await fetch("/api/images");
        console.log('res', res);
        const data = await res.json();
        if (res.ok) {
          setImages(data);
        } else {
          setError(data.error || "Error fetching images");
        }
      } catch (err) {
        setError("An unexpected error occurred: " + err);
      } finally {
        setLoading(false);
      }
    }

    fetchImages();
  }, []);

  if (loading) return <p>Cargando imágenes...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {images.map((image) => (
        <div key={image.id} className="relative">
          <Image
            width={200}
            height={200}
            src={image.urls.regular}
            alt={image.alt_description || "Restaurant Image"}
            className="w-full h-full object-cover rounded-lg"
          />
        </div>
      ))}
    </section>
  );
}
