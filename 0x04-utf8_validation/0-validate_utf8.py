#!/usr/bin/python3
""" Valid module """


def validUTF8(data):
    """valid function"""

    number_bytes = 0
    mask1 = 1 << 7
    mask2 = 1 << 6

    for i in data:

        x_n = 1 << 7

        if number_bytes == 0:
            while x_n & i:
                number_bytes += 1
                x_n = x_n >> 1
            if number_bytes == 0:
                continue
            if number_bytes == 1 or number_bytes > 4:
                return False

        else:
            if not (i & mask1 and not (i & mask2)):
                    return False
        number_bytes -= 1
    if number_bytes == 0:
        return True

    return False
