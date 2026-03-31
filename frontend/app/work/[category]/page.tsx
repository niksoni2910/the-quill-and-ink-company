import fs from "fs";
import path from "path";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default async function CategoryPage({ params }: { params: Promise<{ category: string }> }) {
  const resolvedParams = await params;
  const decodedCategory = decodeURIComponent(resolvedParams.category);
  const imagesDir = path.join(process.cwd(), "public", "images", decodedCategory);
  
  // Try to find matching videos folder (e.g., "Customised Engraving Videos")
  const videosDir = path.join(process.cwd(), "public", "videos", `${decodedCategory} Videos`);

  let images: string[] = [];
  let videos: string[] = [];

  if (fs.existsSync(imagesDir)) {
    images = fs.readdirSync(imagesDir)
      .filter(file => /\.(jpeg|jpg|png|gif|webp)$/i.test(file))
      .map(file => `/images/${decodedCategory}/${file}`);
  }

  if (fs.existsSync(videosDir)) {
    videos = fs.readdirSync(videosDir)
      .filter(file => /\.(mp4|webm|ogg)$/i.test(file))
      .map(file => `/videos/${decodedCategory} Videos/${file}`);
  }

  const hasMedia = images.length > 0 || videos.length > 0;

  return (
    <main className="px-6 py-32 max-w-7xl mx-auto min-h-screen">
      <Link 
        href="/work" 
        className="inline-flex items-center gap-2 mb-12 text-sm uppercase tracking-widest opacity-60 hover:opacity-100 transition"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Galleries
      </Link>

      <div className="max-w-2xl mb-16">
        <h1 className="font-[var(--font-serif)] text-4xl md:text-5xl mb-4">
          {decodedCategory}
        </h1>
        <p className="text-sm leading-relaxed opacity-60">
          Viewing gallery for {decodedCategory}.
        </p>
      </div>

      {!hasMedia ? (
        <div className="py-20 text-center border border-dashed border-black/20 rounded-xl">
          <p className="opacity-50 italic">No images or videos found in this gallery.</p>
        </div>
      ) : (
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
          {videos.map((video, idx) => (
             <div key={`video-${idx}`} className="break-inside-avoid relative rounded-xl overflow-hidden bg-[var(--color-blush)] shadow-sm">
               <video 
                 src={video}
                 className="w-full h-auto"
                 autoPlay
                 loop
                 muted
                 playsInline
                 controls
               />
             </div>
          ))}

          {images.map((image, idx) => (
            <div key={`image-${idx}`} className="break-inside-avoid relative rounded-xl overflow-hidden bg-[var(--color-blush)] shadow-sm group">
              <Image
                src={image}
                alt={`${decodedCategory} - Image ${idx + 1}`}
                width={800}
                height={800} // Approximate height to layout correctly initially
                className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105"
                unoptimized // Useful for potentially large unoptimized local images
              />
            </div>
          ))}
        </div>
      )}
    </main>
  );
}
