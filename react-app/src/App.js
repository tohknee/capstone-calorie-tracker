import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import SignupFormPage from "./components/SignupFormPage";
import LoginFormPage from "./components/LoginFormPage";
import { authenticate } from "./store/session";
import Navigation from "./components/Navigation";
import GetCurrentPetProfiles from "./components/PetProfile/CurrentUserPetProfiles";
import CreateProfile from "./components/PetProfile/CreatePetProfile";
import GetOnePetProfile from "./components/PetProfile/GetOnePetProfile";
import EditPetProfile from "./components/PetProfile/EditPetProfile";
import GetCurrentMealLogs from "./components/MealLogs/CurrentUserMealLog";
import CreateMealLog from "./components/MealLogs/CreateMealLog";
import EditMealLog from "./components/MealLogs/EditMealLog";
import GetCurrentCalorieGoals from "./components/CalorieGoal/CurrentCalorieGoal.js"
function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(authenticate()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route path="/login" >
            <LoginFormPage />
          </Route>
          <Route path="/signup">
            <SignupFormPage />
          </Route>
          <Route exact path="/profile" component={GetCurrentPetProfiles}></Route>
          <Route exact path="/profile/new" component={CreateProfile}></Route>
          <Route exact path='/profile/:profileId' component={GetOnePetProfile}></Route>
          <Route exact path="/profile/edit/:profileId" component={EditPetProfile}></Route>
          <Route exact path="/meals" component={GetCurrentMealLogs}></Route>
          <Route exact path="/meals/new" component={CreateMealLog}></Route>
          <Route exact path="/meals/edit/:mealId" component={EditMealLog}></Route>
          <Route exact path= "/calories/all" component={GetCurrentCalorieGoals}></Route>
          
        </Switch>
      )}
    </>
  );
}

export default App;
