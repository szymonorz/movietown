INSERT INTO reservation_types(type) VALUES('online');
INSERT INTO reservation_types(type) VALUES('przez telefon');
INSERT INTO reservation_types(type) VALUES('na miejscu');

INSERT INTO roles(role_name) VALUES('manager');
INSERT INTO roles(role_name) VALUES('wagie');

INSERT INTO movie_types(type, price) VALUES('2D',12.50);
INSERT INTO movie_types(type, price) VALUES('3D', 15.00);

INSERT INTO discount_types(type, discount) VALUES('student', 20);
INSERT INTO discount_types(type, discount) VALUES('kid', 15);
INSERT INTO discount_types(type, discount) VALUES('senior', 30);

INSERT INTO movie_halls(name, number_of_seats) VALUES('DN',100);
INSERT INTO movie_halls(name, number_of_seats) VALUES('DZ',60);

INSERT INTO movies(title, director, description, length) VALUES('AAAAAAA','AAAA','aa',120);
INSERT INTO movies(title, director, description, length) VALUES('BBBBBBBB','AAAA','ba',120);

INSERT INTO movie_movie_types(movie_id, movie_type_id) VALUES(1,1);
INSERT INTO movie_movie_types(movie_id, movie_type_id) VALUES(1,2);
INSERT INTO movie_movie_types(movie_id, movie_type_id) VALUES(2,1);
INSERT INTO movie_movie_types(movie_id, movie_type_id) VALUES(2,2);

INSERT INTO screenings(movie_id, movie_hall_id, start_of_screening) 
VALUES (1,1,'2022-04-25T15:30:00');


--password is deeznutz
INSERT INTO employees(name, surname, phone_number, email, username, password, role_id)
VALUES ('daft','cunt',987123456,'dsadsa','zzzz','$2y$15$zOnUUBDaeNo0c10.h.O0bedXi/h7CH.AoFMeBHsYebPBHq1ZwPjXi',1);
