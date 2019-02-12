// Core
import localforage from 'localforage';

class Storage {
    constructor (storeName, config = {}) {
        this.instance = localforage.createInstance({
            name:   'otpusk.com',
            storeName,
            driver: [localforage.INDEXEDDB, localforage.LOCALSTORAGE],
            ...config,
        });
    }

    async get (key, defaults) {
        try {
            const value = await this.instance.getItem(key);

            return value ? value : defaults;
        } catch (error) {
            return defaults;
        }
    }

    async findAll () {
        const found = {};

        await this.instance.iterate((value, key) => {
            Object.assign(found, { [key]: value });
        });

        return found;
    }

    async keys (callback) {
        const keys = await this.instance.keys();

        callback(keys);
    }

    async set (key, value) {
        await this.instance.setItem(key, value);
    }

    async remove (key) {
        await this.instance.removeItem(key);
    }

    async clear () {
        await this.instance.clear();
    }
}

export const createStorage = (name) => Object.freeze(new Storage(name));
