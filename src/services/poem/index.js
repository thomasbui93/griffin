const { getKey, setKey } = require("../../helpers/cache");
const { mongoDatabase } = require("../../helpers/mongodb");

const pageSize = 20;
const db = mongoDatabase();
const poems = db.collection("poems");

const getPoems = async (textQuery, pageNumber, nPerPage) => {
  const queryOptions = !!textQuery ? { $text: { $search: textQuery } } : {};
  const cursor = await poems
    .find(queryOptions)
    .skip(pageNumber > 0 ? (pageNumber - 1) * nPerPage : 0)
    .limit(nPerPage);
  const items = await cursor.toArray();
  return items;
};

const getPoemsByAuthor = async (author, textQuery, pageNumber, nPerPage) => {
  const queryOptions = !!textQuery
    ? { author, $text: { $search: textQuery } }
    : { author };
  const cursor = await poems
    .find(queryOptions)
    .skip(pageNumber > 0 ? (pageNumber - 1) * nPerPage : 0)
    .limit(nPerPage);
  const items = await cursor.toArray();
  return items;
};

const totalAuthorPoems = async (author) => {
  const key = `author_poem_count_|${author}`;
  if (getKey(author)) return getKey(author);

  const totalPoemsInAuthor = await poems.countDocuments({ author });
  setKey(key, totalPoemsInAuthor, 60);
  return totalPoemsInAuthor;
};

const totalCount = async (textQuery) => {
  const queryOptions = !!textQuery ? { $text: { $search: textQuery } } : {};
  const key = `poem_count|${textQuery}`;
  if (getKey(key)) return getKey(key);

  const count = await poems.countDocuments(queryOptions);
  setKey(key, count, 60);
  return count;
};

module.exports.getAuthors = async () => {
  const cursor = await poems.aggregate([
    { $group: { _id: "$author", count: { $sum: 1 } } },
  ]);
  const authors = await cursor.toArray();
  return authors.map((author) => ({
    ...author,
    url: `/api/poem/authors/${encodeURI(author._id)}`,
  }));
};

module.exports.getPoems = async (textQuery, page = 0) => {
  const total = await totalCount(textQuery);
  const poems = await getPoems(textQuery, page, pageSize);

  return {
    poems,
    page,
    total,
  };
};

module.exports.getPoemsByAuthor = async (author, textQuery, page = 0) => {
  const total = await totalAuthorPoems(author);
  const poems = await getPoemsByAuthor(author, textQuery, page, pageSize);

  return {
    poems,
    page,
    total,
  };
};
