SET FOREIGN_KEY_CHECKS=0;
SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;


INSERT INTO `account` (`id`, `ORno`, `transaction`, `feeType`, `price`, `balance`, `date`) VALUES
(3, '18080560efee2b4', 'Enrolment, Apply-5', 1, 5000, 5000, '0000-00-00 00:00:00');

INSERT INTO `accounttype` (`id`, `title`, `permission`) VALUES
(1, 'admin', 'r,w-a'),
(2, 'instructor', 'rw+'),
(3, 'student', 'r+');

INSERT INTO `activity` (`id`, `data`, `startTime`, `duration`, `studID`, `instID`, `vehicleID`, `lessonID`) VALUES
(1, '2018-05-16 07:27:49', '10:00:00', 1, '04220', '12345', 123, 1),
(2, '2018-05-16 07:36:35', '16:00:00', 2, '34291', '56789', 567, 5),
(3, '2018-05-16 07:32:27', '12:30:00', 1, '04325', '23456', 234, 2),
(4, '2018-05-16 07:33:38', '15:30:00', 1, '06597', '34567', 345, 3),
(5, '2018-05-16 07:34:23', '14:30:00', 2, '89432', '45678', 456, 4);

INSERT INTO `admin` (`id`, `userInfo`, `branchID`) VALUES
(1, 1, 1);

INSERT INTO `branch` (`id`, `address`, `telno`, `name`, `purgeFlag`) VALUES
(1, 'Quezon City_31-D G. L. Jaena St. West Rembo_Makati City_2015_Metro Manila', '6/755', 'SEDQC', 1),
(2, 'Taguig City', '421-4315', 'SEDTC', 1),
(3, 'Pasay City', '751-5331', 'SEDPC', 1),
(4, 'Makati City', '752-2413', 'SEDMC', 1),
(5, 'Pasig City', '750-5239', 'SEDPC', 1),
(6, 'asvasdmk_vasvasd_vasdv_2345_c', '203980923/827364975', 'vd', 0);

INSERT INTO `course` (`id`, `description`, `carType`, `amount`, `days`, `status`) VALUES
(1, '', 'a', 3500, 5, 1),
(2, '', 'm', 1000, 5, 1),
(3, '', 'm', 1, 20, 0),
(4, '', 'a', 12312312, 1, 0);

INSERT INTO `defect` (`id`, `vehicle`, `part`, `description`, `importance`, `repaired`) VALUES
(1, 123, 'Gas', 'Gas is half empty', 1, 1),
(2, 234, 'Break', 'tighten the break', 1, 1),
(3, 345, 'Aicon', 'Aircon is not working', 1, 1),
(4, 456, 'Seatbelt', 'Seatbelt is damaged', 1, 1),
(5, 567, 'Oil', 'Excessive oil consumption', 1, 1),
(6, 568, 'Tires', 'deflated', 4, 1),
(7, 569, 'Starting System', 'battery', 5, 0),
(8, 123, 'Tires', 'Flattires', 5, 1),
(9, 574, 'Tires', 'bsad', 5, 0),
(10, 569, 'Ignition Electr', 'nostarter', 5, 1),
(11, 569, 'Lighting and Si', 'broken', 3, 0),
(12, 569, 'Wiring Harnesse', 'loose', 4, 1),
(13, 569, 'Tires', '', 0, 0),
(14, 569, 'Fuel Supply Sys', '', 0, 0),
(15, 569, 'Engine Oil Syst', 'greassy', 5, 1);

INSERT INTO `evaluation` (`id`, `studID`, `instID`, `evaluation`, `comment`, `date`, `target`) VALUES
(1, '04220', '12345', 'Passed', '', '2018-05-16 21:24:57', '1'),
(2, '04325', '23456', 'passed', '', '2018-05-16 21:25:19', '0'),
(3, '06597', '34567', 'failed', '', '2018-05-16 21:33:21', '1'),
(4, '34591', '56789', 'passed', '', '2018-05-16 21:33:52', '1'),
(5, '89432', '45678', 'passed', '', '2018-05-16 21:38:26', '1');

INSERT INTO `guardian` (`id`, `fullname`, `telno`, `refAcc`, `purgeFlag`) VALUES
(1, 'Valentino A. Gabat', '882-7273', 1, 0),
(2, 'Marilou A. Gabat', '889-3412', 2, 0),
(3, 'Sarah Jane R. Gabat', '859-4234', 3, 0),
(4, 'Ma. Elena Magno', '942-421', 4, 0),
(5, 'Alberto T. Reyes', '890-9866', 5, 0);

INSERT INTO `instructor` (`id`, `userInfo`, `license`, `licenseExp`, `educAttain`, `vacant`, `dateRegistered`, `dateRetired`, `status`) VALUES
('0', 0, 'sample1', '2018-07-30', 1, NULL, '2018-07-29 08:05:39', '2018-07-01', 1),
('INST-014008', 8, 'A1212111223', '2018-06-14', 5, 'Monday', '2018-05-20 17:05:05', NULL, 1),
('INST-016010', 10, 'P8437724876', '2023-06-22', 3, '', '2018-06-22 10:41:53', NULL, 1),
('INST-025015', 15, 'asd-14-3434', '2023-07-29', 1, '', '0000-00-00 00:00:00', '0000-00-00', 1);

INSERT INTO `lesson` (`id`, `title`, `prerequisite`, `description`, `duration`, `purgeFlag`) VALUES
(1, 'start and stop', NULL, '', 60, 1),
(2, 'Backing and tur', 1, '', 60, 1),
(3, 'Road crossing ', 2, '', 60, 1),
(4, 'Manuevering', 1, '', 60, 1),
(5, 'Hanging', 3, '', 60, 1),
(6, 'bam!', 3, 'hit all pedestrian and overspeed when tree is on your way', 60, 0),
(7, '12312', 4, 'vasada', 60, 0),
(8, 'asdas', 2, 'vasdasd', 60, 0),
(9, 'sampleLesson', 1, 'This to provide inputted data. \nEdited: added this line to test editing', 60, 0);

INSERT INTO `license_apply_price` (`id`, `type`, `desc`, `price`, `status`) VALUES
(1, 'NonPro', 'Non-Professional', 2500, 1),
(2, 'Pro', 'Professional', 2700, 1),
(3, 'Inter', 'International License', 5000, 1);

INSERT INTO `preregstudent` (`id`, `data`, `dateSubmit`, `status`) VALUES
(4, '{"info":{"fullname":"andy_galang_bagadiong","birthdate":"1998-12-31","birthplace":"bagong silang","address":"asdasdasdasd","telno":"12312312313","occupation":"student","email":"christianpaultupas@gmail.com","civilStatus":"Divorced","sex":"Male","guardian":{"name":"christian paul tupas","telno":"09185671538"}},"course":[2],"branch":"3","payment":1,"applyLicense":1,"special":{"course":[],"location":null},"transaction":{"transaction":"Enrolment, Apply-5","amount":5000,"ORnum":"18080560efee2b4","dataID":3},"preference":{"vehicle":"234","schedule":[0,1,2]}}', '2018-08-05 03:08:33', 1);

INSERT INTO `requirement` (`id`, `title`, `description`, `importance`) VALUES
(1, 'license', 'To apply drivers permit at LTO', 1);

INSERT INTO `schedule` (`id`, `date`, `time`, `hour`, `studID`, `instID`, `branch`, `status`) VALUES
(1, '2018-05-19', '10:30:00', 1, '04220', '12345', 4, 1),
(2, '2018-05-19', '15:00:00', 1, '04325', '23456', 1, 0),
(3, '2018-05-31', '12:00:00', 1, '06597', '34567', 5, 1),
(4, '2018-05-29', '14:30:00', 1, '34591', '56789', 2, 0),
(5, '2018-05-30', '16:00:00', 1, '89432', '45678', 5, 0);

INSERT INTO `student` (`id`, `userInfo`, `license`, `dateRegistered`, `status`) VALUES
('023013', 13, '', '2018-06-22 12:51:53', 1),
('04220', 1, '', '2017-05-16 16:00:00', 1),
('04325', 3, '', '2017-12-03 16:00:00', 1),
('06597', 4, '', '2018-02-17 16:00:00', 1),
('34591', 2, '', '2018-01-29 16:00:00', 1),
('89432', 5, '', '2017-08-21 16:00:00', 1);

INSERT INTO `useraccount` (`id`, `username`, `password`, `accType`, `status`) VALUES
(1, 'admin', 'd033e22ae348aeb5660fc2140aec35850c4da997', 1, 1),
(14, 'paul', 'e8383d7eb027388fa68def9a6ae6b4f28850f4df', 2, 1),
(15, 'blurspace@gmail.com', 'fea0579a46987b5f7899ac149af49adb8cd25fcd', 2, 1),
(16, 'edgartupas@gmail.com', '6420ed4d831b436d1e92d25605d18297296374e3', 2, 1),
(23, 'christianpaultupas@gmail.com', '6999a53119e9083d5db115c31b8586f08eda8701', 3, 1),
(24, 'christianpaultupas@gmail.com', '482ef093817ef4bc6aa18b85a25bb5e7b8702188', 2, 1),
(25, 'sdasdad@fasd.com', 'cbd94f5179e34673f52da338ff0bfe20a3c893cc', 2, 1);

INSERT INTO `userinfo` (`id`, `userAcc`, `fullname`, `address`, `telno`, `birthdate`, `birthplace`, `sex`, `civilStatus`, `email`, `userType`) VALUES
(1, 1, 'Janelle Joy R. Gabat', '31-D G.L. Jaena St. West Rembo, Makati City ', '882-7273', '1998-12-18', 'Makati City', 'F', 'Single', 'janellejoygabat@gmail.com', 1),
(2, 3, 'Janelen Faith R. Gabat', 'Quezon City', '751-1326', '1997-08-07', 'Makati City', 'F', 'Single', 'jfgabat@yahoo.com', 1),
(3, 2, 'Jann Hope R. Gabat', 'Pasig City', '882-2629', '2004-04-30', 'Makati City', 'F', 'Single', 'jannhopegabat@gmail.com', 2),
(4, 4, 'Jakielyn Jann G. Magno', 'Taguig City ', '632-5322', '2000-02-01', 'Pasay City', 'F', 'Single', 'jakielynjannmagno@gmail.com', 2),
(5, 5, 'Sarah Jane R. Gabat', 'Mandaluyong City', '845-4314', '1967-12-02', 'Pembo, Makati City ', 'F', 'Married', 'sjgabat@gmail.com', 1),
(8, 14, 'Christian Paul_Rojero_Tupas', 'hahahahaha', '09094527651', '1998-12-08', 'n/a', 'M', 'n/a', 'christianpaultupas@gmail.com', 2),
(9, 15, 'Jean Hale_Bautista_Cruz', '#18 rambutan st. brgy. capri quezon city', '09185671538', '1998-11-22', 'n/a', 'M', 'n/a', 'blurspace@gmail.com', 2),
(10, 16, 'Edgar_Pugon_Tupas', '#18 guyabano st. brgy. capri novaliches  quezon city', '09238628347', '1966-05-26', 'n/a', 'M', 'n/a', 'edgartupas@gmail.com', 2),
(13, 23, 'Christian Paul_Rojero_Tupas', '#18 guyabano st. amparo capri novaliches ', '09094527651', '1998-12-08', 'Quezon City', 'Mal', 'Single', 'christianpaultupas@gmail.com', 3),
(14, 24, 'asd_dsa_daa', 'asdasdasdasdasda', '1239239283', '2018-06-18', 'n/a', 'M', 'n/a', 'christianpaultupas@gmail.com', 2),
(15, 25, 'dsa_asdd_dsaa', 'dasdasdadadasd', '134234344', '2018-07-27', 'n/a', 'F', 'n/a', 'sdasdad@fasd.com', 2);

INSERT INTO `vehicle` (`id`, `model`, `brand`, `transmission`, `price`, `plate`, `driver`, `garage`, `offday`, `status`) VALUES
(123, 'vios', 'toyota', 'A', 'default', 'AAP3780', NULL, 1, 5, 1),
(234, 'wigo', 'toyota', 'M', 'default', 'ASD123', '23456', 1, 3, 1),
(345, 'accent', 'hyundai', 'M', 'default', 'TRY345', '34567', 1, 0, 1),
(456, 'Vios', 'Toyota', 'M', 'default', 'VDS634', '45678', 1, 7, 1),
(567, 'Accent', 'Hyundai', 'M', 'default', 'FAS', '56789', 1, 4, 2),
(568, 'paul', 'wagon', 'M', 'default', 'SEX699', NULL, 1, 5, 1),
(569, 'LX34', 'Ford', 'M', 'default', 'LAS295', NULL, 1, 3, 1),
(570, 'Kali', 'Mitsubishi', 'A', 'default', 'LTX-326', NULL, 1, 3, 0);

INSERT INTO `web_branch` (`id`, `branchID`, `branchName`, `location`, `fulladdress`, `telno`) VALUES
(1, 3, 'Pasay', 'Pasay', 'Cartimar Shopping Center Rm. 1-A', '833-20-43');

INSERT INTO `web_course` (`id`, `courseID`, `transmission`, `days`, `hour`, `price`) VALUES
(1, 2, 'm', 5, 60, 2500),
(2, 1, 'a', 5, 60, 3500);
SET FOREIGN_KEY_CHECKS=1;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
