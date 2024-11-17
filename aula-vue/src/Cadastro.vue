<template>
  <div>
    <h2>Cadastro de Pilotos de F1</h2>
    <form @submit.prevent="addPiloto">
      <label>Nome do Piloto:</label>
      <input type="text" v-model="novoPiloto.nome" placeholder="Nome" required />

      <label>Número do Piloto:</label>
      <input type="number" v-model="novoPiloto.numero" placeholder="Número" required />

      <label>Equipe:</label>
      <input type="text" v-model="novoPiloto.equipe" placeholder="Equipe" required />

      <button type="submit">Cadastrar Piloto</button>
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
