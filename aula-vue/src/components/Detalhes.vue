<template>
  <div>
    <h2>Detalhes do Piloto</h2>
    <p><strong>Nome:</strong> {{ piloto.nome }}</p>
    <p><strong>Número:</strong> {{ piloto.numero }}</p>
    <p><strong>Equipe:</strong> {{ piloto.equipe }}</p>
    <button @click="$router.push('/listagem')">Voltar para Listagem</button>
  </div>
</template>

<script>
export default {
  props: ["pilotos"],
  computed: {
    piloto() {
      return this.pilotos[this.$route.params.id];
    },
  },
};
</script>
