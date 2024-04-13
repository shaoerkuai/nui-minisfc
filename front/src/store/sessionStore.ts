import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useSessionStore = defineStore('session', () => {
  const logged = ref(false);
  const name = ref('--');
  const dept = ref('--');
  const avatarLink = ref(
    'https://gw.alipayobjects.com/zos/antfincdn/aPkFc8Sj7n/method-draw-image.svg',
  );

  function isLogged() {
    return logged.value === true;
  }

  function clearState() {
    logged.value = false;
    name.value = '--';
    dept.value = '--';
    avatarLink.value = '';
  }

  return { logged, name, dept, avatarLink, isLogged, clearState };
});
