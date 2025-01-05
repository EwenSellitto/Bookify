import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class DbpediaService {
  private readonly dbpediaUrl = 'https://dbpedia.org/sparql';

  async searchBooks(query: string): Promise<any> {
    try {
      // Construct the SPARQL query for searching books
      const sparqlQuery = `
        SELECT ?book ?bookLabel WHERE {
          ?book rdf:type dbo:Book .
          ?book rdfs:label ?bookLabel .
          FILTER (lang(?bookLabel) = "en")
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

      return response.data.results.bindings;
    } catch (error) {
      throw new HttpException(
        'Error while fetching data from DBpedia',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
