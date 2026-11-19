const board = document.querySelector('.board');
const moduleControls = [...document.querySelectorAll('.module, .rack, .skills-shelf')];
const navLinks = [...document.querySelectorAll('.navbar a')];
const sections = [...document.querySelectorAll('[data-content-section]')];
const projectDialog = document.querySelector('#project-dialog');
const dialogContent = document.querySelector('#dialog-content');

// Hover and focus light a single board module; pointer exit restores the idle core.
function activateModule(element) {
  board.classList.add('has-active');
  moduleControls.forEach(control => control.classList.remove('is-active'));
  element.classList.add('is-active');
}
function resetBoard() {
  board.classList.remove('has-active');
  moduleControls.forEach(control => control.classList.remove('is-active'));
}
moduleControls.forEach(element => {
  element.addEventListener('pointerenter', () => activateModule(element));
  element.addEventListener('pointerleave', resetBoard);
  element.addEventListener('focus', () => activateModule(element));
  element.addEventListener('blur', resetBoard);
  element.addEventListener('click', () => {
    const section = element.dataset.module;
    const project = element.dataset.project;
    if (section) document.getElementById(section)?.scrollIntoView({behavior:'smooth'});
    if (project) openProject(project);
  });
});

// Navbar links and visual modules lead to the same sections.
navLinks.forEach(link => link.addEventListener('click', () => {
  navLinks.forEach(item => item.classList.remove('active'));
  link.classList.add('active');
  document.querySelector('.navbar').classList.remove('open');
  document.querySelector('.nav-toggle').setAttribute('aria-expanded','false');
}));
const navToggle = document.querySelector('.nav-toggle');
navToggle.addEventListener('click', () => {
  const isOpen = document.querySelector('.navbar').classList.toggle('open');
  navToggle.setAttribute('aria-expanded', String(isOpen));
});

// Update the navbar highlight as the visitor scrolls through the page.
if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const id = entry.target.id;
      navLinks.forEach(link => link.classList.toggle('active', link.dataset.section === id));
    });
  }, {rootMargin:'-25% 0px -60% 0px',threshold:0});
  sections.forEach(section => observer.observe(section));
}


const projectDetails = {
  hakashoes: {
    name:'HakaShoes', kicker:'PROYECTO COLABORATIVO · HACKATHON',
    summary:'Landing de una tienda de calzado desarrollada en equipo. Mi contribución se centró en la barra de navegación y el carrito de compras.',
    contribution:'Implementación de la navbar y participación en el carrito: interacción con productos, cantidades, eliminación de artículos, vaciado, subtotal y cálculo de envío según las reglas del ejercicio.',
    tags:['HTML','CSS','JavaScript','Bootstrap 5','DOM','Git','GitHub'],
    caution:'Esta ficha describe la participación conocida. Se debe contrastar con los archivos finales del equipo antes de añadir capturas o enlaces públicos.'
  },
  era: {
    name:'Era', kicker:'LABORATORIO INTERACTIVO · JAVASCRIPT',
    summary:'Proyecto de práctica para explorar y comprender conceptos de programación a través de ejercicios y ejemplos interactivos.',
    contribution:'Se trabajó en una propuesta de laboratorio orientado a practicar conceptos como clases, objetos, constructor, this, propiedades y métodos. La ficha final se ajustará al repositorio para distinguir con precisión lo implementado de lo planeado.',
    tags:['JavaScript','HTML','CSS','Git','GitHub'],
    caution:'El repositorio y las evidencias deben verificarse antes de presentar funcionalidades específicas como terminadas.'
  },
  bipbip: {
    name:'Bip Bip Papel', kicker:'DISEÑO DE PRODUCTO DIGITAL · FIGMA',
    summary:'Concepto de tienda de regalos y papelería con una experiencia de personalización de productos.',
    contribution:'Diseño de interfaces y flujos de la experiencia de compra, incluyendo la pantalla de creación de regalos y la selección de productos, envoltura y mensaje, según las pantallas aprobadas.',
    tags:['Figma','Diseño UI','UX','Prototipado'],
    caution:'La ficha corresponde al trabajo de diseño conocido; no se atribuye desarrollo de código sin comprobar un repositorio.'
  }
};
function openProject(key) {
  const project = projectDetails[key];
  if (!project) return;
  dialogContent.innerHTML = `<div class="dialog-content"><p class="dialog-kicker">${project.kicker}</p><h2>${project.name}</h2><p>${project.summary}</p><h3>Mi contribución</h3><p>${project.contribution}</p><div class="dialog-tags">${project.tags.map(tag=>`<span>${tag}</span>`).join('')}</div><p class="dialog-caveat">${project.caution}</p></div>`;
  projectDialog.showModal();
}
document.querySelectorAll('[data-open-project]').forEach(button => button.addEventListener('click', () => openProject(button.dataset.openProject)));
document.querySelector('.dialog-close').addEventListener('click', () => projectDialog.close());
projectDialog.addEventListener('click', event => { if (event.target === projectDialog) projectDialog.close(); });
