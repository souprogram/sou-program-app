import { hashPassword } from '../../services/authService.js';

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const seed = async function (knex) {
    await knex('user').del();

    await knex('user').insert([
        {
            name: 'Admin',
            surname: 'Admin',
            email: process.env.ADMIN_EMAIL,
            username: 'admin',
            password: await hashPassword('admin'),
            profile_picture_key: null,
            bio: '',
            type: 'demonstrator',
            status: 'active',
            email_verified: true,
        },
    ]);
};
