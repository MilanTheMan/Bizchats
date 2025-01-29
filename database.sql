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
    
    
	INSERT INTO users (name, email, password, role_id, profile_picture) VALUES
	("dummy1", "dummyemail1@fakemail.com", "password", 1, "123"),
	("dummy2", "dummyemail2@fakemail.com", "password", 1, "123"),
	("dummy3", "dummyemail3@fakemail.com", "password", 1, "123"),
	("dummy4", "dummyemail4@fakemail.com", "password", 1, "123"),
	("dummy5", "dummyemail5@fakemail.com", "password", 1, "123"),
	("dummy6", "dummyemail6@fakemail.com", "password", 1, "123");