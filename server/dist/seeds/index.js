import { seedUsers } from './user-seeds.js';
import { seedTickets } from './ticket-seeds.js';
const seedAll = async () => {
    try {
        await seedUsers();
        console.log('\n----- USERS SEEDED -----\n');
        await seedTickets();
        console.log('\n----- TICKETS SEEDED -----\n');
        process.exit(0);
    }
    catch (error) {
        console.error('Error seeding database:', error);
        process.exit(1);
    }
};
seedAll();
