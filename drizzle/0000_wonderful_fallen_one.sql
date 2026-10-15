CREATE TABLE `deliveries` (
	`id` text PRIMARY KEY NOT NULL,
	`campaign` text NOT NULL,
	`phone` text NOT NULL,
	`payload` text NOT NULL,
	`created` text NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `campaign_phone` ON `deliveries` (`campaign`,`phone`);--> statement-breakpoint
CREATE TABLE `settings` (
	`id` text PRIMARY KEY NOT NULL,
	`value` text NOT NULL,
	`version` integer DEFAULT 1 NOT NULL
);
