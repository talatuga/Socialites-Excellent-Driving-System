SET FOREIGN_KEY_CHECKS=0;
SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;


DELIMITER $$
CREATE DEFINER=`root`@`localhost` PROCEDURE `getInst` (IN `_id` VARCHAR(15))  READS SQL DATA
SELECT i.id as instID, i.vacant, u.* FROM instructor i, userinfo u WHERE i.id = _id AND i.userInfo = u.id$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `getInstList` (IN `_offset` INT(7), IN `_limit` INT(5))  READS SQL DATA
SELECT i.id as instID, i.license, i.dateRegistered, i.dateRetired, i.educAttain,i.vacant,i.status, a.username, u.*  FROM instructor i, userinfo u, useraccount a WHERE u.id = i.userInfo AND u.userAcc = a.id AND i.status > 0 ORDER BY i.id ASC limit _offset, _limit$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `getPastStud` (IN `_offset` INT(5), IN `_limit` INT(2))  READS SQL DATA
SELECT s.id as studID, i.* FROM student s, userinfo i WHERE s.id > _offset AND i.id = s.userInfo AND s.status = 0 ORDER BY s.id ASC limit _limit$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `getStud` (IN `_id` VARCHAR(15))  READS SQL DATA
SELECT s.id as studID, s.dateRegistered, u.* FROM student s, userinfo u WHERE s.id = _id AND s.userInfo = u.id$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `getStudList` (IN `_offset` INT(7), IN `_limit` INT(5))  NO SQL
SELECT s.id as studID, i.* FROM student s, userinfo i WHERE s.id > _offset AND i.id = s.userInfo AND s.status > 0 ORDER BY s.id ASC limit _limit$$

CREATE DEFINER=`root`@`localhost` FUNCTION `addUserAcc` (`un` VARCHAR(30), `pw` VARCHAR(40), `atype` INT(2)) RETURNS INT(10) UNSIGNED MODIFIES SQL DATA
BEGIN
INSERT useraccount(username, password, accType) VALUES (un,SHA1(pw),atype);
RETURN LAST_INSERT_ID();
END$$

CREATE DEFINER=`root`@`localhost` FUNCTION `addUserInfo` (`ua` INT(10), `name` VARCHAR(50), `address` VARCHAR(100), `phone` VARCHAR(12), `bdate` DATE, `bplace` VARCHAR(50), `gender` VARCHAR(3), `civil` VARCHAR(10), `mail` VARCHAR(30), `utype` INT(1)) RETURNS INT(10) UNSIGNED MODIFIES SQL DATA
BEGIN
INSERT INTO `userinfo` (`userAcc`, `fullname`, `address`, `telno`, `birthdate`, `birthplace`, `sex`, `civilStatus`, `email`, `userType`) VALUES (ua, name, address, phone, bdate, bplace, gender, civil, mail, utype);
return LAST_INSERT_ID();
END$$

DELIMITER ;

CREATE TABLE `account` (
  `id` int(15) NOT NULL,
  `ORno` varchar(10) NOT NULL,
  `transaction` varchar(20) NOT NULL,
  `feeType` int(1) NOT NULL,
  `price` int(10) NOT NULL,
  `amount` int(10) NOT NULL,
  `balance` int(10) NOT NULL,
  `date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
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

CREATE TABLE `admin` (
  `id` int(7) NOT NULL,
  `userInfo` int(7) NOT NULL,
  `branchID` int(3) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

CREATE TABLE `branch` (
  `id` int(3) NOT NULL,
  `address` varchar(150) NOT NULL,
  `telno` varchar(24) NOT NULL,
  `name` varchar(15) NOT NULL,
  `purgeFlag` int(1) NOT NULL DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

CREATE TABLE `course` (
  `id` int(3) NOT NULL,
  `carType` varchar(10) NOT NULL,
  `amount` int(5) NOT NULL,
  `days` int(3) NOT NULL,
  `status` int(1) NOT NULL DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

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

CREATE TABLE `defect` (
  `id` int(7) NOT NULL,
  `vehicle` int(3) NOT NULL,
  `part` varchar(15) NOT NULL,
  `description` varchar(150) NOT NULL,
  `importance` int(1) NOT NULL,
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
  `license` varchar(11) NOT NULL,
  `licenseExp` date NOT NULL,
  `userInfo` int(7) NOT NULL,
  `educAttain` int(1) NOT NULL,
  `vacant` varchar(7) DEFAULT NULL,
  `dateRegistered` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `dateRetired` date DEFAULT NULL,
  `status` int(1) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

CREATE TABLE `lesson` (
  `id` int(3) NOT NULL,
  `title` varchar(15) NOT NULL,
  `prerequisite` int(3) DEFAULT NULL,
  `description` varchar(150) NOT NULL,
  `purgeFlag` int(1) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

CREATE TABLE `lesson_courses` (
  `id` int(3) NOT NULL,
  `lessonID` int(3) NOT NULL,
  `courseID` int(3) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

CREATE TABLE `passedrequirement` (
  `id` int(10) NOT NULL,
  `studID` varchar(15) NOT NULL,
  `requirementID` int(3) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

CREATE TABLE `preregstudent` (
  `id` int(10) NOT NULL,
  `data` varchar(400) NOT NULL,
  `dateSubmit` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `status` int(1) NOT NULL DEFAULT '1'
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
  `license` varchar(50) NOT NULL,
  `dateRegistered` date NOT NULL,
  `status` int(1) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

CREATE TABLE `useraccount` (
  `id` int(10) NOT NULL,
  `username` varchar(30) NOT NULL,
  `password` varchar(40) NOT NULL,
  `accType` int(2) NOT NULL,
  `status` int(1) NOT NULL DEFAULT '1'
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
  `transmission` varchar(1) NOT NULL,
  `plate` varchar(10) NOT NULL,
  `driver` varchar(15) DEFAULT NULL,
  `offday` int(1) NOT NULL,
  `status` int(1) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

CREATE TABLE `web_branch` (
  `id` int(3) NOT NULL,
  `branchID` int(3) NOT NULL,
  `branchName` varchar(10) NOT NULL,
  `location` varchar(30) NOT NULL,
  `fulladdress` varchar(100) NOT NULL,
  `telno` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

CREATE TABLE `web_course` (
  `id` int(3) NOT NULL,
  `courseID` int(3) NOT NULL,
  `transmission` varchar(1) NOT NULL,
  `days` int(2) NOT NULL,
  `hour` int(3) NOT NULL,
  `price` int(7) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;


ALTER TABLE `account`
  ADD PRIMARY KEY (`id`);

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

ALTER TABLE `passedrequirement`
  ADD PRIMARY KEY (`id`),
  ADD KEY `requirementID` (`requirementID`),
  ADD KEY `studID` (`studID`);

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
  ADD KEY `driver` (`driver`);

ALTER TABLE `web_branch`
  ADD PRIMARY KEY (`id`),
  ADD KEY `branchID` (`branchID`);

ALTER TABLE `web_course`
  ADD PRIMARY KEY (`id`),
  ADD KEY `courseID` (`courseID`);


ALTER TABLE `account`
  MODIFY `id` int(15) NOT NULL AUTO_INCREMENT;

ALTER TABLE `accounttype`
  MODIFY `id` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

ALTER TABLE `activity`
  MODIFY `id` int(15) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

ALTER TABLE `admin`
  MODIFY `id` int(7) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

ALTER TABLE `branch`
  MODIFY `id` int(3) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

ALTER TABLE `course`
  MODIFY `id` int(3) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

ALTER TABLE `course_enrolled`
  MODIFY `id` int(9) NOT NULL AUTO_INCREMENT;

ALTER TABLE `defect`
  MODIFY `id` int(7) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

ALTER TABLE `evaluation`
  MODIFY `id` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

ALTER TABLE `guardian`
  MODIFY `id` int(4) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

ALTER TABLE `lesson`
  MODIFY `id` int(3) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

ALTER TABLE `lesson_courses`
  MODIFY `id` int(3) NOT NULL AUTO_INCREMENT;

ALTER TABLE `preregstudent`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

ALTER TABLE `requirement`
  MODIFY `id` int(3) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

ALTER TABLE `schedule`
  MODIFY `id` int(15) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

ALTER TABLE `useraccount`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

ALTER TABLE `userinfo`
  MODIFY `id` int(7) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

ALTER TABLE `vehicle`
  MODIFY `id` int(3) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=570;

ALTER TABLE `web_branch`
  MODIFY `id` int(3) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

ALTER TABLE `web_course`
  MODIFY `id` int(3) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;


ALTER TABLE `activity`
  ADD CONSTRAINT `activity_ibfk_1` FOREIGN KEY (`studID`) REFERENCES `student` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE,
  ADD CONSTRAINT `activity_ibfk_2` FOREIGN KEY (`instID`) REFERENCES `instructor` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE,
  ADD CONSTRAINT `activity_ibfk_3` FOREIGN KEY (`vehicleID`) REFERENCES `vehicle` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE,
  ADD CONSTRAINT `activity_ibfk_4` FOREIGN KEY (`lessonID`) REFERENCES `lesson` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE;

ALTER TABLE `admin`
  ADD CONSTRAINT `admin_ibfk_1` FOREIGN KEY (`userInfo`) REFERENCES `userinfo` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE,
  ADD CONSTRAINT `admin_ibfk_2` FOREIGN KEY (`branchID`) REFERENCES `branch` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE;

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
  ADD CONSTRAINT `vehicle_ibfk_1` FOREIGN KEY (`driver`) REFERENCES `instructor` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE;

ALTER TABLE `web_branch`
  ADD CONSTRAINT `web_branch_ibfk_1` FOREIGN KEY (`branchID`) REFERENCES `branch` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE;

ALTER TABLE `web_course`
  ADD CONSTRAINT `web_course_ibfk_1` FOREIGN KEY (`courseID`) REFERENCES `course` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE;
SET FOREIGN_KEY_CHECKS=1;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;