---
slug: multiple-git-accounts
title: "Complete Guide: Multiple Git Accounts with SSH, GPG, and Verified Commits"
description: Learn how to manage multiple Git accounts on a single machine using SSH keys, GPG signing, and conditional Git configurations.
date: 2026-03-16
readTime: 10 min read
category: Web Development
tags: [git, ssh, gpg, github, gitlab, guide]
coverImage: /blog/multiple-git-accounts/cover.webp
coverAlt: Complete Guide: Multiple Git Accounts with SSH, GPG, and Verified Commits
featured: false
---

# 🔐 PART 1 — Generate 2 SSH Keys (Access)

## 1. Generate GitHub SSH key

```bash
ssh-keygen -t ed25519 -C "user-github@mail.com" -f ~/.ssh/id_ed25519_github
```

## 2. Generate GitLab SSH key

```bash
ssh-keygen -t ed25519 -C "user-gitlab@mail.com" -f ~/.ssh/id_ed25519_gitlab
```

---

## 3. Add SSH config

Edit:
```bash
nano ~/.ssh/config
```

![](/blog/multiple-git-accounts/ssh-config.png)

Add:
```text
Host github.com
  HostName github.com
  User user-github@mail.com
  IdentityFile ~/.ssh/id_ed25519_github
  IdentitiesOnly yes

Host gitlab.com
  HostName gitlab.com
  User user-gitlab@mail.com
  IdentityFile ~/.ssh/id_ed25519_gitlab
  IdentitiesOnly yes
```

## 4. Add public keys to platforms

Copy keys:
```bash
cat ~/.ssh/id_ed25519_github.pub
cat ~/.ssh/id_ed25519_gitlab.pub
```

Add to:
* GitHub → Settings → SSH Keys
* GitLab → Preferences → SSH Keys

---

## 5. Test connection

```bash
ssh -T git@github.com
ssh -T git@gitlab.com
```

# ✍️ PART 2 — Generate 2 GPG Keys (Signing)

## 1. Generate GitHub GPG key

```bash
gpg --full-generate-key
```

Choose:
* Type: RSA and RSA
* Key size: 4096
* Email: same as GitHub email

---

## 2. Generate GitLab GPG key

Run again:
```bash
gpg --full-generate-key
```

## Use GitLab email

## 3. List keys

```bash
gpg --list-secret-keys --keyid-format=long
```

Example output:
```text
sec   rsa4096/ABC1234567890
uid   [ultimate] user-github@mail.com

sec   rsa4096/XYZ9876543210
uid   [ultimate] user-gitlab@mail.com
```

👉 Save both KEY IDs:
* GitHub → `ABC1234567890`
* GitLab → `XYZ9876543210` 

---

## 4. Export public keys

```bash
gpg --armor --export ABC1234567890
gpg --armor --export XYZ9876543210
```

## 5. Add to platforms

* GitHub → Settings → GPG Keys
* GitLab → Preferences → GPG Keys

---

# ⚙️ PART 3 — Git Config Per Workspace (IMPORTANT)

---

## 1. Create separate config files

GitHub config
```bash
nano ~/.gitconfig-github
```

```ini
[user]
  email = user-github@mail.com
  signingkey = ABC1234567890
```

---

GitLab config
```bash
nano ~/.gitconfig-gitlab
```

```ini
[user]
  email = user-gitlab@mail.com
  signingkey = XYZ9876543210
```

---

## 2. Setup auto switching

Edit main config:
```bash
nano ~/.gitconfig
```

Add:
```ini
[includeIf "gitdir:~/projects/github/"]
  path = ~/.gitconfig-github

[includeIf "gitdir:~/projects/gitlab/"]
  path = ~/.gitconfig-gitlab
```

My Folder Structure
```text
~
|-- escape/
|   |-- repository_a
|   |-- repository_b
|-- development/
|   |-- repository_c
|   |-- repository_d
```

## 3. Verify

Inside repo:
```bash
git config user.email
git config user.signingkey
```

## 4. Activate (Important ⚠️)

```bash
git config --global commit.gpgsign true
```
