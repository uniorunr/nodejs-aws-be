CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

create table product (
	id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
	title text NOT NULL,
	description text,
	price int DEFAULT 0,
	img text
);

create table stocks (
 	id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
 	product_id uuid,
 	count int DEFAULT 0,
	foreign key ("product_id") references "product" ("id")
);

insert into product (title, description, price, img) values
	('Nintendo Switch with Neon Blue and Neon Red Joy‑Con™', 'Get the gaming system that lets you play the games you want, wherever you are, however you like. Includes the Nintendo Switch console and Nintendo Switch dock in black, with contrasting left and right Joy‑Con controllers—one red, one blue. Also includes all the extras you need to get started. Model number: HAC-001(-01) (product serial number begins with “XKW”)', 299, 'https://images-na.ssl-images-amazon.com/images/I/61JnrafZ7zL._AC_SL1457_.jpg'),
	('Nintendo Switch with Grey Joy‑Con™', 'Get the gaming system that lets you play the games you want, wherever you are, however you like. Includes the Nintendo Switch console and Nintendo Switch dock in black, and left and right Joy‑Con controllers in a contrasting gray. Also includes all the extras you need to get started. Model number: HAC-001(-01) (product serial number begins with “XKW”)', 299, 'https://images-na.ssl-images-amazon.com/images/I/71I8LoKn%2BOL._SX466_.jpg'),
	('Nintendo Switch Lite - Turquoise', 'Nintendo Switch Lite is a compact, lightweight Nintendo Switch system dedicated to handheld play. With a built-in +Control Pad and a sleek, unibody design, it’s great for on-the-go gaming.', 199, 'https://images-na.ssl-images-amazon.com/images/I/71qmF0FHj7L._AC_SX679_.jpg'),
	('Nintendo Switch Lite - Grey', 'Nintendo Switch Lite is a compact, lightweight Nintendo Switch system dedicated to handheld play. With a built-in +Control Pad and a sleek, unibody design, it’s great for on-the-go gaming.', 199, 'https://images-na.ssl-images-amazon.com/images/I/71oYZj4DgsL._AC_SL1500_.jpg'),
	('Nintendo Switch Lite - Yellow', 'Nintendo Switch Lite is a compact, lightweight Nintendo Switch system dedicated to handheld play. With a built-in +Control Pad and a sleek, unibody design, it’s great for on-the-go gaming.', 199, 'https://images-na.ssl-images-amazon.com/images/I/71q4BBqaNvL._AC_SL1500_.jpg')


insert into stocks (product_id, count) values
	('341ecefd-dad0-4d95-a105-cb36f47a60f9', 7),
	('72162b2f-bc3c-4bf8-8652-6dae8ddeae35', 7),
	('0436c2bc-7307-4c61-acff-fdd29046be7e', 8),
	('6f5582f7-1bb8-4800-b0bb-7f4aca36c132', 9),
	('5a873bee-60cf-420b-8f23-be1e89b7b84e', 7),
	('5561efc7-7580-47e9-a4df-4d7f9bc8e683', 1)
