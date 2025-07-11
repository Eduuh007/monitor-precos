const express = require('express');
const puppeteer = require('puppeteer');
const cors = require('cors');

const app = express();
const PORT = 3000;

app.use(cors());

app.get('/preco', async (req, res) => {
  const url = req.query.url;

  if (!url) {
    return res.status(400).json({ erro: 'URL do produto não foi fornecida' });
  }

  try {
    const browser = await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
    });
    const page = await browser.newPage();
    await page.goto(url, { waitUntil: 'networkidle2' });

    // Aguarda o preço carregar
    await page.waitForSelector('.product-price-current'); // seletor pode mudar!

    const resultado = await page.evaluate(() => {
      const nome = document.querySelector('h1.product-title-text')?.innerText;
      const preco = document.querySelector('.product-price-current')?.innerText;
      return { nome, preco };
    });

    await browser.close();

    if (!resultado.nome || !resultado.preco) {
      return res.status(404).json({ erro: 'Não foi possível capturar nome ou preço.' });
    }

    res.json(resultado);
  } catch (erro) {
    console.error(erro);
    res.status(500).json({ erro: 'Erro ao buscar dados do produto' });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
