const mongoose = require('mongoose');
const initData = require('./data.js');
const listings = require('../models/listing.js');

main().then(() => {
    console.log("connected to db");
})
.catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/GoStayR');
}

const initDB = async () => {
    await listings.deleteMany({});
    initData.data = initData.data.map((obj) =>({
      ...obj,
      owner: "6859639805b06a81888d2ea4"
    }))
    await listings.insertMany(initData.data);
};

initDB();