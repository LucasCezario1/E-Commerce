//mudar a moeda para brasileira
export const {format: formatPrice  } = new Intl.NumberFormat('pt-BR',{
  style: 'currency',
  currency: 'BRL',
})