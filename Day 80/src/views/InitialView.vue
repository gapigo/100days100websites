<template>
  <h1>
    {{ jota }}
  </h1>
  <div class="home">
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
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import { getAuth, signInAnonymously, onAuthStateChanged } from 'firebase/auth';

// getAuth().onAuthStateChanged((user) => {
//   console.log(user);
// });

// getAuth()
//   .signInAnonymously()
//   .catch((error) => {
//     var errorCode = error.code;
//     var errorMessage = error.message;

//     console.error(errorCode, errorMessage);
//   });

export default {
  name: 'InitialView',
  components: {},
  methods: {
    onSubmit() {
      console.log(apelido.value, verdade1.value, verdade2.value, mentira.value);
    },
  },
  data() {
    return {
      apelido: '',
      mentira: '',
      verdade1: '',
      verdade2: '',
    };
  },
  beforeMount() {
    // getAuth().onAuthStateChanged((user) => {
    //   console.log(user);
    // });
    // getAuth()
    //   .signInAnonymously()
    //   .catch((error) => {
    //     var errorCode = error.code;
    //     var errorMessage = error.message;
    //     console.error(errorCode, errorMessage);
    //   });
    const auth = getAuth();
    signInAnonymously(auth)
      .then(() => {
        console.log('Logado 😱');
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;

        console.error(errorCode, errorMessage);
      });
    onAuthStateChanged(auth, (user) => {
      console.log(user);
      if (user) {
        console.log(user.uid);
      } else {
      }
    });
  },
};
</script>

<style>
form {
  display: flex;
  flex-direction: column;
  width: 50%;
}

.home {
  display: flex;
  justify-content: center;
  width: 100%;
  align-items: center;
  color: #44165f;
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
</style>
