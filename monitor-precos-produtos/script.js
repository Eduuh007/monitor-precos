document.getElementById('check-price').addEventListener('click', () => {
  const url = document.getElementById('product-url').value.trim();
  const resultSection = document.getElementById('result');
  const priceDisplay = document.getElementById('price-display');

  if (!url) {
    alert('Por favor, insira a URL do produto.');
    return;
  }

  priceDisplay.textContent = 'Consultando preço...';
  resultSection.classList.remove('hidden');

  // Exemplo simples: vamos simular um scraping com fetch em uma API pública
  // Na prática, scraping deve ser feito no backend por CORS e segurança.
  // Aqui vamos usar uma API falsa para demo.

  // Simula tempo de consulta
  setTimeout(() => {
    // Simulação de preço retornado (aleatório)
    const simulatedPrice = (Math.random() * 1000).toFixed(2);
    priceDisplay.textContent = `R$ ${simulatedPrice}`;
  }, 2000);
});
