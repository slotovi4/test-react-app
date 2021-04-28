import React from 'react';
import {
	FormControl,
	InputLabel,
	Select as MaterialSelect,
	SelectProps,
	MenuItem,
} from '@material-ui/core';

const Select = ({ labelText, items, ...selectProps }: IProps) => {
	return (
		<FormControl>
			<InputLabel>{labelText}</InputLabel>
			<MaterialSelect
				{...selectProps}
				value={selectProps.value || ''}
			>
				{items.map((item, i) => (
					<MenuItem key={i} value={item}>{item}</MenuItem>
				))}
			</MaterialSelect>
		</FormControl>
	);
};

export default React.memo(Select);

interface IProps extends SelectProps {
	items: string[];
	labelText: string;
	onChange: (event: React.ChangeEvent<{ name?: string | undefined; value: string; }>) => void;
}
