const data = { 
      "vendas": [
        { "vendedor": "João Silva", "valor": 1200.50 },
        { "vendedor": "João Silva", "valor": 950.75 },
        { "vendedor": "João Silva", "valor": 1800.00 },
        { "vendedor": "João Silva", "valor": 1400.30 },
        { "vendedor": "João Silva", "valor": 1100.90 },
        { "vendedor": "João Silva", "valor": 1550.00 },
        { "vendedor": "João Silva", "valor": 1700.80 },
        { "vendedor": "João Silva", "valor": 250.30 },
        { "vendedor": "João Silva", "valor": 480.75 },
        { "vendedor": "João Silva", "valor": 320.40 },
        { "vendedor": "Maria Souza", "valor": 2100.40 },
        { "vendedor": "Maria Souza", "valor": 1350.60 },
        { "vendedor": "Maria Souza", "valor": 950.20 },
        { "vendedor": "Maria Souza", "valor": 1600.75 },
        { "vendedor": "Maria Souza", "valor": 1750.00 },
        { "vendedor": "Maria Souza", "valor": 1450.90 },
        { "vendedor": "Maria Souza", "valor": 400.50 },
        { "vendedor": "Maria Souza", "valor": 180.20 },
        { "vendedor": "Maria Souza", "valor": 90.75 },
        { "vendedor": "Carlos Oliveira", "valor": 800.50 },
        { "vendedor": "Carlos Oliveira", "valor": 1200.00 },
        { "vendedor": "Carlos Oliveira", "valor": 1950.30 },
        { "vendedor": "Carlos Oliveira", "valor": 1750.80 },
        { "vendedor": "Carlos Oliveira", "valor": 1300.60 },
        { "vendedor": "Carlos Oliveira", "valor": 300.40 },
        { "vendedor": "Carlos Oliveira", "valor": 500.00 },
        { "vendedor": "Carlos Oliveira", "valor": 125.75 },
        { "vendedor": "Ana Lima", "valor": 1000.00 },
        { "vendedor": "Ana Lima", "valor": 1100.50 },
        { "vendedor": "Ana Lima", "valor": 1250.75 },
        { "vendedor": "Ana Lima", "valor": 1400.20 },
        { "vendedor": "Ana Lima", "valor": 1550.90 },
        { "vendedor": "Ana Lima", "valor": 1650.00 },
        { "vendedor": "Ana Lima", "valor": 75.30 },
        { "vendedor": "Ana Lima", "valor": 420.90 },
        { "vendedor": "Ana Lima", "valor": 315.40 }
      ]
    };

    function calcularComissao(valor) {
      if (valor < 100) return 0;
      if (valor < 500) return valor * 0.01;
      return valor * 0.05;
    }

    const vendasPorVendedor = {};
    const comissoesPorVendedor = {};

    data.vendas.forEach(item => {
      vendasPorVendedor[item.vendedor] = (vendasPorVendedor[item.vendedor] ?? 0) + item.valor;
      comissoesPorVendedor[item.vendedor] = (comissoesPorVendedor[item.vendedor] ?? 0) + calcularComissao(item.valor);
    });

    const labels = Object.keys(vendasPorVendedor);
    const vendas = Object.values(vendasPorVendedor);
    const comissoes = Object.values(comissoesPorVendedor);

    const coresVendas = ['#4e73df', '#1cc88a', '#36b9cc', '#f6c23e'];
    const coresComissao = ['#2e59d9', '#17a673', '#2c9faf', '#f4b619'];

    const ctx = document.getElementById('graficoCascata').getContext('2d');

    const grafico = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [
          {
            label: 'Comissão (R$)',
            data: comissoes,
            backgroundColor: coresComissao
          },
          {
            label: 'Vendas Totais (R$)',
            data: vendas.map((v, i) => v - comissoes[i]),
            backgroundColor: coresVendas
          }
        ]
      },
      options: {
        indexAxis: 'x',
        responsive: true,
        animation: {
          duration: 1000,
          easing: 'easeOutCubic',
          delay: (context) => {
            // Cada barra inicia com atraso
            return context.dataIndex * 300; 
          }
        },
        plugins: {
          tooltip: {
            callbacks: {
              label: function(context) {
                return context.dataset.label + ': R$ ' + context.raw.toFixed(2);
              }
            }
          },
          legend: {
            position: 'top'
          }
        },
        scales: {
          x: {
            stacked: true
          },
          y: {
            stacked: true
          }
        }
      }
    });