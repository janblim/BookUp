from app.models import db, Book, environment, SCHEMA
from sqlalchemy.sql import text

def seed_books():
    books = {
        "The 7 Habits of Highly Effective People":
            {
            "user_id": 1,
            "author": 'Stephen R. Covey',
            "description": '''
            The 7 Habits of Highly Effective People, authored by Stephen R. Covey, presents a comprehensive framework for personal and professional effectiveness grounded in principles of integrity and character. The first three habits—Be Proactive, Begin with the End in Mind, and Put First Things First—focus on self-mastery and personal responsibility. They encourage individuals to take initiative, define clear goals, and prioritize actions that align with their values. By fostering a proactive mindset and setting a vision for the future, individuals can direct their efforts toward achieving meaningful outcomes and managing their time effectively.

            The latter four habits—Think Win-Win, Seek First to Understand, Then to Be Understood, Synergize, and Sharpen the Saw—center around interpersonal effectiveness and continuous growth. Covey emphasizes the importance of collaboration and empathetic communication, encouraging a mindset that seeks mutual benefits in relationships and values diverse perspectives. The final habit promotes self-renewal in physical, mental, emotional, and spiritual dimensions, underscoring that personal effectiveness is a continuous journey of growth and improvement. Together, these habits provide a holistic approach to achieving success and fulfillment in both personal and professional spheres.
            ''',
            'amazon': 'url',
            "genre": 'Self Help',
            "cover": 'https://bookup-project.s3.us-east-2.amazonaws.com/7_Habits.jpg'
            }
        ,
        "1984":
            {
            "user_id": 1,
            "author": 'George Orwell',
            "description": '''
            1984, a dystopian novel by George Orwell, is set in a totalitarian society where the Party, led by the enigmatic figure Big Brother, exerts complete control over the lives of its citizens. The story follows Winston Smith, a low-ranking member of the Party who works at the Ministry of Truth, where he alters historical records to fit the Party's propaganda. As Winston becomes increasingly disillusioned with the oppressive regime, he yearns for truth and individual freedom. He engages in a forbidden love affair with Julia, a fellow Party member, and together they explore their rebellious thoughts against the Party's stringent surveillance and oppressive ideology.

            The novel explores themes of totalitarianism, psychological manipulation, and the erosion of individuality. Orwell vividly depicts a world where language is distorted through Newspeak, history is rewritten to maintain the Party's dominance, and citizens are constantly monitored through telescreens. As Winston's rebellion intensifies, he discovers the harsh realities of living in a society devoid of freedom, culminating in his tragic confrontation with the Party's relentless power. 1984 serves as a powerful warning about the dangers of unchecked authority, the manipulation of truth, and the fragility of personal autonomy, making it a timeless critique of oppressive regimes.
            ''',
            'amazon': 'url',
            "genre": 'Science Fiction',
            'cover': 'https://bookup-project.s3.us-east-2.amazonaws.com/1984.jpg'
            },

        "Brave New World":
            {
            "user_id": 1,
            "author": 'Aldous Huxley',
            "description": '''
            Brave New World, written by Aldous Huxley, is a dystopian novel set in a technologically advanced future where society is engineered for stability and happiness. In this world, human beings are artificially created and conditioned for specific roles through genetic engineering and psychological manipulation. Citizens are kept docile and content by the use of a drug called soma, which eliminates discomfort and promotes a superficial sense of well-being. The novel follows Bernard Marx, an Alpha-plus who feels alienated from the conformist society, and his experiences with Lenina Crowne, a beta worker, as they navigate a world that prioritizes pleasure and consumerism over individuality and deep emotional connections.

            As the story unfolds, Bernard's dissatisfaction leads him to seek out the "Savage Reservation," where he encounters John, a young man born outside the confines of the World State. John's contrasting perspective on life and values poses a profound challenge to the principles of the World State. Through his interactions with Bernard and Lenina, John confronts the emptiness of a society that sacrifices genuine emotions, art, and family for the sake of stability and pleasure. Brave New World serves as a cautionary tale about the potential consequences of technological advancement, social engineering, and the loss of individuality, ultimately questioning the true meaning of happiness and freedom in a conformist world.
            ''',
            'amazon': 'url',
            'genre': 'Science Fiction',
            'cover': 'https://bookup-project.s3.us-east-2.amazonaws.com/A_Brave_New_World.jpg'
            },

        "A Room of One's Own":
            {
            "user_id": 1,
            "author": 'Virginia Woolf',
            "description": '''
            A Room of One's Own, written by Virginia Woolf, is an extended essay that explores the theme of women and fiction, emphasizing the importance of financial independence and personal space for women writers. Woolf argues that in order to create art and literature, women must have both the literal and metaphorical "room" to express themselves freely. Through a blend of narrative and analysis, she examines the historical constraints faced by women, highlighting the societal barriers that have restricted their access to education, resources, and opportunities in the literary world. Woolf employs fictional anecdotes and historical references, including the story of Shakespeare's hypothetical sister, to illustrate how the lack of a supportive environment and financial autonomy stifles women's creative potential.

            Throughout the essay, Woolf advocates for the need for women to reclaim their voice and assert their presence in literature. She critiques the patriarchal structures that have dominated the literary canon and calls for a reevaluation of how women's experiences and contributions are valued. Woolf's work is a rallying cry for gender equality, emphasizing that a woman's ability to write is intimately connected to her economic and social freedom. By blending personal reflection with broader feminist theory, A Room of One's Own remains a seminal text in feminist literature, inspiring generations of women to seek independence and creative expression in their lives.
            ''',
            'amazon': 'url',
            'genre': 'Feminism',
            'cover': 'https://bookup-project.s3.us-east-2.amazonaws.com/A_Room_of_Ones_Own.jpg'
            },

        "Branches Over the Wall":
            {
            "user_id": 1,
            "author": 'Ora Pate Stewart',
            "description": '''
            Branches Over the Wall, by Ora Pate Stewart, is a re-telling of the Book of Mormon. The Book of Mormon is a sacred text of the Latter Day Saint movement, published by Joseph Smith in 1830. It purports to be a translation of ancient records written by prophets in the Americas, detailing the history, teachings, and prophecies of these civilizations. The narrative begins with a group of Israelites fleeing Jerusalem around 600 B.C. and ultimately settling in the Americas, where they establish various societies and cultures over the centuries. Central to the text are the accounts of prominent figures, such as Nephi, Alma, and Moroni, whose spiritual journeys and teachings highlight the principles of faith, redemption, and the importance of following God's commandments.

            The Book of Mormon emphasizes the concept of Jesus Christ as the Savior of all humanity, revealing His visit to the Americas after His resurrection, where He teaches the people and establishes His gospel among them. The text explores themes of morality, social justice, and the consequences of pride and wickedness, ultimately conveying a message of hope and divine love. Through its complex narrative and doctrinal teachings, The Book of Mormon serves as a companion to the Bible, inviting readers to explore its messages about faith, repentance, and the quest for spiritual truth. As a foundational scripture for millions of believers, it continues to influence the beliefs and practices of members of The Church of Jesus Christ of Latter-day Saints and others who find meaning in its teachings.
            ''',
            'amazon': 'url',
            'genre': 'History',
            'cover': 'https://bookup-project.s3.us-east-2.amazonaws.com/Brances_Over_the_Wall.jpg'
            },


        "Catch-22":
            {
            "user_id": 1,
            "author": 'Joseph Heller',
            "description": '''
            Catch-22, written by Joseph Heller, is a darkly comedic novel set during World War II that explores the absurdities and contradictions of military life. The story follows Captain John Yossarian, a U.S. Army Air Forces B-25 bombardier who is desperate to maintain his sanity and survive the war. Yossarian and his fellow soldiers are caught in a bureaucratic nightmare defined by the infamous "Catch-22" rule: a soldier can be declared insane and unfit to fly combat missions if he requests to be grounded; however, by making such a request, he demonstrates a rational thought process and thus is considered sane enough to continue flying. This paradox encapsulates the novel's critique of the illogical and self-perpetuating nature of bureaucratic systems.

            Through a non-linear narrative filled with colorful characters and absurd scenarios, Heller deftly illustrates the madness of war and the moral dilemmas faced by individuals in the face of dehumanizing institutions. The novel employs satire to highlight the hypocrisy of military and political authority, as well as the absurdity of trying to find meaning in a chaotic world. With its sharp wit and poignant observations, Catch-22 remains a powerful commentary on the futility of war and the struggles of the individual against an oppressive system, resonating with readers across generations. Its exploration of existential themes and the quest for agency amid overwhelming odds has solidified its place as a modern literary classic.
            ''',
            'amazon': 'url',
            'genre': 'Fiction',
            'cover': 'https://bookup-project.s3.us-east-2.amazonaws.com/Catch_22.jpg'
            },

        "Children of Dune":
            {
            "user_id": 1,
            "author": 'Frank Herbert',
            "description": '''
            Children of Dune, the third novel in Frank Herbert's seminal Dune series, continues the epic saga set in the desert planet of Arrakis. The story unfolds several years after the events of Dune Messiah, focusing on the twin children of Paul Atreides, Leto II and Ghanima, as they navigate the treacherous political landscape of their father's empire. With Paul's prescient vision weighing heavily on them, Leto and Ghanima grapple with the legacy of their father's rule, the nature of power, and the burden of their own abilities. As they confront external threats from rival factions and internal strife within the imperial court, the twins must also contend with their own identities and the moral implications of their heritage.

            The novel intricately explores themes of destiny, power, and transformation, as Leto II embarks on a path that will irrevocably change him and the future of humanity. Through the introduction of new characters and the deepening of existing relationships, Herbert delves into the complexities of leadership and the struggle for control over one's fate. The desert landscape of Arrakis continues to play a pivotal role, serving as both a physical and symbolic backdrop for the characters' journeys. Children of Dune ultimately examines the consequences of prescience and the sacrifices required for survival, making it a compelling continuation of the Dune saga and a thought-provoking exploration of human potential and the challenges of governance.
            ''',
            'amazon': 'url',
            'genre': 'Science Fiction',
            'cover': 'https://bookup-project.s3.us-east-2.amazonaws.com/Childrend_of_dune.jpg'
            },


        "Cultivating the Mind of Love":
            {
            "user_id": 1,
            "author": 'Thich Nhat Hanh',
            "description": '''
            Cultivating the Mind of Love by Thich Nhat Hanh is a profound exploration of love and compassion as fundamental aspects of the human experience. In this work, the renowned Vietnamese Zen master emphasizes the importance of cultivating a mindful and loving approach to oneself and others to foster deeper connections and promote peace in a chaotic world. Thich Nhat Hanh draws on Buddhist teachings and practices, illustrating how mindfulness can transform relationships and enhance emotional well-being. Through simple yet powerful exercises, he guides readers in developing awareness and understanding of their thoughts and feelings, encouraging a nurturing attitude toward themselves that can radiate outward to others.

            The book highlights the transformative power of love when combined with mindfulness and understanding. Thich Nhat Hanh discusses various forms of love, including self-love, familial love, and romantic love, and how they can be cultivated through mindful practices such as deep breathing and meditation. He also addresses common obstacles to love, such as fear, anger, and misunderstanding, offering practical insights on how to overcome these barriers. Cultivating the Mind of Love serves as both a spiritual guide and a practical handbook, encouraging readers to embrace love as an active practice that can lead to greater harmony in their lives and the world around them. Through his gentle and compassionate approach, Thich Nhat Hanh inspires readers to cultivate a mind of love that fosters connection, understanding, and joy.
            ''',
            'amazon': 'url',
            'genre': 'Self Help',
            'cover': 'https://bookup-project.s3.us-east-2.amazonaws.com/Cultivating_the_mind_of_love.jpg'
            },

        "Dracula":
            {
            "user_id": 1,
            "author": 'Bram Stoker',
            "description": '''
            Dracula, written by Bram Stoker and published in 1897, is a Gothic horror novel that tells the chilling story of Count Dracula's attempt to move from Transylvania to England in search of new blood and to spread the undead curse. The narrative unfolds through a series of journal entries, letters, and newspaper articles, allowing readers to witness the events from multiple perspectives. The story begins with Jonathan Harker, a young solicitor, who travels to Dracula's castle to assist him with a real estate transaction. Soon, Harker realizes he is a prisoner in the castle and encounters the Count's otherworldly powers. As Dracula arrives in England, he begins to prey upon Lucy Westenra and later Mina Harker, Jonathan's fiancée, plunging the characters into a terrifying battle against the supernatural.

            The novel explores themes of fear, desire, and the clash between modernity and ancient superstition, effectively capturing the anxieties of Victorian society. As the characters, including Dr. John Seward, Arthur Holmwood, and Professor Abraham Van Helsing, unite to confront Dracula, they delve into the darker aspects of human nature and the monstrous potential within. Stoker's vivid imagery and masterful use of suspense create an atmosphere of dread and fascination, making Dracula a cornerstone of Gothic literature. The novel not only established the archetype of the vampire in popular culture but also provoked discussions about sexuality, immigration, and the struggle between good and evil, leaving an enduring impact on literature and horror fiction.
            ''',
            'amazon': 'url',
            'genre': 'Fiction',
            'cover': 'https://bookup-project.s3.us-east-2.amazonaws.com/Dracula.jpg'
            },

        "Dune Messiah":
            {
            "user_id": 1,
            "author": 'Frank Herbert',
            "description": '''
            Dune Messiah, the second book in Frank Herbert's iconic Dune series, continues the saga of Paul Atreides, now Emperor of the Known Universe, following his rise to power in the first novel. Set twelve years after the events of Dune, the story delves into the complexities of leadership and the burdens of prescience that Paul faces as he grapples with the consequences of his rise to power. Despite achieving his goal of becoming emperor, Paul finds himself ensnared in a web of political intrigue, betrayal, and the weight of expectations from his followers, the Fremen. The novel explores themes of messianic prophecy, the moral dilemmas of power, and the inherent challenges of governance as Paul confronts the dark ramifications of his vision for the future.

            In Dune Messiah, Paul's internal conflict deepens as he struggles with the consequences of his own actions and the violent jihad waged in his name. The narrative introduces new characters, including the enigmatic Scytale, a Face Dancer sent by the Bene Tleilax, who plots against Paul, and Chani, Paul's beloved wife, who faces her own challenges as the mother of his children. As Paul's prescient visions become increasingly troubling, he grapples with his identity and the implications of his role as the Kwisatz Haderach. The novel ultimately serves as a meditation on the cost of power and the complexities of destiny, posing critical questions about free will and the nature of leadership. Through its intricate plot and philosophical underpinnings, Dune Messiah deepens the exploration of the Dune universe, setting the stage for further developments in the epic saga.
            ''',
            'amazon': 'url',
            'genre': 'Science Fiction',
            'cover': 'https://bookup-project.s3.us-east-2.amazonaws.com/Dune_Messiah.jpg'
            },


        "Dune":
            {
            "user_id": 1,
            "author": 'Frank Herbert',
            "description": '''
            Dune, written by Frank Herbert and first published in 1965, is a seminal science fiction novel set in a distant future where interstellar travel and feudal societies coexist. The story follows young Paul Atreides, heir to the noble House Atreides, as his family is given control of the desert planet Arrakis, also known as Dune. Arrakis is the only source of the universe's most valuable substance, the spice melange, which grants heightened awareness and extends life. However, the planet is fraught with danger, inhabited by giant sandworms and a hostile native population known as the Fremen. As political intrigue unfolds, the Atreides family faces treachery from rival House Harkonnen, leading to a power struggle that could alter the fate of the galaxy.

            As Paul navigates this perilous landscape, he grapples with his burgeoning abilities and the weight of prophecy, discovering that he may be the Kwisatz Haderach, a superbeing foretold to bring balance to the universe. The novel intricately weaves themes of ecology, religion, and the complex interplay between politics and power, illustrating how the control of spice dictates the fates of entire worlds. Through Paul's journey of self-discovery and transformation, Herbert explores profound questions about destiny, leadership, and the consequences of human ambition. Dune is celebrated not only for its rich world-building and complex characters but also for its commentary on environmentalism and the human condition, establishing it as a cornerstone of the science fiction genre.
            ''',
            'amazon': 'url',
            'genre': 'Science Fiction',
            'cover': 'https://bookup-project.s3.us-east-2.amazonaws.com/Dune.jpg'
            },

        "Epigrams":
            {
            "user_id": 1,
            "author": 'Oscar Wilde',
            "description": '''
            Epigrams, a collection of witty and sharp aphorisms by Oscar Wilde, showcases the author's mastery of language and his ability to convey profound insights with brevity and humor. Wilde, known for his flamboyant style and keen social observations, uses these epigrams to critique societal norms, explore the complexities of human nature, and reflect on art and morality. Each statement is crafted with precision, often employing paradox and irony, which not only entertains but also provokes deeper thought about the absurdities of life and the contradictions inherent in human behavior. Wilde's epigrams are laced with his characteristic wit, making them memorable and quotable, and they reflect his belief that the pursuit of beauty and truth is central to the human experience.

            The collection addresses various themes, including love, friendship, aesthetics, and the nature of happiness. Wilde's epigrams often reveal the superficiality of social conventions and challenge prevailing attitudes toward morality and identity. His ability to distill complex ideas into pithy phrases has cemented his reputation as one of the greatest wit-masters in English literature. Epigrams not only captures Wilde's unique voice and perspective but also serves as a testament to his enduring influence on literature and culture. Readers are invited to appreciate the elegance and depth of his observations, which resonate across time, reminding us of the timeless relevance of humor and insight in understanding the human condition.
            ''',
            'amazon': 'url',
            'genre': 'Fiction',
            'cover': 'https://bookup-project.s3.us-east-2.amazonaws.com/Epigrams.jpg'
            },

        "Fahrenheit 451":
            {
            "user_id": 1,
            "author": 'Ray Bradbury',
            "description": '''
            Fahrenheit 451, authored by Ray Bradbury and published in 1953, is a dystopian novel set in a future society where books are banned, and "firemen" are tasked with burning any that are found. The story follows Guy Montag, a fireman who becomes increasingly disillusioned with his role in a society that suppresses critical thinking and individuality. Montag's journey of self-discovery begins when he encounters Clarisse McClellan, a young woman who challenges his perspective on life and prompts him to question the oppressive norms around him. As he grapples with his growing awareness of the emptiness of his existence and the superficiality of his society, Montag's rebellion against censorship and conformity leads him to seek out knowledge through literature.

            Bradbury's novel explores themes of censorship, the power of knowledge, and the consequences of a society that prioritizes entertainment over critical thought. Through vivid imagery and compelling characters, Fahrenheit 451 critiques the dangers of authoritarianism and the loss of intellectual freedom. Montag's transformation from a conforming fireman to a questioning individual reflects the struggle for personal enlightenment in a world that discourages independent thought. The novel serves as a powerful warning against the perils of complacency and the erosion of civil liberties, making it a timeless and thought-provoking exploration of the importance of literature and the human spirit's resilience against oppression.
            ''',
            'amazon': 'url',
            'genre': 'Science Fiction',
            'cover': 'https://bookup-project.s3.us-east-2.amazonaws.com/fahrenheit_451.jpg'
            },

        "A People's History of the United States":
            {
            "user_id": 1,
            "author": 'Howard Zinn',
            "description": '''
            A People's History of the United States, written by Howard Zinn and first published in 1980, presents an alternative perspective on American history by emphasizing the experiences and struggles of marginalized groups often overlooked in traditional historical narratives. Zinn argues that history should be told from the viewpoint of the people rather than the elites, focusing on the voices of Indigenous peoples, enslaved Africans, women, workers, and civil rights activists. The book spans from the pre-colonial era to contemporary times, chronicling significant events like the American Revolution, the Civil War, and the civil rights movement while highlighting the ongoing struggles against oppression and inequality.

            Zinn's work challenges conventional views of American progress and democracy, asserting that true freedom and justice have often come at the expense of the disenfranchised. He critiques the actions of prominent figures and governments, shedding light on the darker aspects of U.S. history, such as imperialism, racism, and economic exploitation. Through this lens, A People's History of the United States encourages readers to reconsider the foundations of American society and the narratives that shape it. Zinn's engaging writing and commitment to social justice make the book a significant contribution to historical scholarship and a powerful tool for understanding the complexities of the American experience, inspiring readers to reflect on the ongoing struggles for equality and justice.
            ''',
            'amazon': 'url',
            'genre': 'History',
            'cover': 'https://bookup-project.s3.us-east-2.amazonaws.com/A_Peoples_History_of_the_US.jpg'
            },

        "Fear and Trembling":
            {
            "user_id": 1,
            "author": 'Soren Kierkegaard',
            "description": '''
            Fear and Trembling, written by Danish philosopher Søren Kierkegaard and first published in 1843, is a profound exploration of faith, ethics, and the complexities of human existence through the lens of the biblical story of Abraham and Isaac. In this work, Kierkegaard delves into the paradox of faith by examining the moment when Abraham is commanded by God to sacrifice his beloved son, Isaac. Kierkegaard presents the figure of Abraham as a "knight of faith," who embodies the struggle between ethical duty and the absolute demand of faith. Through a series of reflections and interpretations, he grapples with the existential tension that arises when one is faced with a divine command that contradicts moral reasoning, emphasizing the individual's personal relationship with God and the inherent absurdity of faith.

            The book is structured around four main themes: the anxiety of faith, the nature of sacrifice, the distinction between the ethical and the religious, and the concept of the "leap of faith." Kierkegaard's writing is rich with philosophical inquiry, as he challenges readers to consider the nature of true faith and the sacrifices it may demand. He contrasts the ethical life, which adheres to societal norms and obligations, with the religious life, which requires a personal commitment that transcends these norms. Fear and Trembling invites readers to confront the complexities of belief, the nature of choice, and the often uncomfortable demands of faith, ultimately asserting that true faith involves a deep, personal commitment that can lead to both profound fulfillment and existential dread. Through this exploration, Kierkegaard lays the groundwork for modern existential thought, emphasizing the importance of individual choice and the subjective experience of faith.
            ''',
            'amazon': 'url',
            'genre': 'Philosophy',
            'cover': 'https://bookup-project.s3.us-east-2.amazonaws.com/Fear_and_Trembling.jpg'
            },

        "Guns, Germs, and Steel: The Fates of Human Societies":
            {
            "user_id": 1,
            "author": 'Jared Diamond',
            "description": '''
            Guns, Germs, and Steel: The Fates of Human Societies, authored by Jared Diamond and published in 1997, presents a sweeping analysis of the factors that have shaped the course of human history. In this Pulitzer Prize-winning work, Diamond explores the question of why some societies developed advanced technology and political organization while others did not. He argues that environmental differences, rather than inherent differences among peoples, played a crucial role in determining the fates of societies. Through a multidisciplinary approach, Diamond examines the impacts of geography, agriculture, and the domestication of animals on the development of civilizations, emphasizing that access to resources shaped societies' abilities to thrive and conquer.

            The book is structured around the thesis that the availability of domesticable plants and animals, along with the geographic factors that influenced the spread of these resources, laid the groundwork for unequal societal development. Diamond discusses how the introduction of guns and steel technology, as well as the spread of germs due to agricultural practices, facilitated European expansion and conquest in the Americas and beyond. By dissecting the interplay of environmental, biological, and cultural factors, Guns, Germs, and Steel challenges traditional narratives of history that focus solely on racial or cultural superiority. Diamond's work not only provides a comprehensive overview of human history but also encourages readers to reconsider the underlying causes of inequality and the complex web of factors that have shaped our world, prompting discussions about how these insights might inform contemporary issues of development and globalization.
            ''',
            'amazon': 'url',
            'genre': 'History',
            'cover': 'https://bookup-project.s3.us-east-2.amazonaws.com/Guns_germs_and_Steel.jpg'
            },

        "The Handmaid's Tale":
            {
            "user_id": 1,
            "author": 'Margaret Atwood',
            "description": '''
            The Handmaid's Tale, written by Margaret Atwood and published in 1985, is a dystopian novel set in a near-future society known as the Republic of Gilead, where a totalitarian regime has overthrown the United States government. In this oppressive world, environmental disasters and declining birth rates have led to a fertility crisis, prompting the establishment of a strict social order that subjugates women. The narrative is told through the eyes of Offred, a Handmaid whose sole purpose is to bear children for the ruling elite. Offred's story unfolds as she navigates the brutal realities of her existence, including the loss of her autonomy, the constant surveillance, and the rigid class hierarchies that define her life. Through her reflections, Atwood delves into themes of power, gender, and the ways in which societies can manipulate and control individuals.

            Atwood's novel is a powerful exploration of the dangers of extremism and the erosion of personal freedoms in the face of authoritarianism. The book critiques patriarchal structures and the objectification of women, portraying how quickly societal norms can shift towards oppression. As Offred reminisces about her past life, including her family and the freedom she once enjoyed, the stark contrast with her present situation serves as a chilling reminder of the fragility of rights and liberties. The Handmaid's Tale resonates strongly in contemporary discussions about women's rights, reproductive freedom, and the impacts of religious fundamentalism. Atwood's chilling narrative, coupled with her keen social critique, makes the novel a thought-provoking exploration of identity, resistance, and the human spirit's resilience against tyranny.
            ''',
            'amazon': 'url',
            'genre': 'Feminism',
            'cover': 'https://bookup-project.s3.us-east-2.amazonaws.com/handmaids_tale.jpg'
            },

        "Heretics of Dune":
            {
            "user_id": 1,
            "author": 'Frank Herbert',
            "description": '''
            Heretics of Dune, the fifth installment in Frank Herbert's acclaimed Dune series, takes place thousands of years after the events of God Emperor of Dune. The novel delves into the intricate dynamics of a universe transformed by the long reign of Leto II, the God Emperor, who has shaped the course of human evolution and society through his radical vision. Following his death, the political landscape is fraught with intrigue as various factions vie for power and control over the precious spice melange. Central to the narrative is the Bene Gesserit sisterhood, who seek to navigate the shifting alliances and threats posed by the powerful forces of the Honored Matres—an organization of women who have fled the Scattering and now challenge the Bene Gesserit's long-established authority.

            The story primarily follows the character of Miles Teg, a military genius and descendant of the Atreides lineage, as he becomes embroiled in the conflict between the Bene Gesserit and the Honored Matres. Teg's strategic prowess is pivotal in the sisterhood's quest to preserve their traditions and navigate the complexities of a universe filled with dangers and shifting allegiances. Throughout Heretics of Dune, Herbert explores themes of power, identity, and the cyclical nature of history, emphasizing the delicate balance between preservation and change. The novel is rich with philosophical undertones, examining the consequences of leadership and the struggle for survival in a rapidly evolving society. As the characters confront their past and seek to shape the future, Herbert crafts a compelling narrative that continues to expand the intricate mythology of the Dune universe.
            ''',
            'amazon': 'url',
            'genre': 'Science Fiction',
            'cover': 'https://bookup-project.s3.us-east-2.amazonaws.com/Heretics_of_dune.jpg'
            },

        "How to Win Friends & Influence People":
            {
            "user_id": 1,
            "author": 'Dale Carnegie',
            "description": '''
            How to Win Friends and Influence People, written by Dale Carnegie and first published in 1936, is a seminal self-help book that offers practical advice on improving interpersonal skills and building lasting relationships. The book is divided into several sections, each providing key principles for effective communication, persuasion, and social interaction. Carnegie emphasizes the importance of empathy and understanding others' perspectives, advocating for techniques such as active listening, remembering people's names, and showing genuine appreciation. These principles are grounded in the belief that people are motivated by their own desires and that successful interaction hinges on recognizing and respecting those motivations.

            Carnegie's insights are illustrated through numerous anecdotes and real-life examples, making the concepts accessible and relatable. He provides readers with actionable strategies for navigating social situations, whether in personal or professional contexts, and stresses the significance of positive reinforcement over criticism. The book's enduring popularity stems from its timeless wisdom, which transcends cultural and generational boundaries. How to Win Friends and Influence People not only equips readers with the tools to enhance their social skills but also inspires a greater sense of compassion and understanding, fostering deeper connections with others. Its emphasis on genuine human interaction continues to resonate in today's increasingly digital and impersonal world, making it a valuable guide for anyone looking to improve their social effectiveness.
            ''',
            'amazon': 'url',
            'genre': 'Self Help',
            'cover': 'https://bookup-project.s3.us-east-2.amazonaws.com/How_to_Win_Friends_and_Influence_People.jpg'
            },

        "Letters from a Stoic":
            {
            "user_id": 1,
            "author": 'Seneca',
            "description": '''
            Letters from a Stoic, authored by the Roman philosopher Seneca and originally titled Epistulae Morales ad Lucilium, is a collection of 124 letters addressed to his friend Lucilius that delve into Stoic philosophy and practical wisdom. Written during the first century AD, these letters cover a wide range of topics, including the nature of happiness, the importance of virtue, the inevitability of death, and the pursuit of wisdom. Seneca draws upon his own experiences and reflections to offer guidance on how to live a fulfilling and meaningful life amidst the chaos and uncertainties of existence. His accessible prose invites readers to contemplate the power of rational thought and self-discipline, emphasizing that true contentment stems from within rather than from external circumstances.

            In Letters from a Stoic, Seneca not only provides philosophical insights but also addresses the challenges of human emotion and the complexities of moral behavior. He encourages Lucilius—and by extension, his readers—to cultivate resilience, practice mindfulness, and develop a sense of detachment from material possessions. Throughout the letters, Seneca underscores the significance of friendship, the value of solitude, and the importance of engaging in philosophical reflection as tools for personal growth. His teachings resonate with contemporary audiences, as they address universal themes of self-improvement and the search for inner peace. Ultimately, Letters from a Stoic serves as both a philosophical guide and a heartfelt exploration of the Stoic ideal, reminding readers of the enduring relevance of Stoic thought in navigating the challenges of life.
            ''',
            'amazon': 'url',
            'genre': 'Philosophy',
            'cover': 'https://bookup-project.s3.us-east-2.amazonaws.com/Letters_From_A_Stoic.jpg'
            },


        "Man's Search For Meaning":
            {
            "user_id": 1,
            "author": 'Viktor E Frankl',
            "description": '''
            Man's Search for Meaning, written by Viktor E. Frankl and first published in 1946, is a profound psychological exploration of life's purpose through the lens of Frankl's harrowing experiences as a Holocaust survivor. Drawing upon his time spent in Nazi concentration camps during World War II, Frankl delves into the human capacity to find meaning even in the most horrific circumstances. The book is divided into two parts: the first recounts Frankl's experiences in the camps, detailing the psychological struggles and brutal realities faced by inmates, while the second presents his therapeutic approach, known as logotherapy. Frankl argues that the primary drive in human beings is not merely the pursuit of pleasure or power, but rather the quest for meaning in life, which can be found through work, love, and suffering.

            Throughout Man's Search for Meaning, Frankl emphasizes the importance of individual choice and the ability to maintain a sense of purpose despite overwhelming adversity. He illustrates how some individuals could endure unimaginable suffering by finding meaning in their experiences, whether through love for family, personal goals, or spiritual beliefs. Frankl's insights have had a lasting impact on psychology and philosophy, as he highlights the resilience of the human spirit and the significance of personal responsibility in shaping one's destiny. This seminal work not only provides a compelling narrative of survival but also serves as a guide for readers seeking to understand their own lives and find meaning in the face of challenges. Ultimately, Frankl's message is one of hope and empowerment, reminding us that even in the darkest of times, we have the capacity to choose our attitudes and find purpose in our existence.
            ''',
            'amazon': 'url',
            'genre': 'Self Help',
            'cover': 'https://bookup-project.s3.us-east-2.amazonaws.com/Mans_Search_for_Meaning.jpg'
            },

        "Meditations":
            {
            "user_id": 1,
            "author": 'Marcus Aurelius',
            "description": '''
            Meditations, written by the Roman Emperor Marcus Aurelius during the 2nd century AD, is a collection of personal writings that serve as a guide to Stoic philosophy and self-reflection. Originally composed as a series of notes for his own self-improvement, the work reveals Aurelius's thoughts on duty, virtue, and the nature of existence. Divided into twelve books, Meditations captures Aurelius's reflections on the importance of rationality, the transient nature of life, and the inevitability of death. He emphasizes the need for inner peace and resilience in the face of adversity, urging readers to focus on their thoughts and actions rather than external circumstances beyond their control.

            In Meditations, Aurelius articulates key Stoic principles, such as the significance of maintaining a moral character and acting in accordance with reason. He explores themes of compassion, humility, and the interconnectedness of all people, highlighting the value of accepting challenges as opportunities for growth. His reflections are imbued with a sense of mindfulness, encouraging individuals to live authentically and with purpose. The timeless wisdom found in Meditations resonates deeply with modern readers, offering practical advice for navigating life's challenges and cultivating a sense of tranquility amidst chaos. Ultimately, the work serves not only as a philosophical treatise but also as a source of inspiration for those seeking to develop a resilient and virtuous life.
            ''',
            'amazon': 'url',
            'genre': 'Philosophy',
            'cover': 'https://bookup-project.s3.us-east-2.amazonaws.com/Meditations.jpg'
            },

        "Memories, Dreams, Reflections":
            {
            "user_id": 1,
            "author": 'C. G. Jung',
            "description": '''
            Memories, Dreams, Reflections, published posthumously in 1961, is a profound autobiographical work by the Swiss psychiatrist Carl Jung, offering readers a unique glimpse into his life, thoughts, and the development of his psychological theories. Compiled from a series of conversations with his colleague Aniela Jaffé, the book spans Jung's early childhood memories, his formative experiences, and the intellectual and spiritual influences that shaped his pioneering work in depth psychology. Through vivid recollections, Jung reflects on significant moments in his life, including his relationships with family, his professional journey, and his explorations into the unconscious. He discusses his encounters with various cultures, religions, and mythologies, which informed his understanding of archetypes and the collective unconscious.

            In addition to personal anecdotes, Memories, Dreams, Reflections delves into Jung's theoretical contributions, providing insights into concepts such as individuation, the persona, and the shadow. Jung shares his own dreams and visions, illustrating how these experiences contributed to his psychological framework. The book serves as a testament to Jung's belief in the importance of self-discovery and the integration of the unconscious in achieving personal wholeness. His reflections encourage readers to explore their own inner worlds, fostering a deeper understanding of themselves and their place in the universe. Ultimately, this work not only illuminates Jung's life and thought but also offers a rich tapestry of ideas that continue to resonate within the fields of psychology, spirituality, and personal development.
            ''',
            'amazon': 'url',
            'genre': 'Psychology',
            'cover': 'https://bookup-project.s3.us-east-2.amazonaws.com/Memories_Dreams_Reflections.jpg'
            },

        "Pride and Prejudice":
            {
            "user_id": 1,
            "author": 'Jane Austen',
            "description": '''
            Pride and Prejudice, written by Jane Austen and published in 1813, is a classic novel that explores themes of love, social class, and individual agency in early 19th-century England. The story follows the intelligent and spirited Elizabeth Bennet, one of five sisters in the Bennet family, as she navigates the complexities of society, family expectations, and romantic entanglements. Central to the narrative is Elizabeth's evolving relationship with the wealthy and reserved Mr. Darcy, whose initial pride and aloofness clash with her prejudice against him. Through witty dialogue and keen social commentary, Austen examines the constraints placed on women in her time and critiques the class distinctions that influence personal relationships.

            The novel is renowned for its rich character development, particularly that of Elizabeth and Darcy, who undergo significant growth throughout the story. Elizabeth's sharp wit and independence challenge societal norms, while Darcy's journey towards humility and understanding reflects a broader commentary on the importance of character over social status. As the plot unfolds, misunderstandings and societal pressures create tension and conflict, leading to moments of revelation and transformation. Pride and Prejudice remains a timeless exploration of human relationships, highlighting the importance of self-awareness, empathy, and the need to look beyond first impressions. Austen's masterful storytelling, combined with her incisive critique of social mores, has secured the novel's place as a beloved literary work, resonating with readers across generations.
            ''',
            'amazon': 'url',
            'genre': 'Fiction',
            'cover': 'https://bookup-project.s3.us-east-2.amazonaws.com/Pride_and_prejudice.jpg'
            },


        "Siddhartha":
            {
            "user_id": 1,
            "author": 'Hermann Hesse',
            "description": '''
            Siddhartha, written by Hermann Hesse and published in 1922, is a philosophical novel that follows the spiritual journey of a young man named Siddhartha during the time of the Buddha in ancient India. Born into a privileged family of Brahmins, Siddhartha is expected to follow in his father's footsteps and attain spiritual enlightenment through traditional teachings and rituals. However, feeling constrained by societal expectations and the limitations of conventional wisdom, he embarks on a quest for deeper understanding and meaning in life. Siddhartha's journey takes him through various stages, including asceticism, indulgence in sensual pleasures, and eventually, a profound realization of the interconnectedness of all life.

            Throughout the novel, Hesse explores themes of self-discovery, the search for enlightenment, and the nature of existence. Siddhartha encounters a range of characters who influence his journey, including the Buddha, whom he ultimately respects but chooses not to follow. Instead, he learns that true wisdom comes from personal experience rather than doctrine. The narrative emphasizes the importance of listening to one's inner voice and finding one's own path. Through Siddhartha's experiences, Hesse illustrates the idea that enlightenment is not a destination but a continuous journey of growth and self-awareness. Siddhartha remains a timeless exploration of spirituality and the human experience, resonating with readers seeking to understand their place in the world and the nature of fulfillment.
            ''',
            'amazon': 'url',
            'genre': 'Philosophy',
            'cover': 'https://bookup-project.s3.us-east-2.amazonaws.com/Siddartha.jpg'
            },

        "The Demon-Haunted World: Science as a Candle in the Dark":
            {
            "user_id": 1,
            "author": 'Carl Sagan',
            "description": '''
            The Demon-Haunted World: Science as a Candle in the Dark, written by Carl Sagan and published in 1995, is a compelling exploration of the importance of scientific thinking and skepticism in a world increasingly influenced by superstition, pseudoscience, and irrational beliefs. Sagan argues that the survival of civilization depends on our ability to differentiate between science and nonscience, emphasizing the need for critical thinking and empirical evidence. Through engaging narratives and vivid examples, he critiques the prevalence of unscientific phenomena, such as UFO sightings, alien abductions, and other forms of magical thinking, which often distract from the pursuit of knowledge and understanding of the universe.

            In addition to his critique of pseudoscience, Sagan passionately advocates for scientific literacy as a means of empowering individuals and fostering a more informed society. He discusses the scientific method, the importance of skepticism, and the value of inquiry, urging readers to adopt a curious and open-minded approach to the world around them. Sagan also reflects on the human capacity for wonder and the need to understand our place in the cosmos, encouraging readers to appreciate the beauty of scientific discovery while remaining vigilant against the seductive allure of unreasoned beliefs. The Demon-Haunted World serves as both a defense of science and a clarion call for a more rational and scientifically informed society, inspiring readers to cultivate a sense of inquiry and skepticism that can illuminate the darkest corners of human thought and culture.
            ''',
            'amazon': 'url',
            'genre': 'Science',
            'cover': 'https://bookup-project.s3.us-east-2.amazonaws.com/Demon_Haunted_World.jpg'
            },

        "Slaughterhouse-Five":
            {
            "user_id": 1,
            "author": 'Kurt Vonnegut',
            "description": '''
            Slaughterhouse-Five, written by Kurt Vonnegut and published in 1969, is a unique blend of science fiction, anti-war sentiment, and autobiography that explores the devastating effects of war on the human psyche. The novel follows the life of Billy Pilgrim, a World War II soldier who becomes "unstuck in time," experiencing moments from his life out of chronological order. Central to the narrative is Billy's harrowing experience as a prisoner of war during the bombing of Dresden, a traumatic event that serves as a backdrop for his fragmented recollections. Through this non-linear storytelling, Vonnegut captures the absurdity and horror of war, illustrating how trauma can distort reality and perception.

            Vonnegut employs a mix of humor, irony, and poignant reflection to critique the glorification of war and the futility of violence. The novel's iconic phrase, "so it goes," punctuates moments of death and destruction, highlighting the inevitability of mortality and the randomness of life. As Billy navigates his experiences, including encounters with extraterrestrial beings known as Tralfamadorians, the narrative delves into themes of fatalism, free will, and the cyclical nature of time. Slaughterhouse-Five stands as a powerful commentary on the human condition, urging readers to confront the impacts of war and the complexities of existence. Through its innovative structure and profound insights, the novel remains a significant work in American literature, resonating with audiences who grapple with the consequences of conflict and the search for meaning in an often chaotic world.
            ''',
            'amazon': 'url',
            'genre': 'Science Fiction',
            'cover': 'https://bookup-project.s3.us-east-2.amazonaws.com/slaughterhouse_five.jpg'
            },


        "Song of Solomon":
            {
            "user_id": 1,
            "author": 'Tony Morrison',
            "description": '''
            Song of Solomon, written by Toni Morrison and published in 1977, is a richly layered novel that explores themes of identity, heritage, and the search for self within the African American experience. The story follows Macon "Milkman" Dead III, who grows up in a wealthy family in Michigan but feels disconnected from his roots and his community. As Milkman embarks on a quest to uncover his family's history, he navigates the complexities of race, love, and the significance of personal legacy. Morrison intricately weaves in elements of folklore, myth, and magic realism, allowing Milkman's journey to serve as both a literal and symbolic exploration of flight, freedom, and the quest for identity.

            Throughout the novel, Morrison addresses the impact of history and trauma on individual lives and relationships. Milkman's exploration leads him back to his ancestral home in Pennsylvania, where he discovers the rich legacy of his ancestors, particularly the stories surrounding his grandfather, Solomon, who is said to have flown back to Africa. This journey not only helps Milkman understand his familial ties but also prompts deeper reflections on the nature of belonging and the connection to one's roots. Song of Solomon is celebrated for its lyrical prose and profound insights into the African American experience, as well as its exploration of universal themes of love, loss, and the quest for meaning. Through Milkman's transformative journey, Morrison illuminates the importance of understanding one's heritage in the pursuit of personal and collective identity.
            ''',
            'amazon': 'url',
            'genre': 'Fiction',
            'cover': 'https://bookup-project.s3.us-east-2.amazonaws.com/Song-of-Solomon.jpg'
            },

        "Tao Te Ching":
            {
            "user_id": 1,
            "author": 'Stephen Mitchell',
            "description": '''
            Tao Te Ching, translated by Stephen Mitchell, is a poetic and philosophical text attributed to the ancient Chinese philosopher Laozi, foundational to Taoist thought and spirituality. This translation, published in 1988, aims to capture the essence and beauty of the original work, presenting its timeless wisdom in a manner that is both accessible and lyrical. The text is composed of 81 short chapters, each offering insights into the nature of the Tao (the Way) and the principles of harmony, simplicity, and balance. Mitchell's interpretation emphasizes the importance of living in accordance with the natural flow of life, promoting ideas such as humility, compassion, and the value of non-action (wu wei) as pathways to achieving peace and understanding.

            Mitchell's Tao Te Ching invites readers to reflect on the interconnectedness of all things and the significance of embracing life's mysteries rather than seeking to control them. The work encourages a deep appreciation for simplicity and spontaneity, challenging conventional notions of power and success. Through its profound aphorisms and evocative imagery, the text encourages individuals to cultivate inner stillness and awareness, allowing them to align with the rhythms of nature and the universe. Tao Te Ching remains a beloved and influential work, resonating with readers seeking spiritual insight and guidance in navigating the complexities of life, making Mitchell's translation a cherished rendition of this classic philosophical masterpiece.
            ''',
            'amazon': 'url',
            'genre': 'Philosophy',
            'cover': 'https://bookup-project.s3.us-east-2.amazonaws.com/Tao_Te_Ching.jpg'
            },


        "The Color Purple":
            {
            "user_id": 1,
            "author": 'Alice Walker',
            "description": '''
            The Color Purple, written by Alice Walker and published in 1982, is a powerful and poignant novel that explores the struggles and resilience of African American women in the early 20th century American South. The story is told through a series of letters written by Celie, an impoverished African American girl who faces unimaginable hardships, including sexual abuse, racism, and the oppression of women. The narrative unfolds as Celie grows from a silenced victim into a strong, self-aware individual who learns to assert her identity and find her voice. Through her relationships with other women, particularly her sister Nettie and the strong-willed Shug Avery, Celie discovers the importance of love, solidarity, and personal agency in a world filled with violence and discrimination.

            Walker's novel is celebrated for its rich character development and exploration of themes such as love, empowerment, and the quest for self-identity. The title itself, referring to the color purple, symbolizes the beauty and richness of life that Celie learns to embrace despite her suffering. The book also addresses broader social issues, including gender inequality and the intersectionality of race and class, making it a seminal work in feminist and African American literature. Through its heartfelt storytelling and authentic voices, The Color Purple resonates with readers by illustrating the transformative power of resilience, love, and sisterhood. Ultimately, Walker's novel serves as a testament to the strength of the human spirit in the face of adversity, inspiring generations to advocate for justice and equality.
            ''',
            'amazon': 'url',
            'genre': 'Fiction',
            'cover': 'https://bookup-project.s3.us-east-2.amazonaws.com/The_color_purple.jpg'
            },

        "The Creature from Jekyll Island: A Second Look at the Federal Reserve":
            {
            "user_id": 1,
            "author": 'G. Edward Griffin',
            "description": '''
            The Creature from Jekyll Island: A Second Look at the Federal Reserve, written by G. Edward Griffin and published in 1994, is a critical examination of the origins and operations of the Federal Reserve System in the United States. Griffin presents a compelling narrative that traces the formation of the Federal Reserve back to a secretive meeting held in 1910 on Jekyll Island, Georgia, where a group of influential bankers and politicians conspired to create a central banking system that would serve their interests. The book outlines the historical context, economic theories, and the motivations behind the establishment of the Federal Reserve, arguing that it has resulted in a significant transfer of wealth and power from the general public to a small elite.

            Griffin critiques the Federal Reserve's impact on the American economy, suggesting that its policies lead to inflation, economic instability, and the erosion of individual liberties. He delves into the complexities of monetary policy and the implications of a fiat currency system, where money is not backed by a physical commodity like gold. Through a combination of historical analysis, economic theory, and political commentary, The Creature from Jekyll Island challenges the conventional understanding of the Federal Reserve, positing that it operates more like a private cartel than a government institution. The book has sparked considerable debate and discussion among readers interested in economics, politics, and the implications of central banking, making it a provocative work that encourages critical thinking about financial systems and their influence on society.
            ''',
            'amazon': 'url',
            'genre': 'History',
            'cover': 'https://bookup-project.s3.us-east-2.amazonaws.com/The_Creature_from_Jekyll_Island.jpg'
            },

        "The Feeling Good Handbook":
            {
            "user_id": 1,
            "author": 'David D. Burns, MD',
            "description": '''
            The Feeling Good Handbook, written by Dr. David D. Burns and first published in 1980, is a comprehensive guide to cognitive behavioral therapy (CBT) aimed at helping individuals combat depression, anxiety, and negative thought patterns. Drawing on his extensive clinical experience, Dr. Burns presents a variety of practical techniques designed to empower readers to identify and challenge their cognitive distortions—unrealistic or overly negative thoughts that can lead to feelings of hopelessness and despair. The handbook is structured to be user-friendly, providing exercises, worksheets, and real-life examples that allow readers to engage actively with the material and apply the strategies to their own lives.

            In addition to addressing the symptoms of depression, The Feeling Good Handbook emphasizes the importance of self-compassion and the development of a positive mindset. Dr. Burns introduces concepts such as "thought records" and "mood logs," which help individuals track their emotions and the thoughts associated with them, facilitating a deeper understanding of their mental health. The book also includes discussions on interpersonal relationships, assertiveness, and the influence of self-esteem on overall well-being. With its accessible language and actionable advice, The Feeling Good Handbook has resonated with countless readers, establishing itself as a seminal work in the field of self-help and psychotherapy, ultimately empowering individuals to cultivate a more positive and fulfilling life.
            ''',
            'amazon': 'url',
            'genre': 'Psychology',
            'cover': 'https://bookup-project.s3.us-east-2.amazonaws.com/The_Feeling_Good_Handbook.jpg'
            },


        "The Grapes of Wrath":
            {
            "user_id": 1,
            "author": 'John Steinbeck',
            "description": '''
            The Grapes of Wrath, written by John Steinbeck and published in 1939, is a powerful novel that chronicles the struggles of the Joad family during the Great Depression as they are forced to leave their Oklahoma farm due to the Dust Bowl and economic hardships. The story follows Tom Joad, who returns home from prison to find his family struggling to survive amid poverty and despair. The Joads embark on a harrowing journey to California, lured by the promise of work and a better life, only to confront the harsh realities of exploitation, discrimination, and the dehumanizing conditions faced by migrant workers. Steinbeck's vivid prose and rich character development highlight the resilience of the human spirit amidst adversity, portraying the Joads as emblematic of the broader struggle faced by many during this tumultuous period in American history.

            Steinbeck's novel delves into themes of social justice, family, and community, emphasizing the importance of solidarity in the face of oppression. The narrative intertwines the personal and the political, revealing the systemic inequalities that exacerbate the plight of the impoverished and disenfranchised. As the Joads encounter numerous challenges, including poverty, hunger, and exploitation by large agribusinesses, they form connections with other migrant families, illustrating the strength found in unity. The Grapes of Wrath serves as a poignant critique of capitalism and its impact on society, while also celebrating the enduring hope and resilience of individuals in their quest for dignity and belonging. The novel remains a significant work in American literature, resonating with readers for its timeless exploration of human suffering and the search for justice.
            ''',
            'amazon': 'url',
            'genre': 'Fiction',
            'cover': 'https://bookup-project.s3.us-east-2.amazonaws.com/The_Grapes_of_Wrath.jpg'
            },


        "The Great Gatsby":
            {
            "user_id": 1,
            "author": 'F. Scott Fitzgerald',
            "description": '''
            The Great Gatsby, written by F. Scott Fitzgerald and published in 1925, is a seminal novel set in the Roaring Twenties that explores themes of wealth, love, and the American Dream. The story is narrated by Nick Carraway, a Yale graduate and World War I veteran who moves to West Egg, Long Island, where he becomes entangled in the lives of his mysterious neighbor, Jay Gatsby, and his cousin, Daisy Buchanan. Gatsby, a self-made millionaire, is known for his extravagant parties and unrelenting desire to win back Daisy, with whom he had a romantic relationship before the war. As the narrative unfolds, Nick uncovers the complexities of Gatsby's life, the hollowness of the upper class, and the elusive nature of the American Dream, ultimately highlighting the gap between aspiration and reality.

            Through its vivid characters and rich symbolism, The Great Gatsby critiques the moral decay and superficiality of the 1920s, revealing the darker sides of wealth and privilege. Fitzgerald masterfully portrays the Jazz Age as a time of excess, yet also of profound disillusionment, as individuals grapple with their unfulfilled desires and the consequences of their choices. The green light at the end of Daisy's dock serves as a powerful symbol of Gatsby's unattainable dreams, encapsulating the longing for a future that is perpetually out of reach. With its exploration of love, identity, and the fragility of dreams, The Great Gatsby has secured its place as a classic of American literature, offering timeless insights into human nature and the societal forces that shape our lives.
            ''',
            'amazon': 'url',
            'genre': 'Fiction',
            'cover': 'https://bookup-project.s3.us-east-2.amazonaws.com/The_Great_Gatsby.jpg'
            },

        "The Hobbit":
            {
            "user_id": 1,
            "author": 'J.R.R. Tolkien',
            "description": '''
            The Hobbit, written by J.R.R. Tolkien and first published in 1937, is a classic fantasy novel that introduces readers to the enchanting world of Middle-earth. The story follows Bilbo Baggins, a quiet and unassuming hobbit who enjoys a peaceful life in his home, Bag End, until the unexpected arrival of the wizard Gandalf and a group of thirteen dwarves led by Thorin Oakenshield disrupts his tranquility. They enlist Bilbo's help on a perilous quest to reclaim the dwarves' homeland and treasure from the fearsome dragon Smaug. Throughout their journey, Bilbo encounters a variety of magical creatures, treacherous landscapes, and formidable foes, gradually evolving from a hesitant participant into a courageous hero.

            Tolkien's narrative is rich with themes of adventure, bravery, and self-discovery, as Bilbo learns to embrace the unexpected challenges that arise. The novel is notable for its imaginative world-building, featuring a diverse array of characters, including elves, trolls, and giant spiders, as well as the enchanting and sometimes perilous settings of Middle-earth. The story also introduces the One Ring, an object of immense power that plays a crucial role in Tolkien's later work, The Lord of the Rings. With its whimsical tone, engaging plot, and profound moral lessons, The Hobbit has captivated generations of readers, establishing itself as a beloved cornerstone of fantasy literature and a timeless tale of courage and personal growth.
            ''',
            'amazon': 'url',
            'genre': 'Fiction',
            'cover': 'https://bookup-project.s3.us-east-2.amazonaws.com/The_Hobbit.jpg'
            },


        "The Republic":
            {
            "user_id": 1,
            "author": 'Plato',
            "description": '''
            Plato's Republic, written around 380 BCE, is a foundational philosophical text that explores the nature of justice, the ideal state, and the qualities of a just individual. Framed as a dialogue led by the philosopher Socrates, the Republic begins with a discussion about the meaning of justice and whether it is better to be just or unjust. Through a series of conversations with various characters, including Glaucon and Thrasymachus, Plato outlines his vision of an ideal society, governed by philosopher-kings who possess both wisdom and virtue. The text presents the allegory of the cave, a powerful metaphor illustrating the difference between the world of appearances and the world of forms, highlighting the philosopher's role in seeking truth and enlightenment.

            The Republic also delves into topics such as the nature of the soul, education, and the organization of society. Plato proposes a tripartite model of the soul, consisting of the rational, spirited, and appetitive parts, each corresponding to different classes in his ideal city: rulers, warriors, and producers. He emphasizes the importance of education in achieving a just society, arguing that the cultivation of virtue is essential for both individuals and the state. Through its rigorous examination of ethics, politics, and philosophy, Plato's Republic remains a seminal work that has profoundly influenced Western thought, prompting ongoing discussions about justice, governance, and the nature of reality. Its exploration of the interplay between individual morality and social structure continues to resonate in contemporary philosophical and political discourse.
            ''',
            'amazon': 'url',
            'genre': 'Philosophy',
            'cover': 'https://bookup-project.s3.us-east-2.amazonaws.com/The_Republic_Plato.jpg'
            },

        "The Selfish Gene":
            {
            "user_id": 1,
            "author": 'Richard Dawkins',
            "description": '''
            The Selfish Gene, written by Richard Dawkins and first published in 1976, is a groundbreaking work that popularizes the gene-centered view of evolution. In this book, Dawkins argues that the primary unit of natural selection is not the individual organism or the species, but rather the gene itself. He introduces the concept of the "selfish gene," suggesting that genes behave in ways that ensure their own survival and replication, often at the expense of the organism's interests. Through engaging explanations and vivid analogies, Dawkins explores complex evolutionary concepts such as altruism, kin selection, and the mechanisms of evolution, arguing that seemingly selfless behaviors can often be understood as strategies for enhancing the reproductive success of one's genetic material.

            Dawkins also delves into the implications of this gene-centric perspective for understanding human behavior and culture. He posits that human actions, social structures, and even cultural phenomena can be viewed through the lens of genetic imperatives, suggesting that our behaviors may be influenced by the evolutionary strategies of our genes. The book introduces the idea of "memes" as units of cultural evolution that replicate and evolve in a manner analogous to genes, expanding the discussion of evolution beyond biology to include cultural transmission. The Selfish Gene has had a significant impact on both the field of biology and popular understanding of evolutionary theory, prompting readers to reconsider the nature of evolution, the motives behind behavior, and the intricate relationships between genes, organisms, and society.
            ''',
            'amazon': 'url',
            'genre': 'Science',
            'cover': 'https://bookup-project.s3.us-east-2.amazonaws.com/The_Selfish_Gene.jpg'
            },


        "The Catcher and the Rye":
            {
            "user_id": 1,
            "author": 'J.D. Salinger',
            "description": '''
            The Catcher in the Rye, written by J.D. Salinger and published in 1951, is a classic novel that follows the experiences of Holden Caulfield, a disenchanted teenager navigating the complexities of adolescence in post-World War II America. The narrative unfolds as Holden recounts his experiences in New York City after being expelled from his prep school, Pencey Prep. Struggling with feelings of alienation and depression, he grapples with the challenges of growing up, the loss of innocence, and his deep-seated disdain for what he perceives as the phoniness of the adult world. Throughout his journey, Holden's internal monologue reveals his vulnerability, intelligence, and longing for connection, making him a relatable and iconic figure in American literature.

            Salinger's novel is renowned for its exploration of themes such as identity, loneliness, and the quest for authenticity. Holden's desire to protect the innocence of children is symbolized in his fantasy of being "the catcher in the rye," where he imagines himself standing in a field of rye, saving children from falling off a cliff into the harsh realities of adulthood. The novel's candid portrayal of teenage angst and its critique of societal expectations resonate with readers of all ages, contributing to its status as a seminal work in American literature. The Catcher in the Rye remains a poignant exploration of the struggles of youth, capturing the complexities of growing up and the universal search for meaning and belonging in an often confusing and alienating world.
            ''',
            'amazon': 'url',
            'genre': 'Fiction',
            'cover': 'https://bookup-project.s3.us-east-2.amazonaws.com/The-Catcher-in-the-Rye.jpg'
            },


        "To Kill a Mockingbird":
            {
            "user_id": 1,
            "author": 'Harper Lee',
            "description": '''
            To Kill a Mockingbird, written by Harper Lee and published in 1960, is a profound and poignant novel set in the racially charged atmosphere of the American South during the 1930s. The story is narrated by Scout Finch, a young girl growing up in the fictional town of Maycomb, Alabama. Through her innocent eyes, readers witness her father, Atticus Finch, a principled lawyer, defend Tom Robinson, a Black man falsely accused of raping a white woman. As the trial unfolds, Scout and her brother Jem grapple with the complexities of morality, justice, and the harsh realities of prejudice in their community. The narrative interweaves themes of empathy, compassion, and the loss of innocence, as the children learn difficult truths about human nature and social inequality.

            Harper Lee's novel is celebrated for its rich character development and exploration of themes such as racial injustice, class, and moral growth. Atticus Finch emerges as a moral beacon, embodying integrity and courage as he stands up against the deep-rooted racism in Maycomb, teaching his children the importance of understanding others and standing up for what is right. The novel also introduces memorable characters such as Boo Radley, the enigmatic neighbor who ultimately symbolizes the idea of true goodness. To Kill a Mockingbird not only addresses the social issues of its time but also invites readers to reflect on their own moral compass and the impact of prejudice in society. It remains a timeless classic, resonating with audiences for its powerful commentary on humanity and the ongoing struggle for justice and equality.
            ''',
            'amazon': 'url',
            'genre': 'Fiction',
            'cover': 'https://bookup-project.s3.us-east-2.amazonaws.com/To_Kill_a_Mockingbird.jpg'
            },

        "Walden":
            {
            "user_id": 1,
            "author": 'Henry David Thoreau',
            "description": '''
            Walden, written by Henry David Thoreau and published in 1854, is a reflection on simple living in natural surroundings. The book is based on Thoreau's experiment of spending two years in a small cabin he built near Walden Pond in Concord, Massachusetts. It serves as both a personal narrative and a philosophical treatise, exploring themes of self-reliance, nature, and the critique of materialism. Thoreau's writing emphasizes the importance of solitude and introspection, encouraging readers to disconnect from societal pressures and connect with the natural world. Through his vivid observations of the changing seasons, wildlife, and his own experiences, Thoreau advocates for a life of purpose, mindfulness, and harmony with nature.

            Thoreau's Walden is not just a manifesto for simple living; it also presents a profound critique of contemporary society, particularly its obsession with progress and consumerism. He argues that true wealth comes from personal experience and an understanding of the natural world rather than material possessions. The book delves into philosophical concepts, including transcendentalism, which emphasizes intuition and spirituality as vital to understanding life. Thoreau's lyrical prose and profound insights invite readers to reconsider their values and the impact of modern civilization on their lives, ultimately inspiring a deeper appreciation for the beauty and simplicity of nature.
            ''',
            'amazon': 'url',
            'genre': 'Philosophy',
            'cover': 'https://bookup-project.s3.us-east-2.amazonaws.com/Walden.jpg'
            }

    }

    for title, attributes in books.items():
        book = Book(title=title, **attributes)
        db.session.add(book)

    db.session.commit()


def undo_books():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.books RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM books"))

    db.session.commit()
