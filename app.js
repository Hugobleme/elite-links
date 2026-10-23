/**
 * ELITE DAS PECHINCHAS — JAVASCRIPT PRINCIPAL
 * 
 * Gerencia a renderização dinâmica baseada em CONFIG, validação de URLs,
 * acessibilidade do accordion (FAQ), fallback de imagem e interações suaves.
 */

(function () {
  'use strict';

  /**
   * Valida se uma string é uma URL HTTP/HTTPS válida
   */
  function isValidHttpUrl(string) {
    if (!string || typeof string !== 'string') return false;
    const trimmed = string.trim();
    if (!trimmed) return false;
    try {
      const url = new URL(trimmed);
      return url.protocol === 'http:' || url.protocol === 'https:';
    } catch (_) {
      return false;
    }
  }

  /**
   * Ícone SVG de seta externa (↗)
   */
  function getExternalIconSvg() {
    return `
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
        <line x1="7" y1="17" x2="17" y2="7"></line>
        <polyline points="7 7 17 7 17 17"></polyline>
      </svg>
    `;
  }

  /**
   * Ícone SVG de Chevron (para Accordion)
   */
  function getChevronSvg() {
    return `
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
        <polyline points="6 9 12 15 18 9"></polyline>
      </svg>
    `;
  }

  /**
   * Inicialização da aplicação
   */
  function init() {
    if (typeof CONFIG === 'undefined') {
      console.error('Configuração (CONFIG) não foi encontrada.');
      return;
    }

    setupBrand();
    renderGroups();
    setupShowcaseCard();
    renderStores();
    renderFaq();
    setupFinalCta();
    setupFooter();
  }

  /**
   * Configuração da Marca, Logo e Hero
   */
  function setupBrand() {
    const brand = CONFIG.brand || {};

    // Textos do Hero
    const heroTitle = document.getElementById('hero-title');
    const heroSubtitle = document.getElementById('hero-subtitle');
    const heroBadge = document.getElementById('hero-badge');

    if (heroTitle && brand.title) heroTitle.textContent = brand.title;
    if (heroSubtitle && brand.subtitle) heroSubtitle.textContent = brand.subtitle;
    if (heroBadge && brand.badge) heroBadge.textContent = brand.badge;

    // Logo e Fallback elegante
    const brandLogo = document.getElementById('brand-logo');
    const logoFallback = document.getElementById('logo-fallback');

    if (brandLogo && logoFallback) {
      // Garante iniciais EP no placeholder de fallback
      if (!logoFallback.textContent.trim()) {
        logoFallback.innerHTML = '<span>EP</span>';
      }
      if (brand.logoUrl && brand.logoUrl.trim()) {
        brandLogo.src = brand.logoUrl.trim();
        brandLogo.alt = `Logo ${brand.name || 'Elite das Pechinchas'}`;
        brandLogo.onerror = function () {
          brandLogo.style.display = 'none';
          logoFallback.style.display = 'flex';
        };
      } else {
        brandLogo.style.display = 'none';
        logoFallback.style.display = 'flex';
      }
    }

    // Link Secundário do Hero ("Explorar site de garimpos")
    const heroSiteContainer = document.getElementById('hero-site-link-container');
    if (heroSiteContainer) {
      if (isValidHttpUrl(brand.siteUrl)) {
        heroSiteContainer.innerHTML = `
          <a href="${brand.siteUrl.trim()}" target="_blank" rel="noopener noreferrer" class="secondary-text-link">
            Explorar site de garimpos
            ${getExternalIconSvg()}
          </a>
        `;
      } else {
        heroSiteContainer.innerHTML = '';
      }
    }
  }

  /**
   * Renderização dos Grupos de Ofertas
   */
  function renderGroups() {
    const container = document.getElementById('groups-list');
    if (!container) return;

    const groups = (CONFIG.groups || []).filter(function (g) {
      return g && g.active !== false;
    });

    if (groups.length === 0) {
      container.innerHTML = `
        <div class="group-card" style="justify-content: center; text-align: center;">
          <p style="color: var(--text-muted); font-size: 0.9rem;">Nenhum grupo ativo no momento.</p>
        </div>
      `;
      return;
    }

    container.innerHTML = groups.map(function (group) {
      const avatarContent = (group.icon && typeof group.icon === 'string')
        ? group.icon
        : (group.name || 'E').trim().charAt(0).toUpperCase();
      const hasValidUrl = isValidHttpUrl(group.url);

      const actionHtml = hasValidUrl
        ? `<a href="${group.url.trim()}" target="_blank" rel="noopener noreferrer" class="btn btn-primary btn-compact" id="btn-group-${group.id || 'item'}">
             Entrar no grupo
           </a>`
        : `<button type="button" class="btn btn-disabled btn-compact" disabled aria-disabled="true">
             Em breve
           </button>`;

      const badgeHtml = group.badge
        ? `<span class="group-badge">${escapeHtml(group.badge)}</span>`
        : '';

      return `
        <article class="group-card" id="card-group-${group.id || 'item'}">
          <div class="group-info-wrapper">
            <div class="group-avatar" aria-hidden="true">${escapeHtml(avatarContent)}</div>
            <div class="group-text">
              <div class="group-title-row">
                <h3 class="group-name">${escapeHtml(group.name)}</h3>
                ${badgeHtml}
              </div>
              <p class="group-description">${escapeHtml(group.description || '')}</p>
            </div>
          </div>
          <div class="group-action">
            ${actionHtml}
          </div>
        </article>
      `;
    }).join('');
  }

  /**
   * Card de Destaque para o Site de Garimpos
   */
  function setupShowcaseCard() {
    const actionContainer = document.getElementById('showcase-action-container');
    if (!actionContainer) return;

    const brand = CONFIG.brand || {};
    const hasValidUrl = isValidHttpUrl(brand.siteUrl);

    if (hasValidUrl) {
      actionContainer.innerHTML = `
        <a href="${brand.siteUrl.trim()}" target="_blank" rel="noopener noreferrer" class="btn btn-primary btn-compact" id="btn-site-garimpos">
          Acessar site de garimpos
          ${getExternalIconSvg()}
        </a>
      `;
    } else {
      actionContainer.innerHTML = `
        <button type="button" class="btn btn-disabled btn-compact" disabled aria-disabled="true">
          Em breve
        </button>
      `;
    }
  }

  /**
   * Renderização de Lojas / Marketplaces
   * Se a lista estiver vazia, oculta totalmente a seção
   */
  function renderStores() {
    const section = document.getElementById('lojas-section');
    const container = document.getElementById('stores-list');
    if (!section || !container) return;

    const stores = CONFIG.stores || [];

    if (Array.isArray(stores) && stores.length > 0) {
      section.style.display = 'block';
      container.innerHTML = stores.map(function (store) {
        return `<span class="store-pill">${escapeHtml(String(store))}</span>`;
      }).join('');
    } else {
      section.style.display = 'none';
      container.innerHTML = '';
    }
  }

  /**
   * Renderização e Interatividade do Accordion de Perguntas Frequentes
   */
  function renderFaq() {
    const container = document.getElementById('faq-list');
    if (!container) return;

    const faqItems = CONFIG.faq || [];

    if (faqItems.length === 0) {
      container.innerHTML = '';
      return;
    }

    container.innerHTML = faqItems.map(function (item, index) {
      const qId = `faq-q-${index}`;
      const pId = `faq-p-${index}`;

      return `
        <div class="faq-item" id="faq-item-${index}">
          <button
            type="button"
            class="faq-trigger"
            id="${qId}"
            aria-expanded="false"
            aria-controls="${pId}"
          >
            <span>${escapeHtml(item.question)}</span>
            <span class="faq-icon" aria-hidden="true">${getChevronSvg()}</span>
          </button>
          <div
            class="faq-panel"
            id="${pId}"
            role="region"
            aria-labelledby="${qId}"
          >
            <p class="faq-answer">${escapeHtml(item.answer)}</p>
          </div>
        </div>
      `;
    }).join('');

    // Adiciona listeners para teclado e clique
    const triggers = container.querySelectorAll('.faq-trigger');
    triggers.forEach(function (trigger) {
      trigger.addEventListener('click', function () {
        toggleFaqItem(trigger);
      });
    });
  }

  /**
   * Alterna estado aberto/fechado de um item do FAQ com animação suave
   */
  function toggleFaqItem(trigger) {
    const item = trigger.closest('.faq-item');
    const panel = item.querySelector('.faq-panel');
    const isOpen = trigger.getAttribute('aria-expanded') === 'true';

    // Fecha todos os outros itens para um comportamento limpo de acordeão
    const allItems = document.querySelectorAll('.faq-item');
    allItems.forEach(function (otherItem) {
      if (otherItem !== item) {
        otherItem.classList.remove('is-open');
        const otherTrigger = otherItem.querySelector('.faq-trigger');
        const otherPanel = otherItem.querySelector('.faq-panel');
        if (otherTrigger) otherTrigger.setAttribute('aria-expanded', 'false');
        if (otherPanel) otherPanel.style.maxHeight = null;
      }
    });

    if (isOpen) {
      trigger.setAttribute('aria-expanded', 'false');
      item.classList.remove('is-open');
      panel.style.maxHeight = null;
    } else {
      trigger.setAttribute('aria-expanded', 'true');
      item.classList.add('is-open');
      panel.style.maxHeight = (panel.scrollHeight + 32) + 'px';
    }
  }

  /**
   * Chamada Final
   * Usa a URL do grupo principal sem duplicar configuração
   */
  function setupFinalCta() {
    const primaryContainer = document.getElementById('final-cta-primary-container');
    const secondaryContainer = document.getElementById('final-cta-secondary-container');
    const brand = CONFIG.brand || {};
    const groups = CONFIG.groups || [];

    // Localiza o grupo principal
    let primaryGroup = groups.find(function (g) {
      return g.id === brand.primaryGroupId;
    });

    if (!primaryGroup && groups.length > 0) {
      primaryGroup = groups[0];
    }

    if (primaryContainer) {
      const hasValidUrl = primaryGroup && isValidHttpUrl(primaryGroup.url);
      if (hasValidUrl) {
        primaryContainer.innerHTML = `
          <a href="${primaryGroup.url.trim()}" target="_blank" rel="noopener noreferrer" class="btn btn-primary" id="btn-final-cta">
            Entrar no grupo
          </a>
        `;
      } else {
        primaryContainer.innerHTML = `
          <button type="button" class="btn btn-disabled" disabled aria-disabled="true">
            Em breve
          </button>
        `;
      }
    }

    // Link secundário da chamada final
    if (secondaryContainer) {
      if (isValidHttpUrl(brand.siteUrl)) {
        secondaryContainer.innerHTML = `
          <a href="${brand.siteUrl.trim()}" target="_blank" rel="noopener noreferrer" class="secondary-text-link">
            Visitar site de garimpos
            ${getExternalIconSvg()}
          </a>
        `;
      } else {
        secondaryContainer.innerHTML = '';
      }
    }
  }

  /**
   * Rodapé dinâmico
   */
  function setupFooter() {
    const brand = CONFIG.brand || {};
    const brandElem = document.getElementById('footer-brand-name');
    const yearElem = document.getElementById('current-year');

    if (brandElem && brand.name) {
      brandElem.textContent = brand.name;
    }

    if (yearElem) {
      yearElem.textContent = new Date().getFullYear();
    }
  }

  /**
   * Utilitário para escapar caracteres especiais e prevenir XSS
   */
  function escapeHtml(str) {
    if (str === null || str === undefined) return '';
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  // Executa na carga do DOM
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
