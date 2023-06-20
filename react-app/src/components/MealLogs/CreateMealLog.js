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
    // const pets=useSelector(state=>state.profile)

    // const petIdToInt=parseInt(petId,10)
    // const currentPet=pets[petIdToInt]
    const mealsArray=Object.values(mealsObj)
    // console.log("IN THE CREATE",mealsObj)
    // console.log("IN THE CREATasdasdadsE",currentPet)
    // console.log("IN THE THIS IS THE PETS PROFILE OBJECT",pets)
    

    useEffect(()=>{
        // console.log("THIS IS WORKING IN CREATE MEAL LOG")
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