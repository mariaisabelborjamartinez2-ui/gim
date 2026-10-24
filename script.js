/* =====================================
   FITZONE GIMNASIO - JAVASCRIPT
===================================== */

// MENÚ PARA CELULARES

const menuToggle = document.getElementById("menuToggle");
const nav = document.getElementById("nav");

menuToggle.addEventListener("click", () => {
  const isOpen = nav.classList.toggle("open");

  menuToggle.setAttribute("aria-expanded", String(isOpen));
  menuToggle.setAttribute(
    "aria-label",
    isOpen ? "Cerrar menú" : "Abrir menú"
  );
  menuToggle.textContent = isOpen ? "✕" : "☰";
});

// CERRAR MENÚ AL ELEGIR UNA SECCIÓN

nav.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    nav.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Abrir menú");
    menuToggle.textContent = "☰";
  });
});

// CALCULADORA DE IMC

const imcForm = document.getElementById("imcForm");
const pesoInput = document.getElementById("peso");
const estaturaInput = document.getElementById("estatura");
const formMessage = document.getElementById("formMessage");
const imcResult = document.getElementById("imcResult");

imcForm.addEventListener("submit", (event) => {
  event.preventDefault();

  formMessage.textContent = "";
  imcResult.className = "imc-result";

  const peso = Number(pesoInput.value);
  const estaturaCm = Number(estaturaInput.value);

  // VALIDACIÓN DE CAMPOS VACÍOS

  if (pesoInput.value.trim() === "" ||
      estaturaInput.value.trim() === "") {
    mostrarError("Por favor, completa tu peso y estatura.");
    return;
  }

  // VALIDACIÓN DE NÚMEROS

  if (!Number.isFinite(peso) || !Number.isFinite(estaturaCm)) {
    mostrarError("Introduce valores numéricos válidos.");
    return;
  }

  // VALIDACIÓN DE RANGOS RAZONABLES PARA EL FORMULARIO

  if (peso < 1 || peso > 500) {
    mostrarError("El peso debe estar entre 1 y 500 kg.");
    pesoInput.focus();
    return;
  }

  if (estaturaCm < 50 || estaturaCm > 250) {
    mostrarError("La estatura debe estar entre 50 y 250 cm.");
    estaturaInput.focus();
    return;
  }

  // CONVERTIR CENTÍMETROS A METROS

  const estaturaM = estaturaCm / 100;

  // FÓRMULA: PESO / ESTATURA AL CUADRADO

  const imc = peso / (estaturaM * estaturaM);
  const imcRedondeado = imc.toFixed(1);

  let clasificacion = "";
  let mensaje = "";
  let claseResultado = "";

  if (imc < 18.5) {
    clasificacion = "Bajo peso";
    mensaje = "Considera consultar a un profesional de salud.";
    claseResultado = "result-low";
  } else if (imc < 25) {
    clasificacion = "Peso normal";
    mensaje = "Continúa cuidando tus hábitos de bienestar.";
    claseResultado = "result-normal";
  } else if (imc < 30) {
    clasificacion = "Sobrepeso";
    mensaje = "Una orientación profesional puede ayudarte.";
    claseResultado = "result-over";
  } else {
    clasificacion = "Obesidad";
    mensaje = "Consulta a un profesional para una evaluación individual.";
    claseResultado = "result-high";
  }

  // MOSTRAR RESULTADO

  imcResult.className = "imc-result " + claseResultado;

  imcResult.innerHTML = `
    <span class="result-icon" aria-hidden="true">✓</span>
    <div>
      <span class="result-label">TU RESULTADO</span>
      <h3>IMC: ${imcRedondeado}</h3>
      <p><strong>${clasificacion}</strong></p>
      <p>${mensaje}</p>
    </div>
  `;
});

function mostrarError(mensaje) {
  formMessage.textContent = mensaje;
}

// LIMPIAR LA CALCULADORA

imcForm.addEventListener("reset", () => {
  formMessage.textContent = "";

  imcResult.className = "imc-result";
  imcResult.innerHTML = `
    <span class="result-icon" aria-hidden="true">◎</span>
    <div>
      <span class="result-label">TU RESULTADO</span>
      <h3>Esperando tus datos</h3>
      <p>Completa el formulario para ver tu resultado.</p>
    </div>
  `;
});

// CARRUSEL DE TESTIMONIOS

const testimonios = [
  {
    avatar: "👩🏻",
    nombre: "Laura Gómez",
    plan: "Socia Premium",
    comentario:
      "Desde que empecé a entrenar me siento con más energía y confianza."
  },
  {
    avatar: "👨🏽",
    nombre: "Carlos Ramírez",
    plan: "Socio VIP",
    comentario:
      "Me gusta la variedad de clases y la motivación que encuentro en cada entrenamiento."
  },
  {
    avatar: "👩🏽",
    nombre: "Valentina Torres",
    plan: "Socia Básico",
    comentario:
      "Comencé poco a poco y ahora entrenar forma parte de mi rutina semanal."
  },
  {
    avatar: "👨🏻",
    nombre: "Andrés Martínez",
    plan: "Socio Premium",
    comentario:
      "Las clases funcionales son divertidas y me ayudan a mantenerme activo."
  },
  {
    avatar: "👩🏼",
    nombre: "Daniela Pérez",
    plan: "Socia VIP",
    comentario:
      "Disfruto mi tiempo de entrenamiento y tener objetivos claros para mejorar."
  }
];

let indiceTestimonio = 0;

const testimonialAvatar = document.getElementById("testimonialAvatar");
const testimonialQuote = document.getElementById("testimonialQuote");
const testimonialName = document.getElementById("testimonialName");
const testimonialPlan = document.getElementById("testimonialPlan");
const carouselDots = document.getElementById("carouselDots");

function mostrarTestimonio(indice) {
  indiceTestimonio =
    (indice + testimonios.length) % testimonios.length;

  const testimonio = testimonios[indiceTestimonio];

  testimonialAvatar.textContent = testimonio.avatar;
  testimonialQuote.textContent = "“" + testimonio.comentario + "”";
  testimonialName.textContent = testimonio.nombre;
  testimonialPlan.textContent = testimonio.plan;

  // ACTUALIZAR LOS INDICADORES DEL CARRUSEL

  carouselDots.querySelectorAll("button").forEach((dot, i) => {
    const activo = i === indiceTestimonio;
    dot.classList.toggle("active", activo);
    dot.setAttribute("aria-current", activo ? "true" : "false");
    dot.setAttribute(
      "aria-label",
      "Mostrar testimonio " + (i + 1)
    );
  });
}

// CREAR UN PUNTO POR TESTIMONIO

testimonios.forEach((_, indice) => {
  const dot = document.createElement("button");

  dot.type = "button";
  dot.className = "carousel-dot";
  dot.addEventListener("click", () => {
    mostrarTestimonio(indice);
  });

  carouselDots.appendChild(dot);
});

// BOTONES ANTERIOR Y SIGUIENTE

document.getElementById("prevTestimonial")
  .addEventListener("click", () => {
    mostrarTestimonio(indiceTestimonio - 1);
  });

document.getElementById("nextTestimonial")
  .addEventListener("click", () => {
    mostrarTestimonio(indiceTestimonio + 1);
  });

mostrarTestimonio(0);

// SELECCIONAR UN PLAN

document.querySelectorAll("[data-plan]").forEach((boton) => {
  boton.addEventListener("click", () => {
    const plan = boton.dataset.plan;

    const mensaje =
      "Hola, quiero información sobre la membresía " +
      plan + " de FitZone.";

    // El usuario puede enviar el mensaje desde WhatsApp.
    // No se envía ningún mensaje automáticamente.

    const enlaceWhatsApp =
      "https://wa.me/573126020219?text=" +
      encodeURIComponent(mensaje);

    boton.href = enlaceWhatsApp;
    boton.target = "_blank";
    boton.rel = "noopener noreferrer";
  });
});

// BOTÓN VOLVER ARRIBA

const backToTop = document.getElementById("backToTop");

window.addEventListener("scroll", () => {
  backToTop.classList.toggle("visible", window.scrollY > 350);
});

backToTop.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
});

// AÑO AUTOMÁTICO EN EL PIE DE PÁGINA

document.getElementById("currentYear").textContent =
  new Date().getFullYear();