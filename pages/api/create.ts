import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from 'providers/prisma';
import { Todo } from '.prisma/client';

type Data = {
	r: Todo;
};

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse<Data>
) {
	const r = await prisma.todo.create({
		data: {
			todo: req.body.todo,
		},
	});
	res.status(200).json({ r });
}
