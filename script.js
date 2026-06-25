/* ==========================================================================
   ESTADOS GLOBAL E ACESSIBILIDADE
   ========================================================================== */
let currentFontSize = 16;
const bodyEl = document.body;

// Elementos de Controle
const btnIncrease = document.getElementById('btn-font-increase');
const btnDecrease = document.getElementById('btn-font-decrease');
const btnContrast = document.getElementById('btn-contrast');

// Controle de Fonte
btnIncrease.addEventListener('click', () => {
    if (currentFontSize < 24) {
        currentFontSize += 2;
        document.documentElement.style.setProperty('--font-base', `${currentFontSize}px`);
    }
});

btnDecrease.addEventListener('click', () => {
    if (currentFontSize > 12) {
        currentFontSize -= 2;
        document.documentElement.style.setProperty('--font-base', `${currentFontSize}px`);
    }
});

// Controle de Alto Contraste
btnContrast.addEventListener('click', () => {
    bodyEl.classList.toggle('high-contrast');
});

/* ==========================================================================
   DATA & RENDERIZAÇÃO DO CARROSSEL (SOLUÇÕES)
   ========================================================================== */
const solucoesData = [
    {
        titulo: "Auditoria ESG Completa",
        descricao: "Mapeamos os processos atuais da sua operação e criamos um plano estratégico viável e adaptável para governança verde."
    },
    {
        titulo: "Eficiência Energética Carbono Zero",
        descricao: "Migração completa para matrizes limpas (Solar/Eólica) com engenharia focada na eliminação do desperdício operacional."
    },
    {
        titulo: "Logística Reversa e Resíduos",
        descricao: "Adequação completa às leis vigentes estruturando processos circulares que transformam refugo em nova receita."
    },
    {
        titulo: "Selos e Certificações Verdes",
        descricao: "Preparação integral da marca para obtenção de certificações ISO e reconhecimentos nacionais de sustentabilidade."
    }
];

const track = document.getElementById('carousel-track');

function renderCarousel() {
    track.innerHTML = solucoesData.map((item, index) => `
        <div class="carousel-item" role="group" aria-roledescription="slide" aria-label="${index + 1} de ${solucoesData.length}">
            <h3>${item.titulo}</h3>
            <p>${item.descricao}</p>
        </div>
    `).join('');
}
renderCarousel();

// Lógica de Movimentação do Carrossel
const btnPrev = document.getElementById('carousel-prev');
const btnNext = document.getElementById('carousel-next');
let carouselIndex = 0;

function getCardsPerView() {
    if (window.innerWidth > 1024) return 3;
    if (window.innerWidth > 640) return 2;
    return 1;
}

function updateCarouselPosition() {
    const cardsPerView = getCardsPerView();
    const maxIndex = solucoesData.length - cardsPerView;
    if (carouselIndex > maxIndex) carouselIndex = maxIndex;
    if (carouselIndex < 0) carouselIndex = 0;
    
    const cardWidth = track.querySelector('.carousel-item').offsetWidth;
    const gap = 24;
    const offset = carouselIndex * (cardWidth + gap);
    track.style.transform = `translateX(-${offset}px)`;
}

btnNext.addEventListener('click', () => {
    const maxIndex = solucoesData.length - getCardsPerView();
    if (carouselIndex < maxIndex) {
        carouselIndex++;
        updateCarouselPosition();
    }
});

btnPrev.addEventListener('click', () => {
    if (carouselIndex > 0) {
        carouselIndex--;
        updateCarouselPosition();
    }
});

window.addEventListener('resize', updateCarouselPosition);

/* ==========================================================================
   DATA & RENDERIZAÇÃO DO ACORDEÃO (FAQ)
   ========================================================================== */
const faqData = [
    {
        pergunta: "A transição sustentável aumenta muito o custo operacional inicial?",
        resposta: "Não. Nosso foco é a sustentabilidade eficiente. Identificamos otimizações em recursos já existentes que se autofinanciam em menos de 90 dias, gerando caixa livre subsequente."
    },
    {
        pergunta: "Quanto tempo leva para obter um selo ou certificação?",
        resposta: "O processo completo varia conforme o tamanho da empresa, mas projetos padrão levam entre 4 a 6 meses para auditoria final e certificação."
    },
    {
        pergunta: "Minha empresa é de serviços/tecnologia. ESG se aplica a mim?",
        resposta: "Com certeza. A pegada de carbono digital (servidores), diversidade, governança corporativa e compras sustentáveis são fundamentais para investidores de tecnologia."
    }
];

const accordionContainer = document.getElementById('faq-accordion');

function renderAccordion() {
    accordionContainer.innerHTML = faqData.map((item, index) => `
        <div class="accordion-item">
            <button class="accordion-header" aria-expanded="false" aria-controls="faq-answer-${index}">
                <span>${item.pergunta}</span>
                <span class="accordion-icon" aria-hidden="true">▼</span>
            </button>
            <div id="faq-answer-${index}" class="accordion-content" role="region">
                <p>${item.resposta}</p>
            </div>
        </div>
    `).join('');
}
renderAccordion();

// Lógica de Interatividade do Acordeão
accordionContainer.addEventListener('click', (e) => {
    const header = e.target.closest('.accordion-header');
    if (!header) return;
    
    const item = header.parentElement;
    const content = item.querySelector('.accordion-content');
    const isActive = item.classList.contains('active');
    
    // Fecha todos antes
    document.querySelectorAll('.accordion-item').forEach(el => {
        el.classList.remove('active');
        el.querySelector('.accordion-content').style.maxHeight = null;
        el.querySelector('.accordion-header').setAttribute('aria-expanded', 'false');
    });
    
    if (!isActive) {
        item.classList.add('active');
        content.style.maxHeight = content.scrollHeight + "px";
        header.setAttribute('aria-expanded', 'true');
    }
});

/* ==========================================================================
   VALIDAÇÃO E TRATAMENTO DO FORMULÁRIO DE CAPTAÇÃO
   ========================================================================== */
const form = document.getElementById('lead-form');
const successMsg = document.getElementById('form-success');

form.addEventListener('submit', (e) => {
    e.preventDefault();
    
    if (form.checkValidity()) {
        form.style.display = 'none';
        successMsg.style.display = 'block';
        successMsg.focus();
    } else {
        form.reportValidity();
    }
});
