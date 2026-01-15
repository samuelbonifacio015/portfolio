/**
 * Currently Component
 * To show what I'm currently working on
 */

export default function Currently() {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  return (
    <section className="max-w-2xl mx-auto my-12 px-4">
      <div className="glass-card rounded-2xl p-8 shadow-xl">
        <h2 className="text-3xl font-bold mb-6 text-primary">Actualmente estoy...</h2>
        <ul className="text-foreground text-lg">
          <li>
            <span className="font-semibold text-muted-foreground">Estudiando en:</span>{" "}
            <button
              onClick={() => scrollToSection("#")}
              className="text-primary hover:underline font-medium transition-colors"
            >
              Universidad Peruana de Ciencias Aplicadas
            </button>
          </li>
          <li>
            <span className="font-semibold text-muted-foreground">Construyendo:</span>{" "}
            <a
              href="https://github.com/WeTechStudio"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline font-medium transition-colors"
            >
              WeTech
            </a>
          </li>
          <li>
            <span className="font-semibold text-muted-foreground">Aprendiendo:</span>{" "}
            <a
              href="https://nextjs.org"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline font-medium transition-colors"
            >
              Next.js
            </a>
          </li>

          <li>
            <span className="font-semibold text-muted-foreground">Usando:</span>{" "}
            <a
              href="https://archlinux.org"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline font-medium transition-colors"
            >
              Arch Linux
            </a>
          </li>

          <li>
            <span className="font-semibold text-muted-foreground">Escribiendo:</span>{" "}
            <a
              href="/blog"
              className="text-primary hover:underline font-medium transition-colors"
            >
              Visita mi blog :)
            </a>
          </li>
        </ul>
      </div>
    </section>
  );
}