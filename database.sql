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
		profile_picture BLOB,
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
		profile_picture BLOB,
		foreign key (role_id) references roles(id)
	);

    -- ------------------- --
	-- |Channel Roles| --
	-- ------------------- --

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

    -- -------------------- --
	-- |Channel Announcements| --
	-- -------------------- --

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

	-- -------------------- --
	-- |Channel Marks| --
	-- -------------------- --

	drop table if exists channel_marks;
	create table channel_marks
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
    
    
	-- -------------------- --
	-- -------------------- --
	-- |Insert Statements| --
	-- -------------------- --
	-- -------------------- --
    
	-- ------------ --
	-- |Role Types| --
	-- ------------ --


	INSERT INTO roles (id, role_name)
	VALUES
	(1, 'user'),
	(2, 'admin');

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


	INSERT INTO channels (name, role_id, profile_picture) VALUES
	('Geography', 1, NULL),
	('History', 1, NULL),
	('Mathematics', 1, NULL),
	('Science', 1, NULL),
	('Literature', 1, NULL);


	INSERT INTO userstochannels (userid, channelid, channelroleid) VALUES
	(1, 1, 1),
	(1, 2, 1),
	(1, 3, 1),
	(1, 4, 1),
	(1, 5, 1);