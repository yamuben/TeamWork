/* eslint-disable max-len */
import dotenv from 'dotenv';
import artInfos from '../model/artmodel';
import verifytoken from '../helpers/tokens';
import commentsInfo from '../model/comments_model';


const articles = [];
const comments = [];


dotenv.config();

class articleController {
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

      const myarticle = articles.find((u)=>u.articleId===artid);
      return res.status(201).json({
        Status: 201,
        Message: 'Article  successfully created',
        Data: {
          Title: myarticle.title,
          Article: myarticle.article,
          CreatedOn: myarticle.createdOn,
          ArticleID: myarticle.articleId,
          
        },
      });
    };


    // ................................................

static delete_article = (req, res) => {
  let { articleId } = req.params;
  articleId = articleId.trim();


  const token = req.header('user-auth-token');
  const decode = verifytoken.verifyToken(token);

  const article = articles.find(a => a.articleId === parseInt(articleId, 10));
  if(!article){
    return res.status(404).send({ Status: 404, Error: 'Article id is not found !' });
  }
  const index = articles.indexOf(article);

  const artIdExist = articles.find(i => (i.articleId === parseInt(articleId))  && (i.authorId === decode.Id));
  if (!artIdExist) {
    return res.status(401).send({ Status: 401, Error: 'You are not Authorised on this Article' });
  }
  const myarticle = articles.find(u=>(u.articleId===parseInt(articleId)));
  console.log(myarticle);
  articles.splice(index, 1);

  articles.sort((a, b) => b.date_integer - a.date_integer);
  
  return res.status(201).json({
    Status: 201,
    Message: 'Article deleted successfuly',
    Data: {
      Title: myarticle.title,
      Article: myarticle.article,
      CreatedOn: myarticle.createdOn,
      ArticleID: myarticle.articleId,
      
    },

    });
};
// ................................................

        static edit_article = (req, res) => {
          const token = req.header('user-auth-token');
          const decode = verifytoken.verifyToken(token);
          let { articleId } = req.params;
          articleId = articleId.trim();
          const article = articles.find(a => a.articleId === parseInt(articleId, 10));
          const index = articles.indexOf(article);

          if(!article){
            return res.status(404).send({ Status: 404, Error: 'Article id is not found !' });
          }
        
      

          const idemployExist = articles.find(i => (i.authorId === decode.Id) && (i.articleId === index + 1));
          if (!idemployExist) {
            return res.status(401).send({ Status: 401, Error: 'You are not Authorised on this Article' });
          }
          const myarticle = articles.find(u=>(u.articleId===parseInt(articleId)));
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
            Status: 200,
            Message: 'Article succesfully modified',
            Data: {
              Title: myarticle.title,
              Article: myarticle.article,
              CreatedOn: myarticle.createdOn,
              ArticleID: myarticle.articleId,
              

            },
          });
        };

        // ........................................
    static getall_article = (req, res) => {
      const Data =articles.sort((a, b) => b.date_integer - a.date_integer);
      //const middle = articles.slice(1,articles.length-1);
      Data.forEach((art) => { delete art.date_integer; });
      return res.status(200).json({
        Status: 200,
        Message: 'success',
        Data,
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
  const article = articles.find(a => a.articleId === articleId);
  const index = articles.indexOf(article);

  const articleIdExist = articles.find(i => i.articleId === index + 1);
  if (!articleIdExist) {
    return res.status(404).send({ Status: 404, Error: 'Id is not found !' });
  }

  // eslint-disable-next-line new-cap
  const comm = new commentsInfo(
    commId, req.body.comment, articleId, decode.Id,
  );

  comments.push(comm);
  // console.log(comments);

  const myarticle = comments.find(u => u.comment_id === commId)
  return res.status(200).json({
    Status: 200,
    Message: 'Comment added successfuly',
    Data: {
      Title: article.title,
      Article: article.article,
      AuthorId: article.authorId,
      ArticleID: article.articleId, 
      Comment: myarticle.comment,
      CreatedOn: myarticle.date,
      CommentId: myarticle.comment_id,

    },
  });
}

// ...........................................................
static view_article=(req, res) => {
  let { articleId } = req.params;
  articleId = articleId.trim();


  const art = articles.sort((a, b) => (b.date_integer - a.date_integer));
  // eslint-disable-next-line no-shadow
  art.forEach((art) => { delete art.date_integer; });

  const Data = art.find(a => a.articleId === parseInt(articleId, 10));
  if (!Data) {
    return res.status(404).send({ Status: 404, Error: 'Id is not found !' });
  }
  const Comment = comments.filter(a => a.articleId === Data.articleId);
  // console.log('*********COMMENTS*************');
  // console.log(comments);
  return res.status(200).json({
    Status: 200,
    Data,
    Comment,
  });
}
}
export default { articleController, articles };
