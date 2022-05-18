const { MongoClient } = require("mongodb");

async function main() {
  const uri ="mongodb+srv://dimab:dGKUNKT7FRaPhm8@dev-bridge-explorer.e5g3i.mongodb.net/changeStream?retryWrites=true&w=majority";
  const client = new MongoClient(uri);

  try {
    await client.connect();
    await createListing(client);

  } catch (e) {
    console.error(e);
  } finally {
    await client.close();
  }
}

main().catch(console.error);

async function createListing(client) {
  const result = await client.db("changeStream").collection("bridge_transactions").insertOne({
    txNumber: 9109,
    walletsNumber: 666,
    date: "6/6/6",
  });
  console.log(`New Bridge transaction created with the following id: ${result.insertedId}`);
}
