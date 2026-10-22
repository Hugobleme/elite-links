# Elite das Pechinchas — Landing Page

Landing page oficial da **Elite das Pechinchas**, desenvolvida sob medida com foco em conversão, responsividade mobile-first, acessibilidade e estética preta e dourada baseada na referência visual da marca.

---

## 🚀 Como Visualizar a Página

Existem duas formas muito simples de abrir a página:

### Opção 1: Diretamente no Navegador (Sem Instalação)
Basta dar um duplo clique no arquivo [`index.html`](file:///c:/Users/hugoh/OneDrive/%C3%81rea%20de%20Trabalho/PAGINA%20DO%20ELITE/index.html) ou arrastá-lo para qualquer navegador (Chrome, Edge, Firefox, Safari).

### Opção 2: Via Servidor Local
Se preferir rodar com um servidor local para desenvolvimento:
```bash
# Com Python (já instalado):
python -m http.server 3000

# Ou com Node.js (npx):
npx serve .
```
Em seguida, acesse no navegador: `http://localhost:3000`

---

## ⚙️ Onde Editar Links, Grupos e Informações

Toda a personalização da página é feita centralizadamente em um único arquivo:
👉 [**`config.js`**](file:///c:/Users/hugoh/OneDrive/%C3%81rea%20de%20Trabalho/PAGINA%20DO%20ELITE/config.js)

### 1. Inserir o Link do WhatsApp do Grupo Principal
No arquivo `config.js`, localize a propriedade `groups`:
```javascript
groups: [
  {
    id: "geral",
    name: "Elite das Pechinchas — GERAL",
    description: "Receba promoções e cupons selecionados direto no WhatsApp.",
    url: "https://chat.whatsapp.com/SEU_LINK_AQUI", // <- Coloque o link aqui
    badge: "Principal",
    active: true,
  },
]
```
> **Nota de Segurança:** Se a `url` estiver vazia (`""`), o botão exibirá automaticamente o texto **"Em breve"** em modo desabilitado, sem criar links quebrados.

### 2. Inserir o Link do Site de Garimpos
No objeto `brand`:
```javascript
brand: {
  name: "Elite das Pechinchas",
  siteUrl: "https://seusite.com.br", // <- Coloque a URL do seu site de garimpos aqui
  ...
}
```
* Quando preenchido, ativa o botão do card de destaque e os links secundários ("Explorar site de garimpos").
* Se mantido vazio (`""`), os botões do site mostram **"Em breve"** e os links secundários ficam ocultos para manter o layout limpo.

### 3. Exibir Lojas Monitoradas (Opcional)
Por padrão, a lista `stores` vem vazia (`[]`), o que mantém a seção de lojas oculta conforme solicitado. Para exibi-la, basta adicionar as lojas desejadas:
```javascript
stores: ["Shopee", "Mercado Livre", "Amazon", "Magalu", "Natura"],
```

### 4. Adicionar Novos Grupos
Você pode incluir novos grupos no array `groups` sem mexer no HTML:
```javascript
{
  id: "tech",
  name: "Elite das Pechinchas — Tecnologia",
  description: "Smartphones, notebooks, hardware e periféricos.",
  url: "https://chat.whatsapp.com/...",
  badge: "Novo",
  active: true, // defina como false para ocultar temporariamente
}
```

---

## 🎨 Identidade Visual e Detalhes Implementados

- **Paleta de Cores:**
  - Fundo principal: `#090909`
  - Fundo dos cards: `#151515` com bordas sutis
  - Dourado principal: `#E5B323`
  - Dourado hover: `#F3C640`
  - Títulos: `#FFFFFF` (Tipografia encorpada e arredondada *Plus Jakarta Sans*)
  - Textos secundários: `#A8A8A8`
- **Efeitos de Fundo:**
  - Iluminação radial dourada suave atrás do cabeçalho.
  - Grade geométrica sutil com desvanecimento suave para o preto.
- **Estrutura Completa:**
  1. **Topo / Hero:** Logo circular oficial com selo decorativo dourado, selo de grupos gratuitos, título, subtítulo, botão principal com rolagem suave e link secundário do site.
  2. **Seção de Grupos:** Tag de identificação "OFERTAS", card do grupo principal com avatar "E", badge "Principal", descrição e botão de entrada.
  3. **Destaque do Site de Garimpos:** Card estilizado logo abaixo dos grupos com ícone de sacola e botão dedicado com indicador de link externo (`↗`).
  4. **Benefícios:** Grid com 4 cards destacados (2 colunas em desktop/tablet, 1 coluna em mobile).
  5. **Lojas:** Componente configurável que se oculta automaticamente quando vazio.
  6. **Perguntas Frequentes (FAQ):** Accordion nativo com botões acessíveis, indicadores chevron animados, suporte total a navegação por teclado (Enter/Espaço) e atributos `aria-expanded` e `aria-controls`.
  7. **Chamada Final:** Card escuro com gradiente dourado sutil, título convidativo e CTA direto para o grupo principal.
  8. **Rodapé:** Marca, ano atual dinâmico e aviso de isenção/afiliação.

---

## 📁 Estrutura de Arquivos

```
PAGINA DO ELITE/
├── assets/
│   └── logo.png          # Logo oficial de alta resolução
├── index.html            # Estrutura semântica e acessível (HTML5)
├── style.css             # Folha de estilos vanilla (Design System & Responsividade)
├── config.js             # Central de configurações e links
├── app.js                # Lógica dinâmica, validações e interações
└── README.md             # Documentação de uso
```
