-- MySQL dump 10.16  Distrib 10.1.26-MariaDB, for debian-linux-gnu (x86_64)
--
-- Host: localhost    Database: 42matcha
-- ------------------------------------------------------
-- Server version	10.1.26-MariaDB-0+deb9u1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `Comment`
--

DROP TABLE IF EXISTS `Comment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Comment` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `post_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `content` text,
  `comment_parent_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `comment_user` (`user_id`),
  KEY `comment_post` (`post_id`),
  KEY `post_parent` (`comment_parent_id`),
  CONSTRAINT `Comment_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `User` (`id`) ON DELETE NO ACTION,
  CONSTRAINT `Comment_ibfk_2` FOREIGN KEY (`post_id`) REFERENCES `Post` (`id`) ON DELETE CASCADE,
  CONSTRAINT `Comment_ibfk_3` FOREIGN KEY (`comment_parent_id`) REFERENCES `Comment` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Comment`
--

LOCK TABLES `Comment` WRITE;
/*!40000 ALTER TABLE `Comment` DISABLE KEYS */;
/*!40000 ALTER TABLE `Comment` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Image`
--

DROP TABLE IF EXISTS `Image`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Image` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `src` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `src` (`src`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Image`
--

LOCK TABLES `Image` WRITE;
/*!40000 ALTER TABLE `Image` DISABLE KEYS */;
INSERT INTO `Image` VALUES (18,'https://s3.amazonaws.com/uifaces/faces/twitter/adamsxu/128.jpg'),(17,'https://s3.amazonaws.com/uifaces/faces/twitter/ChrisFarina78/128.jpg'),(14,'https://s3.amazonaws.com/uifaces/faces/twitter/emileboudeling/128.jpg'),(3,'https://s3.amazonaws.com/uifaces/faces/twitter/enda/128.jpg'),(15,'https://s3.amazonaws.com/uifaces/faces/twitter/jitachi/128.jpg'),(10,'https://s3.amazonaws.com/uifaces/faces/twitter/jqiuss/128.jpg'),(7,'https://s3.amazonaws.com/uifaces/faces/twitter/justinrhee/128.jpg'),(20,'https://s3.amazonaws.com/uifaces/faces/twitter/kurafire/128.jpg'),(2,'https://s3.amazonaws.com/uifaces/faces/twitter/malykhinv/128.jpg'),(12,'https://s3.amazonaws.com/uifaces/faces/twitter/marshallchen_/128.jpg'),(13,'https://s3.amazonaws.com/uifaces/faces/twitter/maxlinderman/128.jpg'),(9,'https://s3.amazonaws.com/uifaces/faces/twitter/michaelbrooksjr/128.jpg'),(5,'https://s3.amazonaws.com/uifaces/faces/twitter/mutu_krish/128.jpg'),(1,'https://s3.amazonaws.com/uifaces/faces/twitter/primozcigler/128.jpg'),(16,'https://s3.amazonaws.com/uifaces/faces/twitter/rez___a/128.jpg'),(11,'https://s3.amazonaws.com/uifaces/faces/twitter/salimianoff/128.jpg'),(6,'https://s3.amazonaws.com/uifaces/faces/twitter/sergeyalmone/128.jpg'),(8,'https://s3.amazonaws.com/uifaces/faces/twitter/shoaib253/128.jpg'),(19,'https://s3.amazonaws.com/uifaces/faces/twitter/smaczny/128.jpg'),(4,'https://s3.amazonaws.com/uifaces/faces/twitter/_yardenoon/128.jpg');
/*!40000 ALTER TABLE `Image` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Liker`
--

DROP TABLE IF EXISTS `Liker`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Liker` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `liked_user_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `user_liker` (`user_id`),
  KEY `liked_user` (`liked_user_id`),
  CONSTRAINT `Liker_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `User` (`id`) ON DELETE CASCADE,
  CONSTRAINT `Liker_ibfk_2` FOREIGN KEY (`liked_user_id`) REFERENCES `User` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Liker`
--

LOCK TABLES `Liker` WRITE;
/*!40000 ALTER TABLE `Liker` DISABLE KEYS */;
/*!40000 ALTER TABLE `Liker` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Location`
--

DROP TABLE IF EXISTS `Location`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Location` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `address` varchar(255) NOT NULL,
  `lat` float NOT NULL,
  `long` float NOT NULL,
  `user_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `location_user` (`user_id`),
  CONSTRAINT `Location_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `User` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Location`
--

LOCK TABLES `Location` WRITE;
/*!40000 ALTER TABLE `Location` DISABLE KEYS */;
/*!40000 ALTER TABLE `Location` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Post`
--

DROP TABLE IF EXISTS `Post`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Post` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `content` text NOT NULL,
  `user_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `post_user` (`user_id`),
  CONSTRAINT `Post_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `User` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Post`
--

LOCK TABLES `Post` WRITE;
/*!40000 ALTER TABLE `Post` DISABLE KEYS */;
/*!40000 ALTER TABLE `Post` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Post_image`
--

DROP TABLE IF EXISTS `Post_image`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Post_image` (
  `post_id` int(11) NOT NULL,
  `image_id` int(11) NOT NULL,
  KEY `Post_image_user` (`post_id`),
  KEY `Post_image_image` (`image_id`),
  CONSTRAINT `Post_image_ibfk_1` FOREIGN KEY (`post_id`) REFERENCES `Post` (`id`) ON DELETE CASCADE,
  CONSTRAINT `Post_image_ibfk_2` FOREIGN KEY (`image_id`) REFERENCES `Image` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Post_image`
--

LOCK TABLES `Post_image` WRITE;
/*!40000 ALTER TABLE `Post_image` DISABLE KEYS */;
/*!40000 ALTER TABLE `Post_image` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Post_tag`
--

DROP TABLE IF EXISTS `Post_tag`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Post_tag` (
  `post_id` int(11) NOT NULL,
  `tag_id` int(11) NOT NULL,
  KEY `Post_tag_post` (`post_id`),
  KEY `Post_tag_tag` (`tag_id`),
  CONSTRAINT `Post_tag_ibfk_1` FOREIGN KEY (`post_id`) REFERENCES `Post` (`id`) ON DELETE NO ACTION,
  CONSTRAINT `Post_tag_ibfk_2` FOREIGN KEY (`tag_id`) REFERENCES `Tag` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Post_tag`
--

LOCK TABLES `Post_tag` WRITE;
/*!40000 ALTER TABLE `Post_tag` DISABLE KEYS */;
/*!40000 ALTER TABLE `Post_tag` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Tag`
--

DROP TABLE IF EXISTS `Tag`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Tag` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `tag_name` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `tag_name` (`tag_name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Tag`
--

LOCK TABLES `Tag` WRITE;
/*!40000 ALTER TABLE `Tag` DISABLE KEYS */;
/*!40000 ALTER TABLE `Tag` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `User`
--

DROP TABLE IF EXISTS `User`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `User` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `first_name` varchar(255) NOT NULL,
  `last_name` varchar(255) NOT NULL,
  `login` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `age` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `nb_image` int(11) NOT NULL DEFAULT '0',
  `profile_image` varchar(255) DEFAULT NULL,
  `gender` enum('female','male','other') NOT NULL DEFAULT 'female',
  `orientation` enum('heterosexual','bisexual','homosexual') NOT NULL DEFAULT 'bisexual',
  `bio` text,
  `status` enum('online','offline') NOT NULL DEFAULT 'offline',
  `is_lock` enum('true','false') NOT NULL DEFAULT 'false',
  `reset_pass` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `login` (`login`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `User`
--

LOCK TABLES `User` WRITE;
/*!40000 ALTER TABLE `User` DISABLE KEYS */;
INSERT INTO `User` VALUES (1,'Dina','Murphy','DinaMurphy','$2a$08$Hkeo6c.tlFUePG.w3fsQY.JcWZwhm/FhMxU1Ta79KsEsQRPRJXJgm','Libby_Smitham@hotmail.com','2017-11-05 14:06:19',0,'https://s3.amazonaws.com/uifaces/faces/twitter/_kkga/128.jpg','male','heterosexual','Qui impedit quidem quia itaque. Qui quas velit quidem assumenda. Et quam minima earum sint quam magnam maiores nemo. Ut aliquam quaerat et nemo rerum optio ducimus dolore. At officiis debitis.\n \rOdit molestias molestiae vel sequi. Perspiciatis aut veniam eaque odit cum. Quia qui in at. Vitae consequatur ullam ea repellat qui fuga commodi et. Omnis ea omnis. Quia voluptas ducimus illo mollitia est reiciendis fugit sunt.\n \rEt cumque optio nemo. Eligendi pariatur velit consequatur et aperiam labore voluptatem qui. Non placeat voluptatum sit. Odit ut et iure perferendis. Labore aut dignissimos unde fuga.','offline','',NULL),(2,'Janae','Effertz','JanaeEffertz','$2a$08$lxaEpwvyTA.S.U9UNxPvsu3kiDhKFPdLhpavo5N/uGFzPXmZQPbcu','Phyllis_Okuneva39@hotmail.com','2018-04-08 03:26:50',0,'https://s3.amazonaws.com/uifaces/faces/twitter/jm_denis/128.jpg','other','heterosexual','Veniam voluptates vel quia eveniet. Quibusdam ad labore voluptas. Nihil ut omnis enim repellat amet dolores. Nam omnis nulla consequatur illo dicta sed.\n \rQuos aperiam repellendus est illum ipsa rerum at. Ut voluptas rerum hic sit dolore maxime reiciendis. In voluptatibus molestiae beatae ut ab mollitia. Nisi tempora a eius vitae nemo cumque praesentium non quidem. Autem quis ea. Totam et vel molestias.\n \rIusto repudiandae est ad ut impedit cum expedita. Voluptas velit ut quia esse cumque soluta fuga ipsum non. Qui labore debitis. Sint sunt qui. Libero iusto consequatur repellendus. Quidem fugiat blanditiis.','offline','',NULL),(3,'Sabryna','Rohan','SabrynaRohan','$2a$08$dyzMkaLX3fcDCAcG0hro7euzrNUf4jQ12pei3lwuWOJlgm0YH/VMm','Icie27@gmail.com','2018-02-15 16:12:06',0,'https://s3.amazonaws.com/uifaces/faces/twitter/nfedoroff/128.jpg','female','homosexual','Accusantium et et molestias repellat ipsum ipsam impedit. Quia non dolores fuga voluptatem harum dolor voluptatem. Minima sed mollitia aut qui sed. Est qui sed corrupti. Omnis blanditiis vel aspernatur aliquid natus tempora voluptatem.\n \rDolor et et. Est sed voluptatibus ut et quasi sed nobis. Quia perspiciatis earum reprehenderit. Et itaque officiis. Fuga ut commodi magni at quis quos.\n \rQuis est consequatur magnam nam iure quo. Ipsam in temporibus veniam asperiores dignissimos dicta ut sit laboriosam. Magnam aspernatur corporis nulla accusamus dolores. Maxime fugit recusandae perspiciatis architecto consequatur ipsum aut fugiat. Dolorum consequatur ipsam modi excepturi quis.','offline','',NULL),(4,'Kurtis','Gorczany','KurtisGorczany','$2a$08$Qrffoxl4W8xn615UK78vHON9qa77YjMhBozGn3ueVOUtannaZ9d/m','Cesar_Yost@gmail.com','2018-03-28 08:40:51',0,'https://s3.amazonaws.com/uifaces/faces/twitter/gregrwilkinson/128.jpg','female','homosexual','Est perspiciatis aliquid sapiente nobis libero. Dolor ratione esse nihil sit dolores. Mollitia totam ab quis optio.\n \rSit dicta eaque repellendus quia asperiores at officiis id tempora. Dolor sint et unde. Dolor sed odit doloribus fugit ea quis est aut eos. Vero aut et suscipit pariatur sit aut consequatur. Optio animi qui rerum nihil nostrum.\n \rInventore quis et fugit. Sed sed eos quis maiores reiciendis magnam dolores. Maiores eum eligendi eum mollitia a vel recusandae. Perferendis alias rerum similique dolores corrupti a.','online','',NULL),(5,'Brice','Rempel','BriceRempel','$2a$08$Fht8Hxhfec/9uAfxtyR/y.Wtow1aM88oFukHCEtrtgTosPPJx6NJy','Isobel_Bernhard22@hotmail.com','2018-02-20 21:04:42',0,'https://s3.amazonaws.com/uifaces/faces/twitter/jacobbennett/128.jpg','other','bisexual','Totam quis culpa error maxime consectetur consectetur pariatur quibusdam. Eligendi et laboriosam maiores impedit blanditiis error. Labore et error doloremque dolorem quia nihil ipsum rerum non. Magni et dolores hic sed omnis modi. Reiciendis nisi ducimus corrupti et explicabo sed.\n \rVitae est iusto beatae. Quia sit ducimus tempore voluptatem. Magni corrupti velit odio et voluptate. Quaerat nobis et quae reiciendis quis odit ab voluptate. Et nulla odio voluptatum porro. Qui a velit maiores beatae quo nihil distinctio beatae provident.\n \rDeserunt assumenda et recusandae voluptate tempora est. Sit rerum et consequatur dolor dicta ut ex fugiat. Voluptas odit aliquam ut.','offline','',NULL),(6,'Opal','Miller','OpalMiller','$2a$08$wzRGKn2aAsrVd5KbUoNCYO0HiXDO2eQumHESTrYMrxn15qkpImNfy','Ila64@hotmail.com','2017-08-01 16:01:43',0,'https://s3.amazonaws.com/uifaces/faces/twitter/happypeter1983/128.jpg','other','bisexual','Accusamus et accusamus omnis. Alias corporis rem quibusdam voluptatum minima tenetur corporis exercitationem. Itaque modi placeat et. Veritatis voluptatum in optio et nulla. Dolores illo architecto aut non aut odit.\n \rEa impedit rerum unde voluptatem consequuntur aut nihil porro. Excepturi eius architecto recusandae rerum ut at id. Harum commodi ad dolor libero eos et. Vel et iste ea illum saepe laborum nesciunt sunt.\n \rQuia quo et rerum exercitationem. Eum deserunt quia iste doloremque at sunt at dolor. Libero sapiente est dicta placeat vitae laboriosam.','online','',NULL),(7,'Caden','Mante','CadenMante','$2a$08$nzABUVsgYX6mIBr3vPkuBu4Ya5q/WUs9j2DkF/yD2pSFTYDis7DS6','Trever38@gmail.com','2018-03-12 06:11:44',0,'https://s3.amazonaws.com/uifaces/faces/twitter/mcflydesign/128.jpg','female','heterosexual','Dolores distinctio quia ex quae. Corporis eaque illum quas sit ut non in praesentium. Odio officia aut omnis adipisci. Est et nobis blanditiis reiciendis cupiditate corporis.\n \rSed qui illum deserunt sit provident. Ipsa quisquam nisi distinctio. Vero eius eum.\n \rAperiam porro fugiat quos consequatur. Et tempora dolor nihil voluptas eos vel harum et ipsum. Vel aut aperiam rerum sed quasi. Reiciendis velit voluptate magnam nulla expedita perspiciatis omnis a omnis.','online','',NULL),(8,'Akeem','Lang','AkeemLang','$2a$08$yXNas5GFClMEF8u.5M/Xd.z5oV5Mh.3/8ZpaSPwojOIBG6lXPCU0K','Dangelo_Kerluke@yahoo.com','2017-05-06 13:22:39',0,'https://s3.amazonaws.com/uifaces/faces/twitter/reideiredale/128.jpg','other','bisexual','Unde molestiae consequuntur recusandae est consequatur expedita. Veniam minus fuga odit. Molestiae ratione distinctio a sunt ut quasi dignissimos. Enim pariatur quibusdam. Rerum ipsa voluptatem beatae delectus nostrum voluptas impedit.\n \rQuae temporibus libero labore dolorem est. Voluptate autem quae. Nam quae et architecto saepe nobis fugiat. Animi minus animi eos deleniti. Quo dolore doloremque voluptatem eum voluptatem consequatur aut cupiditate. Incidunt consequatur omnis natus at necessitatibus quia.\n \rUnde adipisci doloribus magnam iusto sit ipsum et error quo. Tenetur rerum nemo ullam dolore. Enim tempore suscipit ducimus.','online','',NULL),(9,'Breanna','Hilpert','BreannaHilpert','$2a$08$16Rbjk5WN1uiMBaieTXpG.EYpZ/r88LqKtsy.Wh21OgIFADyekwwK','Evan_Ward25@gmail.com','2017-06-29 01:41:56',0,'https://s3.amazonaws.com/uifaces/faces/twitter/rodnylobos/128.jpg','other','bisexual','Cum quisquam sed quibusdam nisi voluptas voluptatum doloribus blanditiis quas. Quae ut eos et unde quod hic. Illum non adipisci commodi ad qui. Facilis magnam fugit illum provident perferendis esse corporis eius facilis.\n \rMolestiae quia deserunt sit similique et aut recusandae voluptatem omnis. Consequatur culpa fugit. Reiciendis tempore sit cum sed ut voluptatum atque mollitia id. Est nihil magnam tenetur reiciendis omnis exercitationem veritatis sit.\n \rRepellendus et nobis doloribus molestiae ut. Ut officiis praesentium illum fugit ab voluptas. Id ipsam beatae.','offline','',NULL),(10,'Kailey','Bailey','KaileyBailey','$2a$08$Vnz350P0L8jyxZTf29kRTex8ttt433xCqvIMJaD3QzRjJSHPeF8JG','Barney56@hotmail.com','2017-09-02 07:54:19',0,'https://s3.amazonaws.com/uifaces/faces/twitter/batsirai/128.jpg','female','heterosexual','Molestiae nobis voluptas ea eum autem sint harum nihil. Suscipit consequatur ducimus aliquid ea possimus illo ut dolores odit. Voluptatibus ut reprehenderit et est. Eos minima excepturi.\n \rVoluptas error est at. Laborum et commodi reiciendis officia quia qui ex autem. Nemo distinctio unde mollitia. Est accusantium doloribus.\n \rNecessitatibus nihil blanditiis sunt quia molestias debitis. Sapiente ipsa voluptatem ad iusto doloribus iusto debitis possimus. Quia praesentium alias voluptas.','offline','',NULL),(11,'Nellie','Balistreri','NellieBalistreri','$2a$08$.raONMGEdu0n/g8R0n7rrur674mOv5ZBEevsfV0pE05kfy9pn6JDW','King_Blanda@hotmail.com','2017-09-01 20:52:17',0,'https://s3.amazonaws.com/uifaces/faces/twitter/taylorling/128.jpg','other','bisexual','Ullam consectetur voluptatem voluptatem ut numquam et tenetur iste similique. Illo laborum id. Consectetur dolorem eum iusto eos.\n \rUt sit similique quo qui est aliquam qui. Voluptatem enim enim est voluptas voluptatum. Nisi aspernatur illum tempora voluptatem. Totam veritatis molestiae in tempore. Consectetur magni eius laboriosam. A omnis expedita adipisci eligendi sint.\n \rPorro unde voluptatem dignissimos et ipsam sequi laudantium vel ipsam. Debitis assumenda nihil ea saepe quibusdam quas rem molestias eum. Molestiae hic placeat delectus reiciendis iure ullam. Laborum aut illum qui eligendi facilis atque. Perspiciatis aut deleniti et. Harum repellendus odio.','online','',NULL),(12,'Trinity','Dare','TrinityDare','$2a$08$c.6P9ewrtIq8Zwoa76gJVufxUnGjk46dkj.EzYyKksyrwkvUej2.S','Tristin2@hotmail.com','2018-02-27 14:13:58',0,'https://s3.amazonaws.com/uifaces/faces/twitter/jarsen/128.jpg','other','heterosexual','Ipsam sed fugit soluta sequi. Aut et voluptatem. At ipsam unde alias quidem autem error. Dicta fugit minima rerum voluptatibus. Sapiente fugiat quibusdam unde molestiae temporibus et officiis delectus non.\n \rQui rerum enim quia et ea iure et inventore. Consequatur voluptas enim voluptatem voluptatem autem veniam ullam aut. Et et itaque sed. Earum aut cum voluptate est nobis error. Iste atque voluptas hic quis ullam.\n \rExplicabo quas facere rerum. Nesciunt consectetur quisquam ut voluptatem nulla in at corporis eum. Dolorem odit sint reiciendis sed minus rerum.','offline','',NULL),(13,'Colleen','Hauck','ColleenHauck','$2a$08$pGU1xlYnTaICFiR.JhuGS.i54ufRMeSaxqGBowR5/K8/NgjJGke6y','Justyn.Rath96@gmail.com','2017-05-20 13:22:10',0,'https://s3.amazonaws.com/uifaces/faces/twitter/vitorleal/128.jpg','other','heterosexual','Odit voluptas et porro vitae modi sint ullam quia sequi. Maxime qui aut id ut. Vel sed in sint maxime tempora.\n \rOfficiis doloribus provident sed ut aut minima. Sunt et reprehenderit. Incidunt perspiciatis distinctio molestiae vitae eaque sed pariatur. Odio aspernatur qui quo. Molestias est doloremque.\n \rOmnis nemo corporis molestiae voluptatem quia. Voluptatem veritatis quisquam cumque quo enim aut quod. Eum et doloribus ut corporis sunt quod alias expedita est. Temporibus quia explicabo et qui consequatur voluptate laborum. Est quibusdam nesciunt error perspiciatis. Delectus eligendi quis molestiae hic nisi.','offline','',NULL),(14,'toto','toto','toto','$2a$08$I3G/jYSxSj8JC7MNTZ8npeGLfc9nuwdRzsqu3y7Y2Qj0kg5SRjHGy','toto@toto.toto','2000-04-15 20:00:00',0,NULL,'male','bisexual','','online','false',NULL);
/*!40000 ALTER TABLE `User` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `User_image`
--

DROP TABLE IF EXISTS `User_image`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `User_image` (
  `user_id` int(11) NOT NULL,
  `image_id` int(11) NOT NULL,
  KEY `User_image_user` (`user_id`),
  KEY `User_image_image` (`image_id`),
  CONSTRAINT `User_image_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `User` (`id`) ON DELETE CASCADE,
  CONSTRAINT `User_image_ibfk_2` FOREIGN KEY (`image_id`) REFERENCES `Image` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `User_image`
--

LOCK TABLES `User_image` WRITE;
/*!40000 ALTER TABLE `User_image` DISABLE KEYS */;
/*!40000 ALTER TABLE `User_image` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `User_tag`
--

DROP TABLE IF EXISTS `User_tag`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `User_tag` (
  `user_id` int(11) NOT NULL,
  `tag_id` int(11) NOT NULL,
  KEY `User_tag_user` (`user_id`),
  KEY `User_tag_tag` (`tag_id`),
  CONSTRAINT `User_tag_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `Post` (`id`) ON DELETE NO ACTION,
  CONSTRAINT `User_tag_ibfk_2` FOREIGN KEY (`tag_id`) REFERENCES `Tag` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `User_tag`
--

LOCK TABLES `User_tag` WRITE;
/*!40000 ALTER TABLE `User_tag` DISABLE KEYS */;
/*!40000 ALTER TABLE `User_tag` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Viewer`
--

DROP TABLE IF EXISTS `Viewer`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Viewer` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `viewed_user_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `viewed_user` (`viewed_user_id`),
  CONSTRAINT `Viewer_ibfk_1` FOREIGN KEY (`viewed_user_id`) REFERENCES `User` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Viewer`
--

LOCK TABLES `Viewer` WRITE;
/*!40000 ALTER TABLE `Viewer` DISABLE KEYS */;
/*!40000 ALTER TABLE `Viewer` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2018-04-16  6:27:27
