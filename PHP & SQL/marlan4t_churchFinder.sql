SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `marlan4t_churchFinder`
--

-- --------------------------------------------------------

--
-- Table `Church`
--

CREATE TABLE IF NOT EXISTS `Church` (
  `churchID` int(5) unsigned NOT NULL AUTO_INCREMENT COMMENT 'ID of Church',
  `name` varchar(100) CHARACTER SET utf8 NOT NULL COMMENT 'Name of Church',
  `address` varchar(75) CHARACTER SET utf8 NOT NULL COMMENT 'Address of Church',
  `city` varchar(50) CHARACTER SET utf8 NOT NULL COMMENT 'City of Church',
  `county` varchar(50) CHARACTER SET utf8 NOT NULL COMMENT 'County of Church',
  `telephone` varchar(25) CHARACTER SET utf8 DEFAULT NULL COMMENT 'Telephone of Church',
  `coordinates` varchar(50) CHARACTER SET utf8 NOT NULL COMMENT 'Coordinates of Church',
  `weekdayMass` varchar(100) CHARACTER SET utf8 DEFAULT NULL COMMENT 'Weekday Masses of Church',
  `weekendMass` varchar(100) CHARACTER SET utf8 NOT NULL COMMENT 'Weekend Masses of Church',
  PRIMARY KEY (`churchID`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 COLLATE=latin1_general_ci AUTO_INCREMENT=15 ;

--
-- Table `Church`
--

INSERT INTO `Church` (`churchID`, `name`, `address`, `city`, `county`, `telephone`, `coordinates`, `weekdayMass`, `weekendMass`) VALUES
(1, 'St. Mary''s Priory', 'Main Street', 'Tallaght', 'Dublin', '01-4048-100', '53.288597, -6.360676', 'Mon-Fri: 7:00am, 8:00am, 10:00am, 1:00pm, 8:00pm / Sat: 8.00am, 10.00am', '8.00am, 9:00am(Irish), 10.00am, 11:15am, 12.30pm, 6:00pm'),
(2, 'St. Dominic''s Church', 'St. Dominic''s Presbytery, St. Dominic''s Road', 'Tallaght', 'Dublin', 'No telephone', '53.284212, -6.354938', 'Mon-Fri: 10:00am, 7:30 pm / Sat: 11:00am', '9:00am, 10:30am(Family), 11:45am(Folk), 6:30pm'),
(3, 'Saint Mark''s Church', 'Maplewood Road, Springfield', 'Tallaght', 'Dublin', '01-4519-109', '53.286086, -6.387267', 'Mon-Sat: 10:00am', '10:30am, 12:30pm / (3rd Sun: Indian Community(Syro-Malabar rite): 2.30pm'),
(4, 'Church of Our Lady and St. David', 'Sallins Road', 'Naas', 'Kildare', '045-879-730', '53.220131, -6.662607', 'Mon-Fri: 7:30am, 10:00am / Sat 10:00am', 'Sat(Vigil): 6:00pm / Sunday: 9:00am, 11:00am, 6:00pm'),
(5, 'Church of the Irish Martyrs'' Ballycane', 'Ballycane Road', 'Naas', 'Kildare', '045-895-629', '53.211492, -6.653549', 'Mon, Wed, Frid: 7:30pm', '10:30am, 12:00am'),
(6, 'Our Lady of the Rosary and Guardian Angels', 'Church Avenue', 'Sallins', 'Kildare', '045-897-150', '53.248494, -6.664030', 'Mon-Fri: 10.00am', '10.00am, 12:00pm'),
(7, 'St Peter''s Church', 'Two-Mile-House', 'Naas', 'Kildare', '087 230 9804', '53.170785, -6.699692', 'Fri: 7.00pm', '11.00am'),
(8, 'St Mary''s', 'Church Rd', 'Athy', 'Kildare', '059-862-7123', '52.990119, -6.980176', '- No Mass -', '10.00am'),
(9, 'St Brigid''s', 'Suncroft, Curragh', 'Suncroft', 'Kildare', 'No telephone', '53.108888, -6.860888', 'Mon-Fri: 9:30am (except Thurs)', 'Sat(Vigil): 7:30pm / Sunday: 10:30am'),
(10, 'St Patrick''s Church', 'Main St', 'Celbridge', 'Kildare', '01-628-8827', '53.339856, -6.539556', 'Mon-Fri: 10.00am, 7.00pm / Sat:10.00am', 'Sat(Vigil): 6:30pm / Sunday: 8:30am, 9.30am, 11.00am, 12.30 pm, 7.00pm'),
(11, 'St. Brigid''s Chapel Of Ease', 'Barberstown Road', 'Straffan', 'Kildare', '01-628-8827', '53.312575, -6.608748', 'Mon-Sat: 9.15am', 'Sat(Vigil): 6:00pm / Sunday: 11.00am'),
(12, 'St Anne''s Church', 'Ardclough', 'Straffan', 'Kildare', '01-627-3370', '53.297854, -6.569898', '- No Mass -', '09:30am'),
(13, 'St. Mary''s Pro Cathedral', '83 Marlborough Street ', 'Dublin City Center', 'Dublin', '01-874-5441', '53.350883, -6.259076', 'Mon-Sat: 08:30AM; 10:00AM; 11:00AM; 12:45PM; 05:45PM', 'Sunday: 10:00AM; 11:00AM; 12:45PM; 06:30PM '),
(14, 'St. James Church', 'James''s Street/Echlin Street', 'Dublin City Center', 'Dublin', 'No telephone', '53.343100, -6.287857', 'Mon-Sat: 10:00AM', 'Sunday: 10:00AM; 11:30AM');

-- --------------------------------------------------------

--
-- Table `ChurchImage`
--

CREATE TABLE IF NOT EXISTS `ChurchImage` (
  `imageID` int(11) NOT NULL AUTO_INCREMENT,
  `churchID` int(11) NOT NULL,
  `filePath` varchar(150) CHARACTER SET utf8 NOT NULL,
  PRIMARY KEY (`imageID`),
  KEY `churchID` (`churchID`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 COLLATE=latin1_general_ci AUTO_INCREMENT=42 ;

--
-- Table `ChurchImage`
--

INSERT INTO `ChurchImage` (`imageID`, `churchID`, `filePath`) VALUES
(15, 4, 'http://www.churchfinderireland.com/images/6229'),
(17, 5, 'http://www.churchfinderireland.com/images/6237'),
(18, 5, 'http://www.churchfinderireland.com/images/6238'),
(21, 3, 'http://www.churchfinderireland.com/images/7884'),
(22, 3, 'http://www.churchfinderireland.com/images/7885'),
(23, 1, 'http://www.churchfinderireland.com/images/7887'),
(24, 1, 'http://www.churchfinderireland.com/images/7888'),
(25, 4, 'http://www.churchfinderireland.com/images/7891'),
(26, 2, 'http://www.churchfinderireland.com/images/7967'),
(27, 2, 'http://www.churchfinderireland.com/images/7968'),
(29, 10, 'http://www.churchfinderireland.com/images/8009'),
(30, 10, 'http://www.churchfinderireland.com/images/8008'),
(32, 10, 'http://www.churchfinderireland.com/images/8007'),
(33, 9, 'http://www.churchfinderireland.com/images/8030'),
(34, 7, 'http://www.churchfinderireland.com/images/8031'),
(35, 7, 'http://www.churchfinderireland.com/images/8032'),
(36, 0, 'http://www.churchfinderireland.com/images/'),
(37, 0, 'http://www.churchfinderireland.com/images/'),
(38, 8, 'http://www.churchfinderireland.com/images/8712'),
(39, 0, 'http://www.churchfinderireland.com/images/'),
(40, 0, 'http://www.churchfinderireland.com/images/'),
(41, 0, 'http://www.churchfinderireland.com/images/');

-- --------------------------------------------------------

--
-- Table `Users`
--

CREATE TABLE IF NOT EXISTS `Users` (
  `userID` int(11) NOT NULL AUTO_INCREMENT COMMENT 'User ID',
  `username` varchar(25) NOT NULL COMMENT 'User Name',
  `password` varchar(20) NOT NULL COMMENT 'Password',
  `email` varchar(50) NOT NULL COMMENT 'Email',
  PRIMARY KEY (`userID`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=12 ;

--
-- Table `Users`
--

INSERT INTO `Users` (`userID`, `username`, `password`, `email`) VALUES
(1, 'marleysbr', 'mar2014doso', 'marleysbr@gmail.com'),
(3, 'ste888', 'aaaaaaaa', 'ste@gmail.com'),
(4, 'tezball', 'poker1', 'tezball86@gmail.com'),
(9, 'aaa', 'aaaa', 'a@a.com'),
(10, 'Camilla', 'Brasil03', 'camilla_marchini@hotmail.com');

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
