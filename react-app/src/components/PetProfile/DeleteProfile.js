import { useDispatch } from "react-redux";
import { useModal } from '../../context/Modal'
import { thunkGetOnePetProfile, thunkCurrentUserPets,thunkDeleteProfile} from "../../store/profile";


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
        <div>
        <h1>
            Are you sure you want to delete your profile?
        </h1>

        <button onClick={handleDelete}>
            Yes (Delete pet profile)
        </button>

        <button onClick={closeModal}>
            Cancel (Keep pet profile )
        </button>
    </div>
)
    
}

export default DeletePetProfile