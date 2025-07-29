CREATE TABLE `users` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`employee_id` varchar(20) NOT NULL,
	`full_name` varchar(100) NOT NULL,
	`phone` varchar(15) NOT NULL,
	`email` varchar(100) NOT NULL,
	`department` varchar(50) NOT NULL,
	`designation` varchar(50) NOT NULL,
	`password` varchar(255) NOT NULL,
	CONSTRAINT `users_id` PRIMARY KEY(`id`),
	CONSTRAINT `users_employee_id_unique` UNIQUE(`employee_id`),
	CONSTRAINT `users_email_unique` UNIQUE(`email`)
);
--> statement-breakpoint
CREATE INDEX `email_idx` ON `users` (`email`);--> statement-breakpoint
CREATE INDEX `employee_id_idx` ON `users` (`employee_id`);