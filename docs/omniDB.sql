-- MySQL dump 10.13  Distrib 8.0.21, for Win64 (x86_64)
--
-- Host: localhost    Database: omni
-- ------------------------------------------------------
-- Server version	5.6.10

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
-- Table structure for table `notification`
--

DROP TABLE IF EXISTS `notification`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `notification` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) DEFAULT NULL,
  `shipment_id` int(11) DEFAULT NULL,
  `detail` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_notification_shipment_id_idx` (`shipment_id`),
  CONSTRAINT `fk_notification_shipment_id` FOREIGN KEY (`shipment_id`) REFERENCES `shipment` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_notification_user_id` FOREIGN KEY (`id`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `notification`
--

LOCK TABLES `notification` WRITE;
/*!40000 ALTER TABLE `notification` DISABLE KEYS */;
INSERT INTO `notification` VALUES (1,1,10,'Your order has been shipped'),(2,1,11,'Your order has been shipped'),(3,1,12,'Your order has been shipped'),(4,1,13,'Your order has been shipped'),(5,1,14,'Your order has been shipped'),(6,1,15,'Your order has been shipped'),(7,1,16,'Your order has been shipped'),(8,1,17,'Your order has been shipped'),(9,1,18,'Your order has been shipped'),(10,1,19,'Your order has been shipped'),(11,1,20,'Your order has been shipped'),(12,1,21,'Your order has been shipped'),(13,1,22,'Your order has been shipped'),(14,1,23,'Your order has been shipped'),(15,1,24,'Your order has been shipped'),(16,1,25,'Your order has been shipped'),(17,1,26,'Your order has been shipped'),(18,1,27,'Your order has been shipped'),(19,1,28,'Your order has been shipped'),(20,1,29,'Your order has been shipped'),(21,1,30,'Your order has been shipped'),(22,1,31,'Your order has been shipped');
/*!40000 ALTER TABLE `notification` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `order`
--

DROP TABLE IF EXISTS `order`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `order` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) DEFAULT NULL,
  `status` varchar(45) NOT NULL,
  `total` varchar(45) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_order_user_id_idx` (`user_id`),
  CONSTRAINT `fk_order_user_id` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=50 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `order`
--

LOCK TABLES `order` WRITE;
/*!40000 ALTER TABLE `order` DISABLE KEYS */;
INSERT INTO `order` VALUES (1,1,'new','1380'),(2,1,'new','1380'),(3,1,'new','1380'),(4,1,'new','590'),(7,1,'new','210190'),(8,1,'new','780'),(15,23,'new','3380'),(16,25,'new','3380'),(17,27,'new','3380'),(18,29,'new','3380'),(19,31,'new','3380'),(20,33,'new','3380'),(21,35,'new',''),(24,46,'new','980'),(25,47,'new','980'),(26,48,'new','980'),(27,49,'new','980'),(28,50,'new','980'),(29,51,'new','980'),(30,52,'new','980'),(31,53,'new','980'),(32,54,'new','980'),(33,55,'new','980'),(34,56,'new','980'),(35,57,'new','980'),(36,58,'new','980'),(37,59,'new','980'),(38,60,'new','980'),(39,61,'new','980'),(40,62,'new','980'),(41,63,'new','980'),(42,64,'new','980'),(43,65,'new','980'),(44,66,'new','980'),(45,67,'new','980'),(46,68,'new','980'),(47,69,'new','980'),(48,70,'new','980'),(49,71,'new','980');
/*!40000 ALTER TABLE `order` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `order_payment`
--

DROP TABLE IF EXISTS `order_payment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `order_payment` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `order_id` int(11) NOT NULL,
  `payment_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_order_payment_order_id_idx` (`order_id`),
  KEY `fk_order_payment_payment_id_idx` (`payment_id`),
  CONSTRAINT `fk_order_payment_order_id` FOREIGN KEY (`order_id`) REFERENCES `order` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_order_payment_payment_id` FOREIGN KEY (`payment_id`) REFERENCES `payment` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=41 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `order_payment`
--

LOCK TABLES `order_payment` WRITE;
/*!40000 ALTER TABLE `order_payment` DISABLE KEYS */;
INSERT INTO `order_payment` VALUES (1,1,1),(5,1,5),(7,16,7),(8,17,8),(9,18,9),(10,19,10),(11,20,11),(15,24,15),(16,25,16),(17,26,17),(18,27,18),(19,28,19),(20,29,20),(21,30,21),(22,31,22),(23,32,23),(24,33,24),(25,34,25),(26,35,26),(27,36,27),(28,37,28),(29,38,29),(30,39,30),(31,40,31),(32,41,32),(33,42,33),(34,43,34),(35,44,35),(36,45,36),(37,46,37),(38,47,38),(39,48,39),(40,49,40);
/*!40000 ALTER TABLE `order_payment` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `order_product`
--

DROP TABLE IF EXISTS `order_product`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `order_product` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `order_id` int(11) DEFAULT NULL,
  `product_id` int(11) DEFAULT NULL,
  `shipment_id` int(11) DEFAULT NULL,
  `quantity` varchar(45) DEFAULT NULL,
  `price` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_order_product_order_id_idx` (`order_id`),
  KEY `fk_order_product_product_id_idx` (`product_id`),
  KEY `fk_order_product_shipment_id_idx` (`shipment_id`),
  CONSTRAINT `fk_order_product_order_id` FOREIGN KEY (`order_id`) REFERENCES `order` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_order_product_product_id` FOREIGN KEY (`product_id`) REFERENCES `product` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_order_product_shipment_id` FOREIGN KEY (`shipment_id`) REFERENCES `shipment` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=78 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `order_product`
--

LOCK TABLES `order_product` WRITE;
/*!40000 ALTER TABLE `order_product` DISABLE KEYS */;
INSERT INTO `order_product` VALUES (1,1,1,NULL,'1','1000'),(2,1,2,NULL,'2','380'),(3,2,1,2,'1','1000'),(4,2,2,2,'2','380'),(5,3,1,NULL,'1','1000'),(6,3,2,NULL,'2','380'),(7,4,3,NULL,'1','210'),(8,4,2,NULL,'2','380'),(9,7,3,NULL,'1','210'),(10,7,2,NULL,'1','190'),(11,8,3,NULL,'1','210'),(12,8,2,NULL,'3','570'),(13,15,1,NULL,'3','3000'),(14,15,2,NULL,'2','380'),(15,16,1,NULL,'3','3000'),(16,16,2,NULL,'2','380'),(17,17,1,NULL,'3','3000'),(18,17,2,NULL,'2','380'),(19,18,1,NULL,'3','3000'),(20,18,2,NULL,'2','380'),(21,19,1,NULL,'3','3000'),(22,19,2,NULL,'2','380'),(23,20,1,NULL,'3','3000'),(24,20,2,NULL,'2','380'),(25,21,34,NULL,'3','540'),(26,24,40,NULL,'3','540'),(27,24,41,NULL,'2','440'),(28,25,42,NULL,'3','540'),(29,25,43,NULL,'2','440'),(30,26,44,8,'3','540'),(31,26,45,8,'2','440'),(32,27,46,9,'3','540'),(33,27,47,9,'2','440'),(34,28,48,10,'3','540'),(35,28,49,10,'2','440'),(36,29,50,11,'3','540'),(37,29,51,11,'2','440'),(38,30,52,12,'3','540'),(39,30,53,12,'2','440'),(40,31,54,13,'3','540'),(41,31,55,13,'2','440'),(42,32,56,14,'3','540'),(43,32,57,14,'2','440'),(44,33,58,15,'3','540'),(45,33,59,15,'2','440'),(46,34,60,16,'3','540'),(47,34,61,16,'2','440'),(48,35,62,17,'3','540'),(49,35,63,17,'2','440'),(50,36,64,18,'3','540'),(51,36,65,18,'2','440'),(52,37,66,19,'3','540'),(53,37,67,19,'2','440'),(54,38,68,20,'3','540'),(55,38,69,20,'2','440'),(56,39,70,21,'3','540'),(57,39,71,21,'2','440'),(58,40,72,22,'3','540'),(59,40,73,22,'2','440'),(60,41,74,23,'3','540'),(61,41,75,23,'2','440'),(62,42,76,24,'3','540'),(63,42,77,24,'2','440'),(64,43,78,25,'3','540'),(65,43,79,25,'2','440'),(66,44,80,26,'3','540'),(67,44,81,26,'2','440'),(68,45,82,27,'3','540'),(69,45,83,27,'2','440'),(70,46,84,28,'3','540'),(71,46,85,28,'2','440'),(72,47,86,29,'3','540'),(73,47,87,29,'2','440'),(74,48,88,30,'3','540'),(75,48,89,30,'2','440'),(76,49,90,31,'3','540'),(77,49,91,31,'2','440');
/*!40000 ALTER TABLE `order_product` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `payment`
--

DROP TABLE IF EXISTS `payment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `payment` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `status` varchar(45) NOT NULL,
  `payment_method` varchar(45) NOT NULL,
  `amount` varchar(45) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=41 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `payment`
--

LOCK TABLES `payment` WRITE;
/*!40000 ALTER TABLE `payment` DISABLE KEYS */;
INSERT INTO `payment` VALUES (1,'pending','card','111'),(2,'pending','cash','150'),(3,'pending','cash','150'),(4,'pending','cash','150'),(5,'pending','cash','111'),(6,'pending','cash','150'),(7,'pending','cash','150'),(8,'pending','cash','150'),(9,'pending','cash','150'),(10,'pending','cash','150'),(11,'pending','cash','150'),(12,'pending','cash','150'),(13,'pending','cash','150'),(14,'pending','cash','150'),(15,'pending','cash','150'),(16,'pending','cash','150'),(17,'pending','cash','150'),(18,'pending','cash','150'),(19,'pending','cash','150'),(20,'pending','cash','150'),(21,'pending','cash','150'),(22,'pending','cash','150'),(23,'pending','cash','150'),(24,'pending','cash','150'),(25,'pending','cash','150'),(26,'pending','cash','150'),(27,'pending','cash','150'),(28,'pending','cash','150'),(29,'pending','cash','150'),(30,'pending','cash','150'),(31,'pending','cash','150'),(32,'pending','cash','150'),(33,'pending','cash','150'),(34,'pending','cash','150'),(35,'pending','cash','150'),(36,'pending','cash','150'),(37,'pending','cash','150'),(38,'pending','cash','150'),(39,'pending','cash','150'),(40,'pending','cash','150');
/*!40000 ALTER TABLE `payment` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `product`
--

DROP TABLE IF EXISTS `product`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `product` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  `price` varchar(45) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=92 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product`
--

LOCK TABLES `product` WRITE;
/*!40000 ALTER TABLE `product` DISABLE KEYS */;
INSERT INTO `product` VALUES (1,'Keyboard a333','1000'),(2,'Keyboard w333','190'),(3,'Mouse 502','210'),(4,'Headset','112'),(5,'Headset x33','180'),(6,'Webcam HD 1080p','220'),(7,'Headset x33','180'),(8,'Webcam HD 1080p','220'),(9,'Headset x33','180'),(10,'Webcam HD 1080p','220'),(11,'Headset x33','180'),(12,'Webcam HD 1080p','220'),(13,'Headset x33','180'),(14,'Webcam HD 1080p','220'),(15,'Headset x33','180'),(16,'Webcam HD 1080p','220'),(17,'Headset x33','180'),(18,'Headset x33','180'),(19,'Webcam HD 1080p','220'),(20,'Headset x33','180'),(21,'Webcam HD 1080p','220'),(22,'Headset x33','180'),(23,'Webcam HD 1080p','220'),(24,'Headset x33','180'),(25,'Webcam HD 1080p','220'),(26,'Headset x33','180'),(27,'Webcam HD 1080p','220'),(28,'Headset x33','180'),(29,'Webcam HD 1080p','220'),(30,'Headset x33','180'),(31,'Webcam HD 1080p','220'),(32,'Headset x33','180'),(33,'Webcam HD 1080p','220'),(34,'Headset x33','180'),(35,'Webcam HD 1080p','220'),(36,'Headset x33','180'),(37,'Webcam HD 1080p','220'),(38,'Headset x33','180'),(39,'Webcam HD 1080p','220'),(40,'Headset x33','180'),(41,'Webcam HD 1080p','220'),(42,'Headset x33','180'),(43,'Webcam HD 1080p','220'),(44,'Headset x33','180'),(45,'Webcam HD 1080p','220'),(46,'Headset x33','180'),(47,'Webcam HD 1080p','220'),(48,'Headset x33','180'),(49,'Webcam HD 1080p','220'),(50,'Headset x33','180'),(51,'Webcam HD 1080p','220'),(52,'Headset x33','180'),(53,'Webcam HD 1080p','220'),(54,'Headset x33','180'),(55,'Webcam HD 1080p','220'),(56,'Headset x33','180'),(57,'Webcam HD 1080p','220'),(58,'Headset x33','180'),(59,'Webcam HD 1080p','220'),(60,'Headset x33','180'),(61,'Webcam HD 1080p','220'),(62,'Headset x33','180'),(63,'Webcam HD 1080p','220'),(64,'Headset x33','180'),(65,'Webcam HD 1080p','220'),(66,'Headset x33','180'),(67,'Webcam HD 1080p','220'),(68,'Headset x33','180'),(69,'Webcam HD 1080p','220'),(70,'Headset x33','180'),(71,'Webcam HD 1080p','220'),(72,'Headset x33','180'),(73,'Webcam HD 1080p','220'),(74,'Headset x33','180'),(75,'Webcam HD 1080p','220'),(76,'Headset x33','180'),(77,'Webcam HD 1080p','220'),(78,'Headset x33','180'),(79,'Webcam HD 1080p','220'),(80,'Headset x33','180'),(81,'Webcam HD 1080p','220'),(82,'Headset x33','180'),(83,'Webcam HD 1080p','220'),(84,'Headset x33','180'),(85,'Webcam HD 1080p','220'),(86,'Headset x33','180'),(87,'Webcam HD 1080p','220'),(88,'Headset x33','180'),(89,'Webcam HD 1080p','220'),(90,'Headset x33','180'),(91,'Webcam HD 1080p','220');
/*!40000 ALTER TABLE `product` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `shipment`
--

DROP TABLE IF EXISTS `shipment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `shipment` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `status` varchar(15) NOT NULL,
  `date` datetime NOT NULL,
  `order_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_shipment_order_id_idx` (`order_id`),
  CONSTRAINT `fk_shipment_order_id` FOREIGN KEY (`order_id`) REFERENCES `order` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=32 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `shipment`
--

LOCK TABLES `shipment` WRITE;
/*!40000 ALTER TABLE `shipment` DISABLE KEYS */;
INSERT INTO `shipment` VALUES (1,'rest','2022-04-14 23:30:00',2),(2,'rest','2020-04-14 23:30:00',2),(3,'rest','2022-04-14 23:30:00',2),(8,'rest','2021-04-14 23:30:00',26),(9,'testShip','2021-04-14 23:30:00',27),(10,'sent','2021-04-14 23:30:00',28),(11,'sent','2021-04-14 23:30:00',29),(12,'sent','2021-04-14 23:30:00',30),(13,'sent','2021-04-14 23:30:00',31),(14,'sent','2021-04-14 23:30:00',32),(15,'sent','2021-04-14 23:30:00',33),(16,'sent','2021-04-14 23:30:00',34),(17,'sent','2021-04-14 23:30:00',35),(18,'sent','2021-04-14 23:30:00',36),(19,'sent','2021-04-14 23:30:00',37),(20,'sent','2021-04-14 23:30:00',38),(21,'sent','2021-04-14 23:30:00',39),(22,'sent','2021-04-14 23:30:00',40),(23,'sent','2021-04-14 23:30:00',41),(24,'sent','2021-04-14 23:30:00',42),(25,'sent','2021-04-14 23:30:00',43),(26,'sent','2021-04-14 23:30:00',44),(27,'sent','2021-04-14 23:30:00',45),(28,'sent','2021-04-14 23:30:00',46),(29,'sent','2021-04-14 23:30:00',47),(30,'sent','2021-04-14 23:30:00',48),(31,'sent','2021-04-14 23:30:00',49);
/*!40000 ALTER TABLE `shipment` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  `email` varchar(75) NOT NULL,
  `address` varchar(145) NOT NULL,
  `password` varchar(245) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=72 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,'Jhon Doe','jhonDoe@mail.com','2323 East 12 542','432142'),(2,'Kellie Spencer','ac.turpis@outlook.couk','6024 At, Road','84151'),(3,'Sharon Bates','nec.metus.facilisis@yahoo.com','480-2774 Consectetuer, Rd.','163318'),(4,'Willow Fowler','quam.quis@yahoo.edu','Ap #832-6603 Ipsum Rd.','29564'),(5,'Michael Fields','nec.euismod.in@hotmail.org','4466 Morbi Road','335705'),(6,'Ezra Lane','lacus.vestibulum@google.ca','Ap #803-6666 Urna. Rd.','144513'),(7,'Victoria Austin','eget.tincidunt@yahoo.couk','Ap #633-969 Dui St.','227787'),(8,'Acton Grave','vitae.dolor.donec@hotmail.orgs','7579 Proin Rd.s','S4K 8H9s'),(9,'Justine Lambert','vehicula@outlook.couk','8739 Sodales Rd.','0742'),(10,'Rudyard Solomon','fringilla.porttitor.vulputate@hotmail.edu','4892 Id, Rd.','41825'),(11,'Mona Herrera','magna@outlook.edu','863-687 Semper Rd.','872963'),(12,'Guinevere Hendrix','sit@aol.ca','P.O. Box 515, 9230 Sed Road','8605'),(13,'Lydia Ruiz','mollis.phasellus@google.net','155-1084 Eu Rd.','50207'),(14,'Jana Hudson','dictum@outlook.net','Ap #731-2479 Phasellus Rd.','XT8L 8JU'),(15,'Cecilia Ferguson','non@icloud.edu','787-3177 A, Av.','75333'),(16,'Justina Warren','ut.tincidunt.vehicula@google.ca','Ap #744-9666 Fusce Rd.','F65 7HU'),(17,'Upton Solomon','fermentum@yahoo.org','P.O. Box 685, 3927 Consectetuer Street','8162'),(18,'Palmer Meyer','ac.mattis@hotmail.couk','5133 Erat Av.','3759'),(19,'Kelly Fowler','ac.orci@google.net','844-6892 Amet Avenue','31058'),(20,'Xavier Barber','vel.arcu@aol.ca','Ap #285-2322 Magna Rd.','51282-55022'),(21,'Odysseus Workman','sit.amet@google.com','294-4403 Et, Street','67003'),(22,'Sandra Ware','nullam.enim@yahoo.com','472-3746 Consequat Street','5542'),(23,'Quon Cooke','fringilla.euismod@google.com','2636 Cras Rd.','65725-596'),(24,'Jasmine Mclaughlin','orci.luctus@google.ca','Ap #487-6391 Porttitor Rd.','3681'),(25,'Rudyard Alexander','non@hotmail.edu','Ap #239-3057 Dui. St.','25440'),(27,'Jhon Chamaquito','jhonDoe@mail.com2','2323 East 12 5422222','432142'),(28,'Jane Doe','test@example.com','3232 AV23','Password123'),(29,'Jane Doe','test@example.com','3232 AV23','Password123'),(30,'Jane Doe','test@example.com','3232 AV23','Password123'),(31,'Jane Doe','test@example.com','3232 AV23','Password123'),(32,'Jane Doe','test@example.com','3232 AV23','Password123'),(33,'Jane Doe','test@example.com','3232 AV23','Password123'),(34,'Jane Doe','test@example.com','3232 AV23','Password123'),(35,'Jane Doe','test@example.com','3232 AV23','Password123'),(36,'Jane Doe','test@example.com','3232 AV23','Password123'),(37,'Jane Doe','test@example.com','3232 AV23','Password123'),(38,'Jane Doe','test@example.com','3232 AV23','Password123'),(39,'Jane Doe','test@example.com','3232 AV23','Password123'),(40,'Jane Doe','test@example.com','3232 AV23','Password123'),(41,'Jane Doe','test@example.com','3232 AV23','Password123'),(42,'Jane Doe','test@example.com','3232 AV23','Password123'),(43,'Jane Doe','test@example.com','3232 AV23','Password123'),(44,'Jane Doe','test@example.com','3232 AV23','Password123'),(45,'Jane Doe','test@example.com','3232 AV23','Password123'),(46,'Jane Doe','test@example.com','3232 AV23','Password123'),(47,'Jane Doe','test@example.com','3232 AV23','Password123'),(48,'Jane Doe','test@example.com','3232 AV23','Password123'),(49,'Jane Doe','test@example.com','3232 AV23','Password123'),(50,'Jane Doe','test@example.com','3232 AV23','Password123'),(51,'Jane Doe','test@example.com','3232 AV23','Password123'),(52,'Jane Doe','test@example.com','3232 AV23','Password123'),(53,'Jane Doe','test@example.com','3232 AV23','Password123'),(54,'Jane Doe','test@example.com','3232 AV23','Password123'),(55,'Jane Doe','test@example.com','3232 AV23','Password123'),(56,'Jane Doe','test@example.com','3232 AV23','Password123'),(57,'Jane Doe','test@example.com','3232 AV23','Password123'),(58,'Jane Doe','test@example.com','3232 AV23','Password123'),(59,'Jane Doe','test@example.com','3232 AV23','Password123'),(60,'Jane Doe','test@example.com','3232 AV23','Password123'),(61,'Jane Doe','test@example.com','3232 AV23','Password123'),(62,'Jane Doe','test@example.com','3232 AV23','Password123'),(63,'Jane Doe','test@example.com','3232 AV23','Password123'),(64,'Jane Doe','test@example.com','3232 AV23','Password123'),(65,'Jane Doe','test@example.com','3232 AV23','Password123'),(66,'Jane Doe','test@example.com','3232 AV23','Password123'),(67,'Jane Doe','test@example.com','3232 AV23','Password123'),(68,'Jane Doe','test@example.com','3232 AV23','Password123'),(69,'Jane Doe','test@example.com','3232 AV23','Password123'),(70,'Jane Doe','test@example.com','3232 AV23','Password123'),(71,'Jane Doe','test@example.com','3232 AV23','Password123');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping events for database 'omni'
--

--
-- Dumping routines for database 'omni'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-03-17  0:44:36
