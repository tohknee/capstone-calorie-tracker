import { useDispatch, useSelector } from "react-redux";
import { useEffect, Fragment } from "react";
import { thunkCurrentUserMealLogs } from "../../store/meals";
import OpenModalButton from "../OpenModalButton";
import { Link } from "react-router-dom"
import "./MealLogs.css"
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
      <div className="meal-log-container">
        <h1>MEAL LOGS</h1>
        <div className="meal-log-list">
          <ul className="meal-log-items">
            {logsArray.map((log) => {
              return (
                <li key={log.id} className="meal-log-item">
                  <div>Category: {log.category} </div>
                  <div>Meal Calories: {log.meal_calories} </div>
                  <div>Servings: {log.portion_size}</div>
                  <Link to={`/meals/edit/${log.id}`}>
                    <button className="edit-button">Edit Meal Log</button>
                  </Link>
                  <OpenModalButton
                    buttonText="Remove Meal Log"
                    modalComponent={<DeleteMealLog mealId={log.id} />}
                  />
               
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    );
  };
export default GetCurrentMealLogs