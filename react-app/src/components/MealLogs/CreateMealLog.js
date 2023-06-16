import { useDispatch, useSelector } from "react-redux";
import { useEffect} from "react";
import { thunkCurrentUserMealLogs } from "../../store/meals";
import { useParams } from "react-router-dom";
import MealForm from "./MealForm";

const CreateMealLog=()=> {
    const dispatch=useDispatch()
    const mealsObj=useSelector(state=>state.meal) 
    const mealsArray=Object.values(mealsObj)
    console.log("IN THE CREATE",mealsObj)
    // const {petId} =useParams()

    useEffect(()=>{
        console.log("THIS IS WORKING IN CREATE MEAL LOG")
        dispatch(thunkCurrentUserMealLogs())
    },[dispatch])

    const meal = {
        portion_size:"",
        meal_calories:"",
        category:"",
        // petId:petId
    }
    console.log("this is the meeeal",meal)
    return (
        <>
        <div>CREATRE MEAL LOG</div>
        <MealForm
        meal={meal}
        formType="Create Meal log"
        ></MealForm>
        </>
    )
}

export default CreateMealLog