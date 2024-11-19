<template>
  <div class="container mt-5">
    <h2 class="text-center mb-4">Cadastro de Pilotos de F1</h2>
    <form @submit.prevent="addPiloto" class="row g-3">
      
      <div class="col-md-3">
        <label for="nome" class="form-label">Nome do Piloto</label>
        <input
          id="nome"
          type="text"
          v-model="novoPiloto.nome"
          class="form-control"
          placeholder="Nome"
          required
        />
      </div>
      
      <div class="col-md-3">
        <label for="numero" class="form-label">Número do Piloto</label>
        <input
          id="numero"
          type="number"
          v-model="novoPiloto.numero"
          class="form-control"
          placeholder="Número"
          required
        />
      </div>
      
      <div class="col-md-3">
        <label for="equipe" class="form-label">Equipe</label>
        <input
          id="equipe"
          type="text"
          v-model="novoPiloto.equipe"
          class="form-control"
          placeholder="Equipe"
          required
        />
      </div>
      
      <div class="col-md-3">
        <label for="nacionalidade" class="form-label">Nacionalidade</label>
        <input
          id="nacionalidade"
          type="text"
          v-model="novoPiloto.nacionalidade"
          class="form-control"
          placeholder="País"
        />
      </div>
      
      <div class="col-md-3">
        <label for="nascimento" class="form-label">Data de Nascimento</label>
        <input
          id="nascimento"
          type="date"
          v-model="novoPiloto.nascimento"
          class="form-control"
        />
      </div>
      
      <div class="col-md-3">
        <label for="vitorias" class="form-label">Vitórias na Carreira</label>
        <input
          id="vitorias"
          type="number"
          v-model="novoPiloto.vitorias"
          class="form-control"
          min="0"
        />
      </div>
      
      <div class="col-md-3">
        <label for="altura" class="form-label">Altura (cm)</label>
        <input
          id="altura"
          type="number"
          v-model="novoPiloto.altura"
          class="form-control"
          min="100"
          max="250"
        />
      </div>
      
      <div class="align-self-end d-flex justify-content-center col-md-3">
        <button type="submit" class="btn btn-primary w-20">
          Cadastrar Piloto
        </button>
      </div>
      
    </form>
  </div>
</template>


<script>
export default {
  data() {
    return {
      novoPiloto: {
        nome: "",
        numero: "",
        equipe: "",
        nacionalidade: "",
        nascimento: "",
        vitorias: 0,
        altura: "",
      },
    };
  },
  methods: {
    async addPiloto() {
      try {
        const response = await fetch("http://localhost:3000/pilotos", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(this.novoPiloto),
        });
        const data = await response.json();
        if (response.ok) {
          alert("Piloto cadastrado com sucesso!");
          this.clearFields();
          this.$router.push("/"); // Redireciona para a tela de listagem
        } else {
          alert("Erro ao cadastrar piloto: " + data.error);
        }
      } catch (error) {
        console.error("Erro na requisição:", error);
      }
    },
    clearFields() {
      this.novoPiloto = {
        nome: "",
        numero: "",
        equipe: "",
        nacionalidade: "",
        nascimento: "",
        vitorias: 0,
        altura: "",
      };
    },
  },
};
</script>

