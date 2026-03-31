export default function WorkshopsPage() {
  const workshops = [
    {
      title: "Calligraphy (All Age Groups)",
      description:
        "An introduction to calligraphy fundamentals, letterforms, and stroke techniques, suitable for children, teens, and adults.",
    },
    {
      title: "Quilling",
      description:
        "Learn the art of paper quilling through coils, shapes, and patterns to create decorative and expressive designs.",
    },
    {
      title: "Tote Bag Painting",
      description:
        "A hands-on session focused on painting and personalizing tote bags with illustrations, lettering, and creative motifs.",
    },
    {
      title: "Canvas Painting",
      description:
        "Explore color, composition, and brush techniques while creating artwork on canvas in a guided environment.",
    },
    {
      title: "Gothic Calligraphy",
      description:
        "A deep dive into traditional Gothic scripts, focusing on structure, spacing, and disciplined stroke practice.",
    },
    {
      title: "Pot Painting",
      description:
        "A relaxing and creative workshop centered on painting pots with patterns, textures, and personalized designs.",
    },
  ];

  return (
    <main className="px-6 py-32 max-w-4xl mx-auto">
      {/* HEADER */}
      <div className="max-w-2xl mb-20">
        <h1 className="font-[var(--font-serif)] text-5xl md:text-6xl mb-6">
          Workshops
        </h1>

        <p className="leading-loose opacity-80">
          Our workshops are designed to introduce and refine creative skills
          through hands-on learning. Open to beginners, enthusiasts, and
          practicing artists.
        </p>
      </div>

      {/* WORKSHOPS LIST */}
      <div className="space-y-10">
        {workshops.map((workshop) => (
          <div
            key={workshop.title}
            className="
              bg-[var(--color-blush)]
              border border-[var(--color-rose)]
              rounded-xl
              p-6
            "
          >
            <h2 className="text-xl font-medium mb-2">
              {workshop.title}
            </h2>

            <p className="text-sm leading-relaxed opacity-80">
              {workshop.description}
            </p>
          </div>
        ))}
      </div>

      {/* FOOTNOTE */}
      <p className="mt-16 text-sm opacity-70 max-w-xl">
        Workshops can be conducted as group sessions, private sessions, or
        customized programs for schools, studios, and corporate teams.
      </p>
    </main>
  );
}