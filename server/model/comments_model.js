
import dotenv from 'dotenv';

dotenv.config();

class commentsInfo {
  // ..........................................
  constructor(id, comments, articleid, authorId) {
  
    this.comment = comments;
    this.comment_id = id;
    this.articleId = articleid;
    this.authorId = authorId;
  }
}
export default commentsInfo;
