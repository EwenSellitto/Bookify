import { HttpException, HttpStatus, Injectable, InternalServerErrorException } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class GoogleBooksService {
  private readonly googleBooksUrl =
    'https://www.googleapis.com/books/v1/volumes';
  private readonly apiKey = 'AIzaSyAjF4nHxkSNwDlutM2TVX8VGTH3HNGT5tc';
  private readonly genres: string[] = [
    'Fiction',
    'Science',
    'History',
    'Fantasy',
    'Mystery',
    'Romance',
    'Biography',
    'Self-Help',
    'Business',
    'Juvenile Fiction',
    'Travel',
    'Sports',
    'Religion',
    'Psychology',
    'Poetry',
    'Philosophy',
    'Music',
    'Mathematics',
    'Medical',
    'Humor',
    'Games',
    'Gardening',
    'Cooking',
    'Thriller',
    'Horror',
  ];

  private calculateBookScore(rating: number, ratingCount: number): number {
    if (rating <= 0 || ratingCount < 0) return 0;
    return Math.round(((rating * Math.log(ratingCount + 1)) / 5) * 100) / 100;
  }

  getGenres(count: number = 5): string[] {
    if (count <= 0)
      throw new HttpException(
        'Count must be a positive integer',
        HttpStatus.BAD_REQUEST,
      );

    return this.genres.sort(() => 0.5 - Math.random()).slice(0, count);
  }

  capitalizeGenre(genre: string): string {
    if (!genre) return "No Genre";
    return genre
      .split(" ")
      .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(" ");
  }


  async searchBooks(
    title?: string,
    author?: string,
    genre?: string,
    page: number = 1,
    pageSize: number = 10,
  ): Promise<any> {
    try {
      const queryParams: string[] = [];

      if (title) queryParams.push(`intitle:${title}`);
      if (author) queryParams.push(`inauthor:"${author}"`);
      if (genre) {
        genre = this.capitalizeGenre(genre);
        queryParams.push(`subject:"${genre}"`);
      }

      const fullQuery = queryParams.join('+');
      const maxResults = 40;
      const totalResults = 160;
      const booksMap = new Map<string, any>();

      for (
        let startIndex = 0;
        startIndex < totalResults;
        startIndex += maxResults
      ) {
        const url = `${this.googleBooksUrl}?q=${fullQuery}&key=${this.apiKey}&langRestrict=en&orderBy=relevance&maxResults=${maxResults}&startIndex=${startIndex}`;
        const response = await axios.get(url);

        if (response.data.items) {
          if (genre) {
            response.data.items = response.data.items.filter((item: any) =>
              item.volumeInfo.categories?.includes(genre),
            );
          }
          const pageBooks = response.data.items
            .filter((item: any) => item.volumeInfo.language === 'en')
            .map((item: any) => ({
              id: item.id,
              title: item.volumeInfo.title || 'Unknown Title',
              authors: item.volumeInfo.authors || ['Unknown Author'],
              publishedDate: item.volumeInfo.publishedDate || 'Unknown Date',
              genres: item.volumeInfo.categories || ['Unknown Genre'],
              thumbnail: item.volumeInfo.imageLinks?.thumbnail || null,
              description:
                item.volumeInfo.description || 'No description available',
              rating: item.volumeInfo.averageRating || 0,
              ratingcount: item.volumeInfo.ratingsCount || 0,
              buylink: item.saleInfo.buyLink || null,
              score: this.calculateBookScore(
                item.volumeInfo.averageRating || 0,
                item.volumeInfo.ratingsCount || 0,
              ),
            }));

          for (const book of pageBooks) {
            if (!booksMap.has(book.id)) booksMap.set(book.id, book);
          }
        }
      }

      const uniqueBooks = Array.from(booksMap.values());
      const sortedBooks = uniqueBooks.sort((a, b) => b.score - a.score);

      const startIndex = (page - 1) * pageSize;
      const endIndex = startIndex + pageSize;
      const paginatedBooks = sortedBooks.slice(startIndex, endIndex);

      return {
        books: paginatedBooks,
        totalBooks: sortedBooks.length,
        page,
        pageSize,
      };
    } catch (error) {
      console.error(error);
      throw new HttpException(
        'Error while fetching data from Google Books API',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getBookById(id: string): Promise<any> {
    try {
      const url = `${this.googleBooksUrl}/${id}?key=${this.apiKey}`;
      const response = await axios.get(url);

      if (!response.data) {
        throw new HttpException('Book not found', HttpStatus.NOT_FOUND);
      }

      const removeHtmlTags = (html: string) => {
        if (!html) return html;
        return html.replace(/<[^>]*>/g, '');
      };

      const book = {
        id: response.data.id,
        title: response.data.volumeInfo.title || 'Unknown Title',
        authors: response.data.volumeInfo.authors || ['Unknown Author'],
        publishedDate: response.data.volumeInfo.publishedDate || 'Unknown Date',
        genres: response.data.volumeInfo.categories || ['Unknown Genre'],
        thumbnail: response.data.volumeInfo.imageLinks?.thumbnail || null,
        description:
          removeHtmlTags(response.data.volumeInfo.description) || 'No description available',
        rating: response.data.volumeInfo.averageRating || 'No rating available',
        ratingcount:
          response.data.volumeInfo.ratingsCount || 'No rating count available',
        buylink: response.data.saleInfo.buyLink || null,
        score: this.calculateBookScore(
          response.data.volumeInfo.averageRating || 0,
          response.data.volumeInfo.ratingsCount || 0,
        ),
      };

      return book;
    } catch (error) {
      console.error(error);
      throw new HttpException(
        'Error while fetching book details',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getBooksRecommendation(searchParam: { author?: string; genre?: string }) {
    try {
      const booksResponse = await this.searchBooks(
        undefined,
        searchParam.author,
        searchParam.genre,
        1,
        10,
      );

      if (!booksResponse || booksResponse.books.length === 0) {
        return null;
      }

      return booksResponse;
    } catch (error) {
      throw new InternalServerErrorException('Error fetching recommendations');
    }
  }
}
