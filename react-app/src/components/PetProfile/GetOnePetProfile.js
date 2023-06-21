import { useDispatch, useSelector } from "react-redux";
import { useEffect, Fragment } from "react";
import { useParams } from "react-router-dom";
import { thunkGetOnePetProfile } from "../../store/profile";
import { thunkCurrentPetCalorieGoals } from "../../store/calories";

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
    <div>
      <div>GET ONE PRFILE</div>
      <div>
        pet name {profile.dog_name} breed {profile.breed}
      </div>
      {Object.keys(calorieGoal).length > 0 && (
        <div>
          <div>Caloric Goals:</div>
          {Object.values(calorieGoal).map((goal) => (
            <div key={goal.id}>
              Goal ID: {goal.id}, Target Calories: {goal.calorie_goal} , Pet ID: {goal.dog_id}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default GetOnePetProfile;
