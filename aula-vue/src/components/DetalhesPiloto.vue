<template>
    <div>
      <p><strong>Nome:</strong> {{ piloto.nome }}</p>
      <p><strong>Número:</strong> {{ piloto.numero }}</p>
      <p><strong>Equipe:</strong> {{ piloto.equipe }}</p>
    </div>
  </template>
  
  <script>
  export default {
    name: "DetalhesPiloto",
    props: {
      piloto: {
        type: Object,
        required: true,
      },
    },
  };
  </script>
  