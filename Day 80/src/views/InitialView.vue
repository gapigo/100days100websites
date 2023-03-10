<template>
  <div class="home">
    <div class="fimDeJogo" :class="{ hidden: !estadoFimDeJogo }">
      <h2>Fim de Jogo!</h2>
      <div class="ganhador1">
        <span>Detetive: </span>
        <span>Guto</span>
      </div>
      <div class="ganhador2">
        <span>Misterioso: </span>
        <span>Guto</span>
      </div>
      <h2 class="emoji">🥳🎊🎆</h2>
    </div>
    <div class="container" :class="{ blur: estadoFimDeJogo }">
      <form @submit.prevent="onSubmit" :class="{ hidden: !editando }">
        <label for="apelido">
          <span>Apelido</span>
          <input
            v-model.trim="apelido"
            name="apelido"
            id="apelido"
            type="text"
            placeholder="Guto"
          />
        </label>
        <label for="verdade1">
          <span>Verdade 1</span>
          <input
            v-model.trim="verdade1"
            name="verdade1"
            id="verdade1"
            type="text"
            placeholder="Eu nunca comi McDonalds..."
          />
        </label>
        <label for="verdade2">
          <span>Verdade 2</span>
          <input
            v-model.trim="verdade2"
            name="verdade2"
            id="verdade2"
            type="text"
            placeholder="Eu não sou uma pessoa competitiva..."
          />
        </label>
        <label for="mentira">
          <span>Mentira</span>
          <input
            v-model.trim="mentira"
            name="mentira"
            id="mentira"
            type="text"
            placeholder="Nunca andei de avião..."
          />
        </label>
        <button>Continuar</button>
      </form>
      <div class="game" :class="{ hidden: editando }">
        <div class="gameTop">
          <span class="currentPlayer"
            >Vez de:
            <span
              class="currentName"
              v-if="jogadorAtual && jogadorAtual.atual"
              >{{ jogadorAtual.atual.apelido }}</span
            >
          </span>
          <div class="buttons">
            <button @click="edit" class="edit">Editar</button>
            <button
              @click="parar"
              v-if="isUserHost() && estadoJogando"
              class="restart"
            >
              Parar
            </button>
            <button
              @click="comecar"
              v-if="isUserHost() && !estadoJogando"
              class="start"
            >
              Começar
            </button>
            <button
              @click="proximo"
              v-if="isUserHost() && estadoJogando"
              class="next"
            >
              Proximo
            </button>
          </div>
        </div>
        <div class="current" v-if="jogadorAtual">
          <div class="questionWrap" :class="jogadorAtual.estadoCampo1">
            <div class="clicar" @click="selecionar"></div>
            <div class="question" :questionCode="jogadorAtual.campo1.tag">
              <!-- <div class="questionWrap" :class="jogadorAtualObj.estadoCampo1"> -->
              <!-- <div class="question"> -->
              <button>
                <!-- <i class="fa-solid fa-question"></i> -->
                <i class="fa-sharp fa-solid fa-thumbtack"></i>
                <i class="fa-solid fa-square-check"></i>
                <i class="fa-solid fa-square-xmark"></i>
                <i class="fa-solid fa-angles-right"></i>
              </button>
              <div class="text">
                <span class="numeracao">Fato 1</span>
                <span>{{ jogadorAtual.campo1.frase }}</span>
              </div>
            </div>
            <div class="whoChose">
              <h2 class="achaQue">Acha que é mentira</h2>
              <div
                class="div"
                v-if="jogadorAtual.escolhas && jogadorAtual.escolhas.campo1"
              >
                <span
                  class="chooser"
                  v-for="escolhedor in jogadorAtual.escolhas.campo1"
                  >{{ escolhedor }}</span
                >
              </div>
            </div>
          </div>
          <div class="questionWrap" :class="jogadorAtual.estadoCampo2">
            <div class="clicar" @click="selecionar"></div>
            <div class="question" :questionCode="jogadorAtual.campo2.tag">
              <!-- <div class="questionWrap" :class="jogadorAtualObj.estadoCampo2"> -->
              <!-- <div class="question"> -->
              <button>
                <!-- <i class="fa-solid fa-question"></i> -->
                <i class="fa-sharp fa-solid fa-thumbtack"></i>
                <i class="fa-solid fa-square-check"></i>
                <i class="fa-solid fa-square-xmark"></i>
                <i class="fa-solid fa-angles-right"></i>
              </button>
              <div class="text">
                <span class="numeracao">Fato 2</span>
                <span>{{ jogadorAtual.campo2.frase }}</span>
              </div>
            </div>
            <div class="whoChose">
              <h2 class="achaQue">Acha que é mentira</h2>
              <div
                class="div"
                v-if="jogadorAtual.escolhas && jogadorAtual.escolhas.campo2"
              >
                <span
                  class="chooser"
                  v-for="escolhedor in jogadorAtual.escolhas.campo2"
                  >{{ escolhedor }}</span
                >
              </div>
            </div>
          </div>
          <div class="questionWrap" :class="jogadorAtual.estadoCampo3">
            <div class="clicar" @click="selecionar"></div>
            <div class="question" :questionCode="jogadorAtual.campo3.tag">
              <!-- <div class="questionWrap" :class="jogadorAtualObj.estadoCampo3"> -->
              <!-- <div class="question"> -->
              <button>
                <!-- <i class="fa-solid fa-question"></i> -->
                <i class="fa-sharp fa-solid fa-thumbtack"></i>
                <i class="fa-solid fa-square-check"></i>
                <i class="fa-solid fa-square-xmark"></i>
                <i class="fa-solid fa-angles-right"></i>
              </button>
              <div class="text">
                <span class="numeracao">Fato 3</span>
                <span>{{ jogadorAtual.campo3.frase }}</span>
              </div>
            </div>
            <div class="whoChose">
              <h2 class="achaQue">Acha que é mentira</h2>
              <div
                class="div"
                v-if="jogadorAtual.escolhas && jogadorAtual.escolhas.campo3"
              >
                <span
                  class="chooser"
                  v-for="escolhedor in jogadorAtual.escolhas.campo3"
                  >{{ escolhedor }}</span
                >
              </div>
            </div>
          </div>
        </div>
        <div class="players">
          <div v-for="jogador in jogadoresPontos" class="vPlayerWrap">
            <div
              class="playerWrap"
              v-if="jogador.apelido !== null && jogador.apelido !== ''"
            >
              <h2>{{ jogador.apelido }}</h2>
              <div class="points">
                <div class="detetive">
                  <h2>Detetive <i class="fa-solid fa-magnifying-glass"></i></h2>
                  <span>{{ jogador.detetive }}</span>
                </div>
                <div class="misterioso">
                  <h2>Misterioso <i class="fa-solid fa-user-secret"></i></h2>
                  <span>{{ jogador.misterio }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import { getAuth, signInAnonymously, onAuthStateChanged } from 'firebase/auth';
import {
  ref as firebaseRef,
  set as firebaseSet,
  get as firebaseGet,
  onDisconnect,
  onValue,
  update,
  onChildRemoved,
  query,
  child,
  get,
} from 'firebase/database';
import { db } from '../main.js';

const editando = ref(true);
const estadoFimDeJogo = ref(false);
const estadoJogando = ref(false);
const apelido = ref('');
const mentira = ref('');
const verdade1 = ref('');
const verdade2 = ref('');
const vPlayerObj = ref({});
const vPlayerId = ref(false);
const jogadoresPontos = ref([]);
const playersRefGlobal = ref([]);
const computaJogo = ref({});
const jogadorAtual = ref(null);

// const user = ref(null);
// const playerRef = ref(null);
// const player = ref(null);
// const allPlayersRef = ref(null);
// const allPlayers = ref(null);
let user;

function createHost(playerId) {
  const host = firebaseRef(db, `host/`);
  firebaseSet(host, playerId);
}

async function checkIfActualHostExists() {
  const allPlayersRef = firebaseRef(db, `players/`);
  let allPlayers = (await firebaseGet(query(allPlayersRef))).val();
  for (var player in allPlayers) {
    if (allPlayers[player].host) return true;
  }
  return false;
}

async function setHost(playerId) {
  if (!(await checkIfActualHostExists())) {
    return true;
  }
  const playerRef = firebaseRef(db, `players/${playerId}`);
  let player = await firebaseGet(query(playerRef));
  if (player.val() && player.val().host) {
    return true;
  }
  return false;
}

async function updatePlayer() {
  const playerId = user.uid;
  const playerRef = firebaseRef(db, `players/${playerId}`);
  const playerObj = {
    id: playerId,
    apelido: apelido.value,
    verdade1: verdade1.value,
    verdade2: verdade2.value,
    mentira: mentira.value,
    host: await setHost(playerId),
  };
  vPlayerObj.value = playerObj;
  return firebaseSet(playerRef, playerObj)
    .then((player) => player)
    .catch((error) => {
      console.error(error);
      return {};
    });
}

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function retornaEscolhas(ordemObj) {
  let resObj = {};
  resObj['campo1'] = false;
  resObj['campo2'] = false;
  resObj['campo3'] = false;
  return resObj;
}

function getRenderedEscolhasObj(jsonEscolhas, mapEscolhas) {
  // jsonEscolhas = {
  //   playerA: {
  //     t0: true,
  //     t1: false,
  //     t2: false
  //   },
  //   playerB: {
  //     t0: false,
  //     t1: false,
  //     t2: true
  //   }
  // }
  // mapEscolhas = ['t2', 't0', 't1']
  // return {campo1: ['rai'], campo2:  ['guto']}

  let resJson = {};

  console.log('mapEscolhas');
  console.log(mapEscolhas);

  for (let key in jsonEscolhas) {
    if (key in ['campo1', 'campo2', 'campo3']) continue;
    // let escolhaArray = [];
    // for (let jogadorId in jsonEscolhas[key]) {
    //   if (jsonEscolhas[key][jogadorId]) {
    //     escolhaArray.push(jogadorId);
    //   }
    // }
    // resJson[key] = escolhaArray;
    let playerName = key;
    let player = jsonEscolhas[key];
    let index = 0;
    for (let selectedTag in player) {
      if (player[selectedTag]) {
        let campoN = `campo${index}`;
        if (!resJson[`${campoN}`]) resJson[`${campoN}`] = [];
        resJson[`${campoN}`].push(playerName);
        continue;
      }
      index++;
    }
  }
  console.log('resJson');
  console.log(resJson);
  return resJson;
}

function getOrdemEmbaralho() {
  // return '2 1 3'
  let a = [2, 1, 3];
  a = shuffleArray(a);
  return a.join(' ');
}

export default {
  name: 'InitialView',
  components: {},
  methods: {
    onSubmit() {
      console.log(apelido.value, verdade1.value, verdade2.value, mentira.value);
      console.log('onSubmit');
      editando.value = false;
      updatePlayer();
      console.log(this.isUserHost());
    },
    edit() {
      editando.value = true;
    },
    comecar() {
      estadoJogando.value = true;
      const players = playersRefGlobal.status;
      let computaJogoObj = {};

      let ordem = [];
      let indexTag = 0;
      for (let playerId in players) {
        ordem.push({
          id: playerId,
          apelido: players[playerId].apelido,
          mentira: { frase: players[playerId].mentira, tag: `t${indexTag++}` },
          verdade1: {
            frase: players[playerId].verdade1,
            tag: `t${indexTag++}`,
          },
          verdade2: {
            frase: players[playerId].verdade2,
            tag: `t${indexTag++}`,
          },
        });
      }

      ordem = shuffleArray(ordem);

      computaJogoObj['ordem'] = ordem;
      computaJogoObj['atual'] = {
        index: 0,
        id: ordem[0].id,
        apelido: ordem[0].apelido,
      };
      computaJogoObj['ganhador'] = {
        ganhador1: '',
        ganhador2: '',
      };

      computaJogo.value = computaJogoObj;

      let atualObj = {};
      atualObj['mentira'] = ordem[0].mentira;
      atualObj['verdade1'] = ordem[0].verdade1;
      atualObj['verdade2'] = ordem[0].verdade2;
      atualObj['tagsEmbaralhadas'] = getOrdemEmbaralho();
      atualObj['jogador'] = ordem[0].apelido;
      atualObj['escolhas'] = retornaEscolhas(ordem[0]);

      firebaseSet(firebaseRef(db, `atual/`), atualObj);
    },
    proximo() {
      // estadoJogando.value = true;
      let estadoJogo = computaJogo.value;
      let atual = estadoJogo.atual.index;

      // todo DAR PONTOS E MOSTRAR CORRETA!

      if (atual + 1 === estadoJogo.ordem) {
        // finaliza jogo
        return;
      }
      atual++;
      estadoJogo['atual'] = {
        index: atual,
        id: estadoJogo.ordem[index].id,
        apelido: estadoJogo.ordem[index].apelido,
      };
      setTimeout(() => (computaJogo.value = estadoJogo), 5000);
    },
    parar() {
      // estadoJogando.value = true;
    },
    isUserHost() {
      return vPlayerObj.value.host;
    },
    async selecionar(e) {
      let tagCode = e.target.parentElement
        .querySelector('.question')
        .getAttribute('questionCode');
      let tagCodes = [
        jogadorAtual.value.campo1.tag,
        jogadorAtual.value.campo2.tag,
        jogadorAtual.value.campo3.tag,
      ];
      let apelido = vPlayerObj.value.apelido;
      let escolhasObj = {};
      escolhasObj = {};
      for (let tc of tagCodes) {
        escolhasObj[`${tc}`] = tc == tagCode ? true : false;
      }
      firebaseSet(firebaseRef(db, `atual/escolhas/${apelido}`), escolhasObj);
      return;
    },
  },
  setup() {
    onMounted(() => {
      console.log('EDITA');
      // editando.value = false;
    });
  },
  data() {
    return {
      apelido,
      mentira,
      verdade1,
      verdade2,
      estadoFimDeJogo,
      estadoJogando,
      editando,
      jogadoresPontos,
      jogadorAtual,
    };
  },
  beforeMount() {
    function setListeners() {
      console.log(`players/${user.uid}/host/`);
      onValue(firebaseRef(db, `players/${user.uid}/host/`), (snapshot) => {
        vPlayerObj.value.host = snapshot.val();

        // Checar jogadores, pontos
        if (snapshot.val()) {
          onValue(firebaseRef(db, `players/`), async (snapshot) => {
            const players = snapshot.val();
            playersRefGlobal.status = snapshot.val();
            let playersObject = {};
            let oldPontos = (
              await firebaseGet(query(firebaseRef(db, `pontos/`)))
            ).val();
            for (let playerId in players) {
              console.log('batata');
              // console.log(oldPontos.playerId);
              playersObject[playerId] = {
                apelido: players[playerId].apelido,
                detetive: oldPontos
                  ? oldPontos.playerId
                    ? oldPontos.playerId.detetive || 0
                    : 0
                  : 0,
                misterio: oldPontos
                  ? oldPontos.playerId
                    ? oldPontos.playerId.misterio || 0
                    : 0
                  : 0,
              };
            }
            firebaseSet(firebaseRef(db, `pontos/`), playersObject);
          });
        }
      });

      onValue(firebaseRef(db, `pontos/`), (snapshot) => {
        console.log('onPontos');
        jogadoresPontos.value = snapshot.val();
        console.log('onPontos2');
      });

      onValue(firebaseRef(db, `atual/`), async (snapshot) => {
        if (snapshot.val() == {} || snapshot.val() == null || !snapshot.val())
          return;
        let jogadorAtualVal = snapshot.val();
        let arrayEmbaralhado = jogadorAtualVal.tagsEmbaralhadas.split(' ');
        function getFato(num) {
          if (num == 1) return jogadorAtualVal.mentira;
          if (num == 2) return jogadorAtualVal.verdade1;
          return jogadorAtualVal.verdade2;
        }
        let estados = await firebaseGet(
          query(firebaseRef(db, `atual/escolhas/${vPlayerObj.apelido}`))
        );
        function getEstado(tag) {
          if (!estados) return 'choosing';
          if (!estados.val()) return 'choosing';

          estados = estados.val();
          let selecionado = true;
          for (let tagCode in estados) {
            selecionado;
          }
        }
        console.log('jogadorAtualVal');
        console.log(jogadorAtualVal);
        let jogadorAtualObj = {
          campo1: getFato(arrayEmbaralhado[0]),
          campo2: getFato(arrayEmbaralhado[1]),
          campo3: getFato(arrayEmbaralhado[2]),
          estadoCampo1: getEstado(getFato(arrayEmbaralhado[0]).tag),
          estadoCampo2: getEstado(getFato(arrayEmbaralhado[1]).tag),
          estadoCampo3: getEstado(getFato(arrayEmbaralhado[2]).tag),
          apelido: jogadorAtualVal.jogador,
          escolhas: getRenderedEscolhasObj(
            jogadorAtualVal.escolhas,
            arrayEmbaralhado.map((e) => getFato(e))
          ),
        };
        jogadorAtual.value = jogadorAtualObj;
        console.log('jogadorAtual');
        console.log(jogadorAtual.value);
        console.log({ ...jogadorAtual.value });
      });
    }

    const auth = getAuth();
    onAuthStateChanged(auth, async (u) => {
      if (u) {
        user = u;
        vPlayerId.value = user.uid;
        await updatePlayer();
        const playerRef = firebaseRef(db, `players/${user.uid}`);
        const allPlayersRef = firebaseRef(db, `players/`);

        onChildRemoved(allPlayersRef, async (disconnectedPlayer) => {
          if (disconnectedPlayer.val().host) {
            let allPlayers = (await firebaseGet(query(allPlayersRef))).val();
            for (let p in allPlayers) {
              const newHost = firebaseRef(db, `players/${allPlayers[p].id}`);
              const hostData = (await firebaseGet(query(newHost))).val();
              if (!hostData.host) {
                firebaseSet(newHost, { ...hostData, host: true });
              }
              break;
            }
          }
        });
        onDisconnect(playerRef).remove();
        setListeners();
      } else {
        // error on login
      }
    });
    signInAnonymously(auth)
      .then(() => {
        console.log('Logado 😱');
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;

        console.error(errorCode, errorMessage);
      });
  },
};
</script>

<style>
form {
  display: flex;
  flex-direction: column;
  width: 100%;
}

.home {
  display: flex;
  justify-content: center;
  width: 100%;
  align-items: center;
  color: #44165f;
  flex-direction: column;
}

.container {
  width: 50%;
}

label {
  display: flex;
  flex-direction: column;
  margin: 0.5rem 0;
}

label input {
  height: 35px;
  padding-left: 8px;
}

label span {
  font-size: 18px;
  margin-bottom: 0.3rem;
  font-weight: 500;
}

form button {
  margin-top: 1rem;
  height: 45px;
  color: #f1f1f1;
  font-size: 20px;
  cursor: pointer;
  font-weight: 400;
  border: none;
  border-radius: 5px;
  background: rgba(155, 25, 231);
}

form button:hover {
  background: rgba(155, 25, 231, 0.75);
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
  backdrop-filter: blur(4px);
  -webkit-backdrop-filter: blur(4px);
  border: 1px solid rgba(255, 255, 255, 0.18);
}

@media (max-width: 768px) {
  form {
    width: 100%;
    margin: 0 10px;
  }
}

.game {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.gameTop {
  display: flex;
  justify-content: space-between;
  padding: 5px;
  align-items: center;
}

.currentPlayer {
  font-size: 2rem;
}

.currentName {
  font-weight: 600;
  text-decoration: underline;
}

.buttons {
  display: flex;
  padding: 1rem;
  justify-content: space-between;
  gap: 1rem;
}

.buttons button {
  margin-top: 1rem;
  height: 45px;
  color: #f1f1f1;
  font-size: 20px;
  cursor: pointer;
  font-weight: 400;
  border: none;
  border-radius: 5px;
  background: rgba(155, 25, 231);
  padding: 1rem;
  align-items: center;
  display: flex;
}

.buttons button:hover {
  background: rgba(155, 25, 231, 0.75);
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
  backdrop-filter: blur(4px);
  -webkit-backdrop-filter: blur(4px);
  border: 1px solid rgba(255, 255, 255, 0.18);
}

.questionWrap {
  position: relative;
  display: flex;
  justify-content: space-between;
  padding: 1rem;
}

.question {
  display: flex;
  gap: 10px;
  justify-content: space-between;
  flex: 3;
  align-items: center;
}

.question button {
  height: 2rem;
  min-width: 2rem;
  text-align: center;
  border-radius: 50%;
  font-size: 1rem;
  color: #44165f;
  border: solid 1px #44165f;
}

.question .text {
  width: 100%;
  border: 1px solid #44165f;
  padding: 8px;
  display: flex;
  align-items: initial;
  justify-content: center;
  flex-direction: column;
}

.question .text .numeracao {
  font-weight: 600;
}

.questionWrap.choosing {
  cursor: pointer;
}

.questionWrap i {
  display: none;
}

.questionWrap.choosing .fa-angles-right {
  display: block;
}

.questionWrap.marked .fa-thumbtack {
  display: block;
}

.questionWrap.marked {
  color: #ffa704;
}

.questionWrap.marked .text {
  border: 1px solid #ffa704;
}

.questionWrap.marked button {
  border: 1px solid #ffa704;
  color: #ffa704;
}

.questionWrap.lie .fa-square-xmark {
  display: block;
}

.questionWrap.lie {
  color: #b91d1d;
  opacity: 0.4;
  user-select: none;
}

.questionWrap.lie .text {
  border: 1px solid #b91d1d;
}

.questionWrap.lie button {
  border: 1px solid #b91d1d;
  color: #b91d1d;
}

.questionWrap.truth .fa-square-check {
  display: block;
}

.questionWrap.truth {
  color: #1db944;
}

.questionWrap.truth .text {
  border: 1px solid #1db944;
}

.questionWrap.truth button {
  border: 1px solid #1db944;
  color: #1db944;
}

.questionWrap.choosing button {
  cursor: pointer;
}

.questionWrap.choosing:hover .text {
  /* width: 100%; */
  text-decoration: underline;
}

.whoChose {
  flex: 2;
  display: flex;
  flex-direction: column;
  padding: 10px;
}

.whoChose div {
  flex: 2;
  display: flex;
  justify-content: initial;
  gap: 4px;
  flex-direction: row;
}

.whoChose .achaQue {
  font-size: inherit;
}

.players {
  display: flex;
  flex-wrap: wrap;
}

.players .playerWrap {
  width: 13rem;
  border: solid 1px #44165f;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  padding: 10px 0;
}

.players .playerWrap .points {
  display: flex;
  gap: 2px;
}

.players .playerWrap .points div {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.players .playerWrap .points .misterioso {
  border-left: solid 1px #44165f;
  padding-left: 2px;
}

.players .playerWrap .points h2 {
  font-size: 1rem;
  white-space: nowrap;
}

.players .playerWrap .points span {
  font-size: 2rem;
}

.fimDeJogo {
  z-index: 90;
  position: absolute;
  top: 5rem;
  background: #fff;
  width: 40%;
  min-height: 30%;
  box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.37);
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem;
  filter: none;
}

.fimDeJogo h2 {
  margin-bottom: 2rem;
}

.fimDeJogo div span {
  font-size: 2rem;
}

.fimDeJogo div span:nth-child(2) {
  font-weight: bold;
  text-decoration: underline;
}

.fimDeJogo .emoji {
  font-size: 5rem;
}

.blur {
  filter: blur(2px);
}

.hidden {
  display: none;
}

.clicar {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 99;
  background: transparent;
}
</style>
