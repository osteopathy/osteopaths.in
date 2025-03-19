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
	FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE cascade
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
--> statement-breakpoint
CREATE TABLE `service_provider_appointment_request` (
	`id` text PRIMARY KEY NOT NULL,
	`user_id` text,
	`service_provider_id` text,
	`date_wise_schedule_id` text,
	`date` text,
	`start_at` text,
	`end_at` text,
	`note` text,
	`status` text,
	`withdrawn_reason` text,
	`createdAt` integer,
	`updatedAt` integer,
	FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`service_provider_id`) REFERENCES `service_provider`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`date_wise_schedule_id`) REFERENCES `service_provider_date_wise_schedule`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `service_provider_appointment` (
	`id` text PRIMARY KEY NOT NULL,
	`user_id` text,
	`service_provider_id` text,
	`date` text,
	`start_at` text,
	`end_at` text,
	`location` text,
	`status` text,
	`request_id` text,
	`createdAt` integer,
	`updatedAt` integer,
	FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`service_provider_id`) REFERENCES `service_provider`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`request_id`) REFERENCES `service_provider_appointment_request`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `service_provider_date_wise_schedule` (
	`id` text PRIMARY KEY NOT NULL,
	`service_provider_id` text,
	`date` text,
	`start_at` text,
	`end_at` text,
	`disabled` integer,
	`createdAt` integer,
	`updatedAt` integer,
	FOREIGN KEY (`service_provider_id`) REFERENCES `service_provider`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `service_provider` (
	`id` text PRIMARY KEY NOT NULL,
	`user_id` text NOT NULL,
	`service_id` text,
	`username` text,
	`location` text DEFAULT 'Sri Sri University',
	`createdAt` integer,
	`updatedAt` integer,
	FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`service_id`) REFERENCES `service`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE UNIQUE INDEX `service_provider_username_unique` ON `service_provider` (`username`);--> statement-breakpoint
CREATE TABLE `service` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`description` text NOT NULL,
	`createdAt` integer,
	`updatedAt` integer
);
--> statement-breakpoint
CREATE TABLE `service_subscription` (
	`id` text PRIMARY KEY NOT NULL,
	`user_id` text NOT NULL,
	`service_provider_id` text,
	`createdAt` integer,
	`updatedAt` integer,
	FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`service_provider_id`) REFERENCES `service_provider`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `user_notification` (
	`id` text PRIMARY KEY NOT NULL,
	`title` text,
	`body` text,
	`status` text,
	`user_id` text,
	`createdAt` integer,
	FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `user_notification_subscription` (
	`id` text PRIMARY KEY NOT NULL,
	`endpoint` text,
	`p256dh` text,
	`auth` text,
	`user_id` text,
	`createdAt` integer,
	FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE cascade
);
