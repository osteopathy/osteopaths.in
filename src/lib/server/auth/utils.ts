import { sha256 } from "@oslojs/crypto/sha2";
import { encodeHexLowerCase } from "@oslojs/encoding";
import { generateRandomString, type RandomReader } from "@oslojs/crypto/random";
import { userSessionTable, userTable, type User, type UserSession } from "$lib/database/schema";
import { db } from "$lib/database";
import { eq } from "drizzle-orm";
import { studentTable, type Student } from "$lib/database/schema/student";

const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

export const updateGoogleAccount = async (id: string, googleUserId: string, email: string) => {
	return db
		.update(userTable)
		.set({
			googleId: googleUserId,
			email
		})
		.where(eq(userTable.id, id));
};

export const updateUniversityMail = async (id: string, universityMail: string) => {
	return db
		.update(userTable)
		.set({
			universityMail,
			status: "verified"
		})
		.where(eq(userTable.id, id));
};

export const connectStudent = async (
	userId: string,
	universityMail: string,
	name: string,
	batch: string,
	course: string
): Promise<Student | null> => {
	const random: RandomReader = {
		read(bytes: Uint8Array): void {
			crypto.getRandomValues(bytes);
		}
	};

	const studentId = generateRandomString(random, alphabet, 10);

	const user = await db
		.update(userTable)
		.set({
			universityMail,
			name,
			metadata: {
				student_id: studentId
			},
			role: "student",
			status: "verified"
		})
		.where(eq(userTable.id, userId));

	const student =
		(
			await db
				.insert(studentTable)
				.values({
					id: studentId,
					userId: userId,
					batch,
					course
				})
				.returning()
		)[0] ?? null;

	return student;
};

export const getUserFromGoogleId = async (value: string): Promise<User | null> => {
	return (
		(await db.select().from(userTable).where(eq(userTable.googleId, value)).limit(1))[0] ?? null
	);
};

export const getUserFromUniversityMail = async (value: string): Promise<User | null> => {
	return (
		(await db.select().from(userTable).where(eq(userTable.universityMail, value)).limit(1))[0] ??
		null
	);
};

export const createUser = async (
	googleId: string,
	name: string,
	email: string,
	role: "user" | "student" = "user",
	status: "idle" | "verified" = "idle"
): Promise<User> => {
	return (
		await db.insert(userTable).values({ googleId, name, email, role, status }).returning()
	)[0];
};

export const createUserWithUniversityMail = async (
	universityMail: string,
	name: string
): Promise<User> => {
	return (
		(
			await db
				.insert(userTable)
				.values({ universityMail, name, status: "verified", role: "user" })
				.returning()
		)[0] ?? null
	);
};

export const createStudent = async (
	universityMail: string,
	name: string,
	batch: string,
	course: string
) => {
	const random: RandomReader = {
		read(bytes: Uint8Array): void {
			crypto.getRandomValues(bytes);
		}
	};

	const studentId = generateRandomString(random, alphabet, 10);
	const userId = generateRandomString(random, alphabet, 10);

	const [user, student] = await db.batch([
		db.insert(userTable).values({
			id: userId,
			universityMail,
			name,
			role: "student",
			metadata: {
				student_id: studentId
			},
			status: "verified"
		}),
		db.insert(studentTable).values({ id: studentId, batch, course, userId: userId })
	]);

	return {
		id: studentId,
		userId: userId,
		batch,
		course
	};
};

export const createSession = async (
	token: string,
	userId: string
): Promise<Omit<UserSession, "user" | "createdAt" | "updatedAt">> => {
	const sessionId = encodeHexLowerCase(sha256(new TextEncoder().encode(token)));

	const session = (
		await db
			.insert(userSessionTable)
			.values({
				id: sessionId,
				userId,
				expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30)
			})
			.onConflictDoUpdate({
				target: userSessionTable.id,
				set: { expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30) }
			})
			.returning()
	)[0];

	return {
		id: session.id,
		userId: session.userId,
		expiresAt: session.expiresAt
	};
};
