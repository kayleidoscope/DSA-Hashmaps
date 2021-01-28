const {HashMap} = require('./hashMap')

HashMap.MAX_LOAD_RATIO = 0.5
HashMap.SIZE_RATIO = 3;

function main() {
    const lotr = new HashMap()

    lotr.set("Hobbit", "Bilbo")
    lotr.set("Hobbit", "Frodo")
    lotr.set("Wizard", "Gandalf")
    lotr.set("Human", "Aragorn")
    lotr.set("Elf", "Legolas")
    lotr.set("Maiar", "The Necromancer")
    lotr.set("Maiar", "Sauron")
    lotr.set("RingBearer", "Gollum")
    lotr.set("LadyOfLight", "Galadriel")
    lotr.set("HalfElven", "Arwen")
    lotr.set("Ent", "Treebeard")

    console.log(lotr)
}

// main()

/*

I've hashed all of the items I was asked to (11), but the length is 9 (including Ent,
which comes back undefined??).

Getting the values for "Hobbit" and "Maiar" returns "Frodo" and "Sauron," respectively.
It seems that the values for "Bilbo" and "The Necromancer" have been erased.

The capacity is 8, because "Ent" is set to undefined, but I'm not sure why. That would
imply that a resize is not being done at the appropriate time.

*/

/*

WHAT DOES THIS DO?

The function will print:

10
20

*/

const WhatDoesThisDo = function(){
    let str1 = 'Hello World.';
    let str2 = 'Hello World.';
    let map1 = new HashMap();
    map1.set(str1,10);
    map1.set(str2,20);
    let map2 = new HashMap();
    let str3 = str1;
    let str4 = str2;
    map2.set(str3,20);
    map2.set(str4,10);

    console.log(map1.get(str1));
    console.log(map2.get(str3));
}

// WhatDoesThisDo()


/*

1. | 22 | 88 |    |    |  4 | 15 | 28 | 17 | 59 | 31 | 10 |

2. |    | // | 20 | 12 |    |  5 | // |    | 17 |
          28                       15
          19                       33
          10

*/

function removeDuplicates(string) {
    const map = new HashMap()

    //put the string letters into the map only if they are not duplicates
    for (let i = 0; i < string.length; i++) {
        let duplicate = map.get(string[i])
        if (duplicate === undefined) {
            map.set(string[i], string[i])
        }
    }
    let result = ""

    //pull them out in the order of the string, but only if they are not duplicates
    for (let j = 0; j < string.length; j++) {
        let newLetter = map.get(string[j])
        if (!result.includes(newLetter)) {
            result = result + newLetter
        }
    }

    console.log(result)
}

// removeDuplicates("google")
// removeDuplicates("google all that you think can think of")
// removeDuplicates("the quick brown fox jumps over the lazy dog")

function isItAPalindrome(string) {
    const map = new HashMap()

    for (let i = 0; i < string.length; i++) {
        let duplicate = map.get(string[i])
        if (duplicate === undefined) {
            map.set(string[i], 1)
        } else {
            map.set(string[i], duplicate + 1)
        }
    }

    let numOfOddNums = 0;

    for (let j = 0; j < string.length; j++) {
        let value = map.get(string[j])
        if (value % 2 !== 0) {
            numOfOddNums++;
        }
    }

    if (numOfOddNums === 1) {return true}
    return false
}

// console.log(isItAPalindrome("acecarr"))
// console.log(isItAPalindrome("north"))

function groupAnagrams(array) {
    let allWords = []

    top: for (let i = 0; i < array.length; i++) {
        let anagrams = []

        let map = new HashMap()

        for (let j = 0; j < array[i].length; j++) {

            //check to make sure that word hasn't already been hash-mapped
            for (let m = 0; m < allWords.length; m++) {
                if (allWords[m].includes(array[i])) {
                    //if it has, continue at the top
                    continue top
                }
            }
            //make a map out of this word
            map.set(array[i][j], array[i][j])
        }


        //look through each word in the array
        for (let k = 0; k < array.length; k++) {
            let arrayWord = array[k]
            let mapWord = ""

            //for each word, use the map to see if all letters are included in this map
            for (let l = 0; l < array[k].length; l++) {
                const mapLetter = map.get(array[k][l])
                mapWord = mapWord + mapLetter
            } 
            //if the letters from this specific map can be used to recreate array[k],
            //add that letter to its own array
            if (arrayWord === mapWord) {
                anagrams.push(arrayWord)
            }
        }
        //once all relevant words have been added to their array, add them to the full array
        allWords.push(anagrams)
    }
    console.log(allWords)
}

groupAnagrams(['east', 'cars', 'acre', 'arcs', 'teas', 'eats', 'race'])