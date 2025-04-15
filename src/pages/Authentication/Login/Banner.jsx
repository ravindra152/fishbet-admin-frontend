import React from 'react';
// import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Col } from 'reactstrap';
// import leaf from '../../../assets/images/leaf.png';

// img
import authBg from '../../../assets/images/login/login-page-image.webp';

const Banner = () => (
	<Col xl={8}>
		<div
			className="auth-full-bg pt-lg-5 p-4 position-relative"
			style={{
				background: `url(${authBg})`,
				opacity: 1,
				backgroundRepeat: 'no-repeat',
				backgroundPosition: 'center',
				backgroundSize: 'cover',
			}}
		>
			<div>{/* <img src={logoLight} alt="logo" className="w-50" /> */}</div>
			<div className="w-100">
				{/* <div
					className="bg-overlay"
					style={{
						background: `url(${authOverlay})`,
						backgroundSize: '50%',
						opacity: 1,
						backgroundRepeat: 'no-repeat',
						backgroundPosition: 'center',
					}}
				/> */}
			</div>
			<div className="position-absolute bottom-0 leaf-position w-100">
				{/* <img src={leaf} alt="leaf" /> */}
			</div>
		</div>
	</Col>
);
export default Banner;
