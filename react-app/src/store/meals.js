const GET_ALL_MEALS='meals/all'
const GET_ONE_MEAL="meals/one"
const CREATE_MEAL_LOG="meals/new"
const EDIT_MEAL_LOG="meals/edit"
const DELETE_MEAL_LOG="meals/delete"

const loadCurrentUserMealLogs=(meals)=>({
    type:GET_ALL_MEALS,
    meals
})

const getOneMealLog=(meal)=>({
    type:GET_ONE_MEAL,
    meal
})

const createMealLog=(meal)=>({
    type:CREATE_MEAL_LOG,
    meal
})

const editMealLog=(meal)=>({
    type:EDIT_MEAL_LOG,
    meal
})

const deleteMealLog=(meal)=>({
    type:DELETE_MEAL_LOG,
    meal
})

export const thunkCurrentUserMealLogs=()=>async(dispatch)=>{
    const response = await fetch('/api/meals/all')
    if(response.ok){
        const data=await response.json()
        console.log("this is the thunk data", data)
        dispatch(loadCurrentUserMealLogs(data))
    }
    else {
        console.log("Current user meal thunk error")
    }
}

// export const thunkGetOneMealLog=()=> async (dispatch)=>{
//     const response= await fetch(`/api/meal/details/${mealId}`)

//     if (response.ok) {
//         const data = await response.json()
//         dispatch(getOneMealLog(data))
//     }
// }

// export const thunkCreateMealLog=()=>async(dispatch)=>{
//     const response = await fetch('/api/meals/new',{
//         "method": "POST",
//         "headers": { 'Content-Type': 'application/json' },
//         "body": JSON.stringify(
//             profile
//         )
//     })
//     if (response.ok) {
//         const data = await response.json()
//             dispatch(createProfile(data))
//     }
// }
// export const thunkEditMealLog=(meal)=>async dispatch => {
//     const response=await fetch(`/api/meals/edit/${meal.id}`,{
//         method: 'PUT',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(meal)
//     })
// }

// export const thunkDeleteMealLog=(mealId)=> async (dispatch) =>{
//     const response=await fetch (`/api/meals/delete/${mealId}`,{
//         method: 'DELETE'
//     })
//     if (response.ok) {
//         dispatch(deleteMealLog(mealId))
//     }
// }
const initialState={}
const mealReducer = (state=initialState, action)=> {
    switch(action.type) {
        case GET_ALL_MEALS:{
            const newState={}
            const allMealLogs=action.meals

            allMealLogs.forEach(meal=>{
                newState[meal.id]=meal
            })
            return {
                ...state,
                ...newState
            }
        }
        case GET_ONE_MEAL:{
            const newState={}
            const newMealLog=action.meal
            newState[newMealLog.id]=newMealLog
            return{
                ...state,
                ...newState
            }
        }
        case EDIT_MEAL_LOG:{
            const newState={}
            const newMealLog= action.meal
            newState[newMealLog.id]=newMealLog //cjamge tjis
            return{
                ...state,
                ...newState
            }
        }
        case DELETE_MEAL_LOG:{
            const mealId=action.meal
            const newState= {
                ...state
            }
            delete newState[mealId]
            return newState
        }
        default:return state
    }
}

export default mealReducer