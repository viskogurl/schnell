'use strict';

const Schnell = {
  memory: [],

  tryify: async (promise) => {
    try {
      const data = await promise;
      return [data, null];
    } catch (error) {
      return [null, error];
    }
  },

  clean: async () => {
    for (const item of memory) {
      memory.pop();
    }
  },

  delete: async () => {},

  all: async (model) => {
    return memory[0] ? [memory, null] : await tryify(model.find({}));
  },

  cache: async (promise) => {
    const [data, error] = await tryify(promise);
    for (const item of data) {
      memory.push(item);
    }
    return memory;
  },

  find: async (snail, model) => {
    const result = memory.find(({ id }) => id === snail);
    return result
      ? [result, null]
      : await tryify(model.findOne({ id: snail }).exec());
  },

  save: async (snail, model) => {
    const [data, error] = await tryify(model.create(snail));
    memory.push(snail);
    return [data, error, size];
  },
};

module.exports = Object.freeze(Schnell);
