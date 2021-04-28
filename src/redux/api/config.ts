import axios, { AxiosRequestConfig } from 'axios';

const config: AxiosRequestConfig = {
	baseURL: 'https://rickandmortyapi.com/api/',
};

export const instance = axios.create(config);