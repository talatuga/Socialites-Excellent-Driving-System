DELIMITER $$
--
-- Procedures
--
CREATE DEFINER=`root`@`localhost` PROCEDURE `addAccount` (IN `StudentID` INT(7), IN `isAircon` INT(1), IN `feeType` INT(1), IN `amount` INT(8), IN `balance` INT(8))  MODIFIES SQL DATA
INSERT INTO `account` (`studentID`, `isAircon`,`feeType`,`amount`,`balance`) VALUES ('_studentID','_isAircon', '_feeType', '_amount', '_balance')$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `addActivity` (IN `startTime` TIME, IN `duration` INT(3), IN `studentID` INT(7), IN `instructorID` INT(4), IN `vehicleID` INT(3), IN `lessonID` INT(3))  MODIFIES SQL DATA
INSERT INTO `activity` (`startTime`, `duration`, `studentID`, `instructorID`, `vehicleID`, `lessonID`) VALUES (’_startTime’, ‘_duration’, ‘_studentID’, ‘_instructorID’, ‘_vehicleID’, ‘_lessonID’)$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `addBranch` (IN `address` VARCHAR(150), IN `telno` VARCHAR(15))  MODIFIES SQL DATA
INSERT INTO `branch` (`address`, `telno`) VALUES (‘_address’, ‘_telno’)$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `addGuardian` (IN `fullname` VARCHAR(50), IN `telno` VARCHAR(12))  MODIFIES SQL DATA
INSERT INTO `guardian` (`fullname`, `telno`) VALUES (‘_fullname’, ‘_telno’)$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `addInstructor` (IN `fullname` VARCHAR(50), IN `address` VARCHAR(100), IN `telno` VARCHAR(12), IN `birthdate` DATE, IN `sex` VARCHAR(3))  MODIFIES SQL DATA
INSERT INTO `instructor` (`fullname`, `address`, `telno`, `birthdate`, `sex`) VALUES (‘_fullname’, ‘_address’, ‘_telno’, ‘_birthdate’, ‘_sex’)$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `addInstructorEvaluation` (IN `studentID` INT(7), IN `instructorID` INT(4), IN `evaluation` VARCHAR(10), IN `comment` VARCHAR(300))  MODIFIES SQL DATA
INSERT INTO `instructorevaluation` (`studentID`, `instructorID`, `evaluation`, `comment`) VALUES (‘_studentID’, ‘_instructorID’, ‘_evaluation’, ‘_comment’)$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `addLessonList` (IN `title` VARCHAR(15), IN `description` VARCHAR(300), IN `prerequisite` VARCHAR(3))  MODIFIES SQL DATA
INSERT INTO `lessonlist` (`title`, `description`, `prerequisite`) VALUES (‘_title’, ‘_description’, ‘_prerequisite’)$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `addRegistrar` (IN `studentID` INT(7), IN `studentInfo` INT(5), IN `requirement` INT(3), IN `status` INT(1))  MODIFIES SQL DATA
INSERT INTO `registrar` (`studentID`, `studentInfo`, `requirement`, `status`) VALUES (‘_studentID’, ‘_studentInfo’, ‘_requirement’, ‘_status’)$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `addRequirement` (IN `title` VARCHAR(15), IN `description` VARCHAR(300), IN `important` INT(1))  MODIFIES SQL DATA
INSERT INTO `requirement` (`title`, `description`, `important`) VALUES (‘_title’, ‘_description’, ‘_important’)$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `addSchedule` (IN `date` DATE, IN `time` TIME, IN `hour` INT(3), IN `studentID` INT(7), IN `instructorID` INT(4), IN `branchID` INT(3))  MODIFIES SQL DATA
INSERT INTO `schedule` (`date`, `time`, `hour`, `studentID`, `instructorID`, `branchID`) VALUES (‘_date’, ’_time’, ‘_hour’, ‘_studentID’, ‘_instructorID’, ‘_branchID’)$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `addStudentEvaluation` (IN `studentID` INT(7), IN `instructorID` INT(4), IN `evaluation` VARCHAR(10))  MODIFIES SQL DATA
INSERT INTO `studentevaluation` (`studentID`, `instructorID`, `evaluation`) VALUES (‘_studentID’, ‘_instructorID’, ‘_evaluation’)$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `addStudentInformation` (IN `guardianID` INT(4), IN `fullname` VARCHAR(50), IN `birthdate` DATE, IN `birthplace` VARCHAR(100), IN `civilStatus` VARCHAR(10), IN `sex` VARCHAR(3), IN `occupation` VARCHAR(30), IN `telno` VARCHAR(12))  MODIFIES SQL DATA
INSERT INTO `studentinformation` (`guardianID`, `fullname`, `birthdate`, `birthplace`, `civilStatus`, `sex`, `occupation`, `telno`) VALUES (‘_guardianID’, ‘_fullname’, ‘_birthdate’, ‘_birthplace’, ‘_civilStatus’, ‘_sex’, ‘_occupation’, ‘_telno’)$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `addVehicle` (IN `model` VARCHAR(15), IN `brand` VARCHAR(15), IN `fuel` INT(3), IN `defect` VARCHAR(30), IN `status` INT(1))  MODIFIES SQL DATA
INSERT INTO `vehicle` (`model`, `brand`, `fuel`, `defect`, `status`) VALUES (‘model’, ‘brand’, ‘fuel’, ‘defect’, ‘status’)$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `editAccount` (IN `id` INT(5), IN `studentID` INT(7), IN `isAircon` INT(1), IN `feeType` INT(1), IN `amount` INT(8), IN `balance` INT(8))  MODIFIES SQL DATA
UPDATE `account` SET `studentID`= ‘_studentID’, `isAircon`= ’_isAircon’, `feeType`= ’_feeType’, `amount`= ‘_amount’, `balance`= ‘_balance’ WHERE `id` = ‘_id’$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `editActivity` (IN `id` INT(4), IN `startTime` TIME, IN `duration` INT(3), IN `studentID` INT(7), IN `instructorID` INT(4), IN `vehicleID` INT(3), IN `lessonID` INT(3))  MODIFIES SQL DATA
UPDATE `activity` SET `startTime`=’_startTime’, `duration`=’_duration’, `studentID`=’_studentID’, `instructorID`=’_instructorID’, `vehicleID`=’_vehicleID’, `lessonID`=’_lessonID’ WHERE `id`=’_id’$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `editBranch` (IN `id` INT(3), IN `address` VARCHAR(150), IN `telno` VARCHAR(15))  MODIFIES SQL DATA
UPDATE `branch` SET `address`=’_address’, `telno`=’_telno’ WHERE `id`=’_id’$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `editGuardian` (IN `id` INT(4), IN `fullname` VARCHAR(50), IN `telno` VARCHAR(12))  MODIFIES SQL DATA
UPDATE `guardian` SET `fullname`=’_fullname’, `telno`=’_telno’ WHERE `id` = ‘_id’$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `editInstructor` (IN `id` INT(4), IN `fullname` VARCHAR(50), IN `address` VARCHAR(100), IN `telno` VARCHAR(12), IN `birthdate` DATE, IN `sex` VARCHAR(3))  MODIFIES SQL DATA
UPDATE `instructor` SET `fullname`= ‘_fullname’, `address`=‘_address’, `telno`=‘_telno’, `birthdate`=‘_birthdate’, `sex`=’_sex’ WHERE `id`= ‘_id’$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `editInstructorEvaluation` (IN `id` INT(4), IN `studentID` INT(7), IN `instructorID` INT(4), IN `evaluation` VARCHAR(10), IN `comment` VARCHAR(300))  MODIFIES SQL DATA
UPDATE `instructorevaluation` SET `studentID`=’_studentID’, `instructorID`=’_instructorID’, `evaluation`=’_evaluation’, `comment`=’_comment’ WHERE `id`=’_id’$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `editLessonList` (IN `id` INT(3), IN `title` VARCHAR(15), IN `description` VARCHAR(300), IN `prerequisite` VARCHAR(3))  MODIFIES SQL DATA
UPDATE `lessonlist` SET `title`=’_title’, `description`=’_description’, `prerequisite`=’_prerequisite WHERE `id`= ’_id’$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `editRegistrar` (IN `studentID` INT(7), IN `studentInfo` INT(5), IN `requirement` INT(3), IN `status` INT(1))  MODIFIES SQL DATA
UPDATE `registrar` SET `studentInfo`=’_studentInfo’, `requirement`=’_requirement’, `status`=’_status’ WHERE `studentID`=’_studentID’$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `editRequirement` (IN `id` INT(3), IN `title` VARCHAR(15), IN `description` VARCHAR(300), IN `important` INT(1))  MODIFIES SQL DATA
UPDATE `requirement` SET `title`=’_title’, `description`=’_description’, `important`=’_important’ WHERE `id`= ‘_id’$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `editSchedule` (IN `id` INT(5), IN `date` DATE, IN `time` TIME, IN `hour` INT(3), IN `studentID` INT(7), IN `instructorID` INT(4), IN `branchID` INT(3))  MODIFIES SQL DATA
UPDATE `schedule` SET `date`=’_date’, `time`=’_time’, `hour`=’_hour’, `studentID`=’_studentID’, `instructorID`=’_instructorID’, `branchID`=’_branchID’ WHERE `id`= ‘_id’$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `editStudentEvaluation` (IN `id` INT(4), IN `studentID` INT(7), IN `instructorID` INT(4), IN `evaluation` VARCHAR(10))  MODIFIES SQL DATA
UPDATE `studentevaluation` SET `studentID`=’_studentID’, `instructorID`=’_instructorID’, `evaluation`=’_evaluation’ WHERE `id`= ‘_id’$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `editStudentInformation` (IN `id` INT(5), IN `guardianID` INT(4), IN `fullname` VARCHAR(50), IN `birthdate` DATE, IN `birthplace` VARCHAR(100), IN `civilStatus` VARCHAR(10), IN `sex` VARCHAR(3), IN `occupation` VARCHAR(30), IN `telno` VARCHAR(12))  MODIFIES SQL DATA
UPDATE `studentinformation` SET `guardianID`=’_guardianID’, `fullname`=’_fullname’, `birthdate`=’_birthdate’, `birthplace`=’_birthplace’, `civilStatus`=’civilStatus’, `sex`=’_sex’, `occupation`=’_occupation’, `telno`=’telno’ WHERE `id` = ‘_id’$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `editVehicle` (IN `id` INT(3), IN `model` VARCHAR(15), IN `brand` VARCHAR(15), IN `fuel` INT(3), IN `defect` VARCHAR(30), IN `status` INT(1))  MODIFIES SQL DATA
UPDATE `vehicle` SET `model`=’_model’, `brand`=’_brand’, `fuel`=’_fuel’, `defect`=’_defect’, `status`=’_status’ WHERE `id`= ‘_id’$$

DELIMITER ;
