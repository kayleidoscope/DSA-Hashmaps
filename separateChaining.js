class _Node {
    constructor(value, next) {
        this.value = value;
        this.next = next;
    }
}

class LinkedList {
    constructor() {
        this.head = null
    }

    insertFirst(item) {
        this.head = new _Node(item, this.head)
    }

    insertLast(item) {
        if (this.head === null) {
            this.insertFirst(item)
        } else {
            let tempNode = this.head
            while(tempNode.next !== null) {
                tempNode = tempNode.next
            }
            tempNode.next = new _Node(item, null)
        }
    }

    insertCycle(item, otherNode) {
        if (this.head === null) {
            throw new Error()
        }
        let tempNode = this.head
        while(tempNode.next !== null) {
            tempNode = tempNode.next
        }
        tempNode.next = new _Node(item, otherNode)
    }

    find(item) { 
        // Start at the head
        let currNode = this.head;
        // If the list is empty
        if (!this.head) {
            return null;
        }
        // Check for the item 
        while (currNode.value !== item) {
            /* Return null if it's the end of the list 
               and the item is not on the list */
            if (currNode.next === null) {
                return null;
            }
            else {
                // Otherwise, keep looking 
                currNode = currNode.next;
            }
        }
        // Found it
        return currNode;
    }
    
    insertBefore(item, before) {
        if (this.head === null) {
            this.insertFirst(item)
        } else {
            let beforeNode = this.find(before)

            nextNode.next = new _Node(item, beforeNode)
        }
    }

    insertAfter(item, after) {
        if (this.head === null) {
            this.insertFirst(item)
        } else {
            let afterNode = this.find(after)
            let nextNode = afterNode.next

            afterNode.next = new _Node(item, nextNode)
        }
    }

    insertAt(item, position) {
        if (this.head === null) {
            this.insertFirst(item)
        } else {
            let currNode = this.head;
            let currentPosition = 0
            while(currentPosition !== position) {
                currentPosition++;
                if (!currNode) {
                    return null
                }
                currNode = currNode.next;
            }
            this.insertAfter(item, currNode.value)
        }
    }

    remove(item){ 
        // If the list is empty
        if (!this.head) {
            return null;
        }
        // If the node to be removed is head, make the next node head
        if (this.head.value === item) {
            this.head = this.head.next;
            return;
        }
        // Start at the head
        let currNode = this.head;
        // Keep track of previous
        let previousNode = this.head;

        while ((currNode !== null) && (currNode.value !== item)) {
            // Save the previous node 
            previousNode = currNode;
            currNode = currNode.next;
        }
        if (currNode === null) {
            console.log('Item not found');
            return;
        }
        previousNode.next = currNode.next;
    }
}

class ChainHashMap {
    constructor(initialCapacity = 8) {
        this.length = 0;
        this._hashTable = []
        this._capacity = initialCapacity;
        this._deleted = 0
    }

    locate(key) {
        const index = this._findSlot(key)
        if (this._hashTable[index] === undefined) {
            return undefined
        }
        return this._hashTable[index].head
    }

    set(key, value) {
        const loadRatio = (this.length + this._deleted + 1) / this._capacity
        if (loadRatio > ChainHashMap.MAX_LOAD_RATIO) {
            this._resize(this._capacity * ChainHashMap.SIZE_RATIO)
        }
        const index = this._findSlot(key)
        if (!this._hashTable[index]) {
            this.length++
        }
        
        if (this._hashTable[index] === undefined) {            
            //adding the first item
            const newIndex = new LinkedList()
            
            newIndex.insertFirst(key)
           newIndex.insertLast(value)

            
            //if it's the first one in the index
            this._hashTable[index] = newIndex
        } else {
            this._hashTable[index].insertLast(value)
        }

    }


    delete(key) {
        const index = this._findSlot(key)
        const slot = this._hashTable[index]
        if (slot === undefined) {
            throw new Error("Key error")
        }
        slot.DELETED = true;
        this.length --;
        this._deleted++
    }

    _findSlot(key) {
        const hash = ChainHashMap._hashString(key)
        const index = hash % this._capacity;
        return index
    }

    _resize(size) {
        const oldSlots = this._hashTable;
        this._capacity = size;
        // Reset the length - it will get rebuilt as you add the items back
        this.length = 0;
        this._deleted = 0;
        this._hashTable = [];
        
        for (let i = 0; i < oldSlots.length; i++) {
            if (oldSlots[i] !== undefined && !oldSlots[i].DELETED) {
                let head = oldSlots[i].head.value
                let values = []
    
                let node = oldSlots[i].head.next
    
                while (node.next !== null) {
                    values.push(node.value)
                    node = node.next
                }
                values.push(node.value)
                for (let j = 0; j < values.length; j++) {
                    this.set(head, values[j]);
                }
            }
        }
    }

    static _hashString(string) {
        let hash = 5381;
        for (let i = 0; i < string.length; i++) {
            //Bitwise left shift with 5 0s - this would be similar to
            //hash*31, 31 being the decent prime number
            //but bit shifting is a faster way to do this
            //tradeoff is understandability
            hash = (hash << 5) + hash + string.charCodeAt(i);
            //converting hash to a 32 bit integer
            hash = hash & hash;
        }
        //making sure hash is unsigned - meaning non-negative number. 
        return hash >>> 0;
    }
}

module.exports = {ChainHashMap}