const redis = require("../../helpers/redis")
const log = require('../logging').child({
  tag: 'poem-service',
})

const authorPoemMaps = new Map();

const getAuthorFromDB = async (authorName) => {
  if (authorPoemMaps.has(authorName)) {
    return authorPoemMaps.get(authorName);
  } else {
    const authorItem = await redis.hget("poets", authorName)
    const author = JSON.parse(authorItem);
    authorPoemMaps.set(authorName, author);
    log.info("Found author: ", author);
    return author;
  }
}

const getPoemByUrl = async (url) => {
  const poem = await redis.hget("poems", url)
  log.info("Found poem: ", poem);
  return JSON.parse(poem)
}

module.exports.getPoemByAuthor = (authorName) => {
  const author = await getAuthorFromDB(authorName)
  const links = author["links"]
  
  const promises = links.slice(0, 5).map(url => getPoemByUrl(url));
  return Promise.all(promises);
} 
