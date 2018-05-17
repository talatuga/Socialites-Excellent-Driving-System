SET FOREIGN_KEY_CHECKS=0;
SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;


CREATE TABLE `account` (
  `id` int(15) NOT NULL,
  `studID` varchar(15) NOT NULL,
  `feeType` int(1) NOT NULL,
  `isAircon` int(1) NOT NULL,
  `amount` int(10) NOT NULL,
  `balance` int(10) NOT NULL,
  `data` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

CREATE TABLE `accounttype` (
  `id` int(5) NOT NULL,
  `title` varchar(15) NOT NULL,
  `permission` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

CREATE TABLE `activity` (
  `id` int(15) NOT NULL,
  `data` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `startTime` time NOT NULL,
  `duration` int(3) NOT NULL,
  `studID` varchar(15) NOT NULL,
  `instID` varchar(15) NOT NULL,
  `vehicleID` int(3) NOT NULL,
  `lessonID` int(3) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

CREATE TABLE `branch` (
  `id` int(3) NOT NULL,
  `address` varchar(150) NOT NULL,
  `telno` varchar(12) NOT NULL,
  `name` varchar(5) NOT NULL,
  `purgeFlag` int(1) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

CREATE TABLE `defect` (
  `id` int(7) NOT NULL,
  `vehicle` int(3) NOT NULL,
  `part` varchar(15) NOT NULL,
  `description` varchar(150) NOT NULL,
  `repaired` int(1) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

CREATE TABLE `evaluation` (
  `id` int(5) NOT NULL,
  `studID` varchar(15) NOT NULL,
  `instID` varchar(15) NOT NULL,
  `evaluation` varchar(10) NOT NULL,
  `comment` varchar(300) NOT NULL,
  `date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `target` varchar(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

CREATE TABLE `guardian` (
  `id` int(4) NOT NULL,
  `fullname` varchar(50) NOT NULL,
  `telno` varchar(12) NOT NULL,
  `refAcc` int(7) NOT NULL,
  `purgeFlag` int(1) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

CREATE TABLE `instructor` (
  `id` varchar(15) NOT NULL,
  `userInfo` int(7) NOT NULL,
  `vacant` varchar(7) NOT NULL,
  `status` int(1) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

CREATE TABLE `lesson` (
  `id` int(3) NOT NULL,
  `title` varchar(15) NOT NULL,
  `prerequisite` int(3) NOT NULL,
  `description` varchar(150) NOT NULL,
  `purgeFlag` int(1) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

CREATE TABLE `passedRequirement` (
  `id` int(10) NOT NULL,
  `studID` varchar(15) NOT NULL,
  `requirementID` int(3) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

CREATE TABLE `requirement` (
  `id` int(3) NOT NULL,
  `title` varchar(15) NOT NULL,
  `description` varchar(100) NOT NULL,
  `importance` int(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

CREATE TABLE `schedule` (
  `id` int(15) NOT NULL,
  `date` date NOT NULL,
  `time` time NOT NULL,
  `hour` int(3) NOT NULL,
  `studID` varchar(15) NOT NULL,
  `instID` varchar(15) NOT NULL,
  `branch` int(3) NOT NULL,
  `status` int(1) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

CREATE TABLE `student` (
  `id` varchar(15) NOT NULL,
  `userInfo` int(7) NOT NULL,
  `dateRegistered` date NOT NULL,
  `status` int(1) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

CREATE TABLE `useraccount` (
  `id` int(10) NOT NULL,
  `username` varchar(15) NOT NULL,
  `password` varchar(40) NOT NULL,
  `accType` int(2) NOT NULL,
  `status` int(1) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

CREATE TABLE `userinfo` (
  `id` int(7) NOT NULL,
  `userAcc` int(10) NOT NULL,
  `fullname` varchar(50) NOT NULL,
  `address` varchar(100) NOT NULL,
  `telno` varchar(12) NOT NULL,
  `birthdate` date NOT NULL,
  `birthplace` varchar(50) NOT NULL,
  `sex` varchar(3) NOT NULL,
  `civilStatus` varchar(10) NOT NULL,
  `email` varchar(30) NOT NULL,
  `userType` int(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

CREATE TABLE `vehicle` (
  `id` int(3) NOT NULL,
  `model` varchar(15) NOT NULL,
  `brand` varchar(15) NOT NULL,
  `plate#` varchar(10) NOT NULL,
  `offday` int(1) NOT NULL,
  `status` int(1) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;


ALTER TABLE `account`
  ADD PRIMARY KEY (`id`),
  ADD KEY `studID` (`studID`);

ALTER TABLE `accounttype`
  ADD PRIMARY KEY (`id`);

ALTER TABLE `activity`
  ADD PRIMARY KEY (`id`),
  ADD KEY `studID` (`studID`),
  ADD KEY `instID` (`instID`),
  ADD KEY `vehicleID` (`vehicleID`),
  ADD KEY `lessonID` (`lessonID`);

ALTER TABLE `branch`
  ADD PRIMARY KEY (`id`);

ALTER TABLE `defect`
  ADD PRIMARY KEY (`id`),
  ADD KEY `vehicle` (`vehicle`);

ALTER TABLE `evaluation`
  ADD PRIMARY KEY (`id`),
  ADD KEY `studID` (`studID`),
  ADD KEY `instID` (`instID`);

ALTER TABLE `guardian`
  ADD PRIMARY KEY (`id`),
  ADD KEY `refAcc` (`refAcc`);

ALTER TABLE `instructor`
  ADD PRIMARY KEY (`id`),
  ADD KEY `userInfo` (`userInfo`);

ALTER TABLE `lesson`
  ADD PRIMARY KEY (`id`);

ALTER TABLE `passedRequirement`
  ADD PRIMARY KEY (`id`),
  ADD KEY `requirementID` (`requirementID`),
  ADD KEY `studID` (`studID`);

ALTER TABLE `requirement`
  ADD PRIMARY KEY (`id`);

ALTER TABLE `schedule`
  ADD PRIMARY KEY (`id`),
  ADD KEY `studID` (`studID`),
  ADD KEY `instID` (`instID`),
  ADD KEY `branch` (`branch`);

ALTER TABLE `student`
  ADD PRIMARY KEY (`id`),
  ADD KEY `userInfo` (`userInfo`);

ALTER TABLE `useraccount`
  ADD PRIMARY KEY (`id`),
  ADD KEY `accType` (`accType`);

ALTER TABLE `userinfo`
  ADD PRIMARY KEY (`id`),
  ADD KEY `userAcc` (`userAcc`);

ALTER TABLE `vehicle`
  ADD PRIMARY KEY (`id`);


ALTER TABLE `account`
  MODIFY `id` int(15) NOT NULL AUTO_INCREMENT;

ALTER TABLE `accounttype`
  MODIFY `id` int(5) NOT NULL AUTO_INCREMENT;

ALTER TABLE `activity`
  MODIFY `id` int(15) NOT NULL AUTO_INCREMENT;

ALTER TABLE `branch`
  MODIFY `id` int(3) NOT NULL AUTO_INCREMENT;

ALTER TABLE `defect`
  MODIFY `id` int(7) NOT NULL AUTO_INCREMENT;

ALTER TABLE `evaluation`
  MODIFY `id` int(5) NOT NULL AUTO_INCREMENT;

ALTER TABLE `guardian`
  MODIFY `id` int(4) NOT NULL AUTO_INCREMENT;

ALTER TABLE `lesson`
  MODIFY `id` int(3) NOT NULL AUTO_INCREMENT;

ALTER TABLE `requirement`
  MODIFY `id` int(3) NOT NULL AUTO_INCREMENT;

ALTER TABLE `schedule`
  MODIFY `id` int(15) NOT NULL AUTO_INCREMENT;

ALTER TABLE `useraccount`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT;

ALTER TABLE `userinfo`
  MODIFY `id` int(7) NOT NULL AUTO_INCREMENT;

ALTER TABLE `vehicle`
  MODIFY `id` int(3) NOT NULL AUTO_INCREMENT;


ALTER TABLE `account`
  ADD CONSTRAINT `account_ibfk_1` FOREIGN KEY (`studID`) REFERENCES `student` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE;

ALTER TABLE `activity`
  ADD CONSTRAINT `activity_ibfk_1` FOREIGN KEY (`studID`) REFERENCES `student` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE,
  ADD CONSTRAINT `activity_ibfk_2` FOREIGN KEY (`instID`) REFERENCES `instructor` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE,
  ADD CONSTRAINT `activity_ibfk_3` FOREIGN KEY (`vehicleID`) REFERENCES `vehicle` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE,
  ADD CONSTRAINT `activity_ibfk_4` FOREIGN KEY (`lessonID`) REFERENCES `lesson` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE;

ALTER TABLE `defect`
  ADD CONSTRAINT `defect_ibfk_1` FOREIGN KEY (`vehicle`) REFERENCES `vehicle` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE;

ALTER TABLE `evaluation`
  ADD CONSTRAINT `evaluation_ibfk_1` FOREIGN KEY (`studID`) REFERENCES `student` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE,
  ADD CONSTRAINT `evaluation_ibfk_2` FOREIGN KEY (`instID`) REFERENCES `instructor` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE;

ALTER TABLE `guardian`
  ADD CONSTRAINT `guardian_ibfk_1` FOREIGN KEY (`refAcc`) REFERENCES `userinfo` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE;

ALTER TABLE `instructor`
  ADD CONSTRAINT `instructor_ibfk_1` FOREIGN KEY (`userInfo`) REFERENCES `userinfo` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE;

ALTER TABLE `passedRequirement`
  ADD CONSTRAINT `passedRequirement_ibfk_1` FOREIGN KEY (`requirementID`) REFERENCES `requirement` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE,
  ADD CONSTRAINT `passedRequirement_ibfk_2` FOREIGN KEY (`studID`) REFERENCES `student` (`id`);

ALTER TABLE `schedule`
  ADD CONSTRAINT `schedule_ibfk_1` FOREIGN KEY (`studID`) REFERENCES `student` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE,
  ADD CONSTRAINT `schedule_ibfk_2` FOREIGN KEY (`instID`) REFERENCES `instructor` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE,
  ADD CONSTRAINT `schedule_ibfk_3` FOREIGN KEY (`branch`) REFERENCES `branch` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE;

ALTER TABLE `student`
  ADD CONSTRAINT `student_ibfk_1` FOREIGN KEY (`userInfo`) REFERENCES `userinfo` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE;

ALTER TABLE `useraccount`
  ADD CONSTRAINT `useraccount_ibfk_1` FOREIGN KEY (`accType`) REFERENCES `accounttype` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE;

ALTER TABLE `userinfo`
  ADD CONSTRAINT `userinfo_ibfk_1` FOREIGN KEY (`userAcc`) REFERENCES `useraccount` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE;
SET FOREIGN_KEY_CHECKS=1;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;