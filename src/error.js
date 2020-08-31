
export default class CustomError extends Error {
    constructor(meta, message = '') {
        super(message)
        this.meta = JSON.stringify(meta);
    }

    toObject () {
        return JSON.parse(this.meta);
    }
}

export const isCustomError = (entity) => entity instanceof CustomError;
