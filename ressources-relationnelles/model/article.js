class Article extends Posts {
  constructor(id, userId, title, content, createdAt, likes, dislikes, comments) {
    super(id, userId, content, createdAt);
    this.title = title;
    this.likes = likes || 0;
    this.dislikes = dislikes || 0;
    this.comments = comments || [];
  }
}
