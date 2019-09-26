
import dotenv from 'dotenv';

dotenv.config();

class commentsInfo {
  // ..........................................
  constructor(id, comments, articleid, authorId) {
    this.comment_id = id;
    this.comment = comments;
    this.articleId = articleid;
    this.authorId = authorId;
  }
}
export default commentsInfo;
