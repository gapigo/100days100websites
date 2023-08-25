function getPosLinhaColuna(posicao, numColunas) {
  let quociente = (posicao / numColunas) | 0;
  let linha = quociente;
  let resto = posicao % numColunas;
  let coluna = resto;
  return [linha, coluna];
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function iniciarTabuleiro() {
  let tile = {
    escondido: true,
    navio: 0,
  };
  let matrizDoJogo;
  //   matrizDoJogo = Array(10).fill(Array(10).fill(tile));
  matrizDoJogo = Array(8)
    .fill()
    .map(() => Array(12).fill(tile));

  let tamanhoDaLinha = matrizDoJogo[0].length;
  let tamanhoTabuleiro = matrizDoJogo.length * tamanhoDaLinha;
  let numNavio1 = Math.round(0.03 * tamanhoTabuleiro);
  let numNavio2 = Math.round(0.02 * tamanhoTabuleiro);
  let numSubmarino = Math.round(0.05 * tamanhoTabuleiro);
  let numerosJaAdicionados = [];
  function aleatorizar(navio) {
    let numeroNavios = navio.num;
    let tipoNavio = navio.tipo;
    let tamanhoNavio = tipoNavio == 1 ? 2 : tipoNavio == 2 ? 3 : 1;

    // 1 - navio 1
    // 2 - navio 2
    // 3 - submarino
    let posicaoAleatoria = 0;
    for (let i = 0; i < numeroNavios; i++) {
      while (true) {
        sleep(1000);
        let valido = true;
        posicaoAleatoria = Math.round(Math.random() * tamanhoTabuleiro);
        if (!numerosJaAdicionados.includes(posicaoAleatoria)) {
          posicoesNavio = [posicaoAleatoria];
          if (tamanhoNavio > 1) {
            direcoes = ['esquerda', 'topo', 'direita', 'baixo'];
            while (true) {
              valido = true;
              if (direcoes.length == 0) break;
              posicoesNavio = [posicaoAleatoria];
              direcaoAleatoria =
                direcoes[Math.floor(Math.random() * direcoes.length)];
              switch (direcaoAleatoria) {
                case 'esquerda':
                  ultimaPos = posicaoAleatoria - tamanhoNavio;
                  for (let i = 1; i < tamanhoNavio; i++)
                    posicoesNavio.push(posicaoAleatoria - i);
                  if (
                    ~~(ultimaPos / tamanhoDaLinha) !=
                    ~~(posicaoAleatoria / tamanhoDaLinha)
                  )
                    valido = false;
                  break;
                case 'topo':
                  ultimaPos = posicaoAleatoria - tamanhoNavio * tamanhoDaLinha;
                  for (let i = 1; i < tamanhoNavio; i++)
                    posicoesNavio.push(posicaoAleatoria - i * tamanhoDaLinha);
                  if (ultimaPos < 0) valido = false;
                  break;
                case 'direita':
                  ultimaPos = posicaoAleatoria + tamanhoNavio;
                  for (let i = 1; i < tamanhoNavio; i++)
                    posicoesNavio.push(posicaoAleatoria + i);
                  if (
                    ~~(ultimaPos / tamanhoDaLinha) !=
                    ~~(posicaoAleatoria / tamanhoDaLinha)
                  )
                    valido = false;
                  break;
                case 'baixo':
                  ultimaPos = posicaoAleatoria + tamanhoNavio * tamanhoDaLinha;
                  for (let i = 1; i < tamanhoNavio; i++)
                    posicoesNavio.push(posicaoAleatoria + i * tamanhoDaLinha);
                  if (ultimaPos >= tamanhoTabuleiro) valido = false;
                  break;
              }
              for (let num of posicoesNavio) {
                if (numerosJaAdicionados.indexOf(num) != 1) valido = false;
              }
              if (valido) break;
              direcoes.pop(direcoes.indexOf(direcaoAleatoria));
            }
          }
          if (valido) {
            for (let posicao of posicoesNavio) {
              let [linha, coluna] = getPosLinhaColuna(posicao, tamanhoDaLinha);
              numerosJaAdicionados.push(posicao);
              matrizDoJogo[linha][coluna] = {
                escondido: true,
                navio: tipoNavio,
              };
            }
            break;
          }
        }
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
    }
  }
  return matrizDoJogo;
}

var tiros2 = 2;
var tiros3 = 1;

document.addEventListener('DOMContentLoaded', () => {
  //   alert('Bem vindo à batalha naval 🛳️');
  matrizDoJogo = iniciarTabuleiro(); // Inicia variáveis da variávei matrizDoJogo;
  limparTiles(matrizDoJogo);
  let mainEl = document.querySelector('main');
  let numColunas = matrizDoJogo[0].length;
  let children = mainEl.children;
  let pontos = 100;
  function refreshPontos() {
    let pontosEl = document.querySelector('#pontos');
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
  for (let el of children) {
    el.addEventListener('click', (evento) => {
      let tiroEl = document.querySelector('#tiro');
      let tiro = tiroEl.value;
      desabilitarTiro = false;
      if (tiro == 3) {
        desabilitarTiro = true;
      }
      if (tiro == 2) {
        tiros2--;
        if (tiros2 == 0) desabilitarTiro = true;
      }
      if (desabilitarTiro)
        document.querySelectorAll('#tiro option').forEach((opt) => {
          if (opt.value == tiro) {
            opt.disabled = true;
          }
          tiroEl.value = 1;
        });

      function revelar(posicaoElemento) {
        let [linha, coluna] = getPosLinhaColuna(posicaoElemento, numColunas);
        let tile = matrizDoJogo[linha][coluna];
        if (tile.escondido == true) {
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
      }
      let posicaoElemento = Array.from(children).indexOf(evento.target);
      function divCol(num) {
        return ~~(num / numColunas);
      }
      posicoes = [posicaoElemento];
      if (tiro == 2) {
        posicoes.push(
          posicaoElemento - numColunas >= 0 ? posicaoElemento - numColunas : -1
        );
        posicoes.push(
          divCol(posicaoElemento - 1) == divCol(posicaoElemento)
            ? posicaoElemento - 1
            : -1
        );
        posicoes.push(
          divCol(posicaoElemento + 1) == divCol(posicaoElemento)
            ? posicaoElemento + 1
            : -1
        );
        posicoes.push(
          posicaoElemento + numColunas < matrizDoJogo.length
            ? posicaoElemento + numColunas
            : -1
        );
      }
      if (tiro == 3) {
        posicoes.push(
          posicaoElemento - numColunas >= 0 ? posicaoElemento - numColunas : -1
        ); // x1    1
        posicoes.push(
          divCol(posicaoElemento - 1) == divCol(posicaoElemento)
            ? posicaoElemento - 1
            : -1
        ); // x3     2
        posicoes.push(
          divCol(posicaoElemento + 1) == divCol(posicaoElemento)
            ? posicaoElemento + 1
            : -1
        ); // x4     3
        posicoes.push(
          posicaoElemento + numColunas < matrizDoJogo.length
            ? posicaoElemento + numColunas
            : -1
        ); // x6     4
        posicoes.push(
          posicoes[1] != -1 && posicoes[2] != -1
            ? posicaoElemento - numColunas - 1
            : -1
        ); // x0
        posicoes.push(
          posicoes[1] != -1 && posicoes[3] != -1
            ? posicaoElemento - numColunas + 1
            : -1
        ); // x2
        posicoes.push(
          posicoes[4] != -1 && posicoes[2] != -1
            ? posicaoElemento + numColunas - 1
            : -1
        ); // x0
        posicoes.push(
          posicoes[4] != -1 && posicoes[3] != -1
            ? posicaoElemento + numColunas + 1
            : -1
        ); // x2
      }
      for (let posicao of posicoes) revelar(posicao);
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
