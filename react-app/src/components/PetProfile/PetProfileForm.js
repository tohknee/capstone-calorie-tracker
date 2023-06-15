import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useHistory } from 'react-router-dom';
import { useParams } from "react-router-dom";
import { thunkCurrentUserPets } from "../../store/profile";

const PetProfileForm = ()=> {
    const dispatch=useDispatch()
    const history=useHistory()

    const [dog_name,setDogName]=useState("")
    const [breed,setBreed]=useState("")
    const [weight,setWeight]=useState("")
    const [age,setAge]=useState("")
    const [gender,setGender]=useState("")

    useEffect(()=>{
        dispatch(thunkCurrentUserPets)
    })

    const handleSubmit=e=>{
        e.preventDefault()

        let errors={}
        if(!dog_name) errors.dog_name="Pet name required."
        // if(!breed) errors.breed=

        setDogName("");
        setBreed("");
        setWeight("");
        setAge("");
        setGender("");
    }

    return  (
<>
      <h1>Pet Profile Form</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="dog_name">Dog Name:</label>
          <input
            type="text"
            id="dog_name"
            value={dog_name}
            onChange={(e) => setDogName(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="breed">Breed:</label>
          <input
            type="text"
            id="breed"
            value={breed}
            onChange={(e) => setBreed(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="weight">Weight:</label>
          <input
            type="text"
            id="weight"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="age">Age:</label>
          <input
            type="text"
            id="age"
            value={age}
            onChange={(e) => setAge(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="gender">Gender:</label>
          <input
            type="text"
            id="gender"
            value={gender}
            onChange={(e) => setGender(e.target.value)}
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </>
  );
};


export default PetProfileForm