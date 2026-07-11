---
slug: form-validation-and-form-engine-in-react
title: Understanding Form Validation vs Form Engine in React (Next.js)
description: Understand the difference between validation rules and form engines in React and learn why React Hook Form with Valibot is a lightweight, performant stack.
date: 2026-04-16
readTime: 6 min read
category: Engineering
tags: [react, nextjs, form-validation, react-hook-form, valibot]
coverImage: /blog/form-validation-and-form-engine-in-react/cover.png
coverAlt: Understanding form validation and form engines in React with a modern form stack.
featured: false
---

When building forms in modern web apps (like React + Next.js), there are **two important concepts** that often get confused:

- **Validation Rules** (aturan validasi)
- **Form Engine**

## 🧠 1. What is "Validation Rules"?

Validation rules define **what is allowed and what is not** in your form.

Think of it like **rules in real life**:

- Email must be valid
- Password must be at least 6 characters
- Name cannot be empty

### Libraries for Validation (React + Next.js)

- Zod
- Valibot
- Yup

## ⚙️ 2. What is a "Form Engine"?

A form engine is responsible for **handling the form behavior in the UI**.

It manages things like:

- Input values
- Form submission
- Error display
- Tracking changes (dirty, touched, etc.)

### Example

When user types:

- Update input value
- Validate input
- Show error message
- Handle submit button

### Libraries for Form Engine

- React Hook Form ✅ (modern standard)
- Formik (older / legacy)

## 🚗 Simple Analogy

- Validation = **Traffic Rules 🚦**
- Form Engine = **Car Engine 🚗**

## 🚀 My Stack: React Hook Form + Valibot

In my project, I use:

- **React Hook Form** → handle form behavior
- **Valibot** → handle validation rules

## ✅ Why I Choose This Stack (with Real Numbers)

### ⚡ 1. High Performance (Less Re-render)

- **React Hook Form**
  - Uses uncontrolled inputs
  - Minimal re-render
  - Can reduce re-renders by **~60–90%**
- **Formik**
  - Uses controlled inputs
  - More frequent re-render
  - Slower on large forms

### 📦 2. Bundle Size Comparison

#### Validation Libraries

- **Valibot**
  - ~2–4 KB (min+gzip)
  - Very lightweight
- **Zod**
  - ~20–30 KB
  - ~10x bigger than Valibot
- **Yup**
  - ~24–30 KB
  - ~10–15x bigger than Valibot

#### Form Libraries

- **React Hook Form**
  - ~8–10 KB
  - Lightweight
- **Formik**
  - ~13–15 KB
  - Bigger and heavier

### 🚀 3. Performance (Validation Speed)

- **Valibot**
  - Fastest
  - Functional pipeline → efficient execution
- **Zod**
  - Fast
  - Balanced performance
- **Yup**
  - Slower
  - More overhead

## 💻 Example: React Hook Form + Valibot

### 1. Create validation schema

```typescript
import { object, string, minLength, email } from "valibot"

export const loginSchema = object({
  email: string([email("Invalid email address")]),
  password: string([minLength(6, "Password must be at least 6 characters")]),
})
```

### 2. Use in React Hook Form

```typescript
"use client"

import { useForm } from "react-hook-form"
import { valibotResolver } from "@hookform/resolvers/valibot"
import { loginSchema } from "./schema"

export default function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: valibotResolver(loginSchema),
  })

  const onSubmit = (data) => {
    console.log("Form Data:", data)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <input placeholder="Email" {...register("email")} />
        {errors.email && <p>{errors.email.message}</p>}
      </div>

      <div>
        <input type="password" placeholder="Password" {...register("password")} />
        {errors.password && <p>{errors.password.message}</p>}
      </div>

      <button type="submit">Login</button>
    </form>
  )
}
```
