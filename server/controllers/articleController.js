/* eslint-disable max-len */
import dotenv from 'dotenv';
import artInfos from '../model/artmodel';
import verifytoken from '../helpers/tokens';


const articles = [];
const comments = [];


dotenv.config();

class articleController {
  // ........................................


    // ....................................
    static new_article = (req, res) => {
      const token = req.header('user-auth-token');
      const decode = verifytoken.verifyToken(token);

      const artid = articles.length + 1;

      let date_ob = new Date();

      let date = (`0${date_ob.getDate()}`).slice(-2);

      let month = (`0${date_ob.getMonth() + 1}`).slice(-2);

      let year = date_ob.getFullYear();

      let hours = date_ob.getHours();

      let minutes = date_ob.getMinutes();

      let seconds = date_ob.getSeconds();

      const createdOn = `${year}-${month}-${date} ${hours}:${minutes}:${seconds}`;
      // eslint-disable-next-line radix
      const date_integer = parseInt(year + month + date + hours + minutes + seconds);
      // eslint-disable-next-line new-cap
      const art = new artInfos(
        artid, req.body.title, req.body.article, decode.Id, createdOn, date_integer,
      );


      articles.push(art);
      articles.sort((a, b) => b.date_integer - a.date_integer);

      // console.log(articles);
      return res.status(201).json({
        status: 201,
        message: 'article  successfully Created',
        Data: {
          CreatedOn: createdOn,
          Title: art.title,
        },
      });
    };


    // ................................................

static delete_article = (req, res) => {
  let { articleId } = req.params;
  articleId = articleId.trim();


  const token = req.header('user-auth-token');
  const decode = verifytoken.verifyToken(token);

  const article = articles.find(a => a.id === parseInt(articleId, 10));
  const index = articles.indexOf(article);
  // console.log('...................');
  // console.log(article);
  const artIdExist = articles.find(i => (i.id === index + 1) && (i.authorId === decode.Id));
  if (!artIdExist) {
    return res.status(404).send({ status: 404, error: 'Id is not found !' });
  }
  articles.splice(index, 1);

  // console.log(articles);

  articles.sort((a, b) => b.date_integer - a.date_integer);
  return res.status(201).json({
    status: 201,
    message: 'article SUCCESFULLY DELETED',
  });
};

}
export default { articleController, articles };
