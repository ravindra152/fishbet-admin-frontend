/* eslint-disable no-prototype-builtins */
/* eslint-disable no-restricted-syntax */
/* eslint-disable import/prefer-default-export */

export const objectToFormDataAdd = (obj) => {
	const formData = new FormData();

	Object.entries(obj).forEach(([key, value]) => {
		formData.append(key, value);
	});

	return formData;
};

export const objectToFormData = (obj, form, namespace) => {
	const fd = form || new FormData();
	let formKey;

	for (const property in obj) {
		if (obj.hasOwnProperty(property)) {
			if (namespace) {
				formKey = `${namespace}[${property}]`;
			} else {
				formKey = property;
			}

			const value = obj[property];

			// if (value === null || value === undefined) {
			// 	// Skip null or undefined values
			// 	// eslint-disable-next-line no-continue
			// 	continue;
			// }

			// Handle object values recursively, except for File and Date
			if (typeof value === 'object' && !(value instanceof File)) {
				if (value instanceof Date) {
					fd.append(formKey, value.toISOString());
				} else {
					objectToFormData(value, fd, formKey);
				}
			} else if (typeof value === 'boolean' || typeof value === 'number') {
				// Append boolean or number as-is
				fd.append(formKey, value);
			} else {
				// if it's a string or a File object
				fd.append(formKey, value);
			}
		}
	}
	return fd;
};