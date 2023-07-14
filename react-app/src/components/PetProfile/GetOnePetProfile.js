import { useDispatch, useSelector } from "react-redux";
import { useEffect, Fragment } from "react";
import { useParams } from "react-router-dom";
import { thunkGetOnePetProfile } from "../../store/profile";
import { thunkCurrentPetCalorieGoals } from "../../store/calories";
import "./SinglePetProfile.css"

const GetOnePetProfile = () => {
  const dispatch = useDispatch();
  const { profileId } = useParams();
  const profile = useSelector((state) => state.profile[profileId]);
  const loggedIn=useSelector((state)=>state.session)
  const calorieGoal = useSelector((state) => state.calorieReducer);

  useEffect(() => {
    dispatch(thunkGetOnePetProfile(profileId));
    dispatch(thunkCurrentPetCalorieGoals(profileId));
  }, [dispatch, profileId]);

  if (loggedIn.user===null) return "Please Log in to view profile."
  
  if (!profile) return "Profile does not exist";


  
  return (
    <div className="pet-profile">
    <h2>
     {profile.dog_name} | {profile.breed}
    </h2>
    <div className="pet-image">
      <img src={profile.image} alt={profile.dog_name} />
    </div>
    {Object.keys(calorieGoal).length > 0 && (
      <div className="caloric-goals">
        <div className="section-title">Daily Caloric Goal:</div>
        {Object.values(calorieGoal).map((goal) => (
          <div key={goal.id} className="goal-item">
            {/* <div>Goal ID: {goal.id}</div> */}
            {/* <div>Target Calories: {goal.calorie_goal}</div> */}
            {/* <div>Pet ID: {goal.dog_id}</div> */}
          </div>
        ))}
      </div>
    )}
  </div>
  );
};

export default GetOnePetProfile;
