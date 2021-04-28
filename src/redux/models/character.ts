import {
	saveFavoriteCharacter,
	getFavoriteCharacterList,
	deleteFavoriteCharacter
} from 'localStore';
import { createModel } from '@rematch/core';
import api, { ICharacter, ISortCharacterListData } from 'api';

const initialState: IState = {
	characterList: null,
	favoriteCharacterList: getFavoriteCharacterList()
};

const character = createModel({
	state: initialState,
	reducers: {
		updateCharacterList(state: IState, characterList: IState['characterList']) {
			return {
				...state,
				characterList
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
			const characterList = await api.getCharacterList(sortData);

			this.updateCharacterList(characterList);
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
}
