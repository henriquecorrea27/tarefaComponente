<template>
  <div>
    <router-view
      :pilotos="pilotos"
      @pilotoAdicionado="adicionarPiloto"
      @pilotoRemovido="removerPiloto"
    />
  </div>
</template>

<script>
export default {
  data() {
    return {
      pilotos: [],
    };
  },
  methods: {
    adicionarPiloto(piloto) {
      this.pilotos.push(piloto);
    },
    removerPiloto(index) {
      this.pilotos.splice(index, 1);
    },
  },
};
</script>
