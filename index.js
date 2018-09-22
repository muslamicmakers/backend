const ms = require('milliseconds');
const cors = require('micro-cors')();
const cache = require('micro-cacheable');
const { router, get } = require('microrouter');

const airtable = require('./airtable');
const eventbrite = require('./eventbrite');

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
  const { id, description } = await airtable.getEventbrite();

  // Note: the eventbrite API is super slow
  const eventbriteData = await eventbrite.getEventbrite(id);

  return {
    ...eventbriteData,
    description
  };
};

const corsAndCache = route => cors(cache(ms.seconds('60'), route));

module.exports = router(
  get('/', corsAndCache(airtableRoute)),
  get('/eventbrite', corsAndCache(eventbriteRoute))
);
