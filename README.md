# Atlas Search Index API Examples

This respository contains examples of how to get, create and delete [Atlas Search](https://docs.atlas.mongodb.com/atlas-search/) indexes using the [API](https://docs.atlas.mongodb.com/reference/api/atlas-search/). It uses [dotenv](https://www.npmjs.com/package/dotenv) to load the API credentials and  [digest_fetch](https://www.npmjs.com/package/digest-fetch) to make the API calls.

## Usage

Configure [Atlas Programmatic API Keys](https://docs.atlas.mongodb.com/configure-api-access/#programmatic-api-keys).

`git clone wbleonard/atlas_search_index_apis`

`npm install`

`mv .env.example .env`

Update `env` with your user and key values:

```zsh
  ATLAS_USER = "<ATLAS_PUBLIC_KEY>"
  ATLAS_USER_KEY = "<ATLAS_PRIVATE_KEY>"
```
By default, the example code creates an index on the `sample_analytics.customer` collection:


```JavaScript
/* 
 * Test Functions
 */

createSearchIndex("sample_analytics", "customers");

getSearchIndex("sample_analytics", "customers").then((results) => {
  console.log(JSON.stringify(results, null, " "));
});

//deleteExistingIndex();
```
## To Run
```zsh
✗ node app.js                                                             
{
 "collectionName": "customers",
 "database": "sample_analytics",
 "indexID": "5fb7f2320bca90461dc13b20",
 "mappings": {
  "dynamic": true
 },
 "name": "default"
}
[
 {
  "collectionName": "customers",
  "database": "sample_analytics",
  "indexID": "5fb7f2320bca90461dc13b20",
  "mappings": {
   "dynamic": true
  },
  "name": "default"
 }
]
```