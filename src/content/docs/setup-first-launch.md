---
title: Getting started
slug: setup-first-launch
sidebar:
  order: 100
---

## Getting the solution

* [Download](https://korzh.com/ersk) ZIP archive with ERSK Community sources. If you have a license you can get ERSK Pro source code from the [Client Area](https://korzh.com/account/assets) on Korzh.com web-site 

* Unpack .zip file to a folder on your hard drive.

* Open the solution file (either ERS.Community.sln or ERS.Pro.sln) 

* Set the starting project to `src/Presentation/ERS.WebApp.Community` for Community edition or `src/Presentation/ERS.WebApp.Pro` for ERSK Pro. 
NB: `ERS` in the names  stands for __Easy Report Server__ 

## Configure the settings

As in any ASP.NET Core project the application settings is stored in `appsetting.json` file. There are a few settings that must be set before the first launch:

### Multi-tenancy

By setting `MultiTenancy` to  `true` you can run the application in multi-tenancy mode. __Important!__: this setting can't be changed later without full DB reset. So, choose wisely. Here are the main differences between single tenant and multi-tenant modes:

* __Single tenant mode__     
One team will be created automatically at the first start (together with an admin account for this team). After that, all other users can be added to this team by the administrator. The DB connections and reports will be shared among all team members
In this mode you can also set `AllowGuestAccess` option to `true`. With this option turned on, there will a possibility to login as a guest user that can explore shared reports created by other team members but can't modify them or create their own. 

* __Multi-tenant mode__    
With this mode it's allowed to create as many teams as necessary. Within a team everything works as in a single-tenant mode. Any resources (reports, DB connections, team members) that belong to one team are isolated, so users from other teams can't access  them.


### DB connection

By default, ERSK uses SQLite  database (named `ers-community.db` for Community edition or `ers-pro.db` for ERSK Pro). You can change the connection string for that DB using `ConnetionStrings/EasyReportDB` option. Please note, that you can switch to any type of database supported by .NET. All you need to do, is to change the corresponding settings on `DbContext` setup in `Startup.cs` and in `EasyQueryConfigurator` (for Pro edition only). For example, for SQL Server you will need to change `UseSqlite(...)` calls with `UseSqlServer(...)`

### EasyQuery licenses (Pro edition only)

ERSK Pro uses [EasyQuery library](https://korzh.com/easyquery) for visual query builder and data visualization features. You will get the license for EasyQuery together with the license to EasyReport Starter Kit.  You can get your license key for EasyQuery ASP.NET Core right on your [account page on Korzh.com](https://korzh.com/account) website. After that just set that key to the `EasyQuery/LicenseKey` option in `appsetting.json` file.

## Setting up the database
With ERSK Community you don't need to do anything. The database will be created automatically on the first launch.

As for ERSK Pro,  you will need to create the database and update it to the latest migration before the first launch. 

Open Terminal app (Command Prompt), change the folder to `{ERSK directory}/src/Presentation/ERS.WebApp.Pro` and run the following command there:

```
dotnet ef database update
```

> NB1: To run this command you need [Entity Framework Core CLI tools](https://docs.microsoft.com/en-us/ef/core/miscellaneous/cli/dotnet) to be installed on your computer. 

> NB2: You may ask, why we run `database update` command in `ERS.WebApp.Pro` folder while the DbContext for the solution is defined in the Infrastructure project? This was done on purpose. Using this solution template you can actually create several different web applications using the same Core and Infrastructure part (for example, one classic MVC and one SPA with Angular or React) and may want to set the different databases for each of those applications. So, that's why we moved the migrations to `ERS.WebApp.Pro` project using `MigrationsAssembly(...)` call on DB connection setup in `Startup` class. 

## First launch

So, if everything on the previous steps went well, you can now press that green arrow button in your Visual Studio and ERS web application will be opened in a browser window. Please note, the first start might take some time because of some DB initialization procedures.
