import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class GoogleBooksService {
  private readonly googleBooksUrl = 'https://www.googleapis.com/books/v1/volumes';
  private readonly apiKey = 'AIzaSyDTbOl6J9TTT3wzjAHuj0iibcBkcJfbapk';

  async searchBooks(title?: string, author?: string, genre?: string): Promise<any> {
    try {
      const queryParams: string[] = [];

      if (title) {
        queryParams.push(`intitle:${title}`);
      }
      if (author) {
        queryParams.push(`inauthor:${author}`);
      }
      if (genre) {
        queryParams.push(`subject:${genre}`);
      }

      const fullQuery = queryParams.join('+');
      const url = `${this.googleBooksUrl}?q=${fullQuery}&key=${this.apiKey}&langRestrict=en&orderBy=relevance&maxResults=40`;

      const response = await axios.get(url);

      if (!response.data.items) {
        throw new HttpException('No books found', HttpStatus.NOT_FOUND);
      }

      const books = response.data.items
        .filter(item =>
          item.volumeInfo.language === 'en' &&
          !item.volumeInfo.title?.toLowerCase().includes('summary') &&
          !item.volumeInfo.title?.toLowerCase().includes('analysis')
        )
        .map((item) => ({
          id: item.id,
          title: item.volumeInfo.title || 'Unknown Title',
          authors: item.volumeInfo.authors || ['Unknown Author'],
          publishedDate: item.volumeInfo.publishedDate || 'Unknown Date',
          genre: item.volumeInfo.categories || ['Unknown Genre'],
          thumbnail: item.volumeInfo.imageLinks?.thumbnail || null,
          description: item.volumeInfo.description || 'No description available',
          rating: item.volumeInfo.averageRating || "No rating available",
        }));

      return books;
    } catch (error) {
      throw new HttpException(
        'Error while fetching data from Google Books API',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

 async getBookById(id: string): Promise<any> {
    try {
      const url = `${this.googleBooksUrl}/${id}?key=${this.apiKey}`;

      console.log(url);
      const response = await axios.get(url);
      if (!response.data) {
        throw new HttpException('Book not found', HttpStatus.NOT_FOUND);
      }

      const book = {
        id: response.data.id,
        title: response.data.volumeInfo.title || 'Unknown Title',
        authors: response.data.volumeInfo.authors || ['Unknown Author'],
        publishedDate: response.data.volumeInfo.publishedDate || 'Unknown Date',
        genre: response.data.volumeInfo.categories || ['Unknown Genre'],
        thumbnail: response.data.volumeInfo.imageLinks?.thumbnail || null,
        description: response.data.volumeInfo.description || 'No description available',
        rating: response.data.volumeInfo.averageRating || 'No rating available',
      };

      return book;
    } catch (error) {
      throw new HttpException(
        'Error while fetching book details',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}