import { useDispatch } from "react-redux";
import { useModal } from '../../context/Modal'
import { thunkGetOnePetProfile, thunkCurrentUserPets,thunkDeleteProfile} from "../../store/profile";
import "./DeleteProfile.css"

const DeletePetProfile=({profileId})=>{
    const dispatch = useDispatch()
    const { closeModal } = useModal()


    const handleDelete= async (e) => {
        e.preventDefault()

        await dispatch(thunkDeleteProfile(profileId))
        dispatch(thunkCurrentUserPets())
        .then(closeModal)
    }

    return (
        <div className="delete-modal">
        <h1>
            Are you sure you want to delete this profile?
        </h1>

        <button  type="keep" className="keep-profile" onClick={handleDelete}>
            Yes (Delete pet profile)
        </button>

        <button type="delete" className="delete-profile" onClick={closeModal}>
            Cancel (Keep pet profile )
        </button>
    </div>
)
    
}

export default DeletePetProfile