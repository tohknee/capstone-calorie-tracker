import MealForm from "./MealForm";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import { useEffect} from "react";
import { thunkGetOneMealLog } from "../../store/meals";

const EditMealLog = () => {
    const dispatch=useDispatch()
    const {mealId} =useParams()
    const singeMeal= useSelector(state=>state.meal[mealId])

    console.log("In Meal edittt",singeMeal)

    useEffect(()=>{
        dispatch(thunkGetOneMealLog(mealId))
    },[dispatch])

    if(!singeMeal) return "Meal Log not found."
    
    return (
        <>
        <h1>EDIT Meal FORM</h1>
        <MealForm
        meal={singeMeal}
        formType="Edit Meal Log"
        ></MealForm>
        </>
    )
}

export default EditMealLog