class Article {
    constructor(id, id_users, title, field, nb_likes, nb_dislikes, nb_comments, post_date) {
	this.id = id;
	this.id_users = id_users;
	this.title = title;
	this.field = field;
	this.nb_likes = nb_likes || 0;
	this.nb_dislikes = nb_dislikes || 0;
	this.nb_comments = nb_comments || 0;
	this.post_date = post_date;
    }
}
