
import dotenv from 'dotenv';

dotenv.config();

class artInfos {
  // ..........................................
  constructor(id, title, article, id_emplo, dateposted, date_integer) {
    this.articleId = id;
    this.title = title;
    this.article = article;
    this.authorId = id_emplo;
    this.createdOn = dateposted;
    this.date_integer = date_integer;
  }
}
export default artInfos;
