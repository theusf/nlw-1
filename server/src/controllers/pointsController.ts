import knex from '../database/connection';

import { Request, Response } from 'express'

export default class PointsController {
    async index(request: Request, response: Response) {
        const { city, uf, items } = request.query

        // console.log(city, uf, items);

        const parsedItems = String(items).split(',').map(item => Number(item.trim()))

        const points = await knex('points')
            .join('point_items', 'points.id', '=', 'point_items.point_id')
            .whereIn('point_items.item_id', parsedItems)
            .where('city', String(city))
            .where('uf', String(uf))
            .distinct()
            .select('points.*');

        return response.json(points)

    }


    async create(request: Request, response: Response) {
        const {
            name,
            email,
            whatsapp,
            latitude,
            longitude,
            city,
            uf,
            items,
        } = request.body

        try {
            const trx = await knex.transaction(); // Transection tipo Begin Tran, se alguma falhar da rollback

            const point = {
                image: 'https://images.unsplash.com/photo-1528323273322-d81458248d40?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=600&q=60',
                name,
                email,
                whatsapp,
                latitude,
                longitude,
                city,
                uf
            }

            const insertedIds = await trx('points').insert(point);

            const point_id = insertedIds[0]

            const pointItems = items.map((item_id: Number) => {
                return {
                    item_id,
                    point_id,
                }
            })

            const ret = await trx('point_items').insert(pointItems);

           // trx.rollback();
            trx.commit();

            return response.json({
                id: point_id,
                ...point
            });

        } catch (error) {
            return response.json({
               error: error
            });
        }
    }

    async show(request: Request, response: Response) {
        const { id } = request.params;

        const point = await knex('points').where('id', id).first();

        if (!point) {
            return response.status(400).json({ message: 'Point not found' })
        }

        const items = await knex('items').join(
            'point_items',
            'items.id',
            '=',
            'point_items.item_id')
            .where('point_items.point_id', id)
            .select('items.title')


        return response.json({ point, items });

    }


}

