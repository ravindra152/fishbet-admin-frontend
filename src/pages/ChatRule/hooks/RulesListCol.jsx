/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react/prop-types */
/* eslint-disable import/prefer-default-export */
const Rule = ({ value }) => value ?? '';
const Avatar = ({ rules, randomColor }) => (
	<div className="avatar-xs">
		<span
			className={`avatar-title rounded-circle ${randomColor} text-${randomColor}`}
		>
			{rules?.charAt(0)?.toUpperCase()}
		</span>
	</div>
);

export { Rule, Avatar };
