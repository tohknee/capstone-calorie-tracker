import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { thunkCurrentPetCalorieGoals } from "../../store/calories";


const GetCurrentCalorieGoals = () => {
    const dispatch = useDispatch()
    const goals=useSelector(state=>state.calorieReducer)
    const goalsArray=Object.values(goals)

    useEffect(()=>{
        dispatch(thunkCurrentPetCalorieGoals())
    },[dispatch])

    if(!goals){
        return "No goal found."
    }
    return (
        <>
        {goalsArray.map((goal)=>(
            <div>
                <div>{goal.calorie_goal}</div>
                <div>{goal.date}</div>
            </div>
        ))}
        
        </>
    )
}

export default GetCurrentCalorieGoals