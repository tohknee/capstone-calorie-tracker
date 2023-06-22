import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useParams } from "react-router-dom";
import {
  thunkCurrentUserPets,
  thunkCreatePetProfile,
  thunkEditProfile,
} from "../../store/profile";

import "./PetProfileForm.css"

const PetProfileForm = ({ profile, formType }) => {
  const dispatch = useDispatch();
  const history = useHistory();

  const [dog_name, setDogName] = useState(profile?.dog_name);
  const [breed, setBreed] = useState(profile?.breed);
  const [weight, setWeight] = useState(profile?.weight);
  const [age, setAge] = useState(profile?.age);
  const [gender, setGender] = useState(profile?.gender);
  const [validationErrors, setValidationErrors] = useState("");

  useEffect(() => {
    dispatch(thunkCurrentUserPets());
  }, [dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();

    let errors = {};
    if (!dog_name) errors.dog_name = "Pet name required.(max 12 characters)";
    if(!weight) errors.weight="Please enter a weight. "
    if(weight>300) errors.weight="Is your dog really over 300lbs?"
    if(age>30) errors.age= "Your pet is old! Check in on them and the age input"
    if(!breed) errors.breed ="Please select an option below."
    if(!age) errors.age ="Please approximate your pet's age."
    setValidationErrors(errors);

    if (!!Object.keys(errors).length) return;

    profile = {
      ...profile,
      dog_name,
      breed,
      weight,
      age,
      gender,
    };

    if (formType === "Create Profile") {
      dispatch(thunkCreatePetProfile(profile));
      dispatch(thunkCurrentUserPets());
      history.push(`/profile`);
    }
    if (formType === "Edit Profile") {
      dispatch(thunkEditProfile(profile));
      dispatch(thunkCurrentUserPets());
      history.push(`/profile`);
    }
  };

  return (
    <div className="pet-profile-form">
      <h1>Pet Profile Form</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-section">
          {validationErrors.dog_name ? (
            <p className="errors">{validationErrors.dog_name}</p>
          ) : null}
          <label htmlFor="dog_name">*Dog Name(max:12 characters):</label>
          <input
            type="text"
            id="dog_name"
            maxLength={12}
            value={dog_name}
            onChange={(e) => setDogName(e.target.value)}
          />
        </div>
        <div className="form-section">
        {validationErrors.breed ? (
            <p className="errors">{validationErrors.breed}</p>
          ) : null}
          <label htmlFor="breed">*Breed(Please select one from the list):</label>
          <select
            id="breed"
            value={breed}
            onChange={(e) => setBreed(e.target.value)}
          >
            <option value="">Select a breed</option>
            <option value="mixed">Mixed</option>
            <option value="labrador">Labrador Retriever</option>
            <option value="poodle">Poodle</option>
            <option value="germanshepherd">German Shepherd</option>
            <option value="bulldog">Bulldog</option>
            <option value="goldenretriever">Golden Retriever</option>
            <option value="beagle">Beagle</option>
            <option value="rottweiler">Rottweiler</option>
            <option value="boxer">Boxer</option>
            <option value="dachshund">Dachshund</option>
            <option value="yorkshireterrier">Yorkshire Terrier</option>
            <option value="other">Other</option>
          </select>
        </div>

        <div className="form-section">
        {validationErrors.weight ? (
            <p className="errors">{validationErrors.weight}</p>
          ) : null}
          <label htmlFor="weight">*Weight (lbs):</label>
          <input
            type="number"
            id="weight"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            min="0"
            step="1"
            max="300"
          />
        </div>
        <div>
        {validationErrors.age ? (
            <p className="errors">{validationErrors.age}</p>
          ) : null}
          <label htmlFor="age">*Age (years):</label>
          <input
            type="number"
            id="age"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            min="0"
            max="30"
          />
        </div>
        {/* <div>
          <label htmlFor="gender">Gender:</label>
          <input
            type="text"
            id="gender"
            value={gender}
            onChange={(e) => setGender(e.target.value)}
          />
        </div> */}
        <label>* required fields</label>
        <div>

        <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
};

export default PetProfileForm;
