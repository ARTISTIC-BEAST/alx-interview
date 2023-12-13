#!/usr/bin/python3
"""Minumun operations module"""


def minOperations(n):
    """Min op function"""
    operations = 0
    while n > 1:
        divisor = min_divisor(n)
        operations += divisor
        n = int(n / divisor)
    return int(operations)


def min_divisor(num):
    """function to calculate the min divisor"""
    for i in range(2, num+1):
        if num % i == 0:
            return i
