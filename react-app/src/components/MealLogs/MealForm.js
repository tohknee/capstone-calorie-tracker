import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useParams } from "react-router-dom";
import {
  thunkCreateMealLog,
  thunkCurrentUserMealLogs,
  thunkEditMealLog,
} from "../../store/meals";

const MealForm = ({ meal, dogId,formType,currentPetId, }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [portion_size, setPortion] = useState(meal?.portion_size);
  const [meal_calories, setCalories] = useState(meal?.meal_calories);
  const [category, setCategory] = useState(meal?.category);
  const [errors,setErrors] = useState("")

  useEffect(() => {
    dispatch(thunkCurrentUserMealLogs());
  }, [dispatch]);

  useEffect(() => {
    if (portion_size) {
      const calculatedCalories = portion_size * 400;
      setCalories(calculatedCalories);
    }
  }, [portion_size]);

  const handleSubmit = (e) => {
    e.preventDefault();

    let errors = {};
    if (!portion_size) errors.portion_size = "Portion size required.";
    if (!category) errors.category= "Please Select a category"
    setErrors(errors)
    if (!!Object.keys(errors).length) return;

    meal = {
      ...meal,
      portion_size,
      meal_calories,
      category,
    };

    if (formType === "Create Meal log") {
      dispatch(thunkCreateMealLog(meal,dogId));
      dispatch(thunkCurrentUserMealLogs());
      history.push(`/meals/all`);
    }
    if (formType === "Edit Meal Log") {
      
      if(meal.pet_id!==currentPetId){
        return "This pet does not belong to you"
      }
      dispatch(thunkEditMealLog(meal));
      dispatch(thunkCurrentUserMealLogs());
      history.push(`/meals/all`);
    }
  };
  return (
    <>
      <form onSubmit={handleSubmit}>
        <label>
        {errors.portion_size ? (
            <p className="errors">{errors.portion_size}</p>
          ) :null}
          Portion Size (cups):
          <input
            type="number"
            step="0.5"
            min="0.5"
            max="12"
            value={portion_size}
            onChange={(e) => setPortion(e.target.value)}
          />
        </label>
        <label>
          {errors.category ? (
            <p className="errors">{errors.category}</p>
          ) :null}
          Category:
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            >
            <option value="">Select a category</option>
            <option value="breakfast">Breakfast</option>
            <option value="lunch">Lunch</option>
            <option value="dinner">Dinner</option>
          </select>
        </label>
            <label>
             
              <div>
              Meal Calories(1 cup = 400 calories):
              </div>
              <div>Your pet consumed {meal_calories} calories for {category}. </div>
              {/* <input
                type="text"
                value={meal_calories}
                onChange={(e) => setCalories(e.target.value)}
              /> */}
            </label>
        <button type="submit">Submit</button>
      </form>
    </>
  );
};

export default MealForm;
