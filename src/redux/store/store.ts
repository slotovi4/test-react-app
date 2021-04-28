import { History } from 'history';
import { init, RematchRootState } from '@rematch/core';
import { character } from '../models';
import { createBrowserHistory } from 'history';
import { connectRouter } from 'connected-react-router';

const models = {
	character,
};

export const browserHistory: History = createBrowserHistory();

export const store = init({
	models,
	plugins: [],
	redux: {
		initialState: {},
		reducers: {
			router: connectRouter(browserHistory),
		},
		middlewares: [],
	},
});

export type TDispatch = typeof store.dispatch;
export type TRootState = RematchRootState<typeof models>;