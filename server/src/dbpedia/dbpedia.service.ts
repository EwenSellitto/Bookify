import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class DbpediaService {
  private readonly dbpediaUrl = 'https://dbpedia.org/sparql';

  async searchBooks(title?: string, author?: string, genre?: string): Promise<any> {
    try {
      // Dynamically construct the SPARQL query
      const filters = [];
      if (title) {
        filters.push(`FILTER (regex(?bookLabel, "${title}", "i"))`);
      }
      if (author) {
        filters.push(`FILTER (regex(?authorLabel, "${author}", "i"))`);
      }
      if (genre) {
        filters.push(`FILTER (regex(?genreLabel, "${genre}", "i"))`);
      }

      const sparqlQuery = `
        SELECT ?book ?bookLabel ?author ?authorLabel ?releaseDate ?genre ?genreLabel WHERE {
            ?book rdf:type dbo:Book .
            ?book rdfs:label ?bookLabel .

            OPTIONAL { ?book dbo:author ?author . }
            OPTIONAL { ?author rdfs:label ?authorLabel . }

            OPTIONAL { ?book dbp:genre ?genre . }
            OPTIONAL { ?genre rdfs:label ?genreLabel . }

            OPTIONAL {
                { ?book dbp:releaseDate ?releaseDate . }
            UNION
                { ?book dbo:publicationDate ?releaseDate . }
            }

            FILTER (lang(?bookLabel) = "en")
            FILTER (lang(?authorLabel) = "en")
            FILTER (lang(?genreLabel) = "en")
            ${filters.join('\n')}
        }
        LIMIT 100
      `;

      // Parameters for the request
      const params = {
        query: sparqlQuery,
        format: 'json',
      };

      // Make the request to DBpedia's SPARQL endpoint
      const response = await axios.get(this.dbpediaUrl, { params });

      // Process the results
      const results = response.data.results.bindings.map((result) => ({
        bookLabel: result.bookLabel.value,
        authorLabel: result.authorLabel ? result.authorLabel.value : 'Unknown',
        releaseDate: result.releaseDate ? result.releaseDate.value : 'Unknown',
        genreLabel: result.genreLabel ? result.genreLabel.value : 'Unknown',
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
