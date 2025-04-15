import { isNaN } from 'lodash';
import toastr from 'toastr';
import 'toastr/build/toastr.min.css';

const safeStringify = (object) =>
	JSON.stringify(object)?.replace(/</g, '\\u003c');

const showToastr = ({ type, message, title }) => {
	toastr.options = {
		positionClass: 'toast-top-right',
		timeOut: '4000',
		// extendedTimeOut,
		closeButton: true,
		// debug,
		progressBar: true,
		preventDuplicates: true,
		newestOnTop: true,
		// showEasing,
		// hideEasing,
		// showMethod,
		// hideMethod,
		// showDuration,
		// hideDuration
	};

	// setTimeout(() => toastr.success(`Settings updated `), 300)
	// Toaster Types
	if (type === 'info') toastr.info(message, title);
	else if (type === 'warning') toastr.warning(message, title);
	else if (type === 'error') toastr.error(message, title);
	else toastr.success(message, title);
};

const clearEmptyProperty = (payload = {}) =>
	Object.fromEntries(
		Object.entries(payload).filter(
			([, v]) => v != null || v !== undefined || v !== ''
		)
	);

const getDateDaysAgo = (days) => {
	const now = new Date();
	now.setDate(now.getDate() - days);
	return now;
};
const formatDateYMD = (date) => {
	const d = new Date(date);
	let month = `${d.getMonth() + 1}`;
	let day = `${d.getDate()}`;
	const year = d.getFullYear();

	if (month.length < 2) month = `0${month}`;
	if (day.length < 2) day = `0${day}`;

	return [year, month, day].join('-');
};

const downloadFileInSameWindow = (url) => {
	const element = document.createElement('a');
	element.setAttribute('href', url);

	element.style.display = 'none';
	document.body.appendChild(element);

	element.click();
	document.body.removeChild(element);

	showToastr({ message: 'File downloaded successfully', type: 'success' });
};

const downloadFileInNewWindow = (url) => {
	const downloadWindow = window.open(
		url,
		'download-file',
		'width=700,height=700'
	);
	setTimeout(() => {
		downloadWindow.close();
		showToastr({ message: 'File downloaded successfully', type: 'success' });
	}, 4000);
};

// Convert string with redundant data like " , " to integer
const strToInt = (str) => {
	const updatedStr = str?.replace(',', '');
	return parseFloat(updatedStr);
};

const addCommasToNumber = (value) => {
	const val = typeof value === 'string' ? parseFloat(value) : value;

	if (isNaN(val) || val === null || val === undefined) {
		return 0;
	}
	return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

const formatInKMB = (value) => {
	const num = typeof value === 'string' ? parseFloat(value) : value;

	if (isNaN(num)) {
		return 0;
	}

	const thresholds = [
		{ limit: 1e9, suffix: 'B' }, // Billion
		{ limit: 1e6, suffix: 'M' }, // Million
		{ limit: 1e3, suffix: 'K' }, // Thousand
	];

	for (const { limit, suffix } of thresholds) {
		if (num >= limit) {
			return (num / limit).toFixed(0) + suffix;
		}
	}

	return num.toString();
};

const capitalizeString = (str) => {
	if (!str) return '';

	return str.replace(/\b\w/g, (char) => char.toUpperCase());
};

const humanizeUsernames = (input, addHtml = false) => {
	if (!input) return;
	const regex = /@{([^:]+):[^}]+}/g;
	const convertedText = input.replace(
		regex,
		addHtml
			? '<span class="conversation-name" style="cursor: pointer;">@$1</span>'
			: '@$1'
	);

	// eslint-disable-next-line consistent-return
	return addHtml ? convertedText.replace(/\n/g, '<br>') : convertedText;
};



export {
	safeStringify,
	showToastr,
	getDateDaysAgo,
	formatDateYMD,
	clearEmptyProperty,
	downloadFileInSameWindow,
	downloadFileInNewWindow,
	strToInt,
	addCommasToNumber,
	formatInKMB,
	capitalizeString,
	humanizeUsernames
};
