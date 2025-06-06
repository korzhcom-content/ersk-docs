---
title: Solution structure
slug: solution-structure
sidebar:
  order: 100
---

As we stated before the ERSK solution architecture is based on the principles described in [Architecting Modern Web Applications with ASP.NET Core and Azure](https://docs.microsoft.com/en-us/dotnet/architecture/modern-web-apps-azure/) ebook published by Microsoft.

## Root folder

On the root solution folder you will find the solution file (`ERS.Azure.sln`), some auxiliary files and 2 main sub folders `src/` and `tests/`.  Obviously `src/` folder contains all solution projects and JS code while `tests/` contains all testing projects.

Now let's dive into `src/` folder:

## src/Common

All common code (extension functions, helpers, etc) which do not depend on the project and can be used in other solutions as well.

## src/Core

The core part of the solution. Contains domain classes and, main interfaces for data access and other infrastructure tasks as well as business logic services which depend on those interfaces.

If in short, Core part is modified only upon some business requests to your application. It does not depend on a concrete data access library or an implementation of email service (for example).

## src/Infrastructure

Contains data access classes (based on Entity Framework Core in our case), implementations of the interfaces defined in the Core part.

## src/Presenation

This folder contains the presentation part - the ASP.NET Core MVC web project (ERS.WebApp) and client-side scripts. We also moved all main views and controller to the separate Razor UI library project (ERS.RazorUI) to make it possible to share them with other presentation project(s) (should you decide to create one).
