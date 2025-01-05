import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class WikidataService {
  private readonly wikidataUrl = 'https://www.wikidata.org/w/api.php';

  async searchEntity(query: string): Promise<any> {
    try {
      const params = {
        action: 'wbsearchentities',
        format: 'json',
        search: query,
        language: 'en',
      };

      const response = await axios.get(this.wikidataUrl, { params });
      console.log(response.data); // response.data is the JSON object returned by the Wikidata API
      return response.data;
    } catch (error) {
      throw new HttpException(
        'Error while fetching data from Wikidata API',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getEntityData(id: string): Promise<any> {
    try {
      const params = {
        action: 'wbgetentities',
        ids: id,
        format: 'json',
        languages: 'en',
      };

      const response = await axios.get(this.wikidataUrl, { params });
      return response.data;
    } catch (error) {
      throw new HttpException(
        'Error while fetching entity data from Wikidata API',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async fetchBookDetails(query: string): Promise<any> {
    const searchResults = await this.searchEntity(query);

    if (!searchResults.search || searchResults.search.length === 0) {
      throw new HttpException('No results found', HttpStatus.NOT_FOUND);
    }
    const id = searchResults.search[0].id;

    const entityData = await this.getEntityData(id);

    const entity = entityData.entities[id];
    const title = entity?.labels?.en?.value || 'Not found';
    const description = entity?.descriptions?.en?.value || 'Not found';

    return {
      id,
      title,
      description,
    };
  }
}