import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

import { ref, onUnmounted, computed } from 'vue';

const firebaseConfig = {
  apiKey: 'AIzaSyCeZpBgqQ-OQpZhV9ioCnGsyH23SGgEbJI',
  authDomain: 'vue-chat-app-df0e6.firebaseapp.com',
  projectId: 'vue-chat-app-df0e6',
  storageBucket: 'vue-chat-app-df0e6.appspot.com',
  messagingSenderId: '473623884556',
  appId: '1:473623884556:web:33bee52fdbb1335773cf29',
  measurementId: 'G-KSKT53YJ8P',
};

firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();

export function useAuth() {
  const user = ref(null);
  const unsubscribe = auth.onAuthStateChanged((_user) => (user.value = _user));
  onUnmounted(unsubscribe);
  const isLogin = computed(() => user.value !== null);

  const signIn = async () => {
    const googleProvider = new firebase.auth.GoogleAuthProvider();
    await auth.signInWithPopup(googleProvider);
  };

  const signOut = () => auth.signOut();

  return { user, isLogin, signIn, signOut };
}

const firestore = firebase.firestore();
const messagesCollection = firestore.collection('messages');
const messagesQuery = messagesCollection
  .orderBy('createdAt', 'desc')
  .limit(100);

export function useChat() {
  const messages = ref([]);
  const unsubscribe = messagesQuery.onSnapshot((snapshot) => {
    messages.value = snapshot.docs
      .map((doc) => ({ id: doc.id, ...doc.data() }))
      .reverse();
  });
  onUnmounted(unsubscribe);

  const { user, isLogin } = useAuth();
  const sendMessage = (text) => {
    if (!isLogin.value) return;
    const { photoUrl, uid, displayName } = user.value;
    messagesCollection.add({
      userName: displayName,
      userId: uid,
      userPhotoURL: photoUrl,
      text,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
    });
  };

  return { messages, sendMessage };
}
