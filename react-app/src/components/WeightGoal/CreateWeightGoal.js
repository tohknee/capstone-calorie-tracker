import WeightGoalForm from "./WeightGoalForm";
import { useDispatch, useSelector } from "react-redux";
import { useEffect} from "react";
import { thunkCurrentUsersPetsWeightGoals } from "../../store/weightGoal";

const CreateWeightGoal=()=>{
    const dispatch=useDispatch()

    const weightGoal ={
        current_weight:"",
        date:"",
        weight_goal:"",
        // dog_id:
    }

    return (
        <>
        <WeightGoalForm
        formType="Create weight goal"
        weightGoal={weightGoal}>


        </WeightGoalForm>
        </>
    )
}

export default CreateWeightGoal