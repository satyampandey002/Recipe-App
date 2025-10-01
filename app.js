  const searchbox = document.querySelector('.searchbox');
  const searchbtn = document.querySelector('.searchbtn');
  const Recipecontainer = document.querySelector('.Recipe-container');
  const  recipecontaintdetails = document.querySelector('.recipe-containt-details');
  const recipeclosebtn = document.querySelector('.recipe-close-btn');

  //function to get //
  const fetchRecipes = async (query)=>{
    Recipecontainer.innerHTML = "<h2>Fetching Recipes.......</h2>";
    try{

  const data = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`);
 const response = await data.json();

 Recipecontainer.innerHTML = "";
 response.meals.forEach(meal => {
 const recipeDiv = document.createElement('div');
 recipeDiv.classList.add('recipe');
 recipeDiv.innerHTML = `<img src="${meal.strMealThumb}">
         <h3>${meal.strMeal}</h3>
         <p><span>${meal.strArea}</span>Dishk</p>
         <p>Blongs to <span>${meal.strCategory}</span>Category</p>
 `
 const button = document.createElement('button');
button.textContent = "View Recipe";
recipeDiv.appendChild(button);

// Adding addEventListener to recipes button

button.addEventListener('click', () =>{
openRecipepopup(meal);
});


 Recipecontainer.appendChild(recipeDiv);

 });

   }catch (error){
        Recipecontainer.innerHTML = "<h2>Error in Fetching Recipes....</h2>";
    }
 
  }
  // funtion to fetch ingredents and measurments
const fetchIngredents = (meal) =>{
 let ingredientsList ="";
 for (let i=1; i<=20; i++){
const ingredients = meal[`strIngredient${i}`];
if(ingredients){
  const measure = meal [`strMeasure${i}`];
 ingredientsList +=` <li>${measure} ${ingredients}</li>`
}
else{
  break;
}
 }
 return ingredientsList;
}

const openRecipepopup  = (meal)  => {
 recipecontaintdetails.innerHTML = `
 <h2 class="recipeName">${meal.strMeal}</h2>
 <h3>Ingredents:</h3>
 <ul  class="ingrediensList">${fetchIngredents(meal)}</ul>
 <div class="recipeInstruction">
      <h3>Instructions:</h3>
      <p>${meal.strInstructions}</p>
 </div>
 `
 
 recipecontaintdetails.parentElement.style.display = "block";
}
   recipeclosebtn.addEventListener('click', ()=>{
    recipecontaintdetails.parentElement.style.display = "none";
   });
searchbtn.addEventListener('click', (e)=>{
    e.preventDefault();
  const searchInput = searchbox.value.trim();

  if(!searchInput){
    Recipecontainer.innerHTML = `<h2>Type the meal in the search box..</h2>`;
    return;
  }
  fetchRecipes(searchInput);

  
  });
