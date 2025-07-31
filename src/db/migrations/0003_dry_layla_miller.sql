CREATE TABLE `tickets` (
	`id` int AUTO_INCREMENT NOT NULL,
	`user_id` int NOT NULL,
	`supervisor_id` int NOT NULL,
	`agent_id` int,
	`department` varchar(50) NOT NULL,
	`description` varchar(255) NOT NULL,
	`remarks` varchar(255),
	`status` enum('open','in_progress','resolved','rejected','expired') NOT NULL DEFAULT 'open',
	`agent_action` enum('resolved','rejected'),
	`created_at` timestamp NOT NULL DEFAULT (now()),
	`resolved_at` timestamp,
	`expired` boolean DEFAULT false,
	CONSTRAINT `tickets_id` PRIMARY KEY(`id`)
);
