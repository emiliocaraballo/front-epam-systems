import { defineStore } from 'pinia';
import { a as useApi } from './server.mjs';

const useBookStore = defineStore("books", {
  state: () => ({
    searchResults: [],
    myLibrary: [],
    recentSearches: [],
    selectedBook: null,
    loading: false,
    error: null
  }),
  actions: {
    async searchBooks(query) {
      this.loading = true;
      this.error = null;
      try {
        const { fetchWithAuth } = useApi();
        const response = await fetchWithAuth(`/books/search?q=${encodeURIComponent(query)}`);
        this.searchResults = response;
      } catch (error) {
        this.error = "Error searching books";
        console.error("Search error:", error);
      } finally {
        this.loading = false;
      }
    },
    async deleteSearch(query) {
      this.loading = true;
      this.error = null;
      try {
        console.log("Deleting search query:", query);
        const { fetchWithAuth } = useApi();
        await fetchWithAuth(`/books/search?q=${encodeURIComponent(query)}`, {
          method: "DELETE"
        });
        this.recentSearches = this.recentSearches.filter((search) => search !== query);
      } catch (error) {
        this.error = "Error deleting search";
        console.error("Delete search error:", error);
      } finally {
        this.loading = false;
      }
    },
    async getRecentSearches() {
      try {
        const { fetchWithAuth } = useApi();
        const response = await fetchWithAuth(`/books/last-search`);
        this.recentSearches = response.map((search) => search.query);
      } catch (error) {
        console.error("Recent searches error:", error);
      }
    },
    async saveToLibrary(book) {
      this.loading = true;
      this.error = null;
      try {
        const { fetchWithAuth } = useApi();
        const savedBook = await fetchWithAuth(`/books/my-library`, {
          method: "POST",
          body: JSON.stringify(book)
        });
        this.myLibrary.push(savedBook);
      } catch (error) {
        this.error = "Error saving book";
        console.error("Save error:", error);
      } finally {
        this.loading = false;
      }
    },
    async getMyLibrary(filters) {
      this.loading = true;
      this.error = null;
      try {
        const { fetchWithAuth } = useApi();
        const queryParams = new URLSearchParams();
        if (filters) {
          Object.entries(filters).forEach(([key, value]) => {
            if (value !== void 0) {
              queryParams.append(key, value.toString());
            }
          });
        }
        const response = await fetchWithAuth(`/books/my-library?${queryParams}`);
        this.myLibrary = response;
      } catch (error) {
        this.error = "Error fetching library";
        console.error("Library error:", error);
      } finally {
        this.loading = false;
      }
    },
    async updateBook(id, review, rating) {
      this.loading = true;
      this.error = null;
      try {
        const { fetchWithAuth } = useApi();
        const payload = {
          review: review.trim(),
          rating: Number(rating)
        };
        const updatedBook = await fetchWithAuth(`/books/my-library/${id}`, {
          method: "PUT",
          body: JSON.stringify(payload)
        });
        const index = this.myLibrary.findIndex((book) => book._id === id);
        if (index !== -1) {
          this.myLibrary[index] = updatedBook;
        }
      } catch (error) {
        this.error = "Error updating book";
        console.error("Update error:", error);
      } finally {
        this.loading = false;
      }
    },
    async deleteBook(id) {
      this.loading = true;
      this.error = null;
      try {
        const { fetchWithAuth } = useApi();
        await fetchWithAuth(`/books/my-library/${id}`, {
          method: "DELETE"
        });
        this.myLibrary = this.myLibrary.filter((book) => book._id !== id);
      } catch (error) {
        this.error = "Error deleting book";
        console.error("Delete error:", error);
      } finally {
        this.loading = false;
      }
    },
    setSelectedBook(book) {
      this.selectedBook = book;
    }
  }
});

export { useBookStore as u };
//# sourceMappingURL=books.mjs.map
