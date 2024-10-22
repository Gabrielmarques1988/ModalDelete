/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
    "./node_modules/flowbite/**/*.js"
  ],
  theme: {
    extend: {
      fontFamily:{
        sans:['"Open Sans"', 'sans-serif'],
        inter:['"Inter"', 'sans-serif'],
      },
      colors: {
        azulButton: '#4993bc',
        hoverAzulButton: '#4993bce6',
        'branco-principal': 'var(--branco-principal)',
        'cinza-background': 'var(--cinza-background)',
        'cinza-border': 'var(--cinza-border)',
        'cinza-secundario': 'var(--cinza-secundario)',
        'preto-total': 'var(--preto-total)',
        'cinza-principal-escuro': 'var(--cinza-principal-escuro)',
        'cinza-principal-medio': 'var(--cinza-principal-medio)',
        'cinza-principal-claro': 'var(--cinza-principal-claro)',
        'azul-claro': 'var(--azul-claro)',
        'azul-medio': 'var(--azul-medio)',
        'azul-escuro': 'var(--azul-escuro)',
        'preto-principal': 'var(--preto-principal)',
        'cinza-selecionado': 'var(--cinza-selecionado)',
        'azul-selecao-tabela': 'var(--azul-selecao-tabela)',
        'cinza-input': 'var(--cinza-input)',
        'vermelho-deletar': 'var(--vermelho-deletar)',
        'vermelho-tenho-certeza': 'var(--vermelho-tenho-certeza)',
        'vermelho-deletar-aviso': 'var(--vermelho-deletar-aviso)',
        'verde-criado-aviso': 'var(--verde-criado-aviso)',
        'status-desativado': 'var(--status-desativado)',
        'status-texto-desativado': 'var(--status-texto-desativado)',
        'status-bloqueado': 'var(--status-bloqueado)',
        'status-texto-bloqueado': 'var(--status-texto-bloqueado)',
        'status-ativo': 'var(--status-ativo)',
        'status-texto-ativo': 'var(--status-texto-ativo)',
        'preto-tabela-tab': 'var(--preto-tabela-tab)',
        'cinza-tabela-tab-texto': 'var(--cinza-tabela-tab-texto)',
      }
    },
  },
  plugins: [
    require('flowbite/plugin'),
  ],
  safelist: [
    'text-red-400',
    'text-green-400',
    'text-gray-300',
    'border-red-400',
    'border-gray-300',
    'border-green-400',
  ],
}

