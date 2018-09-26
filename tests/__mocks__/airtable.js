const airtableTestData = require('../airtableTestData');

class Airtable {
  constructor(key) {
    this.data = null;
  }

  base() {
    return tableName => {
      this.data = airtableTestData[tableName];
      return this;
    };
  }

  select() {
    return this;
  }

  firstPage() {
    const record = {
      get: fieldName => {
        return this.data[fieldName];
      }
    };
    const records = [record];
    return Promise.resolve(records);
  }
}

module.exports = Airtable;
