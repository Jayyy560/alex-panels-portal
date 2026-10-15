CREATE TABLE `deliveries` (
	`id` text PRIMARY KEY NOT NULL,
	`campaign` text NOT NULL,
	`phone` text NOT NULL,
	`payload` text NOT NULL,
	`created` text NOT NULL
);
CREATE TABLE `settings` (
	`id` text PRIMARY KEY NOT NULL,
	`value` text NOT NULL,
	`version` integer DEFAULT 1 NOT NULL
);
CREATE TABLE `admin_sessions` (
	`token_hash` text PRIMARY KEY NOT NULL,
	`email` text NOT NULL,
	`expires` integer NOT NULL
);
CREATE TABLE `login_attempts` (
	`id` text PRIMARY KEY NOT NULL,
	`count` integer NOT NULL,
	`expires` integer NOT NULL
);
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
CREATE TABLE `team_users` (
	`id` text PRIMARY KEY NOT NULL,
	`username` text NOT NULL,
	`name` text NOT NULL,
	`kind` text NOT NULL,
	`email` text NOT NULL,
	`phone` text NOT NULL,
	`password_hash` text NOT NULL,
	`password_salt` text NOT NULL,
	`password_cipher` text,
	`active` integer DEFAULT 1 NOT NULL,
	`created` text NOT NULL
);
CREATE TABLE `user_sessions` (
	`token_hash` text PRIMARY KEY NOT NULL,
	`user_id` text NOT NULL,
	`expires` integer NOT NULL
);
