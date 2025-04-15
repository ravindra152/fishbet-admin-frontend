/* eslint-disable no-restricted-syntax */
/* eslint-disable consistent-return */
/* eslint-disable no-unused-vars */
/* eslint-disable func-names */
import * as Yup from 'yup';
import { bannerType } from './constants';

const getInitialValues = (defaultValue) => ({
	name: defaultValue?.name || '',
	bannerType: defaultValue?.bannerType || 'home',
	image: defaultValue?.image || '',
	redirectUrl: defaultValue?.redirectUrl || '',
	description: defaultValue?.description?.EN || '',
	mobileImage: defaultValue?.mobileImage || '',
});

const staticFormFields = [
	{
		name: 'image',
		fieldType: 'file',
		type: '',
		label: 'Image',
		placeholder: 'Select image',
		showThumbnail: true,
		isRequired: true,
	},
	{
		name: 'mobileImage',
		fieldType: 'file',
		type: '',
		label: 'Mobile Image',
		placeholder: 'Select image',
		showThumbnail: true,
		// isRequired: true,
	},
	{
		name: 'description',
		fieldType: 'textField',
		label: 'Description',
		placeholder: 'Description',
		hideRequired: true,
		
	},
	{
		name: 'name',
		fieldType: 'textField',
		label: 'Title',
		placeholder: 'Title',
		hideRequired: true,
		
	},
	{
		name: 'redirectUrl',
		fieldType: 'textField',
		label: 'Redirect Url',
		placeholder: 'Please enter url',
		hideRequired: true,
	},
];

const validateName = (name) => {
	const validationObject = {};
	// eslint-disable-next-line guard-for-in
	for (const file in name) {
		validationObject[file] = Yup.string()
			.required('Label Required!')
			.nullable();
	}
	return Yup.object(validationObject);
};

const validationSchema = ({
	minRequiredWidth,
	minRequiredHeight,
	maxRequiredWidth,
	maxRequiredHeight,
	langTitle,
}) =>
	Yup.object().shape({
		// name: validateName(langTitle),
		bannerType: Yup.string().required('Banner Type Required'),
		description: Yup.string()
		.min(3,' Description should not be atleast 3 words')
		.max(100,' Description should not be exceed 100 words'),
		name: Yup.string()
		.min(3,' Title should not be atleast 3 words')
		.max(50,' Title should not be exceed 50 words'),
		redirectUrl: Yup.string()
		.min(3,' Redirect Url should not be atleast 3')
		.max(50,' Redirect Url should not be exceed 50'),

		mobileImage: Yup.mixed()
	// .required('Mobile image is required')
	.test(
		'fileSize',
		'Image size should be less than 2MB',
		(value) => !value || (typeof value === 'object' && value.size <= 2 * 1024 * 1024)
	)
	.test('FILE_FORMAT', 'Uploaded file has unsupported format.', (value) =>
		typeof value === 'string'
			? true
			: !value ||
			  (value &&
					['image/png', 'image/jpeg', 'image/jpg', 'image/svg+xml'].includes(value.type))
	),

		image: Yup.mixed()
		.required('Image is required')
		.test(
			'fileSize',
			'Image size should be less than 2MB',
			(value) => !value || typeof value === 'object' ? value.size <= 2 * 1024 * 1024 : true
		)
			// .imageDimensionCheck(
			// 	'Banner Required',
			// 	minRequiredWidth,
			// 	minRequiredHeight,
			// 	maxRequiredWidth,
			// 	maxRequiredHeight
			// )
			.test('FILE_FORMAT', 'Uploaded file has unsupported format.', (value) =>
				typeof value === 'string'
					? true
					: !value ||
					  (value &&
							[
								'image/png',
								'image/jpeg',
								'image/jpg',
								'image/svg+xml',
							].includes(value.type))
			),
			
	});

const imageWidthAndHeight = (provideFile) => {
	// take the given file (which should be an image) and return the width and height
	const imgDimensions = { width: null, height: null };

	return new Promise((resolve) => {
		const reader = new FileReader();

		reader.readAsDataURL(provideFile);
		reader.onload = function () {
			const img = new Image();
			img.src = reader.result;

			img.onload = function () {
				imgDimensions.width = img.width;
				imgDimensions.height = img.height;

				resolve(imgDimensions);
			};
		};
	});
};

const imageDimensionCheck = Yup.addMethod(
	Yup.mixed,
	'imageDimensionCheck',
	function (
		message,
		minRequiredWidth,
		minRequiredHeight,
		maxRequiredWidth,
		maxRequiredHeight
	) {
		return this.test(
			'image-width-height-check',
			message,
			async function (value) {
				const { path, createError } = this;

				if (!value) {
					return;
				}

				if (typeof value === 'string') {
					return true;
				}

				const imgDimensions = await imageWidthAndHeight(value);

				if (
					imgDimensions.width < minRequiredWidth ||
					imgDimensions.width > maxRequiredWidth
				) {
					return createError({
						path,
						message: `The image width needs to be between ${minRequiredWidth}px - ${maxRequiredWidth}px!`,
					});
				}

				if (
					imgDimensions.height < minRequiredHeight ||
					imgDimensions.height > maxRequiredHeight
				) {
					return createError({
						path,
						message: `The image height needs to be between ${minRequiredHeight}px - ${maxRequiredHeight}px!`,
					});
				}
				return true;
			}
		);
	}
);

export { getInitialValues, staticFormFields, validationSchema };
