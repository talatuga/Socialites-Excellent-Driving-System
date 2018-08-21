SET FOREIGN_KEY_CHECKS=0;
SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;


INSERT INTO `account` (`id`, `ORno`, `transaction`, `data`, `feeType`, `price`, `balance`, `date`) VALUES
(25, '180815bc04c2cdd', 'Enrollment, Apply-1', '{"enrolled":[{"course":5,"special":false}],"apply":1}', 1, 3500, 2500, '2018-08-15 15:13:10'),
(26, '180816ba26171ac', 'Enrollment, Apply-1', '{"enrolled":[{"course":2,"special":false}],"apply":1}', 1, 3500, 0, '2018-08-15 21:17:38'),
(27, '180816700917921', 'Enrollment, Apply-1', '{"enrolled":[{"course":2,"special":false}],"apply":1}', 1, 3500, 0, '2018-08-15 21:27:41'),
(28, '18081618888a309', 'Enrollment', '{"enrolled":[{"course":1,"special":false}],"apply":0}', 1, 3500, 0, '2018-08-16 05:01:54'),
(29, '18081739734805d', 'Enrollment, Apply-1', '{"enrolled":[{"course":2,"special":false}],"apply":1}', 1, 3500, 0, '2018-08-16 17:50:23'),
(30, '180817352109654', 'Enrollment, Apply-1', '{"enrolled":[{"course":2,"special":false}],"apply":1}', 1, 1500, 0, '2018-08-17 00:29:06'),
(31, '180817970dd9e86', 'Enrollment', '{"enrolled":[{"course":5,"special":false}],"apply":0}', 1, 1000, 0, '2018-08-17 00:42:25'),
(32, '1808177d272a316', 'Enrollment, Apply-2', '{"enrolled":[{"course":2,"special":false}],"apply":2}', 1, 3500, 3500, '2018-08-17 00:47:48'),
(33, '18081708c8e9f0c', 'Enrollment, Apply-1', '{"enrolled":[{"course":2,"special":false}],"apply":1}', 1, 1500, 800, '2018-08-17 00:54:55');

INSERT INTO `accounttype` (`id`, `title`, `permission`) VALUES
(1, 'admin', 'r,w-a'),
(2, 'instructor', 'rw+'),
(3, 'student', 'r+');

INSERT INTO `activity` (`id`, `data`, `startTime`, `duration`, `studID`, `instID`, `vehicleID`, `lessonID`) VALUES
(1, '2018-05-16 07:27:49', '10:00:00', 1, '04220', '12345', 123, 1),
(2, '2018-05-16 07:36:35', '16:00:00', 2, '34291', '56789', 567, 5),
(3, '2018-05-16 07:32:27', '12:30:00', 1, '04325', '23456', 234, 2),
(4, '2018-05-16 07:33:38', '15:30:00', 1, '06597', '34567', 345, 3),
(5, '2018-05-16 07:34:23', '14:30:00', 2, '89432', '45678', 456, 4),
(6, '2018-08-15 23:30:23', '15:00:00', 1, '046022', 'INST-21211', 570, 1),
(7, '2018-08-15 23:31:10', '15:00:00', 1, '046022', 'INST-21211', 570, 2);

INSERT INTO `admin` (`id`, `userInfo`, `branchID`) VALUES
(1, 1, 1);

INSERT INTO `branch` (`id`, `address`, `telno`, `name`, `purgeFlag`) VALUES
(1, 'Quezon City', '6/755', 'SEDQC', 0),
(2, 'Taguig City', '421-4315', 'SEDTC', 1),
(3, 'Pasay City', '751-5331', 'SEDPC', 1),
(4, 'Makati City', '752-2413', 'SEDMC', 1),
(5, 'Pasig City', '750-5239', 'SEDPC', 1),
(6, 'asvasdmk_vasvasd_vasdv_2345_c', '203980923/827364975', 'vd', 0);

INSERT INTO `course` (`id`, `description`, `carType`, `amount`, `days`, `status`) VALUES
(1, '', 'a', 3500, 5, 1),
(2, '', 'm', 1000, 5, 1),
(3, '', 'm', 1, 20, 0),
(4, '', 'a', 12312312, 1, 0),
(5, '', 'm', 1000, 15, 1),
(6, '', 'a', 4501, 12, 1);

INSERT INTO `course_enrolled` (`id`, `enrollmentID`, `courseID`, `branch`, `selectedLesson`, `special`, `dateEnrolled`, `paid`, `status`) VALUES
(13, 8, 5, 3, '[]', 0, '2018-08-15 23:16:38', 0, 1),
(14, 9, 2, 3, '[]', 0, '2018-08-16 05:18:21', 0, 1),
(15, 10, 2, 3, '[]', 0, '2018-08-16 05:28:09', 0, 1),
(16, 11, 1, 3, '[]', 0, '2018-08-16 13:02:29', 0, 1),
(17, 12, 2, 3, '[]', 0, '2018-08-17 01:51:53', 0, 1),
(18, 13, 2, 3, '[]', 0, '2018-08-17 08:44:40', 1, 1),
(19, 14, 2, 3, '[]', 0, '2018-08-17 08:56:48', 2, 1);

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

INSERT INTO `enrollment` (`id`, `studID`, `accountID`, `date_enrolled`, `status`) VALUES
(8, '044020', '180815bc04c2cdd', '2018-08-15 15:16:38', 1),
(9, '045021', '180816ba26171ac', '2018-08-15 21:18:21', 1),
(10, '046022', '180816700917921', '2018-08-15 21:28:09', 1),
(11, '048025', '18081618888a309', '2018-08-16 05:02:29', 1),
(12, '052028', '18081739734805d', '2018-08-16 17:51:53', 1),
(13, '054029', '180817352109654', '2018-08-17 00:44:40', 1),
(14, '055030', '18081708c8e9f0c', '2018-08-17 00:56:48', 1);

INSERT INTO `evaluation` (`id`, `studID`, `instID`, `comment`, `target`, `courseID`, `grade`, `dateEvaluated`) VALUES
(10, '046022', 'INST-051027', 'good', 1, 2, 4, '2018-08-06'),
(11, '045021', 'INST-051027', 'poor', 1, 2, 3, '2018-08-04'),
(16, '048025', 'INST-051027', 'galing mo po sir! hope to see you around sm fairview po', 0, 1, 5, '2018-08-21'),
(17, '045021', 'INST-051027', 'thank you sir! mas nainitindihan ko po dito kesa sa smart tsaka a1. hehehehe', 0, 2, 5, '2018-08-19'),
(18, '046022', 'INST-051027', 'sir ang sungit nyo po, di ko alam kung type nyo ba ko o ano eh hays', 0, 2, 3, '2018-08-14');

INSERT INTO `grades` (`id`, `instID`, `studID`, `lessonID`, `grade`, `comment`, `courseID`, `schedID`) VALUES
(20, 'INST-21211', '046022', 1, 5, 'excellent', 2, 1),
(21, 'INST-21211', '045021', 2, 4, 'very good', 3, 2),
(22, 'INST-21211', '044020', 5, 3, 'good', 1, 4),
(23, 'INST-21211', '048025', 1, 5, 'wow', 1, 1),
(24, 'INST-21211', '048025', 2, 5, 'amazing', 1, 6),
(25, 'INST-21211', '048025', 3, 5, 'excellent', 1, 7),
(26, 'INST-21211', '048025', 4, 4, 'okay', 1, 7);

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
('INST-025015', 15, 'asd-14-3434', '2023-07-29', 1, '', '0000-00-00 00:00:00', '0000-00-00', 1),
('INST-047024', 24, 'A01-11-1111', '2023-08-16', 6, '', '0000-00-00 00:00:00', '0000-00-00', 1),
('INST-051027', 27, 'A01-11-1113', '2023-08-16', 5, '', '0000-00-00 00:00:00', '0000-00-00', 1),
('INST-056031', 31, 'A01-11-1121', '2023-08-19', 4, '', '0000-00-00 00:00:00', '0000-00-00', 1),
('INST-21211', 23, 'dsdd23', '2018-08-25', 1, 'Monday', '2018-08-15 23:27:10', NULL, 1);

INSERT INTO `lesson` (`id`, `title`, `prerequisite`, `description`, `duration`, `purgeFlag`) VALUES
(1, 'Start and Stop', NULL, 'Master the starting and stopping of your car’s engine before you hit the road.', 60, 1),
(2, 'Backing and Turning, Light Traffic', 1, 'Driving a vehicle in reverse direction in order to maneuver.', 60, 1),
(3, 'Road Crossing ', 2, ' Giving way to pedestrians on crossing with and without lights, crossing at intersection.', 60, 1),
(4, 'Manuevering', 1, 'A controlled change in movement or direction of a moving vehicle', 60, 1),
(5, 'Hanging', 3, 'you’ll be able to prevent your car from rolling while you’re on a hill or any elevated surface.', 60, 1),
(6, 'Garage Driving', 3, 'things you can do to avoid getting in an accident in a parking garage or busy parking lot.', 60, 0),
(7, 'Parking', 4, 'the act of stopping and disengaging a vehicle and leaving it unoccupied', 60, 0),
(8, 'Highway Driving', 2, 'Driving on a busy road with many lanes', 60, 0),
(9, 'Heavy Traffic', 1, 'feel safe when driving on a traffic jam, and this might mean you need to drive a little slower than the flow of traffic.', 60, 0),
(10, 'Review', 9, 'Reviewing all the lessons tackled', 60, 0);

INSERT INTO `license_apply_price` (`id`, `type`, `desc`, `price`, `status`) VALUES
(0, 'none', 'none', 0, 0),
(1, 'STDP', 'Student Drivers Permit', 500, 1),
(2, 'NonPro', 'Non-Professional', 2500, 1),
(3, 'Pro', 'Professional', 2700, 1),
(4, 'Inter', 'International License', 5000, 1);

INSERT INTO `other_info` (`id`, `referenceID`, `data`, `status`) VALUES
(8, 20, '["Student",{"name":"Jemma C. Tatel","telno":"09758664532"}]', 1),
(9, 21, '["Student",{"name":"Jemma C. Tatel","telno":"09762228121"}]', 1),
(10, 22, '["323",{"name":"32312","telno":"3213123"}]', 1),
(11, 25, '["Student",{"name":"Wilma Laganzo","telno":"09062078123"}]', 1),
(12, 28, '["Student",{"name":"Jemma C. Tatel","telno":"09758664532"}]', 1),
(13, 29, '["Student",{"name":"Jemma C. Tatel","telno":"09758664532"}]', 1),
(14, 30, '["Student",{"name":"Jemma C. Tatel","telno":"09768883945"}]', 1);

INSERT INTO `payment` (`id`, `transactionID`, `bill`, `pay`, `balance`, `datePay`) VALUES
(23, '180815bc04c2cdd', 3500, 1000, 2500, '2018-08-15 15:16:37'),
(24, '180816ba26171ac', 3500, 3500, 0, '2018-08-15 21:18:21'),
(25, '180816700917921', 3500, 3500, 0, '2018-08-15 21:28:09'),
(26, '18081618888a309', 3500, 3500, 0, '2018-08-16 05:02:29'),
(27, '18081739734805d', 3500, 3500, 0, '2018-08-16 17:51:53'),
(28, '180817970dd9e86', 1000, 1000, 0, '2018-08-17 00:44:17'),
(29, '180817352109654', 1500, 2000, 0, '2018-08-17 00:44:39'),
(30, '18081708c8e9f0c', 1500, 700, 800, '2018-08-17 00:56:48');

INSERT INTO `preregstudent` (`id`, `data`, `dateSubmit`, `status`) VALUES
(26, '{"info":{"fullname":"Graciella _Custodio_Tatel","birthdate":"1999-05-17","birthplace":"CSJDM, Bulacan","address":"CSJDM, Bulacan","telno":"09565867353","occupation":"Student","email":"gtatel0517@gmail.com","civilStatus":"Single","sex":"Female","guardian":{"name":"Jemma C. Tatel","telno":"09758664532"}},"course":[5],"branch":"3","payment":1,"applyLicense":1,"special":{"course":[],"location":null},"transaction":{"transaction":"Enrollment, Apply-1","amount":2500,"ORnum":"180815bc04c2cdd","dataID":25},"preference":{"vehicle":"345","schedule":[0,1]}}', '2018-08-15 15:13:10', 0),
(27, '{"info":{"fullname":"Graciella _Custodio_Tatel","birthdate":"1999-05-17","birthplace":"CSJDM, Bulacan","address":"CSJDM, Bulacan","telno":"09568798811","occupation":"Student","email":"gtatel0517@gmail.com","civilStatus":"Single","sex":"Female","guardian":{"name":"Jemma C. Tatel","telno":"09762228121"}},"course":[2],"branch":"3","payment":1,"applyLicense":1,"special":{"course":[],"location":null},"transaction":{"transaction":"Enrollment, Apply-1","amount":2500,"ORnum":"180816ba26171ac","dataID":26},"preference":{"vehicle":"345","schedule":[0]}}', '2018-08-15 21:17:38', 0),
(28, '{"info":{"fullname":"asad_sdsa_dsdas","birthdate":"0012-12-13","birthplace":"3123","address":"2312","telno":"3123213","occupation":"323","email":"sdsadas@gmail.com","civilStatus":"Married","sex":"Female","guardian":{"name":"32312","telno":"3213123"}},"course":[2],"branch":"3","payment":1,"applyLicense":1,"special":{"course":[],"location":null},"transaction":{"transaction":"Enrollment, Apply-1","amount":2500,"ORnum":"180816700917921","dataID":27},"preference":{"vehicle":"234","schedule":[0]}}', '2018-08-15 21:27:41', 0),
(29, '{"info":{"fullname":"Perrine Clarisse_Buena_Laganzo","birthdate":"1998-08-16","birthplace":"Makati City","address":"Taguig City","telno":"09272597427","occupation":"Student","email":"zhayrineoznagal@gmail.com","civilStatus":"Single","sex":"Female","guardian":{"name":"Wilma Laganzo","telno":"09062078123"}},"course":[1],"branch":"3","payment":1,"applyLicense":0,"special":{"course":[],"location":null},"transaction":{"transaction":"Enrollment","amount":0,"ORnum":"18081618888a309","dataID":28},"preference":{"vehicle":"570","schedule":[0,1,2]}}', '2018-08-16 05:01:54', 0),
(30, '{"info":{"fullname":"Graciella _Custodio_Tatel","birthdate":"1999-05-17","birthplace":"CSJDM, Bulacan","address":"CSJDM, Bulacan","telno":"09565867532","occupation":"Student","email":"gtatel0517@gmail.com","civilStatus":"Single","sex":"Female","guardian":{"name":"Jemma C. Tatel","telno":"09758664532"}},"course":[2],"branch":"3","payment":1,"applyLicense":1,"special":{"course":[],"location":null},"transaction":{"transaction":"Enrollment, Apply-1","amount":2500,"ORnum":"18081739734805d","dataID":29},"preference":{"vehicle":"567","schedule":[0]}}', '2018-08-16 17:50:23', 0),
(31, '{"info":{"fullname":"Graciella _Custodio_Tatel","birthdate":"1999-05-17","birthplace":"CSJDM, Bulacan","address":"CSJDM, Bulacan","telno":"09565867353","occupation":"Student","email":"aaaa@gmail.com","civilStatus":"Single","sex":"Female","guardian":{"name":"Jemma C. Tatel","telno":"09758664532"}},"course":[2],"branch":"3","payment":1,"applyLicense":1,"special":{"course":[],"location":null},"transaction":{"transaction":"Enrollment, Apply-1","amount":1000,"ORnum":"180817352109654","dataID":30},"preference":{"vehicle":"456","schedule":["2"]}}', '2018-08-17 00:29:06', 0),
(32, '{"info":{"fullname":"Perrine ClarissexSX_Buena_Laganzo","birthdate":"1998-11-21","birthplace":"Makati City","address":"Taguig City","telno":"0912122312","occupation":"Student","email":"asd@gmail.com","civilStatus":"Single","sex":"Female","guardian":{"name":"dsdsa","telno":"213123"}},"course":[5],"branch":"3","payment":1,"applyLicense":0,"special":{"course":[],"location":null},"transaction":{"transaction":"Enrollment","amount":0,"ORnum":"180817970dd9e86","dataID":31},"preference":{"vehicle":"456","schedule":["2","1","5"]}}', '2018-08-17 00:42:25', 0),
(33, '{"info":{},"course":[2],"branch":"3","payment":1,"applyLicense":2,"special":{"course":[],"location":null},"transaction":{"transaction":"Enrollment, Apply-2","amount":2500,"ORnum":"1808177d272a316","dataID":32},"preference":{"vehicle":"234","schedule":["2"]}}', '2018-08-17 00:47:48', 0),
(34, '{"info":{"fullname":"Graciella _Custodio_Tatel","birthdate":"1999-01-07","birthplace":"CSJDM, Bulacan","address":"CSJDm, Bulacan","telno":"09565867353","occupation":"Student","email":"gtatel0517@gmail.com","civilStatus":"Single","sex":"Female","guardian":{"name":"Jemma C. Tatel","telno":"09768883945"}},"course":[2],"branch":"3","payment":1,"applyLicense":1,"special":{"course":[],"location":null},"transaction":{"transaction":"Enrollment, Apply-1","amount":500,"ORnum":"18081708c8e9f0c","dataID":33},"preference":{"vehicle":"345","schedule":["1","2","5"]}}', '2018-08-17 00:54:55', 0);

INSERT INTO `requirement` (`id`, `title`, `description`, `importance`) VALUES
(1, 'license', 'To apply drivers permit at LTO', 1);

INSERT INTO `schedule` (`id`, `title`, `date`, `time`, `hour`, `studID`, `instID`, `branch`, `status`) VALUES
(1, '', '2018-05-19', '10:30:00', 1, '04220', '12345', 4, 1),
(2, 'session#2', '2018-08-02', '15:00:00', 1, '06597', 'INST-014008', 1, 3),
(3, 'session#1', '2018-05-31', '12:00:00', 1, '06597', 'INST-014008', 5, 1),
(4, '', '2018-05-29', '14:30:00', 1, '34591', '56789', 2, 0),
(5, '', '2018-05-30', '16:00:00', 1, '89432', '45678', 5, 0),
(6, 'session#1', '2018-08-16', '08:30:00', 1, '048025', 'INST-21211', 2, 1),
(7, 'session#2', '2018-08-23', '08:30:00', 1, '048025', 'INST-21211', 2, 1),
(8, 'session#3', '2018-08-30', '08:30:00', 1, '048025', 'INST-21211', 2, 1),
(9, 'session#4', '2018-09-06', '08:30:00', 1, '048025', 'INST-21211', 2, 1),
(10, 'session#5', '2018-09-13', '08:30:00', 1, '048025', 'INST-21211', 2, 1),
(11, 'session#1', '2018-08-16', '15:00:00', 1, '048025', 'INST-051027', 1, 2),
(12, 'session#1', '2018-08-16', '18:00:00', 1, '046022', 'INST-051027', 1, 2),
(13, 'session#1', '2018-08-20', '09:01:00', 1, '055030', NULL, 1, 2),
(14, 'session#2', '2018-08-21', '09:01:00', 1, '055030', NULL, 1, 2),
(15, 'session#3', '2018-08-24', '09:01:00', 1, '055030', NULL, 1, 2),
(16, 'session#4', '2018-08-20', '09:01:00', 1, '055030', NULL, 1, 2),
(17, 'session#5', '2018-08-21', '09:01:00', 1, '055030', NULL, 1, 2);

INSERT INTO `student` (`id`, `userInfo`, `license`, `hours`, `prefDays`, `prefCar`, `dateRegistered`, `status`) VALUES
('044020', 20, '', 0, '[0,1]', '345', '2018-08-15 15:16:38', 1),
('045021', 21, '', 0, '[0]', '345', '2018-08-15 21:18:21', 1),
('046022', 22, '', 0, '[0]', '234', '2018-08-15 21:28:09', 1),
('048025', 25, '', 0, '[0,1,2]', '570', '2018-08-16 05:02:29', 1),
('052028', 28, '', 0, '[0]', '567', '2018-08-16 17:51:53', 1),
('054029', 29, '', 0, '["2"]', '456', '2018-08-17 00:44:39', 1),
('055030', 30, '', 0, '["1","2","5"]', '345', '2018-08-17 00:56:48', 1);

INSERT INTO `useraccount` (`id`, `username`, `password`, `accType`, `status`) VALUES
(1, 'admin', 'd033e22ae348aeb5660fc2140aec35850c4da997', 1, 1),
(44, 'gtatel0516@gmail.com', '7e240de74fb1ed08fa08d38063f6a6a91462a815', 3, 1),
(45, 'gtatel0518@gmail.com', '7e240de74fb1ed08fa08d38063f6a6a91462a815', 3, 1),
(46, 'aaa@gmail.com', '7e240de74fb1ed08fa08d38063f6a6a91462a815', 3, 1),
(47, 'inst@gmail.com', '7e240de74fb1ed08fa08d38063f6a6a91462a815', 2, 1),
(48, 'zhayrineoznagal@gmail.com', '7e240de74fb1ed08fa08d38063f6a6a91462a815', 3, 1),
(49, 'asd@gmail.com', '67cad8aa7ff25de04df0bc6e87727f7852598f4f', 2, 1),
(51, 'test1', '7e240de74fb1ed08fa08d38063f6a6a91462a815', 2, 1),
(52, 'gtatel0519@gmail.com', '7e240de74fb1ed08fa08d38063f6a6a91462a815', 3, 1),
(54, 'aaaa@gmail.com', '7e240de74fb1ed08fa08d38063f6a6a91462a815', 3, 1),
(55, 'gtatel0517@gmail.com', '7e240de74fb1ed08fa08d38063f6a6a91462a815', 3, 1),
(56, 'gtatel0527@gmail.com', '7e240de74fb1ed08fa08d38063f6a6a91462a815', 2, 1);

INSERT INTO `userinfo` (`id`, `userAcc`, `fullname`, `address`, `telno`, `birthdate`, `birthplace`, `sex`, `civilStatus`, `email`, `userType`) VALUES
(19, 1, 'Zac_Efron', 'Salt_Lake,_Utah', '1232211', '2018-08-16', 'Salt_Lake,_Utah', 'M', 'Single', 'dasdsd_wewq@gmail.com', 1),
(20, 44, 'Graciella _Custodio_Tatel', 'CSJDM, Bulacan', '09565867353', '1999-05-17', 'CSJDM, Bulacan', 'F', 'Single', 'gtatel0517@gmail.com', 3),
(21, 45, 'Graciella _Custodio_Tatel', 'CSJDM, Bulacan', '09568798811', '1999-05-17', 'CSJDM, Bulacan', 'F', 'Single', 'gtatel0517@gmail.com', 3),
(22, 46, 'Jana_Katrine_Laganzo', '2312', '3123213', '0012-12-13', '3123', 'F', 'Married', 'sdsadas@gmail.com', 3),
(23, 44, 'Zac_Efron', 'SDSDA', '1232321', '2018-08-05', 'dsadsa', 'M', 'Single', 'inst@gmail.com', 2),
(24, 47, 'Vanessa_Anne_Hudgens', 'Salt Lake, Utah', '09123456789', '1987-12-22', 'n/a', 'F', 'n/a', 'gtatel0517@gmail.com', 2),
(25, 48, 'Perrine Clarisse_Buena_Laganzo', 'Taguig City', '09272597427', '1998-08-16', 'Makati City', 'F', 'Single', 'zhayrineoznagal@gmail.com', 3),
(26, 49, 'Austin__Butler', 'Salt Lake, Utah', '09567897653', '1985-09-08', 'n/a', 'M', 'n/a', 'asd@gmail.com', 2),
(27, 51, 'Austin_Butler', 'Salt Lake, Utah', '09567897653', '1985-09-08', 'n/a', 'M', 'n/a', 'asdgh@gmail.com', 2),
(28, 52, 'Graciella _Custodio_Tatel', 'CSJDM, Bulacan', '09565867532', '1999-05-17', 'CSJDM, Bulacan', 'F', 'Single', 'gtatel0517@gmail.com', 3),
(29, 54, 'Graciella _Custodio_Tatel', 'CSJDM, Bulacan', '09565867353', '1999-05-17', 'CSJDM, Bulacan', 'F', 'Single', 'aaaa@gmail.com', 3),
(30, 55, 'Graciella _Custodio_Tatel', 'CSJDm, Bulacan', '09565867353', '1999-01-07', 'CSJDM, Bulacan', 'F', 'Single', 'gtatel0517@gmail.com', 3),
(31, 56, 'Aristotle__Tatel', 'CSJDM, Bulacan', '09876574532', '1976-11-30', 'n/a', 'M', 'n/a', 'gtatel0527@gmail.com', 2);

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
(2, 1, 'a', 5, 60, 3500),
(3, 5, 'm', 15, 60, 1000),
(4, 6, 'a', 12, 60, 4501);
SET FOREIGN_KEY_CHECKS=1;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
