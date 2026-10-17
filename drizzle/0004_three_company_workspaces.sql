DROP INDEX IF EXISTS `campaign_phone`;--> statement-breakpoint
ALTER TABLE `deliveries` ADD `company_id` text DEFAULT 'alex' NOT NULL;--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS `deliveries_company_campaign_phone` ON `deliveries` (`company_id`,`campaign`,`phone`);--> statement-breakpoint
ALTER TABLE `allocations` ADD `company_id` text DEFAULT 'alex' NOT NULL;--> statement-breakpoint
ALTER TABLE `distributions` ADD `company_id` text DEFAULT 'alex' NOT NULL;--> statement-breakpoint
ALTER TABLE `team_users` ADD `company_id` text DEFAULT 'alex' NOT NULL;--> statement-breakpoint
UPDATE `settings` SET `id`='alex:config' WHERE `id`='config';
--> statement-breakpoint
UPDATE `settings` SET `id`='alex:customer_categories' WHERE `id`='customer_categories';
