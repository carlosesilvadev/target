// Dados iniciais
const estoque = [
  { codigoProduto: 101, descricaoProduto: "Caneta Azul", estoque: 150 },
  { codigoProduto: 102, descricaoProduto: "Caderno Universitário", estoque: 75 },
  { codigoProduto: 103, descricaoProduto: "Borracha Branca", estoque: 200 },
  { codigoProduto: 104, descricaoProduto: "Lápis Preto HB", estoque: 320 },
  { codigoProduto: 105, descricaoProduto: "Marcador de Texto Amarelo", estoque: 90 }
];

const movimentacoes = [];

// Dropdown produtos
const produtoSelect = document.getElementById('produtoSelect');
const filtroProduto = document.getElementById('filtroProduto');
estoque.forEach(prod => {
  const option1 = document.createElement('option');
  option1.value = prod.codigoProduto;
  option1.textContent = `${prod.descricaoProduto} (Estoque: ${prod.estoque})`;
  produtoSelect.appendChild(option1);

  const option2 = document.createElement('option');
  option2.value = prod.codigoProduto;
  option2.textContent = prod.descricaoProduto;
  filtroProduto.appendChild(option2);
});

// Funções de atualização
function atualizarTabelaEstoque() {
  const tbody = document.querySelector('#tabelaEstoque tbody');
  tbody.innerHTML = '';
  estoque.forEach(prod => {
    const tr = document.createElement('tr');
    tr.innerHTML = `<td>${prod.codigoProduto}</td><td>${prod.descricaoProduto}</td><td>${prod.estoque}</td>`;
    tbody.appendChild(tr);
  });
}

function atualizarTabelaMovimentacoes() {
  const tbody = document.querySelector('#tabelaMovimentacoes tbody');
  tbody.innerHTML = '';
  const filtro = filtroProduto.value;
  movimentacoes.forEach(mov => {
    if (filtro === 'todos' || mov.codigoProduto == filtro) {
      const tr = document.createElement('tr');
      tr.innerHTML = `<td>${mov.id}</td><td>${mov.descricaoProduto}</td><td>${mov.quantidade}</td><td>${mov.descricaoMovimentacao}</td><td>${mov.data}</td>`;
      tbody.appendChild(tr);
    }
  });
}

// Chart.js
const ctx = document.getElementById('graficoEstoque').getContext('2d');
let grafico = new Chart(ctx, {
  type: 'bar',
  data: {
    labels: estoque.map(p => p.descricaoProduto),
    datasets: [{
      label: 'Quantidade em Estoque',
      data: estoque.map(p => p.estoque),
      backgroundColor: '#4e73df'
    }]
  },
  options: {
    responsive: true,
    animation: { duration: 1000, easing: 'easeOutCubic' },
    scales: { y: { beginAtZero: true } }
  }
});

function atualizarGrafico() {
  grafico.data.datasets[0].data = estoque.map(p => p.estoque);
  grafico.update();
}

// Registrar movimentação
document.getElementById('formMovimentacao').addEventListener('submit', function(e) {
  e.preventDefault();
  const codigoProduto = parseInt(produtoSelect.value);
  const quantidade = parseInt(document.getElementById('quantidade').value);
  const descricaoMovimentacao = document.getElementById('descricao').value;

  const produto = estoque.find(p => p.codigoProduto === codigoProduto);
  if (!produto) return alert("Produto não encontrado");

  if (produto.estoque + quantidade < 0) {
    return alert("Erro: Estoque insuficiente!");
  }

  produto.estoque += quantidade;

  const movimentacao = {
    id: movimentacoes.length + 1,
    codigoProduto: produto.codigoProduto,
    descricaoProduto: produto.descricaoProduto,
    quantidade,
    descricaoMovimentacao,
    data: new Date().toLocaleString()
  };
  movimentacoes.push(movimentacao);

  // Atualizações
  produtoSelect.options[produtoSelect.selectedIndex].textContent = `${produto.descricaoProduto} (Estoque: ${produto.estoque})`;
  atualizarTabelaEstoque();
  atualizarTabelaMovimentacoes();
  atualizarGrafico();
  this.reset();
});

// Filtro de movimentações
filtroProduto.addEventListener('change', atualizarTabelaMovimentacoes);

// Inicializa
atualizarTabelaEstoque();
atualizarTabelaMovimentacoes();
atualizarGrafico();