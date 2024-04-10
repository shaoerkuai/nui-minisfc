import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useSessionStore = defineStore('session', () => {
  const logged = ref(false);
  const name = ref('--');
  const dept = ref('--');

  function isLogged() {
    return logged.value === true;
  }

  return { logged, name, dept, isLogged };
});
