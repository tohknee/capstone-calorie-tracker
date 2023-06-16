import { useDispatch, useSelector } from "react-redux";
import { useEffect, Fragment } from "react";
import { thunkCurrentUserMealLogs } from "../../store/meals";
import OpenModalButton from "../OpenModalButton";
import { Link } from "react-router-dom"
import DeleteMealLog from "./DeleteMealLog";


const GetCurrentMealLogs=()=>{
    const dispatch=useDispatch()
    const logs=useSelector(state=>state.meal)
    const logsArray=Object.values(logs)

    useEffect(()=>{
        dispatch(thunkCurrentUserMealLogs())
    },[dispatch])
    console.log("THIS IS MEAL LOGS",logs)

    if(!logs){
        return "loading..."
    }

    return (
        <>
        <h1>MEAL LOGS</h1>
        <div>
  {logsArray.map((log) => {
    return (
      <div key={log.id}>
        <div>Category: {log.category}</div>
        <div>Meal Calories: {log.meal_calories}</div>
        <div>Servings: {log.portion_size}</div>
        <Link to={`/meals/edit/${log.id}`}>
            <button>
                Edit Meal Log
            </button>
        </Link>
        <OpenModalButton
                        buttonText="Remove Meal Log"
                        modalComponent={<DeleteMealLog mealId={log.id} />}
                    />
        <br></br>
      </div>
    );
  })}
</div>
</>
);
};
export default GetCurrentMealLogs