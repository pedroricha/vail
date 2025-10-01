// marca que o JS está ativo (para o fallback do CSS)
document.documentElement.classList.add('js');


// Mobile menu
const toggle = document.querySelector('.nav__toggle');
const menu = document.querySelector('#menu');
if (toggle && menu){
  toggle.addEventListener('click', () => {
    const open = menu.classList.toggle('is-open');
    toggle.setAttribute('aria-expanded', String(open));
  });
}

// Footer year
document.getElementById('year').textContent = new Date().getFullYear();

// LGPD modal
const privacyBtn = document.getElementById('openPrivacy');
const privacyModal = document.getElementById('privacyModal');
if (privacyBtn && privacyModal) {
  privacyBtn.addEventListener('click', (e) => {
    e.preventDefault();
    privacyModal.showModal();
  });
}

// Reveal on scroll — robusto (dispara também no load)
const revealEls = document.querySelectorAll('.fx-reveal');

function revealNow(el){
  el.classList.add('is-in');
}

function isInViewport(el, offset = 0.12){
  const r = el.getBoundingClientRect();
  const vh = window.innerHeight || document.documentElement.clientHeight;
  return r.top <= vh * (1 - offset);
}

if ('IntersectionObserver' in window){
  const io = new IntersectionObserver((entries)=>{
    entries.forEach(e => { if (e.isIntersecting) revealNow(e.target); });
  }, { root: null, rootMargin: "0px 0px -10% 0px", threshold: 0.01 });

  revealEls.forEach(el => io.observe(el));

  // já revela o que está na dobra ao carregar
  requestAnimationFrame(() => {
    revealEls.forEach(el => { if (isInViewport(el)) revealNow(el); });
  });
} else {
  // fallback: sem IO, mostra tudo
  revealEls.forEach(revealNow);
}


// Form (demo) — usa mailto; pode trocar por endpoint (Formspree/Node/FastAPI)
const form = document.getElementById('contactForm');
const statusEl = document.getElementById('formStatus');
function validEmail(v){return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);}
if (form){
  form.addEventListener('submit', (e)=>{
    e.preventDefault();
    const nome = document.getElementById('nome').value.trim();
    const email = document.getElementById('email').value.trim();
    const empresa = document.getElementById('empresa').value.trim();
    const mensagem = document.getElementById('mensagem').value.trim();
    const lgpd = document.getElementById('lgpd').checked;

    if(!nome || !validEmail(email) || !empresa || !lgpd){
      statusEl.textContent = "Preencha os campos obrigatórios.";
      return;
    }

    // === Troque por sua API se quiser ===
    const subject = encodeURIComponent('Orçamento - VAIL Consultoria');
    const body = encodeURIComponent(`Nome: ${nome}\nE-mail: ${email}\nEmpresa: ${empresa}\nMensagem: ${mensagem}`);
    window.location.href = `mailto:contato@vailconsultoria.com.br?subject=${subject}&body=${body}`;
    statusEl.textContent = "Enviado! Responderemos em breve.";
    form.reset();
  });
}
