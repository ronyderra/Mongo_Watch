const { MongoClient } = require("mongodb");

async function main() {
  const uri =ADD_URI;
  const client = new MongoClient(uri);

  try {
    await client.connect();
    const pipeline = [{ $match: { operationType: "insert" } }];
    await monitorListingsUsingEventEmitter(client, 2147483647, pipeline);
  } catch (e) {
    console.error(e);
  } finally {
    await client.close();
  }
}

main().catch(console.error);

function closeChangeStream(timeInMs = 2147483647, changeStream) {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log("Closing the change stream");
      changeStream.close();
      resolve();
    }, timeInMs);
  });
}

async function monitorListingsUsingEventEmitter(client, timeInMs, pipeline) {
  const collection = client.db("changeStream").collection("bridge_transactions");
  const changeStream = collection.watch(pipeline);

  changeStream.on("change", (next) => {
    console.log(next);
  });

  await closeChangeStream(timeInMs, changeStream);
}
