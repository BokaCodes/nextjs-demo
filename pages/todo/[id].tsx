import { Box } from '@chakra-ui/react';
import { NextPage } from 'next';
import { useRouter } from 'next/router';

const UserName: NextPage = () => {
	const r = useRouter();

	return <Box>Hello, {r.query.username}</Box>;
};

export default UserName;
