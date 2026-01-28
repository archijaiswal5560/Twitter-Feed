# Twitter Feed Display System

A full-stack application that fetches tweets from configured Twitter (X) handles and displays them sequentially on a screen with QR-code support. The system supports **Twitter API v2 integration** with a **mock-data fallback**, making it suitable for demos even without API access.

## Features

*  Fetch latest tweets using **Twitter API v2**
*  Automatic fallback to **mock tweets** when API access is unavailable
*  Prevent duplicate tweets from being re-displayed
*  Frontend rotates tweets every few seconds
*  QR code for each tweet to open it on X (Twitter)

## Tech Stack

### Backend

* Node.js
* Express.js
* Sequelize ORM
* MySQL
* Axios
* Twitter API v2

### Frontend

* React (Vite)
* Tailwind CSS
* QRCode library

## Configuration

### Environment Variables (Backend)

Create a `.env` file in `server/`:

```
PORT=5000
DB_NAME=twitter
DB_USER=root
DB_PASSWORD=your_password
DB_HOST=localhost

TWITTER_BEARER_TOKEN=your_twitter_api_bearer_token
USE_REAL_TWITTER=true
```

* Set `USE_REAL_TWITTER=false` to force mock data
* If `TWITTER_BEARER_TOKEN` is missing or API fails, the system auto-falls back to mock tweets
* Mock data ensures consistent testing
* Change the development's password in the backend config file

