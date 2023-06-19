import { useDispatch, useSelector } from "react-redux";
import { useEffect, Fragment } from "react";
import { useParams } from "react-router-dom";
import { thunkGetOnePetProfile } from "../../store/profile";
import { thunkCurrentPetCalorieGoals } from "../../store/calories";

const GetOnePetProfile = () => {
  const dispatch = useDispatch();
  const { profileId } = useParams();
  const profile = useSelector((state) => state.profile[profileId]);
  const calorieGoal = useSelector((state) => state.calorieReducer);
  console.log("THIS IS GET ONE PROFILE", profile);
  console.log("THIS IS GET calorie goa", calorieGoal);

  useEffect(() => {
    dispatch(thunkGetOnePetProfile(profileId));
    dispatch(thunkCurrentPetCalorieGoals(profileId));
  }, [dispatch, profileId]);

  if (!profile) return "Profile does not exist";
  return (
    <div>
      {console.log(profile)}
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
