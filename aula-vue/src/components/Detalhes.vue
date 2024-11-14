<template>
  <div>
    <h2>Detalhes do Piloto</h2>
    <!-- Verifique se o piloto foi carregado -->
    <div v-if="piloto">
      <p><strong>Nome:</strong> {{ piloto.nome }}</p>
      <p><strong>Número:</strong> {{ piloto.numero }}</p>
      <p><strong>Equipe:</strong> {{ piloto.equipe }}</p>
    </div>
    <!-- Caso o piloto ainda não tenha sido carregado, mostre uma mensagem de carregamento -->
    <div v-else>
      <p>Carregando dados do piloto...</p>
    </div>
    <button @click="voltarParaListagem">Voltar para Listagem</button>
  </div>
</template>

<script>
export default {
  props: ["id"], // Recebe o ID como prop
  data() {
    return {
      piloto: null, // Variável para armazenar os dados do piloto
    };
  },
  async mounted() {
    await this.buscarPiloto();
  },
  watch: {
    // Caso o ID mude, recarrega os dados
    id(newId) {
      this.buscarPiloto(newId);
    },
  },
  methods: {
    // Método para buscar o piloto pelo ID
    async buscarPiloto() {
      try {
        console.log(this.id);
        const response = await fetch(`http://localhost:3000/pilotos/1`);

        if (response.ok) {
          this.piloto = await response.json();
          console.log(this.piloto); // Exibe o conteúdo do piloto no console para depuração
        } else {
          console.error("Piloto não encontrado.");
          this.piloto = null; // Garantir que piloto seja null se não encontrado
        }
      } catch (error) {
        console.error("Erro ao buscar detalhes do piloto:", error);
        this.piloto = null; // Garantir que piloto seja null em caso de erro
      }
    },
    voltarParaListagem() {
      this.$router.push("/"); // Redireciona para a página de listagem
    },
  },
};
</script>
