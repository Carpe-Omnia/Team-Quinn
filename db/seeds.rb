tom = User.create(name: "Tomaz", password: "zamot101", email: "tomaz.r.rodrigues@gmail.com", id: 1, inbox_id: 1)
george = User.create(name: "George", password: "butt", email: "george@gaysex.biz", id: 2, inbox_id: 2)
box1 = Inbox.create(user_id: tom.id)
box2 = Inbox.create(user_id: george.id)
bio1 = Bio.create(user_id: tom.id, headline: "new user", content: "user hasn't added content yet")
bio1 = Bio.create(user_id: george.id, headline: "new user", content: "user hasn't added content yet")

everlast = Joke.new
everlast.setup = "What do you call a guy who's girlfriend cheats on him forever"
everlast.punchline = "Cuck Everlasting"
everlast.author = tom

everlast.save

cow = Joke.create(setup: "Knock Knock", punchline: "Interrupting Cow")
cow.author = george
cow.save

eye = Joke.new(setup: "I told my girlfriend she was drawing her eyebrows too heigh", punchline: "She looked surprised")
eye.author = tom
eye.save

convo1 = Conversation.new
convo1.inboxes << box1
convo1.inboxes << box2
convo1.save

mess1 = Message.new
mess1.conversation_id = convo1.id
mess1.from_id = george.id
mess1.to_id = tom.id
mess1.subject = "This is a test message"
mess1.content = "This is the content of the test message"

mess1.save

convo1.messages << mess1

convo1.save
