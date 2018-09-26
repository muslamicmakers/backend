const airtableTestData = require('../airtableTestData');

class Airtable {
  constructor(key) {
    this.data = null;
  }

  base() {
    return tableName => {
      const tableData = airtableTestData[tableName];
      this.data = Array.isArray(tableData) ? tableData : [tableData];
      return this;
    };
  }

  select() {
    return this;
  }

  firstPage() {
    const records = this.data.map(record => ({
      get: fieldName => record[fieldName]
    }));
    return Promise.resolve(records);
  }
}

module.exports = Airtable;
