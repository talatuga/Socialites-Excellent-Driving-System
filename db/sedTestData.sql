SET FOREIGN_KEY_CHECKS=0;
SET AUTOCOMMIT = 0;
START TRANSACTION;

INSERT INTO `account` (`id`, `studentID`, `isAircon`, `feeType`, `amount`, `balance`, `date`) VALUES
(1, 1, 1, 3, 500, 300, '2018-04-25 05:17:58'),
(5, 2, 1, 1, 600, 200, '2018-04-25 10:38:18'),
(6, 3, 1, 2, 800, 0, '2018-04-25 10:38:18'),
(7, 4, 1, 1, 700, 100, '2018-04-25 10:38:18'),
(8, 5, 0, 2, 550, 250, '2018-04-25 10:38:18'),
(9, 6, 0, 3, 800, 0, '2018-04-25 10:38:18'),
(10, 7, 0, 2, 600, 200, '2018-04-25 10:39:30'),
(11, 8, 0, 3, 800, 0, '2018-04-25 10:39:30');

INSERT INTO `accountType` (`id`, `title`, `permission`) VALUES
(1, 'admin', 'a,b,c,d,e'),
(2, 'student', 'a'),
(3, 'instructor', 'a,b,'),
(4, 'branch', 'a,b,c,');

INSERT INTO `activity` (`id`, `date`, `startTime`, `duration`, `studentID`, `instructorID`, `vehicleID`, `lessonID`) VALUES
(1, '2018-04-24 08:05:44', '10:30:00', 2, 1, 1, 1, 1),
(2, '2018-04-25 10:23:32', '12:30:00', 1, 2, 1, 3, 1),
(3, '2018-04-25 10:23:32', '01:30:00', 1, 3, 1, 2, 1),
(4, '2018-04-25 10:23:32', '02:30:00', 1, 4, 3, 2, 1),
(5, '2018-04-25 10:23:32', '03:30:00', 1, 5, 3, 1, 1),
(6, '2018-04-25 10:23:32', '04:30:00', 1, 6, 2, 1, 1),
(7, '2018-04-25 10:28:21', '06:30:00', 1, 7, 2, 3, 1),
(8, '2018-04-25 10:28:21', '07:30:00', 1, 8, 3, 2, 1);

INSERT INTO `branch` (`id`, `address`, `telno`) VALUES
(1, 'Taguig city', '09123456789'),
(2, 'Pasig City', '09176547890'),
(3, 'Caloocan City', '09453102875');

INSERT INTO `credential` (`id`, `username`, `password`, `accType`) VALUES
(1, 'admin', 'd033e22ae348aeb5660fc2140aec35850c4da997', 1);

INSERT INTO `guardian` (`id`, `fullname`, `telno`) VALUES
(1, 'Sarah Jane R. Gabat', '8827273'),
(2, 'Dinah P. Candelario', '358-0909'),
(3, 'Jun Sabayton', '880-7000'),
(4, 'Adrian Joseph Judilla', '986-7570'),
(5, 'Merida Stumberland', '365-4507'),
(6, 'Martha Kent', '504-8721'),
(7, 'Andrew Parker', '214-5123'),
(8, 'Keith Andrei Locasto', '654-8106');

INSERT INTO `instructor` (`id`, `usrAcc`, `fullname`, `address`, `telno`, `birthdate`, `sex`) VALUES
(1, NULL, 'Christian Paul Tupas', 'Quezon City', '8827273', '1998-12-11', 'f'),
(2, NULL, 'Sarah Jane Cabanig', 'Rodriguez, Rizal', '426-8731', '1981-10-24', 'F'),
(3, NULL, 'Florante Andres', 'Sta. Mesa, Manila', '820-1594', '1979-01-12', 'M');

INSERT INTO `instructorevaluation` (`id`, `studentID`, `instructorID`, `evaluation`, `comment`, `date`) VALUES
(1, 1, 1, 'passed', 'need more practice', '2018-04-24 06:11:13'),
(3, 2, 2, 'passed', NULL, '2018-04-25 10:55:35'),
(4, 3, 3, 'passed', NULL, '2018-04-25 10:55:35'),
(5, 4, 1, 'passed', NULL, '2018-04-25 10:57:06'),
(6, 5, 3, 'failed', NULL, '2018-04-25 10:57:06'),
(7, 6, 3, 'failed', NULL, '2018-04-25 10:57:06'),
(8, 7, 3, 'passed', NULL, '2018-04-25 10:57:06'),
(9, 8, 2, 'failed', NULL, '2018-04-25 10:57:06');

INSERT INTO `lessonlist` (`id`, `title`, `description`, `prerequisite`) VALUES
(1, 'lesson 1', 'start driving', NULL);

INSERT INTO `registrar` (`studentID`, `studentInfo`, `requirement`, `date`, `status`) VALUES
(1, 0, 1, '2018-04-24 07:03:38', 0),
(2, 8, 1, '2018-04-25 09:43:23', 1),
(3, 4, 1, '2018-04-25 09:43:23', 1),
(4, 9, 1, '2018-04-25 09:44:20', 1),
(5, 3, 1, '2018-04-25 09:44:20', 1),
(6, 6, 1, '2018-04-25 09:44:20', 1),
(7, 6, 1, '2018-04-25 09:44:20', 1),
(8, 7, 1, '2018-04-25 09:44:20', 1);

INSERT INTO `requirement` (`id`, `title`, `description`, `important`) VALUES
(1, 'Driver\'s Licens', 'Getting Student\'s License', 1);

INSERT INTO `schedule` (`id`, `date`, `time`, `hour`, `studentID`, `instructorID`, `branchID`) VALUES
(1, '2018-04-06', '12:30:00', 1, 2, 3, 3),
(2, '2018-04-25', '10:30:00', 2, 1, 2, 3),
(3, '2018-04-01', '12:30:00', 1, 3, 2, 1),
(4, '2018-04-03', '11:30:00', 1, 4, 1, 2),
(5, '2018-04-03', '14:30:00', 1, 5, 2, 3),
(6, '2018-04-06', '12:30:00', 1, 6, 3, 1),
(7, '2018-05-01', '11:30:00', 2, 7, 2, 3),
(8, '2018-05-01', '13:30:00', 1, 8, 1, 1);

INSERT INTO `studentevaluation` (`id`, `studentID`, `instructorID`, `evaluation`, `date`) VALUES
(2, 2, 2, 'passed', '2018-04-24 06:35:46'),
(3, 1, 1, 'passed', '2018-04-25 10:01:01'),
(4, 3, 1, 'failed', '2018-04-25 10:01:01'),
(5, 4, 3, 'passed', '2018-04-25 10:01:01'),
(6, 5, 3, 'failed', '2018-04-25 10:01:01'),
(7, 6, 2, 'failed', '2018-04-25 10:01:01'),
(8, 7, 2, 'failed', '2018-04-25 10:01:01'),
(9, 8, 2, 'passed', '2018-04-25 10:01:01');

INSERT INTO `studentinformation` (`id`, `usrAcc`, `guardianID`, `fullname`, `birthdate`, `birthplace`, `civilStatus`, `sex`, `occupation`, `telno`) VALUES
(3, NULL, 2, 'Jann Hope R. Gabat', '2018-04-23', 'Makati City', 'Single', 'F', 'Student', '8827273'),
(4, NULL, 4, 'Christian Judilla', '1998-07-12', 'Pasig City', 'single', 'm', 'student', '986-7570'),
(5, NULL, 2, 'Reven John Candelario', '1999-01-13', 'Manila ', 'Single', 'm', 'student', '358-0909'),
(6, NULL, 3, 'Joseph Sabayton', '2000-12-21', 'Taguig City', 'Single', 'm', 'Student', '880-7000'),
(7, NULL, 7, 'Marsha Parker', '1987-03-04', 'New York, Cubao', 'Married', 'F', 'housewife', '214-5123'),
(8, NULL, 8, 'Andrea Locasto', '1989-06-14', 'Marikina City', 'Single', 'F', 'OFW', '654-8106'),
(9, NULL, 6, 'Clark Kent', '1997-11-13', 'Mexico, Pampanga', 'Single', 'M', 'Newscaster', '504-8721'),
(10, NULL, 5, 'Martin Stumberland', '1998-12-18', 'Quezon City', 'Single', 'M', 'student', '365-4507'),
(13, NULL, 2, 'Tupas Paul', '1998-12-08', 'QC', 'broken', 'M', 'student', '09094527651');

INSERT INTO `vehicle` (`id`, `model`, `brand`, `fuel`, `defect`, `status`) VALUES
(1, 'Wigo', 'Toyota', '50', NULL, 1),
(2, 'Vios', 'Toyota', '50', NULL, 1),
(3, 'Accent', 'Hyundai', '50', NULL, 1);

SET FOREIGN_KEY_CHECKS=1;
COMMIT;