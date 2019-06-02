const admin = require("firebase-admin");
admin.initializeApp();

exports.onMessageCreate = require("./triggers/onMessageCreate");
