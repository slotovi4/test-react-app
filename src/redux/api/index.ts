import { instance } from './config';
import { ICharacter, ISortCharacterListData } from './types';
import { createCharacterSearchParams } from './helpers';
import { AxiosResponse, AxiosError } from 'axios';

export default {
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
					return e.data.results;
				}

				return null;
			}),
};

export * from './types';
export * from './helpers';

interface ISuccessCharacterRequestResult {
	info: {
		count: number | null;
		next: number | null;
		pages: number | null;
		prev: number | null;
	};
	results: ICharacter[];
}