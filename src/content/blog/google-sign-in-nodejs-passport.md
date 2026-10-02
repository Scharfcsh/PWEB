---
title: How to Implement Google Sign-In in Node.js with Passport.js
description: A step-by-step guide to adding "Sign in with Google" to an Express app with Passport.js and OAuth 2.0 — Google Cloud setup, sessions, protected routes, logout and a production checklist.
category: Authentication
tags: [Node.js, Express, Passport.js, Google OAuth, OAuth 2.0, Authentication]
publishedAt: 2026-10-01
coverImage: https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1600&auto=format&fit=crop
coverImageAlt: Code editor open on a laptop screen
author: aman-adhikari
---

Letting people sign in with their Google account removes a whole category of work from your app: no password hashing, no reset emails, no "forgot password" flow — and far fewer abandoned sign-ups. In this guide we'll add **Sign in with Google** to an Express application using [Passport.js](https://www.passportjs.org/) and the `passport-google-oauth20` strategy.

By the end you'll have a small app that:

- redirects users to Google's consent screen,
- creates a login session when they come back,
- protects private routes, and
- logs users out cleanly.

## How Google sign-in works

Google sign-in is built on **OAuth 2.0**, with OpenID Connect layered on top for identity. Passport hides most of the protocol, but knowing the flow makes debugging much easier:

1. The user clicks **Sign in with Google** and your server redirects them to Google with your client ID, the scopes you want and a callback URL.
2. The user picks an account and approves the requested permissions on Google's consent screen.
3. Google redirects back to your callback URL with a short-lived **authorization code**.
4. Your server exchanges that code — together with your client secret — for an access token and fetches the user's profile.
5. Passport hands you the profile in a *verify callback*. You find or create the user, and Passport stores them in the session.

Steps 3–5 happen on the server, so your client secret never reaches the browser.

## Prerequisites

- Node.js 18 or later and npm
- A Google account to use the Google Cloud Console
- Basic familiarity with Express routes and middleware

## Step 1: Create OAuth credentials in Google Cloud

1. Open the [Google Cloud Console](https://console.cloud.google.com/) and create a new project, or select an existing one.
2. Go to **APIs & Services → OAuth consent screen** (labelled **Google Auth Platform** in newer consoles). Choose **External**, then fill in the app name, a support email and a developer contact address.
3. Add the `openid`, `email` and `profile` scopes. They're non-sensitive, so they don't require Google's app verification.
4. While the app is in **Testing** mode, add your own Google account under **Test users**.
5. Open **Credentials → Create credentials → OAuth client ID**, choose **Web application** and add:
   - **Authorized JavaScript origins:** `http://localhost:3000`
   - **Authorized redirect URIs:** `http://localhost:3000/auth/google/callback`
6. Copy the generated **Client ID** and **Client secret**.

> The redirect URI must match **exactly** — scheme, host, port and path. A trailing slash, or `127.0.0.1` instead of `localhost`, is enough to trigger a `redirect_uri_mismatch` error.

## Step 2: Set up the Express project

```bash
mkdir google-auth-demo && cd google-auth-demo
npm init -y
npm install express express-session passport passport-google-oauth20 dotenv
```

Here's what each package does:

| Package | Purpose |
| --- | --- |
| `express` | Web server and routing |
| `express-session` | Cookie-based sessions, so users stay signed in between requests |
| `passport` | Authentication middleware that runs "strategies" |
| `passport-google-oauth20` | The Passport strategy that implements Google's OAuth 2.0 flow |
| `dotenv` | Loads secrets from a `.env` file into `process.env` |

The finished project is tiny:

```text
google-auth-demo/
├── .env
├── .gitignore
├── auth.js        # Passport + Google strategy configuration
├── app.js         # Express app, sessions and routes
└── package.json
```

## Step 3: Keep secrets in environment variables

Create a `.env` file with the credentials from Step 1:

```bash title=".env"
GOOGLE_CLIENT_ID=your-client-id.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=your-client-secret
GOOGLE_CALLBACK_URL=http://localhost:3000/auth/google/callback
SESSION_SECRET=replace-with-a-long-random-string
```

Generate a strong session secret with `node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"`, and make sure the file can never be committed:

```text title=".gitignore"
node_modules
.env
```

## Step 4: Configure the Google strategy

All of the Passport setup lives in one module:

```js title="auth.js"
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK_URL,
    },
    (accessToken, refreshToken, profile, done) => {
      // Runs once Google has confirmed who the user is.
      // Keep only what the app needs — this becomes req.user.
      const user = {
        id: profile.id,
        name: profile.displayName,
        email: profile.emails?.[0]?.value,
        avatar: profile.photos?.[0]?.value,
      };
      return done(null, user);
    }
  )
);

// What gets stored in the session...
passport.serializeUser((user, done) => {
  done(null, user);
});

// ...and how it's turned back into req.user on every request.
passport.deserializeUser((user, done) => {
  done(null, user);
});

module.exports = passport;
```

A few things worth knowing about the **verify callback**:

- `profile` is Google's user info normalised by Passport. `profile.id` is Google's stable user ID (the OpenID `sub` claim) — use it, not the email, as the key for your users.
- `accessToken` lets you call Google APIs on the user's behalf. For plain sign-in you can ignore it.
- `refreshToken` is only returned when you request offline access, so it's usually `undefined` here.

Storing the whole user object in the session is fine for a demo. In a real app you store only the user's ID and load the rest from your database — we'll do that [further down](#storing-users-in-a-database).

## Step 5: Add sessions and Passport to Express

```js title="app.js"
require('dotenv').config();
const express = require('express');
const session = require('express-session');
const passport = require('./auth');

const app = express();

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
      maxAge: 1000 * 60 * 60 * 24 * 7, // one week
    },
  })
);

app.use(passport.initialize());
app.use(passport.session());
```

Order matters here:

- `dotenv` must load **before** `./auth` is required, because the strategy reads `process.env` as soon as the module runs.
- `session()` must be registered **before** `passport.session()`, which reads the signed-in user out of the session on every request.

The cookie uses `sameSite: 'lax'` on purpose. The redirect back from Google is a top-level navigation, so a `lax` cookie is sent with it; a `strict` cookie isn't, and users would look signed out the moment they land.

## Step 6: Add the authentication routes

Two routes drive the whole flow — one that starts it and one that Google calls back:

```js title="app.js"
app.get('/', (req, res) => {
  res.send('<a href="/auth/google">Sign in with Google</a>');
});

// 1. Send the user to Google's consent screen
app.get(
  '/auth/google',
  passport.authenticate('google', {
    scope: ['profile', 'email'],
    prompt: 'select_account',
  })
);

// 2. Google redirects back here with an authorization code
app.get(
  '/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/auth/failure' }),
  (req, res) => {
    res.redirect('/dashboard');
  }
);

app.get('/auth/failure', (req, res) => {
  res.status(401).send('Google sign-in failed. <a href="/">Try again</a>');
});
```

- `scope` controls what you're asking for. `profile` gives you the name and photo, and `email` adds the email address.
- `prompt: 'select_account'` always shows the account chooser, which is handy when people have several Google accounts. Remove it if you'd rather sign returning users straight in.
- On the callback, `passport.authenticate` exchanges the code, runs your verify callback and calls `req.login()` for you before your handler runs.

## Step 7: Protect routes with middleware

Passport adds `req.isAuthenticated()` to every request, which makes a guard middleware a three-liner:

```js title="app.js"
function requireAuth(req, res, next) {
  if (req.isAuthenticated()) return next();
  res.redirect('/');
}

// Profile data comes from Google, so escape it before putting it in HTML.
const escapeHtml = (value = '') =>
  String(value).replace(/[&<>"']/g, (char) => `&#${char.charCodeAt(0)};`);

app.get('/dashboard', requireAuth, (req, res) => {
  const { name, email, avatar } = req.user;
  res.send(`
    <img src="${escapeHtml(avatar)}" alt="" width="48" height="48" referrerpolicy="no-referrer" />
    <h1>Welcome, ${escapeHtml(name)}</h1>
    <p>Signed in as ${escapeHtml(email)}</p>
    <form method="post" action="/logout"><button>Log out</button></form>
  `);
});
```

`referrerpolicy="no-referrer"` on the avatar avoids the occasional 403 Google's image servers return when a referrer header is sent.

## Step 8: Log users out

Since Passport 0.6, `req.logout()` is asynchronous and **requires a callback**:

```js title="app.js"
app.post('/logout', (req, res, next) => {
  req.logout((err) => {
    if (err) return next(err);
    req.session.destroy(() => {
      res.clearCookie('connect.sid');
      res.redirect('/');
    });
  });
});

app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});
```

Logout is a `POST` rather than a `GET` so another site can't sign your users out just by embedding a link or an image that points at it.

## Run and test the flow

```bash
node app.js
```

1. Open `http://localhost:3000` and click **Sign in with Google**.
2. Choose your account and approve the consent screen.
3. You should land on `/dashboard` with your name, email and avatar.
4. Open `/dashboard` in a private window — you'll be redirected to the home page.
5. Click **Log out**, then visit `/dashboard` again to confirm the session is gone.

## Storing users in a database

Real apps persist users. The pattern is the same whatever database you use: **find or create** the user in the verify callback, put only their ID in the session, and load them again on each request. Here's a version with a Mongoose `User` model:

```js title="auth.js"
const User = require('./models/User');

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK_URL,
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        let user = await User.findOne({ googleId: profile.id });

        if (!user) {
          user = await User.create({
            googleId: profile.id,
            name: profile.displayName,
            email: profile.emails?.[0]?.value,
            avatar: profile.photos?.[0]?.value,
          });
        }

        return done(null, user);
      } catch (err) {
        return done(err);
      }
    }
  )
);

// Only the ID goes into the session cookie
passport.serializeUser((user, done) => done(null, user.id));

passport.deserializeUser(async (id, done) => {
  try {
    // A missing user (deleted account) signs the session out
    const user = await User.findById(id);
    done(null, user || false);
  } catch (err) {
    done(err);
  }
});
```

If you're adding Google sign-in to an app that already has email/password accounts, only link a Google profile to an existing account when Google reports the email as verified (`profile.emails[0].verified`). Otherwise someone could claim an account with an address they don't own.

## Production checklist

- **Use a real session store.** The default `MemoryStore` leaks memory and drops every session on restart. Use `connect-redis`, `connect-mongo` or `connect-pg-simple`.
- **Serve over HTTPS** and keep `cookie.secure` on. Behind a reverse proxy (Nginx, Render, Railway, Heroku…) also call `app.set('trust proxy', 1)`, or Express will refuse to set secure cookies.
- **Register your production redirect URI** in Google Cloud, and set `GOOGLE_CALLBACK_URL` per environment.
- **Turn on the `state` parameter** by adding `state: true` to the strategy options. It ties each callback to the session that started it and blocks login CSRF.
- **Publish the consent screen.** In Testing mode only listed test users can sign in.
- **Ask for the minimum scopes.** Every extra scope makes the consent screen scarier, and sensitive scopes need Google's verification.
- **Treat secrets as secrets.** Never commit `.env`, and rotate the client secret right away if it leaks.

## Common errors and how to fix them

### Error 400: redirect_uri_mismatch

The callback URL in the request doesn't exactly match one registered in Google Cloud. Compare `GOOGLE_CALLBACK_URL` character by character with the console. If you use a relative `callbackURL` behind a proxy without `trust proxy`, Passport builds an `http://` URL even though your site is on `https://`.

### req#logout requires a callback function

You're on Passport 0.6 or newer, where logout became asynchronous. Pass a callback as shown in [Step 8](#step-8-log-users-out).

### Failed to serialize user into session

`passport.serializeUser` isn't registered, or `auth.js` was never required. Make sure `require('./auth')` runs before your routes.

### Error 403: access_denied

The consent screen is still in Testing mode and the Google account you used isn't on the test-user list. Add it under **Test users**, or publish the app.

### req.user is undefined after the redirect

The session cookie isn't coming back to the server. The usual causes are `secure: true` on plain-HTTP localhost, `sameSite: 'strict'`, or `passport.session()` registered before `session()`. Check your browser's dev tools for the `connect.sid` cookie.

## Wrapping up

You now have a complete Google sign-in flow: OAuth credentials, a Passport strategy, sessions, protected routes and a safe logout — plus the changes that take it from localhost to production.

The same structure works for other providers too. Swap in `passport-github2` or `passport-microsoft` with their own credentials and you have multi-provider login with almost no new code. For single-page or mobile apps without server sessions, look at Google Identity Services and verify the ID token on your backend with `google-auth-library` instead.

*This guide builds on the approach in GeeksforGeeks' [Google Authentication using Passport in Node.js](https://www.geeksforgeeks.org/node-js/google-authentication-using-passport-in-node-js/), updated for Passport 0.6+ and production use.*
