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
	pagesCount,
	processing,
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
		};

		fetch();

	}, [sortData.gender, sortData.status]);

	React.useEffect(() => {
		if (!isSortChanged.current) {
			return;
		}

		const searchParams = createCharacterSearchParams(sortData);
		browserHistory.push(searchParams);

	}, [sortData]);

	const onChangePage = async (page: number | undefined) => {
		if (!isSortChanged.current) {
			isSortChanged.current = true;
		}

		const newSortData = { ...sortData, page: page !== undefined ? page + 1 : undefined };

		await getCharactersList(newSortData);
		setSortData(newSortData);
	};

	const onChangeSort = (newSortData: ISortCharacterListData) => {
		if (!isSortChanged.current) {
			isSortChanged.current = true;
		}

		setSortData((prevSortData) => ({ ...prevSortData, ...newSortData, page: undefined }));
	};

	return (
		<Home
			characterList={characterList}
			favoriteCharacterList={favoriteCharacterList}
			addFavoriteCharacter={addFavoriteCharacter}
			onChangeSort={onChangeSort}
			onChangePage={onChangePage}
			sortData={sortData}
			pagesCount={pagesCount}
			processing={processing}
		/>
	);
};

const mapState = (state: TRootState) => ({
	characterList: state.character.characterList,
	favoriteCharacterList: state.character.favoriteCharacterList,
	pagesCount: state.character.pagination?.pages,
	processing: state.character.processing
});

const mapDispatch = (dispatch: TDispatch) => ({
	getCharactersList: dispatch.character.getCharactersList,
	addFavoriteCharacter: dispatch.character.addFavoriteCharacter,
	onLocalUpdateFavoriteCharacterList: dispatch.character.onLocalUpdateFavoriteCharacterList,
});

export default connect(mapState, mapDispatch)(HomeContainer);

type TProps = ReturnType<typeof mapState> & ReturnType<typeof mapDispatch>;