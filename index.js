const ms = require('milliseconds');
const cors = require('micro-cors')();
const { router, get } = require('microrouter');

const airtable = require('./airtable');
const eventbrite = require('./eventbrite');

let cachedAirtableData = null;
let cachedEventbriteData = null;

const airtableRoute = async (req, res) => {
  const headerData = airtable.getHeader();
  const videoData = airtable.getVideos();
  const bioData = airtable.getBios();

  const data = Promise.all([headerData, videoData, bioData]);

  const json = data.then(([headerData, videoData, bioData]) => ({
    headerData,
    videoData,
    bioData
  }));

  return await json;
};

const eventbriteRoute = async (req, res) => {
  const { id, description, ended } = await airtable.getEventbrite();

  // Note: the eventbrite API is super slow
  const eventbriteData = await eventbrite.getEventbrite(id);

  return {
    ...eventbriteData,
    description,
    ended
  };
};

const warmupCache = () => {
  // NOTE: Be mindful of API limits
  // Eventbrite: 1000 calls per hour
  // Airtable: 5 requests per second
  setInterval(async () => {
    // Poll APIs for data every 10 seconds
    cachedAirtableData = await airtableRoute();
    cachedEventbriteData = await eventbriteRoute();
  }, ms.seconds(10));
};

const serveFromCache = route => async (req, res) => {
  switch (route) {
    case '/':
      return await cachedAirtableData;
      break;
    case '/eventbrite':
      return await cachedEventbriteData;
      break;
    default:
      break;
  }
};

warmupCache();

module.exports = router(
  get('/', cors(serveFromCache('/'))),
  get('/eventbrite', cors(serveFromCache('/eventbrite')))
);
