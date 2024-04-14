import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useBaseStore = defineStore('session', () => {
  const loading = ref(false);
  return { loading };
});
