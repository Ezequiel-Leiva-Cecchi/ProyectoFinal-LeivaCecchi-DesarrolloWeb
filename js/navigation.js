// Marca el documento para que el CSS oculte el menú móvil únicamente cuando
// JavaScript está activo. Sin JavaScript, los enlaces siguen siendo visibles.
document.documentElement.classList.add("js");

// Reúne cada botón con la navegación indicada en aria-controls. Aunque hoy hay
// un solo encabezado por página, este enfoque permite reutilizar el componente.
document.querySelectorAll(".nav-toggle").forEach((toggle) => {
  const navigationId = toggle.getAttribute("aria-controls");
  const navigation = document.getElementById(navigationId);
  const label = toggle.querySelector(".nav-toggle__label");

  // Si el HTML estuviera incompleto, se abandona este componente sin romper
  // el resto de la página.
  if (!navigation || !label) return;

  // Centraliza el estado visual y los atributos que leen las tecnologías de
  // asistencia para que nunca queden desincronizados.
  const setMenuState = (isOpen) => {
    toggle.setAttribute("aria-expanded", String(isOpen));
    navigation.dataset.open = String(isOpen);
    label.textContent = isOpen ? "Cerrar" : "Menú";
    document.body.classList.toggle("menu-open", isOpen);
  };

  // Alterna el menú cuando se presiona el botón del encabezado.
  toggle.addEventListener("click", () => {
    const isOpen = toggle.getAttribute("aria-expanded") === "true";
    setMenuState(!isOpen);
  });

  // Después de elegir una página se cierra el panel, algo especialmente útil
  // para enlaces internos como los de la portada.
  navigation.addEventListener("click", (event) => {
    if (event.target.closest("a")) setMenuState(false);
  });

  // Escape ofrece una salida rápida para teclado y devuelve el foco al botón.
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && toggle.getAttribute("aria-expanded") === "true") {
      setMenuState(false);
      toggle.focus();
    }
  });

  // Al volver al diseño de escritorio se limpia cualquier estado abierto que
  // haya quedado del tamaño móvil anterior.
  const desktopQuery = window.matchMedia("(min-width: 62.01rem)");
  desktopQuery.addEventListener("change", (event) => {
    if (event.matches) setMenuState(false);
  });

  // Define un estado inicial explícito para evitar diferencias entre páginas.
  setMenuState(false);
});
