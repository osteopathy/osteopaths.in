import { Redis } from '@upstash/redis';
import * as env from '$env/static/private';

const upstashClient = new Redis({
	url: env.UPSTASH_URL,
	token: env.UPSTASH_TOKEN
});

export const doesWaitlistEntityExist = async (email: string) => {
	const result = await upstashClient.exists(`waitlist:${email}`);
	return result === 1;
};

export const getCreatedDateByWaitlistEntity = async (email: string) => {
	return (await upstashClient.hget(`waitlist:${email}`, 'createdAt')) as string;
};

export const getUserIdByWaitlistEntity = async (email: string) => {
	return (await upstashClient.hget(`waitlist:${email}`, 'userId')) as string;
};

export const deleteWaitlistEntity = async (email: string) => {
	return await upstashClient.hdel(`waitlist:${email}`, 'userId', 'createdAt');
};

export const createWaitlistEntity = async (email: string) => {
	return await upstashClient.hset(`waitlist:${email}`, { createdAt: Date.now().toString() });
};

export default upstashClient;