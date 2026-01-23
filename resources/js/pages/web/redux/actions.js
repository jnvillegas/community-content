export const INCREMENT = 'INCREMENT';

export const increment = () => ({ type: INCREMENT });

export const GET_USERS = "GET_USERS";

export const getUsers = () => {
    return async function (dispatch) {
        const response = await fetch("https://jsonplaceholder.typicode.com/users");
        const data = await response.json();

        dispatch({ type: GET_USERS, payload: data });
    };
}