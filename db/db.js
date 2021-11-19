const { v4: uuidv4 } = require('uuid');

/** Represents a key in a DB instance. */
class Key {
    /** 
     * Create a Key
     * @param {*} value - The value of the key.
     * @param {*} isUnique - Whether or not the key is unique in the DB instance
     */
    constructor(value, isUnique=false) {
        this.value = value;
        this.isUnique = isUnique;
    }
}

/** Creates a new DB instance (a key value store for data, using Key for keys). */
class DB {
    /**
     * 
     * @param {string} dbName - name of the database
     */
    constructor(dbName) {
        this.dbName = dbName
        this.storage = {}
    }

    /**
     * Retrieves data from the database.
     * * @return {Promise} - We're pretending this is a real DB call, 
     * so this is a promise that resolves to the data at the key.
     */
    get(key) {
        return new Promise((resolve, reject) => {
            if (this.storage[key]) {
                resolve(this.storage[key]);
            } else {
                resolve([])
            }
        });
    }

    /**
     * 
     * @param {*} data - data to store
     * @param  {...any} keys - any serializable keys to recursively store the data under
     * @returns {Promise} - We're pretending this is a real DB call,
     * so this is a promise that resolves with the data now stored at the keys.
     */
    set(data, ...keys) {
        return new Promise((resolve, reject) => {
            let storage = this.storage
            for (let i = 0; i < (keys.length - 1); i++){
                if (!storage[keys[i].value]) {
                    storage[keys[i].value] = {};
                } else if(keys[i].isUnique){
                    const err = {
                        name: 'UniqueKeyError',
                        message: `${keys[i].value} does not satisfy uniqueness constraint`,
                        status: 400
                    }
                    reject(err)
                }
                storage = storage[keys[i].value];
            }

            data.id = uuidv4();
            const final_key = keys[keys.length - 1];
            if (final_key.isUnique && storage[final_key.value]) {
                const err = {
                    name: 'UniqueKeyError',
                    message: `${final_key.value} does not satisfy uniqueness constraint`,
                    status: 400
                }        
                reject(err)
            }
            storage[final_key.value] = data
            resolve(data)
        });
    }
}

module.exports = {DB, Key}
