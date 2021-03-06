import jsonPlaceholder from "../api/jsonPlaceholder";
import _ from "lodash"


export const fetchPostsAndUsers = () => async (dispatch, getState) => {
  //need to dispatch the results of actionCreator (fetchPosts)
  //wait before data will arrived in fetchPost()
  await dispatch(fetchPosts());

  //_.map => get all value passed as second argument in array;
  //_.uniq => return only uniq value as array;
  const userIds = _.uniq(_.map(getState().posts, "userId"));

  //get all users names with uniq id
  userIds.forEach(id => dispatch(fetchUser(id)));

  //=== Alternative way with _. ====
  // _.chain(getState().posts)
  //   .map("userId")
  //   .uniq()
  //   .forEach(id => dispatch(fetchUser(id)))
  //   .value();
}


export const fetchPosts = () => async dispatch => {
  const response = await jsonPlaceholder.get(`/posts`);

  dispatch({ type: "FETCH_POSTS", payload: response.data });
};


export const fetchUser = id => async dispatch => {
  const response = await jsonPlaceholder.get(`/users/${id}`);

  dispatch({ type: "FETCH_USER", payload: response.data });
};


//with _.memoize can't update data (data always will be loaded form cash)
// export const fetchUser = id => dispatch => _fetchUser(id, dispatch);

// const _fetchUser = _.memoize(async (id, dispatch) => {

//   const response = await jsonPlaceholder.get(`/users/${id}`);

//   dispatch({ type: "FETCH_USER", payload: response.data });
// });
