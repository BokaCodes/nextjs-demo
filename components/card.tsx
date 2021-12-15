const x = {
	a: 1,
	b: 2,
	c: 3,
};

type Props = {
	title: string;
};

const Card: React.FC<Props> = ({ title }) => {
	return <div>Header {title}</div>;
};

export default Card;
