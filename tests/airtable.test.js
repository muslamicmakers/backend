const airtable = require('../airtable/index.js');

describe('Airtable', () => {
  it('gets header info as expected', async () => {
    const data = await airtable.getHeader();
    expect(data).toEqual({ text: 'testing' });
  });

  it('gets bio info as expected', async () => {
    const expected = [
      {
        bio: 'Actor and stuff.',
        name: 'Bill Murray',
        photo: 'someImage.jpg',
        twitter: 'https://twitter.com/billmurray'
      }
    ];
    const data = await airtable.getBios();
    expect(data).toEqual(expected);
  });

  it('gets video info as expected', async () => {
    const expected = [
      {
        event: 'Test event',
        location: 'Test HQ',
        url: 'https://www.youtube.com/embed/CM6XaDQ7nV0'
      }
    ];
    const data = await airtable.getVideos();
    expect(data).toEqual(expected);
  });

  it('gets Eventbrite info as expected', async () => {
    const data = await airtable.getEventbrite();
    expect(data).toEqual({
      description: 'test event',
      ended: false,
      id: '48127296038'
    });
  });
});
