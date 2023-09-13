describe('Article', () => {
    let article;
  
    beforeEach(() => {
      article = new Article(1, 2, 'Test Title', 'Test Field', 5, 3, 10, new Date());
    });
  
    it('should create a new Article instance', () => {
      expect(article).toBeInstanceOf(Article);
    });
  
    it('should have the correct properties', () => {
      expect(article.id).toBe(1);
      expect(article.id_users).toBe(2);
      expect(article.title).toBe('Test Title');
      expect(article.field).toBe('Test Field');
      expect(article.nb_likes).toBe(5);
      expect(article.nb_dislikes).toBe(3);
      expect(article.nb_comments).toBe(10);
      expect(article.post_date).toBeInstanceOf(Date);
    });
  
    it('should default nb_likes, nb_dislikes, and nb_comments to 0 if not provided', () => {
      const articleWithoutStats = new Article(4, 5, 'Another Test Title', 'Another Test Field', null, null, null, new Date());
      expect(articleWithoutStats.nb_likes).toBe(0);
      expect(articleWithoutStats.nb_dislikes).toBe(0);
      expect(articleWithoutStats.nb_comments).toBe(0);
    });
  });
  