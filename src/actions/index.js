import _ from 'lodash';
import jsonPlaceholder from '../apis/jsonPlaceholder';

// export const fetchPosts = () => {
//   return async function (dispatch, getState) {
//     const response = await jsonPlaceholder.get('posts')
  
//     dispatch({type: 'FETCH_POSTS', payload: response})
//   }
// }
export const fetchPostsAndUsers = () => async (dispatch, getState) => {
  await dispatch(fetchPosts())

  // lodash fetches unique userId(s) from posts
  // const userIds = _.uniq(_.map(getState().posts, 'userId'))
  // userIds.forEach(id => dispatch(fetchUser(id)))

  // Alternative - chaining in lodash
  _.chain(getState().posts)
    .map('userId')
    .uniq()
    .forEach(id => dispatch(fetchUser(id)))
    .value()  // more like calling execute
}

// Refactor - fetchPosts returns a function
export const fetchPosts = () => async dispatch => {
    const response = await jsonPlaceholder.get('posts')
  
    dispatch({type: 'FETCH_POSTS', payload: response.data})
  }

export const fetchUser = (id) => async (dispatch) => {
    const response = await jsonPlaceholder.get(`users/${id}`)

    dispatch({type: 'FETCH_USER', payload: response.data})
  }

// METHOD 1
// // we want to memoize to avoid calling every single user 10x
// export const fetchUser = (id) => (dispatch) => _fetchUser(id, dispatch)

// // "underscore" with fetch user means the function is private
// const _fetchUser = _.memoize(async (id, dispatch) => {
//     const response = await jsonPlaceholder.get(`users/${id}`)

//     dispatch({type: 'FETCH_USER', payload: response.data})  
// })

//METHOD 2
