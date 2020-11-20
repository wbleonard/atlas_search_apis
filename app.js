/*
 *  Atlas Search API Examples
 *  https://docs.atlas.mongodb.com/reference/api/atlas-search/
 */
require('dotenv').config();
const DigestFetch = require("digest-fetch");


const client = new DigestFetch(
  process.env.ATLAS_USER,
  process.env.ATLAS_USER_KEY,
  {}
);

project_id = process.env.PROJECT_ID;
cluster_name = process.env.CLUSTER_NAME;

const urlbase = "https://cloud.mongodb.com/api/atlas/v1.0/";

const body = {
  collectionName: "customers",
  database: "sample_analytics",
  mappings: {
    dynamic: true,
  },
  name: "default",
};

/* 
 * Test Functions
 */

createSearchIndex("sample_analytics", "customers");

getSearchIndex("sample_analytics", "customers").then((results) => {
  console.log(JSON.stringify(results, null, " "));
});

//deleteExistingIndex();

/*
 * Impl functions
 */

async function getSearchIndex(database, collection) {
  const response = await client.fetch(
    urlbase +
      `groups/${project_id}/clusters/${cluster_name}/fts/indexes/${database}/${collection}`,
    {}
  );
  return response.json();
}

async function createSearchIndex(database, collection) {
  client
    .fetch(
      urlbase + `groups/${project_id}/clusters/${cluster_name}/fts/indexes`,
      {
        method: "post",
        body: JSON.stringify(body),
        headers: { "Content-Type": "application/json" },
      }
    )
    .then((res) => res.json())
    .then((json) => {
      console.log(JSON.stringify(json, null, " "));
    });
}

async function deleteSearchIndex(index_id) {
  client
    .fetch(
      urlbase +
        `groups/${project_id}/clusters/${cluster_name}/fts/indexes/${index_id}`,
      {
        method: "delete",
      }
    )
    .then((res) => res.json())
    .then((json) => console.log(JSON.stringify(json, null, " ")));
}

async function deleteExistingIndex() {
  getSearchIndex("sample_analytics", "customers").then((results) => {
    console.log(JSON.stringify(results, null, " "));

    if (results.length > 0) {
      indexID = results[0].indexID;
      console.log(indexID);
      deleteSearchIndex(indexID);
    }
  });
}
