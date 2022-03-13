export const initialState = null;

export const reducer = (state,action) => {
    if (action.type === "ADMIN") {
        return action.payload;
    }
    else if(action.type === "USER"){
        return action.payload;
    }
    else if(action.type === "LOGOUT"){
        return action.payload;
    }
    else if(action.type === "REGISTER"){
        return action.payload;
    }

    return state;
}