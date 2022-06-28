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
