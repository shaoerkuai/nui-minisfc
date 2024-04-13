import { defineStore } from 'pinia';
import { ref } from 'vue';
import constants from '../assets/constants.json';

export const useSessionStore = defineStore('session', () => {
  const logged = ref(false);
  const name = ref('--');
  const dept = ref('--');
  const avatarLink = ref(
    '',
  );

  function isLogged() {
    return logged.value === true;
  }

  function clearState() {
    logged.value = false;
    name.value = constants.anonymousName;
    dept.value = constants.anonymousDept;
    avatarLink.value = constants.avatarUrl;
  }

  return { logged, name, dept, avatarLink, isLogged, clearState };
});
