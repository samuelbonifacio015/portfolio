import { Award, BarChart3, CalendarDays, GraduationCap, Sparkles, TrendingUp } from 'lucide-react';

const Education = () => {
  return (
    <section id="education" className="scroll-mt-28 px-5 py-16 md:px-6 md:py-24">
      <div className="mx-auto max-w-[var(--container-max)]">
        <header className="mb-10 max-w-2xl">
          <h2 className="text-3xl font-bold text-foreground sm:text-4xl">Educación</h2>
        </header>

        <article className="grid overflow-hidden rounded-[var(--radius-card)] bg-transparent md:grid-cols-[212px_minmax(0,1fr)]">
          <aside className="flex flex-col items-center gap-6 bg-transparent p-4">
            <img
              src="/education/upc-logo.png"
              alt="Logo de la Universidad Peruana de Ciencias Aplicadas"
              width={128}
              height={128}
              className="h-48 w-48 object-contain"
              loading="lazy"
              decoding="async"
            />

            <div className="flex flex-wrap justify-center gap-2 md:flex-col md:items-center">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-sky-100 px-3 py-1.5 text-xs font-medium text-primary dark:bg-sky-950/40">
                <CalendarDays className="h-3.5 w-3.5 text-sky-500" aria-hidden="true" />
                2023 — Actualidad
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-sky-100 px-3 py-1.5 text-xs font-medium text-primary dark:bg-sky-950/40">
                <Award className="h-3.5 w-3.5 text-sky-500" aria-hidden="true" />
                Tercio superior
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-sky-100 px-3 py-1.5 text-xs font-medium text-primary dark:bg-sky-950/40">
                <BarChart3 className="h-3.5 w-3.5 text-sky-500" aria-hidden="true" />
                Acumulado&nbsp;<strong className="tabular-nums">15.72</strong>
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-sky-100 px-3 py-1.5 text-xs font-medium text-primary dark:bg-sky-950/40">
                <TrendingUp className="h-3.5 w-3.5 text-sky-500" aria-hidden="true" />
                Último promedio&nbsp;<strong className="tabular-nums">17.3</strong>
              </span>
            </div>
          </aside>

          <div className="p-6 sm:p-8 md:py-10 md:pl-4 md:pr-10">
            <div className="flex items-start gap-3">
              <GraduationCap className="mt-1 h-5 w-5 shrink-0 text-sky-500" aria-hidden="true" />
              <div>
                <h3 className="text-xl font-bold leading-tight text-primary sm:text-2xl">
                  Universidad Peruana de Ciencias Aplicadas
                </h3>
                <p className="mt-2 text-base font-medium text-foreground sm:text-lg">
                  Ingeniería de Software
                </p>
              </div>
            </div>

            <div className="mt-8 space-y-5 pt-6">
              <div className="flex items-start gap-3">
                <Sparkles className="mt-0.5 h-5 w-5 shrink-0 text-sky-500" aria-hidden="true" />
                <div>
                  <h4 className="font-medium text-foreground">Estudiante de tercer año</h4>
                  <p className="mt-1 text-sm leading-6 text-foreground">
                    Durante la carrera he desarrollado proyectos web y aplicaciones móviles mientras sigo fortaleciendo mis bases técnicas.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Award className="mt-0.5 h-5 w-5 shrink-0 text-sky-500" aria-hidden="true" />
                <div>
                  <h4 className="font-medium text-foreground">Tercio superior</h4>
                  <p className="mt-1 text-sm leading-6 text-foreground">
                    El tercio superior y el quinto superior han sido los mayores reconocimientos de mi carrera. Estos reflejan la constancia que he mantenido en mis proyectos.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <CalendarDays className="mt-0.5 h-5 w-5 shrink-0 text-sky-500" aria-hidden="true" />
                <div>
                  <h4 className="font-medium text-foreground">Periodo académico</h4>
                  <p className="mt-1 text-sm leading-6 text-foreground">2023 — Actualidad</p>
                </div>
              </div>
            </div>
          </div>
        </article>
      </div>
    </section>
  );
};

export default Education;
