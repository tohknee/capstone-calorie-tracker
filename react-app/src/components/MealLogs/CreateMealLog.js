import { useDispatch, useSelector } from "react-redux";
import { useEffect} from "react";
import { thunkCurrentUserMealLogs } from "../../store/meals";
import { useParams ,useHistory} from "react-router-dom";
import MealForm from "./MealForm";

const CreateMealLog=()=> {
    const dispatch=useDispatch()
    const history=useHistory
    const {petId}=useParams
    const mealsObj=useSelector(state=>state.meal) 
    const loggedIn=useSelector((state)=>state.session)

    
    const mealsArray=Object.values(mealsObj)
 
    // if (loggedIn.user===null) return "Please Log in to add a meal log."


    useEffect(()=>{
        dispatch(thunkCurrentUserMealLogs())
    },[dispatch])

    const meal = {
        portion_size:"",
        meal_calories:"",
        category:"",
        petId:petId
    }
    console.log("this is the meeeal",meal)
    return (
        <>
        <div>New Meal log</div>
        <MealForm
        meal={meal}
        formType="Create Meal log"
        ></MealForm>
        </>
    )
}

export default CreateMealLog