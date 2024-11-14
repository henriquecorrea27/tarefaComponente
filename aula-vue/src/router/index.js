import { createRouter, createWebHistory } from "vue-router";
import Cadastro from "../components/Cadastro.vue";
import Listagem from "../components/Listagem.vue";
import Detalhes from "../components/Detalhes.vue";

const routes = [
  { path: "/", component: Listagem, name: "Listagem" },
  { path: "/cadastro", component: Cadastro, name: "Cadastro" },
  { path: "/detalhes/:id", component: Detalhes, name: "Detalhes" },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
