/*
SQLyog Ultimate v12.08 (32 bit)
MySQL - 5.7.15-log : Database - geek
*********************************************************************
*/

/*!40101 SET NAMES utf8 */;

/*!40101 SET SQL_MODE=''*/;

/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
CREATE DATABASE /*!32312 IF NOT EXISTS*/`geek` /*!40100 DEFAULT CHARACTER SET utf8 */;

USE `geek`;

/*Table structure for table `joinus` */

DROP TABLE IF EXISTS `joinus`;

CREATE TABLE `joinus` (
  `j_no` varchar(10) NOT NULL COMMENT '参加人学号',
  `j_name` varchar(10) NOT NULL COMMENT '参加人姓名',
  `j_phone` varchar(11) NOT NULL COMMENT '参加人电话',
  `j_email` varchar(50) NOT NULL COMMENT '参加人邮箱',
  PRIMARY KEY (`j_no`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Data for the table `joinus` */

insert  into `joinus`(`j_no`,`j_name`,`j_phone`,`j_email`) values ('2015211087','袁阳','18875062338','1094@qq.com');

/*Table structure for table `learn` */

DROP TABLE IF EXISTS `learn`;

CREATE TABLE `learn` (
  `l_no` varchar(4) NOT NULL COMMENT '学习资源编号',
  `l_name` varchar(50) NOT NULL COMMENT '学习资源名称',
  `l_type` varchar(5) NOT NULL COMMENT '学习资源类型',
  `l_image` varchar(50) DEFAULT NULL COMMENT '图片地址',
  `l_desc` text NOT NULL COMMENT '学习资源的简介',
  `l_link` varchar(200) DEFAULT NULL COMMENT '学习资源链接',
  PRIMARY KEY (`l_no`),
  KEY `learn_ibfk_1` (`l_image`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Data for the table `learn` */

insert  into `learn`(`l_no`,`l_name`,`l_type`,`l_image`,`l_desc`,`l_link`) values ('1','javascript权威指南','书籍','\\file\\Learn_1488025147370_1.png','本书总体上分为“基础知识点介绍”和“参考指南”两部分，这是本书的一大特色。这种结构得到了读者相当大的认可，满足了他们学习基础知识和参考查阅难点的双重需要。','http://baike.baidu.com/item/Javascript%E6%9D%83%E5%A8%81%E6%8C%87%E5%8D%97?sefr=cr'),('2','轻量级Java EE企业应用实战（第3版）','书籍','\\file\\Learn_1488026050117_2.jpg','本书重点介绍如何整合struts 2.2+spring 3.0+hibernate 3.6进行java ee开发。','http://baike.baidu.com/item/%E8%BD%BB%E9%87%8F%E7%BA%A7Java%20EE%E4%BC%81%E4%B8%9A%E5%BA%94%E7%94%A8%E5%AE%9E%E6%88%98%EF%BC%88%E7%AC%AC3%E7%89%88%EF%BC%89/7755987?sefr=enterbtn'),('3','疯狂Android讲义','书籍','\\file\\Learn_1488026247155_3.jpg','《疯狂Android讲义》全面地介绍了Android应用开发的相关知识，全书内容覆盖了Android用户界面编程、Android四大组件、Android资源访问、图形/图像处理、事件处理机制、Android输入/输出处理、音频/视频多媒体应用开发、OpenGL与3D应用开发、网络通信编程、Android平台的Web Service、传感器应用开发、GPS应用开发、Google Map服务等。','http://baike.baidu.com/item/%E7%96%AF%E7%8B%82Android%E8%AE%B2%E4%B9%89?sefr=cr'),('4','Photoshop完美创意设计Ⅲ','书籍','\\file\\Learn_1488026410963_4.png','完全解密视觉创意，插画艺术，质感表现和网络艺术等34个最优秀设计作品的制作技法，使读者零距离体验将想象中的作品逐步创作出来的整个过程；穿插于实例讲解过程中的Tip/Point包含大量具有借鉴价值的特别经验、窍门与技巧；操作时可能遇到的各种问题及解决方法等；每个实例的制作步骤和参数设置都配有详尽的图解和文字说明，并且录制了详尽的视频教学附赠在光盘中，为没有基础的初学者提供了极大的帮助和方便。','http://baike.baidu.com/item/Photoshop%E5%AE%8C%E7%BE%8E%E5%88%9B%E6%84%8F%E8%AE%BE%E8%AE%A1III/5960068?sefr=cr#2');

/*Table structure for table `masterpiece` */

DROP TABLE IF EXISTS `masterpiece`;

CREATE TABLE `masterpiece` (
  `m_no` varchar(4) NOT NULL COMMENT '作品编号',
  `m_name` varchar(20) NOT NULL COMMENT '作品名称',
  `m_desc` varchar(200) NOT NULL COMMENT '作品介绍',
  `m_image` varchar(50) DEFAULT NULL COMMENT '作品图片名',
  `m_link` varchar(200) DEFAULT NULL COMMENT '作品链接',
  PRIMARY KEY (`m_no`),
  KEY `masterpiece_ibfk_1` (`m_image`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Data for the table `masterpiece` */

insert  into `masterpiece`(`m_no`,`m_name`,`m_desc`,`m_image`,`m_link`) values ('1','重庆邮电大学OSTA报考系统','这波很关键,这个系统很棒,我不知道怎么用语言来形容了。','\\file\\Masterpiece_1488029203807_1.png',''),('2','校当网','这波很关键,这个网站很棒,我不知道怎么用语言来形容了。','\\file\\Masterpiece_1488030092384_2.png',''),('3','兴业银行重庆分行行政后勤管理系统','这波很关键,这个系统很棒,我不知道怎么用语言来形容了。','\\file\\Masterpiece_1488030209938_3.png',''),('4','重庆山仁钢结构工程有限公司官网','这波很关键,这个网站很棒,我不知道怎么用语言来形容了。','\\file\\Masterpiece_1488030249649_4.png',''),('5','重庆惠仁建筑劳务有限公司官网','这波很关键,这个网站很棒,我不知道怎么用语言来形容了。','\\file\\Masterpiece_1488030289716_5.png',''),('6','重庆风轩农业有限公司官网','这波很关键,这个网站很棒,我不知道怎么用语言来形容了。','\\file\\Masterpiece_1488030318607_6.png',''),('7','经济管理学院毕业论文(设计)管理系统','这波很关键,这个系统很棒,我不知道怎么用语言来形容了。','\\file\\Masterpiece_1488030352726_7.png',''),('8','经管实验教学系统','这波很关键,这个系统很棒,我不知道怎么用语言来形容了。','\\file\\Masterpiece_1488030383178_8.png','');

/*Table structure for table `member` */

DROP TABLE IF EXISTS `member`;

CREATE TABLE `member` (
  `no` varchar(10) NOT NULL COMMENT '成员学号',
  `name` varchar(10) NOT NULL COMMENT '成员姓名',
  `phone` varchar(11) DEFAULT NULL COMMENT '成员电话',
  `team` varchar(2) DEFAULT NULL COMMENT '团队编号',
  `graduation` varchar(30) DEFAULT NULL COMMENT '毕业去向',
  `grade` varchar(4) NOT NULL COMMENT '年级',
  `des` text NOT NULL COMMENT '成员简介',
  `image` varchar(50) DEFAULT NULL COMMENT '成员照片名',
  PRIMARY KEY (`no`),
  KEY `member_ibfk_2` (`image`),
  KEY `team` (`team`),
  CONSTRAINT `member_ibfk_1` FOREIGN KEY (`team`) REFERENCES `team` (`t_no`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Data for the table `member` */

insert  into `member`(`no`,`name`,`phone`,`team`,`graduation`,`grade`,`des`,`image`) values ('2014211001','孙凤琴','13888888888','2','','2014','你像一片轻柔的云在我眼前飘来飘去，你清丽秀雅的脸上荡漾着春天般美丽的笑容。在你那双又大又亮的眼睛里，我总能捕捉到你的宁静，你的热烈，你的聪颖，你的敏感。','\\file\\Member_1488027631911_2014211001.jpg'),('2014211002','刘奇','13888888888','1','','2014','你像一片轻柔的云在我眼前飘来飘去，你清丽秀雅的脸上荡漾着春天般美丽的笑容。在你那双又大又亮的眼睛里，我总能捕捉到你的宁静，你的热烈，你的聪颖，你的敏感。','\\file\\Member_1488027714070_2014211002.jpg'),('2015211087','袁阳','15310616457','1','','2015','这波很爆炸。','\\file\\Member_1488028588148_2015211087.JPG');

/*Table structure for table `suggestion` */

DROP TABLE IF EXISTS `suggestion`;

CREATE TABLE `suggestion` (
  `s_time` datetime NOT NULL COMMENT '意见输入时间',
  `s_phone` varchar(11) NOT NULL COMMENT '意见人电话',
  `s_view` text NOT NULL COMMENT '具体意见',
  PRIMARY KEY (`s_time`,`s_phone`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Data for the table `suggestion` */

/*Table structure for table `team` */

DROP TABLE IF EXISTS `team`;

CREATE TABLE `team` (
  `t_no` varchar(2) NOT NULL COMMENT '团队编号',
  `t_name` varchar(10) NOT NULL COMMENT '团队名称',
  `t_leader` varchar(10) DEFAULT NULL COMMENT '负责人编号',
  `t_desc` text NOT NULL COMMENT '团队简介',
  `t_image` varchar(50) DEFAULT NULL COMMENT '团队照片',
  PRIMARY KEY (`t_no`),
  KEY `team_ibfk_1` (`t_image`),
  KEY `t_leader` (`t_leader`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Data for the table `team` */

insert  into `team`(`t_no`,`t_name`,`t_leader`,`t_desc`,`t_image`) values ('1','后台','2014211002','都是大神。','\\file\\Team_1488028169980_1.jpg'),('2','前端','2014211001','大家都是大神!','\\file\\Team_1488027865296_2.jpg');

/*Table structure for table `user` */

DROP TABLE IF EXISTS `user`;

CREATE TABLE `user` (
  `user_name` varchar(20) NOT NULL COMMENT '管理员登录名',
  `password` varchar(20) NOT NULL COMMENT '管理员登录密码',
  PRIMARY KEY (`user_name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Data for the table `user` */

insert  into `user`(`user_name`,`password`) values ('yuanyang','123456');

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
