const initialState = {
    unplanned: new Map(),
    planned: new Map()
};
const courseReudcer = (state = initialState, action) => { 
    switch (action.type) { 
        case 'SET_COURSES':
            return { ...state, initialCourses: action.payload };
        case 'SET_COURSE':
            return { ...state, course: action.payload };
        case 'APPEND': 
            return state.append(action.payload); 
        case 'DELETE': 
            return state.filter((value, index) => {
                return value !== action.payload; 
            }); 
        default: 
            return state; 
    }
}

export default courseReudcer;