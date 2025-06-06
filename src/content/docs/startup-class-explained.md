---
title: Startup class explained
slug: startup-class-explained
sidebar:
  order: 100
---

Here we are going to describe the content of the Startup class (Statup.cs module) - all services and middlewares set up there.

Any Startup class in ASP.NET Core application includes 3 main parts:

* The constructor    

* `ConfigureServices` method    
Here we register all necessary services in the Dependency Injection (DI) container, setup configuration and authentication.

* `Configure` method    
This is the place where we setup the middleware pipeline for our project.


Let's take a look closer at any of these functions:

## Startup constructor

As in any other class constructors we initialize here the fields and properties which are used during the object's life-time. In our case these are:

* `Configuration` property that contains all application settings collected from `appsettings.json` file, environment variables and whatever other setting sources we set up for our program

and 
 
*   `Env` property that contains some information about the current hosting environment


Additionally we read the `MultiTenancy` option from the configuration and save it to a static field for easier access in other parts of the application (this options can't be changed after the application start).


## ConfigureServices

As said above, `ConfigureServices` is responsible for registration of different service classes in the DI container. Let's take a look close what we do here

### DbContext(s) intialization

Here we set the connection string for our DbContext (we take it from the configuration). `MigrationsAssembly` call sets our web project as a storage for our data migrations. Our DbContext classes actually belong to another project (ERS.Infrastructure) but we want to tie up our data configuration to our "frontend" project.

The next call is this section (AddDbContexts) is an extension method defined later in this module. It registers "context accessors" and two special contextes which are bound to the currently logged **user** and to the **team** this user belongs. Here "bound" means that the corresponding DbContext built in a such way that every operation will not goes beyound the current team or user respecively. For example, if you try to get the list of reports from `UserBoundDbContext` - it will return you only the reports that belongs to the current user.


### Cookie policy


### Identity (authentication/authorization)


### Session, Distributed Cache and MVC


### EasyQuery services


### Other application services

### Repositories



## Configure

*coming soon...*
