import {
	saveFavoriteCharacter,
	getFavoriteCharacterList,
	deleteFavoriteCharacter
} from 'localStore';
import api, {
	ICharacter,
	ICharacterPagination,
	ISortCharacterListData,
} from 'api';
import { createModel } from '@rematch/core';

const initialState: IState = {
	characterList: null,
	favoriteCharacterList: getFavoriteCharacterList(),
	pagination: null,
	processing: false
};

const character = createModel({
	state: initialState,
	reducers: {
		updateProcessing(state: IState, processing: IState['processing']) {
			return {
				...state,
				processing
			};
		},
		updateCharacterList(state: IState, characterList: IState['characterList']) {
			return {
				...state,
				characterList
			};
		},
		updateCharacterPagination(state: IState, pagination: IState['pagination']) {
			return {
				...state,
				pagination
			};
		},
		updateFavoriteCharacterList(state: IState, favoriteCharacterList: IState['favoriteCharacterList']) {
			return {
				...state,
				favoriteCharacterList
			};
		}
	},
	effects: dispatch => ({
		async getCharactersList(sortData?: ISortCharacterListData) {
			this.updateProcessing(true);
			const result = await api.getCharacterList(sortData);
			this.updateProcessing(false);

			if (result) {
				this.updateCharacterList(result.characterList);
				this.updateCharacterPagination(result.pagination);
			} else {
				this.updateCharacterList(null);
				this.updateCharacterPagination(null);
			}
		},
		addFavoriteCharacter(favoriteCharacter: ICharacter, rootState) {
			const state: IState = rootState.character;
			const { favoriteCharacterList } = state;
			const isFavorite = favoriteCharacterList.find(e => e.id === favoriteCharacter.id);

			if (isFavorite) {
				deleteFavoriteCharacter(isFavorite.id);
				this.updateFavoriteCharacterList(favoriteCharacterList.filter(savedCharacter => savedCharacter.id !== isFavorite.id));
			} else {
				saveFavoriteCharacter(favoriteCharacter);
				this.updateFavoriteCharacterList([...favoriteCharacterList, favoriteCharacter]);
			}
		},
		onLocalUpdateFavoriteCharacterList() {
			this.updateFavoriteCharacterList(getFavoriteCharacterList());
		}
	}),
});

export default character;

interface IState {
	characterList: ICharacter[] | null;
	favoriteCharacterList: ICharacter[];
	pagination: ICharacterPagination | null;
	processing: boolean;
}
