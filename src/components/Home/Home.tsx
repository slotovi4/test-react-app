import React from 'react';
import {
	ICharacter,
	ISortCharacterListData,
	TCharacterGender,
	TCharacterStatus
} from 'api';
import {
	TextField,
	TableRow,
	TableHead,
	TableCell,
	TableBody,
	Table
} from '@material-ui/core';
import { cn } from '@bem-react/classname';
import { Select } from 'components';
import logo from './logo.svg';
import './Home.scss';

const genderSelectValuesList: TCharacterGender[] = ['Female', 'Genderless', 'Male', 'unknown'];
const statusSelectValuesList: TCharacterStatus[] = ['Alive', 'Dead', 'unknown'];

const Home = ({
	characterList,
	onChangeSort,
	sortData,
	favoriteCharacterList,
	addFavoriteCharacter
}: IProps) => {
	const home = cn('Home');

	const onSortName = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
		onChangeSort(({ name: e.target.value }));
	};

	const onSortGender = (event: React.ChangeEvent<HTMLSelectElement>) => {
		const gender = event.target.value as TCharacterGender | undefined;

		onChangeSort(({ gender }));
	};

	const onSortStatus = (event: React.ChangeEvent<HTMLSelectElement>) => {
		const status = event.target.value as TCharacterStatus | undefined;

		onChangeSort(({ status }));
	};

	const isFavorite = (characterId: number) => Boolean(favoriteCharacterList?.find(character => character.id === characterId));

	const addFavorite = (character: ICharacter) => () => {
		addFavoriteCharacter(character);
	};

	return (
		<section className={home()}>
			<header className={home('Header')}>
				<img src={logo} className={home('Logo')} alt="logo" />
			</header>
			<section>
				<Table aria-label="customized table">
					<TableHead>
						<TableRow>
							<TableCell colSpan={2}>
								<TextField
									size='small'
									id="standard-basic"
									label="Name"
									onChange={onSortName}
									defaultValue={sortData.name}
									fullWidth
								/>
							</TableCell>
							<TableCell align="right">
								<Select
									className={home('Select')}
									labelText='Gender'
									onChange={onSortGender}
									items={genderSelectValuesList}
									value={sortData.gender}
								/>
							</TableCell>
							<TableCell align="right">
								<Select
									className={home('Select')}
									labelText='Status'
									onChange={onSortStatus}
									items={statusSelectValuesList}
									value={sortData.status}
								/>
							</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{characterList ? characterList.map((character) => (
							<TableRow key={character.id}>
								<TableCell component="th" scope="row">
									<img width={30} height={30} src={character.image} alt="Character image" />
								</TableCell>
								<TableCell align="right">{character.name}</TableCell>
								<TableCell align="right">{character.gender}</TableCell>
								<TableCell align="right">
									{character.status}
									<div
										className={home('FavoriteIcon', { active: isFavorite(character.id) })}
										onClick={addFavorite(character)}
									/>
								</TableCell>
							</TableRow>
						)) : (
							<TableRow>
								<TableCell colSpan={4} align="center">Character list is empty</TableCell>
							</TableRow>
						)}
					</TableBody>
				</Table>
			</section>
		</section>
	);
};

export default React.memo(Home);

interface IProps {
	characterList: ICharacter[] | null;
	favoriteCharacterList: ICharacter[] | null;
	sortData: ISortCharacterListData;
	addFavoriteCharacter: (character: ICharacter) => void;
	onChangeSort: (sortData?: ISortCharacterListData) => void;
}
