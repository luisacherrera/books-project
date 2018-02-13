'use strict';

const mongoose = require('mongoose');

mongoose.Promise = Promise;
mongoose.connect('mongodb://localhost/project-bookstore', {
  keepAlive: true,
  reconnectTries: Number.MAX_VALUE
});

const Book = require('../models/book');

const bookData = [
  { title: 'Lolito',
    author: 'Ben Brooks',
    description: 'Lolito is a love story about a fifteen year-old boy who meets a middle-aged woman on the internet. When his long-term girlfriend and first love Alice betrays him at a house party, Etgar goes looking for cyber solace in the arms of Macy, a stunning but bored housewife he meets online. What could possibly go wrong...? Hilarious, fearless and utterly outrageous, Lolito is a truly twenty-first century love story.',
    owner: 'Vlad',
    archived: false
  },
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
  { title: 'Lullaby',
    author: 'Chuck Palahniuk',
    description: 'Carl Streator is a reporter investigating Sudden Infant Death Syndrome for a soft-news feature. After responding to several calls with paramedics, he notices that all the dead children were read the same poem from the same library book the night before they died. It\'s a \'culling song\' - an ancient African spell for euthanising sick or old people. Researching it, he meets a woman who killed her own child with it accidentally. He himself accidentally killed his own wife and child with the same poem twenty years earlier. Together, the man and the woman must find and destroy all copies of this book, and try not to kill every rude sonofabitch that gets in their way. Lullaby is a comedy/drama/tragedy. In that order. It may also be Chuck Palahniuk\'s best book yet.',
    owner: 'Vlad',
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
