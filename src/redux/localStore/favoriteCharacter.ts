import { ICharacter } from 'api';

const favoriteCharacterKey = 'favoriteCharacterList';

/**
 * Сохраняет Character в список избранных в localStorage
 * @param favoriteCharacter Character
 */
export const saveFavoriteCharacter = (favoriteCharacter: ICharacter) => {
	const newFavoriteCharacterList = JSON.stringify([...getFavoriteCharacterList(), favoriteCharacter]);

	localStorage.setItem(favoriteCharacterKey, newFavoriteCharacterList);
};

/**
 * Удаляет Character из списка избранных в localStorage
 * @param favoriteCharacterID id удаляемого Character
 */
export const deleteFavoriteCharacter = (favoriteCharacterID: number) => {
	const favoriteCharacterList = getFavoriteCharacterList();
	const newFavoriteCharacterList = JSON.stringify([...favoriteCharacterList.filter(character => character.id !== favoriteCharacterID)]);

	localStorage.setItem(favoriteCharacterKey, newFavoriteCharacterList);
};

/**
 * Возвращает список избранных Character из localStorage
 * @returns список Character
 */
export const getFavoriteCharacterList = () => {
	const localData = localStorage.getItem(favoriteCharacterKey);

	if (localData) {
		return JSON.parse(localData) as ICharacter[];
	}

	return [];
};