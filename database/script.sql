USE [master]
GO
/****** Object:  Database [Tigerspike.LandmarkRemark]    Script Date: 12/16/2019 7:25:39 AM ******/
CREATE DATABASE [Tigerspike.LandmarkRemark]
 CONTAINMENT = NONE
 ON  PRIMARY 
( NAME = N'Tigerspike.LandmarkRemark', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL14.MSSQLSERVER\MSSQL\DATA\Tigerspike.LandmarkRemark.mdf' , SIZE = 8192KB , MAXSIZE = UNLIMITED, FILEGROWTH = 65536KB )
 LOG ON 
( NAME = N'Tigerspike.LandmarkRemark_log', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL14.MSSQLSERVER\MSSQL\DATA\Tigerspike.LandmarkRemark_log.ldf' , SIZE = 8192KB , MAXSIZE = 2048GB , FILEGROWTH = 65536KB )
GO
ALTER DATABASE [Tigerspike.LandmarkRemark] SET COMPATIBILITY_LEVEL = 140
GO
IF (1 = FULLTEXTSERVICEPROPERTY('IsFullTextInstalled'))
begin
EXEC [Tigerspike.LandmarkRemark].[dbo].[sp_fulltext_database] @action = 'enable'
end
GO
ALTER DATABASE [Tigerspike.LandmarkRemark] SET ANSI_NULL_DEFAULT OFF 
GO
ALTER DATABASE [Tigerspike.LandmarkRemark] SET ANSI_NULLS OFF 
GO
ALTER DATABASE [Tigerspike.LandmarkRemark] SET ANSI_PADDING OFF 
GO
ALTER DATABASE [Tigerspike.LandmarkRemark] SET ANSI_WARNINGS OFF 
GO
ALTER DATABASE [Tigerspike.LandmarkRemark] SET ARITHABORT OFF 
GO
ALTER DATABASE [Tigerspike.LandmarkRemark] SET AUTO_CLOSE OFF 
GO
ALTER DATABASE [Tigerspike.LandmarkRemark] SET AUTO_SHRINK OFF 
GO
ALTER DATABASE [Tigerspike.LandmarkRemark] SET AUTO_UPDATE_STATISTICS ON 
GO
ALTER DATABASE [Tigerspike.LandmarkRemark] SET CURSOR_CLOSE_ON_COMMIT OFF 
GO
ALTER DATABASE [Tigerspike.LandmarkRemark] SET CURSOR_DEFAULT  GLOBAL 
GO
ALTER DATABASE [Tigerspike.LandmarkRemark] SET CONCAT_NULL_YIELDS_NULL OFF 
GO
ALTER DATABASE [Tigerspike.LandmarkRemark] SET NUMERIC_ROUNDABORT OFF 
GO
ALTER DATABASE [Tigerspike.LandmarkRemark] SET QUOTED_IDENTIFIER OFF 
GO
ALTER DATABASE [Tigerspike.LandmarkRemark] SET RECURSIVE_TRIGGERS OFF 
GO
ALTER DATABASE [Tigerspike.LandmarkRemark] SET  DISABLE_BROKER 
GO
ALTER DATABASE [Tigerspike.LandmarkRemark] SET AUTO_UPDATE_STATISTICS_ASYNC OFF 
GO
ALTER DATABASE [Tigerspike.LandmarkRemark] SET DATE_CORRELATION_OPTIMIZATION OFF 
GO
ALTER DATABASE [Tigerspike.LandmarkRemark] SET TRUSTWORTHY OFF 
GO
ALTER DATABASE [Tigerspike.LandmarkRemark] SET ALLOW_SNAPSHOT_ISOLATION OFF 
GO
ALTER DATABASE [Tigerspike.LandmarkRemark] SET PARAMETERIZATION SIMPLE 
GO
ALTER DATABASE [Tigerspike.LandmarkRemark] SET READ_COMMITTED_SNAPSHOT OFF 
GO
ALTER DATABASE [Tigerspike.LandmarkRemark] SET HONOR_BROKER_PRIORITY OFF 
GO
ALTER DATABASE [Tigerspike.LandmarkRemark] SET RECOVERY FULL 
GO
ALTER DATABASE [Tigerspike.LandmarkRemark] SET  MULTI_USER 
GO
ALTER DATABASE [Tigerspike.LandmarkRemark] SET PAGE_VERIFY CHECKSUM  
GO
ALTER DATABASE [Tigerspike.LandmarkRemark] SET DB_CHAINING OFF 
GO
ALTER DATABASE [Tigerspike.LandmarkRemark] SET FILESTREAM( NON_TRANSACTED_ACCESS = OFF ) 
GO
ALTER DATABASE [Tigerspike.LandmarkRemark] SET TARGET_RECOVERY_TIME = 60 SECONDS 
GO
ALTER DATABASE [Tigerspike.LandmarkRemark] SET DELAYED_DURABILITY = DISABLED 
GO
EXEC sys.sp_db_vardecimal_storage_format N'Tigerspike.LandmarkRemark', N'ON'
GO
ALTER DATABASE [Tigerspike.LandmarkRemark] SET QUERY_STORE = OFF
GO
USE [Tigerspike.LandmarkRemark]
GO
ALTER DATABASE SCOPED CONFIGURATION SET IDENTITY_CACHE = ON;
GO
ALTER DATABASE SCOPED CONFIGURATION SET LEGACY_CARDINALITY_ESTIMATION = OFF;
GO
ALTER DATABASE SCOPED CONFIGURATION FOR SECONDARY SET LEGACY_CARDINALITY_ESTIMATION = PRIMARY;
GO
ALTER DATABASE SCOPED CONFIGURATION SET MAXDOP = 0;
GO
ALTER DATABASE SCOPED CONFIGURATION FOR SECONDARY SET MAXDOP = PRIMARY;
GO
ALTER DATABASE SCOPED CONFIGURATION SET PARAMETER_SNIFFING = ON;
GO
ALTER DATABASE SCOPED CONFIGURATION FOR SECONDARY SET PARAMETER_SNIFFING = PRIMARY;
GO
ALTER DATABASE SCOPED CONFIGURATION SET QUERY_OPTIMIZER_HOTFIXES = OFF;
GO
ALTER DATABASE SCOPED CONFIGURATION FOR SECONDARY SET QUERY_OPTIMIZER_HOTFIXES = PRIMARY;
GO
USE [Tigerspike.LandmarkRemark]
GO
/****** Object:  Table [dbo].[__EFMigrationsHistory]    Script Date: 12/16/2019 7:25:39 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[__EFMigrationsHistory](
	[MigrationId] [nvarchar](150) NOT NULL,
	[ProductVersion] [nvarchar](32) NOT NULL,
 CONSTRAINT [PK___EFMigrationsHistory] PRIMARY KEY CLUSTERED 
(
	[MigrationId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Notes]    Script Date: 12/16/2019 7:25:39 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Notes](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Created] [datetime2](7) NOT NULL,
	[Modified] [datetime2](7) NOT NULL,
	[OwnerId] [int] NULL,
	[Body] [nvarchar](max) NULL,
	[Location] [geography] NULL,
 CONSTRAINT [PK_Notes] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Users]    Script Date: 12/16/2019 7:25:39 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Users](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Created] [datetime2](7) NOT NULL,
	[Modified] [datetime2](7) NOT NULL,
	[Username] [nvarchar](450) NOT NULL,
	[Email] [nvarchar](450) NOT NULL,
	[Password] [nvarchar](max) NOT NULL,
	[Firstname] [nvarchar](max) NULL,
	[Lastname] [nvarchar](max) NULL,
 CONSTRAINT [PK_Users] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
INSERT [dbo].[__EFMigrationsHistory] ([MigrationId], [ProductVersion]) VALUES (N'20191209121719_Initial', N'3.1.0')
SET IDENTITY_INSERT [dbo].[Notes] ON 

INSERT [dbo].[Notes] ([Id], [Created], [Modified], [OwnerId], [Body], [Location]) VALUES (1015, CAST(N'2019-12-15T00:09:41.3084206' AS DateTime2), CAST(N'0001-01-01T00:00:00.0000000' AS DateTime2), 3, N'P', 0xE6100000010C0461E126CCE840C0F8D18BF7FFDF6240)
INSERT [dbo].[Notes] ([Id], [Created], [Modified], [OwnerId], [Body], [Location]) VALUES (1016, CAST(N'2019-12-15T00:09:51.0321098' AS DateTime2), CAST(N'0001-01-01T00:00:00.0000000' AS DateTime2), 3, N'B', 0xE6100000010CAA7D53AB20F640C0F8D18B7724E16240)
INSERT [dbo].[Notes] ([Id], [Created], [Modified], [OwnerId], [Body], [Location]) VALUES (1017, CAST(N'2019-12-15T00:09:58.6659511' AS DateTime2), CAST(N'0001-01-01T00:00:00.0000000' AS DateTime2), 3, N'C', 0xE6100000010C28BC73B702DD40C0F8D18B3792E06240)
INSERT [dbo].[Notes] ([Id], [Created], [Modified], [OwnerId], [Body], [Location]) VALUES (1019, CAST(N'2019-12-15T19:10:18.7062186' AS DateTime2), CAST(N'0001-01-01T00:00:00.0000000' AS DateTime2), 1003, N'M', 0xE6100000010C312EEC2BBAD640C01C1F7874BFE96240)
INSERT [dbo].[Notes] ([Id], [Created], [Modified], [OwnerId], [Body], [Location]) VALUES (1020, CAST(N'2019-12-15T19:21:39.6095565' AS DateTime2), CAST(N'0001-01-01T00:00:00.0000000' AS DateTime2), 1004, N'L', 0xE6100000010C8ADBEC9BDCF640C01C1F78F487DD6240)
SET IDENTITY_INSERT [dbo].[Notes] OFF
SET IDENTITY_INSERT [dbo].[Users] ON 

INSERT [dbo].[Users] ([Id], [Created], [Modified], [Username], [Email], [Password], [Firstname], [Lastname]) VALUES (3, CAST(N'2019-12-10T10:17:44.7131796' AS DateTime2), CAST(N'2019-12-15T18:59:45.4482533' AS DateTime2), N'user2', N'user2@email.com', N'123', N'Ali', N'Kokabi')
INSERT [dbo].[Users] ([Id], [Created], [Modified], [Username], [Email], [Password], [Firstname], [Lastname]) VALUES (1003, CAST(N'2019-12-15T12:13:40.4351539' AS DateTime2), CAST(N'2019-12-15T12:14:37.6313485' AS DateTime2), N'user', N'user@email.com', N'123', N'Mohsen', N'Kokabi')
INSERT [dbo].[Users] ([Id], [Created], [Modified], [Username], [Email], [Password], [Firstname], [Lastname]) VALUES (1004, CAST(N'2019-12-15T19:18:35.0835545' AS DateTime2), CAST(N'2019-12-15T19:19:50.8820877' AS DateTime2), N'Daniel', N'user3@email.com', N'123', N'Daniel', N'Kokabi')
SET IDENTITY_INSERT [dbo].[Users] OFF
/****** Object:  Index [IX_Notes_OwnerId]    Script Date: 12/16/2019 7:25:39 AM ******/
CREATE NONCLUSTERED INDEX [IX_Notes_OwnerId] ON [dbo].[Notes]
(
	[OwnerId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
GO
SET ANSI_PADDING ON
GO
/****** Object:  Index [IX_Users_Email]    Script Date: 12/16/2019 7:25:39 AM ******/
CREATE UNIQUE NONCLUSTERED INDEX [IX_Users_Email] ON [dbo].[Users]
(
	[Email] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
GO
SET ANSI_PADDING ON
GO
/****** Object:  Index [IX_Users_Username]    Script Date: 12/16/2019 7:25:39 AM ******/
CREATE UNIQUE NONCLUSTERED INDEX [IX_Users_Username] ON [dbo].[Users]
(
	[Username] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
GO
ALTER TABLE [dbo].[Notes]  WITH CHECK ADD  CONSTRAINT [FK_Notes_Users_OwnerId] FOREIGN KEY([OwnerId])
REFERENCES [dbo].[Users] ([Id])
GO
ALTER TABLE [dbo].[Notes] CHECK CONSTRAINT [FK_Notes_Users_OwnerId]
GO
USE [master]
GO
ALTER DATABASE [Tigerspike.LandmarkRemark] SET  READ_WRITE 
GO
