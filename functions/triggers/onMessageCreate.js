const functions = require("firebase-functions");
const admin = require("firebase-admin");
const axios = require("axios");

const messagesPath = "channels/weather/messages";
const docPath = `${messagesPath}/{messageId}`;
const db = admin.firestore();

const url = "https://api.openweathermap.org/data/2.5/weather";
const appid = "63887927d57b097a372c3be2bf21f39d";

module.exports = functions.firestore
  .document(docPath)
  .onCreate(async snapshot => {
    const message = snapshot.data();
    const date = new Date();
    date.setSeconds(new Date().getSeconds() + 1);
    if (message.user.id !== "OpenWeatherMap") {
      let response = {};
      try {
        response = await axios({
          url,
          params: {
            q: message.text,
            appid,
            units: "metric"
          }
        });
      } catch (error) {
        console.error(error);
        response = error.response;
      }

      const {
        message: errorInfo,
        weather = [{}],
        sys = {},
        name,
        main = {}
      } = response.data;
      const text = `${sys.country}, ${name}, ${weather[0].description} ${
        main.temp
      }`;
      return db.collection(messagesPath).add({
        text: errorInfo || text,
        createdAt: date,
        user: db.collection("users").doc("OpenWeatherMap")
      });
    }
  });
