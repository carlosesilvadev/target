let grafico;

// Função para calcular valor com juros diário simples
function calcularJuros(valorOriginal, dataVencimentoStr, taxaDiaria) {
  const hoje = new Date();
  const dataVencimento = new Date(dataVencimentoStr);

  const diffMs = hoje - dataVencimento;
  const diasAtraso = Math.max(Math.floor(diffMs / (1000 * 60 * 60 * 24)), 0);

  let valorTotal = valorOriginal;
  const valoresPorDia = [valorOriginal]; // para gráfico

  for (let i = 1; i <= diasAtraso; i++) {
    valorTotal += valorOriginal * (taxaDiaria / 100);
    valoresPorDia.push(valorTotal);
  }

  const juros = valorTotal - valorOriginal;

  return { diasAtraso, juros, valorTotal, valoresPorDia };
}

// Formulário
document.getElementById('formJuros').addEventListener('submit', function(e) {
  e.preventDefault();

  const valor = parseFloat(document.getElementById('valor').value);
  const vencimento = document.getElementById('vencimento').value;
  const taxa = parseFloat(document.getElementById('taxa').value);

  const resultado = calcularJuros(valor, vencimento, taxa);

  document.getElementById('resultado').innerHTML = `
    Valor Original: R$ ${valor.toFixed(2)}<br>
    Dias de Atraso: ${resultado.diasAtraso}<br>
    Juros Acumulados: R$ ${resultado.juros.toFixed(2)}<br>
    Valor Total: R$ ${resultado.valorTotal.toFixed(2)}
  `;

  // Preparar dados para o gráfico
  const labels = Array.from({length: resultado.valoresPorDia.length}, (_, i) => i);
  const data = resultado.valoresPorDia;

  // Criar ou atualizar gráfico
  if (grafico) {
    grafico.data.labels = labels;
    grafico.data.datasets[0].data = data;
    grafico.update();
  } else {
    const ctx = document.getElementById('graficoJuros').getContext('2d');
    grafico = new Chart(ctx, {
      type: 'line',
      data: {
        labels: labels,
        datasets: [{
          label: 'Valor com Juros',
          data: data,
          borderColor: 'rgba(75, 192, 192, 1)',
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          fill: true,
          tension: 0.2
        }]
      },
      options: {
        responsive: true,
        plugins: { legend: { display: true } },
        scales: { 
          x: { title: { display: true, text: 'Dias de Atraso' } },
          y: { title: { display: true, text: 'Valor (R$)' }, beginAtZero: false }
        }
      }
    });
  }
});
