-- MySQL Administrator dump 1.4
--
-- ------------------------------------------------------
-- Server version	5.0.20a-nt


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;


--
-- Create schema eoffice
--

CREATE DATABASE IF NOT EXISTS eoffice;
USE eoffice;

--
-- Definition of table `app_resource`
--

DROP TABLE IF EXISTS `app_resource`;
CREATE TABLE `app_resource` (
  `resourceId` bigint(20) NOT NULL auto_increment,
  `resourceName` varchar(128) NOT NULL,
  PRIMARY KEY  (`resourceId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `app_resource`
--

/*!40000 ALTER TABLE `app_resource` DISABLE KEYS */;
/*!40000 ALTER TABLE `app_resource` ENABLE KEYS */;


--
-- Definition of table `app_role`
--

DROP TABLE IF EXISTS `app_role`;
CREATE TABLE `app_role` (
  `roleId` bigint(20) NOT NULL auto_increment,
  `roleName` varchar(128) character set gb2312 NOT NULL,
  `roleDesc` varchar(128) character set gb2312 default NULL,
  `status` smallint(6) NOT NULL,
  `rights` varchar(2000) default NULL,
  PRIMARY KEY  (`roleId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `app_role`
--

/*!40000 ALTER TABLE `app_role` DISABLE KEYS */;
INSERT INTO `app_role` (`roleId`,`roleName`,`roleDesc`,`status`,`rights`) VALUES 
 (1,'Personal','个人角色',1,NULL);
/*!40000 ALTER TABLE `app_role` ENABLE KEYS */;


--
-- Definition of table `app_user`
--

DROP TABLE IF EXISTS `app_user`;
CREATE TABLE `app_user` (
  `userId` bigint(11) NOT NULL auto_increment,
  `username` varchar(128) NOT NULL,
  `password` varchar(128) NOT NULL,
  `email` varchar(128) NOT NULL,
  `depId` bigint(11) NOT NULL,
  `position` varchar(32) default NULL,
  `phone` varchar(32) default NULL,
  `mobile` varchar(32) default NULL,
  `fax` varchar(32) default NULL,
  `address` varchar(64) default NULL,
  `zip` varchar(32) default NULL,
  `photo` varchar(128) default NULL,
  `accessionTime` datetime NOT NULL,
  `status` smallint(11) NOT NULL,
  `education` varchar(64) default NULL,
  `fullname` varchar(128) default NULL,
  `title` smallint(6) NOT NULL default '1' COMMENT '1=先生   0=女士',
  PRIMARY KEY  (`userId`),
  UNIQUE KEY `username` (`username`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `app_user`
--

/*!40000 ALTER TABLE `app_user` DISABLE KEYS */;
INSERT INTO `app_user` (`userId`,`username`,`password`,`email`,`depId`,`position`,`phone`,`mobile`,`fax`,`address`,`zip`,`photo`,`accessionTime`,`status`,`education`,`fullname`,`title`) VALUES 
 (1,'admin','123456','yangly20@163.com',4,'1','','1','1','1','1','','2009-09-09 00:00:00',1,NULL,'超级管理员',1),
 (2,'soonyu','1','successful-7@163.com',2,'软件工程师','','13560343147','','广州市白云区','','','2009-08-17 00:00:00',1,NULL,'李迅宇',1),
 (3,'ljc','j','ljc@jsoft.cn',4,'市场经理','','','','','','','2009-10-27 00:00:00',1,NULL,'劳家婵',0),
 (4,'YungLocke','1','yangly@gmail.com',2,'软件工程师','','13580382795','','','','','2009-08-24 00:00:00',1,NULL,'骆运阳',1),
 (5,'csx','111','chshxuan@163.com',2,'Manager','','','','','','system/appUser/200911/46d3abc556d14531801c29b874ed743c.jpg','2009-04-01 00:00:00',1,NULL,'陈尚轩',1),
 (6,'alen','111','alen@jsoft.cn',4,'Manager','','','','','','','2008-12-15 00:00:00',1,NULL,'陈林',1),
 (7,'lxy','123','1274136599@qq.com',4,'市场专员','','15915775492','62652816','','','','2009-09-28 00:00:00',1,NULL,'梁秀英',0),
 (8,'pjm','123','1114883276@qq.com',4,'经理助理','','15986319225','','','','','2009-08-03 00:00:00',1,NULL,'庞嘉敏',0),
 (9,'hfm','123','',4,'市场专员','','15914346724','','','','','2009-11-02 00:00:00',1,NULL,'黄馥玖',0);
/*!40000 ALTER TABLE `app_user` ENABLE KEYS */;


--
-- Definition of table `appointment`
--

DROP TABLE IF EXISTS `appointment`;
CREATE TABLE `appointment` (
  `appointId` bigint(20) NOT NULL auto_increment,
  `userId` bigint(20) default NULL COMMENT '主键',
  `subject` varchar(128) NOT NULL COMMENT '主题',
  `startTime` datetime NOT NULL COMMENT '开始时间',
  `endTime` datetime NOT NULL COMMENT '结束时间',
  `content` varchar(5000) NOT NULL COMMENT '约会内容',
  `notes` varchar(1000) default NULL COMMENT '备注',
  `location` varchar(150) NOT NULL COMMENT '地点',
  `inviteEmails` varchar(1000) default NULL,
  PRIMARY KEY  (`appointId`),
  KEY `FK_AP_R_AU` (`userId`),
  CONSTRAINT `FK_AP_R_AU` FOREIGN KEY (`userId`) REFERENCES `app_user` (`userId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='约会管理';

--
-- Dumping data for table `appointment`
--

/*!40000 ALTER TABLE `appointment` DISABLE KEYS */;
INSERT INTO `appointment` (`appointId`,`userId`,`subject`,`startTime`,`endTime`,`content`,`notes`,`location`,`inviteEmails`) VALUES 
 (1,1,'good day for date','2009-11-15 00:00:00','2009-11-15 00:00:00','good day ','gz','gz','gz');
/*!40000 ALTER TABLE `appointment` ENABLE KEYS */;


--
-- Definition of table `assets_type`
--

DROP TABLE IF EXISTS `assets_type`;
CREATE TABLE `assets_type` (
  `assetsTypeId` bigint(20) NOT NULL auto_increment,
  `typeName` varchar(128) NOT NULL COMMENT '·ÖÀàÃû³Æ',
  PRIMARY KEY  (`assetsTypeId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `assets_type`
--

/*!40000 ALTER TABLE `assets_type` DISABLE KEYS */;
/*!40000 ALTER TABLE `assets_type` ENABLE KEYS */;


--
-- Definition of table `book`
--

DROP TABLE IF EXISTS `book`;
CREATE TABLE `book` (
  `bookId` bigint(20) NOT NULL auto_increment,
  `typeId` bigint(20) default NULL,
  `bookName` varchar(128) NOT NULL,
  `author` varchar(128) NOT NULL,
  `isbn` varchar(64) NOT NULL,
  `publisher` varchar(128) default NULL,
  `price` decimal(10,0) NOT NULL,
  `location` varchar(128) NOT NULL,
  `department` varchar(64) NOT NULL,
  `amount` int(11) NOT NULL,
  PRIMARY KEY  (`bookId`),
  KEY `FK_BK_R_BT` (`typeId`),
  CONSTRAINT `FK_BK_R_BT` FOREIGN KEY (`typeId`) REFERENCES `book_type` (`typeId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='图书';

--
-- Dumping data for table `book`
--

/*!40000 ALTER TABLE `book` DISABLE KEYS */;
/*!40000 ALTER TABLE `book` ENABLE KEYS */;


--
-- Definition of table `book_bor_ret`
--

DROP TABLE IF EXISTS `book_bor_ret`;
CREATE TABLE `book_bor_ret` (
  `recordId` bigint(20) NOT NULL auto_increment,
  `bookSnId` bigint(20) default NULL,
  `borrowTime` datetime NOT NULL,
  `returnTime` datetime NOT NULL,
  `lastReturnTime` datetime default NULL,
  `borrowIsbn` varchar(128) NOT NULL,
  `bookName` varchar(128) NOT NULL,
  PRIMARY KEY  (`recordId`),
  KEY `FK_BBR_R_BS` (`bookSnId`),
  CONSTRAINT `FK_BBR_R_BS` FOREIGN KEY (`bookSnId`) REFERENCES `book_sn` (`bookSnId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='图书借还表';

--
-- Dumping data for table `book_bor_ret`
--

/*!40000 ALTER TABLE `book_bor_ret` DISABLE KEYS */;
/*!40000 ALTER TABLE `book_bor_ret` ENABLE KEYS */;


--
-- Definition of table `book_sn`
--

DROP TABLE IF EXISTS `book_sn`;
CREATE TABLE `book_sn` (
  `bookSnId` bigint(20) NOT NULL auto_increment,
  `bookId` bigint(20) NOT NULL,
  `bookSN` varchar(128) NOT NULL,
  `status` smallint(6) NOT NULL COMMENT '借阅状态0=未借出1=借出2=预订3=注销',
  PRIMARY KEY  (`bookSnId`),
  KEY `FK_BS_R_BK` (`bookId`),
  CONSTRAINT `FK_BS_R_BK` FOREIGN KEY (`bookId`) REFERENCES `book` (`bookId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `book_sn`
--

/*!40000 ALTER TABLE `book_sn` DISABLE KEYS */;
/*!40000 ALTER TABLE `book_sn` ENABLE KEYS */;


--
-- Definition of table `book_type`
--

DROP TABLE IF EXISTS `book_type`;
CREATE TABLE `book_type` (
  `typeId` bigint(20) NOT NULL auto_increment,
  `typeName` varchar(128) NOT NULL,
  PRIMARY KEY  (`typeId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='图书类别';

--
-- Dumping data for table `book_type`
--

/*!40000 ALTER TABLE `book_type` DISABLE KEYS */;
/*!40000 ALTER TABLE `book_type` ENABLE KEYS */;


--
-- Definition of table `calendar_plan`
--

DROP TABLE IF EXISTS `calendar_plan`;
CREATE TABLE `calendar_plan` (
  `planId` bigint(20) NOT NULL auto_increment,
  `startTime` datetime default NULL COMMENT '开始时间',
  `endTime` datetime default NULL COMMENT '结束时间',
  `urgent` smallint(6) NOT NULL COMMENT '紧急程度\n            0=一般\n            1=重要\n            2=紧急',
  `content` varchar(1200) NOT NULL COMMENT '内容',
  `status` smallint(6) NOT NULL COMMENT '状态\n            0=未完成\n            1=完成',
  `userId` bigint(20) NOT NULL COMMENT '员工ID',
  `fullname` varchar(32) default NULL COMMENT '员工名',
  `assignerId` bigint(20) NOT NULL COMMENT '分配人',
  `assignerName` varchar(32) default NULL COMMENT '分配人名',
  `feedback` varchar(500) default NULL COMMENT '反馈意见',
  `showStyle` smallint(6) NOT NULL COMMENT '显示方式\n            1=仅在任务中显示\n            2=在日程与任务中显示',
  `taskType` smallint(6) NOT NULL COMMENT '任务类型\n            1=限期任务\n            2=非限期任务',
  PRIMARY KEY  (`planId`),
  KEY `FK_CA_R_AU` (`userId`),
  KEY `FK_CP_R_AUAS` (`assignerId`),
  CONSTRAINT `FK_CA_R_AU` FOREIGN KEY (`userId`) REFERENCES `app_user` (`userId`),
  CONSTRAINT `FK_CP_R_AUAS` FOREIGN KEY (`assignerId`) REFERENCES `app_user` (`userId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='日程安排';

--
-- Dumping data for table `calendar_plan`
--

/*!40000 ALTER TABLE `calendar_plan` DISABLE KEYS */;
INSERT INTO `calendar_plan` (`planId`,`startTime`,`endTime`,`urgent`,`content`,`status`,`userId`,`fullname`,`assignerId`,`assignerName`,`feedback`,`showStyle`,`taskType`) VALUES 
 (1,'2009-11-01 00:00:00','2009-11-22 00:00:00',2,'紧急处理日前的内容<br>',0,1,'超级管理员',1,'1',NULL,1,1);
/*!40000 ALTER TABLE `calendar_plan` ENABLE KEYS */;


--
-- Definition of table `car`
--

DROP TABLE IF EXISTS `car`;
CREATE TABLE `car` (
  `carId` bigint(20) NOT NULL auto_increment,
  `carNo` varchar(128) NOT NULL,
  `carType` varchar(64) NOT NULL COMMENT '轿车\n            货车\n            商务车\n            ',
  `engineNo` varchar(128) default NULL,
  `buyInsureTime` datetime default NULL COMMENT '购买保险时间',
  `auditTime` datetime default NULL COMMENT '年审时间',
  `notes` varchar(500) default NULL,
  `factoryModel` varchar(64) NOT NULL,
  `driver` varchar(32) NOT NULL,
  `buyDate` date NOT NULL COMMENT '购置日期',
  `status` smallint(6) NOT NULL COMMENT '当前状态\n            1=可用\n            2=维修中\n            0=报废',
  `cartImage` varchar(128) default NULL,
  PRIMARY KEY  (`carId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='车辆信息';

--
-- Dumping data for table `car`
--

/*!40000 ALTER TABLE `car` DISABLE KEYS */;
/*!40000 ALTER TABLE `car` ENABLE KEYS */;


--
-- Definition of table `car_apply`
--

DROP TABLE IF EXISTS `car_apply`;
CREATE TABLE `car_apply` (
  `applyId` bigint(20) NOT NULL auto_increment,
  `carId` bigint(20) NOT NULL,
  `department` varchar(64) NOT NULL,
  `userFullname` varchar(32) NOT NULL,
  `applyDate` date NOT NULL,
  `reason` varchar(512) NOT NULL,
  `startTime` datetime NOT NULL,
  `endTime` datetime default NULL,
  `proposer` varchar(32) NOT NULL,
  `mileage` decimal(18,2) default NULL,
  `oilUse` decimal(18,2) default NULL,
  `notes` varchar(128) default NULL,
  `approvalStatus` smallint(6) NOT NULL,
  PRIMARY KEY  (`applyId`),
  KEY `FK_CRA_R_CR` (`carId`),
  CONSTRAINT `FK_CRA_R_CR` FOREIGN KEY (`carId`) REFERENCES `car` (`carId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='车辆申请';

--
-- Dumping data for table `car_apply`
--

/*!40000 ALTER TABLE `car_apply` DISABLE KEYS */;
/*!40000 ALTER TABLE `car_apply` ENABLE KEYS */;


--
-- Definition of table `cart_repair`
--

DROP TABLE IF EXISTS `cart_repair`;
CREATE TABLE `cart_repair` (
  `repairId` bigint(20) NOT NULL auto_increment,
  `carId` bigint(20) default NULL,
  `repairDate` datetime NOT NULL COMMENT '维护日期',
  `reason` varchar(128) NOT NULL COMMENT '维护原因',
  `executant` varchar(128) NOT NULL COMMENT '经办人',
  `notes` varchar(128) default NULL COMMENT '备注',
  `repairType` varchar(128) NOT NULL COMMENT '维修类型\n            保养\n            维修',
  `fee` decimal(18,2) default NULL COMMENT '费用',
  PRIMARY KEY  (`repairId`),
  KEY `FK_CRR_R_CR` (`carId`),
  CONSTRAINT `FK_CRR_R_CR` FOREIGN KEY (`carId`) REFERENCES `car` (`carId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `cart_repair`
--

/*!40000 ALTER TABLE `cart_repair` DISABLE KEYS */;
/*!40000 ALTER TABLE `cart_repair` ENABLE KEYS */;


--
-- Definition of table `company`
--

DROP TABLE IF EXISTS `company`;
CREATE TABLE `company` (
  `companyId` bigint(20) NOT NULL auto_increment,
  `companyNo` varchar(128) default NULL,
  `companyName` varchar(128) NOT NULL,
  `companyDesc` varchar(5000) default NULL,
  `legalPerson` varchar(32) default NULL,
  `setup` datetime default NULL,
  `phone` varchar(32) default NULL,
  `fax` varchar(32) default NULL,
  `site` varchar(128) default NULL,
  `logo` varchar(128) default NULL,
  PRIMARY KEY  (`companyId`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COMMENT='公司信息';

--
-- Dumping data for table `company`
--

/*!40000 ALTER TABLE `company` DISABLE KEYS */;
/*!40000 ALTER TABLE `company` ENABLE KEYS */;


--
-- Definition of table `contract`
--

DROP TABLE IF EXISTS `contract`;
CREATE TABLE `contract` (
  `contractId` bigint(20) NOT NULL auto_increment,
  `contractNo` varchar(64) NOT NULL COMMENT '合同编号',
  `subject` varchar(128) NOT NULL COMMENT '合同标题',
  `contractAmount` decimal(10,0) NOT NULL COMMENT '合同金额',
  `mainItem` varchar(4000) default NULL COMMENT '主要条款',
  `salesAfterItem` varchar(4000) default NULL COMMENT '售后条款',
  `validDate` datetime NOT NULL COMMENT '生效日期',
  `expireDate` datetime NOT NULL COMMENT '有效期',
  `serviceDep` varchar(64) default NULL COMMENT '维修部门',
  `serviceMan` varchar(64) default NULL COMMENT '维修负责人',
  `signupUser` varchar(64) NOT NULL COMMENT '签约人',
  `signupTime` datetime NOT NULL COMMENT '签约时间',
  `creator` varchar(32) NOT NULL COMMENT '录入人',
  `createtime` datetime NOT NULL COMMENT '录入时间',
  `projectId` bigint(20) default NULL COMMENT '所属项目',
  `consignAddress` varchar(128) default NULL COMMENT '收货地址',
  `consignee` varchar(32) default NULL COMMENT '收货人',
  PRIMARY KEY  (`contractId`),
  KEY `FK_CT_R_PT` (`projectId`),
  CONSTRAINT `FK_CT_R_PT` FOREIGN KEY (`projectId`) REFERENCES `project` (`projectId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `contract`
--

/*!40000 ALTER TABLE `contract` DISABLE KEYS */;
/*!40000 ALTER TABLE `contract` ENABLE KEYS */;


--
-- Definition of table `contract_config`
--

DROP TABLE IF EXISTS `contract_config`;
CREATE TABLE `contract_config` (
  `configId` bigint(20) NOT NULL auto_increment,
  `itemName` varchar(128) NOT NULL COMMENT '设备名称',
  `contractId` bigint(20) default NULL,
  `itemSpec` varchar(128) NOT NULL COMMENT '设置规格',
  `amount` decimal(18,2) NOT NULL COMMENT '数量',
  `notes` varchar(200) default NULL COMMENT '备注',
  PRIMARY KEY  (`configId`),
  KEY `FK_CC_R_CT` (`contractId`),
  CONSTRAINT `FK_CC_R_CT` FOREIGN KEY (`contractId`) REFERENCES `contract` (`contractId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='合同配置单';

--
-- Dumping data for table `contract_config`
--

/*!40000 ALTER TABLE `contract_config` DISABLE KEYS */;
/*!40000 ALTER TABLE `contract_config` ENABLE KEYS */;


--
-- Definition of table `contract_file`
--

DROP TABLE IF EXISTS `contract_file`;
CREATE TABLE `contract_file` (
  `fileId` bigint(20) NOT NULL,
  `contractId` bigint(20) NOT NULL,
  PRIMARY KEY  (`fileId`,`contractId`),
  KEY `FK_CTF_R_CT` (`contractId`),
  CONSTRAINT `FK_CTF_R_FA` FOREIGN KEY (`fileId`) REFERENCES `file_attach` (`fileId`),
  CONSTRAINT `FK_CTF_R_CT` FOREIGN KEY (`contractId`) REFERENCES `contract` (`contractId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='合同附件';

--
-- Dumping data for table `contract_file`
--

/*!40000 ALTER TABLE `contract_file` DISABLE KEYS */;
/*!40000 ALTER TABLE `contract_file` ENABLE KEYS */;


--
-- Definition of table `cus_connection`
--

DROP TABLE IF EXISTS `cus_connection`;
CREATE TABLE `cus_connection` (
  `connId` bigint(20) NOT NULL auto_increment,
  `customerId` bigint(20) NOT NULL,
  `contactor` varchar(32) NOT NULL,
  `startDate` datetime NOT NULL,
  `endDate` datetime NOT NULL,
  `content` varchar(512) NOT NULL,
  `notes` varchar(1000) default NULL,
  `creator` varchar(32) default NULL,
  PRIMARY KEY  (`connId`),
  KEY `FK_CC_R_CS` (`customerId`),
  CONSTRAINT `FK_CC_R_CS` FOREIGN KEY (`customerId`) REFERENCES `customer` (`customerId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='business connection ';

--
-- Dumping data for table `cus_connection`
--

/*!40000 ALTER TABLE `cus_connection` DISABLE KEYS */;
/*!40000 ALTER TABLE `cus_connection` ENABLE KEYS */;


--
-- Definition of table `cus_linkman`
--

DROP TABLE IF EXISTS `cus_linkman`;
CREATE TABLE `cus_linkman` (
  `linkmanId` bigint(20) NOT NULL auto_increment,
  `customerId` bigint(20) NOT NULL COMMENT '所属客户',
  `fullname` varchar(32) NOT NULL COMMENT '姓名',
  `sex` smallint(6) NOT NULL COMMENT '性别',
  `position` varchar(32) default NULL COMMENT '职位',
  `phone` varchar(32) default NULL COMMENT '电话',
  `mobile` varchar(32) NOT NULL COMMENT '手机',
  `email` varchar(100) default NULL COMMENT 'Email',
  `msn` varchar(100) default NULL COMMENT 'MSN',
  `qq` varchar(64) default NULL COMMENT 'QQ',
  `birthday` date default NULL COMMENT '生日',
  `homeAddress` varchar(128) default NULL COMMENT '家庭住址',
  `homeZip` varchar(32) default NULL COMMENT '邮编',
  `homePhone` varchar(32) default NULL COMMENT '家庭电话',
  `hobby` varchar(100) default NULL COMMENT '爱好',
  `isPrimary` smallint(6) NOT NULL COMMENT '是否为主要联系人',
  `notes` varchar(500) default NULL COMMENT '备注',
  `fax` varchar(32) default NULL COMMENT '传真',
  PRIMARY KEY  (`linkmanId`),
  KEY `FK_CLM_R_CS` (`customerId`),
  CONSTRAINT `FK_CLM_R_CS` FOREIGN KEY (`customerId`) REFERENCES `customer` (`customerId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='客户联系人';

--
-- Dumping data for table `cus_linkman`
--

/*!40000 ALTER TABLE `cus_linkman` DISABLE KEYS */;
INSERT INTO `cus_linkman` (`linkmanId`,`customerId`,`fullname`,`sex`,`position`,`phone`,`mobile`,`email`,`msn`,`qq`,`birthday`,`homeAddress`,`homeZip`,`homePhone`,`hobby`,`isPrimary`,`notes`,`fax`) VALUES 
 (1,1,'廖明利',0,'','','15913157838','','','',NULL,NULL,NULL,'',NULL,0,NULL,NULL);
/*!40000 ALTER TABLE `cus_linkman` ENABLE KEYS */;


--
-- Definition of table `customer`
--

DROP TABLE IF EXISTS `customer`;
CREATE TABLE `customer` (
  `customerId` bigint(20) NOT NULL auto_increment,
  `customerNo` varchar(64) NOT NULL COMMENT '客户号\n            自动生成',
  `industryType` varchar(64) NOT NULL COMMENT '所属行业\n            有缺省的选择，也可以输入',
  `customerSource` varchar(64) default NULL COMMENT '客户来源\n            可编辑，可添加\n            \n            电话访问\n            网络\n            客户或朋友介绍',
  `customerType` smallint(6) NOT NULL COMMENT '1=正式客户\n            2=重要客户\n            3＝潜在客户\n            4＝无效客户',
  `companyScale` int(11) default NULL COMMENT '1=1-20人\n            2=20-50人\n            3=50-100人\n            4=100-200人\n            5=200-500人\n            6=500-1000 人\n            7=1000人以上\n            ',
  `customerName` varchar(128) NOT NULL COMMENT '客户名称\n            一般为公司名称',
  `customerManager` varchar(32) NOT NULL COMMENT '负责该客户的经理',
  `phone` varchar(32) NOT NULL COMMENT '电话',
  `fax` varchar(32) default NULL,
  `site` varchar(128) default NULL,
  `email` varchar(128) default NULL,
  `state` varchar(32) default NULL,
  `city` varchar(32) default NULL,
  `zip` varchar(32) default NULL,
  `address` varchar(100) default NULL,
  `registerFun` decimal(10,0) default NULL,
  `turnOver` decimal(10,0) default NULL,
  `currencyUnit` varchar(32) default NULL COMMENT '注册资金及年营业额的货币单位\n            可选可编辑\n            人民币（默认）\n            美元\n            ',
  `otherDesc` varchar(800) default NULL,
  `principal` varchar(32) default NULL,
  `openBank` varchar(64) default NULL,
  `accountsNo` varchar(64) default NULL,
  `taxNo` varchar(64) default NULL,
  `notes` varchar(500) default NULL,
  `rights` smallint(6) NOT NULL COMMENT '1=客户经理及上级经理有权查看\n            2=公开\n            3=共享人员有权查看',
  PRIMARY KEY  (`customerId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='客户信息';

--
-- Dumping data for table `customer`
--

/*!40000 ALTER TABLE `customer` DISABLE KEYS */;
INSERT INTO `customer` (`customerId`,`customerNo`,`industryType`,`customerSource`,`customerType`,`companyScale`,`customerName`,`customerManager`,`phone`,`fax`,`site`,`email`,`state`,`city`,`zip`,`address`,`registerFun`,`turnOver`,`currencyUnit`,`otherDesc`,`principal`,`openBank`,`accountsNo`,`taxNo`,`notes`,`rights`) VALUES 
 (1,'20091103103827-234','服装','户外广告',4,NULL,'廖明利','劳家婵','15913157838','','','','广东','广州','','',NULL,NULL,NULL,NULL,'',NULL,NULL,NULL,NULL,1),
 (2,'20091103104047-062','电子元器件','1',2,NULL,'东聚电子','劳家婵','84111366-8005','84111356','','stottle.wong@gmail.com','广东','广州','','',NULL,NULL,'人民币','','黄先生','','','','',1);
/*!40000 ALTER TABLE `customer` ENABLE KEYS */;


--
-- Definition of table `department`
--

DROP TABLE IF EXISTS `department`;
CREATE TABLE `department` (
  `depId` bigint(20) NOT NULL auto_increment,
  `depName` varchar(128) NOT NULL,
  `depDesc` varchar(256) default NULL,
  `depLevel` int(11) NOT NULL,
  `parentId` bigint(20) default NULL,
  `path` varchar(128) default NULL,
  PRIMARY KEY  (`depId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `department`
--

/*!40000 ALTER TABLE `department` DISABLE KEYS */;
INSERT INTO `department` (`depId`,`depName`,`depDesc`,`depLevel`,`parentId`,`path`) VALUES 
 (1,'开发部','开发软件',1,NULL,'1.'),
 (2,'研发部','项目开发部',2,0,'0.2.'),
 (4,'市场部','市场部',2,0,'0.4.');
/*!40000 ALTER TABLE `department` ENABLE KEYS */;


--
-- Definition of table `depre_record`
--

DROP TABLE IF EXISTS `depre_record`;
CREATE TABLE `depre_record` (
  `recordId` bigint(20) NOT NULL auto_increment,
  `assetsId` bigint(20) NOT NULL,
  `workCapacity` decimal(18,2) default NULL,
  `depreAmount` decimal(18,4) NOT NULL,
  `calTime` datetime NOT NULL,
  PRIMARY KEY  (`recordId`),
  KEY `FK_DR_R_FA` (`assetsId`),
  CONSTRAINT `FK_DR_R_FA` FOREIGN KEY (`assetsId`) REFERENCES `fixed_assets` (`assetsId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `depre_record`
--

/*!40000 ALTER TABLE `depre_record` DISABLE KEYS */;
/*!40000 ALTER TABLE `depre_record` ENABLE KEYS */;


--
-- Definition of table `depre_type`
--

DROP TABLE IF EXISTS `depre_type`;
CREATE TABLE `depre_type` (
  `depreTypeId` bigint(20) NOT NULL auto_increment,
  `typeName` varchar(64) NOT NULL,
  `depreRate` decimal(18,2) NOT NULL,
  `deprePeriod` decimal(18,2) NOT NULL COMMENT 'µ¥Î»ÎªÔÂ',
  `typeDesc` varchar(500) default NULL,
  `calMethod` smallint(6) NOT NULL COMMENT '1=Æ½¾ùÄêÏÞ·¨\n            2=¹¤×÷Á¿·¨\n            ¼ÓËÙÕÛ¾É·¨\n            3=Ë«±¶Óà¶îµÝ¼õ·¨\n            4=ÄêÊý×ÜºÍ·¨',
  PRIMARY KEY  (`depreTypeId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='depreciation type';

--
-- Dumping data for table `depre_type`
--

/*!40000 ALTER TABLE `depre_type` DISABLE KEYS */;
/*!40000 ALTER TABLE `depre_type` ENABLE KEYS */;


--
-- Definition of table `diary`
--

DROP TABLE IF EXISTS `diary`;
CREATE TABLE `diary` (
  `diaryId` bigint(20) NOT NULL auto_increment,
  `userId` bigint(20) default NULL COMMENT '主键',
  `dayTime` date NOT NULL,
  `content` text NOT NULL,
  `diaryType` smallint(6) NOT NULL COMMENT '1=工作日志\n            0=个人日志',
  PRIMARY KEY  (`diaryId`),
  KEY `FK_DY_R_AU` (`userId`),
  CONSTRAINT `FK_DY_R_AU` FOREIGN KEY (`userId`) REFERENCES `app_user` (`userId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `diary`
--

/*!40000 ALTER TABLE `diary` DISABLE KEYS */;
/*!40000 ALTER TABLE `diary` ENABLE KEYS */;


--
-- Definition of table `doc_file`
--

DROP TABLE IF EXISTS `doc_file`;
CREATE TABLE `doc_file` (
  `fileId` bigint(20) NOT NULL,
  `docId` bigint(20) NOT NULL,
  PRIMARY KEY  (`fileId`,`docId`),
  KEY `FK_DF_F_DT` (`docId`),
  CONSTRAINT `FK_DF_F_DT` FOREIGN KEY (`docId`) REFERENCES `document` (`docId`),
  CONSTRAINT `FK_DF_R_FA` FOREIGN KEY (`fileId`) REFERENCES `file_attach` (`fileId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `doc_file`
--

/*!40000 ALTER TABLE `doc_file` DISABLE KEYS */;
/*!40000 ALTER TABLE `doc_file` ENABLE KEYS */;


--
-- Definition of table `doc_folder`
--

DROP TABLE IF EXISTS `doc_folder`;
CREATE TABLE `doc_folder` (
  `folderId` bigint(20) NOT NULL auto_increment,
  `userId` bigint(20) default NULL COMMENT '主键',
  `folderName` varchar(128) NOT NULL COMMENT '目录名称',
  `parentId` bigint(20) default NULL COMMENT '父目录',
  `path` varchar(128) default NULL COMMENT '路径\r\n            为当前路径的＋上级路径\r\n            如当前ID为3，上级目录的路径为1.2，\r\n            则当前的路径为1.2.3.',
  `isShared` smallint(6) NOT NULL,
  PRIMARY KEY  (`folderId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `doc_folder`
--

/*!40000 ALTER TABLE `doc_folder` DISABLE KEYS */;
INSERT INTO `doc_folder` (`folderId`,`userId`,`folderName`,`parentId`,`path`,`isShared`) VALUES 
 (1,NULL,'根目录',0,'1.',1);
/*!40000 ALTER TABLE `doc_folder` ENABLE KEYS */;


--
-- Definition of table `doc_privilege`
--

DROP TABLE IF EXISTS `doc_privilege`;
CREATE TABLE `doc_privilege` (
  `privilegeId` bigint(20) NOT NULL auto_increment,
  `folderId` bigint(20) default NULL,
  `docId` bigint(20) default NULL,
  `rights` int(11) NOT NULL COMMENT '权限\r\n            文档或目录的读写修改权限\r\n            1=读\r\n            2=修改\r\n            4=删除\r\n\r\n            权限值可以为上面的值之和\r\n            如：3则代表进行读，修改的操作\r\n\r\n\r\n            ',
  `udrId` int(11) default NULL,
  `udrName` varchar(128) default NULL,
  `flag` smallint(6) NOT NULL COMMENT '1=user\r\n            2=deparment\r\n            3=role',
  `fdFlag` smallint(6) NOT NULL COMMENT '缺省为文件夹权限\r\n            1=文档权限\r\n            0=文件夹权限',
  PRIMARY KEY  (`privilegeId`),
  KEY `FK_DP_R_DF` (`folderId`),
  KEY `FK_DP_R_DT` (`docId`),
  CONSTRAINT `FK_DP_R_DF` FOREIGN KEY (`folderId`) REFERENCES `doc_folder` (`folderId`),
  CONSTRAINT `FK_DP_R_DT` FOREIGN KEY (`docId`) REFERENCES `document` (`docId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='文档或目录的权限，只要是针对公共目录下的';

--
-- Dumping data for table `doc_privilege`
--

/*!40000 ALTER TABLE `doc_privilege` DISABLE KEYS */;
INSERT INTO `doc_privilege` (`privilegeId`,`folderId`,`docId`,`rights`,`udrId`,`udrName`,`flag`,`fdFlag`) VALUES 
 (1,1,NULL,3,4,'骆运阳',1,0);
/*!40000 ALTER TABLE `doc_privilege` ENABLE KEYS */;


--
-- Definition of table `document`
--

DROP TABLE IF EXISTS `document`;
CREATE TABLE `document` (
  `docId` bigint(20) NOT NULL auto_increment,
  `docName` varchar(100) NOT NULL,
  `content` text COMMENT '内容',
  `createtime` datetime NOT NULL COMMENT '创建时间',
  `updatetime` datetime default NULL,
  `folderId` bigint(20) default NULL,
  `userId` bigint(20) default NULL COMMENT '主键',
  `haveAttach` smallint(6) default NULL,
  `sharedUserIds` varchar(1000) default NULL COMMENT '共享员工ID',
  `sharedUserNames` varchar(1000) default NULL,
  `sharedDepIds` varchar(1000) default NULL COMMENT '共享部门ID',
  `sharedDepNames` varchar(1000) default NULL,
  `sharedRoleIds` varchar(1000) default NULL COMMENT '共享角色ID',
  `sharedRoleNames` varchar(1000) default NULL,
  `isShared` smallint(6) NOT NULL COMMENT '是否共享',
  PRIMARY KEY  (`docId`),
  KEY `FK_DT_R_AU` (`userId`),
  KEY `FK_DT_R_DF` (`folderId`),
  CONSTRAINT `FK_DT_R_AU` FOREIGN KEY (`userId`) REFERENCES `app_user` (`userId`),
  CONSTRAINT `FK_DT_R_DF` FOREIGN KEY (`folderId`) REFERENCES `doc_folder` (`folderId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='文档';

--
-- Dumping data for table `document`
--

/*!40000 ALTER TABLE `document` DISABLE KEYS */;
/*!40000 ALTER TABLE `document` ENABLE KEYS */;


--
-- Definition of table `file_attach`
--

DROP TABLE IF EXISTS `file_attach`;
CREATE TABLE `file_attach` (
  `fileId` bigint(20) NOT NULL auto_increment,
  `fileName` varchar(128) NOT NULL COMMENT '文件名',
  `filePath` varchar(128) NOT NULL COMMENT '文件路径',
  `createtime` datetime NOT NULL COMMENT '创建时间',
  `ext` varchar(32) default NULL COMMENT '扩展名',
  `fileType` varchar(32) default NULL,
  `note` varchar(1024) default NULL COMMENT '说明',
  `creator` varchar(32) NOT NULL COMMENT '上传者',
  PRIMARY KEY  (`fileId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='附件';

--
-- Dumping data for table `file_attach`
--

/*!40000 ALTER TABLE `file_attach` DISABLE KEYS */;
INSERT INTO `file_attach` (`fileId`,`fileName`,`filePath`,`createtime`,`ext`,`fileType`,`note`,`creator`) VALUES 
 (1,'snc.jpg','system/appUser/200911/46d3abc556d14531801c29b874ed743c.jpg','2009-11-02 18:19:01','jpg','system/appUser','3778 bytes','劳家婵');
/*!40000 ALTER TABLE `file_attach` ENABLE KEYS */;


--
-- Definition of table `fixed_assets`
--

DROP TABLE IF EXISTS `fixed_assets`;
CREATE TABLE `fixed_assets` (
  `assetsId` bigint(20) NOT NULL auto_increment,
  `assetsNo` varchar(128) default NULL,
  `assetsName` varchar(128) NOT NULL,
  `model` varchar(64) default NULL,
  `assetsTypeId` bigint(20) NOT NULL,
  `manufacturer` varchar(64) default NULL,
  `manuDate` datetime default NULL,
  `buyDate` datetime NOT NULL,
  `beDep` varchar(64) NOT NULL,
  `custodian` varchar(32) default NULL,
  `notes` varchar(500) default NULL,
  `remainValRate` decimal(18,6) NOT NULL,
  `depreTypeId` bigint(20) NOT NULL,
  `startDepre` datetime default NULL,
  `intendTerm` decimal(18,2) default NULL,
  `intendWorkGross` decimal(18,2) default NULL COMMENT 'µ±ÕÛ¾ÉµÄ·½·¨Ñ¡ÔñÓÃ¹¤×÷Á¿·¨½øÐÐ¼ÆËãÊ±£¬²ÅÐèÒªÌîÐ´',
  `workGrossUnit` varchar(128) default NULL,
  `assetValue` decimal(18,4) NOT NULL,
  `assetCurValue` decimal(18,4) NOT NULL,
  PRIMARY KEY  (`assetsId`),
  KEY `FK_FA_R_AT` (`assetsTypeId`),
  KEY `FK_FA_R_DT` (`depreTypeId`),
  CONSTRAINT `FK_FA_R_AT` FOREIGN KEY (`assetsTypeId`) REFERENCES `assets_type` (`assetsTypeId`),
  CONSTRAINT `FK_FA_R_DT` FOREIGN KEY (`depreTypeId`) REFERENCES `depre_type` (`depreTypeId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `fixed_assets`
--

/*!40000 ALTER TABLE `fixed_assets` DISABLE KEYS */;
/*!40000 ALTER TABLE `fixed_assets` ENABLE KEYS */;


--
-- Definition of table `form_data`
--

DROP TABLE IF EXISTS `form_data`;
CREATE TABLE `form_data` (
  `dataId` bigint(20) NOT NULL auto_increment,
  `formId` bigint(20) NOT NULL COMMENT '所属表单',
  `fieldLabel` varchar(128) NOT NULL COMMENT '字段标签',
  `fieldName` varchar(64) NOT NULL COMMENT '字段名称',
  `intValue` int(11) default NULL COMMENT '整数值',
  `longValue` bigint(20) default NULL COMMENT '长整值',
  `decValue` decimal(18,4) default NULL COMMENT '精度值',
  `dateValue` datetime default NULL COMMENT '日期值',
  `strValue` varchar(5000) default NULL COMMENT '字符值',
  `boolValue` smallint(6) default NULL COMMENT '布尔值',
  `blobValue` blob COMMENT '对象值',
  `isShowed` smallint(6) NOT NULL COMMENT '是否显示\n            1=显示\n            0=不显示',
  PRIMARY KEY  (`dataId`),
  KEY `FK_FD_R_PF` (`formId`),
  CONSTRAINT `FK_FD_R_PF` FOREIGN KEY (`formId`) REFERENCES `process_form` (`formId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `form_data`
--

/*!40000 ALTER TABLE `form_data` DISABLE KEYS */;
/*!40000 ALTER TABLE `form_data` ENABLE KEYS */;


--
-- Definition of table `form_file`
--

DROP TABLE IF EXISTS `form_file`;
CREATE TABLE `form_file` (
  `formId` bigint(20) NOT NULL,
  `fileId` bigint(20) NOT NULL,
  PRIMARY KEY  (`formId`,`fileId`),
  KEY `FK_FF_R_FA` (`fileId`),
  CONSTRAINT `FK_FF_R_FA` FOREIGN KEY (`fileId`) REFERENCES `file_attach` (`fileId`),
  CONSTRAINT `FK_FF_R_PF` FOREIGN KEY (`formId`) REFERENCES `process_form` (`formId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='流程表单附件';

--
-- Dumping data for table `form_file`
--

/*!40000 ALTER TABLE `form_file` DISABLE KEYS */;
/*!40000 ALTER TABLE `form_file` ENABLE KEYS */;


--
-- Definition of table `goods_apply`
--

DROP TABLE IF EXISTS `goods_apply`;
CREATE TABLE `goods_apply` (
  `applyId` bigint(20) NOT NULL auto_increment,
  `goodsId` bigint(20) NOT NULL,
  `applyDate` datetime NOT NULL,
  `applyNo` varchar(128) NOT NULL COMMENT '申请号,按系统时间产生，如GA20091002-0001',
  `useCounts` int(11) NOT NULL,
  `proposer` varchar(32) NOT NULL,
  `notes` varchar(500) default NULL,
  `approvalStatus` smallint(6) NOT NULL COMMENT '审批状态\n            1=通过审批\n            0=未审批\n            ',
  PRIMARY KEY  (`applyId`),
  KEY `FK_GA_R_OG` (`goodsId`),
  CONSTRAINT `FK_GA_R_OG` FOREIGN KEY (`goodsId`) REFERENCES `office_goods` (`goodsId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='办公用品出库';

--
-- Dumping data for table `goods_apply`
--

/*!40000 ALTER TABLE `goods_apply` DISABLE KEYS */;
/*!40000 ALTER TABLE `goods_apply` ENABLE KEYS */;


--
-- Definition of table `in_message`
--

DROP TABLE IF EXISTS `in_message`;
CREATE TABLE `in_message` (
  `receiveId` bigint(20) NOT NULL auto_increment,
  `messageId` bigint(20) default NULL,
  `userId` bigint(20) NOT NULL,
  `readFlag` smallint(6) NOT NULL COMMENT '1=has red\r\n            0=unread',
  `userFullname` varchar(128) NOT NULL,
  `delFlag` smallint(6) NOT NULL,
  PRIMARY KEY  (`receiveId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `in_message`
--

/*!40000 ALTER TABLE `in_message` DISABLE KEYS */;
INSERT INTO `in_message` (`receiveId`,`messageId`,`userId`,`readFlag`,`userFullname`,`delFlag`) VALUES 
 (1,1,2,1,'李迅宇',1),
 (2,2,4,1,'骆运阳',1),
 (3,3,2,1,'李迅宇',1),
 (4,4,4,1,'骆运阳',1),
 (5,5,2,1,'李迅宇',1),
 (6,6,2,1,'李迅宇',1),
 (7,6,4,1,'骆运阳',1),
 (8,6,5,1,'陈尚轩',1),
 (9,7,5,1,'陈尚轩',1),
 (10,8,4,1,'骆运阳',1),
 (11,8,5,1,'陈尚轩',1),
 (12,9,4,1,'骆运阳',1),
 (13,10,4,1,'骆运阳',1);
/*!40000 ALTER TABLE `in_message` ENABLE KEYS */;


--
-- Definition of table `in_stock`
--

DROP TABLE IF EXISTS `in_stock`;
CREATE TABLE `in_stock` (
  `buyId` bigint(20) NOT NULL auto_increment,
  `goodsId` bigint(20) NOT NULL,
  `providerName` varchar(128) default NULL,
  `stockNo` varchar(128) NOT NULL,
  `price` decimal(18,2) default NULL,
  `inCounts` int(11) default NULL,
  `amount` decimal(18,2) NOT NULL,
  `inDate` datetime NOT NULL,
  `buyer` varchar(128) default NULL,
  PRIMARY KEY  (`buyId`),
  KEY `FK_IS_R_OG` (`goodsId`),
  CONSTRAINT `FK_IS_R_OG` FOREIGN KEY (`goodsId`) REFERENCES `office_goods` (`goodsId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='办公用品入库需要同时更新办公用品表的库存';

--
-- Dumping data for table `in_stock`
--

/*!40000 ALTER TABLE `in_stock` DISABLE KEYS */;
/*!40000 ALTER TABLE `in_stock` ENABLE KEYS */;


--
-- Definition of table `index_display`
--

DROP TABLE IF EXISTS `index_display`;
CREATE TABLE `index_display` (
  `indexId` bigint(20) NOT NULL auto_increment,
  `portalId` varchar(64) NOT NULL COMMENT 'Portal ID',
  `userId` bigint(20) NOT NULL COMMENT '用户ID',
  `colNum` int(11) NOT NULL COMMENT '列号',
  `rowNum` int(11) NOT NULL COMMENT '行号',
  PRIMARY KEY  (`indexId`),
  KEY `FK_ID_R_AU` (`userId`),
  CONSTRAINT `FK_ID_R_AU` FOREIGN KEY (`userId`) REFERENCES `app_user` (`userId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='每个员工可以设置自己的显示方式';

--
-- Dumping data for table `index_display`
--

/*!40000 ALTER TABLE `index_display` DISABLE KEYS */;
/*!40000 ALTER TABLE `index_display` ENABLE KEYS */;


--
-- Definition of table `jbpm4_deployment`
--

DROP TABLE IF EXISTS `jbpm4_deployment`;
CREATE TABLE `jbpm4_deployment` (
  `DBID_` bigint(20) NOT NULL auto_increment,
  `NAME_` longtext,
  `TIMESTAMP_` bigint(20) default NULL,
  `STATE_` varchar(255) default NULL,
  PRIMARY KEY  (`DBID_`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `jbpm4_deployment`
--

/*!40000 ALTER TABLE `jbpm4_deployment` DISABLE KEYS */;
/*!40000 ALTER TABLE `jbpm4_deployment` ENABLE KEYS */;


--
-- Definition of table `jbpm4_deployprop`
--

DROP TABLE IF EXISTS `jbpm4_deployprop`;
CREATE TABLE `jbpm4_deployprop` (
  `DBID_` bigint(20) NOT NULL auto_increment,
  `DEPLOYMENT_` bigint(20) default NULL,
  `OBJNAME_` varchar(255) default NULL,
  `KEY_` varchar(255) default NULL,
  `STRINGVAL_` varchar(255) default NULL,
  `LONGVAL_` bigint(20) default NULL,
  PRIMARY KEY  (`DBID_`),
  KEY `IDX_DEPLPROP_DEPL` (`DEPLOYMENT_`),
  KEY `FK_DEPLPROP_DEPL` (`DEPLOYMENT_`),
  CONSTRAINT `FK_DEPLPROP_DEPL` FOREIGN KEY (`DEPLOYMENT_`) REFERENCES `jbpm4_deployment` (`DBID_`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `jbpm4_deployprop`
--

/*!40000 ALTER TABLE `jbpm4_deployprop` DISABLE KEYS */;
/*!40000 ALTER TABLE `jbpm4_deployprop` ENABLE KEYS */;


--
-- Definition of table `jbpm4_execution`
--

DROP TABLE IF EXISTS `jbpm4_execution`;
CREATE TABLE `jbpm4_execution` (
  `DBID_` bigint(20) NOT NULL auto_increment,
  `CLASS_` varchar(255) NOT NULL,
  `DBVERSION_` int(11) NOT NULL,
  `ACTIVITYNAME_` varchar(255) default NULL,
  `PROCDEFID_` varchar(255) default NULL,
  `HASVARS_` bit(1) default NULL,
  `NAME_` varchar(255) default NULL,
  `KEY_` varchar(255) default NULL,
  `ID_` varchar(255) default NULL,
  `STATE_` varchar(255) default NULL,
  `SUSPHISTSTATE_` varchar(255) default NULL,
  `PRIORITY_` int(11) default NULL,
  `HISACTINST_` bigint(20) default NULL,
  `PARENT_` bigint(20) default NULL,
  `INSTANCE_` bigint(20) default NULL,
  `SUPEREXEC_` bigint(20) default NULL,
  `SUBPROCINST_` bigint(20) default NULL,
  `PARENT_IDX_` int(11) default NULL,
  PRIMARY KEY  (`DBID_`),
  UNIQUE KEY `ID_` (`ID_`),
  KEY `IDX_EXEC_SUPEREXEC` (`SUPEREXEC_`),
  KEY `IDX_EXEC_INSTANCE` (`INSTANCE_`),
  KEY `IDX_EXEC_SUBPI` (`SUBPROCINST_`),
  KEY `IDX_EXEC_PARENT` (`PARENT_`),
  KEY `FK_EXEC_PARENT` (`PARENT_`),
  KEY `FK_EXEC_SUBPI` (`SUBPROCINST_`),
  KEY `FK_EXEC_INSTANCE` (`INSTANCE_`),
  KEY `FK_EXEC_SUPEREXEC` (`SUPEREXEC_`),
  CONSTRAINT `FK_EXEC_INSTANCE` FOREIGN KEY (`INSTANCE_`) REFERENCES `jbpm4_execution` (`DBID_`),
  CONSTRAINT `FK_EXEC_PARENT` FOREIGN KEY (`PARENT_`) REFERENCES `jbpm4_execution` (`DBID_`),
  CONSTRAINT `FK_EXEC_SUBPI` FOREIGN KEY (`SUBPROCINST_`) REFERENCES `jbpm4_execution` (`DBID_`),
  CONSTRAINT `FK_EXEC_SUPEREXEC` FOREIGN KEY (`SUPEREXEC_`) REFERENCES `jbpm4_execution` (`DBID_`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `jbpm4_execution`
--

/*!40000 ALTER TABLE `jbpm4_execution` DISABLE KEYS */;
/*!40000 ALTER TABLE `jbpm4_execution` ENABLE KEYS */;


--
-- Definition of table `jbpm4_hist_actinst`
--

DROP TABLE IF EXISTS `jbpm4_hist_actinst`;
CREATE TABLE `jbpm4_hist_actinst` (
  `DBID_` bigint(20) NOT NULL auto_increment,
  `CLASS_` varchar(255) NOT NULL,
  `DBVERSION_` int(11) NOT NULL,
  `HPROCI_` bigint(20) default NULL,
  `TYPE_` varchar(255) default NULL,
  `EXECUTION_` varchar(255) default NULL,
  `ACTIVITY_NAME_` varchar(255) default NULL,
  `START_` datetime default NULL,
  `END_` datetime default NULL,
  `DURATION_` bigint(20) default NULL,
  `TRANSITION_` varchar(255) default NULL,
  `NEXTIDX_` int(11) default NULL,
  `HTASK_` bigint(20) default NULL,
  PRIMARY KEY  (`DBID_`),
  KEY `IDX_HACTI_HPROCI` (`HPROCI_`),
  KEY `IDX_HTI_HTASK` (`HTASK_`),
  KEY `FK_HACTI_HPROCI` (`HPROCI_`),
  KEY `FK_HTI_HTASK` (`HTASK_`),
  CONSTRAINT `FK_HACTI_HPROCI` FOREIGN KEY (`HPROCI_`) REFERENCES `jbpm4_hist_procinst` (`DBID_`),
  CONSTRAINT `FK_HTI_HTASK` FOREIGN KEY (`HTASK_`) REFERENCES `jbpm4_hist_task` (`DBID_`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `jbpm4_hist_actinst`
--

/*!40000 ALTER TABLE `jbpm4_hist_actinst` DISABLE KEYS */;
/*!40000 ALTER TABLE `jbpm4_hist_actinst` ENABLE KEYS */;


--
-- Definition of table `jbpm4_hist_detail`
--

DROP TABLE IF EXISTS `jbpm4_hist_detail`;
CREATE TABLE `jbpm4_hist_detail` (
  `DBID_` bigint(20) NOT NULL auto_increment,
  `CLASS_` varchar(255) NOT NULL,
  `DBVERSION_` int(11) NOT NULL,
  `USERID_` varchar(255) default NULL,
  `TIME_` datetime default NULL,
  `HPROCI_` bigint(20) default NULL,
  `HPROCIIDX_` int(11) default NULL,
  `HACTI_` bigint(20) default NULL,
  `HACTIIDX_` int(11) default NULL,
  `HTASK_` bigint(20) default NULL,
  `HTASKIDX_` int(11) default NULL,
  `HVAR_` bigint(20) default NULL,
  `HVARIDX_` int(11) default NULL,
  `MESSAGE_` longtext,
  `OLD_INT_` int(11) default NULL,
  `NEW_INT_` int(11) default NULL,
  `OLD_STR_` varchar(255) default NULL,
  `NEW_STR_` varchar(255) default NULL,
  `OLD_TIME_` datetime default NULL,
  `NEW_TIME_` datetime default NULL,
  `PARENT_` bigint(20) default NULL,
  `PARENT_IDX_` int(11) default NULL,
  PRIMARY KEY  (`DBID_`),
  KEY `IDX_HDET_HACTI` (`HACTI_`),
  KEY `IDX_HDET_HPROCI` (`HPROCI_`),
  KEY `IDX_HDETAIL_HACTI` (`HACTI_`),
  KEY `IDX_HDETAIL_HVAR` (`HVAR_`),
  KEY `IDX_HDETAIL_HTASK` (`HTASK_`),
  KEY `IDX_HDETAIL_HPROCI` (`HPROCI_`),
  KEY `IDX_HDET_HVAR` (`HVAR_`),
  KEY `IDX_HDET_HTASK` (`HTASK_`),
  KEY `FK_HDETAIL_HPROCI` (`HPROCI_`),
  KEY `FK_HDETAIL_HACTI` (`HACTI_`),
  KEY `FK_HDETAIL_HTASK` (`HTASK_`),
  KEY `FK_HDETAIL_HVAR` (`HVAR_`),
  CONSTRAINT `FK_HDETAIL_HACTI` FOREIGN KEY (`HACTI_`) REFERENCES `jbpm4_hist_actinst` (`DBID_`),
  CONSTRAINT `FK_HDETAIL_HPROCI` FOREIGN KEY (`HPROCI_`) REFERENCES `jbpm4_hist_procinst` (`DBID_`),
  CONSTRAINT `FK_HDETAIL_HTASK` FOREIGN KEY (`HTASK_`) REFERENCES `jbpm4_hist_task` (`DBID_`),
  CONSTRAINT `FK_HDETAIL_HVAR` FOREIGN KEY (`HVAR_`) REFERENCES `jbpm4_hist_var` (`DBID_`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `jbpm4_hist_detail`
--

/*!40000 ALTER TABLE `jbpm4_hist_detail` DISABLE KEYS */;
/*!40000 ALTER TABLE `jbpm4_hist_detail` ENABLE KEYS */;


--
-- Definition of table `jbpm4_hist_procinst`
--

DROP TABLE IF EXISTS `jbpm4_hist_procinst`;
CREATE TABLE `jbpm4_hist_procinst` (
  `DBID_` bigint(20) NOT NULL,
  `DBVERSION_` int(11) NOT NULL,
  `ID_` varchar(255) default NULL,
  `PROCDEFID_` varchar(255) default NULL,
  `KEY_` varchar(255) default NULL,
  `START_` datetime default NULL,
  `END_` datetime default NULL,
  `DURATION_` bigint(20) default NULL,
  `STATE_` varchar(255) default NULL,
  `ENDACTIVITY_` varchar(255) default NULL,
  `NEXTIDX_` int(11) default NULL,
  PRIMARY KEY  (`DBID_`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `jbpm4_hist_procinst`
--

/*!40000 ALTER TABLE `jbpm4_hist_procinst` DISABLE KEYS */;
/*!40000 ALTER TABLE `jbpm4_hist_procinst` ENABLE KEYS */;


--
-- Definition of table `jbpm4_hist_task`
--

DROP TABLE IF EXISTS `jbpm4_hist_task`;
CREATE TABLE `jbpm4_hist_task` (
  `DBID_` bigint(20) NOT NULL,
  `DBVERSION_` int(11) NOT NULL,
  `EXECUTION_` varchar(255) default NULL,
  `OUTCOME_` varchar(255) default NULL,
  `ASSIGNEE_` varchar(255) default NULL,
  `PRIORITY_` int(11) default NULL,
  `STATE_` varchar(255) default NULL,
  `CREATE_` datetime default NULL,
  `END_` datetime default NULL,
  `DURATION_` bigint(20) default NULL,
  `NEXTIDX_` int(11) default NULL,
  `SUPERTASK_` bigint(20) default NULL,
  PRIMARY KEY  (`DBID_`),
  KEY `FK_HSUPERT_SUB` (`SUPERTASK_`),
  CONSTRAINT `FK_HSUPERT_SUB` FOREIGN KEY (`SUPERTASK_`) REFERENCES `jbpm4_hist_task` (`DBID_`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `jbpm4_hist_task`
--

/*!40000 ALTER TABLE `jbpm4_hist_task` DISABLE KEYS */;
/*!40000 ALTER TABLE `jbpm4_hist_task` ENABLE KEYS */;


--
-- Definition of table `jbpm4_hist_var`
--

DROP TABLE IF EXISTS `jbpm4_hist_var`;
CREATE TABLE `jbpm4_hist_var` (
  `DBID_` bigint(20) NOT NULL,
  `DBVERSION_` int(11) NOT NULL,
  `PROCINSTID_` varchar(255) default NULL,
  `EXECUTIONID_` varchar(255) default NULL,
  `VARNAME_` varchar(255) default NULL,
  `VALUE_` varchar(255) default NULL,
  `HPROCI_` bigint(20) default NULL,
  `HTASK_` bigint(20) default NULL,
  PRIMARY KEY  (`DBID_`),
  KEY `IDX_HVAR_HPROCI` (`HPROCI_`),
  KEY `IDX_HVAR_HTASK` (`HTASK_`),
  KEY `FK_HVAR_HPROCI` (`HPROCI_`),
  KEY `FK_HVAR_HTASK` (`HTASK_`),
  CONSTRAINT `FK_HVAR_HPROCI` FOREIGN KEY (`HPROCI_`) REFERENCES `jbpm4_hist_procinst` (`DBID_`),
  CONSTRAINT `FK_HVAR_HTASK` FOREIGN KEY (`HTASK_`) REFERENCES `jbpm4_hist_task` (`DBID_`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `jbpm4_hist_var`
--

/*!40000 ALTER TABLE `jbpm4_hist_var` DISABLE KEYS */;
/*!40000 ALTER TABLE `jbpm4_hist_var` ENABLE KEYS */;


--
-- Definition of table `jbpm4_id_group`
--

DROP TABLE IF EXISTS `jbpm4_id_group`;
CREATE TABLE `jbpm4_id_group` (
  `DBID_` bigint(20) NOT NULL auto_increment,
  `DBVERSION_` int(11) NOT NULL,
  `ID_` varchar(255) default NULL,
  `NAME_` varchar(255) default NULL,
  `TYPE_` varchar(255) default NULL,
  `PARENT_` bigint(20) default NULL,
  PRIMARY KEY  (`DBID_`),
  KEY `IDX_GROUP_PARENT` (`PARENT_`),
  KEY `FK_GROUP_PARENT` (`PARENT_`),
  CONSTRAINT `FK_GROUP_PARENT` FOREIGN KEY (`PARENT_`) REFERENCES `jbpm4_id_group` (`DBID_`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `jbpm4_id_group`
--

/*!40000 ALTER TABLE `jbpm4_id_group` DISABLE KEYS */;
/*!40000 ALTER TABLE `jbpm4_id_group` ENABLE KEYS */;


--
-- Definition of table `jbpm4_id_membership`
--

DROP TABLE IF EXISTS `jbpm4_id_membership`;
CREATE TABLE `jbpm4_id_membership` (
  `DBID_` bigint(20) NOT NULL auto_increment,
  `DBVERSION_` int(11) NOT NULL,
  `USER_` bigint(20) default NULL,
  `GROUP_` bigint(20) default NULL,
  `NAME_` varchar(255) default NULL,
  PRIMARY KEY  (`DBID_`),
  KEY `IDX_MEM_USER` (`USER_`),
  KEY `IDX_MEM_GROUP` (`GROUP_`),
  KEY `FK_MEM_GROUP` (`GROUP_`),
  KEY `FK_MEM_USER` (`USER_`),
  CONSTRAINT `FK_MEM_GROUP` FOREIGN KEY (`GROUP_`) REFERENCES `jbpm4_id_group` (`DBID_`),
  CONSTRAINT `FK_MEM_USER` FOREIGN KEY (`USER_`) REFERENCES `jbpm4_id_user` (`DBID_`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `jbpm4_id_membership`
--

/*!40000 ALTER TABLE `jbpm4_id_membership` DISABLE KEYS */;
/*!40000 ALTER TABLE `jbpm4_id_membership` ENABLE KEYS */;


--
-- Definition of table `jbpm4_id_user`
--

DROP TABLE IF EXISTS `jbpm4_id_user`;
CREATE TABLE `jbpm4_id_user` (
  `DBID_` bigint(20) NOT NULL auto_increment,
  `DBVERSION_` int(11) NOT NULL,
  `ID_` varchar(255) default NULL,
  `PASSWORD_` varchar(255) default NULL,
  `GIVENNAME_` varchar(255) default NULL,
  `FAMILYNAME_` varchar(255) default NULL,
  `BUSINESSEMAIL_` varchar(255) default NULL,
  PRIMARY KEY  (`DBID_`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `jbpm4_id_user`
--

/*!40000 ALTER TABLE `jbpm4_id_user` DISABLE KEYS */;
/*!40000 ALTER TABLE `jbpm4_id_user` ENABLE KEYS */;


--
-- Definition of table `jbpm4_job`
--

DROP TABLE IF EXISTS `jbpm4_job`;
CREATE TABLE `jbpm4_job` (
  `DBID_` bigint(20) NOT NULL auto_increment,
  `CLASS_` varchar(255) NOT NULL,
  `DBVERSION_` int(11) NOT NULL,
  `DUEDATE_` datetime default NULL,
  `STATE_` varchar(255) default NULL,
  `ISEXCLUSIVE_` bit(1) default NULL,
  `LOCKOWNER_` varchar(255) default NULL,
  `LOCKEXPTIME_` datetime default NULL,
  `EXCEPTION_` longtext,
  `RETRIES_` int(11) default NULL,
  `PROCESSINSTANCE_` bigint(20) default NULL,
  `EXECUTION_` bigint(20) default NULL,
  `CFG_` bigint(20) default NULL,
  `SIGNAL_` varchar(255) default NULL,
  `EVENT_` varchar(255) default NULL,
  `REPEAT_` varchar(255) default NULL,
  PRIMARY KEY  (`DBID_`),
  KEY `IDX_JOBRETRIES` (`RETRIES_`),
  KEY `IDX_JOB_CFG` (`CFG_`),
  KEY `IDX_JOB_PRINST` (`PROCESSINSTANCE_`),
  KEY `IDX_JOB_EXE` (`EXECUTION_`),
  KEY `IDX_JOBLOCKEXP` (`LOCKEXPTIME_`),
  KEY `IDX_JOBDUEDATE` (`DUEDATE_`),
  KEY `FK_JOB_CFG` (`CFG_`),
  CONSTRAINT `FK_JOB_CFG` FOREIGN KEY (`CFG_`) REFERENCES `jbpm4_lob` (`DBID_`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `jbpm4_job`
--

/*!40000 ALTER TABLE `jbpm4_job` DISABLE KEYS */;
/*!40000 ALTER TABLE `jbpm4_job` ENABLE KEYS */;


--
-- Definition of table `jbpm4_lob`
--

DROP TABLE IF EXISTS `jbpm4_lob`;
CREATE TABLE `jbpm4_lob` (
  `DBID_` bigint(20) NOT NULL auto_increment,
  `DBVERSION_` int(11) NOT NULL,
  `BLOB_VALUE_` longblob,
  `DEPLOYMENT_` bigint(20) default NULL,
  `NAME_` longtext,
  PRIMARY KEY  (`DBID_`),
  KEY `IDX_LOB_DEPLOYMENT` (`DEPLOYMENT_`),
  KEY `FK_LOB_DEPLOYMENT` (`DEPLOYMENT_`),
  CONSTRAINT `FK_LOB_DEPLOYMENT` FOREIGN KEY (`DEPLOYMENT_`) REFERENCES `jbpm4_deployment` (`DBID_`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `jbpm4_lob`
--

/*!40000 ALTER TABLE `jbpm4_lob` DISABLE KEYS */;
/*!40000 ALTER TABLE `jbpm4_lob` ENABLE KEYS */;


--
-- Definition of table `jbpm4_participation`
--

DROP TABLE IF EXISTS `jbpm4_participation`;
CREATE TABLE `jbpm4_participation` (
  `DBID_` bigint(20) NOT NULL auto_increment,
  `DBVERSION_` int(11) NOT NULL,
  `GROUPID_` varchar(255) default NULL,
  `USERID_` varchar(255) default NULL,
  `TYPE_` varchar(255) default NULL,
  `TASK_` bigint(20) default NULL,
  `SWIMLANE_` bigint(20) default NULL,
  PRIMARY KEY  (`DBID_`),
  KEY `IDX_PART_TASK` (`TASK_`),
  KEY `FK_PART_SWIMLANE` (`SWIMLANE_`),
  KEY `FK_PART_TASK` (`TASK_`),
  CONSTRAINT `FK_PART_SWIMLANE` FOREIGN KEY (`SWIMLANE_`) REFERENCES `jbpm4_swimlane` (`DBID_`),
  CONSTRAINT `FK_PART_TASK` FOREIGN KEY (`TASK_`) REFERENCES `jbpm4_task` (`DBID_`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `jbpm4_participation`
--

/*!40000 ALTER TABLE `jbpm4_participation` DISABLE KEYS */;
/*!40000 ALTER TABLE `jbpm4_participation` ENABLE KEYS */;


--
-- Definition of table `jbpm4_swimlane`
--

DROP TABLE IF EXISTS `jbpm4_swimlane`;
CREATE TABLE `jbpm4_swimlane` (
  `DBID_` bigint(20) NOT NULL auto_increment,
  `DBVERSION_` int(11) NOT NULL,
  `NAME_` varchar(255) default NULL,
  `ASSIGNEE_` varchar(255) default NULL,
  `EXECUTION_` bigint(20) default NULL,
  PRIMARY KEY  (`DBID_`),
  KEY `IDX_SWIMLANE_EXEC` (`EXECUTION_`),
  KEY `FK_SWIMLANE_EXEC` (`EXECUTION_`),
  CONSTRAINT `FK_SWIMLANE_EXEC` FOREIGN KEY (`EXECUTION_`) REFERENCES `jbpm4_execution` (`DBID_`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `jbpm4_swimlane`
--

/*!40000 ALTER TABLE `jbpm4_swimlane` DISABLE KEYS */;
/*!40000 ALTER TABLE `jbpm4_swimlane` ENABLE KEYS */;


--
-- Definition of table `jbpm4_task`
--

DROP TABLE IF EXISTS `jbpm4_task`;
CREATE TABLE `jbpm4_task` (
  `DBID_` bigint(20) NOT NULL auto_increment,
  `CLASS_` char(1) NOT NULL,
  `DBVERSION_` int(11) NOT NULL,
  `NAME_` varchar(255) default NULL,
  `DESCR_` longtext,
  `STATE_` varchar(255) default NULL,
  `SUSPHISTSTATE_` varchar(255) default NULL,
  `ASSIGNEE_` varchar(255) default NULL,
  `FORM_` varchar(255) default NULL,
  `PRIORITY_` int(11) default NULL,
  `CREATE_` datetime default NULL,
  `DUEDATE_` datetime default NULL,
  `PROGRESS_` int(11) default NULL,
  `SIGNALLING_` bit(1) default NULL,
  `EXECUTION_ID_` varchar(255) default NULL,
  `ACTIVITY_NAME_` varchar(255) default NULL,
  `HASVARS_` bit(1) default NULL,
  `SUPERTASK_` bigint(20) default NULL,
  `EXECUTION_` bigint(20) default NULL,
  `PROCINST_` bigint(20) default NULL,
  `SWIMLANE_` bigint(20) default NULL,
  `TASKDEFNAME_` varchar(255) default NULL,
  PRIMARY KEY  (`DBID_`),
  KEY `IDX_TASK_SUPERTASK` (`SUPERTASK_`),
  KEY `FK_TASK_SWIML` (`SWIMLANE_`),
  KEY `FK_TASK_SUPERTASK` (`SUPERTASK_`),
  CONSTRAINT `FK_TASK_SUPERTASK` FOREIGN KEY (`SUPERTASK_`) REFERENCES `jbpm4_task` (`DBID_`),
  CONSTRAINT `FK_TASK_SWIML` FOREIGN KEY (`SWIMLANE_`) REFERENCES `jbpm4_swimlane` (`DBID_`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `jbpm4_task`
--

/*!40000 ALTER TABLE `jbpm4_task` DISABLE KEYS */;
/*!40000 ALTER TABLE `jbpm4_task` ENABLE KEYS */;


--
-- Definition of table `jbpm4_variable`
--

DROP TABLE IF EXISTS `jbpm4_variable`;
CREATE TABLE `jbpm4_variable` (
  `DBID_` bigint(20) NOT NULL auto_increment,
  `CLASS_` varchar(255) NOT NULL,
  `DBVERSION_` int(11) NOT NULL,
  `KEY_` varchar(255) default NULL,
  `CONVERTER_` varchar(255) default NULL,
  `HIST_` bit(1) default NULL,
  `EXECUTION_` bigint(20) default NULL,
  `TASK_` bigint(20) default NULL,
  `DATE_VALUE_` datetime default NULL,
  `DOUBLE_VALUE_` double default NULL,
  `LONG_VALUE_` bigint(20) default NULL,
  `STRING_VALUE_` varchar(255) default NULL,
  `TEXT_VALUE_` longtext,
  `LOB_` bigint(20) default NULL,
  `EXESYS_` bigint(20) default NULL,
  PRIMARY KEY  (`DBID_`),
  KEY `IDX_VAR_EXESYS` (`EXESYS_`),
  KEY `IDX_VAR_TASK` (`TASK_`),
  KEY `IDX_VAR_EXECUTION` (`EXECUTION_`),
  KEY `IDX_VAR_LOB` (`LOB_`),
  KEY `FK_VAR_LOB` (`LOB_`),
  KEY `FK_VAR_EXECUTION` (`EXECUTION_`),
  KEY `FK_VAR_EXESYS` (`EXESYS_`),
  KEY `FK_VAR_TASK` (`TASK_`),
  CONSTRAINT `FK_VAR_EXECUTION` FOREIGN KEY (`EXECUTION_`) REFERENCES `jbpm4_execution` (`DBID_`),
  CONSTRAINT `FK_VAR_EXESYS` FOREIGN KEY (`EXESYS_`) REFERENCES `jbpm4_execution` (`DBID_`),
  CONSTRAINT `FK_VAR_LOB` FOREIGN KEY (`LOB_`) REFERENCES `jbpm4_lob` (`DBID_`),
  CONSTRAINT `FK_VAR_TASK` FOREIGN KEY (`TASK_`) REFERENCES `jbpm4_task` (`DBID_`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `jbpm4_variable`
--

/*!40000 ALTER TABLE `jbpm4_variable` DISABLE KEYS */;
/*!40000 ALTER TABLE `jbpm4_variable` ENABLE KEYS */;


--
-- Definition of table `mail`
--

DROP TABLE IF EXISTS `mail`;
CREATE TABLE `mail` (
  `mailId` bigint(20) NOT NULL auto_increment,
  `sender` varchar(32) NOT NULL,
  `senderId` bigint(20) NOT NULL,
  `importantFlag` smallint(6) NOT NULL COMMENT '1=一般\r\n            2=重要\r\n            3=非常重要',
  `sendTime` datetime NOT NULL,
  `content` varchar(5000) NOT NULL COMMENT '邮件内容',
  `subject` varchar(256) NOT NULL COMMENT '邮件标题',
  `copyToNames` varchar(1000) default NULL COMMENT '抄送人姓名列表',
  `copyToIDs` varchar(1000) default NULL COMMENT '抄送人ID列表\r\n            用'',''分开',
  `recipientNames` varchar(1000) NOT NULL COMMENT '收件人姓名列表',
  `recipientIDs` varchar(1000) NOT NULL COMMENT '收件人ID列表\r\n            用'',''分隔',
  `mailStatus` smallint(6) NOT NULL COMMENT '邮件状态\r\n            1=正式邮件\r\n            0=草稿邮件',
  `fileIds` varchar(500) default NULL,
  `filenames` varchar(500) default NULL,
  PRIMARY KEY  (`mailId`),
  KEY `FK_ML_R_AU` (`senderId`),
  CONSTRAINT `FK_ML_R_AU` FOREIGN KEY (`senderId`) REFERENCES `app_user` (`userId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='邮件';

--
-- Dumping data for table `mail`
--

/*!40000 ALTER TABLE `mail` DISABLE KEYS */;
INSERT INTO `mail` (`mailId`,`sender`,`senderId`,`importantFlag`,`sendTime`,`content`,`subject`,`copyToNames`,`copyToIDs`,`recipientNames`,`recipientIDs`,`mailStatus`,`fileIds`,`filenames`) VALUES 
 (1,'劳家婵',3,2,'2009-11-02 18:22:23','​公司内部信息管理系统现在正式启用使用，公司日常事务需要在上面进行，大家对系统有任何意见，也可以提出建议，不断完善该系统。','关于启用内部系统进行信息管理邮件通知',NULL,'','超级管理员,李迅宇,劳家婵,骆运阳,陈尚轩,陈林','1,2,3,4,5,6',1,'','');
/*!40000 ALTER TABLE `mail` ENABLE KEYS */;


--
-- Definition of table `mail_attach`
--

DROP TABLE IF EXISTS `mail_attach`;
CREATE TABLE `mail_attach` (
  `mailId` bigint(20) NOT NULL,
  `fileId` bigint(20) NOT NULL,
  PRIMARY KEY  (`mailId`,`fileId`),
  KEY `FK_MA_R_FA` (`fileId`),
  CONSTRAINT `FK_MA_R_FA` FOREIGN KEY (`fileId`) REFERENCES `file_attach` (`fileId`),
  CONSTRAINT `FK_MA_R_ML` FOREIGN KEY (`mailId`) REFERENCES `mail` (`mailId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `mail_attach`
--

/*!40000 ALTER TABLE `mail_attach` DISABLE KEYS */;
/*!40000 ALTER TABLE `mail_attach` ENABLE KEYS */;


--
-- Definition of table `mail_box`
--

DROP TABLE IF EXISTS `mail_box`;
CREATE TABLE `mail_box` (
  `boxId` bigint(20) NOT NULL auto_increment,
  `mailId` bigint(20) NOT NULL,
  `folderId` bigint(20) NOT NULL,
  `userId` bigint(20) default NULL COMMENT '主键',
  `sendTime` datetime NOT NULL,
  `delFlag` smallint(6) NOT NULL COMMENT 'del=1则代表删除',
  `readFlag` smallint(6) NOT NULL,
  `note` varchar(256) default NULL COMMENT 'note',
  `replyFlag` smallint(6) NOT NULL default '0' COMMENT '0 = 未回复\r\n1 = 已回复',
  PRIMARY KEY  (`boxId`),
  KEY `FK_MB_R_AU` (`userId`),
  KEY `FK_MB_R_FD` (`folderId`),
  KEY `FK_MB_R_ML` (`mailId`),
  CONSTRAINT `FK_MB_R_AU` FOREIGN KEY (`userId`) REFERENCES `app_user` (`userId`),
  CONSTRAINT `FK_MB_R_FD` FOREIGN KEY (`folderId`) REFERENCES `mail_folder` (`folderId`),
  CONSTRAINT `FK_MB_R_ML` FOREIGN KEY (`mailId`) REFERENCES `mail` (`mailId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='收件箱';

--
-- Dumping data for table `mail_box`
--

/*!40000 ALTER TABLE `mail_box` DISABLE KEYS */;
INSERT INTO `mail_box` (`boxId`,`mailId`,`folderId`,`userId`,`sendTime`,`delFlag`,`readFlag`,`note`,`replyFlag`) VALUES 
 (1,1,2,3,'2009-11-02 18:22:23',0,1,'已发送的邮件',0),
 (2,1,1,1,'2009-11-02 18:22:23',0,0,'发送出去的邮件',0),
 (3,1,1,2,'2009-11-02 18:22:23',0,1,'发送出去的邮件',0),
 (4,1,1,3,'2009-11-02 18:22:23',0,0,'发送出去的邮件',0),
 (5,1,1,4,'2009-11-02 18:22:23',0,0,'发送出去的邮件',0),
 (6,1,1,5,'2009-11-02 18:22:23',0,0,'发送出去的邮件',0),
 (7,1,1,6,'2009-11-02 18:22:23',0,0,'发送出去的邮件',0);
/*!40000 ALTER TABLE `mail_box` ENABLE KEYS */;


--
-- Definition of table `mail_folder`
--

DROP TABLE IF EXISTS `mail_folder`;
CREATE TABLE `mail_folder` (
  `folderId` bigint(20) NOT NULL auto_increment COMMENT '文件夹编号',
  `userId` bigint(20) default NULL COMMENT '主键',
  `folderName` varchar(128) NOT NULL COMMENT '文件夹名称',
  `parentId` bigint(20) default NULL COMMENT '父目录',
  `depLevel` int(11) NOT NULL COMMENT '目录层',
  `path` varchar(256) default NULL,
  `isPublic` smallint(6) NOT NULL COMMENT '1=表示共享，则所有的员工均可以使用该文件夹\r\n            0=私人文件夹',
  `folderType` smallint(6) NOT NULL COMMENT '文件夹类型\r\n            1=收信箱\r\n            2=发信箱\r\n            3=草稿箱\r\n            4=删除箱\r\n            10=其他',
  PRIMARY KEY  (`folderId`),
  KEY `FK_FD_R_AU` (`userId`),
  CONSTRAINT `FK_FD_R_AU` FOREIGN KEY (`userId`) REFERENCES `app_user` (`userId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `mail_folder`
--

/*!40000 ALTER TABLE `mail_folder` DISABLE KEYS */;
INSERT INTO `mail_folder` (`folderId`,`userId`,`folderName`,`parentId`,`depLevel`,`path`,`isPublic`,`folderType`) VALUES 
 (1,NULL,'收件箱',0,1,'0.1.',1,1),
 (2,NULL,'发件箱',0,1,'0.2.',1,2),
 (3,NULL,'草稿箱',0,1,'0.3.',1,3),
 (4,NULL,'垃圾箱',0,1,'0.4.',1,4);
/*!40000 ALTER TABLE `mail_folder` ENABLE KEYS */;


--
-- Definition of table `news`
--

DROP TABLE IF EXISTS `news`;
CREATE TABLE `news` (
  `newsId` bigint(20) NOT NULL auto_increment COMMENT 'ID',
  `typeId` bigint(20) NOT NULL COMMENT '类别ID',
  `subjectIcon` varchar(128) default NULL COMMENT '新闻图标',
  `subject` varchar(128) NOT NULL COMMENT '新闻标题',
  `author` varchar(32) NOT NULL COMMENT '作者',
  `createtime` datetime NOT NULL COMMENT '创建时间',
  `replyCounts` int(11) default '0' COMMENT '回复次数',
  `viewCounts` int(11) default '0' COMMENT '浏览数',
  `content` text NOT NULL COMMENT '内容',
  `updateTime` datetime NOT NULL COMMENT '修改时间',
  `status` smallint(6) NOT NULL COMMENT '状态',
  PRIMARY KEY  (`newsId`),
  KEY `FK_NS_R_NT` (`typeId`),
  CONSTRAINT `FK_NS_R_NT` FOREIGN KEY (`typeId`) REFERENCES `news_type` (`typeId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='新闻';

--
-- Dumping data for table `news`
--

/*!40000 ALTER TABLE `news` DISABLE KEYS */;
INSERT INTO `news` (`newsId`,`typeId`,`subjectIcon`,`subject`,`author`,`createtime`,`replyCounts`,`viewCounts`,`content`,`updateTime`,`status`) VALUES 
 (1,2,'','测试新闻','李迅宇','2009-11-03 14:13:07',0,0,'​新版本发布,测试新闻','2009-11-03 14:13:07',1);
/*!40000 ALTER TABLE `news` ENABLE KEYS */;


--
-- Definition of table `news_type`
--

DROP TABLE IF EXISTS `news_type`;
CREATE TABLE `news_type` (
  `typeId` bigint(11) NOT NULL auto_increment,
  `typeName` varchar(256) NOT NULL,
  `sn` smallint(11) NOT NULL default '0',
  PRIMARY KEY  (`typeId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `news_type`
--

/*!40000 ALTER TABLE `news_type` DISABLE KEYS */;
INSERT INTO `news_type` (`typeId`,`typeName`,`sn`) VALUES 
 (1,'公司新闻',1),
 (2,'项目新闻',2);
/*!40000 ALTER TABLE `news_type` ENABLE KEYS */;


--
-- Definition of table `newstype`
--

DROP TABLE IF EXISTS `newstype`;
CREATE TABLE `newstype` (
  `typeId` bigint(20) NOT NULL auto_increment,
  `typeName` varchar(128) NOT NULL,
  `sn` int(11) NOT NULL,
  PRIMARY KEY  (`typeId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='新闻类型';

--
-- Dumping data for table `newstype`
--

/*!40000 ALTER TABLE `newstype` DISABLE KEYS */;
/*!40000 ALTER TABLE `newstype` ENABLE KEYS */;


--
-- Definition of table `notice`
--

DROP TABLE IF EXISTS `notice`;
CREATE TABLE `notice` (
  `noticeId` bigint(20) NOT NULL auto_increment,
  `postName` varchar(128) collate utf8_unicode_ci NOT NULL,
  `noticeTitle` varchar(128) collate utf8_unicode_ci NOT NULL,
  `noticeContent` varchar(1024) collate utf8_unicode_ci default NULL,
  `effectiveDate` date default NULL,
  `expirationDate` date default NULL,
  `state` smallint(1) default NULL,
  PRIMARY KEY  (`noticeId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `notice`
--

/*!40000 ALTER TABLE `notice` DISABLE KEYS */;
INSERT INTO `notice` (`noticeId`,`postName`,`noticeTitle`,`noticeContent`,`effectiveDate`,`expirationDate`,`state`) VALUES 
 (1,'mansan','JOffice发布了','​公司内部的系统发布第一个修正版本，现于公司内部试运行','2009-11-01','2009-12-05',1),
 (2,'李迅宇','关于个人照片的规格','上传​个人照片规格为:230X378,或者按此比例才会正常显示图片.','2009-11-02','2009-11-30',1);
/*!40000 ALTER TABLE `notice` ENABLE KEYS */;


--
-- Definition of table `office_goods`
--

DROP TABLE IF EXISTS `office_goods`;
CREATE TABLE `office_goods` (
  `goodsId` bigint(20) NOT NULL auto_increment,
  `typeId` bigint(20) NOT NULL COMMENT '所属分类',
  `goodsName` varchar(128) NOT NULL COMMENT '物品名称',
  `goodsNo` varchar(128) NOT NULL COMMENT '编号',
  `specifications` varchar(256) NOT NULL COMMENT '规格',
  `unit` varchar(64) NOT NULL COMMENT '计量单位',
  `isWarning` smallint(6) NOT NULL COMMENT '是否启用库存警示',
  `notes` varchar(500) default NULL COMMENT '备注',
  `stockCounts` int(11) NOT NULL COMMENT '库存总数',
  `warnCounts` int(11) NOT NULL COMMENT '最低库存数',
  PRIMARY KEY  (`goodsId`),
  KEY `FK_OG_R_OGT` (`typeId`),
  CONSTRAINT `FK_OG_R_OGT` FOREIGN KEY (`typeId`) REFERENCES `office_goods_type` (`typeId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='办公用品';

--
-- Dumping data for table `office_goods`
--

/*!40000 ALTER TABLE `office_goods` DISABLE KEYS */;
/*!40000 ALTER TABLE `office_goods` ENABLE KEYS */;


--
-- Definition of table `office_goods_type`
--

DROP TABLE IF EXISTS `office_goods_type`;
CREATE TABLE `office_goods_type` (
  `typeId` bigint(20) NOT NULL auto_increment,
  `typeName` varchar(128) NOT NULL COMMENT '分类名称',
  PRIMARY KEY  (`typeId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='办公用品类型';

--
-- Dumping data for table `office_goods_type`
--

/*!40000 ALTER TABLE `office_goods_type` DISABLE KEYS */;
/*!40000 ALTER TABLE `office_goods_type` ENABLE KEYS */;


--
-- Definition of table `phone_book`
--

DROP TABLE IF EXISTS `phone_book`;
CREATE TABLE `phone_book` (
  `phoneId` bigint(20) NOT NULL auto_increment,
  `fullname` varchar(128) NOT NULL,
  `title` varchar(32) NOT NULL COMMENT '先生\r\n            女士\r\n            小姐',
  `birthday` datetime default NULL,
  `nickName` varchar(32) default NULL,
  `duty` varchar(50) default NULL,
  `spouse` varchar(32) default NULL,
  `childs` varchar(40) default NULL,
  `companyName` varchar(100) default NULL,
  `companyAddress` varchar(128) default NULL,
  `companyPhone` varchar(32) default NULL,
  `companyFax` varchar(32) default NULL,
  `homeAddress` varchar(128) default NULL,
  `homeZip` varchar(12) default NULL,
  `mobile` varchar(32) default NULL,
  `phone` varchar(32) default NULL,
  `email` varchar(32) default NULL,
  `QQ` varchar(64) default NULL,
  `MSN` varchar(128) default NULL,
  `note` varchar(500) default NULL,
  `userId` bigint(20) NOT NULL,
  `groupId` bigint(20) default NULL,
  `isShared` smallint(6) NOT NULL,
  PRIMARY KEY  (`phoneId`),
  KEY `FK_PB_R_AU` (`userId`),
  KEY `FK_PB_R_PG` (`groupId`),
  CONSTRAINT `FK_PB_R_AU` FOREIGN KEY (`userId`) REFERENCES `app_user` (`userId`),
  CONSTRAINT `FK_PB_R_PG` FOREIGN KEY (`groupId`) REFERENCES `phone_group` (`groupId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='通讯簿';

--
-- Dumping data for table `phone_book`
--

/*!40000 ALTER TABLE `phone_book` DISABLE KEYS */;
INSERT INTO `phone_book` (`phoneId`,`fullname`,`title`,`birthday`,`nickName`,`duty`,`spouse`,`childs`,`companyName`,`companyAddress`,`companyPhone`,`companyFax`,`homeAddress`,`homeZip`,`mobile`,`phone`,`email`,`QQ`,`MSN`,`note`,`userId`,`groupId`,`isShared`) VALUES 
 (1,'李宇','女士','2009-11-07 00:00:00','宇宇','',NULL,NULL,'','','','',NULL,NULL,'13580382795','020-8888888','yangly20@163.com','594731905','yangly20@hotmail.com',NULL,1,1,0),
 (2,'小悦','先生','2009-11-06 00:00:00','小悦',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'','','','','',NULL,1,1,1);
/*!40000 ALTER TABLE `phone_book` ENABLE KEYS */;


--
-- Definition of table `phone_group`
--

DROP TABLE IF EXISTS `phone_group`;
CREATE TABLE `phone_group` (
  `groupId` bigint(20) NOT NULL auto_increment,
  `groupName` varchar(128) NOT NULL COMMENT '分组名称',
  `isShared` smallint(6) NOT NULL COMMENT '1=共享\r\n            0=私有',
  `SN` int(11) NOT NULL,
  `userId` bigint(20) NOT NULL,
  PRIMARY KEY  (`groupId`),
  KEY `FK_PG_R_AU` (`userId`),
  CONSTRAINT `FK_PG_R_AU` FOREIGN KEY (`userId`) REFERENCES `app_user` (`userId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `phone_group`
--

/*!40000 ALTER TABLE `phone_group` DISABLE KEYS */;
INSERT INTO `phone_group` (`groupId`,`groupName`,`isShared`,`SN`,`userId`) VALUES 
 (1,'好友',1,1,1),
 (2,'客户',0,1,3);
/*!40000 ALTER TABLE `phone_group` ENABLE KEYS */;


--
-- Definition of table `plan_attach`
--

DROP TABLE IF EXISTS `plan_attach`;
CREATE TABLE `plan_attach` (
  `fileId` bigint(20) NOT NULL,
  `planId` bigint(20) NOT NULL,
  PRIMARY KEY  (`fileId`,`planId`),
  KEY `FK_PA_R_WP` (`planId`),
  CONSTRAINT `FK_PA_R_FA` FOREIGN KEY (`fileId`) REFERENCES `file_attach` (`fileId`),
  CONSTRAINT `FK_PA_R_WP` FOREIGN KEY (`planId`) REFERENCES `work_plan` (`planId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `plan_attach`
--

/*!40000 ALTER TABLE `plan_attach` DISABLE KEYS */;
/*!40000 ALTER TABLE `plan_attach` ENABLE KEYS */;


--
-- Definition of table `plan_type`
--

DROP TABLE IF EXISTS `plan_type`;
CREATE TABLE `plan_type` (
  `typeId` bigint(20) NOT NULL auto_increment,
  `typeName` varchar(64) default NULL,
  PRIMARY KEY  (`typeId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='计划类型';

--
-- Dumping data for table `plan_type`
--

/*!40000 ALTER TABLE `plan_type` DISABLE KEYS */;
/*!40000 ALTER TABLE `plan_type` ENABLE KEYS */;


--
-- Definition of table `pro_definition`
--

DROP TABLE IF EXISTS `pro_definition`;
CREATE TABLE `pro_definition` (
  `defId` bigint(20) NOT NULL auto_increment,
  `typeId` bigint(20) default NULL COMMENT '分类ID',
  `name` varchar(256) NOT NULL COMMENT '流程的名称',
  `description` varchar(1024) default NULL COMMENT '描述',
  `createtime` datetime default NULL COMMENT '创建时间',
  `deployId` varchar(64) NOT NULL COMMENT 'Jbpm 工作流id',
  `defXml` varchar(4000) default NULL COMMENT '流程定义XML',
  PRIMARY KEY  (`defId`),
  KEY `FK_PD_R_PT` (`typeId`),
  CONSTRAINT `FK_PD_R_PT` FOREIGN KEY (`typeId`) REFERENCES `pro_type` (`typeId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='流程定义';

--
-- Dumping data for table `pro_definition`
--

/*!40000 ALTER TABLE `pro_definition` DISABLE KEYS */;
/*!40000 ALTER TABLE `pro_definition` ENABLE KEYS */;


--
-- Definition of table `pro_type`
--

DROP TABLE IF EXISTS `pro_type`;
CREATE TABLE `pro_type` (
  `typeId` bigint(20) NOT NULL auto_increment COMMENT '类别ID',
  `typeName` varchar(128) NOT NULL COMMENT '分类名称',
  PRIMARY KEY  (`typeId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='流程分类';

--
-- Dumping data for table `pro_type`
--

/*!40000 ALTER TABLE `pro_type` DISABLE KEYS */;
/*!40000 ALTER TABLE `pro_type` ENABLE KEYS */;


--
-- Definition of table `pro_user_assign`
--

DROP TABLE IF EXISTS `pro_user_assign`;
CREATE TABLE `pro_user_assign` (
  `assignId` bigint(20) NOT NULL auto_increment COMMENT '授权ID',
  `deployId` varchar(128) NOT NULL COMMENT 'jbpm流程定义的id',
  `activityName` varchar(128) NOT NULL COMMENT '流程节点名称',
  `roleId` varchar(128) default NULL COMMENT '角色Id',
  `roleName` varchar(256) default NULL,
  `userId` varchar(128) default NULL COMMENT '用户ID',
  `username` varchar(256) default NULL,
  PRIMARY KEY  (`assignId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='流程过程中各个任务节点及启动流程时的角色';

--
-- Dumping data for table `pro_user_assign`
--

/*!40000 ALTER TABLE `pro_user_assign` DISABLE KEYS */;
/*!40000 ALTER TABLE `pro_user_assign` ENABLE KEYS */;


--
-- Definition of table `process_form`
--

DROP TABLE IF EXISTS `process_form`;
CREATE TABLE `process_form` (
  `formId` bigint(20) NOT NULL auto_increment,
  `runId` bigint(20) NOT NULL COMMENT '所属运行流程',
  `activityName` varchar(128) NOT NULL COMMENT '活动或任务名称',
  PRIMARY KEY  (`formId`),
  KEY `FK_PF_R_PR` (`runId`),
  CONSTRAINT `FK_PF_R_PR` FOREIGN KEY (`runId`) REFERENCES `process_run` (`runId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='流程表单\n存储保存在运行中的流程表单数据';

--
-- Dumping data for table `process_form`
--

/*!40000 ALTER TABLE `process_form` DISABLE KEYS */;
/*!40000 ALTER TABLE `process_form` ENABLE KEYS */;


--
-- Definition of table `process_run`
--

DROP TABLE IF EXISTS `process_run`;
CREATE TABLE `process_run` (
  `runId` bigint(20) NOT NULL auto_increment,
  `subject` varchar(256) NOT NULL COMMENT '标题\n            一般为流程名称＋格式化的时间',
  `creator` varchar(128) default NULL COMMENT '创建人',
  `userId` bigint(20) NOT NULL COMMENT '所属用户',
  `defId` bigint(20) NOT NULL COMMENT '所属流程定义',
  `piId` varchar(64) default NULL COMMENT '流程实例ID',
  `createtime` datetime NOT NULL COMMENT '创建时间',
  PRIMARY KEY  (`runId`),
  KEY `FK_PR_R_AU` (`userId`),
  KEY `FK_PR_R_PD` (`defId`),
  CONSTRAINT `FK_PR_R_AU` FOREIGN KEY (`userId`) REFERENCES `app_user` (`userId`),
  CONSTRAINT `FK_PR_R_PD` FOREIGN KEY (`defId`) REFERENCES `pro_definition` (`defId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='运行中的流程';

--
-- Dumping data for table `process_run`
--

/*!40000 ALTER TABLE `process_run` DISABLE KEYS */;
/*!40000 ALTER TABLE `process_run` ENABLE KEYS */;


--
-- Definition of table `project`
--

DROP TABLE IF EXISTS `project`;
CREATE TABLE `project` (
  `projectId` bigint(20) NOT NULL auto_increment,
  `projectName` varchar(128) NOT NULL COMMENT '项目名称',
  `projectNo` varchar(64) NOT NULL COMMENT '项目编号',
  `reqDesc` text COMMENT '需求描述',
  `isContract` smallint(6) NOT NULL COMMENT '是否签订合同',
  `fullname` varchar(32) NOT NULL COMMENT '联系人姓名',
  `mobile` varchar(32) default NULL COMMENT '手机',
  `phone` varchar(32) default NULL COMMENT '电话',
  `fax` varchar(32) default NULL COMMENT '传真',
  `otherContacts` varchar(128) default NULL COMMENT '其他联系方式',
  `customerId` bigint(20) NOT NULL COMMENT '所属客户',
  `userId` bigint(20) NOT NULL COMMENT '业务人员',
  PRIMARY KEY  (`projectId`),
  KEY `FK_PR_R_CS` (`customerId`),
  KEY `FK_PT_R_AU` (`userId`),
  CONSTRAINT `FK_PT_R_AU` FOREIGN KEY (`userId`) REFERENCES `app_user` (`userId`),
  CONSTRAINT `FK_PR_R_CS` FOREIGN KEY (`customerId`) REFERENCES `customer` (`customerId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='项目信息';

--
-- Dumping data for table `project`
--

/*!40000 ALTER TABLE `project` DISABLE KEYS */;
/*!40000 ALTER TABLE `project` ENABLE KEYS */;


--
-- Definition of table `project_file`
--

DROP TABLE IF EXISTS `project_file`;
CREATE TABLE `project_file` (
  `fileId` bigint(20) NOT NULL,
  `projectId` bigint(20) NOT NULL,
  PRIMARY KEY  (`fileId`,`projectId`),
  KEY `FK_PF_R_PT` (`projectId`),
  CONSTRAINT `FK_PF_R_PT` FOREIGN KEY (`projectId`) REFERENCES `project` (`projectId`),
  CONSTRAINT `FK_PF_R_FA` FOREIGN KEY (`fileId`) REFERENCES `file_attach` (`fileId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='项目附件';

--
-- Dumping data for table `project_file`
--

/*!40000 ALTER TABLE `project_file` DISABLE KEYS */;
/*!40000 ALTER TABLE `project_file` ENABLE KEYS */;


--
-- Definition of table `region`
--

DROP TABLE IF EXISTS `region`;
CREATE TABLE `region` (
  `regionId` bigint(20) NOT NULL auto_increment,
  `regionName` varchar(128) NOT NULL COMMENT '地区名称',
  `regionType` smallint(6) NOT NULL COMMENT '地区类型1=省份2=市',
  `parentId` bigint(20) default NULL COMMENT '上级地区',
  PRIMARY KEY  (`regionId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='地区管理';

--
-- Dumping data for table `region`
--

/*!40000 ALTER TABLE `region` DISABLE KEYS */;
INSERT INTO `region` (`regionId`,`regionName`,`regionType`,`parentId`) VALUES 
 (1,'北京',2,0),
 (2,'上海',2,0),
 (3,'天津',2,0),
 (4,'重庆',2,0),
 (5,'河北',1,0),
 (6,'山西',1,0),
 (7,'内蒙古',1,0),
 (8,'辽宁',1,0),
 (9,'吉林',1,0),
 (10,'黑龙江',1,0),
 (11,'江苏',1,0),
 (12,'浙江',1,0),
 (13,'安徽',1,0),
 (14,'福建',1,0),
 (15,'江西',1,0),
 (16,'山东',1,0),
 (17,'河南',1,0),
 (18,'湖北',1,0),
 (19,'湖南',1,0),
 (20,'广东',1,0),
 (21,'广西',1,0),
 (22,'海南',1,0),
 (23,'四川',1,0),
 (24,'贵州',1,0),
 (25,'云南',1,0),
 (26,'西藏',1,0),
 (27,'陕西',1,0),
 (28,'甘肃',1,0),
 (29,'青海',1,0),
 (30,'宁夏',1,0),
 (31,'新疆',1,0),
 (32,'台湾',1,0),
 (33,'港澳',1,0),
 (34,'石家庄',2,5),
 (35,'唐山',2,5),
 (36,'秦皇岛',2,5),
 (37,'邯郸',2,5),
 (38,'邢台',2,5),
 (39,'保定',2,5),
 (40,'张家口',2,5),
 (41,'承德',2,5),
 (42,'沧州',2,5),
 (43,'廊坊',2,5),
 (44,'衡水',2,5),
 (45,'太原',2,6),
 (46,'大同',2,6),
 (47,'阳泉',2,6),
 (48,'长治',2,6),
 (49,'晋城',2,6),
 (50,'朔州',2,6),
 (51,'晋中',2,6),
 (52,'运城',2,6),
 (53,'忻州',2,6),
 (54,'临汾',2,6),
 (55,'吕梁',2,6),
 (56,'呼和浩特',2,7),
 (57,'包头',2,7),
 (58,'乌海',2,7),
 (59,'赤峰',2,7),
 (60,'通辽',2,7),
 (61,'鄂尔多斯',2,7),
 (62,'呼伦贝尔',2,7),
 (63,'巴彦淖尔',2,7),
 (64,'乌兰察布',2,7),
 (65,'兴安',2,7),
 (66,'锡林郭勒',2,7),
 (67,'阿拉善',2,7),
 (68,'沈阳',2,8),
 (69,'大连',2,8),
 (70,'鞍山',2,8),
 (71,'抚顺',2,8),
 (72,'本溪',2,8),
 (73,'丹东',2,8),
 (74,'锦州',2,8),
 (75,'营口',2,8),
 (76,'阜新',2,8),
 (77,'辽阳',2,8),
 (78,'盘锦',2,8),
 (79,'铁岭',2,8),
 (80,'朝阳',2,8),
 (81,'葫芦岛',2,8),
 (82,'长春',2,9),
 (83,'吉林',2,9),
 (84,'四平',2,9),
 (85,'辽源',2,9),
 (86,'通化',2,9),
 (87,'白山',2,9),
 (88,'松原',2,9),
 (89,'白城',2,9),
 (90,'延边',2,9),
 (91,'哈尔滨',2,10),
 (92,'齐齐哈尔',2,10),
 (93,'鸡西',2,10),
 (94,'鹤岗',2,10),
 (95,'双鸭山',2,10),
 (96,'大庆',2,10),
 (97,'伊春',2,10),
 (98,'佳木斯',2,10),
 (99,'七台河',2,10),
 (100,'牡丹江',2,10),
 (101,'黑河',2,10),
 (102,'绥化',2,10),
 (103,'大兴安岭',2,10),
 (104,'南京',2,11),
 (105,'无锡',2,11),
 (106,'徐州',2,11),
 (107,'常州',2,11),
 (108,'苏州',2,11),
 (109,'南通',2,11),
 (110,'连云港',2,11),
 (111,'淮安',2,11),
 (112,'盐城',2,11),
 (113,'扬州',2,11),
 (114,'镇江',2,11),
 (115,'泰州',2,11),
 (116,'宿迁',2,11),
 (117,'杭州',2,12),
 (118,'宁波',2,12),
 (119,'温州',2,12),
 (120,'嘉兴',2,12),
 (121,'湖州',2,12),
 (122,'绍兴',2,12),
 (123,'金华',2,12),
 (124,'衢州',2,12),
 (125,'舟山',2,12),
 (126,'台州',2,12),
 (127,'丽水',2,12),
 (128,'合肥',2,13),
 (129,'芜湖',2,13),
 (130,'蚌埠',2,13),
 (131,'淮南',2,13),
 (132,'马鞍山',2,13),
 (133,'淮北',2,13),
 (134,'铜陵',2,13),
 (135,'安庆',2,13),
 (136,'黄山',2,13),
 (137,'滁州',2,13),
 (138,'阜阳',2,13),
 (139,'宿州',2,13),
 (140,'巢湖',2,13),
 (141,'六安',2,13),
 (142,'亳州',2,13),
 (143,'池州',2,13),
 (144,'宣城',2,13),
 (145,'福州',2,14),
 (146,'厦门',2,14),
 (147,'莆田',2,14),
 (148,'三明',2,14),
 (149,'泉州',2,14),
 (150,'漳州',2,14),
 (151,'南平',2,14),
 (152,'龙岩',2,14),
 (153,'宁德',2,14),
 (154,'南昌',2,15),
 (155,'景德镇',2,15),
 (156,'萍乡',2,15),
 (157,'九江',2,15),
 (158,'新余',2,15),
 (159,'鹰潭',2,15),
 (160,'赣州',2,15),
 (161,'吉安',2,15),
 (162,'宜春',2,15),
 (163,'抚州',2,15),
 (164,'上饶',2,15),
 (165,'济南',2,16),
 (166,'青岛',2,16),
 (167,'淄博',2,16),
 (168,'枣庄',2,16),
 (169,'东营',2,16),
 (170,'烟台',2,16),
 (171,'潍坊',2,16),
 (172,'济宁',2,16),
 (173,'泰安',2,16),
 (174,'日照',2,16),
 (175,'莱芜',2,16),
 (176,'临沂',2,16),
 (177,'德州',2,16),
 (178,'聊城',2,16),
 (179,'滨州',2,16),
 (180,'菏泽',2,16),
 (181,'郑州',2,17),
 (182,'开封',2,17),
 (183,'洛阳',2,17),
 (184,'平顶山',2,17),
 (185,'焦作',2,17),
 (186,'鹤壁',2,17),
 (187,'新乡',2,17),
 (188,'安阳',2,17),
 (189,'濮阳',2,17),
 (190,'许昌',2,17),
 (191,'渭河',2,17),
 (192,'三门峡',2,17),
 (193,'南阳',2,17),
 (194,'商丘',2,17),
 (195,'信阳',2,17),
 (196,'周口',2,17),
 (197,'驻马店',2,17),
 (198,'武汉',2,18),
 (199,'黄石',2,18),
 (200,'襄樊',2,18),
 (201,'十堰',2,18),
 (202,'荆州',2,18),
 (203,'宜昌',2,18),
 (204,'荆门',2,18),
 (205,'鄂州',2,18),
 (206,'孝感',2,18),
 (207,'黄冈',2,18),
 (208,'咸宁',2,18),
 (209,'随州',2,18),
 (210,'恩施',2,18),
 (211,'长沙',2,19),
 (212,'株洲',2,19),
 (213,'湘潭',2,19),
 (214,'衡阳',2,19),
 (215,'邵阳',2,19),
 (216,'岳阳',2,19),
 (217,'常德',2,19),
 (218,'张家界',2,19),
 (219,'溢阳',2,19),
 (220,'郴州',2,19),
 (221,'永州',2,19),
 (222,'怀化',2,19),
 (223,'娄底',2,19),
 (224,'湘西',2,19),
 (225,'广州',2,20),
 (226,'深圳',2,20),
 (227,'珠海',2,20),
 (228,'汕头',2,20),
 (229,'韶关',2,20),
 (230,'佛山',2,20),
 (231,'江门',2,20),
 (232,'湛江',2,20),
 (233,'茂名',2,20),
 (234,'肇庆',2,20),
 (235,'惠州',2,20),
 (236,'梅州',2,20),
 (237,'汕尾',2,20),
 (238,'河源',2,20),
 (239,'阳江',2,20),
 (240,'清远',2,20),
 (241,'东莞',2,20),
 (242,'中山',2,20),
 (243,'潮州',2,20),
 (244,'揭阳',2,20),
 (245,'云浮',2,20),
 (246,'南宁',2,21),
 (247,'柳州',2,21),
 (248,'桂林',2,21),
 (249,'梧州',2,21),
 (250,'北海',2,21),
 (251,'防城港',2,21),
 (252,'钦州',2,21),
 (253,'贵港',2,21),
 (254,'玉林',2,21),
 (255,'百色',2,21),
 (256,'贺州',2,21),
 (257,'河池',2,21),
 (258,'来宾',2,21),
 (259,'崇左',2,21),
 (260,'白沙黎族自治县',2,22),
 (261,'西沙群岛',2,22),
 (262,'儋州',2,22),
 (263,'屯昌县',2,22),
 (264,'安定县',2,22),
 (265,'琼中黎族苗族自治县',2,22),
 (266,'昌江黎族自治县',2,22),
 (267,'东方',2,22),
 (268,'三亚',2,22),
 (269,'中沙群岛的岛礁及其海域',2,22),
 (270,'琼海',2,22),
 (271,'澄迈县',2,22),
 (272,'五指山',2,22),
 (273,'海口',2,22),
 (274,'文昌',2,22),
 (275,'陵水黎族自治县',2,22),
 (276,'保亭黎族苗族自治县',2,22),
 (277,'南沙群岛',2,22),
 (278,'乐东黎族自治县',2,22),
 (279,'临高县',2,22),
 (280,'万宁',2,22),
 (281,'成都',2,23),
 (282,'自贡',2,23),
 (283,'攀枝花',2,23),
 (284,'泸州',2,23),
 (285,'德阳',2,23),
 (286,'绵阳',2,23),
 (287,'广元',2,23),
 (288,'遂宁',2,23),
 (289,'内江',2,23),
 (290,'乐山',2,23),
 (291,'南充',2,23),
 (292,'宜宾',2,23),
 (293,'广安',2,23),
 (294,'达州',2,23),
 (295,'眉山',2,23),
 (296,'雅安',2,23),
 (297,'巴中',2,23),
 (298,'资阳',2,23),
 (299,'阿坝',2,23),
 (300,'甘孜',2,23),
 (301,'凉山',2,23),
 (302,'贵阳',2,24),
 (303,'六盘水',2,24),
 (304,'遵义',2,24),
 (305,'安顺',2,24),
 (306,'铜仁',2,24),
 (307,'毕节',2,24),
 (308,'黔西南',2,24),
 (309,'黔东南',2,24),
 (310,'黔南',2,24),
 (311,'昆明',2,25),
 (312,'曲靖',2,25),
 (313,'玉溪',2,25),
 (314,'保山',2,25),
 (315,'昭通',2,25),
 (316,'丽江',2,25),
 (317,'普洱',2,25),
 (318,'临沧',2,25),
 (319,'文山',2,25),
 (320,'红河',2,25),
 (321,'西双版纳',2,25),
 (322,'楚雄',2,25),
 (323,'大理',2,25),
 (324,'德宏',2,25),
 (325,'怒江',2,25),
 (326,'迪庆',2,25),
 (327,'拉萨',2,26),
 (328,'昌都',2,26),
 (329,'山南',2,26),
 (330,'日喀则',2,26),
 (331,'那曲',2,26),
 (332,'阿里',2,26),
 (333,'林芝',2,26),
 (334,'西安',2,27),
 (335,'铜川',2,27),
 (336,'宝鸡',2,27),
 (337,'咸阳',2,27),
 (338,'渭南',2,27),
 (339,'延安',2,27),
 (340,'汉中',2,27),
 (341,'榆林',2,27),
 (342,'安康',2,27),
 (343,'商洛',2,27),
 (344,'兰州',2,28),
 (345,'嘉峪关',2,28),
 (346,'金昌',2,28),
 (347,'白银',2,28),
 (348,'天水',2,28),
 (349,'武威',2,28),
 (350,'张掖',2,28),
 (351,'平凉',2,28),
 (352,'酒泉',2,28),
 (353,'庆阳',2,28),
 (354,'定西',2,28),
 (355,'陇南',2,28),
 (356,'临夏',2,28),
 (357,'甘南',2,28),
 (358,'西宁',2,29),
 (359,'海东',2,29),
 (360,'海北',2,29),
 (361,'黄南',2,29),
 (362,'海南',2,29),
 (363,'果洛',2,29),
 (364,'玉树',2,29),
 (365,'海西',2,29),
 (366,'银川',2,30),
 (367,'石嘴山',2,30),
 (368,'吴忠',2,30),
 (369,'固原',2,30),
 (370,'中卫',2,30),
 (371,'乌鲁木齐',2,31),
 (372,'克拉玛依',2,31),
 (373,'吐鲁番',2,31),
 (374,'哈密',2,31),
 (375,'和田',2,31),
 (376,'阿克苏',2,31),
 (377,'喀什',2,31),
 (378,'克孜勒苏柯尔克孜',2,31),
 (379,'巴音郭楞蒙古',2,31),
 (380,'昌吉',2,31),
 (381,'博尔塔拉蒙古',2,31),
 (382,'伊犁哈萨克',2,31),
 (383,'塔城',2,31),
 (384,'阿勒泰',2,31),
 (385,'台北',2,32),
 (386,'高雄',2,32),
 (387,'基隆',2,32),
 (388,'台中',2,32),
 (389,'台南',2,32),
 (390,'新竹',2,32),
 (391,'香港',2,33),
 (392,'澳门',2,33);
/*!40000 ALTER TABLE `region` ENABLE KEYS */;


--
-- Definition of table `report_template`
--

DROP TABLE IF EXISTS `report_template`;
CREATE TABLE `report_template` (
  `reportId` bigint(20) NOT NULL auto_increment,
  `title` varchar(128) NOT NULL COMMENT '标题',
  `descp` varchar(500) NOT NULL COMMENT '描述',
  `reportLocation` varchar(128) NOT NULL COMMENT '报表模块的jasper文件的路径',
  `queryLocation` varchar(128) default NULL COMMENT '报表查询条件模块路径',
  `createtime` datetime NOT NULL COMMENT '创建时间',
  `updatetime` datetime NOT NULL COMMENT '修改时间',
  PRIMARY KEY  (`reportId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='报表模板\r\nreport_template';

--
-- Dumping data for table `report_template`
--

/*!40000 ALTER TABLE `report_template` DISABLE KEYS */;
/*!40000 ALTER TABLE `report_template` ENABLE KEYS */;


--
-- Definition of table `short_message`
--

DROP TABLE IF EXISTS `short_message`;
CREATE TABLE `short_message` (
  `messageId` bigint(20) NOT NULL auto_increment,
  `content` varchar(256) NOT NULL,
  `senderId` bigint(20) NOT NULL,
  `sender` varchar(64) NOT NULL,
  `msgType` smallint(6) NOT NULL COMMENT '1=个人信息\r\n            2=日程安排\r\n            3=计划任务\r\n            ',
  `sendTime` datetime NOT NULL,
  PRIMARY KEY  (`messageId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='短信消息';

--
-- Dumping data for table `short_message`
--

/*!40000 ALTER TABLE `short_message` DISABLE KEYS */;
INSERT INTO `short_message` (`messageId`,`content`,`senderId`,`sender`,`msgType`,`sendTime`) VALUES 
 (1,'测试一下',4,'骆运阳',1,'2009-11-02 17:55:57'),
 (2,'测试2',2,'李迅宇',1,'2009-11-02 17:56:21'),
 (3,'测试2',4,'骆运阳',1,'2009-11-02 17:56:49'),
 (4,'测试2',2,'李迅宇',1,'2009-11-02 17:57:16'),
 (5,'测试2',4,'骆运阳',1,'2009-11-02 17:57:46'),
 (6,'OA系统现在开始测试啦',5,'陈尚轩',1,'2009-11-02 18:37:34'),
 (7,'test',5,'陈尚轩',1,'2009-11-02 18:38:27'),
 (8,'信息模块已经修改完成，请测试',4,'骆运阳',1,'2009-11-03 13:38:05'),
 (9,'测试1',4,'骆运阳',1,'2009-11-03 14:13:51'),
 (10,'测试2',4,'骆运阳',1,'2009-11-03 14:14:22');
/*!40000 ALTER TABLE `short_message` ENABLE KEYS */;


--
-- Definition of table `user_role`
--

DROP TABLE IF EXISTS `user_role`;
CREATE TABLE `user_role` (
  `userId` bigint(20) NOT NULL COMMENT '主键',
  `roleId` bigint(20) NOT NULL,
  PRIMARY KEY  (`userId`,`roleId`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `user_role`
--

/*!40000 ALTER TABLE `user_role` DISABLE KEYS */;
INSERT INTO `user_role` (`userId`,`roleId`) VALUES 
 (5,1);
/*!40000 ALTER TABLE `user_role` ENABLE KEYS */;


--
-- Definition of table `work_plan`
--

DROP TABLE IF EXISTS `work_plan`;
CREATE TABLE `work_plan` (
  `planId` bigint(20) NOT NULL auto_increment,
  `planName` varchar(128) NOT NULL,
  `planContent` varchar(5000) default NULL,
  `startTime` date NOT NULL,
  `endTime` date NOT NULL,
  `typeId` bigint(20) NOT NULL,
  `userId` bigint(20) default NULL COMMENT '主键',
  `issueScope` varchar(2000) default NULL COMMENT '0则代表全部部门\n            存放所有的参与部门ID\n            ',
  `participants` varchar(2000) default NULL COMMENT '0则代表全部参与\n            参与人,即员工ID列表',
  `principal` varchar(256) NOT NULL,
  `note` varchar(500) default NULL,
  `status` smallint(6) NOT NULL COMMENT '1=激活\n            0=禁用',
  `isPersonal` smallint(6) NOT NULL COMMENT '是否为个人计划\n            1=则为个人工作计划，这时发布范围，参与人均为空，负责人为当前用户\n            0=则代表为其他任务',
  `icon` varchar(128) default NULL COMMENT '图标\r\n',
  PRIMARY KEY  (`planId`),
  KEY `FK_WP_R_AU` (`userId`),
  KEY `FK_WP_R_PT` (`typeId`),
  CONSTRAINT `FK_WP_R_AU` FOREIGN KEY (`userId`) REFERENCES `app_user` (`userId`),
  CONSTRAINT `FK_WP_R_PT` FOREIGN KEY (`typeId`) REFERENCES `plan_type` (`typeId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='工作计划';

--
-- Dumping data for table `work_plan`
--

/*!40000 ALTER TABLE `work_plan` DISABLE KEYS */;
/*!40000 ALTER TABLE `work_plan` ENABLE KEYS */;




/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
