CREATE TABLE `service_appointment` (
	`id` text PRIMARY KEY NOT NULL,
	`user_id` text,
	`service_provider_id` text,
	`date` text,
	`start_at` text,
	`duration` text,
	`status` text,
	`createdAt` integer,
	`updatedAt` integer,
	FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`service_provider_id`) REFERENCES `service_provider`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `service_provider` (
	`id` text PRIMARY KEY NOT NULL,
	`user_id` text NOT NULL,
	`service_id` text,
	`username` text,
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
