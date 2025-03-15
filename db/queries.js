const pool = require("./pool");
const sql = require("sql-template-strings");

async function getAllInventory() {
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

async function getAllCategories() {
    const SQL = sql`
    select 
    id,
    "type"
    from animals
    order by id;`;

    const { rows } = await pool.query(SQL);
    return rows;
}

async function getCategoryName(id) {
    const SQL = sql`
    select
    "type"
    from animals
    where id = $1;`;

    const { rows } = await pool.query(SQL, [id]);
    return rows[0].type;
}

async function isCategoryInUse(id) {
    const SQL = sql`select 1
    from userAnimals 
    where animalId = $1;`;

    const { rowCount } = await pool.query(SQL, [id]);
    return rowCount;
}

async function getAllProductsInCategory(id) {
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

async function getCategoryDetails(id) {
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

async function getAllUsers() {
    const SQL = sql`
    select 
    id,
    name
    from users
    order by id;`;

    const { rows } = await pool.query(SQL);
    return rows;
}

async function getUserName(id) {
    const SQL = sql`
    select
    name
    from users
    where id = $1;`;

    const { rows } = await pool.query(SQL, [id]);
    return rows[0].type;
}

async function isUserInUse(id) {
    const SQL = sql`select 1
    from userAnimals 
    where userId = $1;`;

    const { rowCount } = await pool.query(SQL, [id]);
    return rowCount;
}

async function getAllProductsInUser(id) {
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

async function getUserDetails(id) {
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

async function getProductDetails(id) {
    if (!id) return null;
    const SQL = sql`
    select * from userAnimals
    where id = $1
    ;`;
    const { rows } = await pool.query(SQL, [id]);
    return rows[0];
}

async function updateProduct(id, userid, animalid, petname, price) {
    const SQL = sql`
    update userAnimals
    set userid = $2,
        animalid = $3,
        petname = $4,
        price = $5
    where id = $1
    `;

    await pool.query(SQL, [id, userid, animalid, petname, price]);
}

async function deleteProduct(id) {
    const SQL = sql`
    delete from userAnimals
    where id = $1
    `;

    await pool.query(SQL, [id]);
}

async function addProduct(userid, animalid, petname, price) {
    const SQL = sql`
    insert into userAnimals (userid, animalid, petname, price)
    values (
        $1,
        $2,
        $3,
        $4
    )
    `;

    await pool.query(SQL, [userid, animalid, petname, price]);
}

module.exports = {
    getAllInventory,
    getAllCategories,
    getAllProductsInCategory,
    getCategoryDetails,
    getCategoryName,
    updateCategory,
    deleteCategory,
    addCategory,
    isCategoryInUse,
    getAllUsers,
    getUserName,
    isUserInUse,
    getAllProductsInUser,
    getUserDetails,
    updateUser,
    deleteUser,
    addUser,
    getProductDetails,
    updateProduct,
    deleteProduct,
    addProduct,
};
