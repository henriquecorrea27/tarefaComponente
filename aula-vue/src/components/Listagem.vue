<template>
  <div>
    <h2>Listagem de Pilotos</h2>
    <button @click="irParaCadastro">Cadastrar Novo Piloto</button>

    <div v-if="pilotos.length === 0">
      <p>Nenhum piloto cadastrado.</p>
    </div>

    <ul>
      <li v-for="(piloto, index) in pilotos" :key="piloto.id">
        {{ piloto.nome }} - Nº {{ piloto.numero }} ({{ piloto.equipe }})

        <!-- Botão de Detalhes -->
        <button @click="verDetalhes(piloto.id)">
          <i class="fas fa-eye"></i>
        </button>

        <!-- Botão de Deletar -->
        <button @click="deletePiloto(index)">
          <i class="fas fa-trash"></i>
        </button>
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
  methods: {
    irParaCadastro() {
      this.$router.push("/cadastro");
    },
    async deletePiloto(index) {
      const piloto = this.pilotos[index];
      if (confirm(`Tem certeza que deseja remover ${piloto.nome}?`)) {
        try {
          const response = await fetch(
            `http://localhost:3000/pilotos/${piloto.id}`,
            { method: "DELETE" }
          );
          if (response.ok) {
            this.pilotos.splice(index, 1);
            alert("Piloto removido com sucesso.");
          } else {
            alert("Erro ao remover piloto.");
          }
        } catch (error) {
          console.error("Erro na requisição:", error);
        }
      }
    },
    verDetalhes(id) {
      this.$router.push(`/detalhes/${id}`);
    },
  },
};
</script>
