<template>
  <div class="container mt-5">
    <h2 class="text-center mb-4">Listagem de Pilotos</h2>
    
    <div class="d-flex justify-content-end mb-3">
      <BotaoCadastro @click="irParaCadastro" class="btn btn-primary" />
    </div>

    <NenhumPiloto v-if="pilotos.length === 0" class="alert alert-warning text-center" />

    <div v-if="pilotos.length > 0" class="table-responsive">
      <table class="table table-bordered table-striped">
        <thead class="thead-dark">
          <tr>
            <th>Nome</th>
            <th>Número</th>
            <th>Equipe</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(piloto, index) in pilotos" :key="piloto.id">
            <td>{{ piloto.nome }}</td>
            <td>{{ piloto.numero }}</td>
            <td>{{ piloto.equipe }}</td>
            <td class="text-end">
              <button class="btn btn-info btn-sm" @click="verDetalhes(piloto.id)">
                <i class="bi bi-eye"></i> <!-- Ícone de visualizar -->
              </button>
              <button class="btn btn-danger btn-sm" @click="deletePiloto(index, piloto)">
                <i class="bi bi-trash"></i> <!-- Ícone de deletar -->
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
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
    async deletePiloto(index, piloto) {
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
