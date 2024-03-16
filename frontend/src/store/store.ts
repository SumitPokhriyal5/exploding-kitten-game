import { applyMiddleware, combineReducers, compose, legacy_createStore } from 'redux'
import { authReducer } from './auth.reducer';
import { thunk } from 'redux-thunk';



const rootReducer = combineReducers({
     authManager: authReducer,
})

const composeEnhancer = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = legacy_createStore(rootReducer, composeEnhancer(applyMiddleware(thunk)));

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch