DROP DATABASE banco_teste;

CREATE DATABASE banco_teste;

USE banco_teste;

CREATE TABLE `Companys`(
    `IdCompany` int PRIMARY KEY auto_increment,
    `Name` varchar(255),
    `Active` boolean default 1
);

CREATE TABLE `Plants`(
    `IdPlant` int PRIMARY KEY auto_increment,
    `Name` varchar(255),
    `Active` boolean default 1
);

CREATE TABLE `UserGroupTypes`(
    `IdUserGroupType` int PRIMARY KEY auto_increment,
    `Name` varchar(255),
    `Active` boolean default 1
);

CREATE TABLE `UserGroups`(
    `IdUserGroup` int PRIMARY KEY auto_increment,
    `IdUserGroupType` int,
    `Name` varchar(255),
    `Active` boolean default 1,
    Foreign Key (`IdUserGroupType`) REFERENCES `UserGroupTypes`(`IdUserGroupType`)
);

CREATE TABLE `Users`(
    `IdUser` int PRIMARY KEY auto_increment,
    `IdUserGroup` int,
    `Name` varchar(255),
    `Login` varchar(255),
    `Password` varchar(255),
    `Last_Login` timestamp null,
    `Locked` boolean default 0,
    `Active` boolean default 1,
    Foreign Key (`IdUserGroup`) REFERENCES `UserGroups`(`IdUserGroup`)
);

CREATE TABLE `PasswordRecoverys`(
    `IdPasswordRecovery` int PRIMARY KEY auto_increment,
    `IdUser` int,
    `Date` timestamp default current_timestamp,
    `Approved` boolean,
    `Active` boolean default 1,
    Foreign Key (`IdUser`) REFERENCES `Users`(`IdUser`)
);