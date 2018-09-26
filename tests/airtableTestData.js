module.exports = {
  Header: { Heading: 'testing' },
  Videos: {
    Event: 'Test event',
    Location: 'Test HQ',
    'Youtube Link': 'https://www.youtube.com/watch?v=CM6XaDQ7nV0'
  },
  Bios: [
    {
      Name: 'Bill Murray',
      Bio: 'Actor and stuff.',
      Photo: [{ thumbnails: { large: { url: 'someImage.jpg' } } }],
      'Twitter Username': 'billmurray'
    },
    {
      Name: 'Jane Doe',
      Bio: 'Software Engineer, Speaker.',
      Photo: [{ thumbnails: { large: { url: 'image.png' } } }],
      'Twitter Username': 'jdoe'
    }
  ],
  Eventbrite: {
    Link:
      'https://www.eventbrite.co.uk/e/muslamic-makers-intro-to-startup-funding-tickets-48127296038#',
    Description: 'test event',
    Ended: false
  }
};
