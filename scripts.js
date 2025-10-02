// Marca que o JS está ativo
document.documentElement.classList.add('js');

/* -------------------------------
   Menu responsivo (toggle mobile)
-------------------------------- */
const toggleBtn = document.querySelector('.nav__toggle');
const menu = document.querySelector('#menu');

if (toggleBtn && menu) {
  toggleBtn.addEventListener('click', () => {
    const opened = menu.classList.toggle('is-open');
    toggleBtn.setAttribute('aria-expanded', String(opened));
  });
}

/* -------------------------------
   Ano automático no rodapé
-------------------------------- */
const yearEl = document.getElementById('year');
if (yearEl) {
  yearEl.textContent = new Date().getFullYear();
}

/* -------------------------------
   Modal de privacidade
-------------------------------- */
const privacyBtn = document.getElementById('openPrivacy');
const privacyModal = document.getElementById('privacyModal');

if (privacyBtn && privacyModal) {
  privacyBtn.addEventListener('click', e => {
    e.preventDefault();
    privacyModal.showModal();
  });
}

/* -------------------------------
   Efeito reveal (IntersectionObserver)
-------------------------------- */
const reveals = document.querySelectorAll('.fx-reveal');

function revealIn(el) {
  el.classList.add('is-in');
}

function inViewport(el, offset = 0.12) {
  const r = el.getBoundingClientRect();
  const vh = innerHeight || document.documentElement.clientHeight;
  return r.top <= vh * (1 - offset);
}

if ('IntersectionObserver' in window) {
  const io = new IntersectionObserver(
    entries => entries.forEach(e => { if (e.isIntersecting) revealIn(e.target); }),
    { root: null, rootMargin: '0px 0px -10% 0px', threshold: 0.01 }
  );
  reveals.forEach(el => io.observe(el));

  // Força revelar elementos já visíveis ao carregar
  requestAnimationFrame(() => {
    reveals.forEach(el => { if (inViewport(el)) revealIn(el); });
  });
} else {
  // Fallback
  reveals.forEach(revealIn);
}

/* -------------------------------
   Formulário de contato
-------------------------------- */
const form = document.getElementById('contactForm');
const statusEl = document.getElementById('formStatus');

function validEmail(v) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
}

if (form) {
  form.addEventListener('submit', e => {
    e.preventDefault();

    const nome = document.getElementById('nome').value.trim();
    const email = document.getElementById('email').value.trim();
    const empresa = document.getElementById('empresa').value.trim();
    const assunto = document.getElementById('assunto').value;
    const mensagem = document.getElementById('mensagem').value.trim();
    const okLgpd = document.getElementById('lgpd').checked;

    // Validações básicas
    if (!nome || !validEmail(email) || !empresa || !okLgpd) {
      if (statusEl) statusEl.textContent = 'Preencha os campos obrigatórios.';
      return;
    }

    // Monta subject e body para mailto
    const subject = encodeURIComponent(`Contato (${assunto}) - VAIL Consultoria`);
    const body = encodeURIComponent(
      `Nome: ${nome}\nE-mail: ${email}\nEmpresa: ${empresa}\nAssunto: ${assunto}\nMensagem: ${mensagem}`
    );

    // Dispara e-mail
    window.location.href = `mailto:contato@vailconsultoria.com.br?subject=${subject}&body=${body}`;

    // Feedback ao usuário
    if (statusEl) statusEl.textContent = 'Enviado! Responderemos em breve.';
    form.reset();
  });
}
