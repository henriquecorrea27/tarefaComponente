<template>
  <div>
    <h2>Cadastro de Pilotos de F1</h2>

    <form @submit.prevent="addPiloto">
      <label>Nome do Piloto:</label>
      <input
        type="text"
        v-model="novoPiloto.nome"
        placeholder="Nome"
        required
      />

      <label>Número do Piloto:</label>
      <input
        type="number"
        v-model="novoPiloto.numero"
        placeholder="Número"
        required
      />

      <label>Equipe:</label>
      <input
        type="text"
        v-model="novoPiloto.equipe"
        placeholder="Equipe"
        required
      />

      <button type="submit">Cadastrar Piloto</button>
    </form>

    <div v-if="pilotos.length === 0">
      <p>Nenhum piloto cadastrado.</p>
    </div>

    <ul>
      <li v-for="(piloto, index) in pilotos" :key="index">
        {{ piloto.nome }} - Nº {{ piloto.numero }} ({{ piloto.equipe }})
        <button @click="deletePiloto(index)">Remover</button>
      </li>
    </ul>
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
      pilotos: [],
    };
  },
  methods: {
    addPiloto() {
      if (
        this.novoPiloto.nome &&
        this.novoPiloto.numero &&
        this.novoPiloto.equipe
      ) {
        this.pilotos.push({ ...this.novoPiloto });
        this.clearFields();
      } else {
        alert("Por favor, preencha todos os campos.");
      }
    },
    deletePiloto(index) {
      this.pilotos.splice(index, 1);
    },
    clearFields() {
      this.novoPiloto = { nome: "", numero: "", equipe: "" };
    },
  },
};
</script>
