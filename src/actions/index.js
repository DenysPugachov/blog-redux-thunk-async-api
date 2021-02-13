import jsonPlaceholder from "../api/jsonPlaceholder";
import _ from "lodash"


export const fetchPosts = () => async dispatch => {

  const response = await jsonPlaceholder.get(`/posts`);

  dispatch({ type: "FETCH_POSTS", payload: response.data });
};


// export const fetchUser = (id) => async dispatch => {

//   const response = await jsonPlaceholder.get(`/users/${id}`);

//   dispatch({ type: "FETCH_USER", payload: response.data });
// };


//with _.memoize can't update data (data always will be loaded form cash)
export const fetchUser = id => dispatch => _fetchUser(id, dispatch);

const _fetchUser = _.memoize(async (id, dispatch) => {

  const response = await jsonPlaceholder.get(`/users/${id}`);

  dispatch({ type: "FETCH_USER", payload: response.data });
});
