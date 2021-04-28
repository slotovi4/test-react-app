import { ISortCharacterListData } from './types';

const nameKey = 'name';
const genderKey = 'gender';
const statusKey = 'status';

export const createCharacterSearchParams = (sortData?: ISortCharacterListData) => {
	return sortData
		? `?${nameKey}=${sortData?.name || ''}&${genderKey}=${sortData?.gender || ''}&${statusKey}=${sortData?.status || ''}`
		: '';
};

export const getCharacterSearchParams = (): ISortCharacterListData => {
	const urlParams = new URLSearchParams(window.location.search);
	const name = (urlParams.get(nameKey) || undefined) as ISortCharacterListData['name'];
	const gender = (urlParams.get(genderKey) || undefined) as ISortCharacterListData['gender'];
	const status = (urlParams.get(statusKey) || undefined) as ISortCharacterListData['status'];

	return {
		name,
		gender,
		status
	};
};