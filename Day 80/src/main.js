import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import './style.css';
import { getDatabase } from 'firebase/database';
import { initializeApp } from 'firebase/app';

const firebaseConfig = {
  apiKey: 'AIzaSyAg1csdrBYBdgnXNsdbM2-pC9-YQVaONq8',
  authDomain: 'verdade-mentira.firebaseapp.com',
  databaseURL: 'https://verdade-mentira-default-rtdb.firebaseio.com',
  projectId: 'verdade-mentira',
  storageBucket: 'verdade-mentira.appspot.com',
  messagingSenderId: '888439492702',
  appId: '1:888439492702:web:90a154e304497ad098a4cf',
  measurementId: 'G-X15ZSR637Y',
};

initializeApp(firebaseConfig);
const db = getDatabase();

console.log('entrou aqui');

createApp(App).use(router).mount('#app');

export { db };
