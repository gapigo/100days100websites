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
      <form @submit.prevent="onSubmit">
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
      <div class="game">
        <div class="gameTop">
          <span class="currentPlayer"
            >Vez de: <span class="currentName">Guto</span>
          </span>
          <div class="buttons">
            <button class="edit">Editar</button>
            <button class="restart">Recomeçar</button>
          </div>
        </div>
        <div class="current">
          <div class="questionWrap choosing">
            <div class="question" questionCode="">
              <button>
                <!-- <i class="fa-solid fa-question"></i> -->
                <i class="fa-sharp fa-solid fa-thumbtack"></i>
                <i class="fa-solid fa-square-check"></i>
                <i class="fa-solid fa-square-xmark"></i>
                <i class="fa-solid fa-angles-right"></i>
              </button>
              <div class="text">
                <span class="numeracao">Fato 1</span>
                <span
                  >Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed
                  ipsam provident ipsum incidunt rerum porro architecto, alias
                  explicabo quasi aperiam minima tenetur eligendi deleniti.
                  Numquam omnis voluptas dolor inventore assumenda!</span
                >
              </div>
            </div>
            <div class="whoChose">
              <h2 class="achaQue">Acha que é mentira</h2>
              <div class="div">
                <span class="chooser">Biel</span>
                <span class="chooser">Tony</span>
                <span class="chooser">Guto</span>
              </div>
            </div>
          </div>
          <div class="questionWrap lie">
            <div class="question" questionCode="">
              <button>
                <!-- <i class="fa-solid fa-question"></i> -->
                <i class="fa-sharp fa-solid fa-thumbtack"></i>
                <i class="fa-solid fa-square-check"></i>
                <i class="fa-solid fa-square-xmark"></i>
                <i class="fa-solid fa-angles-right"></i>
              </button>
              <div class="text">
                <span class="numeracao">Fato 1</span>
                <span
                  >Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed
                  ipsam provident ipsum incidunt rerum porro architecto, alias
                  explicabo quasi aperiam minima tenetur eligendi deleniti.
                  Numquam omnis voluptas dolor inventore assumenda!</span
                >
              </div>
            </div>
            <div class="whoChose">
              <h2 class="achaQue">Acha que é mentira</h2>
              <div class="div">
                <span class="chooser">Biel</span>
                <span class="chooser">Tony</span>
                <span class="chooser">Guto</span>
              </div>
            </div>
          </div>
          <div class="questionWrap marked">
            <div class="question" questionCode="">
              <button>
                <!-- <i class="fa-solid fa-question"></i> -->
                <i class="fa-sharp fa-solid fa-thumbtack"></i>
                <i class="fa-solid fa-square-check"></i>
                <i class="fa-solid fa-square-xmark"></i>
                <i class="fa-solid fa-angles-right"></i>
              </button>
              <div class="text">
                <span class="numeracao">Fato 1</span>
                <span
                  >Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed
                  ipsam provident ipsum incidunt rerum porro architecto, alias
                  explicabo quasi aperiam minima tenetur eligendi deleniti.
                  Numquam omnis voluptas dolor inventore assumenda!</span
                >
              </div>
            </div>
            <div class="whoChose">
              <h2 class="achaQue">Acha que é mentira</h2>
              <div class="div">
                <span class="chooser">Biel</span>
                <span class="chooser">Tony</span>
                <span class="chooser">Guto</span>
              </div>
            </div>
          </div>
          <div class="questionWrap truth">
            <div class="question" questionCode="">
              <button>
                <!-- <i class="fa-solid fa-question"></i> -->
                <i class="fa-sharp fa-solid fa-thumbtack"></i>
                <i class="fa-solid fa-square-check"></i>
                <i class="fa-solid fa-square-xmark"></i>
                <i class="fa-solid fa-angles-right"></i>
              </button>
              <div class="text">
                <span class="numeracao">Fato 1</span>
                <span
                  >Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed
                  ipsam provident ipsum incidunt rerum porro architecto, alias
                  explicabo quasi aperiam minima tenetur eligendi deleniti.
                  Numquam omnis voluptas dolor inventore assumenda!</span
                >
              </div>
            </div>
            <div class="whoChose">
              <h2 class="achaQue">Acha que é mentira</h2>
              <div class="div">
                <span class="chooser">Biel</span>
                <span class="chooser">Tony</span>
                <span class="chooser">Guto</span>
              </div>
            </div>
          </div>
        </div>
        <div class="players">
          <div class="playerWrap">
            <h2>Name</h2>
            <div class="points">
              <div class="detetive">
                <h2>Detetive <i class="fa-solid fa-magnifying-glass"></i></h2>
                <span>0</span>
              </div>
              <div class="misterioso">
                <h2>Misterioso <i class="fa-solid fa-user-secret"></i></h2>
                <span>0</span>
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

let user;

function createHost(playerId) {
  const host = firebaseRef(db, `host/`);
  console.log('playerId');
  console.log(playerId);
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
  if (!(await checkIfActualHostExists())) return true;
  const playerRef = firebaseRef(db, `players/${playerId}`);
  let player = await firebaseGet(query(playerRef));
  if (player && player.val().host) return true;
  return false;
}

async function updatePlayer() {
  const playerId = user.uid;
  const playerRef = firebaseRef(db, `players/${playerId}`);
  return firebaseSet(playerRef, {
    id: playerId,
    apelido: apelido.value,
    verdade1: verdade1.value,
    verdade2: verdade2.value,
    mentira: mentira.value,
    host: await setHost(playerId),
  })
    .then((player) => player)
    .catch((error) => {
      console.log(error);
      return {};
    });
}

export default {
  name: 'InitialView',
  components: {},
  methods: {
    onSubmit() {
      console.log(apelido.value, verdade1.value, verdade2.value, mentira.value);
      // const playerRef = firebaseRef(db, `players/${user.uid}`);
      updatePlayer();
    },
  },
  data() {
    return {
      apelido: '',
      mentira: '',
      verdade1: '',
      verdade2: '',
      estadoFimDeJogo: false,
    };
  },
  beforeMount() {
    const auth = getAuth();
    onAuthStateChanged(auth, async (u) => {
      if (u) {
        user = u;
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
  /* width: 100%; */
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
</style>
