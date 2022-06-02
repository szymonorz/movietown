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

INSERT INTO movie_hall_rows(row_id, movie_hall_id, row_number) VALUES (1, 1, 1);
INSERT INTO movie_hall_rows(row_id, movie_hall_id, row_number) VALUES (2, 1, 2);
INSERT INTO movie_hall_rows(row_id, movie_hall_id, row_number) VALUES (1, 1, 3);

INSERT INTO movies(title, director, description, length, url) VALUES('Pain and suffering','Jane Doe','A story about making this horrible project my god i hate it.',120, 'http://localhost:4000/image/painandsuffering.png');
INSERT INTO movies(title, director, description, length, url) VALUES('Spiderman: Far From Home','Jon Watts','Following the events of Avengers: Endgame (2019), Spider-Man must step up to take on new threats in a world that has changed forever.',120, 'http://localhost:4000/image/painandsuffering.png');
INSERT INTO movies(title, director, description, length, url) VALUES('Doctor Strange in the Multiverse of Madness','Sam Raimi','Dr. Stephen Strange casts a forbidden spell that opens the doorway to the multiverse, including alternate versions of himself, whose threat to humanity is too great for the combined forces of Strange, Wong, and Wanda Maximoff.',126, 'http://localhost:4000/image/painandsuffering.png');
INSERT INTO movies(title, director, description, length, url) VALUES('The Northman','Robert Eggers','From visionary director Robert Eggers comes The Northman, an action-filled epic that follows a young Viking prince on his quest to avenge his father''s murder',137, 'http://localhost:4000/image/painandsuffering.png');


INSERT INTO movie_movie_types(movie_id, movie_type_id) VALUES(1,1);
INSERT INTO movie_movie_types(movie_id, movie_type_id) VALUES(1,2);
INSERT INTO movie_movie_types(movie_id, movie_type_id) VALUES(2,1);
INSERT INTO movie_movie_types(movie_id, movie_type_id) VALUES(2,2);
INSERT INTO movie_movie_types(movie_id, movie_type_id) VALUES(3,1);
INSERT INTO movie_movie_types(movie_id, movie_type_id) VALUES(3,2);
INSERT INTO movie_movie_types(movie_id, movie_type_id) VALUES(4,1);
INSERT INTO movie_movie_types(movie_id, movie_type_id) VALUES(4,2);

INSERT INTO screenings(movie_movie_type_id, movie_hall_id, start_of_screening) 
VALUES (1,1,'2022-04-25T15:30:00');
INSERT INTO screenings(movie_movie_type_id, movie_hall_id, start_of_screening) 
VALUES (1,1,'2022-05-09T15:30:00');
INSERT INTO screenings(movie_movie_type_id, movie_hall_id, start_of_screening) 
VALUES (1,1,'2022-05-09T08:30:00');
INSERT INTO screenings(movie_movie_type_id, movie_hall_id, start_of_screening) 
VALUES (1,1,'2022-05-10T10:30:00');
INSERT INTO screenings(movie_movie_type_id, movie_hall_id, start_of_screening) 
VALUES (1,1,'2022-05-10T15:30:00');
INSERT INTO screenings(movie_movie_type_id, movie_hall_id, start_of_screening) 
VALUES (1,1,'2022-05-11T10:30:00');
INSERT INTO screenings(movie_movie_type_id, movie_hall_id, start_of_screening) 
VALUES (1,1,'2022-05-12T15:30:00');

INSERT INTO screenings(movie_movie_type_id, movie_hall_id, start_of_screening) 
VALUES (3,1,'2022-04-25T15:30:00');
INSERT INTO screenings(movie_movie_type_id, movie_hall_id, start_of_screening) 
VALUES (3,1,'2022-05-09T15:30:00');
INSERT INTO screenings(movie_movie_type_id, movie_hall_id, start_of_screening) 
VALUES (3,1,'2022-05-09T08:30:00');
INSERT INTO screenings(movie_movie_type_id, movie_hall_id, start_of_screening) 
VALUES (3,1,'2022-05-10T10:30:00');
INSERT INTO screenings(movie_movie_type_id, movie_hall_id, start_of_screening) 
VALUES (3,1,'2022-05-10T15:30:00');
INSERT INTO screenings(movie_movie_type_id, movie_hall_id, start_of_screening) 
VALUES (3,1,'2022-05-11T10:30:00');
INSERT INTO screenings(movie_movie_type_id, movie_hall_id, start_of_screening) 
VALUES (3,1,'2022-05-12T15:30:00');

INSERT INTO screenings(movie_movie_type_id, movie_hall_id, start_of_screening) 
VALUES (6,1,'2022-04-25T15:30:00');
INSERT INTO screenings(movie_movie_type_id, movie_hall_id, start_of_screening) 
VALUES (6,1,'2022-05-09T15:30:00');
INSERT INTO screenings(movie_movie_type_id, movie_hall_id, start_of_screening) 
VALUES (6,1,'2022-05-09T08:30:00');
INSERT INTO screenings(movie_movie_type_id, movie_hall_id, start_of_screening) 
VALUES (6,1,'2022-05-10T10:30:00');
INSERT INTO screenings(movie_movie_type_id, movie_hall_id, start_of_screening) 
VALUES (6,1,'2022-05-10T15:30:00');
INSERT INTO screenings(movie_movie_type_id, movie_hall_id, start_of_screening) 
VALUES (6,1,'2022-05-11T10:30:00');
INSERT INTO screenings(movie_movie_type_id, movie_hall_id, start_of_screening) 
VALUES (6,1,'2022-05-12T15:30:00');

