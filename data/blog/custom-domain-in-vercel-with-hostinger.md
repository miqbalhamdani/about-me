---
slug: custom-domain-in-vercel-with-hostinger
title: Custom Domain in Vercel (2026 Guide)
description: How to Connect a Custom Domain in Vercel with Hostinger (Step-by-Step Guide)
date: 2026-03-19
readTime: 8 min read
category: Engineering
tags: [vercel, hostinger, custom-domain, guide]
coverImage: /blog/custom-domain-in-vercel-with-hostinger/cover.webp
coverAlt: A step-by-step guide to connecting a custom domain in Vercel with Hostinger, featuring screenshots and clear instructions.
featured: false
---

### **💡 Before You Start (Optional)**

If you haven’t purchased a domain yet, you can use Hostinger. They often provide affordable pricing, and you can get **up to 20% discount** using this referral link:

> https://www.hostinger.com/id?REFERRALCODE=SESMIQBALAZH



## 🚀 Step 1: Add Your Domain in Vercel

1. Go to your Vercel dashboard
2. Navigate to **Settings → Domains**
3. Click **Add Existing Domain**
4. Enter your domain name and click **Save**
  ![](/blog/custom-domain-in-vercel-with-hostinger/domain-name.png)
   
   After adding the domain, you’ll see a warning message: **“Invalid Configuration”**. Click **Learn More**, and Vercel will show you two nameservers.
    
    ![](/blog/custom-domain-in-vercel-with-hostinger/nameservers.png)
    
    Copy these nameservers — you’ll need them in the next step.
    


## 🌐 Step 2: Update Nameservers in Hostinger

1. Log in to your Hostinger account
2. Go to **Domains → Domain Portfolio → Manage**
3. Open the **DNS / Nameservers** settings
    
    ![](/blog/custom-domain-in-vercel-with-hostinger/dns-nameservers.png)
    

### ⚠️ Important Notes:

- You may need to verify your email before editing DNS settings
- If you don’t receive the OTP email, check your spam folder


## 🔧 Step 3: Change Nameservers

Replace your current nameservers with Vercel’s and  Save the changes.

![](/blog/custom-domain-in-vercel-with-hostinger/change-nameservers.png)

```
ns1.vercel-dns.com
ns2.vercel-dns.com
```


## ✅ Step 4: Verify the Setup

1. Go back to Vercel
2. Click **Refresh** on the domain status

![](/blog/custom-domain-in-vercel-with-hostinger/verify-setup.png)

Once propagation is complete, the status will change to **Valid Configuration**, and your domain will be connected 🎉.


### ⏱️ DNS Propagation Time

DNS changes may take a few minutes up to 24 hours, but in most cases, it updates pretty quickly.