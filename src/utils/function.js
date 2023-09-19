export const bookmarks = {
	storage: localStorage,
	/**
	 * @returns {Array<string>}
	 */
	get: function () {
		return this.storage.bookmarks ? JSON.parse(this.storage.bookmarks) : [];
	},
	/**
	 * @param {string} id
	 * @returns {boolean}
	 */
	includes: function (id) {
		return this.storage.bookmarks
			? JSON.parse(this.storage.bookmarks).includes(id)
			: false;
	},
	/**
	 * @param {string} id
	 * @returns {Array<string>}
	 */
	add: function (id) {
		const newBookmarks = [id, ...this.get()];
		this.storage.bookmarks = JSON.stringify(newBookmarks);
		return newBookmarks;
	},
	remove: function (id) {
		if (!this.get().length) return [];
		const newBookmarks = this.get().filter((x) => x !== id);
		this.storage.bookmarks = JSON.stringify(newBookmarks);
		return newBookmarks;
	},
};

export const history = {
	storage: localStorage,
	maxSave: 20,
	/**
	 * @returns {Array<string>}
	 */
	get: function () {
		return this.storage.history ? JSON.parse(this.storage.history) : [];
	},
	/**
	 * @param {string} id
	 * @returns {boolean}
	 */
	includes: function (id) {
		return this.storage.history
			? JSON.parse(this.storage.history).includes(id)
			: false;
	},
	/**
	 * @param {string} id
	 * @returns {Array<string>}
	 */
	add: function (id) {
		const bookmarkList = this.includes(id)
			? this.get().filter((x) => x !== id)
			: this.get();
		const newBookmarks = [id, ...bookmarkList];
		if (newBookmarks.length > this.maxSave) newBookmarks.pop();
		this.storage.history = JSON.stringify(newBookmarks);
		return newBookmarks;
	},
	/**
	 * @param {string} id
	 * @returns {Array<string>}
	 */
	remove: function (id) {
		if (!this.get().length) return [];
		const newBookmarks = this.get().filter((x) => x !== id);
		this.storage.history = JSON.stringify(newBookmarks);
		return newBookmarks;
	},
};
