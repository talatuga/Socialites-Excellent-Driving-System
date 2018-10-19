-- phpMyAdmin SQL Dump
-- version 4.7.4
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Oct 15, 2018 at 09:26 PM
-- Server version: 10.1.30-MariaDB
-- PHP Version: 7.2.1

SET FOREIGN_KEY_CHECKS=0;
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

--
-- Dumping data for table `account`
--

INSERT INTO `account` (`id`, `ORno`, `transaction`, `data`, `feeType`, `price`, `balance`, `date`) VALUES
(1, '18101591322', 'Enrollment', '{\"enrolled\":[{\"course\":1,\"special\":false}],\"apply\":0,\"branch\":\"1\"}', 1, 3500, 3500, '2018-10-15 02:54:20'),
(2, '18101515703', 'Enrollment', '{\"enrolled\":[{\"course\":2,\"special\":false}],\"apply\":0,\"branch\":\"1\"}', 1, 4900, 4900, '2018-10-15 02:59:14'),
(3, '1810151110142', 'Enrollment', '{\"enrolled\":[{\"course\":3,\"special\":false}],\"apply\":0,\"branch\":\"1\"}', 2, 7000, 7000, '2018-10-15 03:01:15'),
(4, '1810151131115', 'Enrollment', '{\"enrolled\":[{\"course\":1,\"special\":false}],\"apply\":0,\"branch\":\"2\"}', 2, 3500, 3500, '2018-10-15 03:02:33'),
(5, '181015100411', 'Enrollment', '{\"enrolled\":[{\"course\":2,\"special\":false}],\"apply\":0,\"branch\":\"1\",\"bankslip\":[\"public\\\\images\\\\image_upload\\\\181016ad82904705.png\"]}', 2, 4900, 4900, '2018-10-15 03:03:18'),
(6, '181015413310', 'Enrollment', '{\"enrolled\":[{\"course\":2,\"special\":false}],\"apply\":0,\"branch\":\"2\"}', 2, 4900, 4900, '2018-10-15 03:07:36'),
(7, '181015145158', 'Enrollment', '{\"enrolled\":[{\"course\":3,\"special\":false}],\"apply\":0,\"branch\":\"1\"}', 1, 7000, 0, '2018-10-15 03:30:06'),
(8, '18101510235', 'Enrollment', '{\"enrolled\":[{\"course\":1,\"special\":false}],\"apply\":0,\"branch\":\"1\"}', 1, 3500, 0, '2018-10-15 03:32:10'),
(9, '18101531093', 'Enrollment', '{\"enrolled\":[{\"course\":2,\"special\":false}],\"apply\":0,\"branch\":\"1\"}', 1, 4900, 0, '2018-10-15 03:35:15'),
(10, '18101501109', 'Enrollment', '{\"enrolled\":[{\"course\":3,\"special\":false}],\"apply\":0,\"branch\":\"2\"}', 1, 7000, 7000, '2018-10-15 03:37:28'),
(11, '1810151414610', 'Enrollment', '{\"enrolled\":[{\"course\":8,\"special\":false}],\"apply\":0,\"branch\":\"1\"}', 1, 5000, 0, '2018-10-15 03:37:35'),
(12, '1810152112', 'Enrollment', '{\"enrolled\":[{\"course\":6,\"special\":false}],\"apply\":0,\"branch\":\"1\"}', 1, 2500, 0, '2018-10-15 03:40:20'),
(13, '18101558116', 'Enrollment', '{\"enrolled\":[{\"course\":7,\"special\":false}],\"apply\":0,\"branch\":\"1\"}', 1, 3500, 0, '2018-10-15 03:42:45'),
(14, '18101596100', 'Enrollment', '{\"enrolled\":[{\"course\":6,\"special\":false}],\"apply\":0,\"branch\":\"2\"}', 1, 2500, 2500, '2018-10-15 03:43:08'),
(15, '18101532156', 'Enrollment', '{\"enrolled\":[{\"course\":4,\"special\":true}],\"apply\":0,\"branch\":\"1\"}', 1, 21000, 0, '2018-10-15 03:46:37'),
(16, '181015151416', 'Enrollment', '{\"enrolled\":[{\"course\":2,\"special\":false}],\"apply\":0,\"branch\":\"1\",\"bankslip\":[\"public\\\\images\\\\image_upload\\\\181016a2cf9a34f6.png\"]}', 2, 4900, 4900, '2018-10-15 03:48:45'),
(17, '18101515753', 'Enrollment', '{\"enrolled\":[{\"course\":7,\"special\":false}],\"apply\":0,\"branch\":\"2\"}', 1, 3500, 3500, '2018-10-15 03:49:36'),
(18, '181015812151', 'Enrollment', '{\"enrolled\":[{\"course\":3,\"special\":false}],\"apply\":0,\"branch\":\"1\"}', 1, 7000, 0, '2018-10-15 03:49:51'),
(19, '181015131334', 'Enrollment', '{\"enrolled\":[{\"course\":4,\"special\":false}],\"apply\":0,\"branch\":\"1\"}', 1, 10500, 10500, '2018-10-15 03:53:04'),
(20, '181015121442', 'Enrollment', '{\"enrolled\":[{\"course\":9,\"special\":false}],\"apply\":0,\"branch\":\"2\"}', 1, 7500, 7500, '2018-10-15 03:53:15'),
(21, '1810155607', 'Enrollment', '{\"enrolled\":[{\"course\":5,\"special\":false}],\"apply\":0,\"branch\":\"1\"}', 1, 14000, 14000, '2018-10-15 03:54:53'),
(22, '181015721311', 'Enrollment', '{\"enrolled\":[{\"course\":10,\"special\":false}],\"apply\":0,\"branch\":\"2\"}', 1, 10000, 10000, '2018-10-15 03:55:46'),
(23, '18101598810', 'Enrollment, Apply-1', '{\"enrolled\":[{\"course\":6,\"special\":false}],\"apply\":1,\"branch\":\"1\"}', 1, 3000, 3000, '2018-10-15 03:56:20'),
(24, '18101544912', 'Enrollment, Apply-1', '{\"enrolled\":[{\"course\":7,\"special\":false}],\"apply\":1,\"branch\":\"1\"}', 1, 4000, 0, '2018-10-15 03:57:41'),
(25, '18101574123', 'Enrollment, Apply-4', '{\"enrolled\":[{\"course\":7,\"special\":false}],\"apply\":4,\"branch\":\"2\"}', 1, 8500, 8500, '2018-10-15 03:58:22'),
(26, '181015126150', 'Enrollment, Apply-1', '{\"enrolled\":[{\"course\":8,\"special\":false}],\"apply\":1,\"branch\":\"1\"}', 1, 5500, 5500, '2018-10-15 03:59:41'),
(27, '1810154783', 'Enrollment, Apply-4', '{\"enrolled\":[{\"course\":4,\"special\":false}],\"apply\":4,\"branch\":\"2\"}', 1, 15500, 15500, '2018-10-15 04:00:55'),
(28, '1810151551211', 'Enrollment, Apply-3', '{\"enrolled\":[{\"course\":9,\"special\":false}],\"apply\":3,\"branch\":\"1\"}', 1, 10200, 0, '2018-10-15 04:01:00'),
(29, '18101501044', 'Enrollment, Apply-2', '{\"enrolled\":[{\"course\":10,\"special\":false}],\"apply\":2,\"branch\":\"1\"}', 1, 12500, 12500, '2018-10-15 04:02:15'),
(30, '18101513477', 'Enrollment', '{\"enrolled\":[{\"course\":3,\"special\":false}],\"apply\":0,\"branch\":\"3\"}', 1, 7000, 7000, '2018-10-15 04:03:36'),
(31, '1810151531111', 'Enrollment', '{\"enrolled\":[{\"course\":5,\"special\":false}],\"apply\":0,\"branch\":\"3\"}', 1, 14000, 14000, '2018-10-15 04:06:04'),
(32, '18101512055', 'Enrollment', '{\"enrolled\":[{\"course\":7,\"special\":false}],\"apply\":0,\"branch\":\"3\"}', 1, 3500, 3500, '2018-10-15 04:08:41'),
(33, '18101518104', 'Enrollment', '{\"enrolled\":[{\"course\":10,\"special\":false}],\"apply\":0,\"branch\":\"3\"}', 1, 10000, 10000, '2018-10-15 04:11:03'),
(34, '1810151413010', 'Enrollment', '{\"enrolled\":[{\"course\":5,\"special\":false}],\"apply\":0,\"branch\":\"4\"}', 1, 14000, 14000, '2018-10-15 04:15:05'),
(35, '181015811116', 'Enrollment', '{\"enrolled\":[{\"course\":9,\"special\":false}],\"apply\":0,\"branch\":\"4\"}', 1, 7500, 7500, '2018-10-15 04:20:20'),
(36, '18101571013', 'Enrollment', '{\"enrolled\":[{\"course\":8,\"special\":false}],\"apply\":0,\"branch\":\"4\"}', 1, 5000, 5000, '2018-10-15 04:22:22'),
(37, '1810156260', 'Enrollment', '{\"enrolled\":[{\"course\":1,\"special\":false}],\"apply\":0,\"branch\":\"3\"}', 2, 3500, 3500, '2018-10-15 04:22:57'),
(38, '18101551553', 'Enrollment', '{\"enrolled\":[{\"course\":7,\"special\":false}],\"apply\":0,\"branch\":\"4\"}', 1, 3500, 3500, '2018-10-15 04:24:38'),
(39, '181015111266', 'Enrollment', '{\"enrolled\":[{\"course\":1,\"special\":false}],\"apply\":0,\"branch\":\"4\"}', 1, 3500, 3500, '2018-10-15 04:28:07'),
(40, '1810159933', 'Enrollment', '{\"enrolled\":[{\"course\":2,\"special\":false}],\"apply\":0,\"branch\":\"3\"}', 2, 4900, 4900, '2018-10-15 04:30:15'),
(41, '181015615315', 'Enrollment', '{\"enrolled\":[{\"course\":4,\"special\":false}],\"apply\":0,\"branch\":\"5\"}', 1, 10500, 10500, '2018-10-15 04:38:11'),
(42, '181015127412', 'Enrollment', '{\"enrolled\":[{\"course\":5,\"special\":false}],\"apply\":0,\"branch\":\"5\"}', 1, 14000, 14000, '2018-10-15 04:41:45'),
(43, '1810156121412', 'Enrollment', '{\"enrolled\":[{\"course\":3,\"special\":false}],\"apply\":0,\"branch\":\"5\"}', 1, 7000, 7000, '2018-10-15 04:44:00'),
(44, '18101551092', 'Enrollment, Apply-2', '{\"enrolled\":[{\"course\":2,\"special\":false}],\"apply\":2,\"branch\":\"5\"}', 1, 7400, 7400, '2018-10-15 04:46:13'),
(45, '181015801513', 'Enrollment', '{\"enrolled\":[{\"course\":8,\"special\":false}],\"apply\":0,\"branch\":\"5\"}', 1, 5000, 5000, '2018-10-15 04:48:20'),
(46, '181015313915', 'Enrollment', '{\"enrolled\":[{\"course\":8,\"special\":false}],\"apply\":0,\"branch\":\"5\"}', 1, 5000, 5000, '2018-10-15 04:51:03'),
(47, '18101581206', 'Enrollment, Apply-3', '{\"enrolled\":[{\"course\":9,\"special\":false}],\"apply\":3,\"branch\":\"1\"}', 1, 10200, 0, '2018-10-15 04:53:12'),
(48, '181015510011', 'Enrollment', '{\"enrolled\":[{\"course\":7,\"special\":false}],\"apply\":0,\"branch\":\"1\"}', 1, 3500, 0, '2018-10-15 04:55:09'),
(49, '181015157515', 'Enrollment, Apply-2', '{\"enrolled\":[{\"course\":5,\"special\":false}],\"apply\":2,\"branch\":\"1\"}', 1, 16500, 0, '2018-10-15 04:57:00'),
(50, '181015251315', 'Enrollment, Apply-3', '{\"enrolled\":[{\"course\":4,\"special\":true}],\"apply\":3,\"branch\":\"1\"}', 1, 23700, 0, '2018-10-15 05:00:09'),
(51, '18101501303', 'Enrollment, Apply-2', '{\"enrolled\":[{\"course\":2,\"special\":false}],\"apply\":2,\"branch\":\"1\"}', 1, 7400, 0, '2018-10-15 05:02:02'),
(52, '181015211015', 'Enrollment, Apply-3', '{\"enrolled\":[{\"course\":7,\"special\":true}],\"apply\":3,\"branch\":\"1\"}', 1, 9700, 0, '2018-10-15 05:05:01'),
(53, '18101531132', 'Enrollment', '{\"enrolled\":[{\"course\":6,\"special\":false}],\"apply\":0,\"branch\":\"3\"}', 1, 2500, 2500, '2018-10-15 05:05:32'),
(54, '1810156534', 'Enrollment', '{\"enrolled\":[{\"course\":7,\"special\":false}],\"apply\":0,\"branch\":\"3\"}', 1, 3500, 3500, '2018-10-15 05:08:45'),
(55, '18101561021', 'Enrollment', '{\"enrolled\":[{\"course\":1,\"special\":false}],\"apply\":0,\"branch\":\"4\"}', 2, 3500, 3500, '2018-10-15 05:21:14'),
(56, '181015610104', 'Enrollment', '{\"enrolled\":[{\"course\":7,\"special\":false}],\"apply\":0,\"branch\":\"4\"}', 2, 3500, 3500, '2018-10-15 05:27:33'),
(57, '181015212815', 'Enrollment', '{\"enrolled\":[{\"course\":6,\"special\":false}],\"apply\":0,\"branch\":\"4\"}', 1, 2500, 2500, '2018-10-15 05:35:43'),
(58, '18101590101', 'Enrollment', '{\"enrolled\":[{\"course\":7,\"special\":false}],\"apply\":0,\"branch\":\"4\"}', 1, 3500, 3500, '2018-10-15 05:39:51'),
(59, '1810154635', 'Enrollment', '{\"enrolled\":[{\"course\":1,\"special\":false}],\"apply\":0,\"branch\":\"5\"}', 2, 3500, 3500, '2018-10-15 05:44:33'),
(60, '181015106611', 'Enrollment', '{\"enrolled\":[{\"course\":2,\"special\":false}],\"apply\":0,\"branch\":\"5\"}', 2, 4900, 4900, '2018-10-15 05:47:25'),
(61, '181015100611', 'Enrollment', '{\"enrolled\":[{\"course\":6,\"special\":false}],\"apply\":0,\"branch\":\"5\"}', 1, 2500, 2500, '2018-10-15 05:53:54'),
(62, '18101544813', 'Enrollment', '{\"enrolled\":[{\"course\":7,\"special\":false}],\"apply\":0,\"branch\":\"5\"}', 1, 3500, 3500, '2018-10-15 05:56:56');

--
-- Dumping data for table `accounttype`
--

INSERT INTO `accounttype` (`id`, `title`, `permission`) VALUES
(1, 'admin', '----'),
(2, 'instructor', '-----'),
(3, 'student', '-------'),
(4, 'branch_admin', '-----');

--
-- Dumping data for table `admin`
--

INSERT INTO `admin` (`id`, `userInfo`, `branchID`, `permission`) VALUES
(1, 1, 1, 1),
(2, 31, 2, 1),
(3, 32, 3, 1),
(4, 33, 4, 1),
(5, 34, 5, 1);

--
-- Dumping data for table `announcement`
--

INSERT INTO `announcement` (`id`, `title`, `message`, `dateFrom`, `status`) VALUES
(1, 'PROMO (Avail Now)!!!', 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam vero doloribus accusantium corporis, ipsam error dolorum! At laboriosam illo itaque ea et inventore fugit animi ratione! Fuga dicta facilis at. Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam vero doloribus accusantium corporis, ipsam error dolorum! At laboriosam illo itaque ea et inventore fugit animi ratione! Fuga dicta facilis at', '2018-09-16', 1),
(2, '20% OFF FOR THE FIRST TEN CUSTOMERS!', 'This promo is only valid for students enrolled in SED-Quezon City (Main). Valid until next week (9/23/18)', '2018-09-16', 1);

--
-- Dumping data for table `branch`
--

INSERT INTO `branch` (`id`, `address`, `telno`, `name`, `purgeFlag`) VALUES
(1, 'Mayon St. _Cor. Maria Clara, _Quezon City_1108_NCR', '741-7185/', 'Quezon City', 1),
(2, 'First Level Market! Market! Fort Bonifacio Taguig Global City', '844-7734', 'Taguig City', 1),
(3, 'Shopwise Cubao, Gen. Aguinaldo Ave., Socorro, Quezon City', '425-7383', 'Cubao, Quezon City', 1),
(4, 'Fortunata Bldg., 663 Q. Avenue between Araneta Ave., and Sto. Domingo ', '938-1236', 'Q. Ave., Quezon City', 1),
(5, 'Cartimar Shopping Center, Rm. 1A Pasay Taft (between Libertad and Buendia)', '833-2043', 'Pasay City', 1);

--
-- Dumping data for table `course`
--

INSERT INTO `course` (`id`, `description`, `carType`, `amount`, `days`, `status`) VALUES
(1, '', 'A', 3500, 5, 1),
(2, '', 'A', 4900, 7, 1),
(3, '', 'A', 7000, 10, 1),
(4, '', 'A', 10500, 15, 1),
(5, '', 'A', 14000, 20, 1),
(6, '', 'M', 2500, 5, 1),
(7, '', 'M', 3500, 7, 1),
(8, '', 'M', 5000, 10, 1),
(9, '', 'M', 7500, 15, 1),
(10, '', 'M', 10000, 20, 1);

--
-- Dumping data for table `course_enrolled`
--

INSERT INTO `course_enrolled` (`id`, `enrollmentID`, `courseID`, `branch`, `selectedLesson`, `special`, `dateEnrolled`, `paid`, `status`) VALUES
(1, 1, 3, 1, '[]', 0, '2018-10-15 14:02:04', 1, 1),
(2, 2, 5, 1, '[]', 0, '2018-10-15 14:20:56', 1, 1),
(3, 3, 1, 1, '[]', 0, '2018-10-15 14:35:36', 1, 1),
(4, 4, 4, 1, '[]', 0, '2018-10-15 14:37:43', 1, 1),
(5, 5, 4, 1, '[]', 0, '2018-10-08 15:00:14', 1, 1),
(6, 6, 3, 1, '[]', 0, '2018-10-06 15:20:04', 1, 1),
(7, 7, 2, 1, '[]', 0, '2018-10-06 15:29:34', 1, 1),
(8, 8, 2, 1, '[]', 0, '2018-10-06 15:36:22', 1, 1),
(9, 9, 9, 1, '[]', 0, '2018-10-13 15:41:13', 1, 1),
(10, 10, 8, 1, '[]', 0, '2018-10-10 15:50:35', 1, 1),
(11, 11, 7, 1, '[]', 0, '2018-10-08 15:57:59', 1, 1),
(12, 12, 7, 1, '[]', 0, '2018-10-13 16:01:56', 1, 1),
(13, 13, 6, 1, '[]', 0, '2018-10-13 16:08:11', 1, 1),
(14, 14, 7, 1, '[]', 0, '2018-10-13 16:08:24', 1, 1),
(15, 15, 7, 1, '[]', 0, '2018-09-15 23:54:40', 1, 0),
(16, 16, 9, 1, '[]', 0, '2018-09-03 02:43:21', 1, 1);

--
-- Dumping data for table `enrollment`
--

INSERT INTO `enrollment` (`id`, `studID`, `accountID`, `date_enrolled`, `status`) VALUES
(1, '2018-0035', '181015145158', '2018-10-15 06:02:04', 1),
(2, '2018-0036', '181015157515', '2018-10-15 06:20:56', 1),
(3, '2018-0037', '18101510235', '2018-10-15 06:35:36', 1),
(4, '2018-0038', '18101532156', '2018-10-15 06:37:43', 1),
(5, '2018-0039', '181015251315', '2018-10-15 07:00:14', 1),
(6, '2018-0040', '181015812151', '2018-10-15 07:20:04', 1),
(7, '2018-0041', '18101531093', '2018-10-15 07:29:34', 1),
(8, '2018-0042', '18101501303', '2018-10-15 07:36:22', 1),
(9, '2018-0043', '18101581206', '2018-10-15 07:41:13', 1),
(10, '2018-0044', '1810151414610', '2018-10-15 07:50:35', 1),
(11, '2018-0045', '181015211015', '2018-10-15 07:57:59', 1),
(12, '2018-0046', '181015510011', '2018-10-15 08:01:56', 1),
(13, '2018-0047', '1810152112', '2018-10-15 08:08:11', 1),
(14, '2018-0048', '18101558116', '2018-10-15 08:08:24', 1),
(15, '2018-0049', '18101544912', '2018-10-15 15:54:39', 1),
(16, '2018-0050', '1810151551211', '2018-10-15 18:43:20', 1);

--
-- Dumping data for table `evaluation`
--

INSERT INTO `evaluation` (`id`, `studID`, `instID`, `comment`, `target`, `courseID`, `grade`, `dateEvaluated`) VALUES
(1, '2018-0049', 'INST-2018-0019', 'good job for a first-timer!', 1, 7, 46, '2018-09-15'),
(4, '2018-0049', 'INST-2018-0019', 'thank you sir! you are so cool!', 0, 3, 4, '2018-09-16'),
(5, '2018-0050', 'INST-2018-0020', 'you\'re gonna be one hella great driver, i know. keep learning! see u around, God bless you always!', 1, 9, 46, '2018-09-24'),
(6, '2018-0050', 'INST-2018-0020', 'thank you sir kahit medyo masungit ka, marami pa rin naman po akong natutunan sayo hehe', 0, 1, 5, '2018-09-24');

--
-- Dumping data for table `faq`
--

INSERT INTO `faq` (`id`, `faqLabelID`, `question`, `answer`, `status`) VALUES
(1, 1, 'How long will the branch I enrolled in wait for me after I submit my enrollment form online?', 'Our system automatically removes all enrollment form that exceeds one week upon its submission. Don\'t worry, we will email you two days before the one week deadline to make sure you don\'t forget about it.', 1),
(2, 3, 'Can I choose specific lessons per course?', 'Yes, but only if you\'ve been our student at least once. For choosing of specific lessons, please enroll with your account.', 1),
(3, 1, 'What are the requirements for enrollment?', 'Please visit the [COURSES] tab for more details.', 1),
(4, 2, 'What should I bring (requirements) for every driving lesson appointment?', 'It is required to have with you your Student Driver\'s Permit or any Philippines Driver\'s License for every appointment. You may bring your Student ID, however, it is not required.', 1);

--
-- Dumping data for table `faqlabel`
--

INSERT INTO `faqlabel` (`id`, `label`, `status`) VALUES
(1, 'Enrollment', 1),
(2, 'Driving Appointments', 1),
(3, 'Courses and Lessons', 1),
(4, 'Scheduling', 1),
(5, 'Licensing Application Assistance', 1),
(6, 'Payment', 1),
(7, 'Others', 1);

--
-- Dumping data for table `grades`
--

INSERT INTO `grades` (`id`, `instID`, `studID`, `lessonID`, `grade`, `comment`, `courseID`, `schedID`) VALUES
(1, 'INST-2018-0019', '2018-0035', 1, 5, 'excellent', 3, 2),
(2, 'INST-2018-0019', '2018-0035', 2, 5, 'excellent', 3, 3),
(3, 'INST-2018-0019', '2018-0035', 3, 4, 'Very Good', 3, 10),
(4, 'INST-2018-0019', '2018-0035', 4, 5, 'excellent', 3, 9),
(5, 'INST-2018-0019', '2018-0035', 5, 3, 'good', 3, 8),
(6, 'INST-2018-0019', '2018-0035', 6, 3, 'good', 3, 6),
(7, 'INST-2018-0019', '2018-0035', 7, 4, 'Very Good', 3, 7),
(8, 'INST-2018-0019', '2018-0035', 8, 4, 'Very Good', 3, 4),
(9, 'INST-2018-0019', '2018-0035', 9, 5, 'excellent', 3, 4),
(10, 'INST-2018-0019', '2018-0036', 1, 5, 'excellent', 5, 13),
(11, 'INST-2018-0019', '2018-0036', 2, 4, 'very good', 5, 15),
(12, 'INST-2018-0019', '2018-0036', 3, 5, 'excellent', 5, 19),
(13, 'INST-2018-0019', '2018-0036', 4, 3, 'good', 5, 11),
(14, 'INST-2018-0019', '2018-0036', 5, 4, 'very good', 5, 18),
(15, 'INST-2018-0020', '2018-0037', 1, 3, 'good', 1, 33),
(16, 'INST-2018-0020', '2018-0037', 2, 4, 'very good', 1, 33),
(17, 'INST-2018-0020', '2018-0037', 3, 4, 'very good', 1, 34),
(18, 'INST-2018-0020', '2018-0037', 4, 5, 'excellent', 1, 34),
(19, 'INST-2018-0020', '2018-0037', 5, 4, 'very good', 1, 35),
(20, 'INST-2018-0020', '2018-0037', 6, 4, 'very good', 1, 35),
(21, 'INST-2018-0020', '2018-0037', 7, 5, 'excellent', 1, 36),
(22, 'INST-2018-0020', '2018-0037', 8, 5, 'excellent', 1, 36),
(23, 'INST-2018-0019', '2018-0038', 1, 4, 'very good', 4, 42),
(24, 'INST-2018-0019', '2018-0038', 2, 4, 'very good', 4, 40),
(25, 'INST-2018-0019', '2018-0038', 3, 4, 'very good', 4, 44),
(26, 'INST-2018-0019', '2018-0038', 4, 5, 'excellent', 4, 38),
(27, 'INST-2018-0019', '2018-0038', 5, 5, 'excellent', 4, 39),
(28, 'INST-2018-0019', '2018-0038', 6, 5, 'excellent', 4, 41),
(29, 'INST-2018-0019', '2018-0038', 7, 4, 'very good', 4, 43),
(30, 'INST-2018-0019', '2018-0038', 8, 3, 'good', 4, 45),
(31, 'INST-2018-0019', '2018-0038', 9, 5, 'excellent', 4, 49),
(32, 'INST-2018-0020', '2018-0039', 1, 5, 'excellent', 4, 55),
(33, 'INST-2018-0020', '2018-0039', 2, 5, 'excellent', 4, 56),
(34, 'INST-2018-0020', '2018-0039', 3, 4, 'very good', 4, 57),
(35, 'INST-2018-0020', '2018-0039', 4, 4, 'very good', 4, 58),
(36, 'INST-2018-0020', '2018-0039', 5, 3, 'good', 4, 59),
(37, 'INST-2018-0020', '2018-0039', 6, 4, 'very good', 4, 63),
(38, 'INST-2018-0020', '2018-0040', 1, 4, 'very good', 3, 71),
(39, 'INST-2018-0020', '2018-0040', 2, 4, 'very good', 3, 72),
(40, 'INST-2018-0020', '2018-0040', 3, 5, 'excellent', 3, 73),
(41, 'INST-2018-0020', '2018-0040', 4, 5, 'excellent', 3, 75),
(42, 'INST-2018-0020', '2018-0040', 5, 4, 'very good', 3, 74),
(43, 'INST-2018-0020', '2018-0040', 6, 5, 'excellent', 3, 76),
(44, 'INST-2018-0020', '2018-0040', 7, 3, 'good', 3, 77),
(45, 'INST-2018-0020', '2018-0040', 8, 4, 'very good', 3, 78),
(46, 'INST-2018-0021', '2018-0041', 1, 2, 'fair', 2, 80),
(47, 'INST-2018-0021', '2018-0041', 2, 1, 'poor', 2, 81),
(48, 'INST-2018-0021', '2018-0041', 3, 2, 'fair', 2, 82),
(49, 'INST-2018-0021', '2018-0041', 4, 1, 'poor', 2, 82),
(50, 'INST-2018-0021', '2018-0042', 1, 5, 'excellent', 2, 90),
(51, 'INST-2018-0021', '2018-0042', 2, 4, 'very good', 2, 91),
(52, 'INST-2018-0021', '2018-0042', 3, 4, 'very good', 2, 91),
(53, 'INST-2018-0021', '2018-0042', 4, 5, 'excellent', 2, 89),
(54, 'INST-2018-0021', '2018-0043', 1, 3, 'good', 9, 95),
(55, 'INST-2018-0022', '2018-0044', 1, 3, 'good', 8, 111),
(56, 'INST-2018-0022', '2018-0044', 2, 2, 'fair', 8, 112),
(57, 'INST-2018-0022', '2018-0044', 3, 3, 'good', 8, 113),
(58, 'INST-2018-0022', '2018-0044', 4, 2, 'fair', 8, 114),
(59, 'INST-2018-0022', '2018-0045', 1, 3, 'good', 7, 120),
(60, 'INST-2018-0022', '2018-0045', 2, 2, 'poor', 7, 120),
(61, 'INST-2018-0022', '2018-0045', 3, 3, 'fair', 7, 121),
(62, 'INST-2018-0022', '2018-0045', 4, 4, 'very good', 7, 121),
(63, 'INST-2018-0022', '2018-0045', 5, 5, 'excellent', 7, 122),
(64, 'INST-2018-0022', '2018-0045', 6, 5, 'excellent', 7, 124),
(65, 'INST-2018-0022', '2018-0046', 1, 4, 'very good', 7, 130),
(66, 'INST-2018-0023', '2018-0048', 1, 3, 'fair', 7, 139),
(67, 'INST-2018-0023', '2018-0047', 1, 3, 'fair', 6, 134),
(68, 'INST-2018-0023', '2018-0047', 2, 3, 'fair', 6, 134),
(69, 'INST-2018-0019', '2018-0049', 1, 5, 'wow', 7, 147),
(70, 'INST-2018-0019', '2018-0049', 2, 4, 'nice job', 7, 147),
(71, 'INST-2018-0019', '2018-0049', 3, 4, 'amazing ', 7, 148),
(72, 'INST-2018-0019', '2018-0049', 4, 5, 'amazing hijo', 7, 148),
(73, 'INST-2018-0019', '2018-0049', 5, 5, 'nice hanging', 7, 149),
(74, 'INST-2018-0019', '2018-0049', 6, 4, 'like a pro', 7, 150),
(75, 'INST-2018-0019', '2018-0049', 7, 5, 'wow!!', 7, 151),
(76, 'INST-2018-0019', '2018-0049', 8, 4, 'that was good', 7, 151),
(77, 'INST-2018-0019', '2018-0049', 9, 5, 'still good', 7, 152),
(78, 'INST-2018-0019', '2018-0049', 10, 5, 'nice one hijo', 7, 152),
(79, 'INST-2018-0020', '2018-0050', 1, 5, 'nice start! :) keep it up', 9, 153),
(80, 'INST-2018-0020', '2018-0050', 2, 5, 'you\'re doing great so far :)', 9, 154),
(81, 'INST-2018-0020', '2018-0050', 3, 4, 'so far so good, keep it up!!', 9, 155),
(82, 'INST-2018-0020', '2018-0050', 4, 4, 'good job, young lady', 9, 156),
(83, 'INST-2018-0020', '2018-0050', 5, 5, 'you\'ve done well again! :)', 9, 157),
(84, 'INST-2018-0020', '2018-0050', 6, 4, 'i was amazed for the nth time', 9, 158),
(85, 'INST-2018-0020', '2018-0050', 7, 4, 'you\'re so fearless. way to go, champ!', 9, 159),
(86, 'INST-2018-0020', '2018-0050', 8, 5, 'very good tiara:)', 9, 160),
(87, 'INST-2018-0020', '2018-0050', 9, 5, 'wow! consistent high marks. owo job well done!', 9, 161),
(88, 'INST-2018-0020', '2018-0050', 10, 5, 'wow! very surprising for a young lady like you :)', 9, 162);

--
-- Dumping data for table `instructor`
--

INSERT INTO `instructor` (`id`, `userInfo`, `license`, `licenseExp`, `educAttain`, `vacant`, `dateRegistered`, `dateRetired`, `status`) VALUES
('INST-2018-0019', 19, 'A01-11-1111', '2023-10-04', 6, '', '2018-10-04 04:28:53', NULL, 1),
('INST-2018-0020', 20, 'B01-01-9200', '2023-10-04', 6, '', '2018-10-04 04:30:24', NULL, 1),
('INST-2018-0021', 21, 'A21-01-9001', '2023-10-04', 6, '', '2018-10-04 04:31:57', NULL, 1),
('INST-2018-0022', 22, 'A12-01-0087', '2023-10-04', 6, '', '2018-10-04 04:33:26', NULL, 1),
('INST-2018-0023', 23, 'C12-01-0019', '2023-10-04', 6, '', '2018-10-04 04:36:16', NULL, 1),
('INST-2018-0024', 24, 'A01-11-1113', '2023-10-04', 6, '', '2018-10-04 04:38:18', NULL, 1),
('INST-2018-0027', 27, 'D01-01-2112', '2023-10-04', 6, '', '2018-10-04 04:43:16', NULL, 1),
('INST-2018-0028', 28, 'D01-01-1200', '2023-10-04', 6, '', '2018-10-04 07:29:51', NULL, 1),
('INST-2018-0029', 29, 'D02-01-9091', '2023-10-04', 6, '', '2018-10-04 07:34:02', NULL, 1),
('INST-2018-0030', 30, 'B02-02-9065', '2023-10-04', 6, '', '2018-10-04 07:35:32', NULL, 1);

--
-- Dumping data for table `lesson`
--

INSERT INTO `lesson` (`id`, `title`, `prerequisite`, `description`, `duration`, `purgeFlag`) VALUES
(1, 'Start and Stop', NULL, 'Master the starting and stopping of your car\'s engine before you hit the road.', 60, 1),
(2, 'Backing and Turning', NULL, 'Driving a vehicle in reverse direction in order to maneuver,', 60, 1),
(3, 'Road Crossing; Light Traffic', NULL, 'Giving way to the pedestrian on crossing with and without lights, crossing at intersection.', 60, 1),
(4, 'Maneuvering', NULL, 'A controlled change in movement or direction of a moving vehicle.', 60, 1),
(5, 'Hanging', NULL, 'You\'ll be able to prevent your car from rolling while you\'re on a hill or any elevated surface.', 60, 1),
(6, 'Garage Driving', NULL, 'Things you can do to avoid getting an accident in a parking garage or busy parking lot.', 60, 1),
(7, 'Parking', NULL, 'The act of stopping and disengaging a vehicle and leaving it unoccupied.', 60, 1),
(8, 'Highway Driving', NULL, 'Driving on a busy road with may lanes.', 60, 1),
(9, 'Heavy Traffic', NULL, 'Feel safe when driving on a traffic jam, and this might mean you need to drive a little slower than the flow of traffic.', 60, 1),
(10, 'Review', NULL, 'Reviewing all the past lesson tackled.', 60, 1);

--
-- Dumping data for table `license_apply_price`
--

INSERT INTO `license_apply_price` (`id`, `type`, `desc`, `price`, `status`) VALUES
(0, 'none', 'none', 0, 0),
(1, 'SDP', 'Student Driver\'s Permit', 500, 1),
(2, 'NonPro', 'Non-Professional License', 2500, 1),
(3, 'Pro', 'Professional License', 2700, 1),
(4, 'International', 'International License', 5000, 1);

--
-- Dumping data for table `other_info`
--

INSERT INTO `other_info` (`id`, `referenceID`, `data`, `status`) VALUES
(10, 19, '{\"avatar\":\"assets\\\\images\\\\image_upload\\\\19.jpeg\"}', 1),
(11, 20, '{\"avatar\":null}', 1),
(12, 21, '{\"avatar\":null}', 1),
(13, 22, '{\"avatar\":null}', 1),
(14, 23, '{\"avatar\":\"assets\\\\images\\\\image_upload\\\\23.png\"}', 1),
(15, 24, '{\"avatar\":null}', 1),
(16, 25, '{\"avatar\":null}', 1),
(17, 26, '{\"avatar\":null}', 1),
(18, 27, '{\"avatar\":null}', 1),
(19, 28, '{\"avatar\":null}', 1),
(20, 29, '{\"avatar\":null}', 1),
(21, 30, '{\"avatar\":null}', 1),
(22, 35, '{\"occupation\":\"Student\",\"guardian\":{\"name\":\"Emma Potter\",\"telno\":\"(+63)-917-599-8229\"},\"avatar\":\"assets\\\\images\\\\image_upload\\\\35.jpeg\"}', 1),
(23, 36, '{\"occupation\":\"Writer\",\"guardian\":{\"name\":\"Susana Bones\",\"telno\":\"(+63)-923-829-8392\"},\"avatar\":\"assets\\\\images\\\\image_upload\\\\36.jpeg\"}', 1),
(24, 37, '{\"occupation\":\"Student\",\"guardian\":{\"name\":\"Hennah Granger\",\"telno\":\"(+63)-988-782-8182\"},\"avatar\":\"assets\\\\images\\\\image_upload\\\\37.jpeg\"}', 1),
(25, 38, '{\"occupation\":\"Programmer\",\"guardian\":{\"name\":\"Salma Patil\",\"telno\":\"(+63)-986-767-5232\"},\"avatar\":\"assets\\\\images\\\\image_upload\\\\38.jpeg\"}', 1),
(26, 39, '{\"occupation\":\"Journalist\",\"guardian\":{\"name\":\"Josephine Macmillan\",\"telno\":\"(+63)-987-897-6899\"},\"avatar\":\"assets\\\\images\\\\image_upload\\\\39.jpeg\"}', 1),
(27, 40, '{\"occupation\":\"Analyst\",\"guardian\":{\"name\":\"Sapphire Brown\",\"telno\":\"(+63)-987-635-2721\"},\"avatar\":\"assets\\\\images\\\\image_upload\\\\40.jpeg\"}', 1),
(28, 41, '{\"occupation\":\"Student\",\"guardian\":{\"name\":\"Andrea Weasley\",\"telno\":\"(+63)-987-578-3932\"},\"avatar\":\"assets\\\\images\\\\image_upload\\\\41.jpeg\"}', 1),
(29, 42, '{\"occupation\":\"Developer\",\"guardian\":{\"name\":\"Akira Fetchley\",\"telno\":\"(+63)-989-789-8992\"},\"avatar\":\"assets\\\\images\\\\image_upload\\\\42.jpeg\"}', 1),
(30, 43, '{\"occupation\":\"Driver\",\"guardian\":{\"name\":\"Stephanie Cornfoot\",\"telno\":\"(+63)-986-574-7382\"},\"avatar\":\"assets\\\\images\\\\image_upload\\\\43.jpeg\"}', 1),
(31, 44, '{\"occupation\":\"Student\",\"guardian\":{\"name\":\"Seana Finnigan\",\"telno\":\"(+63)-980-383-8221\"},\"avatar\":\"assets\\\\images\\\\image_upload\\\\44.jpeg\"}', 1),
(32, 45, '{\"occupation\":\"Developer\",\"guardian\":{\"name\":\"Cynthia Rose\",\"telno\":\"(+63)-956-748-3938\"},\"avatar\":\"assets\\\\images\\\\image_upload\\\\45.jpeg\"}', 1),
(33, 46, '{\"occupation\":\"Student\",\"guardian\":{\"name\":\"Helen Abbott\",\"telno\":\"(+63)-926-543-5627\"},\"avatar\":\"assets\\\\images\\\\image_upload\\\\46.jpeg\"}', 1),
(34, 47, '{\"occupation\":\"Student\",\"guardian\":{\"name\":\"Dina Thomas\",\"telno\":\"(+63)-988-383-7833\"},\"avatar\":\"assets\\\\images\\\\image_upload\\\\47.jpeg\"}', 1),
(35, 48, '{\"occupation\":\"Student\",\"guardian\":{\"name\":\"Marky Longbottom\",\"telno\":\"(+63)-987-882-3435\"},\"avatar\":\"assets\\\\images\\\\image_upload\\\\48.jpeg\"}', 1),
(36, 49, '{\"occupation\":\"Student\",\"guardian\":{\"name\":\"Charisse Danforth\",\"telno\":\"(+63)-900-123-2136\"}}', 1),
(37, 50, '{\"occupation\":\"Singer\",\"guardian\":{\"name\":\"Tiaro Gold\",\"telno\":\"(+63)-982-300-4343\"}}', 1);

--
-- Dumping data for table `payment`
--

INSERT INTO `payment` (`id`, `transactionID`, `bill`, `pay`, `balance`, `datePay`) VALUES
(1, '181015145158', 7000, 7000, 0, '2018-10-15 06:01:59'),
(2, '181015157515', 16500, 16500, 0, '2018-10-15 06:20:55'),
(3, '18101510235', 3500, 3500, 0, '2018-10-15 06:35:34'),
(4, '18101532156', 21000, 21000, 0, '2018-10-15 06:37:42'),
(5, '181015251315', 23700, 23700, 0, '2018-10-15 07:00:12'),
(6, '181015812151', 7000, 7000, 0, '2018-10-15 07:20:03'),
(7, '18101531093', 4900, 4900, 0, '2018-10-15 07:29:32'),
(8, '18101501303', 7400, 7400, 0, '2018-10-15 07:36:21'),
(9, '18101581206', 10200, 10200, 0, '2018-10-15 07:41:12'),
(10, '1810151414610', 5000, 5000, 0, '2018-10-15 07:50:34'),
(11, '181015211015', 9700, 9700, 0, '2018-10-15 07:57:58'),
(12, '181015510011', 3500, 3500, 0, '2018-10-15 08:01:55'),
(13, '1810152112', 2500, 2500, 0, '2018-10-15 08:08:09'),
(14, '18101558116', 3500, 3500, 0, '2018-10-15 08:08:23'),
(15, '18101544912', 4000, 4000, 0, '2018-10-15 15:54:35'),
(16, '1810151551211', 10200, 10200, 0, '2018-10-15 18:43:16');

--
-- Dumping data for table `payment_slip`
--

INSERT INTO `payment_slip` (`id`, `transactionID`, `filepath`, `date_submit`, `date_approved`) VALUES
(1, '181015100411', 'public\\images\\image_upload\\181016ad82904705.png', '2018-10-15 18:28:53', NULL),
(2, '181015151416', 'public\\images\\image_upload\\181016a2cf9a34f6.png', '2018-10-15 18:31:08', NULL);

--
-- Dumping data for table `preregstudent`
--

INSERT INTO `preregstudent` (`id`, `data`, `dateSubmit`, `status`) VALUES
(1, '{\"info\":{\"fullname\":\"Zhayrine_Buena_Oznagal\",\"birthdate\":\"1997-12-12\",\"birthplace\":\"Blk 43 Lot 1 Quezon City\",\"address\":\"Blk 43 Lot 1 Quezon City\",\"telno\":\"(+63)-956-221-9201\",\"occupation\":\"Student\",\"email\":\"zhayrineoznagal@gmail.com\",\"civilStatus\":\"Single\",\"sex\":\"Female\",\"guardian\":{\"name\":\"Wilmas Laganzo\",\"telno\":\"(+63)-976-882-9111\"}},\"course\":[1],\"branch\":\"1\",\"payment\":1,\"applyLicense\":0,\"special\":{\"course\":[],\"location\":null},\"transaction\":{\"transaction\":\"Enrollment\",\"amount\":0,\"ORnum\":\"18101591322\",\"dataID\":1},\"preference\":{\"vehicle\":\"Altis Toyota\",\"schedule\":[\"1\",\"4\",\"7\"]}}', '2018-10-11 02:54:20', 1),
(3, '{\"info\":{\"fullname\":\"Vanessa Anne_Sy_Hudgens\",\"birthdate\":\"1999-03-21\",\"birthplace\":\"Blk 12 Lot 2 Quezon City\",\"address\":\"Blk 12 Lot 2 Quezon City\",\"telno\":\"(+63)-909-888-2912\",\"occupation\":\"Student\",\"email\":\"vanessa@gmail.com\",\"civilStatus\":\"Single\",\"sex\":\"Female\",\"guardian\":{\"name\":\"Vandam Hudgens\",\"telno\":\"(+63)-928-829-1201\"}},\"course\":[3],\"branch\":\"1\",\"payment\":2,\"applyLicense\":0,\"special\":{\"course\":[],\"location\":null},\"transaction\":{\"transaction\":\"Enrollment\",\"amount\":0,\"ORnum\":\"1810151110142\",\"dataID\":3},\"preference\":{\"vehicle\":\"Vios Toyota\",\"schedule\":[\"5\",\"2\",\"6\",\"3\"]}}', '2018-10-12 03:01:15', 1),
(4, '{\"info\":{\"fullname\":\"Yvette_Custodio_Tatel\",\"birthdate\":\"1998-07-30\",\"birthplace\":\"Mandaluyong City\",\"address\":\"San Jose Del Monte, Bulacan\",\"telno\":\"(+63)-919-295-4156\",\"occupation\":\"Student\",\"email\":\"yvette@gmail .com\",\"civilStatus\":\"Single\",\"sex\":\"Female\",\"guardian\":{\"name\":\"Jemma C. Tatel\",\"telno\":\"(+63)-956-228-7559\"}},\"course\":[1],\"branch\":\"2\",\"payment\":2,\"applyLicense\":0,\"special\":{\"course\":[],\"location\":null},\"transaction\":{\"transaction\":\"Enrollment\",\"amount\":0,\"ORnum\":\"1810151131115\",\"dataID\":4},\"preference\":{\"vehicle\":\"Altis Toyota\",\"schedule\":[\"1\",\"2\"]}}', '2018-10-15 03:02:33', 1),
(5, '{\"info\":{\"fullname\":\"Troy_Casper_Bolton\",\"birthdate\":\"1996-12-31\",\"birthplace\":\"Quezon City\",\"address\":\"Quezon City\",\"telno\":\"(+63)-992-312-3123\",\"occupation\":\"Writer\",\"email\":\"troy@gmail.com\",\"civilStatus\":\"Married\",\"sex\":\"Male\",\"guardian\":{\"name\":\"Thea Bolton\",\"telno\":\"(+63)-923-123-1233\"}},\"course\":[2],\"branch\":\"1\",\"payment\":2,\"applyLicense\":0,\"special\":{\"course\":[],\"location\":null},\"transaction\":{\"transaction\":\"Enrollment\",\"amount\":0,\"ORnum\":\"181015100411\",\"dataID\":5},\"preference\":{\"vehicle\":\"Lexus Toyota\",\"schedule\":[\"2\",\"5\",\"3\",\"6\",\"1\",\"4\"]}}', '2018-10-15 03:03:18', 0),
(6, '{\"info\":{\"fullname\":\"Aristotle_Custodio_Tatel\",\"birthdate\":\"1997-10-15\",\"birthplace\":\"Bulacan\",\"address\":\"#15 Guyabano St., Novaliches, Quezon City\",\"telno\":\"(+63)-919-652-1587\",\"occupation\":\"Student\",\"email\":\"aris@gmail.com\",\"civilStatus\":\"Single\",\"sex\":\"Male\",\"guardian\":{\"name\":\"Jemma C. Tatel\",\"telno\":\"(+63)-927-564-7805\"}},\"course\":[2],\"branch\":\"2\",\"payment\":2,\"applyLicense\":0,\"special\":{\"course\":[],\"location\":null},\"transaction\":{\"transaction\":\"Enrollment\",\"amount\":0,\"ORnum\":\"181015413310\",\"dataID\":6},\"preference\":{\"vehicle\":\"Lexus Toyota\",\"schedule\":[\"4\",\"5\"]}}', '2018-10-15 03:07:36', 1),
(7, '{\"info\":{\"fullname\":\"Harry _James_Potter\",\"birthdate\":\"1996-10-10\",\"birthplace\":\"Makati City\",\"address\":\"Barangay Poblacion, Makati City\",\"telno\":\"(+63)-927-259-7427\",\"occupation\":\"Student\",\"email\":\"harryjamespotter@gmail.com\",\"civilStatus\":\"Single\",\"sex\":\"Male\",\"guardian\":{\"name\":\"Emma Potter\",\"telno\":\"(+63)-917-599-8229\"}},\"course\":[3],\"branch\":\"1\",\"payment\":1,\"applyLicense\":0,\"special\":{\"course\":[],\"location\":null},\"transaction\":{\"transaction\":\"Enrollment\",\"amount\":0,\"ORnum\":\"181015145158\",\"dataID\":7},\"preference\":{\"vehicle\":\"Altis Toyota\",\"schedule\":[\"1\",\"4\",\"5\",\"2\"]}}', '2018-10-15 03:30:06', 2),
(8, '{\"info\":{\"fullname\":\"Hermione __Granger\",\"birthdate\":\"1996-07-18\",\"birthplace\":\"Makati City\",\"address\":\"Barangay Pitogo, Makati City\",\"telno\":\"(+63)-987-263-7281\",\"occupation\":\"Student\",\"email\":\"hermionegranger@gmail.com\",\"civilStatus\":\"Single\",\"sex\":\"Female\",\"guardian\":{\"name\":\"Hennah Granger\",\"telno\":\"(+63)-988-782-8182\"}},\"course\":[1],\"branch\":\"1\",\"payment\":1,\"applyLicense\":0,\"special\":{\"course\":[],\"location\":null},\"transaction\":{\"transaction\":\"Enrollment\",\"amount\":0,\"ORnum\":\"18101510235\",\"dataID\":8},\"preference\":{\"vehicle\":\"Lexus Toyota\",\"schedule\":[\"2\",\"5\"]}}', '2018-10-15 03:32:10', 2),
(9, '{\"info\":{\"fullname\":\"Ron__Weasley\",\"birthdate\":\"1996-10-08\",\"birthplace\":\"Taguig City\",\"address\":\"Barangay Pinagsama, Taguig City\",\"telno\":\"(+63)-973-_62-7382\",\"occupation\":\"Student\",\"email\":\"ronweasley@gmail.com\",\"civilStatus\":\"Single\",\"sex\":\"Male\",\"guardian\":{\"name\":\"Andrea Weasley\",\"telno\":\"(+63)-987-578-3932\"}},\"course\":[2],\"branch\":\"1\",\"payment\":1,\"applyLicense\":0,\"special\":{\"course\":[],\"location\":null},\"transaction\":{\"transaction\":\"Enrollment\",\"amount\":0,\"ORnum\":\"18101531093\",\"dataID\":9},\"preference\":{\"vehicle\":\"Lexus Toyota\",\"schedule\":[\"2\",\"5\",\"3\"]}}', '2018-10-04 03:35:15', 0),
(10, '{\"info\":{\"fullname\":\"Jemma_Custodio_Tatel\",\"birthdate\":\"1995-04-08\",\"birthplace\":\"Bulacan\",\"address\":\"San Jose Del Monte, Bulacan\",\"telno\":\"(+63)-921-652-8974\",\"occupation\":\"Statistician\",\"email\":\"jemma@gmail.com\",\"civilStatus\":\"Single\",\"sex\":\"Female\",\"guardian\":{\"name\":\"Jem C. Tatel\",\"telno\":\"(+63)-927-659-8255\"}},\"course\":[3],\"branch\":\"2\",\"payment\":1,\"applyLicense\":0,\"special\":{\"course\":[],\"location\":null},\"transaction\":{\"transaction\":\"Enrollment\",\"amount\":0,\"ORnum\":\"18101501109\",\"dataID\":10},\"preference\":{\"vehicle\":\"Vios Toyota\",\"schedule\":[\"7\",\"6\"]}}', '2018-10-15 03:37:28', 1),
(11, '{\"info\":{\"fullname\":\"Seamus__Finnigan\",\"birthdate\":\"1995-02-15\",\"birthplace\":\"Taguig City\",\"address\":\"Barangay Ususan, Taguig City\",\"telno\":\"(+63)-986-567-3822\",\"occupation\":\"Student\",\"email\":\"seamus@gmail.com\",\"civilStatus\":\"Single\",\"sex\":\"Male\",\"guardian\":{\"name\":\"Seana Finnigan\",\"telno\":\"(+63)-980-383-8221\"}},\"course\":[8],\"branch\":\"1\",\"payment\":1,\"applyLicense\":0,\"special\":{\"course\":[],\"location\":null},\"transaction\":{\"transaction\":\"Enrollment\",\"amount\":0,\"ORnum\":\"1810151414610\",\"dataID\":11},\"preference\":{\"vehicle\":\"Civic Sedan Honda\",\"schedule\":[\"2\",\"5\",\"3\"]}}', '2018-10-09 03:37:35', 2),
(12, '{\"info\":{\"fullname\":\"Dean __Thomas\",\"birthdate\":\"1998-08-16\",\"birthplace\":\"Dasmariñas City\",\"address\":\"General Trias, Cavite\",\"telno\":\"(+63)-988-296-9228\",\"occupation\":\"Student\",\"email\":\"dean@gmail.com\",\"civilStatus\":\"Single\",\"sex\":\"Male\",\"guardian\":{\"name\":\"Dina Thomas\",\"telno\":\"(+63)-988-383-7833\"}},\"course\":[6],\"branch\":\"1\",\"payment\":1,\"applyLicense\":0,\"special\":{\"course\":[],\"location\":null},\"transaction\":{\"transaction\":\"Enrollment\",\"amount\":0,\"ORnum\":\"1810152112\",\"dataID\":12},\"preference\":{\"vehicle\":\"Corolla AE111 Toyota\",\"schedule\":[\"1\",\"4\",\"6\"]}}', '2018-10-12 03:40:20', 2),
(13, '{\"info\":{\"fullname\":\"Neville _Anne_Longbottom\",\"birthdate\":\"1993-04-15\",\"birthplace\":\"Taguig City\",\"address\":\"Project 8, Quezon City\",\"telno\":\"(+63)-923-833-2234\",\"occupation\":\"Student\",\"email\":\"neville@gmail.com\",\"civilStatus\":\"Single\",\"sex\":\"Female\",\"guardian\":{\"name\":\"Marky Longbottom\",\"telno\":\"(+63)-987-882-3435\"}},\"course\":[7],\"branch\":\"1\",\"payment\":1,\"applyLicense\":0,\"special\":{\"course\":[],\"location\":null},\"transaction\":{\"transaction\":\"Enrollment\",\"amount\":0,\"ORnum\":\"18101558116\",\"dataID\":13},\"preference\":{\"vehicle\":\"Corolla AE111 Toyota\",\"schedule\":[\"6\",\"7\"]}}', '2018-10-12 03:42:45', 2),
(14, '{\"info\":{\"fullname\":\"Joel_Custodio_Tatel\",\"birthdate\":\"1985-09-12\",\"birthplace\":\"Makati City\",\"address\":\"West Rembo, Makati City\",\"telno\":\"(+63)-949-697-8585\",\"occupation\":\"Professor\",\"email\":\"joel@gmail.com\",\"civilStatus\":\"Single\",\"sex\":\"Male\",\"guardian\":{\"name\":\"Jemma C. Tatel\",\"telno\":\"(+63)-921-864-2995\"}},\"course\":[6],\"branch\":\"2\",\"payment\":1,\"applyLicense\":0,\"special\":{\"course\":[],\"location\":null},\"transaction\":{\"transaction\":\"Enrollment\",\"amount\":0,\"ORnum\":\"18101596100\",\"dataID\":14},\"preference\":{\"vehicle\":\"Accord Honda\",\"schedule\":[\"1\",\"6\"]}}', '2018-10-15 03:43:08', 1),
(15, '{\"info\":{\"fullname\":\"Pavarti__Patil\",\"birthdate\":\"1993-08-17\",\"birthplace\":\"Bacoor City, Cavite\",\"address\":\"Bacoor City, Cavite\",\"telno\":\"(+63)-903-837-2722\",\"occupation\":\"Programmer\",\"email\":\"pavarti@gmail.com\",\"civilStatus\":\"Married\",\"sex\":\"Male\",\"guardian\":{\"name\":\"Salma Patil\",\"telno\":\"(+63)-986-767-5232\"}},\"course\":[4],\"branch\":\"1\",\"payment\":1,\"applyLicense\":0,\"special\":{\"course\":[\"4\"],\"location\":\"#18 guyabano st. brgy. capri novaliches quezon city\"},\"transaction\":{\"transaction\":\"Enrollment\",\"amount\":0,\"ORnum\":\"18101532156\",\"dataID\":15},\"preference\":{\"vehicle\":\"Lexus Toyota\",\"schedule\":[\"7\",\"6\",\"5\"]}}', '2018-10-15 03:46:37', 2),
(16, '{\"info\":{\"fullname\":\"Troy_Casper_Bolton\",\"birthdate\":\"1992-12-31\",\"birthplace\":\"CSJDM, Bulacan\",\"address\":\"CSJDM, Bulacan\",\"telno\":\"(+63)-912-323-3293\",\"occupation\":\"Student\",\"email\":\"troy@gmail.com\",\"civilStatus\":\"Single\",\"sex\":\"Male\",\"guardian\":{\"name\":\"Thea Bolton\",\"telno\":\"(+63)-932-103-2103\"}},\"course\":[2],\"branch\":\"1\",\"payment\":2,\"applyLicense\":0,\"special\":{\"course\":[],\"location\":null},\"transaction\":{\"transaction\":\"Enrollment\",\"amount\":0,\"ORnum\":\"181015151416\",\"dataID\":16},\"preference\":{\"vehicle\":\"Lexus Toyota\",\"schedule\":[\"1\",\"4\",\"7\",\"5\"]}}', '2018-10-12 03:48:45', 1),
(17, '{\"info\":{\"fullname\":\"Merlinda_Ruance_Custodio\",\"birthdate\":\"1987-01-14\",\"birthplace\":\"Taguig City\",\"address\":\"Taguig City \",\"telno\":\"(+63)-921-689-8274\",\"occupation\":\"GIS Specialist\",\"email\":\"merlinda@gmail.com\",\"civilStatus\":\"Single\",\"sex\":\"Male\",\"guardian\":{\"name\":\"Jemma C. Tatel\",\"telno\":\"(+63)-975-566-6175\"}},\"course\":[7],\"branch\":\"2\",\"payment\":1,\"applyLicense\":0,\"special\":{\"course\":[],\"location\":null},\"transaction\":{\"transaction\":\"Enrollment\",\"amount\":0,\"ORnum\":\"18101515753\",\"dataID\":17},\"preference\":{\"vehicle\":\"Carina AT210 Toyota\",\"schedule\":[\"4\",\"6\"]}}', '2018-10-15 03:49:36', 1),
(18, '{\"info\":{\"fullname\":\"Scarlet_Lavender_Brown\",\"birthdate\":\"1991-06-05\",\"birthplace\":\"San Pedro, Laguna\",\"address\":\"Commonwealth, Quezon City\",\"telno\":\"(+63)-987-363-2212\",\"occupation\":\"Analyst\",\"email\":\"lavenderbrown@gmail.com\",\"civilStatus\":\"Married\",\"sex\":\"Female\",\"guardian\":{\"name\":\"Sapphire Brown\",\"telno\":\"(+63)-987-635-2721\"}},\"course\":[3],\"branch\":\"1\",\"payment\":1,\"applyLicense\":0,\"special\":{\"course\":[],\"location\":null},\"transaction\":{\"transaction\":\"Enrollment\",\"amount\":0,\"ORnum\":\"181015812151\",\"dataID\":18},\"preference\":{\"vehicle\":\"Lexus Toyota\",\"schedule\":[\"1\",\"4\"]}}', '2018-10-05 03:49:51', 0),
(19, '{\"info\":{\"fullname\":\"Sharpay_Santos_Evans\",\"birthdate\":\"1982-04-22\",\"birthplace\":\"Quezon City\",\"address\":\"Quezon City\",\"telno\":\"(+63)-922-010-2121\",\"occupation\":\"Dancer\",\"email\":\"sharpay@gmail.com\",\"civilStatus\":\"Married\",\"sex\":\"Female\",\"guardian\":{\"name\":\"Shannon Evans\",\"telno\":\"(+63)-920-010-2123\"}},\"course\":[4],\"branch\":\"1\",\"payment\":1,\"applyLicense\":0,\"special\":{\"course\":[],\"location\":null},\"transaction\":{\"transaction\":\"Enrollment\",\"amount\":0,\"ORnum\":\"181015131334\",\"dataID\":19},\"preference\":{\"vehicle\":\"Altis Toyota\",\"schedule\":[\"1\",\"4\",\"7\"]}}', '2018-10-13 03:53:04', 1),
(20, '{\"info\":{\"fullname\":\"Vincent_John_Crabbe\",\"birthdate\":\"1990-09-08\",\"birthplace\":\"Taguig City\",\"address\":\"Barangay Tuktukan, Taguig City\",\"telno\":\"(+63)-987-666-7898\",\"occupation\":\"Teacher\",\"email\":\"vincentjc@gmail.com\",\"civilStatus\":\"Single\",\"sex\":\"Male\",\"guardian\":{\"name\":\"Utah Crabbe\",\"telno\":\"(+63)-998-878-9975\"}},\"course\":[9],\"branch\":\"2\",\"payment\":1,\"applyLicense\":0,\"special\":{\"course\":[],\"location\":null},\"transaction\":{\"transaction\":\"Enrollment\",\"amount\":0,\"ORnum\":\"181015121442\",\"dataID\":20},\"preference\":{\"vehicle\":\"Civic Sedan Honda\",\"schedule\":[\"7\",\"1\",\"3\",\"4\"]}}', '2018-10-15 03:53:15', 1),
(21, '{\"info\":{\"fullname\":\"Ryan_Samson_Evans\",\"birthdate\":\"1997-05-11\",\"birthplace\":\"Blk 12 Lot 2 Quezon City\",\"address\":\"Blk 12 Lot 2 Quezon City\",\"telno\":\"(+63)-932-323-3232\",\"occupation\":\"Student\",\"email\":\"ryan@gmail.com\",\"civilStatus\":\"Single\",\"sex\":\"Male\",\"guardian\":{\"name\":\"Rheanne Evans\",\"telno\":\"(+63)-922-103-4564\"}},\"course\":[5],\"branch\":\"1\",\"payment\":1,\"applyLicense\":0,\"special\":{\"course\":[],\"location\":null},\"transaction\":{\"transaction\":\"Enrollment\",\"amount\":0,\"ORnum\":\"1810155607\",\"dataID\":21},\"preference\":{\"vehicle\":\"Altis Toyota\",\"schedule\":[\"2\",\"5\",\"6\"]}}', '2018-10-13 03:54:53', 1),
(22, '{\"info\":{\"fullname\":\" Gregory__Goyle\",\"birthdate\":\"1980-09-07\",\"birthplace\":\"Sorsogon, Bicol\",\"address\":\"Barangay Pinagsama, Taguig City\",\"telno\":\"(+63)-987-888-7678\",\"occupation\":\"Manager\",\"email\":\"gregory@gmail.com\",\"civilStatus\":\"Married\",\"sex\":\"Male\",\"guardian\":{\"name\":\"Mary Anne Goyle\",\"telno\":\"(+63)-987-666-7889\"}},\"course\":[10],\"branch\":\"2\",\"payment\":1,\"applyLicense\":0,\"special\":{\"course\":[],\"location\":null},\"transaction\":{\"transaction\":\"Enrollment\",\"amount\":0,\"ORnum\":\"181015721311\",\"dataID\":22},\"preference\":{\"vehicle\":\"Carina AT210 Toyota\",\"schedule\":[\"2\",\"3\",\"5\"]}}', '2018-10-15 03:55:46', 1),
(23, '{\"info\":{\"fullname\":\"Taylor_Reyes_McKessie\",\"birthdate\":\"1998-06-02\",\"birthplace\":\"CSJDM, Bulacan\",\"address\":\"CSJDM, Bulacan\",\"telno\":\"(+63)-900-023-1231\",\"occupation\":\"Student\",\"email\":\"taylor@gmail.com\",\"civilStatus\":\"Single\",\"sex\":\"Female\",\"guardian\":{\"name\":\"Taytay McKessie\",\"telno\":\"(+63)-923-123-1231\"}},\"course\":[6],\"branch\":\"1\",\"payment\":1,\"applyLicense\":1,\"special\":{\"course\":[],\"location\":null},\"transaction\":{\"transaction\":\"Enrollment, Apply-1\",\"amount\":500,\"ORnum\":\"18101598810\",\"dataID\":23},\"preference\":{\"vehicle\":\"Civic Sedan Honda\",\"schedule\":[\"7\",\"2\",\"5\",\"6\"]}}', '2018-09-15 03:56:20', 0),
(24, '{\"info\":{\"fullname\":\"Chad_Larez_Danforth\",\"birthdate\":\"1987-01-11\",\"birthplace\":\"Blk 12 Lot 2 Quezon City\",\"address\":\"Blk 12 Lot 2 Quezon City\",\"telno\":\"(+63)-928-231-3466\",\"occupation\":\"Student\",\"email\":\"chad@gmail.com\",\"civilStatus\":\"Single\",\"sex\":\"Male\",\"guardian\":{\"name\":\"Charisse Danforth\",\"telno\":\"(+63)-900-123-2136\"}},\"course\":[7],\"branch\":\"1\",\"payment\":1,\"applyLicense\":1,\"special\":{\"course\":[],\"location\":null},\"transaction\":{\"transaction\":\"Enrollment, Apply-1\",\"amount\":500,\"ORnum\":\"18101544912\",\"dataID\":24},\"preference\":{\"vehicle\":\"Corolla AE111 Toyota\",\"schedule\":[\"2\",\"5\",\"3\"]}}', '2018-09-14 03:57:41', 0),
(25, '{\"info\":{\"fullname\":\" Blaise__Zabini\",\"birthdate\":\"1987-01-02\",\"birthplace\":\"Makati City\",\"address\":\"West Rembo, Makati City\",\"telno\":\"(+63)-983-728-3822\",\"occupation\":\"OFW\",\"email\":\"blaise@gmail.com\",\"civilStatus\":\"Married\",\"sex\":\"Male\",\"guardian\":{\"name\":\"Berrylla Zabini\",\"telno\":\"(+63)-998-986-7757\"}},\"course\":[7],\"branch\":\"2\",\"payment\":1,\"applyLicense\":4,\"special\":{\"course\":[],\"location\":null},\"transaction\":{\"transaction\":\"Enrollment, Apply-4\",\"amount\":5000,\"ORnum\":\"18101574123\",\"dataID\":25},\"preference\":{\"vehicle\":\"Corolla AE111 Toyota\",\"schedule\":[\"1\",\"2\",\"3\",\"4\",\"5\"]}}', '2018-10-15 03:58:22', 1),
(26, '{\"info\":{\"fullname\":\"Kelsi Mae_Eri_Nielsen\",\"birthdate\":\"1998-06-16\",\"birthplace\":\"Blk 43 Lot 1 Quezon City\",\"address\":\"Blk 43 Lot 1 Quezon City\",\"telno\":\"(+63)-900-132-3545\",\"occupation\":\"Writer\",\"email\":\"kelsi@gmail.com\",\"civilStatus\":\"Married\",\"sex\":\"Female\",\"guardian\":{\"name\":\"Kelly Nielsen\",\"telno\":\"(+63)-903-218-5454\"}},\"course\":[8],\"branch\":\"1\",\"payment\":1,\"applyLicense\":1,\"special\":{\"course\":[],\"location\":null},\"transaction\":{\"transaction\":\"Enrollment, Apply-1\",\"amount\":500,\"ORnum\":\"181015126150\",\"dataID\":26},\"preference\":{\"vehicle\":\"Corolla AE111 Toyota\",\"schedule\":[\"2\",\"5\",\"3\"]}}', '2018-10-14 03:59:41', 1),
(27, '{\"info\":{\"fullname\":\"Draco__Malfoy\",\"birthdate\":\"1989-01-22\",\"birthplace\":\"Cebu City\",\"address\":\"Barangay Pitogo, Makati City\",\"telno\":\"(+63)-987-689-9879\",\"occupation\":\"OFW\",\"email\":\"dracomalfoy@gmail.com\",\"civilStatus\":\"Married\",\"sex\":\"Male\",\"guardian\":{\"name\":\"Dianne Malfoy\",\"telno\":\"(+63)-987-883-2221\"}},\"course\":[4],\"branch\":\"2\",\"payment\":1,\"applyLicense\":4,\"special\":{\"course\":[],\"location\":null},\"transaction\":{\"transaction\":\"Enrollment, Apply-4\",\"amount\":5000,\"ORnum\":\"1810154783\",\"dataID\":27},\"preference\":{\"vehicle\":\"Lexus Toyota\",\"schedule\":[\"6\",\"7\"]}}', '2018-10-15 04:00:55', 1),
(28, '{\"info\":{\"fullname\":\"Tiara Shiela_Go_Gold\",\"birthdate\":\"1994-06-07\",\"birthplace\":\"CSJDM, Bulacan\",\"address\":\"CSJDM, Bulacan\",\"telno\":\"(+63)-933-000-3129\",\"occupation\":\"Singer\",\"email\":\"tiara@gmail.com\",\"civilStatus\":\"Married\",\"sex\":\"Female\",\"guardian\":{\"name\":\"Tiaro Gold\",\"telno\":\"(+63)-982-300-4343\"}},\"course\":[9],\"branch\":\"1\",\"payment\":1,\"applyLicense\":3,\"special\":{\"course\":[],\"location\":null},\"transaction\":{\"transaction\":\"Enrollment, Apply-3\",\"amount\":2700,\"ORnum\":\"1810151551211\",\"dataID\":28},\"preference\":{\"vehicle\":\"Carina AT210 Toyota\",\"schedule\":[\"1\",\"4\",\"7\"]}}', '2018-09-01 04:01:00', 0),
(29, '{\"info\":{\"fullname\":\"Martha_Susanes_Jones\",\"birthdate\":\"1992-05-08\",\"birthplace\":\"CSJDM, Quezon City\",\"address\":\"CSJDM, Quezon City\",\"telno\":\"(+63)-908-793-0021\",\"occupation\":\"Student\",\"email\":\"martha@gmail.com\",\"civilStatus\":\"Single\",\"sex\":\"Female\",\"guardian\":{\"name\":\"Martis Jones\",\"telno\":\"(+63)-900-231-2842\"}},\"course\":[10],\"branch\":\"1\",\"payment\":1,\"applyLicense\":2,\"special\":{\"course\":[],\"location\":null},\"transaction\":{\"transaction\":\"Enrollment, Apply-2\",\"amount\":2500,\"ORnum\":\"18101501044\",\"dataID\":29},\"preference\":{\"vehicle\":\"Civic Sedan Honda\",\"schedule\":[\"2\",\"5\"]}}', '2018-10-15 04:02:15', 1),
(30, '{\"info\":{\"fullname\":\"Theodore__Nott\",\"birthdate\":\"1990-02-05\",\"birthplace\":\"Makati City\",\"address\":\"Barangay Pinagkaisahan, Makati City\",\"telno\":\"(+63)-926-345-3434\",\"occupation\":\"HBC Employee\",\"email\":\"theonott@gmail.com\",\"civilStatus\":\"Single\",\"sex\":\"Female\",\"guardian\":{\"name\":\"Tina Nott\",\"telno\":\"(+63)-924-514-2516\"}},\"course\":[3],\"branch\":\"3\",\"payment\":1,\"applyLicense\":0,\"special\":{\"course\":[],\"location\":null},\"transaction\":{\"transaction\":\"Enrollment\",\"amount\":0,\"ORnum\":\"18101513477\",\"dataID\":30},\"preference\":{\"vehicle\":\"Vios Toyota\",\"schedule\":[\"4\",\"5\",\"3\",\"2\",\"1\"]}}', '2018-10-15 04:03:36', 1),
(31, '{\"info\":{\"fullname\":\"Daphne__Greengrass\",\"birthdate\":\"1996-07-18\",\"birthplace\":\"Quezon City\",\"address\":\"Maria Clara, Quezon City\",\"telno\":\"(+63)-935-627-2635\",\"occupation\":\"Student\",\"email\":\"daphne@gmail.com\",\"civilStatus\":\"Single\",\"sex\":\"Female\",\"guardian\":{\"name\":\"Dianne Greengrass\",\"telno\":\"(+63)-987-262-3661\"}},\"course\":[5],\"branch\":\"3\",\"payment\":1,\"applyLicense\":0,\"special\":{\"course\":[],\"location\":null},\"transaction\":{\"transaction\":\"Enrollment\",\"amount\":0,\"ORnum\":\"1810151531111\",\"dataID\":31},\"preference\":{\"vehicle\":\"Altis Toyota\",\"schedule\":[\"4\",\"5\",\"2\",\"3\",\"1\"]}}', '2018-10-15 04:06:04', 1),
(32, '{\"info\":{\"fullname\":\"Pansy_Serrano_Parkinson\",\"birthdate\":\"1997-04-05\",\"birthplace\":\"Quezon City\",\"address\":\"Cubao, Quezon City\",\"telno\":\"(+63)-926-735-2526\",\"occupation\":\"Student\",\"email\":\"pansyparkinson@gmail.com\",\"civilStatus\":\"Single\",\"sex\":\"Female\",\"guardian\":{\"name\":\"Milan Parkinson\",\"telno\":\"(+63)-935-624-3522\"}},\"course\":[7],\"branch\":\"3\",\"payment\":1,\"applyLicense\":0,\"special\":{\"course\":[],\"location\":null},\"transaction\":{\"transaction\":\"Enrollment\",\"amount\":0,\"ORnum\":\"18101512055\",\"dataID\":32},\"preference\":{\"vehicle\":\"Civic Sedan Honda\",\"schedule\":[\"2\",\"3\",\"4\"]}}', '2018-10-15 04:08:41', 1),
(33, '{\"info\":{\"fullname\":\"Tracey__Davis\",\"birthdate\":\"1996-06-12\",\"birthplace\":\"Quezon City\",\"address\":\"Cubao, Quezon City\",\"telno\":\"(+63)-927-265-2536\",\"occupation\":\"Student\",\"email\":\"tracey@gmail.com\",\"civilStatus\":\"Single\",\"sex\":\"Female\",\"guardian\":{\"name\":\"Tanny Davis\",\"telno\":\"(+63)-987-638-2379\"}},\"course\":[10],\"branch\":\"3\",\"payment\":1,\"applyLicense\":0,\"special\":{\"course\":[],\"location\":null},\"transaction\":{\"transaction\":\"Enrollment\",\"amount\":0,\"ORnum\":\"18101518104\",\"dataID\":33},\"preference\":{\"vehicle\":\"Corolla AE111 Toyota\",\"schedule\":[\"2\",\"4\",\"3\",\"5\",\"1\"]}}', '2018-10-15 04:11:03', 1),
(34, '{\"info\":{\"fullname\":\"Millicent__Bullstrode\",\"birthdate\":\"1998-05-05\",\"birthplace\":\"Quezon City\",\"address\":\"Tondo, Manila\",\"telno\":\"(+63)-935-625-3627\",\"occupation\":\"Student\",\"email\":\"millicent@gmail.com\",\"civilStatus\":\"Single\",\"sex\":\"Female\",\"guardian\":{\"name\":\"Maleficent Bullstrode\",\"telno\":\"(+63)-987-654-3234\"}},\"course\":[5],\"branch\":\"4\",\"payment\":1,\"applyLicense\":0,\"special\":{\"course\":[],\"location\":null},\"transaction\":{\"transaction\":\"Enrollment\",\"amount\":0,\"ORnum\":\"1810151413010\",\"dataID\":34},\"preference\":{\"vehicle\":\"Vios Toyota\",\"schedule\":[\"6\",\"7\"]}}', '2018-10-15 04:15:05', 1),
(35, '{\"info\":{\"fullname\":\"Su_Chan_Li\",\"birthdate\":\"1998-08-06\",\"birthplace\":\"Quezon City\",\"address\":\"Avenida, Manila City\",\"telno\":\"(+63)-987-678-8945\",\"occupation\":\"Student\",\"email\":\"suchanli@gmail.com\",\"civilStatus\":\"Single\",\"sex\":\"Female\",\"guardian\":{\"name\":\"Taehyun Li\",\"telno\":\"(+63)-987-464-7373\"}},\"course\":[9],\"branch\":\"4\",\"payment\":1,\"applyLicense\":0,\"special\":{\"course\":[],\"location\":null},\"transaction\":{\"transaction\":\"Enrollment\",\"amount\":0,\"ORnum\":\"181015811116\",\"dataID\":35},\"preference\":{\"vehicle\":\"Corolla AE111 Toyota\",\"schedule\":[\"1\",\"4\",\"2\",\"5\",\"3\"]}}', '2018-10-15 04:20:20', 1),
(36, '{\"info\":{\"fullname\":\"Lisa__Turpin\",\"birthdate\":\"1997-09-09\",\"birthplace\":\"Quezon City\",\"address\":\"Quezon City\",\"telno\":\"(+63)-987-654-5678\",\"occupation\":\"Student\",\"email\":\"lisaturpin@gmail.com\",\"civilStatus\":\"Single\",\"sex\":\"Female\",\"guardian\":{\"name\":\"Elizabeth Turpin\",\"telno\":\"(+63)-987-890-9865\"}},\"course\":[8],\"branch\":\"4\",\"payment\":1,\"applyLicense\":0,\"special\":{\"course\":[],\"location\":null},\"transaction\":{\"transaction\":\"Enrollment\",\"amount\":0,\"ORnum\":\"18101571013\",\"dataID\":36},\"preference\":{\"vehicle\":\"Civic Sedan Honda\",\"schedule\":[\"5\",\"2\",\"1\",\"4\",\"3\"]}}', '2018-10-15 04:22:23', 1),
(37, '{\"info\":{\"fullname\":\"Jenny Rose _Buena_Laganzo\",\"birthdate\":\"1998-07-08\",\"birthplace\":\"Caloocan City\",\"address\":\"Malabon City\",\"telno\":\"(+63)-997-562-1489\",\"occupation\":\"Student\",\"email\":\"jenny@gmail.com\",\"civilStatus\":\"Single\",\"sex\":\"Female\",\"guardian\":{\"name\":\"Wilma B. Laganzo \",\"telno\":\"(+63)-965-889-5741\"}},\"course\":[1],\"branch\":\"3\",\"payment\":2,\"applyLicense\":0,\"special\":{\"course\":[],\"location\":null},\"transaction\":{\"transaction\":\"Enrollment\",\"amount\":0,\"ORnum\":\"1810156260\",\"dataID\":37},\"preference\":{\"vehicle\":\"Altis Toyota\",\"schedule\":[\"4\",\"1\"]}}', '2018-10-15 04:22:57', 1),
(38, '{\"info\":{\"fullname\":\"Morag__Macdougal\",\"birthdate\":\"1998-08-07\",\"birthplace\":\"Quezon City\",\"address\":\"Quezon City\",\"telno\":\"(+63)-975-675-4345\",\"occupation\":\"Student\",\"email\":\"morag@gmail.com\",\"civilStatus\":\"Single\",\"sex\":\"Male\",\"guardian\":{\"name\":\"Morgan Macdougal\",\"telno\":\"(+63)-998-838-2832\"}},\"course\":[7],\"branch\":\"4\",\"payment\":1,\"applyLicense\":0,\"special\":{\"course\":[],\"location\":null},\"transaction\":{\"transaction\":\"Enrollment\",\"amount\":0,\"ORnum\":\"18101551553\",\"dataID\":38},\"preference\":{\"vehicle\":\"Corolla AE111 Toyota\",\"schedule\":[\"6\",\"7\"]}}', '2018-10-15 04:24:38', 1),
(39, '{\"info\":{\"fullname\":\"Lilybeth_Angan_Sulo\",\"birthdate\":\"1985-09-08\",\"birthplace\":\"Cebu City\",\"address\":\"Quezon City\",\"telno\":\"(+63)-987-656-7788\",\"occupation\":\"None\",\"email\":\"lilybeth@gmail.com\",\"civilStatus\":\"Married\",\"sex\":\"Female\",\"guardian\":{\"name\":\"Gardo Sulo\",\"telno\":\"(+63)-989-767-8892\"}},\"course\":[1],\"branch\":\"4\",\"payment\":1,\"applyLicense\":0,\"special\":{\"course\":[],\"location\":null},\"transaction\":{\"transaction\":\"Enrollment\",\"amount\":0,\"ORnum\":\"181015111266\",\"dataID\":39},\"preference\":{\"vehicle\":\"Vios Toyota\",\"schedule\":[\"2\",\"3\",\"1\",\"4\",\"5\"]}}', '2018-10-15 04:28:07', 1),
(40, '{\"info\":{\"fullname\":\"Jana Katrine_Buena_Laganzo\",\"birthdate\":\"1997-01-01\",\"birthplace\":\"Caloocan City\",\"address\":\"Caloocan City\",\"telno\":\"(+63)-997-562-8416\",\"occupation\":\"Student\",\"email\":\"jana@gmail.com\",\"civilStatus\":\"Single\",\"sex\":\"Female\",\"guardian\":{\"name\":\"Wilma B. Laganzo \",\"telno\":\"(+63)-997-541-2952\"}},\"course\":[2],\"branch\":\"3\",\"payment\":2,\"applyLicense\":0,\"special\":{\"course\":[],\"location\":null},\"transaction\":{\"transaction\":\"Enrollment\",\"amount\":0,\"ORnum\":\"1810159933\",\"dataID\":40},\"preference\":{\"vehicle\":\"Vios Toyota\",\"schedule\":[\"1\",\"2\"]}}', '2018-10-15 04:30:15', 1),
(41, '{\"info\":{\"fullname\":\"Mandy __Brocklehurst\",\"birthdate\":\"1998-03-15\",\"birthplace\":\"Taguig City\",\"address\":\"Taguig City\",\"telno\":\"(+63)-925-267-3728\",\"occupation\":\"Student\",\"email\":\"mandy@gmail.com\",\"civilStatus\":\"Single\",\"sex\":\"Female\",\"guardian\":{\"name\":\"Manny Brocklehurst\",\"telno\":\"(+63)-924-535-6371\"}},\"course\":[4],\"branch\":\"5\",\"payment\":1,\"applyLicense\":0,\"special\":{\"course\":[],\"location\":null},\"transaction\":{\"transaction\":\"Enrollment\",\"amount\":0,\"ORnum\":\"181015615315\",\"dataID\":41},\"preference\":{\"vehicle\":\"Lexus Toyota\",\"schedule\":[\"6\",\"7\"]}}', '2018-10-15 04:38:11', 1),
(42, '{\"info\":{\"fullname\":\"Padma__Patil\",\"birthdate\":\"1997-10-09\",\"birthplace\":\"Pasay City\",\"address\":\"Pasay City\",\"telno\":\"(+63)-987-656-7886\",\"occupation\":\"Student\",\"email\":\"padmapatil@gmail.com\",\"civilStatus\":\"Single\",\"sex\":\"Female\",\"guardian\":{\"name\":\"Periku Patil\",\"telno\":\"(+63)-927-162-5363\"}},\"course\":[5],\"branch\":\"5\",\"payment\":1,\"applyLicense\":0,\"special\":{\"course\":[],\"location\":null},\"transaction\":{\"transaction\":\"Enrollment\",\"amount\":0,\"ORnum\":\"181015127412\",\"dataID\":42},\"preference\":{\"vehicle\":\"Vios Toyota\",\"schedule\":[\"4\",\"7\",\"5\",\"2\"]}}', '2018-10-15 04:41:45', 1),
(43, '{\"info\":{\"fullname\":\"Michael__Corner\",\"birthdate\":\"1997-10-08\",\"birthplace\":\"Cavite\",\"address\":\"Pasay City\",\"telno\":\"(+63)-989-438-4929\",\"occupation\":\"Employee\",\"email\":\"michael@gmail.com\",\"civilStatus\":\"Single\",\"sex\":\"Male\",\"guardian\":{\"name\":\"Michelle Corner\",\"telno\":\"(+63)-987-663-7832\"}},\"course\":[3],\"branch\":\"5\",\"payment\":1,\"applyLicense\":0,\"special\":{\"course\":[],\"location\":null},\"transaction\":{\"transaction\":\"Enrollment\",\"amount\":0,\"ORnum\":\"1810156121412\",\"dataID\":43},\"preference\":{\"vehicle\":\"Vios Toyota\",\"schedule\":[\"6\",\"7\"]}}', '2018-10-15 04:44:01', 1),
(44, '{\"info\":{\"fullname\":\"Terry__Boot\",\"birthdate\":\"1989-03-05\",\"birthplace\":\"Sorsogon, Bicol\",\"address\":\"Manila City\",\"telno\":\"(+63)-987-899-8767\",\"occupation\":\"OFW\",\"email\":\"terryboot@gmail.com\",\"civilStatus\":\"Married\",\"sex\":\"Female\",\"guardian\":{\"name\":\"Nora Boot\",\"telno\":\"(+63)-956-474-8393\"}},\"course\":[2],\"branch\":\"5\",\"payment\":1,\"applyLicense\":2,\"special\":{\"course\":[],\"location\":null},\"transaction\":{\"transaction\":\"Enrollment, Apply-2\",\"amount\":2500,\"ORnum\":\"18101551092\",\"dataID\":44},\"preference\":{\"vehicle\":\"Altis Toyota\",\"schedule\":[\"3\",\"2\",\"5\",\"4\",\"1\"]}}', '2018-10-15 04:46:13', 1),
(46, '{\"info\":{\"fullname\":\"Kevin__Entwhistle\",\"birthdate\":\"1987-12-02\",\"birthplace\":\"Pasay City\",\"address\":\"Manila City\",\"telno\":\"(+63)-965-748-3838\",\"occupation\":\"Driver\",\"email\":\"kevin@gmail.com\",\"civilStatus\":\"Married\",\"sex\":\"Male\",\"guardian\":{\"name\":\"Noralyn Entwhistle\",\"telno\":\"(+63)-987-564-7322\"}},\"course\":[8],\"branch\":\"5\",\"payment\":1,\"applyLicense\":0,\"special\":{\"course\":[],\"location\":null},\"transaction\":{\"transaction\":\"Enrollment\",\"amount\":0,\"ORnum\":\"181015313915\",\"dataID\":46},\"preference\":{\"vehicle\":\"Corolla AE111 Toyota\",\"schedule\":[\"1\",\"4\",\"3\",\"2\"]}}', '2018-10-15 04:51:03', 1),
(47, '{\"info\":{\"fullname\":\"Stephen_Curry_Cornfoot\",\"birthdate\":\"1989-12-25\",\"birthplace\":\"Makati City\",\"address\":\"Quezon City\",\"telno\":\"(+63)-925-634-5262\",\"occupation\":\"Driver\",\"email\":\"stephen@gmail.com\",\"civilStatus\":\"Married\",\"sex\":\"Male\",\"guardian\":{\"name\":\"Stephanie Cornfoot\",\"telno\":\"(+63)-986-574-7382\"}},\"course\":[9],\"branch\":\"1\",\"payment\":1,\"applyLicense\":3,\"special\":{\"course\":[],\"location\":null},\"transaction\":{\"transaction\":\"Enrollment, Apply-3\",\"amount\":2700,\"ORnum\":\"18101581206\",\"dataID\":47},\"preference\":{\"vehicle\":\"Corolla AE111 Toyota\",\"schedule\":[\"5\",\"2\",\"7\"]}}', '2018-10-11 04:53:12', 2),
(48, '{\"info\":{\"fullname\":\"Hannah__Abbott\",\"birthdate\":\"1998-12-31\",\"birthplace\":\"Quezon City\",\"address\":\"Quezon City\",\"telno\":\"(+63)-987-647-7238\",\"occupation\":\"Student\",\"email\":\"hannah@gmail.com\",\"civilStatus\":\"Single\",\"sex\":\"Female\",\"guardian\":{\"name\":\"Helen Abbott\",\"telno\":\"(+63)-926-543-5627\"}},\"course\":[7],\"branch\":\"1\",\"payment\":1,\"applyLicense\":0,\"special\":{\"course\":[],\"location\":null},\"transaction\":{\"transaction\":\"Enrollment\",\"amount\":0,\"ORnum\":\"181015510011\",\"dataID\":48},\"preference\":{\"vehicle\":\"Civic Sedan Honda\",\"schedule\":[\"4\",\"1\",\"6\"]}}', '2018-10-11 04:55:09', 2),
(49, '{\"info\":{\"fullname\":\"Susan __Bones\",\"birthdate\":\"1996-11-07\",\"birthplace\":\"Quezon City\",\"address\":\"Quezon City\",\"telno\":\"(+63)-987-678-9672\",\"occupation\":\"Writer\",\"email\":\"susanbones@gmail.com\",\"civilStatus\":\"Single\",\"sex\":\"Female\",\"guardian\":{\"name\":\"Susana Bones\",\"telno\":\"(+63)-923-829-8392\"}},\"course\":[5],\"branch\":\"1\",\"payment\":1,\"applyLicense\":2,\"special\":{\"course\":[],\"location\":null},\"transaction\":{\"transaction\":\"Enrollment, Apply-2\",\"amount\":2500,\"ORnum\":\"181015157515\",\"dataID\":49},\"preference\":{\"vehicle\":\"Vios Toyota\",\"schedule\":[\"6\",\"7\"]}}', '2018-10-15 04:57:00', 2),
(50, '{\"info\":{\"fullname\":\"Ernie __Macmillan\",\"birthdate\":\"1986-09-08\",\"birthplace\":\"Bulacan\",\"address\":\"Maria Clara, Quezon City\",\"telno\":\"(+63)-987-890-7855\",\"occupation\":\"Journalist\",\"email\":\"erniemacmillan@gmail.com\",\"civilStatus\":\"Single\",\"sex\":\"Male\",\"guardian\":{\"name\":\"Josephine Macmillan\",\"telno\":\"(+63)-987-897-6899\"}},\"course\":[2],\"branch\":\"1\",\"payment\":1,\"applyLicense\":3,\"special\":{\"course\":[\"4\"],\"location\":\"Maria Clara, Quezon City\"},\"transaction\":{\"transaction\":\"Enrollment, Apply-3\",\"amount\":3200,\"ORnum\":\"181015251315\",\"dataID\":50},\"preference\":{\"vehicle\":\"Vios Toyota\",\"schedule\":[\"2\",\"5\",\"1\",\"4\",\"3\"]}}', '2018-10-08 05:00:09', 0),
(51, '{\"info\":{\"fullname\":\"Justin_Finch_Fetchley\",\"birthdate\":\"1988-02-09\",\"birthplace\":\"Makati City\",\"address\":\"Quezon City\",\"telno\":\"(+63)-987-865-7765\",\"occupation\":\"Developer\",\"email\":\"\",\"civilStatus\":\"Married\",\"sex\":\"Male\",\"guardian\":{\"name\":\"Akira Fetchley\",\"telno\":\"(+63)-989-789-8992\"}},\"course\":[2],\"branch\":\"1\",\"payment\":1,\"applyLicense\":2,\"special\":{\"course\":[],\"location\":null},\"transaction\":{\"transaction\":\"Enrollment, Apply-2\",\"amount\":2500,\"ORnum\":\"18101501303\",\"dataID\":51},\"preference\":{\"vehicle\":\"Vios Toyota\",\"schedule\":[\"5\",\"2\",\"3\"]}}', '2018-10-04 05:02:02', 0),
(52, '{\"info\":{\"fullname\":\"Zacharias__Smith\",\"birthdate\":\"1991-12-30\",\"birthplace\":\"Mindanao\",\"address\":\"Dapitan, Manila City\",\"telno\":\"(+63)-982-919-2991\",\"occupation\":\"Developer\",\"email\":\"zacharias@gmail.com\",\"civilStatus\":\"Married\",\"sex\":\"Male\",\"guardian\":{\"name\":\"Cynthia Rose\",\"telno\":\"(+63)-956-748-3938\"}},\"course\":[7],\"branch\":\"1\",\"payment\":1,\"applyLicense\":3,\"special\":{\"course\":[\"7\"],\"location\":\"Maria Clara, Quezon City\"},\"transaction\":{\"transaction\":\"Enrollment, Apply-3\",\"amount\":2700,\"ORnum\":\"181015211015\",\"dataID\":52},\"preference\":{\"vehicle\":\"Corolla AE111 Toyota\",\"schedule\":[\"1\",\"4\",\"2\",\"3\",\"5\"]}}', '2018-10-07 05:05:01', 0),
(53, '{\"info\":{\"fullname\":\"Levi _Ortiz_Laganzo\",\"birthdate\":\"1989-05-11\",\"birthplace\":\"Quezon City\",\"address\":\"Bago Bantay, Munoz, Quezon City\",\"telno\":\"(+63)-921-670-4487\",\"occupation\":\"Software Developer\",\"email\":\"levi@gmail.com\",\"civilStatus\":\"Married\",\"sex\":\"Male\",\"guardian\":{\"name\":\"Wilma B. Laganzo \",\"telno\":\"(+63)-921-568-4574\"}},\"course\":[6],\"branch\":\"3\",\"payment\":1,\"applyLicense\":0,\"special\":{\"course\":[],\"location\":null},\"transaction\":{\"transaction\":\"Enrollment\",\"amount\":0,\"ORnum\":\"18101531132\",\"dataID\":53},\"preference\":{\"vehicle\":\"Accord Honda\",\"schedule\":[\"1\",\"4\",\"7\"]}}', '2018-10-15 05:05:32', 1),
(54, '{\"info\":{\"fullname\":\"Wilma_Buena_Laganzo\",\"birthdate\":\"1991-11-22\",\"birthplace\":\"Quezon City\",\"address\":\"Munoz, Quezon City\",\"telno\":\"(+63)-947-655-551_\",\"occupation\":\"Accounting Staff\",\"email\":\"wilma@gmail.com\",\"civilStatus\":\"Married\",\"sex\":\"Female\",\"guardian\":{\"name\":\"Levi_Laganzo\",\"telno\":\"(+63)-977-206-2549\"}},\"course\":[7],\"branch\":\"3\",\"payment\":1,\"applyLicense\":0,\"special\":{\"course\":[],\"location\":null},\"transaction\":{\"transaction\":\"Enrollment\",\"amount\":0,\"ORnum\":\"1810156534\",\"dataID\":54},\"preference\":{\"vehicle\":\"Corolla AE111 Toyota\",\"schedule\":[\"3\",\"2\",\"5\"]}}', '2018-10-15 05:08:45', 1),
(55, '{\"info\":{\"fullname\":\"Kenard _Belarmino_Bautista\",\"birthdate\":\"1995-01-13\",\"birthplace\":\"Quezon City\",\"address\":\"Novaliches, Quezon City\",\"telno\":\"(+63)-977-356-2356\",\"occupation\":\"Accountant\",\"email\":\"kenard@gmail.com\",\"civilStatus\":\"Single\",\"sex\":\"Male\",\"guardian\":{\"name\":\"Claire Bautista\",\"telno\":\"(+63)-997-435-2350\"}},\"course\":[1],\"branch\":\"4\",\"payment\":2,\"applyLicense\":0,\"special\":{\"course\":[],\"location\":null},\"transaction\":{\"transaction\":\"Enrollment\",\"amount\":0,\"ORnum\":\"18101561021\",\"dataID\":55},\"preference\":{\"vehicle\":\"Altis Toyota\",\"schedule\":[\"2\",\"5\",\"7\"]}}', '2018-10-15 05:21:14', 1),
(56, '{\"info\":{\"fullname\":\"Kyla Shane_Belarmino_Bautista\",\"birthdate\":\"1996-12-08\",\"birthplace\":\"Quezon City\",\"address\":\"Novaliches, Quezon City\",\"telno\":\"(+63)-997-823-7481\",\"occupation\":\"Artist\",\"email\":\"kyla@gmail.com\",\"civilStatus\":\"Single\",\"sex\":\"Female\",\"guardian\":{\"name\":\"Claire Bautista\",\"telno\":\"(+63)-997-452-1454\"}},\"course\":[7],\"branch\":\"4\",\"payment\":2,\"applyLicense\":0,\"special\":{\"course\":[],\"location\":null},\"transaction\":{\"transaction\":\"Enrollment\",\"amount\":0,\"ORnum\":\"181015610104\",\"dataID\":56},\"preference\":{\"vehicle\":\"Carina AT210 Toyota\",\"schedule\":[\"2\",\"5\",\"6\"]}}', '2018-10-15 05:27:33', 1),
(57, '{\"info\":{\"fullname\":\"Fritzgerald_Belarmino_Bautista\",\"birthdate\":\"1993-04-14\",\"birthplace\":\"Quezon City\",\"address\":\"Novaliches, Quezon City\",\"telno\":\"(+63)-921-952-3356\",\"occupation\":\"Journalist\",\"email\":\"fritz@gmail.com\",\"civilStatus\":\"Married\",\"sex\":\"Male\",\"guardian\":{\"name\":\"Claire Bautista\",\"telno\":\"(+63)-921-543-2123\"}},\"course\":[6],\"branch\":\"4\",\"payment\":1,\"applyLicense\":0,\"special\":{\"course\":[],\"location\":null},\"transaction\":{\"transaction\":\"Enrollment\",\"amount\":0,\"ORnum\":\"181015212815\",\"dataID\":57},\"preference\":{\"vehicle\":\"Corolla AE111 Toyota\",\"schedule\":[\"4\",\"2\",\"6\"]}}', '2018-10-15 05:35:43', 1),
(58, '{\"info\":{\"fullname\":\"Kwinn_Belarmino_Bautista\",\"birthdate\":\"1987-11-06\",\"birthplace\":\"Quezon City\",\"address\":\"Novaliches, Quezon City\",\"telno\":\"(+63)-997-542-3554\",\"occupation\":\"Artist\",\"email\":\"kwinn@gmail.com\",\"civilStatus\":\"Single\",\"sex\":\"Female\",\"guardian\":{\"name\":\"Claire Bautista\",\"telno\":\"(+63)-995-234-5232\"}},\"course\":[7],\"branch\":\"4\",\"payment\":1,\"applyLicense\":0,\"special\":{\"course\":[],\"location\":null},\"transaction\":{\"transaction\":\"Enrollment\",\"amount\":0,\"ORnum\":\"18101590101\",\"dataID\":58},\"preference\":{\"vehicle\":\"Civic Sedan Honda\",\"schedule\":[\"2\",\"4\"]}}', '2018-10-15 05:39:51', 1),
(60, '{\"info\":{\"fullname\":\"Paulyn _Custodio_Posadas\",\"birthdate\":\"1995-09-18\",\"birthplace\":\"Pasay City\",\"address\":\"F.B. Harrison , Pasay City\",\"telno\":\"(+63)-997-635-3252\",\"occupation\":\"Programmer\",\"email\":\"paulyn@gmail.com\",\"civilStatus\":\"Single\",\"sex\":\"Female\",\"guardian\":{\"name\":\"Alexandria Posadas\",\"telno\":\"(+63)-099-856-3425\"}},\"course\":[2],\"branch\":\"5\",\"payment\":2,\"applyLicense\":0,\"special\":{\"course\":[],\"location\":null},\"transaction\":{\"transaction\":\"Enrollment\",\"amount\":0,\"ORnum\":\"181015106611\",\"dataID\":60},\"preference\":{\"vehicle\":\"Lexus Toyota\",\"schedule\":[\"2\",\"5\",\"4\"]}}', '2018-10-15 05:47:25', 1),
(61, '{\"info\":{\"fullname\":\"Norine _Custodio_Posadas\",\"birthdate\":\"1987-12-19\",\"birthplace\":\"Makati City\",\"address\":\"Cartimar, Pasay City\",\"telno\":\"(+63)-997-464-3424\",\"occupation\":\"Teacher\",\"email\":\"norine@gmail.com\",\"civilStatus\":\"Married\",\"sex\":\"Female\",\"guardian\":{\"name\":\"Alexandria C. Posadas\",\"telno\":\"(+63)-997-248-1241\"}},\"course\":[6],\"branch\":\"5\",\"payment\":1,\"applyLicense\":0,\"special\":{\"course\":[],\"location\":null},\"transaction\":{\"transaction\":\"Enrollment\",\"amount\":0,\"ORnum\":\"181015100611\",\"dataID\":61},\"preference\":{\"vehicle\":\"Carina AT210 Toyota\",\"schedule\":[\"4\",\"7\"]}}', '2018-10-15 05:53:54', 1),
(62, '{\"info\":{\"fullname\":\"Paul_Custodio_Tatel\",\"birthdate\":\"1994-03-30\",\"birthplace\":\"Pasay City\",\"address\":\"Cartimar, Pasay City \",\"telno\":\"(+63)-921-954-8655\",\"occupation\":\"Student\",\"email\":\"paul@gmail.com\",\"civilStatus\":\"Single\",\"sex\":\"Male\",\"guardian\":{\"name\":\"Alexandria@gmail.com\",\"telno\":\"(+63)-975-465-3245\"}},\"course\":[7],\"branch\":\"5\",\"payment\":1,\"applyLicense\":0,\"special\":{\"course\":[],\"location\":null},\"transaction\":{\"transaction\":\"Enrollment\",\"amount\":0,\"ORnum\":\"18101544813\",\"dataID\":62},\"preference\":{\"vehicle\":\"Civic Sedan Honda\",\"schedule\":[\"2\",\"5\"]}}', '2018-10-15 05:56:56', 1);

--
-- Dumping data for table `schedule`
--

INSERT INTO `schedule` (`id`, `title`, `date`, `time`, `hour`, `studID`, `instID`, `branch`, `status`) VALUES
(1, 'session#10', '2018-10-16', '09:00:00', 1, '2018-0035', 'INST-2018-0019', 1, 2),
(2, 'session#1', '2018-10-07', '09:00:00', 1, '2018-0035', 'INST-2018-0019', 1, 3),
(3, 'session#2', '2018-10-08', '09:00:00', 1, '2018-0035', 'INST-2018-0019', 1, 3),
(4, 'session#8', '2018-10-14', '09:00:00', 1, '2018-0035', 'INST-2018-0019', 1, 3),
(5, 'session#9', '2018-10-15', '09:00:00', 1, '2018-0035', 'INST-2018-0019', 1, 3),
(6, 'session#6', '2018-10-12', '09:00:00', 1, '2018-0035', 'INST-2018-0019', 1, 3),
(7, 'session#7', '2018-10-13', '09:00:00', 1, '2018-0035', 'INST-2018-0019', 1, 3),
(8, 'session#5', '2018-10-11', '09:00:00', 1, '2018-0035', 'INST-2018-0019', 1, 3),
(9, 'session#4', '2018-10-10', '09:00:00', 1, '2018-0035', 'INST-2018-0019', 1, 3),
(10, 'session#3', '2018-10-09', '09:00:00', 1, '2018-0035', 'INST-2018-0019', 1, 3),
(11, 'session#8', '2018-10-12', '10:00:00', 1, '2018-0036', 'INST-2018-0019', 1, 3),
(12, 'session#1', '2018-10-05', '09:00:00', 1, '2018-0036', 'INST-2018-0019', 1, 3),
(13, 'session#2', '2018-10-06', '09:00:00', 1, '2018-0036', 'INST-2018-0019', 1, 3),
(14, 'session#3', '2018-10-07', '10:00:00', 1, '2018-0036', 'INST-2018-0019', 1, 3),
(15, 'session#4', '2018-10-08', '10:00:00', 1, '2018-0036', 'INST-2018-0019', 1, 3),
(16, 'session#7', '2018-10-11', '10:00:00', 1, '2018-0036', 'INST-2018-0019', 1, 3),
(17, 'session#9', '2018-10-13', '10:00:00', 1, '2018-0036', 'INST-2018-0019', 1, 3),
(18, 'session#10', '2018-10-14', '10:00:00', 1, '2018-0036', 'INST-2018-0019', 1, 3),
(19, 'session#6', '2018-10-10', '10:00:00', 1, '2018-0036', 'INST-2018-0019', 1, 3),
(20, 'session#5', '2018-10-09', '10:00:00', 1, '2018-0036', 'INST-2018-0019', 1, 3),
(21, 'session#12', '2018-10-16', '10:00:00', 1, '2018-0036', 'INST-2018-0019', 1, 2),
(22, 'session#13', '2018-10-17', '09:00:00', 1, '2018-0036', 'INST-2018-0019', 1, 2),
(23, 'session#14', '2018-10-18', '09:00:00', 1, '2018-0036', 'INST-2018-0019', 1, 2),
(24, 'session#11', '2018-10-15', '10:00:00', 1, '2018-0036', 'INST-2018-0019', 1, 3),
(25, 'session#15', '2018-10-19', '09:00:00', 1, '2018-0036', 'INST-2018-0019', 1, 2),
(26, 'session#17', '2018-10-21', '09:00:00', 1, '2018-0036', 'INST-2018-0019', 1, 2),
(27, 'session#18', '2018-10-22', '09:00:00', 1, '2018-0036', 'INST-2018-0019', 1, 2),
(28, 'session#16', '2018-10-20', '09:00:00', 1, '2018-0036', 'INST-2018-0019', 1, 2),
(29, 'session#19', '2018-10-23', '09:00:00', 1, '2018-0036', 'INST-2018-0019', 1, 2),
(30, 'session#20', '2018-10-24', '09:00:00', 1, '2018-0036', 'INST-2018-0019', 1, 2),
(31, 'session#21', '2018-10-25', '09:00:00', 1, '2018-0036', 'INST-2018-0019', 1, 2),
(32, 'session#22', '2018-10-26', '09:00:00', 1, '2018-0036', 'INST-2018-0019', 1, 2),
(33, 'session#1', '2018-10-12', '10:00:00', 1, '2018-0037', 'INST-2018-0020', 1, 3),
(34, 'session#2', '2018-10-13', '10:00:00', 1, '2018-0037', 'INST-2018-0020', 1, 3),
(35, 'session#3', '2018-10-14', '09:00:00', 1, '2018-0037', 'INST-2018-0020', 1, 3),
(36, 'session#4', '2018-10-15', '09:00:00', 1, '2018-0037', 'INST-2018-0020', 1, 3),
(37, 'session#5', '2018-10-16', '09:00:00', 1, '2018-0037', 'INST-2018-0020', 1, 2),
(38, 'session#5', '2018-10-06', '10:00:00', 1, '2018-0038', 'INST-2018-0019', 1, 3),
(39, 'session#6', '2018-10-07', '11:00:00', 1, '2018-0038', 'INST-2018-0019', 1, 3),
(40, 'session#2', '2018-10-03', '09:00:00', 1, '2018-0038', 'INST-2018-0019', 1, 3),
(41, 'session#8', '2018-10-09', '11:00:00', 1, '2018-0038', 'INST-2018-0019', 1, 3),
(42, 'session#1', '2018-10-02', '09:00:00', 1, '2018-0038', 'INST-2018-0019', 1, 3),
(43, 'session#9', '2018-10-10', '11:00:00', 1, '2018-0038', 'INST-2018-0019', 1, 3),
(44, 'session#4', '2018-10-05', '10:00:00', 1, '2018-0038', 'INST-2018-0019', 1, 3),
(45, 'session#10', '2018-10-11', '11:00:00', 1, '2018-0038', 'INST-2018-0019', 1, 3),
(46, 'session#7', '2018-10-08', '11:00:00', 1, '2018-0038', 'INST-2018-0019', 1, 3),
(47, 'session#3', '2018-10-04', '09:00:00', 1, '2018-0038', 'INST-2018-0019', 1, 3),
(48, 'session#11', '2018-10-12', '11:00:00', 1, '2018-0038', 'INST-2018-0019', 1, 3),
(49, 'session#12', '2018-10-13', '11:00:00', 1, '2018-0038', 'INST-2018-0019', 1, 3),
(50, 'session#13', '2018-10-14', '11:00:00', 1, '2018-0038', 'INST-2018-0019', 1, 3),
(51, 'session#14', '2018-10-15', '11:00:00', 1, '2018-0038', 'INST-2018-0019', 1, 3),
(52, 'session#16', '2018-10-17', '10:00:00', 1, '2018-0038', 'INST-2018-0019', 1, 2),
(53, 'session#15', '2018-10-16', '11:00:00', 1, '2018-0038', 'INST-2018-0019', 1, 2),
(54, 'session#9', '2018-10-18', '09:00:00', 1, '2018-0039', 'INST-2018-0020', 1, 2),
(55, 'session#1', '2018-10-10', '09:00:00', 1, '2018-0039', 'INST-2018-0020', 1, 3),
(56, 'session#2', '2018-10-11', '09:00:00', 1, '2018-0039', 'INST-2018-0020', 1, 3),
(57, 'session#3', '2018-10-12', '09:00:00', 1, '2018-0039', 'INST-2018-0020', 1, 3),
(58, 'session#4', '2018-10-13', '09:00:00', 1, '2018-0039', 'INST-2018-0020', 1, 3),
(59, 'session#5', '2018-10-14', '10:00:00', 1, '2018-0039', 'INST-2018-0020', 1, 3),
(60, 'session#8', '2018-10-17', '09:00:00', 1, '2018-0039', 'INST-2018-0020', 1, 2),
(61, 'session#10', '2018-10-19', '09:00:00', 1, '2018-0039', 'INST-2018-0020', 1, 2),
(62, 'session#7', '2018-10-16', '10:00:00', 1, '2018-0039', 'INST-2018-0020', 1, 2),
(63, 'session#6', '2018-10-15', '10:00:00', 1, '2018-0039', 'INST-2018-0020', 1, 3),
(64, 'session#13', '2018-10-22', '09:00:00', 1, '2018-0039', 'INST-2018-0020', 1, 2),
(65, 'session#12', '2018-10-21', '09:00:00', 1, '2018-0039', 'INST-2018-0020', 1, 2),
(66, 'session#11', '2018-10-20', '09:00:00', 1, '2018-0039', 'INST-2018-0020', 1, 2),
(67, 'session#14', '2018-10-23', '09:00:00', 1, '2018-0039', 'INST-2018-0020', 1, 2),
(68, 'session#15', '2018-10-24', '09:00:00', 1, '2018-0039', 'INST-2018-0020', 1, 2),
(69, 'session#16', '2018-10-25', '09:00:00', 1, '2018-0039', 'INST-2018-0020', 1, 2),
(70, 'session#10', '2018-10-17', '10:00:00', 1, '2018-0040', 'INST-2018-0020', 1, 2),
(71, 'session#1', '2018-10-08', '09:00:00', 1, '2018-0040', 'INST-2018-0020', 1, 3),
(72, 'session#2', '2018-10-09', '09:00:00', 1, '2018-0040', 'INST-2018-0020', 1, 3),
(73, 'session#3', '2018-10-10', '10:00:00', 1, '2018-0040', 'INST-2018-0020', 1, 3),
(74, 'session#5', '2018-10-12', '11:00:00', 1, '2018-0040', 'INST-2018-0020', 1, 3),
(75, 'session#4', '2018-10-11', '10:00:00', 1, '2018-0040', 'INST-2018-0020', 1, 3),
(76, 'session#6', '2018-10-13', '11:00:00', 1, '2018-0040', 'INST-2018-0020', 1, 3),
(77, 'session#7', '2018-10-14', '11:00:00', 1, '2018-0040', 'INST-2018-0020', 1, 3),
(78, 'session#8', '2018-10-15', '11:00:00', 1, '2018-0040', 'INST-2018-0020', 1, 3),
(79, 'session#9', '2018-10-16', '11:00:00', 1, '2018-0040', 'INST-2018-0020', 1, 2),
(80, 'session#1', '2018-10-08', '09:00:00', 1, '2018-0041', 'INST-2018-0021', 1, 3),
(81, 'session#2', '2018-10-10', '09:00:00', 1, '2018-0041', 'INST-2018-0021', 1, 3),
(82, 'session#3', '2018-10-12', '09:00:00', 1, '2018-0041', 'INST-2018-0021', 1, 3),
(83, 'session#4', '2018-10-15', '09:00:00', 1, '2018-0041', 'INST-2018-0021', 1, 3),
(84, 'session#5', '2018-10-17', '09:00:00', 1, '2018-0041', 'INST-2018-0021', 1, 2),
(85, 'session#6', '2018-10-19', '09:00:00', 1, '2018-0041', 'INST-2018-0021', 1, 2),
(86, 'session#7', '2018-10-22', '09:00:00', 1, '2018-0041', 'INST-2018-0021', 1, 2),
(87, 'session#6', '2018-10-18', '09:00:00', 1, '2018-0042', 'INST-2018-0021', 1, 2),
(88, 'session#7', '2018-10-23', '09:00:00', 1, '2018-0042', 'INST-2018-0021', 1, 2),
(89, 'session#3', '2018-10-11', '09:00:00', 1, '2018-0042', 'INST-2018-0021', 1, 3),
(90, 'session#1', '2018-10-09', '09:00:00', 1, '2018-0042', 'INST-2018-0021', 1, 3),
(91, 'session#2', '2018-10-10', '10:00:00', 1, '2018-0042', 'INST-2018-0021', 1, 3),
(92, 'session#5', '2018-10-17', '10:00:00', 1, '2018-0042', 'INST-2018-0021', 1, 2),
(93, 'session#4', '2018-10-16', '09:00:00', 1, '2018-0042', 'INST-2018-0021', 1, 2),
(94, 'session#9', '2018-10-25', '09:00:00', 1, '2018-0043', 'INST-2018-0021', 1, 2),
(95, 'session#1', '2018-10-15', '10:00:00', 1, '2018-0043', 'INST-2018-0021', 1, 3),
(96, 'session#7', '2018-10-23', '10:00:00', 1, '2018-0043', 'INST-2018-0021', 1, 2),
(97, 'session#3', '2018-10-17', '11:00:00', 1, '2018-0043', 'INST-2018-0021', 1, 2),
(98, 'session#5', '2018-10-19', '10:00:00', 1, '2018-0043', 'INST-2018-0021', 1, 2),
(99, 'session#8', '2018-10-24', '09:00:00', 1, '2018-0043', 'INST-2018-0021', 1, 2),
(100, 'session#6', '2018-10-22', '10:00:00', 1, '2018-0043', 'INST-2018-0021', 1, 2),
(101, 'session#10', '2018-10-26', '09:00:00', 1, '2018-0043', 'INST-2018-0021', 1, 2),
(102, 'session#2', '2018-10-16', '10:00:00', 1, '2018-0043', 'INST-2018-0021', 1, 2),
(103, 'session#4', '2018-10-18', '10:00:00', 1, '2018-0043', 'INST-2018-0021', 1, 2),
(104, 'session#11', '2018-10-29', '09:00:00', 1, '2018-0043', 'INST-2018-0021', 1, 2),
(105, 'session#13', '2018-10-31', '09:00:00', 1, '2018-0043', 'INST-2018-0021', 1, 2),
(106, 'session#12', '2018-10-30', '09:00:00', 1, '2018-0043', 'INST-2018-0021', 1, 2),
(107, 'session#14', '2018-11-01', '09:00:00', 1, '2018-0043', 'INST-2018-0021', 1, 2),
(108, 'session#15', '2018-11-02', '09:00:00', 1, '2018-0043', 'INST-2018-0021', 1, 2),
(109, 'session#16', '2018-11-05', '09:00:00', 1, '2018-0043', 'INST-2018-0021', 1, 2),
(110, 'session#8', '2018-10-22', '09:00:00', 1, '2018-0044', 'INST-2018-0022', 1, 2),
(111, 'session#1', '2018-10-12', '09:00:00', 1, '2018-0044', 'INST-2018-0022', 1, 3),
(112, 'session#2', '2018-10-13', '09:00:00', 1, '2018-0044', 'INST-2018-0022', 1, 3),
(113, 'session#3', '2018-10-14', '09:00:00', 1, '2018-0044', 'INST-2018-0022', 1, 3),
(114, 'session#4', '2018-10-15', '09:00:00', 1, '2018-0044', 'INST-2018-0022', 1, 3),
(115, 'session#5', '2018-10-19', '09:00:00', 1, '2018-0044', 'INST-2018-0022', 1, 2),
(116, 'session#7', '2018-10-21', '09:00:00', 1, '2018-0044', 'INST-2018-0022', 1, 2),
(117, 'session#6', '2018-10-20', '09:00:00', 1, '2018-0044', 'INST-2018-0022', 1, 2),
(118, 'session#10', '2018-10-27', '09:00:00', 1, '2018-0044', 'INST-2018-0022', 1, 2),
(119, 'session#9', '2018-10-26', '09:00:00', 1, '2018-0044', 'INST-2018-0022', 1, 2),
(120, 'session#1', '2018-10-10', '09:00:00', 1, '2018-0045', 'INST-2018-0022', 1, 3),
(121, 'session#2', '2018-10-11', '09:00:00', 1, '2018-0045', 'INST-2018-0022', 1, 3),
(122, 'session#3', '2018-10-12', '10:00:00', 1, '2018-0045', 'INST-2018-0022', 1, 3),
(123, 'session#6', '2018-10-18', '09:00:00', 1, '2018-0045', 'INST-2018-0022', 1, 2),
(124, 'session#4', '2018-10-13', '10:00:00', 1, '2018-0045', 'INST-2018-0022', 1, 3),
(125, 'session#5', '2018-10-17', '09:00:00', 1, '2018-0045', 'INST-2018-0022', 1, 2),
(126, 'session#7', '2018-10-19', '10:00:00', 1, '2018-0045', 'INST-2018-0022', 1, 2),
(127, 'session#5', '2018-10-24', '09:00:00', 1, '2018-0046', 'INST-2018-0022', 1, 2),
(128, 'session#4', '2018-10-22', '10:00:00', 1, '2018-0046', 'INST-2018-0022', 1, 2),
(129, 'session#6', '2018-10-26', '10:00:00', 1, '2018-0046', 'INST-2018-0022', 1, 2),
(130, 'session#1', '2018-10-15', '10:00:00', 1, '2018-0046', 'INST-2018-0022', 1, 3),
(131, 'session#2', '2018-10-17', '10:00:00', 1, '2018-0046', 'INST-2018-0022', 1, 2),
(132, 'session#3', '2018-10-19', '11:00:00', 1, '2018-0046', 'INST-2018-0022', 1, 2),
(133, 'session#7', '2018-10-29', '09:00:00', 1, '2018-0046', 'INST-2018-0022', 1, 2),
(134, 'session#1', '2018-10-15', '10:00:00', 1, '2018-0047', 'INST-2018-0023', 1, 3),
(135, 'session#2', '2018-10-16', '10:00:00', 1, '2018-0047', 'INST-2018-0023', 1, 2),
(136, 'session#3', '2018-10-17', '10:00:00', 1, '2018-0047', 'INST-2018-0023', 1, 2),
(137, 'session#4', '2018-10-18', '10:00:00', 1, '2018-0047', 'INST-2018-0023', 1, 2),
(138, 'session#5', '2018-10-19', '10:00:00', 1, '2018-0047', 'INST-2018-0023', 1, 2),
(139, 'session#1', '2018-10-15', '09:00:00', 1, '2018-0048', 'INST-2018-0023', 1, 3),
(140, 'session#2', '2018-10-16', '09:00:00', 1, '2018-0048', 'INST-2018-0023', 1, 2),
(141, 'session#3', '2018-10-17', '09:00:00', 1, '2018-0048', 'INST-2018-0023', 1, 2),
(142, 'session#4', '2018-10-18', '09:00:00', 1, '2018-0048', 'INST-2018-0023', 1, 2),
(143, 'session#5', '2018-10-19', '09:00:00', 1, '2018-0048', 'INST-2018-0023', 1, 2),
(144, 'session#6', '2018-10-20', '09:00:00', 1, '2018-0048', 'INST-2018-0023', 1, 2),
(145, 'session#7', '2018-10-21', '09:00:00', 1, '2018-0048', 'INST-2018-0023', 1, 2),
(146, 'session#7', '2018-09-25', '09:00:00', 1, '2018-0049', 'INST-2018-0019', 1, 3),
(147, 'session#1', '2018-09-17', '10:00:00', 1, '2018-0049', 'INST-2018-0019', 1, 3),
(148, 'session#2', '2018-09-18', '10:00:00', 1, '2018-0049', 'INST-2018-0019', 1, 3),
(149, 'session#3', '2018-09-19', '10:00:00', 1, '2018-0049', 'INST-2018-0019', 1, 3),
(150, 'session#4', '2018-09-20', '10:00:00', 1, '2018-0049', 'INST-2018-0019', 1, 3),
(151, 'session#5', '2018-09-21', '10:00:00', 1, '2018-0049', 'INST-2018-0019', 1, 3),
(152, 'session#6', '2018-09-24', '10:00:00', 1, '2018-0049', 'INST-2018-0019', 1, 3),
(153, 'session#1', '2018-09-03', '09:00:00', 1, '2018-0050', 'INST-2018-0020', 1, 3),
(154, 'session#2', '2018-09-04', '09:00:00', 1, '2018-0050', 'INST-2018-0020', 1, 3),
(155, 'session#3', '2018-09-05', '09:00:00', 1, '2018-0050', 'INST-2018-0020', 1, 3),
(156, 'session#4', '2018-09-06', '09:00:00', 1, '2018-0050', 'INST-2018-0020', 1, 3),
(157, 'session#5', '2018-09-07', '09:00:00', 1, '2018-0050', 'INST-2018-0020', 1, 3),
(158, 'session#6', '2018-09-10', '09:00:00', 1, '2018-0050', 'INST-2018-0020', 1, 3),
(159, 'session#7', '2018-09-11', '09:00:00', 1, '2018-0050', 'INST-2018-0020', 1, 3),
(160, 'session#8', '2018-09-12', '09:00:00', 1, '2018-0050', 'INST-2018-0020', 1, 3),
(161, 'session#9', '2018-09-13', '09:00:00', 1, '2018-0050', 'INST-2018-0020', 1, 3),
(162, 'session#10', '2018-09-14', '09:00:00', 1, '2018-0050', 'INST-2018-0020', 1, 3),
(163, 'session#11', '2018-09-17', '09:00:00', 1, '2018-0050', 'INST-2018-0020', 1, 3),
(164, 'session#12', '2018-09-18', '09:00:00', 1, '2018-0050', 'INST-2018-0020', 1, 3),
(165, 'session#13', '2018-09-19', '09:00:00', 1, '2018-0050', 'INST-2018-0020', 1, 3),
(166, 'session#14', '2018-09-20', '09:00:00', 1, '2018-0050', 'INST-2018-0020', 1, 3),
(167, 'session#15', '2018-09-21', '09:00:00', 1, '2018-0050', 'INST-2018-0020', 1, 3),
(168, 'session#16', '2018-09-24', '09:00:00', 1, '2018-0050', 'INST-2018-0020', 1, 3);

--
-- Dumping data for table `student`
--

INSERT INTO `student` (`id`, `userInfo`, `license`, `hours`, `prefDays`, `prefCar`, `branch`, `dateRegistered`, `status`) VALUES
('2018-0035', 35, '', 0, '[\"1\",\"4\",\"5\",\"2\"]', 'Altis Toyota', 1, '2018-10-05 06:02:01', 1),
('2018-0036', 36, '', 0, '[\"6\",\"7\"]', 'Vios Toyota', 1, '2018-10-03 06:20:56', 1),
('2018-0037', 37, '', 0, '[\"2\",\"5\"]', 'Lexus Toyota', 1, '2018-10-10 06:35:35', 1),
('2018-0038', 38, '', 0, '[\"7\",\"6\",\"5\"]', 'Lexus Toyota', 1, '2018-10-15 06:37:43', 1),
('2018-0039', 39, '', 0, '[\"2\",\"5\",\"1\",\"4\",\"3\"]', 'Vios Toyota', 1, '2018-10-15 07:00:13', 1),
('2018-0040', 40, '', 0, '[\"1\",\"4\"]', 'Lexus Toyota', 1, '2018-10-15 07:20:04', 1),
('2018-0041', 41, '', 0, '[\"2\",\"5\",\"3\"]', 'Lexus Toyota', 1, '2018-10-15 07:29:33', 1),
('2018-0042', 42, '', 0, '[\"5\",\"2\",\"3\"]', 'Vios Toyota', 1, '2018-10-15 07:36:22', 1),
('2018-0043', 43, '', 0, '[\"5\",\"2\",\"7\"]', 'Corolla AE111 Toyota', 1, '2018-10-15 07:41:13', 1),
('2018-0044', 44, '', 0, '[\"2\",\"5\",\"3\"]', 'Civic Sedan Honda', 1, '2018-10-15 07:50:35', 1),
('2018-0045', 45, '', 0, '[\"1\",\"4\",\"2\",\"3\",\"5\"]', 'Corolla AE111 Toyota', 1, '2018-10-15 07:57:59', 1),
('2018-0046', 46, '', 0, '[\"4\",\"1\",\"6\"]', 'Civic Sedan Honda', 1, '2018-10-15 08:01:56', 1),
('2018-0047', 47, '', 0, '[\"1\",\"4\",\"6\"]', 'Corolla AE111 Toyota', 1, '2018-10-15 08:08:10', 1),
('2018-0048', 48, '', 0, '[\"6\",\"7\"]', 'Corolla AE111 Toyota', 1, '2018-10-15 08:08:24', 1),
('2018-0049', 49, '', 0, '[\"2\",\"5\",\"3\"]', 'Corolla AE111 Toyota', 1, '2018-10-15 15:54:36', 1),
('2018-0050', 50, '', 0, '[\"1\",\"4\",\"7\"]', 'Carina AT210 Toyota', 1, '2018-10-15 18:43:17', 1);

--
-- Dumping data for table `useraccount`
--

INSERT INTO `useraccount` (`id`, `username`, `password`, `accType`, `status`) VALUES
(1, 'graciellatatel@gmail.com', 'd9a7b43d50ac7e36de03e0336b56a223a640aa8b', 1, 1),
(19, 'minerva@gmail.com', '7e240de74fb1ed08fa08d38063f6a6a91462a815', 2, 1),
(20, 'severus@gmail.com', '7e240de74fb1ed08fa08d38063f6a6a91462a815', 2, 1),
(21, 'albus@gmail.com', '7e240de74fb1ed08fa08d38063f6a6a91462a815', 2, 1),
(22, 'rubeus@gmail.com', '7e240de74fb1ed08fa08d38063f6a6a91462a815', 2, 1),
(23, 'filius@gmail.com', '7e240de74fb1ed08fa08d38063f6a6a91462a815', 2, 1),
(24, 'gilderoy@gmail.com', '7e240de74fb1ed08fa08d38063f6a6a91462a815', 2, 1),
(31, 'dolores@gmail.com', '7e240de74fb1ed08fa08d38063f6a6a91462a815', 2, 1),
(32, 'horace@gmail.com', '7e240de74fb1ed08fa08d38063f6a6a91462a815', 2, 1),
(33, 'sybill@gmail.com', '7e240de74fb1ed08fa08d38063f6a6a91462a815', 2, 1),
(34, 'remus@gmail.com', '7e240de74fb1ed08fa08d38063f6a6a91462a815', 2, 1),
(35, 'jengabat@gmail.com', 'd9a7b43d50ac7e36de03e0336b56a223a640aa8b', 4, 1),
(36, 'perrinelaganzo@gmail.com', 'd9a7b43d50ac7e36de03e0336b56a223a640aa8b', 4, 1),
(37, 'christiantupas@gmail.com', 'd9a7b43d50ac7e36de03e0336b56a223a640aa8b', 4, 1),
(38, 'pasado@gmail.com', 'd9a7b43d50ac7e36de03e0336b56a223a640aa8b', 4, 1),
(39, 'harryjamespotter@gmail.com', '7e240de74fb1ed08fa08d38063f6a6a91462a815', 3, 1),
(40, 'susanbones@gmail.com', '7e240de74fb1ed08fa08d38063f6a6a91462a815', 3, 1),
(41, 'hermionegranger@gmail.com', '7e240de74fb1ed08fa08d38063f6a6a91462a815', 3, 1),
(42, 'pavarti@gmail.com', '7e240de74fb1ed08fa08d38063f6a6a91462a815', 3, 1),
(43, 'erniemacmillan@gmail.com', '7e240de74fb1ed08fa08d38063f6a6a91462a815', 3, 1),
(44, 'lavenderbrown@gmail.com', '7e240de74fb1ed08fa08d38063f6a6a91462a815', 3, 1),
(45, 'ronweasley@gmail.com', '7e240de74fb1ed08fa08d38063f6a6a91462a815', 3, 1),
(46, 'justin@gmail.com', '7e240de74fb1ed08fa08d38063f6a6a91462a815', 3, 1),
(47, 'stephen@gmail.com', '7e240de74fb1ed08fa08d38063f6a6a91462a815', 3, 1),
(48, 'seamus@gmail.com', '7e240de74fb1ed08fa08d38063f6a6a91462a815', 3, 1),
(49, 'zacharias@gmail.com', '7e240de74fb1ed08fa08d38063f6a6a91462a815', 3, 1),
(50, 'hannah@gmail.com', '7e240de74fb1ed08fa08d38063f6a6a91462a815', 3, 1),
(51, 'dean@gmail.com', '7e240de74fb1ed08fa08d38063f6a6a91462a815', 3, 1),
(52, 'neville@gmail.com', '7e240de74fb1ed08fa08d38063f6a6a91462a815', 3, 1),
(53, 'chad@gmail.com', '7e240de74fb1ed08fa08d38063f6a6a91462a815', 3, 1),
(54, 'tiara@gmail.com', '7e240de74fb1ed08fa08d38063f6a6a91462a815', 3, 1);

--
-- Dumping data for table `userinfo`
--

INSERT INTO `userinfo` (`id`, `userAcc`, `fullname`, `address`, `telno`, `birthdate`, `birthplace`, `sex`, `civilStatus`, `email`, `userType`) VALUES
(1, 1, 'Graciella Tatel', 'SED Manila', '741-7185', '2018-08-01', 'CSJDM, Bulacan', 'M', 'single', 'sedtest@gmail.com', 1),
(19, 19, 'Minerva__Mcgonagall', 'Caithness, Scotland, Great Britain, Quezon City', '09097879999', '1960-10-04', 'n/a', 'F', 'n/a', 'minerva@gmail.com', 2),
(20, 20, 'Severus__Snape', 'Spinner\'s End, Cokeworth, Midlands, Quezon City', '09091677181', '1960-01-09', 'n/a', 'M', 'n/a', 'severus@gmail.com', 2),
(21, 21, 'Albus Percival__Dumbledore', 'Mould-on-the-Wold, England, Quezon City', '09076778282', '1958-06-30', 'n/a', 'M', 'n/a', 'albus@gmail.com', 2),
(22, 22, 'Rubeus__Hagrid', 'Forest of Dean, West Country, England, Quezon City', '09078980098', '1959-12-06', 'n/a', 'M', 'n/a', 'rubeus@gmail.com', 2),
(23, 23, 'Filius__Flitwick', 'Hogwarts School, Quezon City', '09569290010', '1999-10-17', 'n/a', 'M', 'n/a', 'filius@gmail.com', 2),
(24, 24, 'Gilderoy__Lockhart', 'Blk 43, Lot 1, Quezon City', '09089201101', '1959-12-02', 'n/a', 'M', 'n/a', 'gilderoy@gmail.com', 2),
(27, 31, 'Dolores__Umbridge', 'Caithness, Scotland, Great Britain, Quezon City', '09128900992', '1957-11-01', 'n/a', 'F', 'n/a', 'dolores@gmail.com', 2),
(28, 32, 'Horace__Slughorn', 'Salt Lake, Utah', '09076778291', '1960-05-01', 'n/a', 'M', 'n/a', 'horace@gmail.com', 2),
(29, 33, 'Sybill__Trelawney', 'Caithness, Scotland, Great Britain, Quezon City', '09096662819', '1959-06-22', 'n/a', 'F', 'n/a', 'sybill@gmail.com', 2),
(30, 34, 'Remus__Lupin', 'Blk 43 Lot 2 Phase 2, Quezon City', '09097879921', '1960-10-09', 'n/a', 'M', 'n/a', 'remus@gmail.com', 2),
(31, 35, 'Jen Gabat', 'West Rembo, Makati City', '844-7734', '1985-12-18', 'Makati City', 'F', 'n/a', 'jengabat@gmail.com', 4),
(32, 36, 'Perrine Laganzo', 'Brgy. Pinagsama, Taguig City', '425-7383', '1979-08-16', 'Taguig City', 'F', 'n/a', 'perrinelaganzo@gmail.com', 4),
(33, 37, 'Christian Paul Tupas', 'Novaliches, Quezon City', '938-1236', '1986-12-08', 'Quezon City', 'M', 'n/a', 'christiantupas@gmail.com', 4),
(34, 38, 'Sure Pasado', 'Cartimar Shopping Center', '833-2043', '1978-10-03', 'Cartimar Shopping Center', 'F', 'n/a', 'pasado@gmail.com', 4),
(35, 39, 'Harry _James_Potter', 'Barangay Poblacion, Makati City', '(+63)-927-25', '1996-10-10', 'Makati City', 'M', 'Single', 'harryjamespotter@gmail.com', 3),
(36, 40, 'Susan __Bones', 'Quezon City', '(+63)-987-67', '1996-11-07', 'Quezon City', 'F', 'Single', 'susanbones@gmail.com', 3),
(37, 41, 'Hermione __Granger', 'Barangay Pitogo, Makati City', '(+63)-987-26', '1996-07-18', 'Makati City', 'F', 'Single', 'hermionegranger@gmail.com', 3),
(38, 42, 'Pavarti__Patil', 'Bacoor City, Cavite', '(+63)-903-83', '1993-08-17', 'Bacoor City, Cavite', 'M', 'Married', 'pavarti@gmail.com', 3),
(39, 43, 'Ernie __Macmillan', 'Maria Clara, Quezon City', '(+63)-987-89', '1986-09-08', 'Bulacan', 'M', 'Single', 'erniemacmillan@gmail.com', 3),
(40, 44, 'Scarlet_Lavender_Brown', 'Commonwealth, Quezon City', '(+63)-987-36', '1991-06-05', 'San Pedro, Laguna', 'F', 'Married', 'lavenderbrown@gmail.com', 3),
(41, 45, 'Ron__Weasley', 'Barangay Pinagsama, Taguig City', '(+63)-973-_6', '1996-10-08', 'Taguig City', 'M', 'Single', 'ronweasley@gmail.com', 3),
(42, 46, 'Justin_Finch_Fetchley', 'Quezon City', '(+63)-987-86', '1988-02-09', 'Makati City', 'M', 'Married', 'justin@gmail.com', 3),
(43, 47, 'Stephen_Curry_Cornfoot', 'Quezon City', '(+63)-925-63', '1989-12-25', 'Makati City', 'M', 'Married', 'stephen@gmail.com', 3),
(44, 48, 'Seamus__Finnigan', 'Barangay Ususan, Taguig City', '(+63)-986-56', '1995-02-15', 'Taguig City', 'M', 'Single', 'seamus@gmail.com', 3),
(45, 49, 'Zacharias__Smith', 'Dapitan, Manila City', '(+63)-982-91', '1991-12-30', 'Mindanao', 'M', 'Married', 'zacharias@gmail.com', 3),
(46, 50, 'Hannah__Abbott', 'Quezon City', '(+63)-987-64', '1998-12-31', 'Quezon City', 'F', 'Single', 'hannah@gmail.com', 3),
(47, 51, 'Dean __Thomas', 'General Trias, Cavite', '(+63)-988-29', '1998-08-16', 'Dasmariñas City', 'M', 'Single', 'dean@gmail.com', 3),
(48, 52, 'Neville _Anne_Longbottom', 'Project 8, Quezon City', '(+63)-923-83', '1993-04-15', 'Taguig City', 'F', 'Single', 'neville@gmail.com', 3),
(49, 53, 'Chad_Larez_Danforth', 'Blk 12 Lot 2 Quezon City', '(+63)-928-23', '1987-01-11', 'Blk 12 Lot 2 Quezon City', 'M', 'Single', 'chad@gmail.com', 3),
(50, 54, 'Tiara Shiela_Go_Gold', 'CSJDM, Bulacan', '(+63)-933-00', '1994-06-07', 'CSJDM, Bulacan', 'F', 'Married', 'tiara@gmail.com', 3);

--
-- Dumping data for table `vehicle`
--

INSERT INTO `vehicle` (`id`, `model`, `brand`, `transmission`, `price`, `plate`, `driver`, `garage`, `offday`, `status`) VALUES
(1, 'Toyota', 'Sequoia ', 'a', 'default', 'ZBC562', 'INST-002002', 1, 1, 1),
(4, 'Lexus', 'Toyota', 'A', 'default', 'KSA012', 'INST-003003', 1, 1, 1),
(5, 'Vios', 'Toyota', 'A', 'default', 'JMO019', 'INST-004004', 1, 5, 1),
(6, 'Altis', 'Toyota', 'A', 'default', 'PAF211', 'INST-005005', 1, 1, 1),
(7, 'Corolla AE111', 'Toyota', 'M', 'default', 'OPF0123', 'INST-006006', 1, 2, 1),
(8, 'Carina AT210', 'Toyota', 'M', 'default', 'LMV018', 'INST-007007', 1, 4, 1),
(9, 'Civic Sedan', 'Honda', 'M', 'default', 'ORF180', 'INST-008008', 1, 5, 1),
(10, 'Accord', 'Honda', 'M', 'default', 'JKR731', 'INST-009009', 1, 1, 1);

--
-- Dumping data for table `web_branch`
--

INSERT INTO `web_branch` (`id`, `branchID`, `branchName`, `location`, `fulladdress`, `telno`) VALUES
(1, 1, 'Main, Quezon City', 'Quezon City', 'Mayon St. Cor. Maria Clara, Quezon city', '741-7185'),
(2, 2, 'Taguig City', 'Taguig City', 'First Level Market! Market! Fort Bonifacio Taguig Global City', '844-7734'),
(3, 3, 'Cubao, Quezon City', 'Quezon City', 'Shopwise Cubao, Gen. Aguinaldo Ave., Socorro, Quezon City', '425-7383'),
(4, 4, 'Q. Ave, Quezon City', 'Quezon City', 'Fortunata Bldg., 663 Q. Avenue between Araneta Ave., and Sto. Domingo ', '938-1236'),
(5, 5, 'Pasay City', 'Pasay City', 'Cartimar Shopping Center, Rm. 1A Pasay Taft (between Libertad and Buendia)', '833-2043');

--
-- Dumping data for table `web_course`
--

INSERT INTO `web_course` (`id`, `courseID`, `transmission`, `days`, `hour`, `price`) VALUES
(11, 1, 'a', 5, 60, 3500),
(12, 2, 'a', 7, 60, 4900),
(13, 3, 'a', 10, 60, 7000),
(14, 4, 'a', 15, 60, 10500),
(15, 5, 'a', 20, 60, 14000),
(16, 6, 'm', 5, 60, 2500),
(17, 7, 'm', 7, 60, 3500),
(18, 8, 'm', 10, 60, 5000),
(19, 9, 'm', 15, 60, 7500),
(20, 10, 'm', 20, 60, 10000);
SET FOREIGN_KEY_CHECKS=1;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
