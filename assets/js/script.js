
//TODO: Refine parameters to suit our needs.
const fetchMealDbObj = async (query) => {
  const url =
    `https://www.themealdb.com/api/json/v1/1/search.php?s=` +
    encodeURIComponent(query);
  try {
    const response = await fetch(`${url}${query}`);
    if (response.ok) {
      const data = await response.json();
      console.log(data);
      return data;
    } else {
      throw new Error(`Error: ${response.statusText} (${response.status})`);
    }
  } catch (error) {
    console.log(error);
  }
};

//TODO: Refine parameters to suit our needs.
const fetchCalorieNinjas = async (query) => {
  const apiKey = "aPOBA91RAEupAPbEjV0ibQ==1WKhc49resmT47Kr";
  const url =
    `https://api.calorieninjas.com/v1/nutrition?query=` +
    encodeURIComponent(query);
  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "X-Api-Key": apiKey,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.statusText} (${response.status})`);
    }

    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.log(error);
  }
};

//TODO: create object to store activity level and multiplier.
const activityLevel = {
  sedentary: 1.2, //(little to no exercise + work a desk job) = 1.2
  LightlyActive: 1.375, // (light exercise 1-3 days / week)
  ModeratelyActive:  1.55, //(moderate exercise 3-5 days / week
  VeryActive: 1.725, //(heavy exercise 5-7 days / week)
  ExtremelyActive: 1.9, //(very heavy exercise, hard labor job, training 2x / day)
};

  






















//====================================================================================================
//TODO: Convert feet and inches to base inches ie 6' 1' inches = 73.





















//====================================================================================================
// TODO: Function to calculate BMR for male.





















//====================================================================================================
//TODO: Create function to convert imperial inches to metric centimeters.
function convertInchesToCentimeters(inches) {
  return inches * 2.54;
}

var heightInCentimeters = convertInchesToCentimeters(inches);


//====================================================================================================
//TODO: Create function to convert imperial pounds to metric kilograms.
function convertPoundsToKilograms(pounds) {
  return pounds * 0.45359237;
}
var weightInKilograms = convertPoundsToKilograms(pounds);


//====================================================================================================
//TODO: Function to calculate BMR for female.
//Women BMR = 655 + (9.6 X weight in kg) + (1.8 x height in cm) – (4.7 x age in yrs)
function femaleBMR(weight, height, age) {
  return 655 + 9.6 * weight + 1.8 * height - 4.7 * age;
}

var femaleBMRResult = femaleBMR(weightInKilograms, heightInCentimeters, ageInYears);
console.log(femaleBMRResult);
