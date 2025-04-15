/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react/prop-types */
/* eslint-disable import/prefer-default-export */
const Word = ({ value }) => value ?? '';
const Avatar = ({ word, randomColor }) => (
	<div className="avatar-xs">
		<span
			className={`avatar-title rounded-circle ${randomColor} text-${randomColor}`}
		>
			{word?.charAt(0)?.toUpperCase()}
		</span>
	</div>
);

export { Word, Avatar };
