let StorageService;

StorageService = {
  async get(key) {
    // eslint-disable-next-line
    const value = await new Promise(resolve =>
      chrome.storage.local.get([key], result => resolve(result[key]))
    );
    return value;
  },
  async set(key, value) {
    // eslint-disable-next-line
    await new Promise(resolve =>
      chrome.storage.local.set({ [key]: value }, resolve)
    );
  }
};

export { StorageService };
