<template>
  <p class="read-the-docs text-2xl">
    Click on the Vite and Vue logos to learn more {{ testData }}
  </p>
  <p class="text-red-500 text-2xl">My Digilearn Saas</p>
</template>

<script>
export default {
  name: "Testing Component",
  data() {
    return {
      testData: 1,
    };
  },
};
</script>
