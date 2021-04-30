export interface ICharacter {
	created: string;
	id: number;
	image: string;
	name: string;
	gender: TCharacterGender;
	status: TCharacterStatus;
}

export interface ISortCharacterListData {
	name?: ICharacter['name'];
	status?: ICharacter['status'];
	gender?: ICharacter['gender'];
	page?: number;
}

export interface ICharacterPagination {
	count: number | null;
	next: number | null;
	pages: number | null;
	prev: number | null;
}

export type TCharacterGender = 'Male' | 'Female' | 'Genderless' | 'unknown';
export type TCharacterStatus = 'Alive' | 'Dead' | 'unknown';