CREATE TABLE `customer_profiles` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`kind` enum('individual','company') NOT NULL DEFAULT 'individual',
	`phone` varchar(32),
	`city` varchar(120) NOT NULL,
	`state` varchar(2) NOT NULL DEFAULT 'RJ',
	`address` text,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `customer_profiles_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `matches` (
	`id` int AUTO_INCREMENT NOT NULL,
	`requestId` int NOT NULL,
	`professionalId` int NOT NULL,
	`score` int NOT NULL DEFAULT 0,
	`reason` text,
	`status` enum('notified','interested','declined','expired') NOT NULL DEFAULT 'notified',
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `matches_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `notifications` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`title` varchar(160) NOT NULL,
	`message` text NOT NULL,
	`read` boolean NOT NULL DEFAULT false,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `notifications_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `professional_profiles` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`businessName` varchar(160),
	`phone` varchar(32),
	`bio` text,
	`cities` text NOT NULL,
	`specialties` text NOT NULL,
	`equipmentTypes` text,
	`experienceYears` int NOT NULL DEFAULT 0,
	`availability` varchar(120) NOT NULL DEFAULT 'flexível',
	`rating` decimal(3,2) DEFAULT '0',
	`reviewCount` int NOT NULL DEFAULT 0,
	`verified` boolean NOT NULL DEFAULT false,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `professional_profiles_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `proposals` (
	`id` int AUTO_INCREMENT NOT NULL,
	`requestId` int NOT NULL,
	`professionalId` int NOT NULL,
	`amount` decimal(10,2) NOT NULL,
	`deadline` varchar(120) NOT NULL,
	`description` text NOT NULL,
	`notes` text,
	`status` enum('sent','accepted','rejected') NOT NULL DEFAULT 'sent',
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `proposals_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `reviews` (
	`id` int AUTO_INCREMENT NOT NULL,
	`serviceId` int NOT NULL,
	`customerId` int NOT NULL,
	`professionalId` int NOT NULL,
	`overall` int NOT NULL,
	`quality` int NOT NULL,
	`punctuality` int NOT NULL,
	`service` int NOT NULL,
	`comment` text,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `reviews_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `service_categories` (
	`id` int AUTO_INCREMENT NOT NULL,
	`slug` varchar(80) NOT NULL,
	`name` varchar(120) NOT NULL,
	`services` text NOT NULL,
	`equipment` text NOT NULL,
	`active` boolean NOT NULL DEFAULT true,
	CONSTRAINT `service_categories_id` PRIMARY KEY(`id`),
	CONSTRAINT `service_categories_slug_unique` UNIQUE(`slug`)
);
--> statement-breakpoint
CREATE TABLE `service_requests` (
	`id` int AUTO_INCREMENT NOT NULL,
	`customerId` int NOT NULL,
	`category` varchar(80) NOT NULL,
	`serviceType` varchar(120) NOT NULL,
	`equipment` varchar(160) NOT NULL,
	`brand` varchar(120),
	`model` varchar(120),
	`description` text NOT NULL,
	`photos` text,
	`city` varchar(120) NOT NULL,
	`state` varchar(2) NOT NULL DEFAULT 'RJ',
	`address` text,
	`urgency` enum('normal','urgente','emergencial') NOT NULL DEFAULT 'normal',
	`availability` varchar(120) NOT NULL,
	`status` enum('open','matched','interested','hired','in_progress','completed','canceled') NOT NULL DEFAULT 'open',
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `service_requests_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `services` (
	`id` int AUTO_INCREMENT NOT NULL,
	`requestId` int NOT NULL,
	`proposalId` int NOT NULL,
	`customerId` int NOT NULL,
	`professionalId` int NOT NULL,
	`status` enum('hired','in_progress','completed','canceled') NOT NULL DEFAULT 'hired',
	`startedAt` timestamp,
	`completedAt` timestamp,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `services_id` PRIMARY KEY(`id`)
);
