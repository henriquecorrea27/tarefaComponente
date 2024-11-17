<template>
  <div>
    <h2>Listagem de Pilotos</h2>
    <BotaoCadastro @click="irParaCadastro" />
    <NenhumPiloto v-if="pilotos.length === 0" />
    <PilotoLista
      :pilotos="pilotos"
      @verDetalhes="verDetalhes"
      @deletePiloto="deletePiloto"
    />
  </div>
</template>

<script>
import BotaoCadastro from './components/BotaoCadastro.vue';
import NenhumPiloto from './components/NenhumPiloto.vue';
import PilotoLista from './components/PilotoLista.vue';

export default {
  components: { BotaoCadastro, NenhumPiloto, PilotoLista },
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
      
      // Exibe a caixa de confirmação
      const confirmar = window.confirm(`Tem certeza que deseja remover ${piloto.nome}?`);
      
      // Se o usuário clicar em "OK", remove o piloto
      if (confirmar) {
        try {
          const response = await fetch(
            `http://localhost:3000/pilotos/${piloto.id}`,
            { method: "DELETE" }
          );
          if (response.ok) {
            this.pilotos.splice(index, 1); // Remove o piloto da lista
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
