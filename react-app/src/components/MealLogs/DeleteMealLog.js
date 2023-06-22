import { useDispatch } from "react-redux";
import { useModal } from '../../context/Modal'
import { thunkCurrentUserMealLogs,thunkDeleteMealLog } from "../../store/meals";
import "./DeleteMealModal.css"

const DeleteMealLog=({mealId})=>{
    const dispatch = useDispatch()
    const { closeModal } = useModal()


    const handleDelete= async (e) => {
        e.preventDefault()

        await dispatch(thunkDeleteMealLog(mealId))
        dispatch(thunkCurrentUserMealLogs())
        .then(closeModal)
    }

    return (
        <div className="delete-modal">
        <h1>
            Are you sure you want to delete your Meal?
        </h1>

        <button type="keep" className="keep-profile" onClick={handleDelete}>
            Yes (Delete meal log)
        </button>

        <button type="delete" className="delete-profile"  onClick={closeModal}>
            Cancel (Keep meal log )
        </button>
    </div>
)
    
}

export default DeleteMealLog