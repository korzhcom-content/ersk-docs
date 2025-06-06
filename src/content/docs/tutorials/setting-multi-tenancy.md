---
title: Setting up multi tenancy
slug: tutorials/setting-multi-tenancy
sidebar:
  order: 100
---

Registration in Aistant is easy and requires a few simple steps:

## 1. Registering an account and a team

By clicking  **Get Started** button on the main page you will be presented with a simple registration form. 

![2-sign-in-2](https://files.aistant.com/docs/images/2-sign-in-2.jpeg "2-sign-in-2")

While the most of the fields there are quite obvious (your email, name and the password), the latest one (`subdomain`) requires an additional clarification. 

### About 'subdomain' field
During the registration process you create not only your personal account (associated with your email address) but also an account for your team. One team can include several user accounts ( and several knowledge bases. The account you created during the registation is considered as a team `owner`, others - can be added later. All team members share the access to all knowledge bases which belong to this team. 

Each team automatically gets a website where all its knowledge bases are published. The URL for that website has the following structure:    

```
https://team-id.aistant.com
```

So, that `team-id` part of the URL can be entered during the registration in `subdomain` field. 
It must be an unique name among all other AIstant users, so - choose it carefully. You will be able to change it later although it's quite a dangerous operation since all your current article URLs will be broken since that.

When all the fields are filled - just click on "Create your Account" button and you will be registered and logged in to the [Aistant Console](/aistant-console)

## 2. Creating your first knowledge base
After the logging it you will be presented with a  pop-up window where you can create your first knowledge base (KB).

![3-kb-3](https://files.aistant.com/docs/images/3-kb-3.jpeg "3-kb-3")

There are only two fields you need to enter: the name of your KB and its ID which will be used as a part of the URL for public access to your documenation.     
So the final URL will have the following structure:

```
https://team-id.aisatant.com/kb-id
```

The dialog also contains a "content" selector which allows you to choose between an empty knowledge base or to pre-fill it with some sample articles (few articles from the Aistant documentation). If you choose the second option (default) - the new articles can found on [Articles](/articles) page of [Aistant Console](/aistant-console). The articles are already published and available on via the URL we mentioned above. You can remove them later when you start to fill your KB with your own documenation.
