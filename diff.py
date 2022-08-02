from math import log
from random import random, randint

def exp_sample(mean):
    return -mean*log(random())

def laplace(scale):
    e1 = exp_sample(scale)
    e2 = exp_sample(scale)
    return e1-e2

# sensitivity = 1 for count and histogram queries
sensitivity = 1
epsilon = 0.1

count = 1000
print(count)

diff_count = count + laplace(sensitivity / epsilon)
print(diff_count)