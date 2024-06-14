CREATE TABLE car (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    brand VARCHAR(255),
    model VARCHAR(255),
    price DECIMAL(10, 2),
    color VARCHAR(50),
    motor_type VARCHAR(50),
    power VARCHAR(50), 
    place_number INTEGER,
    status VARCHAR(50), 
    type VARCHAR(255)
    
);

CREATE TABLE image (
   id SERIAL PRIMARY KEY,
   url TEXT,
    car_id INTEGER REFERENCES car(id),
)

CREATE TABLE appointment (
    id SERIAL PRIMARY KEY,
    car_id INTEGER REFERENCES car(id),
    name VARCHAR(255) NOT NULL,
    first_name VARCHAR(255),
    email VARCHAR(255) NOT NULL,
    message TEXT,
    contact VARCHAR(255),
    appointment_date TIMESTAMP,
    status VARCHAR(50) 
);

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    name VARCHAR(255)
);
