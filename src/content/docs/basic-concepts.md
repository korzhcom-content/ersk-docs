---
title: Basic Concepts
slug: basic-concepts
sidebar:
  order: 100
---

EasyReport Starter Kit introduces the following concepts:

* **Team**    
One company or organization. If you have a single-tenant configuration you have only one team in your database and this entity is not used (almost). 
For a multi-tenancy configuration we have many teams which share one application and all its resources (database, cache, etc). Each tenant’s (team's) data is isolated and remains invisible to other tenants.

* **User**    
A user is a person who can access the application and utilize its services. Each account belongs to some team and can only access the resources (connections, reports, etc) within this team. This entity is represented by `ApplicationUser` class.
