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
    
    
    -- -------------------- --
	-- |Channel Doccuments| --
	-- -------------------- --


	drop table if exists channel_doccuments;
	create table channel_doccuments
	(
		id INT PRIMARY KEY auto_increment,
		channel_id INT NOT NULL,
        catagory_id INT NOT NULL,
		user_id INT NOT NULL,
        file_link TEXT,
        creation_date DATETIME default NOW(),
		foreign key (user_id) references users(id) ON DELETE CASCADE,
		foreign key (catagory_id) references documents_catagories(id) ON DELETE CASCADE,
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
	("dummy1", "dummyemail1@fakemail.com", "password", 1, NULL),
	("dummy2", "dummyemail2@fakemail.com", "password", 1, NULL),
	("dummy3", "dummyemail3@fakemail.com", "password", 1, NULL),
	("dummy4", "dummyemail4@fakemail.com", "password", 1, NULL),
	("dummy5", "dummyemail5@fakemail.com", "password", 1, NULL),
	("dummy6", "dummyemail6@fakemail.com", "password", 1, NULL);


	INSERT INTO channels (name, role_id, category, profile_picture) VALUES
	('Geography', 1, 2, "https://bizchats.s3.us-east-2.amazonaws.com/channels/wallpapers/generic/Wallpaper+(1).jpg"),
	('History', 1, 2, "https://bizchats.s3.us-east-2.amazonaws.com/channels/wallpapers/generic/Wallpaper+(2).jpg"),
	('Mathematics', 1, 2, "https://bizchats.s3.us-east-2.amazonaws.com/channels/wallpapers/generic/Wallpaper+(3).jpg"),
	('Science', 1, 2, "https://bizchats.s3.us-east-2.amazonaws.com/channels/wallpapers/generic/Wallpaper+(4).jpg"),
	('Literature', 1, 2, "https://bizchats.s3.us-east-2.amazonaws.com/channels/wallpapers/generic/Wallpaper+(5).jpg"),
    ('Torontonians', 1, 1, "https://bizchats.s3.us-east-2.amazonaws.com/channels/wallpapers/generic/Wallpaper+(6).jpg"),
    ('Friends', 1, 1, "https://bizchats.s3.us-east-2.amazonaws.com/channels/wallpapers/generic/Wallpaper+(7).jpg"),
    ('Game Dev', 1, 3, "https://bizchats.s3.us-east-2.amazonaws.com/channels/wallpapers/generic/Wallpaper+(8).jpg");


	INSERT INTO userstochannels (userid, channelid, channelroleid) VALUES
	(1, 1, 1),
	(1, 2, 1),
	(1, 3, 1),
	(1, 4, 1),
	(1, 5, 1),
    (1, 6, 1),
    (1, 7, 1),
    (2, 1, 2),
	(2, 2, 2),
	(2, 3, 2),
	(2, 4, 2),
	(2, 5, 2),
	(2, 6, 2),
    (2, 7, 2),
    (3, 1, 2),
	(3, 2, 2),
	(3, 3, 2),
	(3, 4, 2),
	(3, 5, 2),
	(3, 6, 2),
    (3, 7, 2),
    (4, 1, 2),
	(4, 2, 2),
	(4, 3, 2),
	(4, 4, 2),
	(4, 5, 2),
	(4, 6, 2),
    (4, 7, 2),
    (5, 1, 3),
	(5, 2, 3),
	(5, 3, 3),
	(5, 4, 3),
	(5, 5, 3),
	(5, 6, 3),
    (5, 7, 3);