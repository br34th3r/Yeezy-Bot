const Discord = require("discord.js");
const fetch = require("node-fetch");
const express = require("express");
require("dotenv").config();

const app = express();

app.get("/", (req, res) => {
	res.send("Yeezy Bot");
});

const client = new Discord.Client();

const prefix = "!";

function pullKanye() {
	fetch("https://api.kanye.rest/", { method: "GET" })
		.then(res => res.json())
		.then(json => client.channels.cache.get(process.env.CHANNEL_ID).send(json.quote))
		.catch(err => console.log(err))
}

function tellEmKanye(millis) {
	setTimeout(function() {
		pullKanye();
		tellEmKanye(millis);
	}, millis);
}

client.on("ready", function() {
	let millisInADay = 24 * 60 * 60 * 1000;
	pullKanye();
	tellEmKanye(millisInADay);
});

client.login(process.env.BOT_TOKEN);

app.listen(process.env.PORT || 5000);
