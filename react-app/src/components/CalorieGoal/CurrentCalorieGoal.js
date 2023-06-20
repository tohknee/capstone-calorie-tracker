import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { thunkCurrentPetCalorieGoals } from "../../store/calories";
import "./CalorieGoal.css"


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

    if(Object.keys(goals).length===0){
       return "You have no calorie goals. Log in or create a new calorie goal."
    }
    return (
            <div className="calorie-goals-container">
              {goalsArray.map((goal) => (
                <div className="calorie-goal-item" key={goal.id}>
                  <div className="calorie-goal-value">{goal.calorie_goal}</div>
                  <div className="calorie-goal-date">{goal.date}</div>
                  <div className="calorie-goal-dog-id">Dog ID: {goal.dog_id}</div>
                </div>
              ))}
            </div>
          );
        };
        

export default GetCurrentCalorieGoals