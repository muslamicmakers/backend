const cors = require('micro-cors')();
const cache = require('micro-cacheable');
const ms = require('milliseconds');

const airtable = require('./airtable');
const eventbrite = require('./eventbrite');

const microFn = async (req, res) => {
  const headerData = await airtable.getHeader();
  const videoData = await airtable.getVideos();
  const bioData = await airtable.getBios();

  const eventbriteAirtableData = await airtable.getEventbrite();
  const eventbriteApiData = await eventbrite.getEventbrite(
    eventbriteAirtableData.id
  );
  const eventbriteData = Object.assign(eventbriteApiData, {
    description: eventbriteAirtableData.description
  });

  return { headerData, videoData, bioData, eventbriteData };
};

module.exports = cors(cache(ms.seconds('30'), microFn));
