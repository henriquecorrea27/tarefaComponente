<template>
  <div class="container mt-5">
    <h2 class="text-center mb-4">Cadastro de Pilotos de F1</h2>

    <!-- Formulário de Cadastro -->
    <form @submit.prevent="addPiloto" class="form-container">
      <div class="row mb-3">
        <div class="col-md-3">
          <label for="nome" class="form-label">Nome do Piloto:</label>
          <input type="text" id="nome" v-model="novoPiloto.nome" class="form-control" placeholder="Nome" required />
        </div>

        <div class="col-md-3">
          <label for="numero" class="form-label">Número do Piloto:</label>
          <input type="number" id="numero" v-model="novoPiloto.numero" class="form-control" placeholder="Número"
            required />
        </div>

        <div class="col-md-3">
          <label for="equipe" class="form-label">Equipe:</label>
          <input type="text" id="equipe" v-model="novoPiloto.equipe" class="form-control" placeholder="Equipe"
            required />
        </div>
        <div class="align-self-end col-md-2">
        <!-- Botão de Cadastro -->
        <button type="submit" class="btn btn-success w-20">
          Cadastrar Piloto
        </button>
      </div>
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
      this.novoPiloto = { nome: "", numero: "", equipe: "" };
    },
  },
};
</script>
