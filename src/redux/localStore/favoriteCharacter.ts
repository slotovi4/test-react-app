import { ICharacter } from 'api';

const favoriteCharacterKey = 'favoriteCharacterList';

export const saveFavoriteCharacter = (favoriteCharacter: ICharacter) => {
	const newFavoriteCharacterList = JSON.stringify([...getFavoriteCharacterList(), favoriteCharacter]);

	localStorage.setItem(favoriteCharacterKey, newFavoriteCharacterList);
};

export const deleteFavoriteCharacter = (favoriteCharacterID: number) => {
	const favoriteCharacterList = getFavoriteCharacterList();
	const newFavoriteCharacterList = JSON.stringify([...favoriteCharacterList.filter(character => character.id !== favoriteCharacterID)]);

	localStorage.setItem(favoriteCharacterKey, newFavoriteCharacterList);
};

export const getFavoriteCharacterList = () => {
	const localData = localStorage.getItem(favoriteCharacterKey);

	if (localData) {
		return JSON.parse(localData) as ICharacter[];
	}

	return [];
};