import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Button } from 'reactstrap';
import Lightbox from 'react-awesome-lightbox';
import 'react-awesome-lightbox/build/style.css';


const Pages = ({ value }) => value ?? '';

const Title = ({ value }) => value ?? '';

const URL  = ({ value }) => value ?? '';

const Description = ({ value }) => value?.EN ?? value?.En ?? '';

const ImagePreview = ({ value }) => {
	const [isFits, setIsFits] = useState(false);

	return (
		<>
			{isFits ? (
				<Lightbox
					image={`${value}`}
					onClose={() => setIsFits(!isFits)}
					allowZoom={false}
					allowRotate={false}
					className="lb-container"
				/>
			) : null}

			<Button
				color="link"
				className="btn btn-link waves-effect"
				onClick={() => setIsFits(true)}
			>
				{value ? 'Preview' : ''}
			</Button>
		</>
	);
};

const MobileImagePreview = ({ value }) => {
	const [isFits, setIsFits] = useState(false);

	return (
		<>
			{isFits ? (
				<Lightbox
					image={`${value}`}
					onClose={() => setIsFits(!isFits)}
					allowZoom={false}
					allowRotate={false}
					className="lb-container"
				/>
			) : null}

			<Button
				color="link"
				className="btn btn-link waves-effect"
				onClick={() => setIsFits(true)}
			>
				{value ? 'Preview' : ''}
				Mobile Preview
			</Button>
		</>
	);
};
ImagePreview.propTypes = {
	value: PropTypes.string.isRequired,
};
MobileImagePreview.propTypes = {
	value: PropTypes.string.isRequired,
};

export { Pages, ImagePreview,MobileImagePreview, Title, URL, Description };
