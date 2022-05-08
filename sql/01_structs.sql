CREATE TABLE IF NOT EXISTS customers(
    id SERIAL,
    name VARCHAR(32) NOT NULL,
    surname VARCHAR(32) NOT NULL,
    phone_number NUMERIC(9) NOT NULL UNIQUE,
    email VARCHAR(40),
    username VARCHAR(32) NOT NULL UNIQUE,
    password VARCHAR(256) NOT NULL UNIQUE,
    is_student BOOLEAN DEFAULT FALSE,
    CONSTRAINT customer_id_k PRIMARY KEY(id)
);

CREATE TABLE IF NOT EXISTS movie_types(
	id SERIAL,
	type VARCHAR(34) NOT NULL UNIQUE,
	price FLOAT NOT NULL UNIQUE,
	CONSTRAINT movie_type_id_k PRIMARY KEY(id)
);

CREATE TABLE IF NOT EXISTS movies(
    id SERIAL,
    title VARCHAR(256) NOT NULL,
    director VARCHAR(256) NOT NULL,
    description TEXT,
    length INT NOT NULL,
	url VARCHAR(256) NOT NULL,
    CONSTRAINT  movie_id_k PRIMARY KEY(id)
);

CREATE TABLE IF NOT EXISTS movie_movie_types(
	id SERIAL,
	movie_id INT,
	movie_type_id INT,
	CONSTRAINT mmt_id_k PRIMARY KEY(id),
	FOREIGN KEY (movie_id) REFERENCES movies(id),
	FOREIGN KEY (movie_type_id) REFERENCES movie_types(id)
);

CREATE TABLE IF NOT EXISTS movie_halls(
    id SERIAL,
    name VARCHAR(10) NOT NULL,
    number_of_seats INT NOT NULL,
    CONSTRAINT movie_hall_id_k PRIMARY KEY(id)
);

CREATE TABLE IF NOT EXISTS screenings(
    id SERIAL,
    movie_movie_type_id INT NOT NULL,
    movie_hall_id INT NOT NULL,
    start_of_screening   TIMESTAMP,
    CONSTRAINT screening_id_k PRIMARY KEY(id),
    CONSTRAINT fk_screening_movie
        FOREIGN KEY(movie_movie_type_id)
            REFERENCES movie_movie_types(id),
    CONSTRAINT fk_screening_movie_hall
        FOREIGN KEY(movie_hall_id)
            REFERENCES movie_halls(id)
);

CREATE TABLE IF NOT EXISTS seats(
    id SERIAL,
    row INT NOT NULL,
    col INT NOT NULL,
    movie_hall_id INT NOT NULL,
    CONSTRAINT seat_id_k PRIMARY KEY(id),
    CONSTRAINT fk_seat_movie_hall
        FOREIGN KEY(movie_hall_id)
            REFERENCES movie_halls(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS reservation_types(
    id SERIAL,
    type VARCHAR(20) UNIQUE,
    CONSTRAINT reservation_type_id_k PRIMARY KEY(id)
);

CREATE TABLE IF NOT EXISTS discount_types(
	id SERIAL,
	type VARCHAR(32) NOT NULL UNIQUE,
	discount INT NOT NULL,
	CONSTRAINT discount_type_id_k PRIMARY KEY(id)
);

CREATE TABLE IF NOT EXISTS reservations(
    id SERIAL,
    screening_id INT,
    customer_id INT,
    reserved BOOLEAN,
    paid BOOLEAN,
    active BOOLEAN NOT NULL,
    reservation_type_id INT NOT NULL,
    CONSTRAINT reservation_id_k PRIMARY KEY(id),
    CONSTRAINT fk_reservation_screening
        FOREIGN KEY(screening_id)
            REFERENCES screenings(id),
    CONSTRAINT fk_reservation_customer
        FOREIGN KEY(customer_id)
            REFERENCES customers(id)
		ON DELETE SET NULL,
    CONSTRAINT fk_reservation_type
        FOREIGN KEY(reservation_type_id)
            REFERENCES reservation_types(id)
);


CREATE TABLE IF NOT EXISTS reserved_seats(
    id SERIAL,
    seat_id INT NOT NULL,
    reservation_id INT NOT NULL,
    screening_id INT NOT NULL,
    discount_type_id  INT NOT NULL,
    CONSTRAINT reserved_seat_id_k PRIMARY KEY(id),
    CONSTRAINT fk_seat_reserver
        FOREIGN KEY(seat_id)
            REFERENCES seats(id),
    CONSTRAINT fk_reservation
        FOREIGN KEY(reservation_id)
            REFERENCES reservations(id),
    CONSTRAINT fk_screening
	FOREIGN KEY(screening_id)
	    REFERENCES screenings(id),
    FOREIGN KEY (discount_type_id) REFERENCES discount_types(id)
);

