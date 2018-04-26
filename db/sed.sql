-- phpMyAdmin SQL Dump
-- version 4.8.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Apr 26, 2018 at 08:05 AM
-- Server version: 10.1.31-MariaDB
-- PHP Version: 5.6.35

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `sed`
--

-- --------------------------------------------------------

--
-- Table structure for table `account`
--

CREATE TABLE `account` (
  `id` int(5) NOT NULL,
  `studentID` int(7) NOT NULL,
  `isAircon` int(1) NOT NULL DEFAULT '0',
  `feeType` int(1) NOT NULL DEFAULT '0',
  `amount` int(8) NOT NULL,
  `balance` int(8) NOT NULL,
  `date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `account`
--

INSERT INTO `account` (`id`, `studentID`, `isAircon`, `feeType`, `amount`, `balance`, `date`) VALUES
(1, 1, 1, 3, 500, 300, '2018-04-25 13:17:58'),
(5, 2, 1, 1, 600, 200, '2018-04-25 18:38:18'),
(6, 3, 1, 2, 800, 0, '2018-04-25 18:38:18'),
(7, 4, 1, 1, 700, 100, '2018-04-25 18:38:18'),
(8, 5, 0, 2, 550, 250, '2018-04-25 18:38:18'),
(9, 6, 0, 3, 800, 0, '2018-04-25 18:38:18'),
(10, 7, 0, 2, 600, 200, '2018-04-25 18:39:30'),
(11, 8, 0, 3, 800, 0, '2018-04-25 18:39:30');

-- --------------------------------------------------------

--
-- Table structure for table `activity`
--

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

--
-- Dumping data for table `activity`
--

INSERT INTO `activity` (`id`, `date`, `startTime`, `duration`, `studentID`, `instructorID`, `vehicleID`, `lessonID`) VALUES
(1, '2018-04-24 16:05:44', '10:30:00', 2, 1, 1, 1, 1),
(2, '2018-04-25 18:23:32', '12:30:00', 1, 2, 1, 3, 1),
(3, '2018-04-25 18:23:32', '01:30:00', 1, 3, 1, 2, 1),
(4, '2018-04-25 18:23:32', '02:30:00', 1, 4, 3, 2, 1),
(5, '2018-04-25 18:23:32', '03:30:00', 1, 5, 3, 1, 1),
(6, '2018-04-25 18:23:32', '04:30:00', 1, 6, 2, 1, 1),
(7, '2018-04-25 18:28:21', '06:30:00', 1, 7, 2, 3, 1),
(8, '2018-04-25 18:28:21', '07:30:00', 1, 8, 3, 2, 1);

-- --------------------------------------------------------

--
-- Table structure for table `branch`
--

CREATE TABLE `branch` (
  `id` int(3) NOT NULL,
  `address` varchar(150) NOT NULL,
  `telno` varchar(15) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `branch`
--

INSERT INTO `branch` (`id`, `address`, `telno`) VALUES
(1, 'Taguig city', '09123456789'),
(2, 'Pasig City', '09176547890'),
(3, 'Caloocan City', '09453102875');

-- --------------------------------------------------------

--
-- Table structure for table `guardian`
--

CREATE TABLE `guardian` (
  `id` int(4) NOT NULL,
  `fullname` varchar(50) NOT NULL,
  `telno` varchar(12) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `guardian`
--

INSERT INTO `guardian` (`id`, `fullname`, `telno`) VALUES
(1, 'Sarah Jane R. Gabat', '8827273'),
(2, 'Dinah P. Candelario', '358-0909'),
(3, 'Jun Sabayton', '880-7000'),
(4, 'Adrian Joseph Judilla', '986-7570'),
(5, 'Merida Stumberland', '365-4507'),
(6, 'Martha Kent', '504-8721'),
(7, 'Andrew Parker', '214-5123'),
(8, 'Keith Andrei Locasto', '654-8106');

-- --------------------------------------------------------

--
-- Table structure for table `instructor`
--

CREATE TABLE `instructor` (
  `id` int(4) NOT NULL,
  `fullname` varchar(50) NOT NULL,
  `address` varchar(100) NOT NULL,
  `telno` varchar(12) NOT NULL,
  `birthdate` date NOT NULL,
  `sex` varchar(3) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `instructor`
--

INSERT INTO `instructor` (`id`, `fullname`, `address`, `telno`, `birthdate`, `sex`) VALUES
(1, 'Christian Paul Tupas', 'Quezon City', '8827273', '1998-12-11', 'f'),
(2, 'Sarah Jane Cabanig', 'Rodriguez, Rizal', '426-8731', '1981-10-24', 'F'),
(3, 'Florante Andres', 'Sta. Mesa, Manila', '820-1594', '1979-01-12', 'M');

-- --------------------------------------------------------

--
-- Table structure for table `instructorevaluation`
--

CREATE TABLE `instructorevaluation` (
  `id` int(4) NOT NULL,
  `studentID` int(7) NOT NULL,
  `instructorID` int(4) NOT NULL,
  `evaluation` varchar(10) NOT NULL,
  `comment` varchar(300) DEFAULT NULL,
  `date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `instructorevaluation`
--

INSERT INTO `instructorevaluation` (`id`, `studentID`, `instructorID`, `evaluation`, `comment`, `date`) VALUES
(1, 1, 1, 'passed', 'need more practice', '2018-04-24 14:11:13'),
(3, 2, 2, 'passed', NULL, '2018-04-25 18:55:35'),
(4, 3, 3, 'passed', NULL, '2018-04-25 18:55:35'),
(5, 4, 1, 'passed', NULL, '2018-04-25 18:57:06'),
(6, 5, 3, 'failed', NULL, '2018-04-25 18:57:06'),
(7, 6, 3, 'failed', NULL, '2018-04-25 18:57:06'),
(8, 7, 3, 'passed', NULL, '2018-04-25 18:57:06'),
(9, 8, 2, 'failed', NULL, '2018-04-25 18:57:06');

-- --------------------------------------------------------

--
-- Table structure for table `lessonlist`
--

CREATE TABLE `lessonlist` (
  `id` int(3) NOT NULL,
  `title` varchar(15) NOT NULL,
  `description` varchar(300) DEFAULT NULL,
  `prerequisite` varchar(3) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `lessonlist`
--

INSERT INTO `lessonlist` (`id`, `title`, `description`, `prerequisite`) VALUES
(1, 'lesson 1', 'start driving', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `registrar`
--

CREATE TABLE `registrar` (
  `studentID` int(7) NOT NULL,
  `studentInfo` int(5) NOT NULL,
  `requirement` int(3) NOT NULL,
  `date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `status` int(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `registrar`
--

INSERT INTO `registrar` (`studentID`, `studentInfo`, `requirement`, `date`, `status`) VALUES
(1, 0, 1, '2018-04-24 15:03:38', 0),
(2, 8, 1, '2018-04-25 17:43:23', 1),
(3, 4, 1, '2018-04-25 17:43:23', 1),
(4, 9, 1, '2018-04-25 17:44:20', 1),
(5, 3, 1, '2018-04-25 17:44:20', 1),
(6, 6, 1, '2018-04-25 17:44:20', 1),
(7, 6, 1, '2018-04-25 17:44:20', 1),
(8, 7, 1, '2018-04-25 17:44:20', 1);

-- --------------------------------------------------------

--
-- Table structure for table `requirement`
--

CREATE TABLE `requirement` (
  `id` int(3) NOT NULL,
  `title` varchar(15) NOT NULL,
  `description` varchar(300) DEFAULT NULL,
  `important` int(1) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `requirement`
--

INSERT INTO `requirement` (`id`, `title`, `description`, `important`) VALUES
(1, 'Driver\'s Licens', 'Getting Student\'s License', 1);

-- --------------------------------------------------------

--
-- Table structure for table `schedule`
--

CREATE TABLE `schedule` (
  `id` int(5) NOT NULL,
  `date` date NOT NULL,
  `time` time NOT NULL,
  `hour` int(3) NOT NULL,
  `studentID` int(7) NOT NULL,
  `instructorID` int(4) NOT NULL,
  `branchID` int(3) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `schedule`
--

INSERT INTO `schedule` (`id`, `date`, `time`, `hour`, `studentID`, `instructorID`, `branchID`) VALUES
(1, '2018-04-06', '12:30:00', 1, 2, 3, 3),
(2, '2018-04-25', '10:30:00', 2, 1, 2, 3),
(3, '2018-04-01', '12:30:00', 1, 3, 2, 1),
(4, '2018-04-03', '11:30:00', 1, 4, 1, 2),
(5, '2018-04-03', '14:30:00', 1, 5, 2, 3),
(6, '2018-04-06', '12:30:00', 1, 6, 3, 1),
(7, '2018-05-01', '11:30:00', 2, 7, 2, 3),
(8, '2018-05-01', '13:30:00', 1, 8, 1, 1);

-- --------------------------------------------------------

--
-- Table structure for table `studentevaluation`
--

CREATE TABLE `studentevaluation` (
  `id` int(4) NOT NULL,
  `studentID` int(7) NOT NULL,
  `instructorID` int(4) NOT NULL,
  `evaluation` varchar(10) NOT NULL,
  `date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `studentevaluation`
--

INSERT INTO `studentevaluation` (`id`, `studentID`, `instructorID`, `evaluation`, `date`) VALUES
(2, 2, 2, 'passed', '2018-04-24 14:35:46'),
(3, 1, 1, 'passed', '2018-04-25 18:01:01'),
(4, 3, 1, 'failed', '2018-04-25 18:01:01'),
(5, 4, 3, 'passed', '2018-04-25 18:01:01'),
(6, 5, 3, 'failed', '2018-04-25 18:01:01'),
(7, 6, 2, 'failed', '2018-04-25 18:01:01'),
(8, 7, 2, 'failed', '2018-04-25 18:01:01'),
(9, 8, 2, 'passed', '2018-04-25 18:01:01');

-- --------------------------------------------------------

--
-- Table structure for table `studentinformation`
--

CREATE TABLE `studentinformation` (
  `id` int(5) NOT NULL,
  `guardianID` int(4) NOT NULL,
  `fullname` varchar(50) NOT NULL,
  `birthdate` date NOT NULL,
  `birthplace` varchar(100) NOT NULL,
  `civilStatus` varchar(10) NOT NULL,
  `sex` varchar(3) NOT NULL,
  `occupation` varchar(30) DEFAULT NULL,
  `telno` varchar(12) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `studentinformation`
--

INSERT INTO `studentinformation` (`id`, `guardianID`, `fullname`, `birthdate`, `birthplace`, `civilStatus`, `sex`, `occupation`, `telno`) VALUES
(3, 2, 'Jann Hope R. Gabat', '0000-00-00', 'Makati City', 'Single', 'F', 'Student', '8827273'),
(4, 4, 'Christian Judilla', '1998-07-12', 'Pasig City', 'single', 'm', 'student', '986-7570'),
(5, 2, 'Reven John Candelario', '1999-01-13', 'Manila ', 'Single', 'm', 'student', '358-0909'),
(6, 3, 'Joseph Sabayton', '2000-12-21', 'Taguig City', 'Single', 'm', 'Student', '880-7000'),
(7, 7, 'Marsha Parker', '1987-03-04', 'New York, Cubao', 'Married', 'F', 'housewife', '214-5123'),
(8, 8, 'Andrea Locasto', '1989-06-14', 'Marikina City', 'Single', 'F', 'OFW', '654-8106'),
(9, 6, 'Clark Kent', '1997-11-13', 'Mexico, Pampanga', 'Single', 'M', 'Newscaster', '504-8721'),
(10, 5, 'Martin Stumberland', '1998-12-18', 'Quezon City', 'Single', 'M', 'student', '365-4507');

-- --------------------------------------------------------

--
-- Table structure for table `vehicle`
--

CREATE TABLE `vehicle` (
  `id` int(3) NOT NULL,
  `model` varchar(15) NOT NULL,
  `brand` varchar(15) NOT NULL,
  `fuel` varchar(3) NOT NULL,
  `defect` varchar(30) DEFAULT NULL,
  `status` int(1) NOT NULL DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `vehicle`
--

INSERT INTO `vehicle` (`id`, `model`, `brand`, `fuel`, `defect`, `status`) VALUES
(1, 'Wigo', 'Toyota', '50', NULL, 1),
(2, 'Vios', 'Toyota', '50', NULL, 1),
(3, 'Accent', 'Hyundai', '50', NULL, 1);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `account`
--
ALTER TABLE `account`
  ADD PRIMARY KEY (`id`),
  ADD KEY `studentID` (`studentID`);

--
-- Indexes for table `activity`
--
ALTER TABLE `activity`
  ADD PRIMARY KEY (`id`),
  ADD KEY `instructorID` (`instructorID`),
  ADD KEY `lessonID` (`lessonID`),
  ADD KEY `studentID` (`studentID`),
  ADD KEY `vehicleID` (`vehicleID`);

--
-- Indexes for table `branch`
--
ALTER TABLE `branch`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `guardian`
--
ALTER TABLE `guardian`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `instructor`
--
ALTER TABLE `instructor`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `instructorevaluation`
--
ALTER TABLE `instructorevaluation`
  ADD PRIMARY KEY (`id`),
  ADD KEY `instructorevaluation_ibfk_3` (`studentID`),
  ADD KEY `instructorevaluation_ibfk_4` (`instructorID`);

--
-- Indexes for table `lessonlist`
--
ALTER TABLE `lessonlist`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `registrar`
--
ALTER TABLE `registrar`
  ADD PRIMARY KEY (`studentID`),
  ADD KEY `studentInfo` (`studentInfo`),
  ADD KEY `requirement` (`requirement`);

--
-- Indexes for table `requirement`
--
ALTER TABLE `requirement`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `schedule`
--
ALTER TABLE `schedule`
  ADD PRIMARY KEY (`id`),
  ADD KEY `studentID` (`studentID`),
  ADD KEY `instructorID` (`instructorID`),
  ADD KEY `branchID` (`branchID`);

--
-- Indexes for table `studentevaluation`
--
ALTER TABLE `studentevaluation`
  ADD PRIMARY KEY (`id`),
  ADD KEY `studentevaluation_ibfk_1` (`studentID`),
  ADD KEY `studentevaluation_ibfk_2` (`instructorID`);

--
-- Indexes for table `studentinformation`
--
ALTER TABLE `studentinformation`
  ADD PRIMARY KEY (`id`),
  ADD KEY `guardianID` (`guardianID`);

--
-- Indexes for table `vehicle`
--
ALTER TABLE `vehicle`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `account`
--
ALTER TABLE `account`
  MODIFY `id` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `branch`
--
ALTER TABLE `branch`
  MODIFY `id` int(3) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `guardian`
--
ALTER TABLE `guardian`
  MODIFY `id` int(4) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `instructor`
--
ALTER TABLE `instructor`
  MODIFY `id` int(4) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `instructorevaluation`
--
ALTER TABLE `instructorevaluation`
  MODIFY `id` int(4) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `lessonlist`
--
ALTER TABLE `lessonlist`
  MODIFY `id` int(3) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `registrar`
--
ALTER TABLE `registrar`
  MODIFY `studentID` int(7) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `requirement`
--
ALTER TABLE `requirement`
  MODIFY `id` int(3) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `schedule`
--
ALTER TABLE `schedule`
  MODIFY `id` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `studentevaluation`
--
ALTER TABLE `studentevaluation`
  MODIFY `id` int(4) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `studentinformation`
--
ALTER TABLE `studentinformation`
  MODIFY `id` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `vehicle`
--
ALTER TABLE `vehicle`
  MODIFY `id` int(3) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `account`
--
ALTER TABLE `account`
  ADD CONSTRAINT `account_ibfk_1` FOREIGN KEY (`studentID`) REFERENCES `registrar` (`studentID`) ON DELETE NO ACTION ON UPDATE CASCADE;

--
-- Constraints for table `activity`
--
ALTER TABLE `activity`
  ADD CONSTRAINT `activity_ibfk_1` FOREIGN KEY (`instructorID`) REFERENCES `instructor` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE,
  ADD CONSTRAINT `activity_ibfk_2` FOREIGN KEY (`lessonID`) REFERENCES `lessonlist` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE,
  ADD CONSTRAINT `activity_ibfk_3` FOREIGN KEY (`studentID`) REFERENCES `registrar` (`studentID`) ON DELETE NO ACTION ON UPDATE CASCADE,
  ADD CONSTRAINT `activity_ibfk_4` FOREIGN KEY (`vehicleID`) REFERENCES `vehicle` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE;

--
-- Constraints for table `instructorevaluation`
--
ALTER TABLE `instructorevaluation`
  ADD CONSTRAINT `instructorevaluation_ibfk_3` FOREIGN KEY (`studentID`) REFERENCES `registrar` (`studentID`) ON DELETE NO ACTION ON UPDATE CASCADE,
  ADD CONSTRAINT `instructorevaluation_ibfk_4` FOREIGN KEY (`instructorID`) REFERENCES `instructor` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE;

--
-- Constraints for table `registrar`
--
ALTER TABLE `registrar`
  ADD CONSTRAINT `registrar_ibfk_1` FOREIGN KEY (`studentInfo`) REFERENCES `studentinformation` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE,
  ADD CONSTRAINT `registrar_ibfk_2` FOREIGN KEY (`requirement`) REFERENCES `requirement` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE;

--
-- Constraints for table `schedule`
--
ALTER TABLE `schedule`
  ADD CONSTRAINT `schedule_ibfk_1` FOREIGN KEY (`studentID`) REFERENCES `registrar` (`studentID`) ON DELETE NO ACTION ON UPDATE CASCADE,
  ADD CONSTRAINT `schedule_ibfk_2` FOREIGN KEY (`instructorID`) REFERENCES `instructor` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE,
  ADD CONSTRAINT `schedule_ibfk_3` FOREIGN KEY (`branchID`) REFERENCES `branch` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE;

--
-- Constraints for table `studentevaluation`
--
ALTER TABLE `studentevaluation`
  ADD CONSTRAINT `studentevaluation_ibfk_1` FOREIGN KEY (`studentID`) REFERENCES `registrar` (`studentID`) ON DELETE NO ACTION ON UPDATE CASCADE,
  ADD CONSTRAINT `studentevaluation_ibfk_2` FOREIGN KEY (`instructorID`) REFERENCES `instructor` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE;

--
-- Constraints for table `studentinformation`
--
ALTER TABLE `studentinformation`
  ADD CONSTRAINT `studentinformation_ibfk_1` FOREIGN KEY (`guardianID`) REFERENCES `guardian` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
