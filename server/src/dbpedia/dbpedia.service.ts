import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class DbpediaService {
  private readonly dbpediaUrl = 'https://dbpedia.org/sparql';

  async searchBooks(query: string): Promise<any> {
    try {
      const sparqlQuery = `
        SELECT ?book ?bookLabel ?author ?authorLabel ?releaseDate ?genre ?genreLabel WHERE {
            ?book rdf:type dbo:Book .
            ?book rdfs:label ?bookLabel .

            ?book dbo:author ?author .
            ?author rdfs:label ?authorLabel .

            ?book dbp:genre ?genre .
            ?genre rdfs:label ?genreLabel .

            OPTIONAL {
                { ?book dbp:releaseDate ?releaseDate . }
            UNION
                { ?book dbo:publicationDate ?releaseDate . }
            }

            FILTER (lang(?bookLabel) = "en")
            FILTER (lang(?authorLabel) = "en" || !bound(?authorLabel))
            FILTER (lang(?genreLabel) = "en")
            FILTER (regex(?bookLabel, "${query}", "i"))
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

      const results = response.data.results.bindings.map((result) => ({
        bookLabel: result.bookLabel.value,
        authorLabel: result.authorLabel ? result.authorLabel.value : 'Unknown',
        releaseDate: result.releaseDate ? result.releaseDate.value : 'Unknown',
        genre: result.genreLabel ? result.genreLabel.value : 'Unknown',
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
