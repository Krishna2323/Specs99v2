class ApiFeature {
  constructor(query, queryString) {
    this.query = query;
    this.queryString = queryString;
    this.totalLength = 0;
  }

  search() {
    const keyword = this.queryString.keyword
      ? {
          $or: [
            {
              brand: {
                $regex: this.queryString.keyword,
                $options: 'i',
              },
            },
            {
              model: {
                $regex: this.queryString.keyword,
                $options: 'i',
              },
            },
          ],
        }
      : {};

    this.query = this.query.find({ ...keyword });

    return this;
  }

  filter() {
    const queryObj = { ...this.queryString };
    const excludeFields = [
      'page',
      'sort',
      'limit',
      'fields',
      'keyword',
      'brand',
      'model',
    ];
    excludeFields.forEach((el) => delete queryObj[el]);

    Object.keys(queryObj).forEach((e) => {
      if (queryObj[e] === '') {
        delete queryObj[e];
      }
    });

    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);
    // console.log(queryStr);
    this.query = this.query.find(JSON.parse(queryStr));

    return this;
  }

  getLength() {
    this.totalLength = this.query.find().length;
    return this;
  }

  sort() {
    if (this.queryString.sort) {
      const sortBy = this.queryString.sort.split(',').join(' ');

      this.query = this.query.sort(sortBy);
    } else {
      this.query = this.query.sort('-createdAt');
    }
    return this;
  }

  limitFields() {
    if (this.query.fields) {
      const fields = this.query.fields.split(',').join(' ');
      this.query = this.query.select(fields);
    } else {
      this.query = this.query.select('-__v');
    }
    return this;
  }

  paginate() {
    const page = this.queryString.page || 1;
    const limit = this.queryString.limit || 100;
    const skip = (page - 1) * limit;

    this.query = this.query.skip(skip).limit(limit);

    return this;
  }
}

module.exports = ApiFeature;
