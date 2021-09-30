import random
import string


letters_and_digits = string.digits + string.ascii_letters

print("".join([random.choice(letters_and_digits) for _ in range(48)]))