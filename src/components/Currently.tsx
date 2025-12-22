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
        <ul className="text-white/90 text-lg">
          <li>
            <span className="font-semibold text-white/80">Estudiando en:</span>{" "}
            <button
              onClick={() => scrollToSection("#")}
              className="text-primary hover:underline font-medium transition-colors"
            >
              Universidad Peruana de Ciencias Aplicadas
            </button>
          </li>
          <li>
            <span className="font-semibold text-white/80">Construyendo:</span>{" "}
            <button
              onClick={() => scrollToSection("projects")}
              className="text-primary hover:underline font-medium transition-colors"
            >
              WeRide
            </button>
          </li>
        </ul>
      </div>
    </section>
  );
}