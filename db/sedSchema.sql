SET FOREIGN_KEY_CHECKS=0;
SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;


DROP TABLE IF EXISTS `account`;
CREATE TABLE `account` (
  `id` int(15) NOT NULL,
  `ORno` varchar(15) NOT NULL,
  `transaction` varchar(20) NOT NULL,
  `feeType` int(1) NOT NULL,
  `price` int(10) NOT NULL,
  `balance` int(10) NOT NULL,
  `date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

DROP TABLE IF EXISTS `accounttype`;
CREATE TABLE `accounttype` (
  `id` int(5) NOT NULL,
  `title` varchar(15) NOT NULL,
  `permission` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

DROP TABLE IF EXISTS `activity`;
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

DROP TABLE IF EXISTS `admin`;
CREATE TABLE `admin` (
  `id` int(7) NOT NULL,
  `userInfo` int(7) NOT NULL,
  `branchID` int(3) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

DROP TABLE IF EXISTS `branch`;
CREATE TABLE `branch` (
  `id` int(3) NOT NULL,
  `address` varchar(150) NOT NULL,
  `telno` varchar(24) NOT NULL,
  `name` varchar(15) NOT NULL,
  `purgeFlag` int(1) NOT NULL DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

DROP TABLE IF EXISTS `codingscheme`;
CREATE TABLE `codingscheme` (
  `id` int(3) NOT NULL,
  `branch` int(3) NOT NULL,
  `scheme` varchar(50) NOT NULL,
  `status` int(1) NOT NULL DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

DROP TABLE IF EXISTS `course`;
CREATE TABLE `course` (
  `id` int(3) NOT NULL,
  `description` varchar(300) NOT NULL,
  `carType` varchar(10) NOT NULL,
  `amount` int(5) NOT NULL,
  `days` int(3) NOT NULL,
  `status` int(1) NOT NULL DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

DROP TABLE IF EXISTS `course_enrolled`;
CREATE TABLE `course_enrolled` (
  `id` int(9) NOT NULL,
  `enrollmentID` int(5) NOT NULL,
  `studID` varchar(15) NOT NULL,
  `courseID` int(3) NOT NULL,
  `branch` int(3) NOT NULL,
  `selectedLesson` varchar(30) NOT NULL,
  `dateEnrolled` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `paid` int(1) NOT NULL DEFAULT '0',
  `status` int(1) NOT NULL DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

DROP TABLE IF EXISTS `defect`;
CREATE TABLE `defect` (
  `id` int(7) NOT NULL,
  `vehicle` int(3) NOT NULL,
  `part` varchar(15) NOT NULL,
  `description` varchar(150) NOT NULL,
  `importance` int(1) NOT NULL,
  `repaired` int(1) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

DROP TABLE IF EXISTS `evaluation`;
CREATE TABLE `evaluation` (
  `id` int(5) NOT NULL,
  `studID` varchar(15) NOT NULL,
  `instID` varchar(15) NOT NULL,
  `evaluation` varchar(10) NOT NULL,
  `comment` varchar(300) NOT NULL,
  `date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `target` varchar(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

DROP TABLE IF EXISTS `guardian`;
CREATE TABLE `guardian` (
  `id` int(4) NOT NULL,
  `fullname` varchar(50) NOT NULL,
  `telno` varchar(12) NOT NULL,
  `refAcc` int(7) NOT NULL,
  `purgeFlag` int(1) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

DROP TABLE IF EXISTS `instructor`;
CREATE TABLE `instructor` (
  `id` varchar(15) NOT NULL,
  `userInfo` int(7) NOT NULL,
  `license` varchar(11) NOT NULL,
  `licenseExp` date NOT NULL,
  `educAttain` int(1) NOT NULL,
  `vacant` varchar(7) DEFAULT NULL,
  `dateRegistered` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `dateRetired` date DEFAULT NULL,
  `status` int(1) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

DROP TABLE IF EXISTS `lesson`;
CREATE TABLE `lesson` (
  `id` int(3) NOT NULL,
  `title` varchar(50) NOT NULL,
  `prerequisite` int(3) DEFAULT NULL,
  `description` varchar(150) NOT NULL,
  `duration` int(3) NOT NULL,
  `purgeFlag` int(1) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

DROP TABLE IF EXISTS `lesson_courses`;
CREATE TABLE `lesson_courses` (
  `id` int(3) NOT NULL,
  `lessonID` int(3) NOT NULL,
  `courseID` int(3) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

DROP TABLE IF EXISTS `license_apply_price`;
CREATE TABLE `license_apply_price` (
  `id` int(2) NOT NULL,
  `type` varchar(15) NOT NULL,
  `desc` varchar(100) NOT NULL,
  `price` int(7) NOT NULL,
  `status` int(1) NOT NULL DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

DROP TABLE IF EXISTS `newsletter`;
CREATE TABLE `newsletter` (
  `id` int(4) NOT NULL,
  `email` varchar(100) NOT NULL,
  `token` varchar(20) NOT NULL,
  `status` int(1) NOT NULL DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

DROP TABLE IF EXISTS `passedrequirement`;
CREATE TABLE `passedrequirement` (
  `id` int(10) NOT NULL,
  `studID` varchar(15) NOT NULL,
  `requirementID` int(3) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

DROP TABLE IF EXISTS `payment`;
CREATE TABLE `payment` (
  `id` int(7) NOT NULL,
  `transactionID` varchar(15) NOT NULL,
  `bill` int(10) NOT NULL,
  `pay` int(10) NOT NULL,
  `balance` int(10) DEFAULT NULL,
  `datePay` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

DROP TABLE IF EXISTS `preregstudent`;
CREATE TABLE `preregstudent` (
  `id` int(10) NOT NULL,
  `data` varchar(1000) NOT NULL,
  `dateSubmit` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `status` int(1) NOT NULL DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

DROP TABLE IF EXISTS `requirement`;
CREATE TABLE `requirement` (
  `id` int(3) NOT NULL,
  `title` varchar(15) NOT NULL,
  `description` varchar(100) NOT NULL,
  `importance` int(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

DROP TABLE IF EXISTS `schedule`;
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

DROP TABLE IF EXISTS `student`;
CREATE TABLE `student` (
  `id` varchar(15) NOT NULL,
  `userInfo` int(7) NOT NULL,
  `license` varchar(50) NOT NULL,
  `dateRegistered` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `status` int(1) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

DROP TABLE IF EXISTS `useraccount`;
CREATE TABLE `useraccount` (
  `id` int(10) NOT NULL,
  `username` varchar(30) NOT NULL,
  `password` varchar(40) NOT NULL,
  `accType` int(2) NOT NULL,
  `status` int(1) NOT NULL DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

DROP TABLE IF EXISTS `userinfo`;
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

DROP TABLE IF EXISTS `vehicle`;
CREATE TABLE `vehicle` (
  `id` int(3) NOT NULL,
  `model` varchar(15) NOT NULL,
  `brand` varchar(15) NOT NULL,
  `transmission` varchar(1) NOT NULL,
  `price` varchar(7) NOT NULL,
  `plate` varchar(10) NOT NULL,
  `driver` varchar(15) DEFAULT NULL,
  `garage` int(3) NOT NULL,
  `offday` int(1) NOT NULL,
  `status` int(1) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

DROP TABLE IF EXISTS `web_branch`;
CREATE TABLE `web_branch` (
  `id` int(3) NOT NULL,
  `branchID` int(3) NOT NULL,
  `branchName` varchar(10) NOT NULL,
  `location` varchar(30) NOT NULL,
  `fulladdress` varchar(100) NOT NULL,
  `telno` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

DROP TABLE IF EXISTS `web_course`;
CREATE TABLE `web_course` (
  `id` int(3) NOT NULL,
  `courseID` int(3) NOT NULL,
  `transmission` varchar(1) NOT NULL,
  `days` int(2) NOT NULL,
  `hour` int(3) NOT NULL,
  `price` int(7) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;


ALTER TABLE `account`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `ORno` (`ORno`);

ALTER TABLE `accounttype`
  ADD PRIMARY KEY (`id`);

ALTER TABLE `activity`
  ADD PRIMARY KEY (`id`),
  ADD KEY `studID` (`studID`),
  ADD KEY `instID` (`instID`),
  ADD KEY `vehicleID` (`vehicleID`),
  ADD KEY `lessonID` (`lessonID`);

ALTER TABLE `admin`
  ADD PRIMARY KEY (`id`),
  ADD KEY `userInfo` (`userInfo`),
  ADD KEY `branchID` (`branchID`);

ALTER TABLE `branch`
  ADD PRIMARY KEY (`id`);

ALTER TABLE `codingscheme`
  ADD PRIMARY KEY (`id`),
  ADD KEY `branch` (`branch`);

ALTER TABLE `course`
  ADD PRIMARY KEY (`id`);

ALTER TABLE `course_enrolled`
  ADD PRIMARY KEY (`id`),
  ADD KEY `studID` (`studID`),
  ADD KEY `courseID` (`courseID`),
  ADD KEY `branch` (`branch`);

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
  ADD UNIQUE KEY `license` (`license`),
  ADD KEY `userInfo` (`userInfo`);

ALTER TABLE `lesson`
  ADD PRIMARY KEY (`id`),
  ADD KEY `prerequisite` (`prerequisite`);

ALTER TABLE `lesson_courses`
  ADD PRIMARY KEY (`id`),
  ADD KEY `courseID` (`courseID`),
  ADD KEY `lessonID` (`lessonID`);

ALTER TABLE `license_apply_price`
  ADD PRIMARY KEY (`id`);

ALTER TABLE `newsletter`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

ALTER TABLE `passedrequirement`
  ADD PRIMARY KEY (`id`),
  ADD KEY `requirementID` (`requirementID`),
  ADD KEY `studID` (`studID`);

ALTER TABLE `payment`
  ADD PRIMARY KEY (`id`),
  ADD KEY `transactionID` (`transactionID`);

ALTER TABLE `preregstudent`
  ADD PRIMARY KEY (`id`);

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
  ADD PRIMARY KEY (`id`),
  ADD KEY `driver` (`driver`),
  ADD KEY `garage` (`garage`);

ALTER TABLE `web_branch`
  ADD PRIMARY KEY (`id`),
  ADD KEY `branchID` (`branchID`);

ALTER TABLE `web_course`
  ADD PRIMARY KEY (`id`),
  ADD KEY `courseID` (`courseID`);


ALTER TABLE `account`
  MODIFY `id` int(15) NOT NULL AUTO_INCREMENT;
ALTER TABLE `accounttype`
  MODIFY `id` int(5) NOT NULL AUTO_INCREMENT;
ALTER TABLE `activity`
  MODIFY `id` int(15) NOT NULL AUTO_INCREMENT;
ALTER TABLE `admin`
  MODIFY `id` int(7) NOT NULL AUTO_INCREMENT;
ALTER TABLE `branch`
  MODIFY `id` int(3) NOT NULL AUTO_INCREMENT;
ALTER TABLE `codingscheme`
  MODIFY `id` int(3) NOT NULL AUTO_INCREMENT;
ALTER TABLE `course`
  MODIFY `id` int(3) NOT NULL AUTO_INCREMENT;
ALTER TABLE `course_enrolled`
  MODIFY `id` int(9) NOT NULL AUTO_INCREMENT;
ALTER TABLE `defect`
  MODIFY `id` int(7) NOT NULL AUTO_INCREMENT;
ALTER TABLE `evaluation`
  MODIFY `id` int(5) NOT NULL AUTO_INCREMENT;
ALTER TABLE `guardian`
  MODIFY `id` int(4) NOT NULL AUTO_INCREMENT;
ALTER TABLE `lesson`
  MODIFY `id` int(3) NOT NULL AUTO_INCREMENT;
ALTER TABLE `lesson_courses`
  MODIFY `id` int(3) NOT NULL AUTO_INCREMENT;
ALTER TABLE `license_apply_price`
  MODIFY `id` int(2) NOT NULL AUTO_INCREMENT;
ALTER TABLE `newsletter`
  MODIFY `id` int(4) NOT NULL AUTO_INCREMENT;
ALTER TABLE `payment`
  MODIFY `id` int(7) NOT NULL AUTO_INCREMENT;
ALTER TABLE `preregstudent`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT;
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
ALTER TABLE `web_branch`
  MODIFY `id` int(3) NOT NULL AUTO_INCREMENT;
ALTER TABLE `web_course`
  MODIFY `id` int(3) NOT NULL AUTO_INCREMENT;

ALTER TABLE `activity`
  ADD CONSTRAINT `activity_ibfk_1` FOREIGN KEY (`studID`) REFERENCES `student` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE,
  ADD CONSTRAINT `activity_ibfk_2` FOREIGN KEY (`instID`) REFERENCES `instructor` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE,
  ADD CONSTRAINT `activity_ibfk_3` FOREIGN KEY (`vehicleID`) REFERENCES `vehicle` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE,
  ADD CONSTRAINT `activity_ibfk_4` FOREIGN KEY (`lessonID`) REFERENCES `lesson` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE;

ALTER TABLE `admin`
  ADD CONSTRAINT `admin_ibfk_1` FOREIGN KEY (`userInfo`) REFERENCES `userinfo` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE,
  ADD CONSTRAINT `admin_ibfk_2` FOREIGN KEY (`branchID`) REFERENCES `branch` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE;

ALTER TABLE `codingscheme`
  ADD CONSTRAINT `scheme_fk1` FOREIGN KEY (`branch`) REFERENCES `branch` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE;

ALTER TABLE `course_enrolled`
  ADD CONSTRAINT `course_enrolled_ibfk_1` FOREIGN KEY (`studID`) REFERENCES `student` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE,
  ADD CONSTRAINT `course_enrolled_ibfk_2` FOREIGN KEY (`courseID`) REFERENCES `course` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE,
  ADD CONSTRAINT `course_enrolled_ibfk_3` FOREIGN KEY (`branch`) REFERENCES `branch` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE;

ALTER TABLE `defect`
  ADD CONSTRAINT `defect_ibfk_1` FOREIGN KEY (`vehicle`) REFERENCES `vehicle` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE;

ALTER TABLE `evaluation`
  ADD CONSTRAINT `evaluation_ibfk_1` FOREIGN KEY (`studID`) REFERENCES `student` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE,
  ADD CONSTRAINT `evaluation_ibfk_2` FOREIGN KEY (`instID`) REFERENCES `instructor` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE;

ALTER TABLE `guardian`
  ADD CONSTRAINT `guardian_ibfk_1` FOREIGN KEY (`refAcc`) REFERENCES `userinfo` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE;

ALTER TABLE `instructor`
  ADD CONSTRAINT `instructor_ibfk_1` FOREIGN KEY (`userInfo`) REFERENCES `userinfo` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE;

ALTER TABLE `lesson`
  ADD CONSTRAINT `lesson_ibfk_1` FOREIGN KEY (`prerequisite`) REFERENCES `lesson` (`id`);

ALTER TABLE `lesson_courses`
  ADD CONSTRAINT `lesson_courses_ibfk_1` FOREIGN KEY (`courseID`) REFERENCES `course` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE,
  ADD CONSTRAINT `lesson_courses_ibfk_2` FOREIGN KEY (`lessonID`) REFERENCES `lesson` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE;

ALTER TABLE `passedrequirement`
  ADD CONSTRAINT `passedRequirement_ibfk_1` FOREIGN KEY (`requirementID`) REFERENCES `requirement` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE,
  ADD CONSTRAINT `passedRequirement_ibfk_2` FOREIGN KEY (`studID`) REFERENCES `student` (`id`);

ALTER TABLE `payment`
  ADD CONSTRAINT `payment_ibfk_1` FOREIGN KEY (`transactionID`) REFERENCES `account` (`ORno`) ON DELETE NO ACTION ON UPDATE CASCADE;

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

ALTER TABLE `vehicle`
  ADD CONSTRAINT `vehicle_ibfk_1` FOREIGN KEY (`driver`) REFERENCES `instructor` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE,
  ADD CONSTRAINT `vehicle_ibfk_2` FOREIGN KEY (`garage`) REFERENCES `branch` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE;

ALTER TABLE `web_branch`
  ADD CONSTRAINT `web_branch_ibfk_1` FOREIGN KEY (`branchID`) REFERENCES `branch` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE;

ALTER TABLE `web_course`
  ADD CONSTRAINT `web_course_ibfk_1` FOREIGN KEY (`courseID`) REFERENCES `course` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE;
SET FOREIGN_KEY_CHECKS=1;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
