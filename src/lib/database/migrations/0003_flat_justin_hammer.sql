ALTER TABLE `service_appointment` RENAME TO `service_provider_appointment`;--> statement-breakpoint
CREATE TABLE `service_provider_appointment_request` (
	`id` text PRIMARY KEY NOT NULL,
	`user_id` text,
	`service_provider_id` text,
	`date` text,
	`start_at` text,
	`end_at` text,
	`note` text,
	`reply` text,
	`status` text,
	`user_agreed` integer DEFAULT false,
	`createdAt` integer,
	`updatedAt` integer,
	FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`service_provider_id`) REFERENCES `service_provider`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `service_provider_date_wise_schedule` (
	`id` text PRIMARY KEY NOT NULL,
	`service_provider_id` text,
	`date` text,
	`start_at` text,
	`end_at` text,
	`createdAt` integer,
	`updatedAt` integer,
	FOREIGN KEY (`service_provider_id`) REFERENCES `service_provider`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_service_provider_appointment` (
	`id` text PRIMARY KEY NOT NULL,
	`user_id` text,
	`service_provider_id` text,
	`date` text,
	`start_at` text,
	`duration` text,
	`location` text,
	`status` text,
	`createdAt` integer,
	`updatedAt` integer,
	FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`service_provider_id`) REFERENCES `service_provider`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
INSERT INTO `__new_service_provider_appointment`("id", "user_id", "service_provider_id", "date", "start_at", "duration", "location", "status", "createdAt", "updatedAt") SELECT "id", "user_id", "service_provider_id", "date", "start_at", "duration", "location", "status", "createdAt", "updatedAt" FROM `service_provider_appointment`;--> statement-breakpoint
DROP TABLE `service_provider_appointment`;--> statement-breakpoint
ALTER TABLE `__new_service_provider_appointment` RENAME TO `service_provider_appointment`;--> statement-breakpoint
PRAGMA foreign_keys=ON;--> statement-breakpoint
CREATE TABLE `__new_user_session` (
	`id` text PRIMARY KEY NOT NULL,
	`user_id` text NOT NULL,
	`expires_at` integer NOT NULL,
	`createdAt` integer,
	`updatedAt` integer,
	FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
INSERT INTO `__new_user_session`("id", "user_id", "expires_at", "createdAt", "updatedAt") SELECT "id", "user_id", "expires_at", "createdAt", "updatedAt" FROM `user_session`;--> statement-breakpoint
DROP TABLE `user_session`;--> statement-breakpoint
ALTER TABLE `__new_user_session` RENAME TO `user_session`;--> statement-breakpoint
ALTER TABLE `service_provider` ADD `location` text;