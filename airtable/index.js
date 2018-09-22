const Airtable = require('airtable');

const base = new Airtable({ apiKey: process.env.AIRTABLE_KEY }).base(
  process.env.MUSLAMICMAKERS_AIRTABLE_BASE_TABLE
);

const youtubeUrlToEmbedUrl = url => {
  const regex = /(?:youtube(?:-nocookie)?\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
  const id = url.match(regex)[1];
  return `https://www.youtube.com/embed/${id}`;
};

const getEventbriteId = url => {
  const regex = /\d{6,}/;
  return url.match(regex)[0];
};

const getColumn = name => {
  return base(name)
    .select({
      view: 'Grid view'
    })
    .firstPage();
};

exports.getHeader = () => {
  return getColumn('Header').then(
    records =>
      records.map(record => ({
        text: record.get('Heading')
      }))[0]
  );
};

exports.getBios = () =>
  getColumn('Bios').then(records =>
    records.map(record => {
      const photo = record.get('Photo');
      const twitterUsername = record.get('Twitter Username');
      return {
        name: record.get('Name'),
        bio: record.get('Bio'),
        photo: photo ? photo[0].thumbnails.large.url : null,
        twitter: twitterUsername
          ? `https://twitter.com/${twitterUsername}`
          : null
      };
    })
  );

exports.getVideos = () =>
  getColumn('Videos').then(records =>
    records.map(record => ({
      event: record.get('Event'),
      location: record.get('Location'),
      url: youtubeUrlToEmbedUrl(record.get('Youtube Link'))
    }))
  );

exports.getEventbrite = () =>
  getColumn('Eventbrite').then(
    records =>
      records.map(record => ({
        id: getEventbriteId(record.get('Link')),
        description: record.get('Description')
      }))[0]
  );
