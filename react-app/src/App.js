import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import NoModalSignup from "./components/LoginSignUpPages/SignUp";
import NoModalLogin from "./components/LoginSignUpPages/LogIn";
// import SignupFormPage from "./components/SignupFormPage";
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
import SearchBar from "./components/SearchBar/Searchbar";
import ExampleCalories from "./components/PublicExamples/CalorieGoals";
import ExampleMacros from "./components/PublicExamples/PetFoodMacros";
import PublicProfiles from "./components/PublicExamples/PetProfiles";
import AboutPage from "./components/PublicExamples/About";
import ExampleMeals from "./components/PublicExamples/CalorieGoals";
import ComingSoon from "./components/BonusFeatureSoon/ComingSoon";



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
          {/* <Route path="/login" >
            <LoginFormPage />
          </Route> */}
          <Route exact path="/login" component={NoModalLogin}></Route>
          {/* <Route path="/signup">
            <SignupFormPage />
          </Route> */}
          <Route exact path="/signup" component={NoModalSignup}></Route>
          <Route exact path="/" component={AboutPage}></Route>
          {/* <Route exact path="/results" component={SearchBar}></Route> */}
          <Route exact path="/coming-soon" component={ComingSoon}></Route>


          <Route exact path="/public/meals" component={ExampleMeals}></Route>
          <Route exact path="/public/macros" component={ExampleMacros}></Route>
          <Route exact path="/public/profiles" component={PublicProfiles}></Route>
          <Route exact path="/public/about" component={AboutPage}></Route>



          <Route exact path="/profile" component={GetCurrentPetProfiles}></Route>
          <Route exact path="/profile/new" component={CreateProfile}></Route>
          <Route exact path='/profile/:profileId' component={GetOnePetProfile}></Route>
          <Route exact path="/profile/edit/:profileId" component={EditPetProfile}></Route>
          <Route exact path="/meals/all" component={GetCurrentMealLogs}></Route>
          <Route exact path="/profile/:profileId/meals/new" component={CreateMealLog}></Route>
          <Route exact path="/meals/edit/:mealId" component={EditMealLog}></Route>
    
          <Route exact path= "/calories/all" component={GetCurrentCalorieGoals}></Route>
          <Route exact path= "/profile/:profileId/calories/new" component={GetCurrentCalorieGoals}></Route>
          
        </Switch>
      )}
    </>
  );
}

export default App;
