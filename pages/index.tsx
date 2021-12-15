import { useState, useRef } from 'react';
import type { NextPage } from 'next';
import { Box, Button, Heading, Input, Stack, Text } from '@chakra-ui/react';
import useFetch from 'use-http';
import { prisma } from 'providers/prisma';

type Props = {
	cards: any[];
};

const Home: NextPage<Props> = ({ cards }) => {
	const [todos, setTodos] = useState(cards);
	const inputRef = useRef<HTMLInputElement>(null);
	const todoApi = useFetch('/api/create');

	const insert = () => {
		if (!inputRef.current) return;
		const todo = inputRef.current.value;
		if (!todo) return;

		setTodos([...todos, { todo }]);
		inputRef.current.value = '';

		todoApi
			.post({
				todo,
			})
			.then((data) => {
				console.log(data);
			});
	};

	return (
		<>
			<Stack m='0 auto' maxW='lg' py={4}>
				<Stack p={6} bg='blackAlpha.400' rounded='xl'>
					<Heading>Add new todo</Heading>
					<Input ref={inputRef} placeholder='Enter todo' />
					<Button isLoading={todoApi.loading} mt={2} onClick={insert}>
						Save
					</Button>
				</Stack>

				<Box p={6} bg='blackAlpha.400' rounded='xl'>
					<Heading mb={4}>Todos:</Heading>
					<Stack textColor={'orange.200'}>
						{todos.map((todo, idx) => {
							return (
								<Text px={4} key={idx}>
									{todo.todo}
								</Text>
							);
						})}
					</Stack>
				</Box>
			</Stack>
		</>
	);
};

export const getServerSideProps = async () => {
	const todos = await prisma.todo.findMany();
	return {
		props: {
			cards: todos,
		},
	};
};

export default Home;
