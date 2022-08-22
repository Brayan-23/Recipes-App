export const fetchIngredient = async (ingrediente) => {
  const ingredient = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingrediente}`).then((response) => response.json());
  return ingredient;
};

export const fetchNome = async (nome) => {
  const name = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${nome}`).then((response) => response.json());
  return name;
};
export const fetchLetter = async (first) => {
  const letter = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${first}`).then((response) => response.json());
  return letter;
};

export const fetchIngredientCock = async (ingrediente) => {
  const ingredientCock = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${ingrediente}`).then((response) => response.json());
  return ingredientCock;
};

export const fetchLetterCock = async (letter) => {
  const letterCock = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${letter}`).then((response) => response.json());
  return letterCock;
};

export const fetchNomeCock = async (nome) => {
  const nameCock = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${nome}`).then((response) => response.json());
  return nameCock;
};