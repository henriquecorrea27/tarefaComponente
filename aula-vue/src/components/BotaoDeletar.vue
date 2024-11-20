<template>
    <button @click="$emit('click')">
      <i class="fas fa-trash"></i>
    </button>
  </template>
  
  <script>
  export default {
    name: "BotaoDeletar",
  };
  </script>
  