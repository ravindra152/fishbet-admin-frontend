import React from 'react';
import PropTypes from 'prop-types';
import { CCol } from '@coreui/react';
import { DivLoaderConainer } from './style';

const DivLoader = (props) => {
	const { isSmall, loaderVarient, isWithoutPadding } = props;
  
	return (
		<CCol xs="12" className={isWithoutPadding ? '' : 'py-5'}>
			<DivLoaderConainer className="d-flex justify-content-center">
				<div className={`spinner-border ${loaderVarient && 'text-info'} ${isSmall && 'spinner-border-sm'}`} role="status">
					<span className="sr-only">Loading...</span>
				</div>
			</DivLoaderConainer>
		</CCol>
	);
};

DivLoader.propTypes = {
	isSmall: PropTypes.bool,
	loaderVarient: PropTypes.string,
	isWithoutPadding: PropTypes.bool,
};
DivLoader.defaultProps = {
	isSmall: PropTypes.bool,
	loaderVarient: PropTypes.string,
	isWithoutPadding: PropTypes.bool,
};
export default DivLoader;
