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
}

export type TCharacterGender = 'Male' | 'Female' | 'Genderless' | 'unknown';
export type TCharacterStatus = 'Alive' | 'Dead' | 'unknown';