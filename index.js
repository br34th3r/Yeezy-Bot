const Discord = require("discord.js");
const config = require("./config.json");
const fetch = require("node-fetch");

const client = new Discord.Client();

const prefix = "!";

function pullKanye() {
	fetch("https://api.kanye.rest/", { method: "GET" })
		.then(res => res.json())
		.then(json => client.channels.cache.get("774394228343439433").send(json.quote))
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

client.login(config.BOT_TOKEN);
