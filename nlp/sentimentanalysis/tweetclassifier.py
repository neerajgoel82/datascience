__author__ = 'neeraj'

from textblob.classifiers import NaiveBayesClassifier
from textblob import TextBlob
from nltk.corpus import movie_reviews

train = [
    ('I love this sandwich.', 'pos'),
    ('This is an amazing place!', 'pos'),
    ('I feel very good about these beers.', 'pos'),
    ('This is my best work.', 'pos'),
    ("What an awesome view", 'pos'),
    ('I do not like this restaurant', 'neg'),
    ('I am tired of this stuff.', 'neg'),
    ("I can't deal with this", 'neg'),
    ('He is my sworn enemy!', 'neg'),
    ('My boss is horrible.', 'neg')
]
test = [
    ('The beer was good.', 'pos'),
    ('I do not enjoy my job', 'neg'),
    ("I ain't feeling dandy today.", 'neg'),
    ("I feel amazing!", 'pos'),
    ('Gary is a friend of mine.', 'pos'),
    ("I can't believe I'm doing this.", 'neg')
]

cl = NaiveBayesClassifier(train)

print cl.classify("Their burgers are amazing")  # "pos"
print cl.classify("I don't like their pizza.")  # "neg"

blob = TextBlob("The beer was amazing. "
                "But the hangover was horrible. My boss was not happy.",
                classifier=cl)

print blob.classify()  # "neg"
for sentence in blob.sentences:
    print(sentence)
    print(sentence.classify())

print cl.accuracy(test)

cl.show_informative_features(50)