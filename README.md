# KamiBot

## About

This bot tracks twitch viewer data like watchTime and messages sent to rank viewers to award VIP status and possibly other rewards

## How it works

KamiBot uses twitch's tmi.js library to listen to events like when a user joins or leaves the channel and when a user sends a message. KamiBot then puts all this data into a database and dynamically updates the vip list accordingly

## Requirements

KamiBot runs on nodejs so make sure you have nodejs installed on the machine you intend to run KamiBot on. Also required is a working mongoDB installation accessible to the machine running KamiBot

## Installation

to install, clone this repository; then run `npm install` to install all dependencies

## How to start the bot

First, create a .env file with the following keys:
DB_HOST (the host of the mongodb database)
CHANNEL (the desired channel to monitor and track)
then, to start the bot, type `npm run start`
