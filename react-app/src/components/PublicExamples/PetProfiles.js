import { useDispatch, useSelector } from "react-redux";
import { useEffect, Fragment } from "react";
import { thunkCurrentUserPets } from "../../store/profile";
import "./ExampleProfiles.css"


const PublicProfiles=()=>{
    const dispatch = useDispatch()



    useEffect(()=>{
        dispatch(thunkCurrentUserPets())
    },[dispatch])

    const data = [
        // Define your seed data here
        { dog_name: "Buddy", breed: "Labrador Retriever", age: 3, weight: 16, img:"https://media.discordapp.net/attachments/1062942242450460744/1121286738573275156/IMG_1465.jpg?width=922&height=1086"},
        { dog_name: "Max", breed: "Golden Retriever", age: 2, weight: 17 ,img:'https://media.discordapp.net/attachments/1062942242450460744/1121286740225830952/IMG_1460.png?width=1000&height=1086'},
        { dog_name: "Charlie", breed: "German Shepherd", age: 4, weight: 80 , img:"https://media.discordapp.net/attachments/1062942242450460744/1121286739441496197/IMG_1462.png?width=914&height=1086"},
      ];

    return (
        <>
        <h1>See our community!</h1>
        <div className="pet-profiles">
          {data.map((profile) => (
            <div className="profile-card" key={profile.id}>
              <div className="profile-info">
                <div>
                Pet Name: {profile.dog_name}
                    </div>
                    <div>
                 Breed: {profile.breed}
                        </div>
        
                <div>
                  Age: {profile.age} years
                </div>
                <div>
                 Weight: {profile.weight} lbs
                </div>
              </div>
              <img className="profile-image" src={profile.img}></img>
              
           
            </div>
          ))}
        </div>
      </>
    )
}

export default PublicProfiles