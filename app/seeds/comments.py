# from app.models import db, Comment, environment, SCHEMA
# from sqlalchemy.sql import text


# def seed_comments():

#     #7 Habits post 1
#     comment1 = Comment(
#         text='''I read this book a few years ago and it really changed my perspective on productivity. Habit 1, "Be Proactive," really struck a chord with me. It taught me that I have the power to choose my responses to situations rather than reacting impulsively. Since then, I've been more intentional about my actions, and it's made a huge difference in my stress levels.''',
#         user_id = 2,
#         post_id = 1,
#         score = 12,
#         parent_comment_id = None
#     )

#     reply1 = Comment(
#         text='''I agree with you, Marnie! Habit 2, "Begin with the End in Mind," is my favorite. It has helped me set clearer goals in both my personal and professional life. I started using vision boards to visualize my goals, which has made me more focused and motivated. It's amazing how much clearer your path becomes when you know what you're aiming for!''',
#         user_id = 3,
#         post_id = 1,
#         score = 14,
#         parent_comment_id = 1
#     )

#     comment2 = Comment(
#         text='''I find Habit 3, "Put First Things First," to be the most challenging. It's so easy to get caught up in the day-to-day tasks that don't really move me toward my goals. I've started using a priority matrix to help distinguish between what's urgent and important, and it's definitely helped me focus on what truly matters!''',
#         user_id = 3,
#         post_id = 1,
#         score = 5,
#         parent_comment_id = None
#     )

#     comment3 = Comment(
#         text='''I really resonate with Habit 5, "Seek First to Understand, Then to Be Understood." In my relationships, I've found that active listening is crucial. When I focus on understanding others' perspectives, it not only helps me communicate better but also deepens my connections with people.''',
#         user_id = 1,
#         post_id = 1,
#         score = 6,
#         parent_comment_id = None
#     )


#     #Dune post 2

#     comment4 = Comment(
#         text='''I never realized how much Dune influenced Star Wars! It makes total sense when you think about it, especially with the themes of power and politics.''',
#         user_id = 4,
#         post_id = 2,
#         score = 7,
#         parent_comment_id = None
#     )

#     comment5 = Comment(
#         text='''While I agree that Dune had a significant influence, I think Star Wars also brought its own unique elements to the genre. For instance, the hero's journey in Star Wars is more traditional and draws from various mythological sources. In contrast, Dune presents a more complex and morally ambiguous narrative that doesn't follow the classic good vs. evil dichotomy.''',
#         user_id = 8,
#         post_id = 2,
#         score = 11,
#         parent_comment_id = None
#     )

#     reply2 = Comment(
#         text='''You make a great point! The hero's journey in Star Wars is certainly more straightforward, while Dune delves into deeper philosophical questions.''',
#         user_id = 7,
#         post_id = 2,
#         score = 4,
#         parent_comment_id = 5
#     )

#     comment6 = Comment(
#         text='''The desert planet settings are strikingly similar, which is cool, even though I HATE SAND.''',
#         user_id = 12,
#         post_id = 2,
#         score = 14,
#         parent_comment_id = None
#     )

#     comment7 = Comment(
#         text='''I don't like Princess Irulan. She's kind of a push-over. She doesn't do much -- she's at the whim of the people around her.''',
#         user_id = 9,
#         post_id = 2,
#         score = 5,
#         parent_comment_id = None
#     )

#     reply3 = Comment(
#         text='''Narrative device, she is. No more, no less.''',
#         user_id = 11,
#         post_id = 2,
#         score = 7,
#         parent_comment_id = 7
#     )

#     comment8 = Comment(
#         text='''The Emperor of the Known Universe? Give me a break. No powers to speak of. I'm still GOAT''',
#         user_id = 10,
#         post_id = 2,
#         score = 4,
#         parent_comment_id = None
#     )

#     reply4 = Comment(
#         text='''LOL. Just wait.''',
#         user_id = 5,
#         post_id = 2,
#         score = 21,
#         parent_comment_id = 8
#     )


#     #Dune post 3

#     comment9 = Comment(
#         text='''I completely agree with you, SpicyWormer65! The visuals in Villeneuve's adaptation are breathtaking, but I felt that the depth of the political intrigue was lost. In the book, the motivations of the Great Houses and their alliances are intricately woven, creating a rich tapestry of conflict. The film, while beautiful, didn't explore these complexities as thoroughly, which is a shame because it's such a crucial part of the story. I think newcomers to Dune might miss out on a lot of the book's depth without that context.''',
#         user_id = 8,
#         post_id = 3,
#         score = 6,
#         parent_comment_id = None
#     )

#     comment10 = Comment(
#         text='''I think the film did a fantastic job with the visuals and atmosphere, but I also missed some of the internal monologues from Paul. In the book, we get a lot of his thoughts and feelings, which help us understand his character arc better. The film glosses over this, making his transformation feel less impactful. The scenes with the Bene Gesserit, especially, lacked the depth of their political maneuvering and the psychological aspects of their training.''',
#         user_id = 6,
#         post_id = 3,
#         score = 7,
#         parent_comment_id = None
#     )

#     comment11 = Comment(
#         text='''I enjoyed the film, but I found the pacing to be a bit rushed, especially in the second act. Important events feel like they happen in quick succession without enough buildup. For instance, the transition from Paul's training to the major conflict with the Harkonnens felt abrupt. The book spends more time building up to these events, allowing readers to grasp the gravity of the situation. It's essential for the audience to feel the weight of the consequences.''',
#         user_id = 7,
#         post_id = 3,
#         score = 9,
#         parent_comment_id = None
#     )

#     db.session.add(comment1)
#     db.session.add(comment2)
#     db.session.add(comment3)
#     db.session.add(comment4)
#     db.session.add(comment5)
#     db.session.add(comment6)
#     db.session.add(comment7)
#     db.session.add(comment8)
#     db.session.add(comment9)
#     db.session.add(comment10)
#     db.session.add(comment11)

#     db.session.add(reply1)
#     db.session.add(reply2)
#     db.session.add(reply3)
#     db.session.add(reply4)

#     db.session.commit()

# def undo_comments():
#     if environment == "production":
#         db.session.execute(f"TRUNCATE table {SCHEMA}.comments RESTART IDENTITY CASCADE;")
#     else:
#         db.session.execute(text("DELETE FROM comments"))

#     db.session.commit()
