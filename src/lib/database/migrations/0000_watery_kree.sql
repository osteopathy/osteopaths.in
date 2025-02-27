CREATE TABLE `user` (
	`id` text PRIMARY KEY NOT NULL,
	`googleId` text,
	`email` text,
	`phone` text,
	`picture` text,
	`universityMail` text,
	`status` text,
	`metadata` text,
	`name` text,
	`role` text DEFAULT 'user',
	`createdAt` integer,
	`updatedAt` integer
);
--> statement-breakpoint
CREATE TABLE `user_session` (
	`id` text PRIMARY KEY NOT NULL,
	`user_id` text NOT NULL,
	`expires_at` integer NOT NULL,
	`createdAt` integer,
	`updatedAt` integer,
	FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `student` (
	`id` text PRIMARY KEY NOT NULL,
	`batch` text,
	`course` text,
	`user_id` text NOT NULL,
	`createdAt` integer,
	`updatedAt` integer,
	FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE cascade
);
