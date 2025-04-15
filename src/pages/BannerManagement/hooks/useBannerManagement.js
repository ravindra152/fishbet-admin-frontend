import { useEffect, useState, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { deleteSABannersStart, getSABanners } from '../../../store/actions';

const useBannerManagement = () => {
	const dispatch = useDispatch();

	const {
		SABanners,
		SABannersloading,
		isCreateSABannersSuccess,
		isEditSABannersSuccess,
		isDeleteSABannersSuccess,
	} = useSelector((state) => state.SASettings);
	const [selectedClient, setSelectedClient] = useState('');
	const [selectedPortal, setSelectedPortal] = useState('');

	const formattedSABanners = useMemo(() => {
		if (SABanners?.rows) {
      const updatedBanners = [];
			SABanners?.rows?.map((banner) => {
        const { id, bannerType, imageUrl, mobileImageUrl, description, title, redirectUrl } = banner;
        const pages = bannerType.replace(/([a-z])([A-Z])/g, '$1 $2').toUpperCase();
        updatedBanners.push({ key: bannerType, pages, description, id: id, title: title?.['EN'], redirectUrl, MobileImagePreview: mobileImageUrl, imagePreview: imageUrl });
      }
			);

      return updatedBanners;
		}
		return [];
	}, [SABanners]);
	console.log("sa",formattedSABanners)

	const fetchData = () => {
		dispatch(
			getSABanners({
				limit: '',
				pageNo: '',
				adminId: selectedPortal ? '' : selectedClient,
				tenantId: selectedPortal,
			})
		);
	};

	useEffect(() => {
		fetchData();
	}, [selectedClient, selectedPortal]);

	const onClickDelete = (data) => {
		dispatch(deleteSABannersStart(data));
	};

	useEffect(() => {
		if (
			isCreateSABannersSuccess ||
			isEditSABannersSuccess ||
			isDeleteSABannersSuccess
		)
			fetchData();
	}, [
		isCreateSABannersSuccess,
		isEditSABannersSuccess,
		isDeleteSABannersSuccess,
	]);

	return {
		formattedSABanners,
		SABannersloading,
		selectedPortal,
		setSelectedPortal,
		selectedClient,
		setSelectedClient,
		onClickDelete,
	};
};

export default useBannerManagement;
