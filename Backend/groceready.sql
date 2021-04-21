CREATE DATABASE groceready;
USE groceready;

DROP TABLE item;
 DROP TABLE list_table;
 DROP TABLE household;
DROP TABLE user_table;
 DROP TABLE user_households;
 
 DROP TABLE item_detail;



CREATE TABLE IF NOT EXISTS user_households (
	user_id char(50) NOT NULL,
    household_id int NOT NULL,
    is_owner bool,
	PRIMARY KEY (user_id, household_id)
);
CREATE TABLE IF NOT EXISTS user_table (
    user_id char(50) NOT NULL PRIMARY KEY,
    user_name char(50) NOT NULL
);
CREATE TABLE IF NOT EXISTS household (
    household_id int NOT NULL AUTO_INCREMENT,
    household_name char(30) NOT NULL,
    join_code char(30) NOT NULL,
    created_by char(50) NOT NULL,
    FOREIGN KEY (created_by) REFERENCES user_table (user_id) ON DELETE CASCADE,
    PRIMARY KEY(household_id,household_name,created_by,join_code)
);

CREATE TABLE IF NOT EXISTS list_table (
    list_id int NOT NULL AUTO_INCREMENT PRIMARY KEY,
    household_id int NOT NULL,
    list_name char(50) NOT NULL,
    list_type char(10) NOT NULL,
    FOREIGN KEY (household_id) REFERENCES household (household_id) ON DELETE CASCADE
);
CREATE TABLE IF NOT EXISTS item_detail (
  item_detail_id int NOT NULL AUTO_INCREMENT PRIMARY KEY
);
CREATE TABLE IF NOT EXISTS item (
    item_id int NOT NULL AUTO_INCREMENT PRIMARY KEY,
    list_id int NOT NULL,
    quantity int NOT NULL,
    item_name char(50) NOT NULL,
    item_detail_id int,
    FOREIGN KEY (list_id) REFERENCES list_table (list_id) ON DELETE CASCADE,
    FOREIGN KEY (item_detail_id) REFERENCES item_detail (item_detail_id)
);