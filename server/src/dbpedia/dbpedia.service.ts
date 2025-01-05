import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class DbpediaService {
  private readonly dbpediaUrl = 'https://dbpedia.org/sparql';

  async searchBooks(query: string): Promise<any> {
    try {
      // Construct the SPARQL query for searching books and their authors
      const sparqlQuery = `
        SELECT ?book ?bookLabel ?author ?authorLabel ?releaseDate WHERE {
          ?book rdf:type dbo:Book .
          ?book rdfs:label ?bookLabel .
          ?book dbo:author ?author .
          ?author rdfs:label ?authorLabel .
          OPTIONAL {
            { ?book dbp:releaseDate ?releaseDate . }
           UNION
            { ?book dbo:publicationDate ?releaseDate . }
          }
          FILTER (lang(?bookLabel) = "en")
          FILTER (lang(?authorLabel) = "en" || !bound(?authorLabel))
          FILTER (regex(?bookLabel, "${query}", "i"))
        }
        LIMIT 10
      `;

      // Parameters for the request
      const params = {
        query: sparqlQuery,
        format: 'json',
      };

      // Make the request to DBpedia's SPARQL endpoint
      const response = await axios.get(this.dbpediaUrl, { params });

      // Map the results into a more user-friendly structure
      const results = response.data.results.bindings.map((result) => ({
        // book: result.book.value,
        bookLabel: result.bookLabel.value,
        // author: result.author ? result.author.value : null,
        authorLabel: result.authorLabel ? result.authorLabel.value : 'Unknown',
        releaseDate: result.releaseDate ? result.releaseDate.value : 'Unknown',
      }));

      return results;
    } catch (error) {
      throw new HttpException(
        'Error while fetching data from DBpedia',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
