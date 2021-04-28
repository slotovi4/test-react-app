import React from 'react';
import {
	ISortCharacterListData,
	createCharacterSearchParams,
	getCharacterSearchParams
} from 'api';
import {
	browserHistory,
	TRootState,
	TDispatch
} from 'store';
import { Home } from 'components';
import { connect } from 'react-redux';

const HomeContainer = ({
	characterList,
	getCharactersList,
	favoriteCharacterList,
	addFavoriteCharacter,
	onLocalUpdateFavoriteCharacterList,
}: TProps) => {
	const isSortChanged = React.useRef(false);
	const initSortData = React.useMemo(() => getCharacterSearchParams(), []);
	const localStorageListener = React.useCallback(() => {
		addEventListener('storage', (() => {
			onLocalUpdateFavoriteCharacterList();
		}));
	}, []);
	const [sortTimeOut, setSortTimeOut] = React.useState<NodeJS.Timeout | null>(null);
	const [sortData, setSortData] = React.useState<ISortCharacterListData>(initSortData);

	React.useEffect(() => {
		const fetch = async () => {
			await getCharactersList(initSortData);
		};

		localStorageListener();
		fetch();

		return () => {
			removeEventListener('storage', localStorageListener);
		};
	}, []);

	React.useEffect(() => {
		if (!isSortChanged.current) {
			return;
		}

		if (sortTimeOut) {
			clearTimeout(sortTimeOut);
		}

		const timeout = setTimeout(async () => {
			await getCharactersList(sortData);
			saveSearchParams();
		}, 1000);

		setSortTimeOut(timeout);

		return () => {
			if (sortTimeOut) {
				clearTimeout(sortTimeOut);
			}
		};
	}, [sortData.name]);


	React.useEffect(() => {
		if (!isSortChanged.current) {
			return;
		}

		const fetch = async () => {
			await getCharactersList(sortData);
			saveSearchParams();
		};

		fetch();

	}, [sortData.gender, sortData.status]);

	const saveSearchParams = () => {
		const searchParams = createCharacterSearchParams(sortData);

		browserHistory.push(searchParams);
	};

	const onChangeSort = (newSortData: ISortCharacterListData) => {
		if (!isSortChanged.current) {
			isSortChanged.current = true;
		}

		setSortData((prevSortData) => ({ ...prevSortData, ...newSortData }));
	};

	return (
		<Home
			characterList={characterList}
			favoriteCharacterList={favoriteCharacterList}
			addFavoriteCharacter={addFavoriteCharacter}
			onChangeSort={onChangeSort}
			sortData={sortData}
		/>
	);
};

const mapState = (state: TRootState) => ({
	characterList: state.character.characterList,
	favoriteCharacterList: state.character.favoriteCharacterList
});

const mapDispatch = (dispatch: TDispatch) => ({
	getCharactersList: dispatch.character.getCharactersList,
	addFavoriteCharacter: dispatch.character.addFavoriteCharacter,
	onLocalUpdateFavoriteCharacterList: dispatch.character.onLocalUpdateFavoriteCharacterList
});

export default connect(mapState, mapDispatch)(HomeContainer);

type TProps = ReturnType<typeof mapState> & ReturnType<typeof mapDispatch>;