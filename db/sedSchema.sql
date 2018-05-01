SET FOREIGN_KEY_CHECKS=0;
SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

CREATE DATABASE IF NOT EXISTS `sed` DEFAULT CHARACTER SET latin1 COLLATE latin1_swedish_ci;
USE `sed`;

CREATE TABLE `account` (
  `id` int(5) NOT NULL,
  `studentID` int(7) NOT NULL,
  `isAircon` int(1) NOT NULL DEFAULT '0',
  `feeType` int(1) NOT NULL DEFAULT '0',
  `amount` int(8) NOT NULL,
  `balance` int(8) NOT NULL,
  `date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

CREATE TABLE `accountType` (
  `id` int(5) NOT NULL,
  `title` varchar(15) NOT NULL,
  `permission` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

CREATE TABLE `activity` (
  `id` int(4) NOT NULL,
  `date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `startTime` time NOT NULL,
  `duration` int(3) NOT NULL,
  `studentID` int(7) NOT NULL,
  `instructorID` int(4) NOT NULL,
  `vehicleID` int(3) NOT NULL,
  `lessonID` int(3) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

CREATE TABLE `branch` (
  `id` int(3) NOT NULL,
  `address` varchar(150) NOT NULL,
  `telno` varchar(15) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

CREATE TABLE `credential` (
  `id` int(5) NOT NULL,
  `username` varchar(15) NOT NULL,
  `password` varchar(40) NOT NULL,
  `accType` int(5) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

CREATE TABLE `guardian` (
  `id` int(4) NOT NULL,
  `fullname` varchar(50) NOT NULL,
  `telno` varchar(12) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

CREATE TABLE `instructor` (
  `id` int(4) NOT NULL,
  `usrAcc` int(5) DEFAULT NULL,
  `fullname` varchar(50) NOT NULL,
  `address` varchar(100) NOT NULL,
  `telno` varchar(12) NOT NULL,
  `birthdate` date NOT NULL,
  `sex` varchar(3) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

CREATE TABLE `instructorevaluation` (
  `id` int(4) NOT NULL,
  `studentID` int(7) NOT NULL,
  `instructorID` int(4) NOT NULL,
  `evaluation` varchar(10) NOT NULL,
  `comment` varchar(300) DEFAULT NULL,
  `date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

CREATE TABLE `lessonlist` (
  `id` int(3) NOT NULL,
  `title` varchar(15) NOT NULL,
  `description` varchar(300) DEFAULT NULL,
  `prerequisite` varchar(3) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

CREATE TABLE `registrar` (
  `studentID` int(7) NOT NULL,
  `studentInfo` int(5) NOT NULL,
  `requirement` int(3) NOT NULL,
  `date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `status` int(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

CREATE TABLE `requirement` (
  `id` int(3) NOT NULL,
  `title` varchar(15) NOT NULL,
  `description` varchar(300) DEFAULT NULL,
  `important` int(1) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

CREATE TABLE `schedule` (
  `id` int(5) NOT NULL,
  `date` date NOT NULL,
  `time` time NOT NULL,
  `hour` int(3) NOT NULL,
  `studentID` int(7) NOT NULL,
  `instructorID` int(4) NOT NULL,
  `branchID` int(3) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

CREATE TABLE `studentevaluation` (
  `id` int(4) NOT NULL,
  `studentID` int(7) NOT NULL,
  `instructorID` int(4) NOT NULL,
  `evaluation` varchar(10) NOT NULL,
  `date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

CREATE TABLE `studentinformation` (
  `id` int(5) NOT NULL,
  `usrAcc` int(5) DEFAULT NULL,
  `guardianID` int(4) NOT NULL,
  `fullname` varchar(50) NOT NULL,
  `birthdate` date NOT NULL,
  `birthplace` varchar(100) NOT NULL,
  `civilStatus` varchar(10) NOT NULL,
  `sex` varchar(3) NOT NULL,
  `occupation` varchar(30) DEFAULT NULL,
  `telno` varchar(12) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

CREATE TABLE `vehicle` (
  `id` int(3) NOT NULL,
  `model` varchar(15) NOT NULL,
  `brand` varchar(15) NOT NULL,
  `fuel` varchar(3) NOT NULL,
  `defect` varchar(30) DEFAULT NULL,
  `status` int(1) NOT NULL DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;


ALTER TABLE `account`
  ADD PRIMARY KEY (`id`),
  ADD KEY `studentID` (`studentID`);

ALTER TABLE `accountType`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `title` (`title`);

ALTER TABLE `activity`
  ADD PRIMARY KEY (`id`),
  ADD KEY `instructorID` (`instructorID`),
  ADD KEY `lessonID` (`lessonID`),
  ADD KEY `studentID` (`studentID`),
  ADD KEY `vehicleID` (`vehicleID`);

ALTER TABLE `branch`
  ADD PRIMARY KEY (`id`);

ALTER TABLE `credential`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `username` (`username`),
  ADD KEY `accType` (`accType`);

ALTER TABLE `guardian`
  ADD PRIMARY KEY (`id`);

ALTER TABLE `instructor`
  ADD PRIMARY KEY (`id`),
  ADD KEY `usrAcc` (`usrAcc`);

ALTER TABLE `instructorevaluation`
  ADD PRIMARY KEY (`id`),
  ADD KEY `instructorevaluation_ibfk_3` (`studentID`),
  ADD KEY `instructorevaluation_ibfk_4` (`instructorID`);

ALTER TABLE `lessonlist`
  ADD PRIMARY KEY (`id`);

ALTER TABLE `registrar`
  ADD PRIMARY KEY (`studentID`),
  ADD KEY `studentInfo` (`studentInfo`),
  ADD KEY `requirement` (`requirement`);

ALTER TABLE `requirement`
  ADD PRIMARY KEY (`id`);

ALTER TABLE `schedule`
  ADD PRIMARY KEY (`id`),
  ADD KEY `studentID` (`studentID`),
  ADD KEY `instructorID` (`instructorID`),
  ADD KEY `branchID` (`branchID`);

ALTER TABLE `studentevaluation`
  ADD PRIMARY KEY (`id`),
  ADD KEY `studentevaluation_ibfk_1` (`studentID`),
  ADD KEY `studentevaluation_ibfk_2` (`instructorID`);

ALTER TABLE `studentinformation`
  ADD PRIMARY KEY (`id`),
  ADD KEY `guardianID` (`guardianID`),
  ADD KEY `usrAcc` (`usrAcc`);

ALTER TABLE `vehicle`
  ADD PRIMARY KEY (`id`);


ALTER TABLE `account`
  MODIFY `id` int(5) NOT NULL AUTO_INCREMENT;

ALTER TABLE `accountType`
  MODIFY `id` int(5) NOT NULL AUTO_INCREMENT;

ALTER TABLE `branch`
  MODIFY `id` int(3) NOT NULL AUTO_INCREMENT;

ALTER TABLE `credential`
  MODIFY `id` int(5) NOT NULL AUTO_INCREMENT;

ALTER TABLE `guardian`
  MODIFY `id` int(4) NOT NULL AUTO_INCREMENT;

ALTER TABLE `instructor`
  MODIFY `id` int(4) NOT NULL AUTO_INCREMENT;

ALTER TABLE `instructorevaluation`
  MODIFY `id` int(4) NOT NULL AUTO_INCREMENT;

ALTER TABLE `lessonlist`
  MODIFY `id` int(3) NOT NULL AUTO_INCREMENT;

ALTER TABLE `registrar`
  MODIFY `studentID` int(7) NOT NULL AUTO_INCREMENT;

ALTER TABLE `requirement`
  MODIFY `id` int(3) NOT NULL AUTO_INCREMENT;

ALTER TABLE `schedule`
  MODIFY `id` int(5) NOT NULL AUTO_INCREMENT;

ALTER TABLE `studentevaluation`
  MODIFY `id` int(4) NOT NULL AUTO_INCREMENT;

ALTER TABLE `studentinformation`
  MODIFY `id` int(5) NOT NULL AUTO_INCREMENT;

ALTER TABLE `vehicle`
  MODIFY `id` int(3) NOT NULL AUTO_INCREMENT;


ALTER TABLE `account`
  ADD CONSTRAINT `account_ibfk_1` FOREIGN KEY (`studentID`) REFERENCES `registrar` (`studentID`) ON DELETE NO ACTION ON UPDATE CASCADE;

ALTER TABLE `activity`
  ADD CONSTRAINT `activity_ibfk_1` FOREIGN KEY (`instructorID`) REFERENCES `instructor` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE,
  ADD CONSTRAINT `activity_ibfk_2` FOREIGN KEY (`lessonID`) REFERENCES `lessonlist` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE,
  ADD CONSTRAINT `activity_ibfk_3` FOREIGN KEY (`studentID`) REFERENCES `registrar` (`studentID`) ON DELETE NO ACTION ON UPDATE CASCADE,
  ADD CONSTRAINT `activity_ibfk_4` FOREIGN KEY (`vehicleID`) REFERENCES `vehicle` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE;

ALTER TABLE `credential`
  ADD CONSTRAINT `credential_ibfk_1` FOREIGN KEY (`accType`) REFERENCES `accountType` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE;

ALTER TABLE `instructor`
  ADD CONSTRAINT `instructor_ibfk_1` FOREIGN KEY (`usrAcc`) REFERENCES `credential` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE;

ALTER TABLE `instructorevaluation`
  ADD CONSTRAINT `instructorevaluation_ibfk_3` FOREIGN KEY (`studentID`) REFERENCES `registrar` (`studentID`) ON DELETE NO ACTION ON UPDATE CASCADE,
  ADD CONSTRAINT `instructorevaluation_ibfk_4` FOREIGN KEY (`instructorID`) REFERENCES `instructor` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE;

ALTER TABLE `registrar`
  ADD CONSTRAINT `registrar_ibfk_1` FOREIGN KEY (`studentInfo`) REFERENCES `studentinformation` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE,
  ADD CONSTRAINT `registrar_ibfk_2` FOREIGN KEY (`requirement`) REFERENCES `requirement` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE;

ALTER TABLE `schedule`
  ADD CONSTRAINT `schedule_ibfk_1` FOREIGN KEY (`studentID`) REFERENCES `registrar` (`studentID`) ON DELETE NO ACTION ON UPDATE CASCADE,
  ADD CONSTRAINT `schedule_ibfk_2` FOREIGN KEY (`instructorID`) REFERENCES `instructor` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE,
  ADD CONSTRAINT `schedule_ibfk_3` FOREIGN KEY (`branchID`) REFERENCES `branch` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE;

ALTER TABLE `studentevaluation`
  ADD CONSTRAINT `studentevaluation_ibfk_1` FOREIGN KEY (`studentID`) REFERENCES `registrar` (`studentID`) ON DELETE NO ACTION ON UPDATE CASCADE,
  ADD CONSTRAINT `studentevaluation_ibfk_2` FOREIGN KEY (`instructorID`) REFERENCES `instructor` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE;

ALTER TABLE `studentinformation`
  ADD CONSTRAINT `studentinformation_ibfk_1` FOREIGN KEY (`guardianID`) REFERENCES `guardian` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE,
  ADD CONSTRAINT `studentinformation_ibfk_2` FOREIGN KEY (`usrAcc`) REFERENCES `credential` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE;
SET FOREIGN_KEY_CHECKS=1;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;