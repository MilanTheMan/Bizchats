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
		name VARCHAR(50) UNIQUE,
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
    
    
	INSERT INTO users (name, password, role_id, profile_picture) VALUES
	("dummy1", "password", 1, "123"),
	("dummy2", "password", 1, "123"),
	("dummy3", "password", 1, "123"),
	("dummy4", "password", 1, "123"),
	("dummy5", "password", 1, "123"),
	("dummy6", "password", 1, "123");