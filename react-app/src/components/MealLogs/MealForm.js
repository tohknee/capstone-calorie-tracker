import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useHistory } from 'react-router-dom';
import { useParams } from "react-router-dom";
import { thunkCreateMealLog,thunkCurrentUserMealLogs,thunkEditMealLog } from "../../store/meals";


const MealForm=({meal,formType})=>{
    const dispatch=useDispatch()
    const history=useHistory()
    const [portion_size,setPortion] = useState(meal?.portion_size)
    const [meal_calories,setCalories]=useState(meal?.meal_calories)
    const [category,setCategory]=useState(meal?.category)

    useEffect(()=>{
        dispatch(thunkCurrentUserMealLogs())
    },[dispatch])

    const handleSubmit =e =>{
        e.preventDefault()

        let errors={}
        if(!portion_size) errors.portion_size="Portion size required."
        if(!meal_calories) errors.meal_calories="Meal calories required"

        if (!!Object.keys(errors).length) return

        meal={
            ...meal,
            portion_size,
            meal_calories,
            category
        }

        if (formType === "Create Meal log") {
            console.log("this is meal form meal",meal)
            dispatch(thunkCreateMealLog(meal))
            dispatch(thunkCurrentUserMealLogs())
            history.push(`/meals`)
        }
        if (formType === "Edit Meal Log") {
            console.log("this is meal form meal",meal)
            dispatch(thunkEditMealLog(meal))
            dispatch(thunkCurrentUserMealLogs())
            history.push(`/meals`)
        }

    }
    return (
        <>
         <form onSubmit={handleSubmit}>
      <label>
        Portion Size:
        <input
          type="text"
          value={portion_size}
          onChange={(e) => setPortion(e.target.value)}
        />
      </label>
      <label>
        Meal Calories:
        <input
          type="text"
          value={meal_calories}
          onChange={(e) => setCalories(e.target.value)}
        />
      </label>
      <label>
        Category:
        <input
          type="text"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />
      </label>
      <button type="submit">Submit</button>
    </form>

        </>
    )
}

export default MealForm