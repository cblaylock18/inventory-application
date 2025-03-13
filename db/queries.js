const pool = require("./pool");
const sql = require("sql-template-strings");

async function inventoryAllGet() {
    const SQL = sql`select 
    userAnimals.id,
    userAnimals.petName,
    userAnimals.price,
    users.name,
    animals.type
    from userAnimals 
    inner join users on userAnimals.userId = users.id
    inner join animals on userAnimals.animalId = animals.id;`;

    const { rows } = await pool.query(SQL);
    return rows;
}

async function categoriesAllGet() {
    const SQL = sql`
    select 
    id,
    "type"
    from animals
    order by id;`;

    const { rows } = await pool.query(SQL);
    return rows;
}

async function isCategoryInUse(id) {
    const SQL = sql`select 1
    from userAnimals 
    where animalId = $1;`;

    const { rowCount } = await pool.query(SQL, [id]);
    return rowCount;
}

async function inventoryCategoryProducts(id) {
    const SQL = sql`select 
    userAnimals.id,
    userAnimals.petName,
    userAnimals.price,
    users.name,
    animals.type
    from userAnimals 
    inner join users on userAnimals.userId = users.id
    inner join animals on userAnimals.animalId = animals.id
    where animals.id = $1;`;

    const { rows } = await pool.query(SQL, [id]);
    return rows;
}

async function categoryDetailsGet(id) {
    if (!id) return null;
    const SQL = sql`
    select * from animals
    where id = $1
    ;`;
    const { rows } = await pool.query(SQL, [id]);
    return rows[0];
}

async function updateCategory(id, type, avglifespan) {
    const SQL = sql`
    update animals
    set "type" = $2,
        avglifespan = $3
    where id = $1
    `;

    await pool.query(SQL, [id, type, avglifespan]);
}

async function deleteCategory(id) {
    const SQL = sql`
    delete from animals
    where id = $1
    `;

    await pool.query(SQL, [id]);
}

async function addCategory(type, avglifespan) {
    const SQL = sql`
    insert into animals ("type", avglifespan)
    values (
        $1,
        $2
    )
    `;

    await pool.query(SQL, [type, avglifespan]);
}

async function usersAllGet() {
    const SQL = sql`
    select 
    id,
    name
    from users
    order by id;`;

    const { rows } = await pool.query(SQL);
    return rows;
}

async function isUserInUse(id) {
    const SQL = sql`select 1
    from userAnimals 
    where userId = $1;`;

    const { rowCount } = await pool.query(SQL, [id]);
    return rowCount;
}

async function inventoryUserProducts(id) {
    const SQL = sql`select 
    userAnimals.id,
    userAnimals.petName,
    userAnimals.price,
    users.name,
    animals.type
    from userAnimals 
    inner join users on userAnimals.userId = users.id
    inner join animals on userAnimals.animalId = animals.id
    where users.id = $1;`;

    const { rows } = await pool.query(SQL, [id]);
    return rows;
}

async function userDetailsGet(id) {
    if (!id) return null;
    const SQL = sql`
    select * from users
    where id = $1
    ;`;
    const { rows } = await pool.query(SQL, [id]);
    return rows[0];
}

async function updateUser(id, name, phone, street, city, state, zip) {
    const SQL = sql`
    update users
    set name = $2,
        phone = $3,
        street = $4,
        city = $5,
        state = $6,
        zip = $7
    where id = $1
    `;

    await pool.query(SQL, [id, name, phone, street, city, state, zip]);
}

async function deleteUser(id) {
    const SQL = sql`
    delete from users
    where id = $1
    `;

    await pool.query(SQL, [id]);
}

async function addUser(name, phone, street, city, state, zip) {
    const SQL = sql`
    insert into users (name, phone, street, city, state, zip)
    values (
        $1,
        $2,
        $3,
        $4,
        $5,
        $6
    )
    `;

    await pool.query(SQL, [name, phone, street, city, state, zip]);
}

module.exports = {
    inventoryAllGet,
    categoriesAllGet,
    inventoryCategoryProducts,
    categoryDetailsGet,
    updateCategory,
    deleteCategory,
    addCategory,
    isCategoryInUse,
    usersAllGet,
    isUserInUse,
    inventoryUserProducts,
    userDetailsGet,
    updateUser,
    deleteUser,
    addUser,
};
