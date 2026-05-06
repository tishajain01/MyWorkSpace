-- MySQL dump 10.13  Distrib 8.0.38, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: project_management
-- ------------------------------------------------------
-- Server version	8.0.38

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `projects`
--

DROP TABLE IF EXISTS `projects`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `projects` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `project_name` varchar(255) NOT NULL,
  `manager_name` varchar(255) NOT NULL,
  `start_date` date NOT NULL,
  `end_date` date NOT NULL,
  `description` varchar(255) DEFAULT NULL,
  `status` varchar(255) DEFAULT NULL,
  `priority` varchar(255) DEFAULT NULL,
  `user_id` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_user` (`user_id`),
  CONSTRAINT `fk_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=50 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `projects`
--

LOCK TABLES `projects` WRITE;
/*!40000 ALTER TABLE `projects` DISABLE KEYS */;
INSERT INTO `projects` VALUES (15,'Desk Setup','Tisha jain','2026-02-13','2026-02-24','fgdsgdsrg','On Hold','High',5),(28,'Alpha Tech Launch','Tisha','2026-02-01','2026-05-01','Initial phase of software rollout.','Running','High',6),(29,'Beta Testing Phase','Tisha','2026-02-05','2026-03-15','User acceptance testing for mobile app.','Pending','Low',6),(30,'Database Migration','Tisha','2026-02-10','2026-04-20','Migrating local storage to MySQL.','Completed','High',6),(31,'UI/UX Revamp','Tisha','2026-03-01','2026-06-01','Redesigning the workspace dashboard.','Pending','Low',6),(32,'Security Audit','Tisha','2026-01-15','2026-02-15','Full system security check.','Completed','High',6),(33,'API Integration','Tisha','2026-02-20','2026-05-20','Connecting third-party payment gateways.','Running','Medium',6),(34,'Marketing Campaign','Tisha','2026-04-01','2026-05-01','Social media outreach program.','Pending','Low',6),(35,'Cloud Infrastructure','Tisha','2026-02-25','2026-08-25','Moving servers to AWS.','Running','High',6),(36,'Client Onboarding','Tisha','2026-01-01','2026-01-30','Setting up new enterprise clients.','Completed','Medium',6),(37,'Quality Assurance','Tisha','2026-03-10','2026-04-10','Automated regression testing.\n','On Hold','Medium',6),(38,'Internal Training','Tisha','2026-05-05','2026-05-20','Staff workshop on Spring Boot.','Pending','Low',6),(39,'Documentation Update','Tisha','2026-02-01','2026-02-28','Updating technical manuals.','Running','Medium',6),(40,'Hardware Upgrade','Tisha','2026-06-01','2026-07-01','Upgrading development machines.','Pending','Low',6),(41,'SEO Optimization','Tisha','2026-02-15','2026-03-30','Improving search rankings.','Running','Medium',6),(42,'Final System Handover','Tisha','2026-08-01','2026-08-15','Handing over code to maintenance.','Pending','High',6),(45,'sa','s','2026-02-13','2026-02-24','sas','Pending','Low',6),(46,'Shopsee','ede','2026-02-14','2026-02-25','sededed','Pending','High',5),(48,'New Website Desing','Amit Mehra','2026-02-05','2026-02-06','newww','Completed','Low',5),(49,'My Project','Tisha Jain','2026-02-25','2026-03-05','1) Make new roller\n','Pending','High',6);
/*!40000 ALTER TABLE `projects` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `roles`
--

DROP TABLE IF EXISTS `roles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `roles` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `role_name` varchar(100) NOT NULL,
  `description` text,
  PRIMARY KEY (`id`),
  UNIQUE KEY `role_name` (`role_name`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `roles`
--

LOCK TABLES `roles` WRITE;
/*!40000 ALTER TABLE `roles` DISABLE KEYS */;
INSERT INTO `roles` VALUES (1,'Developer',NULL),(2,'Tester',NULL),(3,'Designer',NULL),(4,'Project Manager',NULL);
/*!40000 ALTER TABLE `roles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` varchar(255) DEFAULT NULL,
  `creation_date` date DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (5,'kalpesh','kalpeshgunjal07@gmail.com','$2a$10$Pn7g.inSPCHEu57U.P17hebti.ga8CtXQO8yNhjqbTHK27KjdrB7a','USER',NULL),(6,'tisha','tisha@gmail.com','$2a$10$tv54xb2h5d3rx5LAPNSHQObWO6/0BmYoyawlh/JzSa6P6kDx6bWTK','USER',NULL),(7,'hh','k@mail.com','$2a$10$K30jUvTjpc1Ru9Frq08S/OHADPSDxi3QLOj7OMSxQubaPa86vDUUW','USER',NULL),(8,'Kalpesh','kalpesh@gmail.com','$2a$10$WJ6PopMa6eHsb3VZyG7XU.Ok7F750/BuYzcVjWmrvwJJOgX5cLZ6y','USER',NULL),(9,'Kalpesh gunjal','k@gmail.com','$2a$10$iiN9nwtaMh/icidd82jjguE8yaqKm1vQ8FAVQPY8ID8W6QY.Trbwm','USER',NULL);
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-02-04 20:25:37
