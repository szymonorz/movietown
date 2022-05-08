CREATE OR REPLACE FUNCTION top4_movies()
RETURNS TABLE(id int, 
			title varchar(256), 
			director varchar(256), 
			description text,
			length int,
			url varchar(256),
			no_reservations bigint
) AS $$
BEGIN
	RETURN QUERY IN SELECT m.id, count(rs.*) as count FROM reservations r
		JOIN reserved_seats rs ON r.id = rs.reservation_id
		JOIN screenings s ON s.id = r.screening_id
		JOIN movie_movie_types mmt ON mmt.id = s.movie_movie_type_id
		JOIN movies m ON mmt.movie_id = m.id
		GROUP BY m.id ORDER BY count LIMIT 4;
END

$$ LANGUAGE 'plpgsql'
