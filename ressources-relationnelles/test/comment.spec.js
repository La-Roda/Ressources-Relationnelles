describe('Comment', () => {
    let comment;
  
    beforeEach(() => {
      comment = new Comment(1, 2, 3, 'test field', 5, 3, new Date());
    });
  
    it('should create a new Comment instance', () => {
      expect(comment).toBeInstanceOf(Comment);
    });
  
    it('should have the correct properties', () => {
      expect(comment.id).toBe(1);
      expect(comment.id_users).toBe(2);
      expect(comment.id_article).toBe(3);
      expect(comment.field).toBe('test field');
      expect(comment.nb_likes).toBe(5);
      expect(comment.nb_dislikes).toBe(3);
      expect(comment.post_date).toBeInstanceOf(Date);
    });
  
    it('should default nb_likes and nb_dislikes to 0 if not provided', () => {
      const commentWithoutLikesAndDislikes = new Comment(4, 5, 6, 'another test field', null, null, new Date());
      expect(commentWithoutLikesAndDislikes.nb_likes).toBe(0);
      expect(commentWithoutLikesAndDislikes.nb_dislikes).toBe(0);
    });
  });
  