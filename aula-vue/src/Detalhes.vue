<template>
  <div class="container mt-5">
    <h2 class="text-center mb-4">Detalhes do Piloto</h2>
    <!-- Componente de Carregamento -->
    <Carregando v-if="!piloto" class="text-center" />
    
    <!-- Exibição de Detalhes -->
    <div v-else class="card detalhes-piloto-card mx-auto p-4 shadow">
      <h4 class="card-title text-center mb-3">{{ piloto.nome }}</h4>
      
      <div class="card-body">
        <p><strong>Número:</strong> {{ piloto.numero }}</p>
        <p><strong>Equipe:</strong> {{ piloto.equipe }}</p>
        <!-- Outros detalhes podem ser adicionados aqui -->
      </div>
    </div>

    <!-- Botão Voltar -->
    <div class="text-center mt-4">
      <BotaoVoltar @click="voltarParaListagem" class="btn btn-primary" />
    </div>
  </div>
</template>

<script>
import Carregando from "./components/Carregando.vue";
import BotaoVoltar from "./components/BotaoVoltar.vue";

export default {
  name: "DetalhesPiloto",
  props: ["id"],
  data() {
    return {
      piloto: null,
    };
  },
  async mounted() {
    await this.buscarPiloto();
  },
  watch: {
    id(newId) {
      this.buscarPiloto(newId); // Recarregar os dados quando o `id` mudar
    },
  },
  methods: {
    async buscarPiloto() {
      try {
        const response = await fetch(`http://localhost:3000/pilotos/${this.$route.params.id}`);

        if (response.ok) {
          this.piloto = await response.json();
        } else {
          console.error("Piloto não encontrado.");
          this.piloto = null;
        }
      } catch (error) {
        console.error("Erro ao buscar detalhes do piloto:", error);
        this.piloto = null;
      }
    },
    voltarParaListagem() {
      this.$router.push("/");
    },
  },
  components: { Carregando, BotaoVoltar },
};
</script>
