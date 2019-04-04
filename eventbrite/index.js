require('now-env');
const date = require('date-fns');
const eb = require('eventbrite').default;

const Eventbrite = eb({
  token: process.env.EVENTBRITE_TOKEN
});

const getVenueInfo = async venueId => {
  // API Docs: https://www.eventbrite.co.uk/developer/v3/endpoints/venues/
  const result = await Eventbrite.request('/venues/' + venueId);

  const venueName = result.name;
  const address = result.address['localized_address_display'];

  const uriVenueName = encodeURIComponent(venueName);
  const uriAddress = encodeURIComponent(address);

  const query = `${uriAddress},${uriVenueName}`;

  const googleMapsEmbedUrl = `https://www.google.com/maps/embed/v1/place?key=${
    process.env.GOOGLE_MAPS_KEY
  }&q=${query}`;

  const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${query}`;

  return {
    name: venueName,
    longitude: result.longitude,
    latitude: result.latitude,
    address,
    googleMapsEmbedUrl,
    googleMapsUrl
  };
};

exports.getEventbrite = async id => {
  // API Docs: https://www.eventbrite.co.uk/developer/v3/endpoints/events/
  const result = await Eventbrite.request('/events/' + id);

  const venueId = result.venue_id;
  const venueData = await getVenueInfo(venueId);

  const dateFormat = 'dddd Do MMM @ h:mma';

  return {
    title: result.name.text,
    start: date.format(result.start.local, dateFormat),
    venue: venueData,
    url: result.url
  };
};
