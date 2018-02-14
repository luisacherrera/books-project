'use strict';

const mongoose = require('mongoose');

mongoose.Promise = Promise;
mongoose.connect('mongodb://localhost/project-bookstore', {
  keepAlive: true,
  reconnectTries: Number.MAX_VALUE
});

const Book = require('../models/book');

const bookData = [
  { title: 'Instrumental',
    author: 'James Rhodes',
    description: 'James Rhodes\' passion for music has been his absolute lifeline. It has been the thread that has held him together through a life that has encompassed abuse, breakdown and addiction. Listening to Rachmaninov on a loop as a traumatised teenager or discovering an Adagio by Bach while in a psychiatric ward - such exquisite miracles of musical genius have helped him survive his demons, and, along with a chance encounter with a stranger, inspired him to become the renowned concert pianist he is today. This is a memoir like no other: unapologetically candid, boldly outspoken and surprisingly funny - James\' prose is shot through with an unexpectedly mordant wit, even at the darkest of moments. An impassioned tribute to the therapeutic powers of music, Instrumental also weaves in fascinating facts about how classical music actually works and about the extraordinary lives of some of the great composers. It explains why and how music has the potential to transform all of our lives.',
    owner: 'Vlad',
    archived: false
  },
  { title: 'The Hitchhiker\'s Guide to the Galaxy',
    author: 'Douglas Adams',
    description: 'Seconds before Earth is demolished to make way for a galactic freeway, Arthur Dent is plucked off the planet by his friend Ford Prefect, a researcher for the revised edition of The Hitchhiker’s Guide to the Galaxy who, for the last fifteen years, has been posing as an out-of-work actor. Together, this dynamic pair began a journey through space aided by a galaxyful of fellow travelers: Zaphod Beeblebrox, the two-headed, three-armed, ex-hippie and totally out-to-lunch president of the galaxy; Trillian (formerly Tricia McMillan), Zaphod’s girlfriend, whom Arthur tried to pick up at a cocktail party once upon a time zone; Marvin, a paranoid, brilliant, and chronically depressed robot; and Veet Voojagig, a former graduate student obsessed with the disappearance of all the ballpoint pens he’s bought over the years. Where are these pens? Why are we born? Why do we die? For all the answers, stick your thumb to the stars!',
    owner: 'Vlad',
    archived: false
  },
  { title: 'The Opposite of Loneliness',
    author: 'Marina Keegan',
    description: 'An affecting and hope-filled posthumous collection of essays and stories from the talented young Yale graduate whose title essay captured the world’s attention in 2012 and turned her into an icon for her generation. Marina Keegan’s star was on the rise when she graduated magna cum laude from Yale in May 2012. She had a play that was to be produced at the New York International Fringe Festival and a job waiting for her at the New Yorker. Tragically, five days after graduation, Marina died in a car crash. As her family, friends, and classmates, deep in grief, joined to create a memorial service for Marina, her unforgettable last essay for the Yale Daily News, “The Opposite of Loneliness,” went viral, receiving more than 1.4 million hits. She had struck a chord.',
    owner: 'Vlad',
    archived: false
  },
  { title: 'Lord of the Flies',
    author: 'William Golding',
    description: 'The book focuses on a group of British boys stranded on an uninhabited island and their disastrous attempt to govern themselves.',
    owner: 'Ironhack',
    archived: false
  },
  { title: 'The Fellowship of the Ring',
    author: ' J.R.R. Tolkien',
    description: 'One Ring to rule them all, One Ring to find them, One Ring to bring them all and in the darkeness bind them. In ancient times the Rings of Power were crafted by the Elven-smiths, and Sauron, The Dark Lord, forged the One Ring, filling it with his own power so that he could rule all others. But the One Ring was taken from him, and though he sought it throughout Middle-earth, it remained lost to him. After many ages it fell into the hands of Bilbo Baggins, as told in The Hobbit. In a sleepy village in the Shire, young Frodo Baggins finds himself faced with an immense task, as his elderly cousin Bilbo entrusts the Ring to his care. Frodo must leave his home and make a perilous journey across Middle-earth to the Cracks of Doom, there to destroy the Ring and foil the Dark Lord in his evil purpose.',
    owner: 'Ironhack',
    archived: false
  },
  { title: 'The Two Towers',
    author: ' J.R.R. Tolkien',
    description: 'The Fellowship was scattered. Some were bracing hopelessly for war against the ancient evil of Sauron. Some were contending with the treachery of the wizard Saruman. Only Frodo and Sam were left to take the accursed Ring of Power to be destroyed in Mordor–the dark Kingdom where Sauron was supreme. Their guide was Gollum, deceitful and lust-filled, slave to the corruption of the Ring. Thus continues the magnificent, bestselling tale of adventure begun in The Fellowship of the Ring, which reaches its soul-stirring climax in The Return of the King.',
    owner: 'Ironhack',
    archived: false
  },
  { title: 'The Return of the King',
    author: ' J.R.R. Tolkien',
    description: 'The Companions of the Ring have become involved in separate adventures as the quest continues. Aragorn, revealed as the hidden heir of the ancient Kings of the West, joined with the Riders of Rohan against the forces of Isengard, and took part in the desperate victory of the Hornburg. Merry and Pippin, captured by Orcs, escaped into Fangorn Forest and there encountered the Ents. Gandalf returned, miraculously, and defeated the evil wizard, Saruman. Meanwhile, Sam and Frodo progressed towards Mordor to destroy the Ring, accompanied by SmEagol--Gollum, still obsessed by his \'precious\'. After a battle with the giant spider, Shelob, Sam left his master for dead; but Frodo is still alive--in the hands of the Orcs. And all the time the armies of the Dark Lord are massing. J.R.R. Tolkien\'s great work of imaginative fiction has been labeled both a heroic romance and a classic fantasy fiction. By turns comic and homely, epic and diabolic, the narrative moves through countless changes of scene and character in an imaginary world which is totally convincing in its detail.',
    owner: 'Ironhack',
    archived: false
  },
  { title: 'A Game of Thrones',
    author: 'George R.R. Martin',
    description: 'Long ago, in a time forgotten, a preternatural event threw the seasons out of balance. In a land where summers can last decades and winters a lifetime, trouble is brewing. The cold is returning, and in the frozen wastes to the north of Winterfell, sinister and supernatural forces are massing beyond the kingdom’s protective Wall. At the center of the conflict lie the Starks of Winterfell, a family as harsh and unyielding as the land they were born to. Sweeping from a land of brutal cold to a distant summertime kingdom of epicurean plenty, here is a tale of lords and ladies, soldiers and sorcerers, assassins and bastards, who come together in a time of grim omens. Here an enigmatic band of warriors bear swords of no human metal; a tribe of fierce wildlings carry men off into madness; a cruel young dragon prince barters his sister to win back his throne; and a determined woman undertakes the most treacherous of journeys. Amid plots and counterplots, tragedy and betrayal, victory and terror, the fate of the Starks, their allies, and their enemies hangs perilously in the balance, as each endeavors to win that deadliest of conflicts: the game of thrones.',
    owner: 'Ironhack',
    archived: false
  },
  { title: 'A Clash of Kings',
    author: 'George R.R. Martin',
    description: 'Time is out of joint. The summer of peace and plenty, ten years long, is drawing to a close, and the harsh, chill winter approaches like an angry beast. Two great leaders—Lord Eddard Stark and Robert Baratheon—who held sway over an age of enforced peace are dead...victims of royal treachery. Now, from the ancient citadel of Dragonstone to the forbidding shores of Winterfell, chaos reigns, as pretenders to the Iron Throne of the Seven Kingdoms prepare to stake their claims through tempest, turmoil, and war. As a prophecy of doom cuts across the sky—a comet the color of blood and flame—six factions struggle for control of a divided land. Eddard\'s son Robb has declared himself King in the North. In the south, Joffrey, the heir apparent, rules in name only, victim of the scheming courtiers who teem over King\'s Landing. Robert\'s two brothers each seek their own dominion, while a disfavored house turns once more to conquest. And a continent away, an exiled queen, the Mother of Dragons, risks everything to lead her precious brood across a hard hot desert to win back the crown that is rightfully hers.',
    owner: 'Ironhack',
    archived: false
  },
  { title: 'A Storm of Swords',
    author: 'George R.R. Martin',
    description: 'Here is the third volume in George R.R. Martin\'s magnificent cycle of novels that includes A Game of Thrones and A Clash of Kings. Together, this series comprises a genuine masterpiece of modern fantasy, destined to stand as one of the great achievements of imaginative fiction. Of the five contenders for power, one is dead, another in disfavor, and still the wars rage as alliances are made and broken. Joffrey sits on the Iron Throne, the uneasy ruler of the Seven Kingdoms. His most bitter rival, Lord Stannis, stands defeated and disgraced, victim of the sorceress who holds him in her thrall. Young Robb still rules the North from the fortress of Riverrun. Meanwhile, making her way across a blood-drenched continent is the exiled queen, Daenerys, mistress of the only three dragons still left in the world. And as opposing forces manoeuver for the final showdown, an army of barbaric wildlings arrives from the outermost limits of civilization, accompanied by a horde of mythical Others—a supernatural army of the living dead whose animated corpses are unstoppable. As the future of the land hangs in the balance, no one will rest until the Seven Kingdoms have exploded in a veritable storm of swords...',
    owner: 'Ironhack',
    archived: false
  },
  { title: 'A Feast for Crows',
    author: 'George R.R. Martin',
    description: 'With A Feast for Crows, Martin delivers the long-awaited fourth volume of the landmark series that has redefined imaginative fiction and stands as a modern masterpiece in the making. After centuries of bitter strife, the seven powers dividing the land have beaten one another into an uneasy truce. But it\'s not long before the survivors, outlaws, renegades, and carrion eaters of the Seven Kingdoms gather. Now, as the human crows assemble over a banquet of ashes, daring new plots and dangerous new alliances are formed while surprising faces—some familiar, others only just appearing—emerge from an ominous twilight of past struggles and chaos to take up the challenges of the terrible times ahead. Nobles and commoners, soldiers and sorcerers, assassins and sages, are coming together to stake their fortunes...and their lives. For at a feast for crows, many are the guests—but only a few are the survivors',
    owner: 'Ironhack',
    archived: false
  },
  { title: 'A Dance with Dragons',
    author: 'George R.R. Martin',
    description: 'In the aftermath of a colossal battle, the future of the Seven Kingdoms hangs in the balance—beset by newly emerging threats from every direction. In the east, Daenerys Targaryen, the last scion of House Targaryen, rules with her three dragons as queen of a city built on dust and death. But Daenerys has thousands of enemies, and many have set out to find her. As they gather, one young man embarks upon his own quest for the queen, with an entirely different goal in mind. Fleeing from Westeros with a price on his head, Tyrion Lannister, too, is making his way to Daenerys. But his newest allies in this quest are not the rag-tag band they seem, and at their heart lies one who could undo Daenerys’s claim to Westeros forever.',
    owner: 'Ironhack',
    archived: false
  },
  { title: '1984',
    author: 'George Orwell',
    description: 'Among the seminal texts of the 20th century, Nineteen Eighty-Four is a rare work that grows more haunting as its futuristic purgatory becomes more real. Published in 1949, the book offers political satirist George Orwell\'s nightmare vision of a totalitarian, bureaucratic world and one poor stiff\'s attempt to find individuality. The brilliance of the novel is Orwell\'s prescience of modern life--the ubiquity of television, the distortion of the language--and his ability to construct such a thorough version of hell. Required reading for students since it was published, it ranks among the most terrifying novels ever written.',
    owner: 'Ironhack',
    archived: false
  },
  { title: 'Homage to Catalonia',
    author: 'George Orwell',
    description: 'In 1936 Orwell went to Spain to report on the Civil War and instead joined the fight against the Fascists. This famous account describes the war and Orwell’s experiences. ',
    owner: 'Ironhack',
    archived: false
  },
  { title: 'Animal Farm',
    author: 'George Orwell',
    description: 'As ferociously fresh as it was more than a half century ago, this remarkable allegory of a downtrodden society of overworked, mistreated animals, and their quest to create a paradise of progress, justice, and equality is one of the most scathing satires ever published. As we witness the rise and bloody fall of the revolutionary animals, we begin to recognize the seeds of totalitarianism in the most idealistic organization; and in our most charismatic leaders, the souls of our cruelest oppressors.',
    owner: 'Ironhack',
    archived: false
  },
  { title: 'Lolito',
    author: 'Ben Brooks',
    description: 'Lolito is a love story about a fifteen year-old boy who meets a middle-aged woman on the internet. When his long-term girlfriend and first love Alice betrays him at a house party, Etgar goes looking for cyber solace in the arms of Macy, a stunning but bored housewife he meets online. What could possibly go wrong...? Hilarious, fearless and utterly outrageous, Lolito is a truly twenty-first century love story.',
    owner: 'Vlad',
    archived: false
  },
  { title: 'Grow Up',
    author: 'Ben Brooks',
    description: 'Who says youth is wasted on the young? One thing I have learned from being alive for seventeen years is that people like to touch things very much. Things that people like to touch: Vaginas. Expensive things in shops. Jelly that is not ready to eat yet. Cigarette lighters. Necks. Dead Things. Dogs. Piercings. Toddlers\' cheeks. Each other\'s knees. People also like to touch death. Jasper wants to get on in the world, but he\'s got a lot on his plate: A-levels, his mother pushing him to overachieve, weekly visits to his psychologist, comedowns, YouTube suicides and pregnant one-night-stands. Then there\'s his stepdad - the murderer. Hilarious and heartbreaking by turns, Grow Up is the ultimate twenty-first-century coming-of-age novel. It paints a vivid portrait of the pills and thrills and bellyaches of growing up today. Funny, smart and twisted, it is the story of one young man transformed.',
    owner: 'Ironhack',
    archived: false
  },
  { title: 'Lullaby',
    author: 'Chuck Palahniuk',
    description: 'Carl Streator is a reporter investigating Sudden Infant Death Syndrome for a soft-news feature. After responding to several calls with paramedics, he notices that all the dead children were read the same poem from the same library book the night before they died. It\'s a \'culling song\' - an ancient African spell for euthanising sick or old people. Researching it, he meets a woman who killed her own child with it accidentally. He himself accidentally killed his own wife and child with the same poem twenty years earlier. Together, the man and the woman must find and destroy all copies of this book, and try not to kill every rude sonofabitch that gets in their way. Lullaby is a comedy/drama/tragedy. In that order. It may also be Chuck Palahniuk\'s best book yet.',
    owner: 'Vlad',
    archived: false
  },
  { title: 'Fight Club',
    author: 'Chuck Palahniuk',
    description: 'Every weekend, in basements and parking lots across the country, young men with good white-collar jobs and absent fathers take off their shoes and shirts and fight each other barehanded for as long as they have to. Then they go back to those jobs with blackened eyes and loosened teeth and the sense that they can handle anything. Fight Club is the invention of Tyler Durden, projectionist, waiter and dark, anarchic genius. And it\'s only the beginning of his plans for revenge on a world where cancer support groups have the corner on human warmth.',
    owner: 'Ironhack',
    archived: false
  },
  { title: 'Invisible Monsters Remix',
    author: 'Chuck Palahniuk ',
    description: 'Injected with new material and special design elements, Invisible Monsters Remix fulfills Chuck Palahniuk’s original vision for his 1999 novel, turning a daring satire on beauty and the fashion industry into an even more wildly unique reading experience. Palahniuk’s fashion-model protagonist has it all—boyfriend, career, loyal best friend—until an accident destroys her face, her ability to speak, and her self-esteem. Enter Brandy Alexander, Queen Supreme, one operation away from becoming a bona-fide woman. Laced in are new chapters of memoir and further scenes with the book’s characters. Readers will jump between chapters, reread the book to understand the dissolve between fiction and fact, and decipher the playful book design, embarking on a ride they’ll never forget.',
    owner: 'Ironhack',
    archived: false
  }
];

Book.create(bookData, (err, docs) => {
  if (err) {
    throw err;
  }

  docs.forEach((book) => {
    console.log(book.title);
  });

  mongoose.connection.close();
});
