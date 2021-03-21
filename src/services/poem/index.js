const redis = require("../../helpers/redis");
const { memoize } = require("../cache/memoize");
const log = require('../logging').child({
  tag: 'poem-service',
})
const pageSize = 5;

const authorPoemMaps = new Map();

const getAuthorFromDB = async (authorName) => {
  if (authorPoemMaps.has(authorName)) {
    return authorPoemMaps.get(authorName);
  } else {
    const authorItem = await redis.hget("poets", authorName)
    const author = JSON.parse(authorItem);
    authorPoemMaps.set(authorName, author);
    return author;
  }
}

const getPoemByUrl = async (url) => {
  const poem = await redis.hget("poems", url)
  return JSON.parse(poem)
}

const computeStartAndEnd = (page, total) => {
  if (total <= pageSize) return [0, total];
  if (page == 0) {
    return [0, pageSize]
  }
  const start = pageSize * (page - 1)
  if (start >= total - pageSize) {
    return [total - pageSize, total];
  }
  return [start, start + pageSize];
}

const getPoemsByAuthor = async (authorName, page = 0) => {
  if (!authorName || authorName.length === 0) throw new Error("Author's name should not be omitted.")
  const author = await getAuthorFromDB(authorName.split(" ").join("_"))
  const links = author["links"]
  const [start, end] = computeStartAndEnd(page, links.length);
  const promises = links.slice(start, end).map(url => getPoemByUrl(url));
  const poems = await Promise.all(promises);

  return {
    poems,
    start,
    end,
    total: links.length
  }
}

const getRandomPoemByAuthor = async (authorName) => {
  if (!authorName || authorName.length === 0) throw new Error("Author's name should not be omitted.")
  const author = await getAuthorFromDB(authorName.split(" ").join("_"))
  const links = author["links"]
  const randomIndex = Math.floor(Math.random() * links.length)
  return getPoemByUrl(links[randomIndex])
}

module.exports.getPoemsByAuthor = memoize(getPoemsByAuthor, 'fetch_poems_by_author')
module.exports.getRandomPoemByAuthor = memoize(getRandomPoemByAuthor, 'fetch_random_poems_by_author', 60 * 1000)
