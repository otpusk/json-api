// Core
import localforage from 'localforage';
import { Map } from 'immutable';

class Storage {
    constructor (storeName, config = {}) {
        this.memory = Map();
        this.instance = localforage.createInstance({
            name:   'web.otpusk.com',
            storeName,
            driver: [localforage.LOCALSTORAGE],
            ...config,
        });
    }

    async get (key, defaults) {
        try {
            const value = await this.instance.getItem(key);

            return value ? value : defaults;
        } catch (error) {
            this.warn();

            return new Promise((resolve) => resolve(this.memory.get(key, defaults)));
        }
    }

    async findAll() {
        try {
            const found = {};

            await this.instance.iterate((value, key) => {
                Object.assign(found, { [key]: value });
            });

            return found;
        } catch (error) {
            this.warn();

            return new Promise((resolve) => resolve(this.memory.toJS()));
        }
    }

    async keys (callback) {
        try {
            const keys = await this.instance.keys();

            callback(keys);
        } catch (error) {
            this.warn();
            callback(this.memory.keys().toArray());
        }
    }

    async set (key, value) {
        try {
            await this.instance.setItem(key, value);
        } catch (error) {
            this.warn();

            return new Promise((resolve) => resolve(this.memory.set(key, value)));
        }
    }

    async remove (key) {
        try {
            await this.instance.removeItem(key);
        } catch (error) {
            this.warn();

            return new Promise((resolve) => resolve(this.memory.remove(key)));
        }
    }

    async clear () {
        try {
            await this.instance.clear();
        } catch (error) {
            this.warn();

            return new Promise((resolve) => resolve(this.memory.clear()));
        }
    }

    async merge (content) {
        try {
            for (const [key, value] of Object.entries(content)) {
                await this.set(key, value);
            }
        } catch (error) {
            this.warn();

            return new Promise((resolve) => resolve(this.memory.merge(content)));
        }
    }

    warn () {
        console.warn('Включите локальное хранилище в вашем браузере для полноценной работы приложения');
    }
}

export const createStorage = (name) => Object.freeze(new Storage(name));
