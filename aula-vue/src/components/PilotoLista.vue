<template>
    <ul>
      <li v-for="(piloto, index) in pilotos" :key="piloto.id">
        {{ piloto.nome }} - Nº {{ piloto.numero }} ({{ piloto.equipe }})
        <BotaoDetalhes @click="$emit('verDetalhes', piloto.id)" />
        <BotaoDeletar @click="$emit('deletePiloto', index)" />
      </li>
    </ul>
  </template>
  
  <script>
  import BotaoDetalhes from './BotaoDetalhes.vue';
  import BotaoDeletar from './BotaoDeletar.vue';
  
  export default {
    name: "PilotoLista",
    props: {
      pilotos: Array,
    },
    components: { BotaoDetalhes, BotaoDeletar },
  };
  </script>
  