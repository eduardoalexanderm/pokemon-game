<template>
  <h1 v-if="!pokemon">Espere por favor...</h1>
  <div v-else>
    <h1>¿Who's?</h1>
    <div>
      <!-- Todo: Picture -->
      <PokemonPicture :pokemonId="pokemon.id" :showPokemon="showPokemon" />
      <!-- Todo: Opciones -->
      <PokemonOptions :pokemons="pokemonArr" @selection="checkAnswer($event)" />
      <template v-if="showAnswer">
        <h2 class="fade-in">
          <span :class="answer === true ? 'green' : 'red'">{{ message }}</span>
        </h2>
        <button class="button-41" @click="newGame">New Game</button>
      </template>
    </div>
  </div>
</template>

<script>
import PokemonOptions from "@/components/PokemonOptions.vue";
import PokemonPicture from "@/components/PokemonPicture.vue";
import getPokemonOptions from "@/helpers/getPokemonOptions";
//console.log(getPokemonOptions());

export default {
  name: "PokemonPage",
  components: {
    PokemonOptions,
    PokemonPicture,
  },
  data() {
    return {
      pokemonArr: [],
      pokemon: null,
      showPokemon: false,
      showAnswer: false,
      message: "",
      answer: Boolean,
    };
  },

  methods: {
    async mixPokemonArray() {
      this.pokemonArr = await getPokemonOptions();

      const rndInt = Math.floor(Math.random() * 4);
      this.pokemon = this.pokemonArr[rndInt];
      console.log(rndInt);
    },
    checkAnswer(selectedId) {
      console.log("Pokemon Page Llamado", selectedId);
      this.showPokemon = true;
      this.showAnswer = true;
      if (selectedId === this.pokemon.id) {
        this.answer = true;
        return (this.message = `Congrats!:), this pokemon is: ${this.pokemon.name}`);
      } else {
        this.answer = false;
        return (this.message = `Oops:(, it was another pokemon... ${this.pokemon.name}`);
      }
    },

    newGame() {
      this.message = "";
      this.showPokemon = false;
      this.showAnswer = false;
      this.pokemonArr = [];
      this.mixPokemonArray();
      this.pokemon = null;
    },
  },

  mounted() {
    this.mixPokemonArray();
  },
};
</script>

<style scoped>
/* CSS */
.button-41 {
  background-color: initial;
  background-image: linear-gradient(-180deg, #00d775, #00bd68);
  border-radius: 5px;
  box-shadow: rgba(0, 0, 0, 0.1) 0 2px 4px;
  color: #ffffff;
  cursor: pointer;
  display: inline-block;
  font-family: Inter, -apple-system, system-ui, Roboto, "Helvetica Neue", Arial,
    sans-serif;
  height: 44px;
  line-height: 44px;
  outline: 0;
  overflow: hidden;
  padding: 0 20px;
  pointer-events: auto;
  position: relative;
  text-align: center;
  touch-action: manipulation;
  user-select: none;
  -webkit-user-select: none;
  vertical-align: top;
  white-space: nowrap;
  width: 100%;
  z-index: 9;
  border: 0;
}

.button-41:hover {
  background: #00bd68;
}

.green {
  color: green;
}

.red {
  color: red;
}
</style>
