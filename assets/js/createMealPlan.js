import { mainContainer } from "./constants.js";

const createMealPlan = (dividedMeals, mealObj) => {
  const canvasCheck = document.getElementById("meal-plan-chart");

  if (canvasCheck) {
    canvasCheck.remove();
  }
  console.log(mealObj);
  const canvas = document.createElement("canvas");
  canvas.setAttribute("id", "meal-plan-chart");
  canvas.setAttribute("class", "meal-plan-chart");
  mainContainer.appendChild(canvas);

  const labels = [];
  const calories = [];
  const carbohydrates = [];
  const protein = [];
  const fat = [];

  // Extract data from dividedMeals object
  Object.entries(dividedMeals).forEach(([key, value]) => {
    labels.push(key.charAt(0).toUpperCase() + key.slice(1));
    calories.push(value.calories);
    carbohydrates.push(value.carbohydrates);
    protein.push(value.protein);
    fat.push(value.fat);
  });

  new Chart(canvas, {
    type: "bar",
    data: {
      labels: labels,
      datasets: [
        {
          label: "Calories",
          data: calories,
          backgroundColor: "rgba(75, 192, 192, 0.6)",
        },
        {
          label: "Carbohydrates",
          data: carbohydrates,
          backgroundColor: "rgba(255, 99, 132, 0.6)",
        },
        {
          label: "Protein",
          data: protein,
          backgroundColor: "rgba(54, 162, 235, 0.6)",
        },
        {
          label: "Fat",
          data: fat,
          backgroundColor: "rgba(255, 206, 86, 0.6)",
        },
      ],
    },
    options: {
      responsive: true,
      scales: {
        x: {
          stacked: true,
        },
        y: {
          beginAtZero: true,
          stacked: true,
        },
      },
    },
  });

  const mealPlanContainer = document.createElement("div");
  mealPlanContainer.setAttribute("class", "dropdown-container");
  mainContainer.appendChild(mealPlanContainer);

  const selectMealPlan = document.createElement("select");
  selectMealPlan.setAttribute("class", "select-meal-items");
  selectMealPlan.setAttribute("id", "select-meal-items");
  mealPlanContainer.appendChild(selectMealPlan);

  const mealOptions = ["Breakfast", "Lunch", "Dinner", "Snacks"];

  mealOptions.forEach((meal) => {
    const option = document.createElement("option");
    option.setAttribute("value", meal);
    option.textContent = meal;
    selectMealPlan.appendChild(option);
  });

  selectMealPlan.addEventListener("change", function () {
    const selectedMeal = this.value;
    let selection;

    switch (selectedMeal) {
      case "Breakfast":
        selection = mealObj.breakfastObj;
        break;
      case "Lunch":
        selection = mealObj.lunchObj;
        break;
      case "Dinner":
        selection = mealObj.dinnerObj;
        break;
      case "Snacks":
        selection = mealObj.snacksObj;
        break;
      default:
        console.log("Invalid selection.");
        break;
    }

    const unorderedList = document.createElement("ul");

    if (selection) {
      Object.values(selection.hits).forEach((item) => {
        const recipeContainer = document.createElement("div");
        recipeContainer.setAttribute("class", "recipe-container");

        const listItem = document.createElement("img");
        listItem.setAttribute("class", "meal-plan-image");
        listItem.setAttribute("alt", item.recipe.label);
        listItem.setAttribute("title", item.recipe.label);
        listItem.setAttribute("width", "200");
        listItem.setAttribute("height", "200");

        listItem.addEventListener("error", function () {
          this.src = "http://via.placeholder.com/200x200";
        });

        listItem.src = item.recipe.image;
        recipeContainer.appendChild(listItem);

        const link = document.createElement("a");
        link.href = item.recipe.url;
        link.target = "_blank";
        link.textContent = item.recipe.label;
        recipeContainer.appendChild(link);

        const nutritionFacts = document.createElement("div");
        nutritionFacts.setAttribute("class", "nutrition-facts");
        const nutritionFactsText = document.createElement("p");
        nutritionFactsText.textContent = `Calories: ${Math.round(
          item.recipe.calories / item.recipe.yield
        )} | Carbohydrates: ${Math.round(
          item.recipe.totalNutrients.CHOCDF.quantity / item.recipe.yield
        )} | Protein: ${Math.round(
          item.recipe.totalNutrients.PROCNT.quantity / item.recipe.yield
        )} | Fat: ${Math.round(
          item.recipe.totalNutrients.FAT.quantity / item.recipe.yield
        )}`;
        nutritionFactsText.setAttribute("class", "nutrition-facts-text");
        nutritionFactsText.setAttribute("style", "color: white;");
        recipeContainer.appendChild(nutritionFactsText);

        unorderedList.appendChild(recipeContainer);
      });
    }

    mealPlanContainer.appendChild(unorderedList);
  });
};

export { createMealPlan };
