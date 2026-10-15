export const Hero = ({ movie }) => {
    
  
    return (
      <section className="relative overflow-hidden bg-surface">
        {/* Imagen de fondo */}
        <img
          src="/backdrops/images.jpeg"
          alt=""
          className="absolute inset-0 h-full w-full object-cover object-center"
        />
  
        {/* Degradado para mejorar la legibilidad */}
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/90 to-transparent" />
  
        {/* Contenido */}
        <div className="relative mx-auto flex min-h-[420px] max-w-7xl items-center px-6 py-20">
          <div className="max-w-2xl">
            <span className="mb-4 inline-block rounded-full bg-accent/15 px-4 py-1 text-sm font-medium text-accent">
              Destacado
            </span>
  
            <h1 className="mb-5 text-4xl font-bold tracking-tight sm:text-6xl">
              {movie?.name || "Series y peliculas..."}
            </h1>
  
            <p className="mb-6 line-clamp-3 text-lg leading-relaxed text-gray-300">
            {movie?.synopsis || "Explora nuestro catálogo de películas y series."}
            </p>
  
            <a
              href="#catalogo"
              className="inline-flex rounded-lg bg-accent px-6 py-3 font-semibold text-background transition hover:brightness-110"
            >
              Explorar catálogo
            </a>
          </div>
        </div>
      </section>
    );
  };