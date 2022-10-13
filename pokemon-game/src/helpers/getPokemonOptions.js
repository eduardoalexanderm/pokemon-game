import pokemonsApi from "@/api/pokemonApi";

const getPokemons = () => {
  const pokemonsArr = Array.from(Array(650));
  //console.log(pokemonsArr);
  return pokemonsArr.map((_, index) => index + 1);
};

const getPokemonOptions = async () => {
  const mixedPokemons = getPokemons().sort(() => Math.random() - 0.5);
  console.log(mixedPokemons);
  //console.log(getPokemons())
  const pokemons = await getPokemonNames(mixedPokemons.splice(0, 4));
  //console.table(pokemons);
  return pokemons;
};

const getPokemonNames = async ([a, b, c, d] = []) => {
  //   const resp = await pokemonsApi.get(`/11`);
  //   console.log(resp.data.name, resp.data.id);
  // console.log(resp);
  //console.log(a, b, c, d);
  const promiseArr = [
    pokemonsApi.get(`/${a}`),
    pokemonsApi.get(`/${b}`),
    pokemonsApi.get(`/${c}`),
    pokemonsApi.get(`/${d}`),
  ];

  const [p1, p2, p3, p4] = await Promise.all(promiseArr);

  return [
    { name: p1.data.name, id: p1.data.id },
    { name: p2.data.name, id: p2.data.id },
    { name: p3.data.name, id: p3.data.id },
    { name: p4.data.name, id: p4.data.id },
  ];
};

export default getPokemonOptions;
