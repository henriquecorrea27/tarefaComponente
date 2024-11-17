<template>
  <div>
    <h2>Detalhes do Piloto</h2>
    <Carregando v-if="!piloto" />
    <div v-else>
      <!-- Exibindo as informações do piloto -->
      <p>{{ piloto.nome }}</p>
      <p>{{ piloto.numero }}</p>
      <p>{{ piloto.equipe }}</p>
      <!-- Adicione outros detalhes do piloto aqui -->
    </div>
    <BotaoVoltar @click="voltarParaListagem" />
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
