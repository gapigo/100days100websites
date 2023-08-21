function getPosLinhaColuna(posicao, numColunas) {
  let quociente = (posicao / numColunas) | 0;
  let linha = quociente;
  let resto = posicao % numColunas;
  let coluna = resto;
  return [linha, coluna];
}

function iniciarTabuleiro() {
  let tile = {
    escondido: true,
    navio: 0,
  };
  let matrizDoJogo;
  //   matrizDoJogo = Array(10).fill(Array(10).fill(tile));
  matrizDoJogo = Array(10)
    .fill()
    .map(() => Array(10).fill(tile));

  //   console.log(matrizDoJogo);
  let tamanhoDaLinha = matrizDoJogo[0].length;
  let tamanhoTabuleiro = matrizDoJogo.length * tamanhoDaLinha;
  let numNavio1 = Math.round(0.05 * tamanhoTabuleiro);
  let numNavio2 = Math.round(0.02 * tamanhoTabuleiro);
  let numSubmarino = Math.round(0.03 * tamanhoTabuleiro);
  let numerosJaAdicionados = [];
  function aleatorizar(navio) {
    let numeroNavios = navio.num;
    let tipoNavio = navio.tipo;
    // 1 - navio 1
    // 2 - navio 2
    // 3 - submarino
    let posicaoAleatoria = 0;
    for (let i = 0; i < numeroNavios; i++) {
      posicaoAleatoria = Math.round(Math.random() * tamanhoTabuleiro);
      if (!numerosJaAdicionados.includes(posicaoAleatoria)) {
        numerosJaAdicionados.push(posicaoAleatoria);

        let [linha, coluna] = getPosLinhaColuna(
          posicaoAleatoria,
          tamanhoDaLinha
        );
        matrizDoJogo[linha][coluna] = {
          escondido: true,
          navio: tipoNavio,
        };
      }
    }
  }
  aleatorizar({ num: numNavio1, tipo: 1 });
  aleatorizar({ num: numNavio2, tipo: 2 });
  aleatorizar({ num: numSubmarino, tipo: 3 });
  return matrizDoJogo;
}

function limparTiles(matrizDoJogo) {
  let mainEl = document.querySelector('main');
  mainEl.innerHTML = '';
  let numeroDeLinhas = matrizDoJogo.length;
  let numeroDeColunas = matrizDoJogo[0].length;
  for (let i = 0; i < numeroDeLinhas; i++) {
    for (let j = 0; j < numeroDeColunas; j++) {
      let elementoNovo = document.createElement('div');
      elementoNovo.classList.add('hidden');
      mainEl.appendChild(elementoNovo);
      console.log('printaa');
    }
  }
  return matrizDoJogo;
}

document.addEventListener('DOMContentLoaded', () => {
  //   alert('Bem vindo à batalha naval 🛳️');
  matrizDoJogo = iniciarTabuleiro(); // Inicia variáveis da variávei matrizDoJogo;
  limparTiles(matrizDoJogo);
  console.log(matrizDoJogo);
  let mainEl = document.querySelector('main');
  let numColunas = matrizDoJogo[0].length;
  let children = mainEl.children;
  let pontos = 100;
  function refreshPontos() {
    let pontosEl = document.querySelector('span.pontos');
    pontosEl.innerText = pontos;
  }
  let quantidadeNavios = 0;
  for (linha of matrizDoJogo) {
    for (tile of linha) {
      if (tile.navio && tile.navio != 0) {
        quantidadeNavios++;
      }
    }
  }
  let quantidadeInicialNavios = quantidadeNavios;
  console.log(quantidadeNavios);
  for (let el of children) {
    el.addEventListener('click', (evento) => {
      let posicaoElemento = Array.from(children).indexOf(evento.target);
      let [linha, coluna] = getPosLinhaColuna(posicaoElemento, numColunas);
      let tile = matrizDoJogo[linha][coluna];
      if (tile.escondido === true) {
        let tileNovo = {
          escondido: false,
          navio: tile.navio,
        };
        let tipoExtenso;
        switch (tile.navio) {
          case 1:
            tipoExtenso = 'navio';
            pontos += 5;
            quantidadeNavios--;
            break;
          case 2:
            tipoExtenso = 'navio2';
            pontos += 10;
            quantidadeNavios--;
            break;
          case 3:
            tipoExtenso = 'submarino';
            pontos += 3;
            quantidadeNavios--;
            break;
          default:
            tipoExtenso = 'agua';
            pontos--;
            break;
        }
        refreshPontos();
        matrizDoJogo[linha][coluna] = tileNovo;
        console.log(matrizDoJogo[linha]);
        console.log(matrizDoJogo);
        el.classList.replace('hidden', tipoExtenso);
        if (quantidadeNavios == 0) {
          alert(
            `PARABÉNS VOCÊ ACHOU OS ${quantidadeInicialNavios} NAVIOS 🥳 E FICOU COM ${pontos} PONTOS`
          );
          let janelaNaoClicavel = document.createElement('div');
          janelaNaoClicavel.classList.add('janelaNaoClicavel');
          document.querySelector('body').appendChild(janelaNaoClicavel);
          return;
        }
      }
    });
  }
});

function funcao(parametro) {
  return 'cu';
}

const funcao2 = (parametro) => {
  return 'cu';
};

document.addEventListener('nomedoevento', funcao);
