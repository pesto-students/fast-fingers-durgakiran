export const initialState = {
    userName: sessionStorage.getItem('userName') || '',
    difficulty: sessionStorage.getItem('difficulty') || ''
}

export function reducer(state, action) {
    console.log(action);
    switch (action.type) {
        case 'ADD_USER_NAME':
            return {
                ...state,
                userName: action.userName,
                difficulty: action.difficulty
            };
        case 'UPDATE_SCORE_LEVEL':
            return state;
    
        default:
            return  state;
    }
}
