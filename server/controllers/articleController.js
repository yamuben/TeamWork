/* eslint-disable max-len */
import dotenv from 'dotenv';
import artInfos from '../model/artmodel';
import verifytoken from '../helpers/tokens';
import commentsInfo from '../model/comments_model';


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
// ................................................

        static edit_article = (req, res) => {
          const token = req.header('user-auth-token');
          const decode = verifytoken.verifyToken(token);
          let { articleId } = req.params;
          articleId = articleId.trim();
          const article = articles.find(a => a.id === parseInt(articleId, 10));
          const index = articles.indexOf(article);
          // console.log('*****************');
          // console.log(index);
          const idemployExist = articles.find(i => (i.authorId === decode.Id) && (i.id === index + 1));
          // const artIdExist = articles.find(i=>i.id === index+1);
          if (!idemployExist) {
            return res.status(404).send({ status: 404, error: 'Id is not found !' });
          }


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

          // console.log(article);

          article.title = req.body.title;
          article.article = req.body.article;
          article.createdOn = createdOn;
          article.date_integer = date_integer;

          articles.sort((a, b) => b.date_integer - a.date_integer);
          // console.log(articles);
          return res.status(200).json({
            status: 200,
            message: 'article SUCCESFULLY Edited',
            Data: {
              Title: article.title,
              Article: article.article,
              Date: article.createdOn,

            },
          });
        };

        // ........................................
    static getall_article = (req, res) => {
      const data = articles.sort((a, b) => b.date_integer - a.date_integer);
      data.forEach((art) => { delete art.date_integer; });

      return res.status(200).json({
        status: 200,
        message: 'success',
        data,
      });
    };

// ......................................................
static post_comment = (req, res) => {
  const token = req.header('user-auth-token');
  const decode = verifytoken.verifyToken(token);

  const commId = comments.length + 1;
  let { articleId } = req.params;
  articleId = articleId.trim();
  articleId = parseInt(articleId, 10);
  const article = articles.find(a => a.id === articleId);
  const index = articles.indexOf(article);

  const articleIdExist = articles.find(i => i.id === index + 1);
  if (!articleIdExist) {
    return res.status(404).send({ status: 404, error: 'Id is not found !' });
  }

  // eslint-disable-next-line new-cap
  const comm = new commentsInfo(
    commId, req.body.comment, articleId, decode.Id,
  );

  comments.push(comm);
  // console.log(comments);

  return res.status(200).json({
    status: 200,
    message: 'relevant success message',
    Data: {
      CreatedOn: article.createdOn,
      ArticleTitle: article.title,
      Article: article.article,
      comment: comm.comment,

    },
  });
}


}
export default { articleController, articles };
