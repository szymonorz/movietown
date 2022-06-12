INSERT INTO reservation_types(type) VALUES('online');
INSERT INTO reservation_types(type) VALUES('przez telefon');
INSERT INTO reservation_types(type) VALUES('na miejscu');

INSERT INTO movie_types(type, price) VALUES('2D',12.50);
INSERT INTO movie_types(type, price) VALUES('3D', 15.00);

INSERT INTO discount_types(type, discount) VALUES('normal', 0);
INSERT INTO discount_types(type, discount) VALUES('dziecko', 15);
INSERT INTO discount_types(type, discount) VALUES('student', 20);
INSERT INTO discount_types(type, discount) VALUES('senior', 30);

INSERT INTO rows(seat_limit) VALUES(10);
INSERT INTO rows(seat_limit) VALUES(18);

INSERT INTO movie_halls(name) VALUES('DN');
INSERT INTO movie_halls(name) VALUES('DZ');
INSERT INTO movie_halls(name) VALUES('SN');

INSERT INTO movie_hall_rows(row_id, movie_hall_id, row_number) VALUES (1, 1, 1);
INSERT INTO movie_hall_rows(row_id, movie_hall_id, row_number) VALUES (2, 1, 2);
INSERT INTO movie_hall_rows(row_id, movie_hall_id, row_number) VALUES (1, 1, 3);

INSERT INTO movies(title, director, description, length, url) VALUES('Spiderman: Far From Home','Jon Watts','Following the events of Avengers: Endgame (2020), Spider-Man must step up to take on new threats in a world that has changed forever.',122, 'http://localhost:4000/image/spidrman.jpg');
INSERT INTO movies(title, director, description, length, url) VALUES('Doctor Strange in the Multiverse of Madness','Sam Raimi','Dr. Stephen Strange casts a forbidden spell that opens the doorway to the multiverse, including alternate versions of himself, whose threat to humanity is too great for the combined forces of Strange, Wong, and Wanda Maximoff.',126, 'http://localhost:4000/image/multiberse.jpg');
INSERT INTO movies(title, director, description, length, url) VALUES('The Northman','Robert Eggers','From visionary director Robert Eggers comes The Northman, an action-filled epic that follows a young Viking prince on his quest to avenge his father''s murder',137, 'http://localhost:4000/image/north.jpg');


INSERT INTO movie_movie_types(movie_id, movie_type_id) VALUES(1,1);
INSERT INTO movie_movie_types(movie_id, movie_type_id) VALUES(1,2);
INSERT INTO movie_movie_types(movie_id, movie_type_id) VALUES(2,1);
INSERT INTO movie_movie_types(movie_id, movie_type_id) VALUES(2,2);
INSERT INTO movie_movie_types(movie_id, movie_type_id) VALUES(3,1);
INSERT INTO movie_movie_types(movie_id, movie_type_id) VALUES(3,2);

INSERT INTO screenings(movie_movie_type_id, movie_hall_id, start_of_screening) 
VALUES (1,1,'2022-06-25T15:30:00');
INSERT INTO screenings(movie_movie_type_id, movie_hall_id, start_of_screening) 
VALUES (1,1,'2022-06-13T15:30:00');
INSERT INTO screenings(movie_movie_type_id, movie_hall_id, start_of_screening) 
VALUES (1,1,'2022-06-14T08:30:00');
INSERT INTO screenings(movie_movie_type_id, movie_hall_id, start_of_screening) 
VALUES (1,1,'2022-06-10T10:30:00');
INSERT INTO screenings(movie_movie_type_id, movie_hall_id, start_of_screening) 
VALUES (1,1,'2022-06-12T15:30:00');
INSERT INTO screenings(movie_movie_type_id, movie_hall_id, start_of_screening) 
VALUES (1,1,'2022-06-13T10:30:00');
INSERT INTO screenings(movie_movie_type_id, movie_hall_id, start_of_screening) 
VALUES (1,1,'2022-06-12T15:30:00');

INSERT INTO screenings(movie_movie_type_id, movie_hall_id, start_of_screening) 
VALUES (3,2,'2022-06-25T15:30:00');
INSERT INTO screenings(movie_movie_type_id, movie_hall_id, start_of_screening) 
VALUES (3,2,'2022-06-09T15:30:00');
INSERT INTO screenings(movie_movie_type_id, movie_hall_id, start_of_screening) 
VALUES (3,2,'2022-06-13T08:30:00');
INSERT INTO screenings(movie_movie_type_id, movie_hall_id, start_of_screening) 
VALUES (3,2,'2022-06-10T10:30:00');
INSERT INTO screenings(movie_movie_type_id, movie_hall_id, start_of_screening) 
VALUES (3,2,'2022-06-10T15:30:00');
INSERT INTO screenings(movie_movie_type_id, movie_hall_id, start_of_screening) 
VALUES (3,2,'2022-06-11T10:30:00');
INSERT INTO screenings(movie_movie_type_id, movie_hall_id, start_of_screening) 
VALUES (3,2,'2022-06-12T15:30:00');

INSERT INTO screenings(movie_movie_type_id, movie_hall_id, start_of_screening) 
VALUES (6,3,'2022-06-25T15:30:00');
INSERT INTO screenings(movie_movie_type_id, movie_hall_id, start_of_screening) 
VALUES (6,3,'2022-06-13T15:30:00');
INSERT INTO screenings(movie_movie_type_id, movie_hall_id, start_of_screening) 
VALUES (6,3,'2022-06-06T08:30:00');
INSERT INTO screenings(movie_movie_type_id, movie_hall_id, start_of_screening) 
VALUES (6,3,'2022-06-15T10:30:00');
INSERT INTO screenings(movie_movie_type_id, movie_hall_id, start_of_screening) 
VALUES (6,3,'2022-06-12T15:30:00');
INSERT INTO screenings(movie_movie_type_id, movie_hall_id, start_of_screening) 
VALUES (6,3,'2022-06-13T10:30:00');
INSERT INTO screenings(movie_movie_type_id, movie_hall_id, start_of_screening) 
VALUES (6,3,'2022-06-14T15:30:00');

