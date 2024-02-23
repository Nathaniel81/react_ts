import { combineReducers } from '@reduxjs/toolkit';
import userLoginReducer from './slices/userLoginSlice';
import subredditCreateReducer from './slices/subredditCreateSlice';
import subredditListReducer from './slices/subredditListSlice';
import subredditDetailReducer from './slices/subredditDetailSlice';
import joinSubredditReducer from './slices/subscribeSlice';
import leaveSubredditReducer from './slices/unsubscribeSlice';
import postsReducer from './slices/postCreateSlice';
import postListReducer from './slices/postListSlice';

const rootReducer = combineReducers({
	userLogin: userLoginReducer,
	subredditList: subredditListReducer,
	subredditCreate: subredditCreateReducer,
	subredditDetail: subredditDetailReducer,
	subscribe: joinSubredditReducer,
	unsubscribe: leaveSubredditReducer,
	postCreate: postsReducer,
	postList: postListReducer
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
