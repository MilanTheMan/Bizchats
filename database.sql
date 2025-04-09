-- ------------------------------------------------------------------------------------ --
	-- | ONLY DO THIS FOR TESTING. DROPING THE DATABASE WILL REMOVE ALL THE USERS INSIDE! | --
										drop database IF EXISTS Bizchats;
	-- ------------------------------------------------------------------------------------ --


	-- ---------- --
	-- ---------- --
	-- |Database| --
	-- ---------- --
	-- ---------- --


	create database Bizchats;

	use Bizchats;


	-- -------- --
	-- -------- --
	-- |Tables| --
	-- -------- --
	-- -------- --


	-- ------- --
	-- |Roles| --
	-- ------- --


	CREATE TABLE roles
	(
		id INT PRIMARY KEY,
		role_name varchar(40)
	);


    -- ------------------ --
	-- |Channel Catagory| --
	-- ------------------ --


	CREATE TABLE catagories
	(
		id INT PRIMARY KEY,
		catagory_name varchar(40)
	);


	-- ------- --
	-- |Users| --
	-- ------- --


	drop table if exists users;
	create table users
	(
		id INT PRIMARY KEY auto_increment,
		name VARCHAR(100),
		email VARCHAR(100) UNIQUE,
		password VARCHAR(500),
		role_id INT NOT NULL,
		profile_picture VARCHAR(255) DEFAULT 'https://bizchats.s3.us-east-2.amazonaws.com/profile_pictures/Placeholder.jpg',
		foreign key (role_id) references roles(id)
	);


	-- ---------- --
	-- |Channels| --
	-- ---------- --


	drop table if exists channels;
	create table channels
	(
		id INT PRIMARY KEY auto_increment,
		name VARCHAR(100),
		role_id INT NOT NULL,
		profile_picture TEXT,
        category INT,
		foreign key (category) references catagories(id),
		foreign key (role_id) references roles(id)
	);


    -- -------------------- --
	-- |Channel Catagories| --
	-- -------------------- --


	drop table if exists channels_to_categories;
	create table channels_to_categories
	(
		category INT,
		channelid INT,
		creation_date DATETIME default NOW(),
		foreign key (category) references catagories(id) ON DELETE CASCADE,
		foreign key (channelid) references channels(id) ON DELETE CASCADE,
        PRIMARY KEY(category, channelid)
	);


    -- --------------- --
	-- |Channel Roles| --
	-- --------------- --


	drop table if exists channel_roles;
	create table channel_roles
	(
		id INT PRIMARY KEY auto_increment,
		role_name VARCHAR(40) UNIQUE
	);


    -- ------------------- --
	-- |Users to Channels| --
	-- ------------------- --


	drop table if exists userstochannels;
	create table userstochannels
	(
		userid INT,
		channelid INT,
		channelroleid INT NOT NULL,
		creation_date DATETIME default NOW(),
		foreign key (userid) references users(id) ON DELETE CASCADE,
		foreign key (channelid) references channels(id) ON DELETE CASCADE,
		foreign key (channelroleid) references channel_roles(id) ON DELETE CASCADE,
        PRIMARY KEY(userid, channelid)
	);


    -- ----------------------- --
	-- |Channel Announcements| --
	-- ----------------------- --


	drop table if exists channel_announcements;
	create table channel_announcements
	(
		id INT PRIMARY KEY auto_increment,
		channel_id INT NOT NULL,
		title VARCHAR(100),
		content TEXT,
		creation_date DATETIME default NOW(),
		foreign key (channel_id) references channels(id) ON DELETE CASCADE
	);


    -- -------------------- --
	-- |Channel Assignments| --
	-- -------------------- --


	drop table if exists channel_assignments;
	create table channel_assignments
	(
		id INT PRIMARY KEY auto_increment,
		channel_id INT NOT NULL,
		title VARCHAR(100),
		description TEXT,
		due_date DATETIME,
		creation_date DATETIME default NOW(),
		foreign key (channel_id) references channels(id) ON DELETE CASCADE
	);


	-- ------------------------- --
	-- |Assignments Submissions| --
	-- ------------------------- --


	drop table if exists assignment_submissions;
	create table assignment_submissions
	(
		id INT PRIMARY KEY auto_increment,
        user_id INT NOT NULL,
		channel_id INT NOT NULL,
		assignment_id INT NOT NULL,
		comments TEXT,
		submission_date DATETIME default NOW(),
		foreign key (user_id) references users(id) ON DELETE CASCADE,
		foreign key (assignment_id) references channel_assignments(id) ON DELETE CASCADE,
		foreign key (channel_id) references channels(id) ON DELETE CASCADE
	);


    -- ------------------------ --
	-- |Submission Attachments| --
	-- ------------------------ --


	drop table if exists submission_attachments;
	create table submission_attachments
	(
		id INT PRIMARY KEY auto_increment,
		channel_id INT NOT NULL,
		assignment_id INT NOT NULL,
		user_id INT NOT NULL,
        attachment_link TEXT,
		foreign key (user_id) references users(id) ON DELETE CASCADE,
		foreign key (assignment_id) references channel_assignments(id) ON DELETE CASCADE,
		foreign key (channel_id) references channels(id) ON DELETE CASCADE
	);


	-- ---------------------- --
	-- |Marks to Assignments| --
	-- ---------------------- --


	drop table if exists channel_marks_assignments;
	create table channel_marks_assignments
	(
		id INT PRIMARY KEY auto_increment,
		channel_id INT NOT NULL,
		user_id INT NOT NULL,
		assignment_id INT NOT NULL,
		mark INT,
		creation_date DATETIME default NOW(),
		foreign key (channel_id) references channels(id) ON DELETE CASCADE,
		foreign key (user_id) references users(id) ON DELETE CASCADE,
		foreign key (assignment_id) references channel_assignments(id) ON DELETE CASCADE
	);


	-- ---------------- --
	-- |Marks to Users| --
	-- ---------------- --


	drop table if exists channel_marks_users;
	create table channel_marks_users
	(
		id INT PRIMARY KEY auto_increment,
		channel_id INT NOT NULL,
		user_id INT NOT NULL,
		average_mark INT,
		foreign key (channel_id) references channels(id) ON DELETE CASCADE,
		foreign key (user_id) references users(id) ON DELETE CASCADE
	);


	-- --------------- --
	-- |Channel Marks| --
	-- --------------- --


	drop table if exists channel_marks;
	create table channel_marks
	(
		id INT PRIMARY KEY auto_increment,
		channel_id INT NOT NULL,
		user_id INT NOT NULL,
		mark INT,
		creation_date DATETIME default NOW(),
		foreign key (channel_id) references channels(id) ON DELETE CASCADE,
		foreign key (user_id) references users(id) ON DELETE CASCADE
	);


	-- ---------- --
	-- |Messages| --
	-- ---------- --


	drop table if exists messages;
	create table messages
	(
		id INT PRIMARY KEY auto_increment,
		sender_id INT NOT NULL,
		receiver_id INT NOT NULL,
		content TEXT,
		file_url TEXT,
		creation_date DATETIME default NOW(),
		foreign key (sender_id) references users(id) ON DELETE CASCADE,
		foreign key (receiver_id) references users(id) ON DELETE CASCADE
	);


	-- --------- --
	-- |Friends| --
	-- --------- --


	drop table if exists friends;
	create table friends
	(
		id INT PRIMARY KEY auto_increment,
		user_id INT NOT NULL,
		friend_id INT NOT NULL,
		creation_date DATETIME default NOW(),
		foreign key (user_id) references users(id) ON DELETE CASCADE,
		foreign key (friend_id) references users(id) ON DELETE CASCADE
	);


	-- -------------------- --
	-- |Channel Messages| --
	-- -------------------- --


	drop table if exists channel_messages;
	create table channel_messages
	(
		id INT PRIMARY KEY auto_increment,
		user_id INT NOT NULL,
		channel_id INT NOT NULL,
		content TEXT,
		file_url TEXT,
		creation_date DATETIME default NOW(),
		foreign key (user_id) references users(id) ON DELETE CASCADE,
		foreign key (channel_id) references channels(id) ON DELETE CASCADE
	);
    
    
    -- ---------------------- --
	-- |Doccument Catagories| --
	-- ---------------------- --


	drop table if exists documents_catagories;
	create table documents_catagories
	(
		id INT PRIMARY KEY auto_increment,
		channel_id INT NOT NULL,
        catagory_name VARCHAR(100),
        creation_date DATETIME default NOW(),
		foreign key (channel_id) references channels(id) ON DELETE CASCADE
	);
    
    
    -- -------------------- --
	-- |Channel Doccuments| --
	-- -------------------- --


	drop table if exists channel_doccuments;
	create table channel_doccuments
	(
		id INT PRIMARY KEY auto_increment,
        file_name VARCHAR (100),
		channel_id INT NOT NULL,
        catagory_id INT NOT NULL,
		user_id INT NOT NULL,
        file_link TEXT,
        creation_date DATETIME default NOW(),
		foreign key (user_id) references users(id) ON DELETE CASCADE,
		foreign key (catagory_id) references documents_catagories(id) ON DELETE CASCADE,
		foreign key (channel_id) references channels(id) ON DELETE CASCADE
	);


	-- ------------------ --
	-- | Calendar Events| --
	-- ------------------ --


	DROP TABLE IF EXISTS calendar_events;
	CREATE TABLE calendar_events (
		id INT PRIMARY KEY AUTO_INCREMENT,
		channel_id INT NOT NULL,
		title VARCHAR(255) NOT NULL,
		description TEXT,
		event_date DATE NOT NULL,
		creation_date DATETIME DEFAULT NOW(),
		FOREIGN KEY (channel_id) REFERENCES channels(id) ON DELETE CASCADE
	);


	-- -------------------- --
	-- -------------------- --
	-- |Insert Statements| --
	-- -------------------- --
	-- -------------------- --


	INSERT INTO roles (id, role_name)
	VALUES
	(1, 'user'),
	(2, 'admin');


	INSERT INTO catagories (id, catagory_name)
	VALUES
	(1, 'Personal'),
    (2, 'Educational'),
	(3, 'Professional');


	INSERT INTO channel_roles (id, role_name)
	VALUES
	(1, 'owner'),
	(2, 'administrator'),
	(3, 'member');


	INSERT INTO users (name, email, password, role_id, profile_picture) VALUES
	("dummy1", "dummyemail1@fakemail.com", "password", 1, DEFAULT),
	("dummy2", "dummyemail2@fakemail.com", "password", 1, DEFAULT),
	("dummy3", "dummyemail3@fakemail.com", "password", 1, DEFAULT),
	("dummy4", "dummyemail4@fakemail.com", "password", 1, DEFAULT),
	("dummy5", "dummyemail5@fakemail.com", "password", 1, DEFAULT),
	("dummy6", "dummyemail6@fakemail.com", "password", 1, DEFAULT);


	INSERT INTO channels (name, role_id, category, profile_picture) VALUES
	('Geography', 1, 2, "https://bizchats.s3.us-east-2.amazonaws.com/channels/wallpapers/generic/Wallpaper+(1).jpg"),
	('History', 1, 2, "https://bizchats.s3.us-east-2.amazonaws.com/channels/wallpapers/generic/Wallpaper+(2).jpg"),
	('Mathematics', 1, 2, "https://bizchats.s3.us-east-2.amazonaws.com/channels/wallpapers/generic/Wallpaper+(3).jpg"),
	('Science', 1, 2, "https://bizchats.s3.us-east-2.amazonaws.com/channels/wallpapers/generic/Wallpaper+(4).jpg"),
	('Literature', 1, 2, "https://bizchats.s3.us-east-2.amazonaws.com/channels/wallpapers/generic/Wallpaper+(5).jpg"),
    ('Torontonians', 1, 1, "https://bizchats.s3.us-east-2.amazonaws.com/channels/wallpapers/generic/Wallpaper+(6).jpg"),
    ('Friends', 1, 1, "https://bizchats.s3.us-east-2.amazonaws.com/channels/wallpapers/generic/Wallpaper+(7).jpg"),
    ('Game Dev', 1, 3, "https://bizchats.s3.us-east-2.amazonaws.com/channels/wallpapers/generic/Wallpaper+(8).jpg");


	-- INSERT INTO userstochannels (userid, channelid, channelroleid) VALUES
-- 	(1, 1, 1),
-- 	(1, 2, 1),
-- 	(1, 3, 1),
-- 	(1, 4, 1),
-- 	(1, 5, 1),
--     (1, 6, 1),
--     (1, 7, 1),
--     (2, 1, 2),
-- 	(2, 2, 2),
-- 	(2, 3, 2),
-- 	(2, 4, 2),
-- 	(2, 5, 2),
-- 	(2, 6, 2),
--     (2, 7, 2),
--     (3, 1, 2),
-- 	(3, 2, 2),
-- 	(3, 3, 2),
-- 	(3, 4, 2),
-- 	(3, 5, 2),
-- 	(3, 6, 2),
--     (3, 7, 2),
--     (4, 1, 2),
-- 	(4, 2, 2),
-- 	(4, 3, 2),
-- 	(4, 4, 2),
-- 	(4, 5, 2),
-- 	(4, 6, 2),
--     (4, 7, 2),
--     (5, 1, 3),
-- 	(5, 2, 3),
-- 	(5, 3, 3),
-- 	(5, 4, 3),
-- 	(5, 5, 3),
-- 	(5, 6, 3),
--     (5, 7, 3);
    
    -- Test Information
    
    INSERT INTO users (name, email, password, role_id, profile_picture) VALUES
	("Milan", "milan@fakemail.com", "password", 1, 'https://bizchats.s3.us-east-2.amazonaws.com/profile_pictures/Milan.jpeg'),
	("Fahad", "fahad@fakemail.com", "password", 1, DEFAULT),
	("Tres", "tres@fakemail.com", "password", 1, DEFAULT),
	("Alexis", "alexis@fakemail.com", "password", 1, DEFAULT),
	("Lara", "lara@fakemail.com", "password", 1, DEFAULT),
	("James Bond", "jamesbond@fakemail.com", "password", 1, 'https://bizchats.s3.us-east-2.amazonaws.com/profile_pictures/JamesBond.webp'),
	("Spiderman", "spiderman@fakemail.com", "password", 1, 'https://bizchats.s3.us-east-2.amazonaws.com/profile_pictures/Spiderman.jpg'),
	("Darth Vader", "darthvader@fakemail.com", "password", 1, 'https://bizchats.s3.us-east-2.amazonaws.com/profile_pictures/DarthVader.jpg'),
	("Michael Scott", "michaelscott@fakemail.com", "password", 1, 'https://bizchats.s3.us-east-2.amazonaws.com/profile_pictures/MichaelScott.jpg'),
	("Batman", "batman@fakemail.com", "password", 1, 'https://bizchats.s3.us-east-2.amazonaws.com/profile_pictures/Batman.jpg'),
	("John Doe", "johndoe@fakemail.com", "password", 1, DEFAULT),
	("Jane Doe", "janedoe@fakemail.com", "password", 1, DEFAULT);
    
    INSERT INTO userstochannels (userid, channelid, channelroleid) VALUES
	(7, 1, 1),
	(7, 2, 1),
	(7, 3, 1),
	(7, 4, 1),
	(7, 5, 1),
    (7, 6, 1),
    (7, 7, 1),
    (8, 1, 2),
	(8, 2, 2),
	(8, 3, 2),
	(8, 4, 2),
	(8, 5, 2),
	(8, 6, 2),
    (8, 7, 2),
    (9, 1, 2),
	(9, 2, 2),
	(9, 3, 2),
	(9, 4, 2),
	(9, 5, 2),
	(9, 6, 2),
    (9, 7, 2),
    (10, 1, 3),
	(10, 2, 3),
	(10, 3, 3),
	(10, 4, 3),
	(10, 5, 3),
	(10, 6, 3),
    (10, 7, 3),
    (11, 1, 2),
	(11, 2, 2),
	(11, 3, 2),
	(11, 4, 2),
	(11, 5, 2),
	(11, 6, 2),
    (11, 7, 2),
    (12, 1, 2),
	(12, 2, 2),
	(12, 3, 2),
	(12, 4, 2),
	(12, 5, 2),
	(12, 6, 2),
    (12, 7, 2),
    (13, 1, 2),
	(13, 2, 2),
	(13, 3, 2),
	(13, 4, 2),
	(13, 5, 2),
	(13, 6, 2),
    (13, 7, 2),
    (14, 1, 3),
	(14, 2, 3),
	(14, 3, 3),
	(14, 4, 3),
	(14, 5, 3),
	(14, 6, 3),
    (14, 7, 3),
    (15, 1, 2),
	(15, 2, 2),
	(15, 3, 2),
	(15, 4, 2),
	(15, 5, 2),
	(15, 6, 2),
    (15, 7, 2),
    (16, 1, 2),
	(16, 2, 2),
	(16, 3, 2),
	(16, 4, 2),
	(16, 5, 2),
	(16, 6, 2),
    (16, 7, 2),
    (17, 1, 2),
	(17, 2, 2),
	(17, 3, 2),
	(17, 4, 2),
	(17, 5, 2),
	(17, 6, 2),
    (17, 7, 2),
    (18, 1, 3),
	(18, 2, 3),
	(18, 3, 3),
	(18, 4, 3),
	(18, 5, 3),
	(18, 6, 3),
    (18, 7, 3);
    
-- message with spiderman 
INSERT INTO messages (sender_id, receiver_id, content)
VALUES 
(13, 7, 'Yo! Just swung past your apartment. You really need to clean that window.'),
(7, 13, 'Bro, maybe don’t use my living room as your shortcut.'),
(13, 7, 'It’s either that or crashing into a billboard again.'),
(7, 13, 'Was that you who knocked over the hot dog cart on Bloor and Bathurst?'),
(13, 7, 'Allegedly. I call it "unintentional urban remodeling."'),
(7, 13, 'You owe me a hot dog.'),
(13, 7, 'Fine. I’ll web one to your door. No promises it won’t be airborne.');