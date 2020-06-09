import knex from '../database/connection';

import { Request, Response } from 'express'

export default class ItemsControllers {
    async index(request: Request, response: Response) {

        const items = await knex.select('*').from('items')
    
        const serializedItems = items.map(item => {
            return {
                id: item.id,
                name: item.title,
                image_url: `http://localhost:3333/uploads/${item.image}`
            }
        })
    
        return response.json(serializedItems);
    
    }

}