import profileReducer from './profile-reducer'
import { actions } from './profile-reducer'


let state = {
    posts: [
        {id: 1, message: 'Hi, how are you?', likesCount: 12},
        {id: 2, message: 'It\'s my first post', likesCount: 11},
        {id: 3, message: 'Blabla', likesCount: 11},
        {id: 4, message: 'Dada', likesCount: 11}
    ],
    profile: null,
    status: "",
    newPostText:"" 
};

test('lenght of posts should be increase', () => {
    //1. test data
    let action = actions.addPostActionCreator('blabla.com')
    //2. action
    let newState = profileReducer(state, action)

    //3. expectation
    expect(newState.posts.length).toBe(5)
});

test('message of new post should be correct', () => {
    //1. test data
    let action = actions.addPostActionCreator('blabla.com')
    //2. action
    let newState = profileReducer(state, action)

    //3. expectation
    expect(newState.posts[4].message).toBe('blabla.com')

});

test('affter deleting messages lenght of messages array should be decrement', () => {
    //1. test data
    let action = actions.deletePost(1)
    //2. action
    let newState = profileReducer(state, action)

    //3. expectation
    expect(newState.posts.length).toBe(3)

});

test('affter deleting messages lenght of messages array shouldn`t be changed if id is incorrect', () => {
    //1. test data
    let action = actions.deletePost(1000)
    //2. action
    let newState = profileReducer(state, action)

    //3. expectation
    expect(newState.posts.length).toBe(4)

});
  
  
  

