export async function handleShare(urlPage, setUrlPage) {
  // https://web.dev/i18n/pt/async-clipboard/
  try {
    await navigator.clipboard.writeText(urlPage);
    console.log('Link copied!');
  } catch (err) {
    console.error('Failed to copy: ', err);
  }
  setUrlPage(true);
}

export function handleFavorite() {
  console.log('fav');
}

export function handleStarRecipe(history, idRecipe) {
  if (history.location.pathname.includes('foods')) {
    history.push(`/foods/${idRecipe}/in-progress`);
  }
  if (history.location.pathname.includes('drinks')) {
    history.push(`/drinks/${idRecipe}/in-progress`);
  }
}

export function handleIngredients(useRecipe) {
  const MAX = 20;
  const ingredientsList = [];

  for (let i = 1; i <= MAX; i += 1) {
    const ingredient = useRecipe[`strIngredient${i}`];
    const measure = useRecipe[`strMeasure${i}`];

    if (ingredient && ingredient.length !== 0) {
      ingredientsList.push({
        theIngredients: ingredient,
        theMeasures: measure,
      });
    }
  }
  return ingredientsList;
}

export function handleStrYouTube(url) {
  const urlEmbed = url.replace('watch?v=', 'embed/');
  return urlEmbed;
}

async function fetchRandomFood() {
  const url = 'https://www.themealdb.com/api/json/v1/1/random.php';
  const allData = await (await fetch(url)).json();
  const { meals } = allData;
  return meals[0];
}

async function fetchRandomDrink() {
  const url = 'https://www.thecocktaildb.com/api/json/v1/1/random.php';
  const allData = await (await fetch(url)).json();
  const { drinks } = allData;
  return drinks[0];
}

export async function handleSupriseBtn(history) {
  if (history.location.pathname.includes('foods')) {
    const data = await fetchRandomFood();
    const { idMeal } = data;
    history.push(`/foods/${idMeal}`);
  }
  if (history.location.pathname.includes('drinks')) {
    const data = await fetchRandomDrink();
    const { idDrink } = data;
    history.push(`/drinks/${idDrink}`);
  }
}
