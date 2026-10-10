CREATE TABLE `users` (
	`id` text PRIMARY KEY NOT NULL,
	`username` text NOT NULL,
	`global_name` text,
	`avatar` text,
	`email` text,
	`verified` integer,
	`banner` text,
	`accent_color` integer
);
