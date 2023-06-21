import MealForm from "./MealForm";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import { useEffect} from "react";
import { thunkGetOneMealLog } from "../../store/meals";

const EditMealLog = () => {
    const dispatch=useDispatch()
    const {mealId} =useParams()
    const singeMeal= useSelector(state=>state.meal[mealId])
    const loggedIn=useSelector((state)=>state.session)

    useEffect(()=>{
        dispatch(thunkGetOneMealLog(mealId))
    },[dispatch])

    if (loggedIn.user===null) return "Please Log in to edit profile."

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