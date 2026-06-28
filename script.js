/* =====================================================
MENU MOBILE
===================================================== */

const toggle = document.querySelector(".menu-toggle");
const menu = document.querySelector(".menu");

if (toggle && menu) {
  toggle.addEventListener("click", () => {
    menu.classList.toggle("ativo");

    const expanded =
      toggle.getAttribute("aria-expanded") === "true";

    toggle.setAttribute(
      "aria-expanded",
      String(!expanded)
    );
  });
}

/* =====================================================
SCROLL SUAVE
===================================================== */

document.querySelectorAll("nav a").forEach((anchor) => {
  anchor.addEventListener("click", function (e) {

    e.preventDefault();

    const targetId =
      this.getAttribute("href").substring(1);

    const targetSection =
      document.getElementById(targetId);

    const header =
      document.querySelector(".site-header");

    if (targetSection) {

      const headerHeight =
        header ? header.offsetHeight : 0;

      const targetPosition =
        targetSection.offsetTop -
        headerHeight -
        10;

      window.scrollTo({
        top: targetPosition,
        behavior: "smooth"
      });
    }

    if (menu && menu.classList.contains("ativo")) {
      menu.classList.remove("ativo");
      toggle.setAttribute("aria-expanded", "false");
    }

  });
});

/* =====================================================
ANIMAÇÃO DAS SEÇÕES
===================================================== */

const revealItems =
  document.querySelectorAll(".reveal");

const revealOnScroll = () => {

  const triggerBottom =
    window.innerHeight * 0.88;

  revealItems.forEach((item) => {

    const itemTop =
      item.getBoundingClientRect().top;

    if (itemTop < triggerBottom) {
      item.classList.add("ativo");
    }

  });

};

window.addEventListener("scroll", revealOnScroll);
window.addEventListener("load", revealOnScroll);

/* =====================================================
CONTADOR
===================================================== */

const counters = document.querySelectorAll(".contador");

const observerContador = new IntersectionObserver((entries) => {

  entries.forEach(entry => {

    if(entry.isIntersecting){

      const counter = entry.target;

      const target = Number(counter.dataset.target);

      let current = 0;

      const increment = Math.max(target / 100, 1);

      const updateCounter = () => {

        current += increment;

        if(current < target){

          counter.textContent = Math.floor(current);

          requestAnimationFrame(updateCounter);

        }else{

          counter.textContent = target + "+";

        }

      };

      updateCounter();

      observerContador.unobserve(counter);

    }

  });

});

counters.forEach(counter => {
  observerContador.observe(counter);
});

/* =====================================================
HEADER AO ROLAR
===================================================== */

window.addEventListener("scroll", () => {

  const header =
    document.querySelector(".site-header");

  if (!header) return;

  if (window.scrollY > 50) {
    header.classList.add("scroll");
  } else {
    header.classList.remove("scroll");
  }

});

/* =====================================
CARROSSEL DE SERVIÇOS PREMIUM
===================================== */

const listaServicos = document.querySelector(".todos-servicos-grid");
const btnEsquerda = document.querySelector(".seta-esquerda");
const btnDireita = document.querySelector(".seta-direita");

if (listaServicos) {

  /* BOTÕES */

  if (btnDireita) {

    btnDireita.addEventListener("click", () => {

      listaServicos.scrollBy({
        left: 400,
        behavior: "smooth"
      });

    });

  }

  if (btnEsquerda) {

    btnEsquerda.addEventListener("click", () => {

      listaServicos.scrollBy({
        left: -400,
        behavior: "smooth"
      });

    });

  }

  /* AUTO SCROLL */

  let autoScroll = setInterval(() => {

    const fim =
      listaServicos.scrollWidth -
      listaServicos.clientWidth;

    if (listaServicos.scrollLeft >= fim - 5) {

      return;

    } else {

      listaServicos.scrollBy({
        left: 350,
        behavior: "smooth"
      });

    }

  }, 10000);

  /* PAUSA AO PASSAR O MOUSE */

  listaServicos.addEventListener("mouseenter", () => {

    clearInterval(autoScroll);

  });

  listaServicos.addEventListener("mouseleave", () => {

    autoScroll = setInterval(() => {

      const fim =
        listaServicos.scrollWidth -
        listaServicos.clientWidth;

      if (listaServicos.scrollLeft >= fim - 5) {

        return;

      } else {

        listaServicos.scrollBy({
          left: 350,
          behavior: "smooth"
        });

      }

    }, 10000);

  });

}

/* FAQ */

const faqItems = document.querySelectorAll(".faq-item");

faqItems.forEach(item => {

  const button = item.querySelector(".faq-question");

  button.addEventListener("click", () => {

    faqItems.forEach(other => {

      if(other !== item){
        other.classList.remove("active");
      }

    });

    item.classList.toggle("active");

  });

});
