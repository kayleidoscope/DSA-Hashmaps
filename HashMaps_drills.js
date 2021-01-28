const {HashMap} = require('./hashMap')

function main() {
    const lotr = new HashMap()

    lotr.MAX_LOAD_RATIO = 0.5;
    lotr.SIZE_RATIO = 3;

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

    console.log(lotr.get("Ent"))
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
    let map = new HashMap()

    for (let i = 0; i < string.length; i++) {
        let duplicate = map.get(string[i])

        if (duplicate) {
            map.set(string[i])
        }
    }

    console.log(map)
}

removeDuplicates("google")