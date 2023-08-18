import axios from 'axios';
import { requestHandler, successHandler, errorHandler } from '../interceptor';

const ApiFn = () =>
	axios.create({
		baseURL: process.env.NEXT_PUBLIC_APP_BASE_URL,
		headers: {
			'ngrok-skip-browser-warning': true,
			'Content-type': 'application/json',
			'Access-Control-Allow-Origin': '*',
			'origin-name': process.env.NEXT_PUBLIC_APP_ORIGIN,
		},
		_retry: false,
	});

const API = ApiFn();
// Handle request process
API.interceptors.request.use((request) => requestHandler(request));

// Handle response process
API.interceptors.response.use(
	(response) => successHandler(response),
	(error) => errorHandler(error)
);

export default API;