import csv
import json

germanLetters = set(('A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z','Ä','Ö','Ü')) 
prealloc = 100000
nouns = [None] * prealloc
count = 0

with open('nouns.csv') as csvfile:
    nounreader = csv.reader(csvfile, delimiter=',', quotechar='"')
    for row in nounreader:
        term = row[0]
        gender = row[2]
        is_incomplete = len(gender) == 0 or len(term) == 0
        is_single = len(term) == 1
        is_non_latter = term[0] not in germanLetters

        if is_incomplete or is_single or is_non_latter:
            continue

        word = f'{row[0]},{row[2]}'
        if count < prealloc:
            nouns[count] = word
            count += 1
        else:
            nouns.append(word)

nouns = list(filter(lambda w: w != None, nouns))

print(f'export const NOUNS={json.dumps(nouns, ensure_ascii=False, indent=None, check_circular=False)}')
