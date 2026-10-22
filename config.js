/**
 * CONFIGURAÇÃO CENTRALIZADA — ELITE DAS PECHINCHAS
 * 
 * Edite os dados abaixo para personalizar sua landing page:
 * - brand: Informações da marca, logo e URL do site de garimpos.
 * - groups: Lista de grupos de ofertas no WhatsApp (exibe apenas os ativos).
 * - stores: Nomes das lojas monitoradas (se deixar vazio [], a seção fica oculta).
 * - faq: Perguntas e respostas exibidas no accordion.
 */

const CONFIG = {
  brand: {
    name: "Elite das Pechinchas",
    badge: "Grupos gratuitos de ofertas",
    title: "Elite das Pechinchas",
    subtitle: "Promoções, cupons e garimpos para você economizar.",
    // Caminho da imagem da logo. Se deixar vazio ("") ou o arquivo não existir,
    // a página exibirá automaticamente um elegante emblema com as iniciais "EP".
    logoUrl: "assets/logo.png",
    // Link para o seu site de garimpos (exemplo: "https://seusite.com.br")
    // Se deixar vazio (""), os botões do site exibirão "Em breve" e os links secundários serão ocultados.
    siteUrl: "https://elitedaspechinchas.vercel.app/",
    // ID do grupo principal que será usado no botão da chamada final
    primaryGroupId: "geral",
  },

  /**
   * Grupos de Ofertas
   * Cada grupo possui:
   * - id: identificador único
   * - name: nome do grupo
   * - description: breve descrição
   * - url: link de convite do WhatsApp (ex: "https://chat.whatsapp.com/...")
   * - badge: selo opcional (ex: "Principal")
   * - active: true para exibir na página, false para ocultar
   */
  groups: [
    {
      id: "geral",
      name: "Elite das Pechinchas — GERAL",
      description: "Receba promoções e cupons selecionados direto no WhatsApp.",
      url: "https://chat.whatsapp.com/I0gUAzFUBx5JLuoWf0ziyx",
      badge: "Principal",
      active: true,
    },
  ],

  /**
   * Lojas / Marketplaces monitorados
   * Se a lista estiver vazia ([]), a seção inteira de lojas será automaticamente ocultada.
   * Exemplo de preenchimento quando quiser exibir:
   * stores: ["Shopee", "Mercado Livre", "Amazon", "Magalu", "Natura"],
   */
  stores: [],

  /**
   * Benefícios exibidos na seção "Por que acompanhar?"
   */
  benefits: [
    {
      id: "ofertas",
      title: "Ofertas selecionadas",
      description: "Garimpos e cupons reunidos em um só lugar.",
      icon: "sparkles",
    },
    {
      id: "escolha",
      title: "Você escolhe",
      description: "Entre nos grupos que combinam com seus interesses.",
      icon: "check-grid",
    },
    {
      id: "whatsapp",
      title: "Direto no WhatsApp",
      description: "Acompanhe as publicações pelo aplicativo que você já usa.",
      icon: "message-circle",
    },
    {
      id: "garimpos",
      title: "Site de garimpos",
      description: "Outra forma de conferir as ofertas publicadas.",
      icon: "compass",
    },
  ],

  /**
   * Perguntas Frequentes (FAQ)
   */
  faq: [
    {
      question: "O grupo é gratuito?",
      answer: "Sim. A participação no grupo é gratuita.",
    },
    {
      question: "Preciso entrar em todos os grupos?",
      answer: "Não. Você escolhe quais grupos deseja acompanhar.",
    },
    {
      question: "Como funcionam as ofertas?",
      answer: "Compartilhamos links para ofertas em lojas de terceiros. Preços, cupons e disponibilidade podem mudar. Confira as condições na loja antes de comprar.",
    },
  ],
};
