import { Film, Search, Clapperboard, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const features = [
  {
    icon: Film,
    title: "Películas y series",
    description:
      "Explora un catálogo de películas y series de diferentes géneros.",
  },
  {
    icon: Search,
    title: "Búsqueda y filtros",
    description:
      "Encuentra títulos por nombre, tipo de contenido o género.",
  },
  {
    icon: Clapperboard,
    title: "Información detallada",
    description:
      "Consulta la sinopsis, el año de estreno y los géneros de cada título.",
  },
];

export const ExploreSections = () => {
  return (
    <>
      {/* Sección destacada */}
      <section className="grid md:grid-cols-2">
        <div className="flex flex-col justify-center bg-surface px-6 py-16 sm:px-12 lg:px-20">
          <span className="text-sm font-semibold tracking-widest text-accent">
            MÁS POR DESCUBRIR
          </span>

          <h2 className="mt-4 max-w-xl text-3xl font-bold leading-tight text-white sm:text-4xl">
            Cada historia comienza con un descubrimiento.
          </h2>

          <p className="mt-5 max-w-lg leading-7 text-muted">
            Desde grandes aventuras hasta historias llenas de
            misterio. Encuentra películas y series que despierten
            tu curiosidad.
          </p>

          <Link
            to="/#catalogo"
            className="mt-8 inline-flex w-fit items-center gap-2 rounded-lg bg-accent px-5 py-3 font-semibold text-background transition hover:opacity-90"
          >
            Explorar catálogo
            <ArrowRight size={18} />
          </Link>
        </div>

        {/* Composición visual */}
        <div className="relative flex min-h-64 items-center justify-center overflow-hidden bg-accent px-8 py-16 md:min-h-96">
          <div className="absolute -right-16 -top-16 h-64 w-64 rounded-full border border-background/15" />

          <div className="absolute -bottom-24 -left-16 h-80 w-80 rounded-full border border-background/15" />

          <div className="relative flex h-44 w-44 rotate-[-12deg] items-center justify-center rounded-3xl bg-background shadow-2xl sm:h-56 sm:w-56">
            <Clapperboard
              className="text-accent"
              size={90}
              strokeWidth={1.4}
            />
          </div>
        </div>
      </section>

      {/* Características del catálogo */}
      <section className="mx-auto max-w-7xl px-6 py-20">
        <div className="mb-10 text-center">
          <span className="text-sm font-semibold tracking-widest text-accent">
            CINEMA CATALOG
          </span>

          <h2 className="mt-3 text-3xl font-bold text-white">
            Explora a tu manera
          </h2>

          <p className="mx-auto mt-3 max-w-xl text-muted">
            Una forma sencilla de descubrir y consultar
            información sobre películas y series.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {features.map(({ icon: Icon, title, description }) => (
            <article
              key={title}
              className="rounded-xl border border-white/10 bg-surface p-8 text-center"
            >
              <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-accent/10">
                <Icon className="text-accent" size={28} />
              </div>

              <h3 className="text-lg font-semibold text-white">
                {title}
              </h3>

              <p className="mt-3 text-sm leading-6 text-muted">
                {description}
              </p>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}