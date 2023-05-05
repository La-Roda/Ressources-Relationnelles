class Comment {
    constructor(id, id_users, id_article, field, nb_likes, nb_dislikes, post_date) {
	this.id = id;
	this.id_users = id_users;
	this.id_article = id_article;
	this.field = field;
	this.nb_likes = nb_likes || 0;
	this.nb_dislikes = nb_dislikes || 0;
	this.post_date = post_date;
    }
}
