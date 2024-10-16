from app.models import db, Post, environment, SCHEMA
from sqlalchemy.sql import text

def seed_posts():

    #7 Habits
    post1 = Post(
        title='How has this book changed the way you live and work?',
        user_id = 1,
        book_id = 1,
        text = '''Hello everyone,
        I recently revisited Stephen Covey's classic book, The 7 Habits of Highly Effective People, and I wanted to share some thoughts and insights. This book has had a profound impact on many people, including myself, as it provides a holistic approach to personal and professional effectiveness.

        Covey's habits emphasize character ethics and personal responsibility, and I believe they are especially relevant in today's fast-paced world. The first three habits focus on personal mastery: being proactive, beginning with the end in mind, and putting first things first. These habits encourage us to take control of our lives and prioritize what truly matters. The next three habits focus on interdependence, teaching us the importance of collaboration and understanding others through win-win thinking, seeking first to understand before being understood, and synergizing. Finally, the seventh habit, "sharpen the saw," reminds us to continually renew ourselves in various aspects of life—physical, mental, emotional, and spiritual.

        I would love to hear your thoughts on the book! Have any of you implemented these habits in your lives? Which habits do you find the most challenging, and how have they made a difference in your personal or professional life?
        '''
    )

    #Dune
    post2 = Post(
        title='Was Star Wars influenced by Dune?',
        user_id = 6,
        book_id = 11,
        text = '''Hello everyone,
        The influence of Frank Herbert's Dune on George Lucas's Star Wars is a fascinating topic that reveals the interconnectedness of science fiction literature and cinema. Dune, published in 1965, introduced readers to a rich tapestry of political intrigue, ecological themes, and a messianic hero, all set against the backdrop of the desert planet Arrakis. Lucas drew on these elements to create his own galaxy, incorporating complex narratives about power and the consequences of resource control, seen in both the spice melange of Dune and the various sources of power within the Star Wars universe, such as the Force.

        One of the most striking parallels between the two works is the concept of a chosen one. Paul Atreides, the central character in Dune, grapples with his identity as the prophesied Kwisatz Haderach, much like Luke Skywalker, who is presented as the chosen one to restore balance to the Force. Both characters embark on journeys that explore themes of destiny and personal sacrifice, but the paths they take highlight different aspects of leadership and the burden of responsibility. This interplay between personal growth and larger political movements adds depth to their stories, making them resonate with audiences across generations.

        Visually, the two franchises also share similarities. Lucas was inspired by the vivid descriptions in Dune, particularly the unique ecosystems and creatures found in Herbert's universe. The desert landscapes of Arrakis can be compared to Tatooine, where key events in Star Wars unfold. The blending of science fiction and fantasy elements creates immersive worlds in both narratives, captivating viewers and readers alike. As we explore these connections, it becomes evident that Dune laid much of the groundwork for what would become one of the most beloved franchises in film history.
        '''
    )

    post3 = Post(
        title='Comparing the Recent Dune Movie to the Book',
        user_id = 4,
        book_id = 11,
        text = '''Hello everyone,
        As a long-time fan of Frank Herbert's Dune, I was excited to see Denis Villeneuve's recent film adaptation. Overall, I think it captures the essence of the book, but there are notable differences that impact the story and characters. First, the pacing of the film is much faster than the book, which allows for stunning visuals but sacrifices some of the intricate world-building and character development present in the text. In the book, Herbert meticulously builds the socio-political landscape of Arrakis, the significance of spice, and the deep-rooted tensions between different factions. While the film does touch on these themes, it does't explore them in the same detail.

        Another major difference is the portrayal of certain characters. For example, the character of Lady Jessica is more nuanced in the book, with her internal struggles and motivations more thoroughly explored. The film provides glimpses of her complexity but doesn't delve as deeply into her psyche. Furthermore, the ending of the film feels incomplete, as it only covers the first half of the book. This leaves some plot points unresolved and may confuse viewers unfamiliar with the source material.

        Ultimately, while Villeneuve's Dune is visually stunning and remains faithful to the book's spirit, it simplifies some of the depth that makes Herbert's novel so rich. I'd love to hear other perspectives on how the film compares to the book—what did you all think of the differences, and did they enhance or detract from your overall experience?
        '''
    )

    db.session.add(post1)
    db.session.add(post2)
    db.session.add(post3)
    db.session.commit()


def undo_posts():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.posts RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM posts"))

    db.session.commit()
