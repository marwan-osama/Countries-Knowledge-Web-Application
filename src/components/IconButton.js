import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const IconButton = ({ onClick, icon, text, className }) => {
	const handleClick = (e) => {
		e.preventDefault();
		onClick();
	};
	return (
		<button
			className={`btn btn-hover icon-button fs-m fw-m ${
				className ? className : ""
			}`}
			onClick={handleClick}
		>
			<FontAwesomeIcon icon={icon} />
			<span>{text}</span>
		</button>
	);
};

export default IconButton;
