import { useDispatch, useSelector } from "react-redux";
import { useEffect, Fragment } from "react";
import { thunkCurrentUserMealLogs } from "../../store/meals";
import OpenModalButton from "../OpenModalButton";
import { Link,useHistory } from "react-router-dom"
// import "./MealLogs.css"
import "./Second.css"
import "./NoMeals.css"
import DeleteMealLog from "./DeleteMealLog";

const GetCurrentMealLogs=()=>{
    const dispatch=useDispatch()
    const logs=useSelector(state=>state.meal)
    const state=useSelector(state=>state)
    const logsArray=Object.values(logs)
    const history=useHistory()

    useEffect(()=>{
        dispatch(thunkCurrentUserMealLogs())
    },[dispatch])


    const handleButtonClick=()=>{
      history.push('/profile')
    }
    if(!logs){
        return "loading..."
    }

    if(Object.keys(logs).length===0){
      return <div className="no-meal-form">Hmm... it seems you have no logged meals. <button type="submit" onClick={handleButtonClick}>Click here </button> to head back to your pets and click the  <button type="submit">Add meal log </button> to add a meal log!</div>
    }

    return (
      <div className="meal-log-container">
        <h1>MEAL LOGS</h1>
        <div className="meal-log-list">
          <ul className="meal-log-items">
            {logsArray.map((log) => {
              return (
                <li key={log.id} className="meal-log-item">
                  <div className="meal-log-category">Category: {log.category}</div>
                  <div className="meal-log-calories">Meal Calories: {log.meal_calories}</div>
                  <div className="meal-log-servings">Servings: {log.portion_size}</div>
                  <div className="action-container">

                  <div className="action-div">
                  <Link to={`/meals/edit/${log.id}`}>
                    <button type="edit" className="edit-button">Edit Meal Log</button>
                  </Link>
                  </div>
                  <div className="action-div">
                  <OpenModalButton
                    buttonText="Remove Meal Log"
                    modalComponent={<DeleteMealLog mealId={log.id} />}
                    />
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    );
  };
export default GetCurrentMealLogs