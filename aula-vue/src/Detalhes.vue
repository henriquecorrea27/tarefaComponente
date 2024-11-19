<template>
  <div class="container mt-5">
    <h2 class="text-center mb-4">Detalhes do Piloto</h2>
    <Carregando v-if="!piloto" class="text-center" />

    <div v-else class="d-flex align-items-center card detalhes-piloto-card mx-auto p-4 shadow">
      <h3 class="card-title text-center mb-3">{{ piloto.nome }}</h3>

      <div class="card-body row">

        <div class="col-md-4">
          <p><strong>Número:</strong> {{ piloto.numero }}</p>
        </div>

        <div class="col-md-4">
          <p><strong>Equipe:</strong> {{ piloto.equipe }}</p>
        </div>

        <div class="col-md-4">
          <p><strong>Nacionalidade:</strong> {{ piloto.nacionalidade }}</p>
        </div>

        <div class="col-md-4">
          <p><strong>Idade:</strong> {{ idade }}</p>
        </div>

        <div class="col-md-4">
          <p><strong>Vitórias:</strong> {{ piloto.vitorias }}</p>
        </div>

        <div class="col-md-4">
          <p><strong>Altura:</strong> {{ piloto.altura }}</p>
        </div>
        
      </div>
    </div>

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
  computed: {
    idade() {
      if (!this.piloto?.nascimento) return "Data não informada";
      const hoje = new Date();
      const nascimento = new Date(this.piloto.nascimento);
      let idade = hoje.getFullYear() - nascimento.getFullYear();
      const mesAtual = hoje.getMonth();
      const mesNascimento = nascimento.getMonth();

      // Ajusta a idade caso o aniversário ainda não tenha ocorrido neste ano
      if (mesAtual < mesNascimento || (mesAtual === mesNascimento && hoje.getDate() < nascimento.getDate())) {
        idade--;
      }
      return idade;
    },
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