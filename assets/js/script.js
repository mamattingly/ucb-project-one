import { calculateTDEE, calculateMacroNutrients, divideMeals, getFood} from "./calculateTdee.js";
import { createTDEEQuestionnaire } from "./tdeeQuestionnaire.js";
import { createMealPlan } from "./createMealPlan.js";
import { mainContainer } from "./constants.js";

const bodyContainer = document.querySelector(".body-container");
const mealPlanGenerator = document.getElementById("meal-plan-generator");
const fetchExerciseObj = async (queryString) => {
  const apiKey = `KUNEX9M6Kwogj/J4y7Ru+A==FZ9J1FNl2AdRV6rw`;
  const url = `https://api.api-ninjas.com/v1/exercises?muscle=${queryString}`;

  try {
    const response = await fetch(`${url}`, {
      method: 'GET',
      headers: {
        'X-Api-Key': `${apiKey}`,  
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error('Error: ' + response.status);
    }

    const result = await response.json();
    console.log(result);
  } catch (error) {
    console.error('Error:', error);
  }
};
//================================================================================================

//TDEE Algorithm==================================================================================

const startFunction = async (
  weight,
  feet,
  inches,
  age,
  gender,
  activityLevel,
  goal,
  name
) => {
  try {
    let tdee = calculateTDEE(weight, feet, inches, age, gender, activityLevel);
    let macroNutrients = calculateMacroNutrients(tdee, goal);
    let dividedMeals = divideMeals(tdee, macroNutrients);
    let mealObj = await getFood(dividedMeals);
    const dateString = new Date().toISOString();
    const appendedName = name + " " + dateString;
    localStorage.setItem(appendedName, JSON.stringify(dividedMeals));
    createMealPlan(dividedMeals);
  } catch (error) {
    console.error("An error occurred during startFunction:", error);
  }
};

function clearMainContainer() {
  // Get the mainContainer element
  var mainContainer = document.getElementById('main-container');

  // Remove all child elements from the mainContainer
  while (mainContainer.firstChild) {
    mainContainer.removeChild(mainContainer.firstChild);
  }
}

const homeLink = document.getElementById('home-link');
homeLink.addEventListener('click', function (event) {
  event.preventDefault();
  clearMainContainer();
  setTimeout(createTDEEQuestionnaire,1000);
});


mealPlanGenerator.addEventListener("click", function (event) {
  event.preventDefault();
  bodyContainer.i
  clearMainContainer()
  createTDEEQuestionnaire();
});
//================================================================================================

export { startFunction };