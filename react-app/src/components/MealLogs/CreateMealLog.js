import { useDispatch, useSelector } from "react-redux";
import { useEffect} from "react";
import { thunkCurrentUserMealLogs } from "../../store/meals";
import { useParams ,useHistory} from "react-router-dom";
import MealForm from "./MealForm";

const CreateMealLog=()=> {
    const dispatch=useDispatch()
    const history=useHistory
    const {profileId}=useParams()
    const mealsObj=useSelector(state=>state.meal) 
    const loggedIn=useSelector((state)=>state.session)

    const mealsArray=Object.values(mealsObj)
 
    useEffect(()=>{
        dispatch(thunkCurrentUserMealLogs())
    },[dispatch])

    const meal = {
        portion_size:"",
        meal_calories:"",
        category:"",
        petId:profileId
    }
    return (
        <>
        <div>New Meal log</div>
        <MealForm
        meal={meal}
        dogId={profileId}
        formType="Create Meal log"
        ></MealForm>
        </>
    )
}

export default CreateMealLog