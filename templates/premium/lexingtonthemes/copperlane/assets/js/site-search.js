class Fuse {
  constructor(items, options = {}) {
    this.items = items;
    this.keys = options.keys || [];
  }

  search(query) {
    const terms = query.toLowerCase().trim().split(/\s+/).filter(Boolean);
    return this.items
      .map((item, refIndex) => {
        const text = this.keys.map((key) => String(item[key] || "")).join(" ").toLowerCase();
        const score = terms.reduce((total, term) => total + (text.includes(term) ? 1 : 0), 0);
        return { item, refIndex, score };
      })
      .filter((result) => result.score > 0)
      .sort((a, b) => b.score - a.score)
      .map(({ item, refIndex }) => ({ item, refIndex }));
  }
}

window.Fuse = Fuse;
