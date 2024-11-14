<template>
  <div>
    <h2>Listagem de Pilotos</h2>
    <div v-if="pilotos.length === 0">
      <p>Nenhum piloto cadastrado.</p>
    </div>
    <ul>
      <li v-for="piloto in pilotos" :key="piloto.id">
        {{ piloto.nome }} - Nº {{ piloto.numero }} ({{ piloto.equipe }})
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      pilotos: [],
    };
  },
  async created() {
    try {
      const response = await fetch("http://localhost:3000/pilotos");
      this.pilotos = await response.json();
    } catch (error) {
      console.error("Erro ao buscar pilotos:", error);
    }
  },
};
</script>
