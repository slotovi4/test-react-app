import { ISortCharacterListData } from './types';

const nameKey = 'name';
const genderKey = 'gender';
const statusKey = 'status';
const pageKey = 'page';

/**
 * Создает search params для Character
 * @param sortData данные для сортировки Character
 * @returns url
 */
export const createCharacterSearchParams = (sortData?: ISortCharacterListData) => {
	return sortData
		? `?${nameKey}=${sortData?.name || ''}&${genderKey}=${sortData?.gender || ''}&${statusKey}=${sortData?.status || ''}&${pageKey}=${sortData?.page || ''}`
		: '';
};

/**
 * Получает search params из url для Character
 * @returns данные для сортировки Character
 */
export const getCharacterSearchParams = (): ISortCharacterListData => {
	const urlParams = new URLSearchParams(window.location.search);
	const name = urlParams.get(nameKey) || undefined;
	const gender = (urlParams.get(genderKey) || undefined) as ISortCharacterListData['gender'];
	const status = (urlParams.get(statusKey) || undefined) as ISortCharacterListData['status'];
	const page = Number(urlParams.get(pageKey));

	return {
		name,
		gender,
		status,
		page
	};
};