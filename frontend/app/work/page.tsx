import Image from "next/image";
import Link from "next/link";
import fs from "fs";
import path from "path";

// Function to get folders inside public/images
function getWorkCategories() {
  const imagesDir = path.join(process.cwd(), "public/images");
  if (!fs.existsSync(imagesDir)) return [];

  const folders = fs.readdirSync(imagesDir, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory())
    .map(dirent => dirent.name);

  // For each folder, find the first file to use as a cover image
  const categories = folders.map(folderName => {
    const folderPath = path.join(imagesDir, folderName);
    const files = fs.readdirSync(folderPath);
    // Find first image-like file natively
    const coverFile = files.find(file => /\.(jpeg|jpg|png|gif|webp)$/i.test(file));
    
    return {
      title: folderName,
      slug: encodeURIComponent(folderName),
      coverImage: coverFile ? `/images/${folderName}/${coverFile}` : null
    };
  });

  return categories;
}

export default function WorkPage() {
  const categories = getWorkCategories();

  return (
    <main className="px-6 py-32 max-w-7xl mx-auto">
      {/* HEADER */}
      <div className="max-w-2xl mb-24">
        <h1 className="font-[var(--font-serif)] text-5xl md:text-6xl mb-6">
          Selected Work
        </h1>
        <p className="text-sm leading-relaxed opacity-80">
          A curated selection of works spanning various personalised and hand-crafted techniques.
          Select a category to explore our portfolio.
        </p>
      </div>

      {/* GRID */}
      <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-3">
        {categories.map((category) => (
          <Link href={`/work/${category.slug}`} key={category.title} className="group relative aspect-[4/5] overflow-hidden rounded-xl bg-[var(--color-blush)] border border-[var(--color-rose)] block">
            {/* IMAGE */}
            {category.coverImage ? (
              <Image
                src={category.coverImage}
                alt={category.title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
            ) : (
                <div className="w-full h-full flex flex-col justify-center items-center opacity-30">
                  <span className="text-4xl">📸</span>
                  <span className="text-xs mt-2 uppercase tracking-widest">No preview</span>
                </div>
            )}

            {/* OVERLAY */}
            <div className="absolute inset-0 bg-[rgba(42,21,28,0.55)] opacity-0 group-hover:opacity-100 transition duration-500" />

            {/* TEXT */}
            <div className="absolute bottom-6 left-6 right-6 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
              <p className="font-[var(--font-serif)] text-white text-xl">
                {category.title}
              </p>
            </div>
          </Link>
        ))}
        {categories.length === 0 && (
          <p className="opacity-50 italic">No galleries found currently.</p>
        )}
      </div>
    </main>
  );
}