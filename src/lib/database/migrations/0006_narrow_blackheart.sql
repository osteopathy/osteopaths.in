DROP INDEX "service_provider_username_unique";--> statement-breakpoint
ALTER TABLE `service_provider` ALTER COLUMN "location" TO "location" text DEFAULT 'Sri Sri University';--> statement-breakpoint
CREATE UNIQUE INDEX `service_provider_username_unique` ON `service_provider` (`username`);--> statement-breakpoint
ALTER TABLE `service_provider_appointment_request` ADD `date_wise_schedule_id` text REFERENCES service_provider_date_wise_schedule(id);--> statement-breakpoint
ALTER TABLE `service_provider_appointment_request` DROP COLUMN `reply`;--> statement-breakpoint
ALTER TABLE `service_provider_appointment_request` DROP COLUMN `user_agreed`;--> statement-breakpoint
ALTER TABLE `service_provider_date_wise_schedule` DROP COLUMN `location`;