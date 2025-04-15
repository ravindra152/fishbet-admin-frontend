/* eslint-disable no-nested-ternary */
import { useParams } from 'react-router-dom';
// import { formatDate } from '../../../utils/dateFormatter';
import { formatDateYMD, getDateTime } from '../../../helpers/dateFormatter';
// import { useEffect } from 'react';

const useUserOverview = ({ user, userLimits  }) => {
	const { playerId } = useParams();
	const showStyle = (data) => (data ? 'text-success' : 'text-danger');
	const printData = (data) => (data ? 'Yes' : 'No');
	const basicInfo = [
		{ label: 'ID', value: playerId ?? ' ' },
		// { label: 'Telegram Id', value: user?.telegramId },
		// {
		// 	label: 'Email Verified',
		// 	value: printData(user?.isEmailVerified),
		// 	subValue: showStyle(user?.isEmailVerified),
		// },
		{
			label: 'Full Name',
			value: `${user?.firstName ?? ''} ${user?.lastName ?? ''}`,
		},
		{ label: 'User Name', value: user?.username ?? '' },
		// { label: 'Gender', value: user?.gender ?? '' },
		{ label: 'Date Of Birth', value: formatDateYMD(user?.dateOfBirth) ?? '' },

		{
			label: 'Status',
			value: user?.isActive ? 'Active' : 'In -Active',
			subValue: showStyle(user?.isActive ?? ''),
		},
		// { label: 'In-Active Reason', value: user?.defaultDisableReason || ' ' },
		// { label: 'Portal', value: `${user?.tenant?.name} (${user?.tenant?.domain})` },
		{ label: 'Reason', value: !user?.isActive ? user?.reason : '' },
		{
			label: 'Internal',
			value: printData(user?.isInternalUser),
			subValue: showStyle(user?.isInternalUser),
		},
		{ label: 'Referrer ID', value: user?.refParentId ?? '-' },
		{ label: 'Email', value: user?.email ?? '-' },
		{
			label: 'Email Verified',
			value: printData(user?.isEmailVerified),
			subValue: showStyle(user?.isEmailVerified),
		},
		{ label: 'Last Seen', value: getDateTime(user?.lastLoginDate) ?? ' ' },
		{ label: 'Registered At', value: getDateTime(user?.createdAt) ?? ' ' },
		{
			label: 'Tags',
			value: user?.tags
				? user?.tags?.length < 1
					? ' '
					: user?.tags?.join(', ')
				: ' ',
		},
		// { label: 'Self Exclusion End Date', value: user?.userLimits?.selfExclusionEndAt === null ? 'NA' : getDateTime(user?.userLimits?.selfExclusionEndAt) },

		{ 
			label: 'Self Exclusion End Date', 
			value: !user?.userLimits || user?.userLimits?.selfExclusionEndAt === null 
			  ? 'NA' 
			  : getDateTime(user?.userLimits?.selfExclusionEndAt) 
		  }
,		  
		{ label: 'Self Excluded', value: userLimits?.isSelfExclusionPermanent === true ? 'Yes' : 'No' },
		// { label: 'Self Exclusion Start Date', value: getDateTime(userLimits?.selfExclusionStartedAt) ?? ' ' },
		// { label: 'Self Exclusion Status', value: userLimits?.isSelfExclusionPermanent ? 'Permanent' : 'Temporary' },




		// { label: 'Reason', value: !user?.isActive ? user?.reason : '' },
		// { label: 'SumSub Applicant Id', value: user?.applicantId },
	];
	// console.log(userLimits.selfExclusionEndAt)
	
	const moreInfo = [
		// { label: 'IP Address', value: user?.signInIp, subValue: 'text-success' },
		{ label: 'Device Type', value: user?.userDetails?.deviceType ?? '-' },
		{ label: 'IP Address', value: user?.userDetails?.ipAddress ?? '-' },
		{ label: 'Login IP Address', value: user?.userDetails?.loginIpAddress ?? '-' },
		{ label: 'City', value: user?.city ?? '-' },
		{ label: 'State', value: user?.state ?? '-' },
		{ label: 'Address', value: user?.userDetails?.address ?? '-' },
		{ label: 'Phone Number', value: user?.phone ?? '-' },
	];

	const contactInfo = [
		{ label: 'Phone Number', value: user?.phone ?? '' },
		{
			label: 'Address',
			value: `${user?.address ?? ''} ${user?.address ? ',' : ''} ${
				user?.city ?? ''
			} ${user?.city ? ',' : ''} ${user?.zipCode ?? ''}`,
		},
		{ label: 'Country Code', value: user?.countryCode ?? ' ' },
		// {
		// 	label: 'NewsLetter',
		// 	value: user?.other?.newsLetterSubscription ? 'True' : 'False',
		// 	subValue: showStyle(user?.newsLetter ?? ' '),
		// },
		// {
		// 	label: 'SMS',
		// 	value: user?.other?.sms ? 'True' : 'False',
		// 	subValue: showStyle(user?.sms ?? ' '),
		// },
	];

	const kycInfo = [
		// {
		// 	label: 'KYC Method',
		// 	value: user?.kycMethod === 1 ? 'Sumsub' : 'System KYC',
		// },
		{
			label: 'KYC Level',
			value: user?.level,
		},
	];
	// useEffect(()=>{
	// 	console.log(user?.userLimits?.selfExclusionEndAt)
	// }, [user])

	return {
		showStyle,
		printData,
		basicInfo,
		moreInfo,
		contactInfo,
		kycInfo,
	};
};

export default useUserOverview;
