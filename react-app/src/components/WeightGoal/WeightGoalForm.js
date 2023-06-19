import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useParams } from "react-router-dom";

const WeightGoalForm = (formType,weightGoal) => {
  const dispatch = useDispatch();
  const history = useHistory();

  const [weight_goal, setWeightGoal] = useState();
  const [date, setDate] = useState();
  const [current_weight, setCurrentWeight] = useState();

  const handleSubmit = (e) => {
    if (formType === "Create weight goal") {
      dispatch(thunkCreatePetProfile(profile));
      dispatch(thunkCurrentUserPets());
      history.push(`/profile`);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Weight Goal:</label>
          <input
            type="text"
            id="weight_goal"
            value={weight_goal}
            onChange={(e) => setWeightGoal(e.target.value)}
          ></input>
        </div>
        <div>
          <label htmlFor="date">Date:</label>
          <input
            type="date"
            id="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="current_weight">Current Weight:</label>
          <input
            type="text"
            id="current_weight"
            value={current_weight}
            onChange={(e) => setCurrentWeight(e.target.value)}
          />
        </div>
      </form>
    </div>
  );
};

export default WeightGoalForm;
