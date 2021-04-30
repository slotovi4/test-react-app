import { instance } from './config';
import { ICharacter, ISortCharacterListData, ICharacterPagination } from './types';
import { createCharacterSearchParams } from './helpers';
import { AxiosResponse, AxiosError } from 'axios';

export default {
	/**
	 * Получить список Character
	 * @param sortData данные сортировки для Character
	 * @returns список Character
	 */
	getCharacterList: (sortData?: ISortCharacterListData) =>
		instance.get(`character/${createCharacterSearchParams(sortData)}`)
			.then((response: AxiosResponse<ISuccessCharacterRequestResult>) => {
				return response;
			})
			.catch((error: AxiosError) => {
				console.log(error);
			})
			.then((e?: AxiosResponse<ISuccessCharacterRequestResult>) => {
				if (e) {
					return {
						characterList: e.data.results,
						pagination: e.data.info
					};
				}

				return null;
			}),
};

export * from './types';
export * from './helpers';

interface ISuccessCharacterRequestResult {
	info: ICharacterPagination;
	results: ICharacter[];
}