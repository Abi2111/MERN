class Apifilter {
  constructor(query, queryStr) {
    this.query = query;
    this.queryStr = queryStr;
  }

  search() {
    if (this.queryStr.search) {
      const search = {
        title: {
          $regex: this.queryStr.search,
          $options: 'i',
        },
      };
      this.query = this.query.find(search);
    }
    return this;
  }

  filter() {
    const strObj = { ...this.queryStr };
    const excludeFields = ['search', 'page']; // Corrected variable name

    excludeFields.forEach(field => delete strObj[field]); // Use 'field' instead of 'ele'

    let queryStr = JSON.stringify(strObj);
    queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g, match => `$${match}`);

    this.query = this.query.find(JSON.parse(queryStr));
    return this;
  }

  pagination(resPerPage) {
    const currentPage = this.queryStr.page || 1;
    const skip = (currentPage - 1) * resPerPage;

    this.query = this.query.skip(skip).limit(resPerPage);
    return this;
  }
}

module.exports = Apifilter;
