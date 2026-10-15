CREATE TABLE `allocations` (
	`id` text PRIMARY KEY NOT NULL,
	`user_id` text NOT NULL,
	`gift_id` text NOT NULL,
	`gift_name` text NOT NULL,
	`gift_group` text NOT NULL,
	`campaign` text NOT NULL,
	`quantity` integer NOT NULL,
	`status` text NOT NULL,
	`vehicle` text NOT NULL,
	`eta` text NOT NULL,
	`notes` text NOT NULL,
	`created` text NOT NULL,
	`version` integer DEFAULT 1 NOT NULL
);
--> statement-breakpoint
CREATE TABLE `distributions` (
	`id` text PRIMARY KEY NOT NULL,
	`allocation_id` text NOT NULL,
	`user_id` text NOT NULL,
	`name` text NOT NULL,
	`phone` text NOT NULL,
	`category` text NOT NULL,
	`quantity` integer NOT NULL,
	`photo_key` text NOT NULL,
	`created` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `team_users` (
	`id` text PRIMARY KEY NOT NULL,
	`username` text NOT NULL,
	`name` text NOT NULL,
	`kind` text NOT NULL,
	`email` text NOT NULL,
	`phone` text NOT NULL,
	`password_hash` text NOT NULL,
	`password_salt` text NOT NULL,
	`active` integer DEFAULT 1 NOT NULL,
	`created` text NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `team_users_username_unique` ON `team_users` (`username`);--> statement-breakpoint
CREATE TABLE `user_sessions` (
	`token_hash` text PRIMARY KEY NOT NULL,
	`user_id` text NOT NULL,
	`expires` integer NOT NULL
);
