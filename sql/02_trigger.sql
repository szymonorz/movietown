CREATE OR REPLACE FUNCTION create_seats()
	RETURNS TRIGGER
	LANGUAGE PLPGSQL
AS $$
DECLARE
	row int:=1;
	col int:=1;
BEGIN
	FOR i IN 1..NEW.number_of_seats
	LOOP
		RAISE NOTICE 'i:% row:% col:%', i, row, col;
		INSERT INTO seats(row, col, movie_hall_id) 
		VALUES (row, col, NEW.id);
		col := col + 1;
		IF MOD(i,10) = 0 THEN
			row := row + 1;
			col := 1;
		END IF;
	END LOOP;
	RETURN NEW;
END;
$$;

CREATE OR REPLACE TRIGGER create_seats_trigger
	AFTER INSERT
	ON movie_halls
	FOR EACH ROW
	EXECUTE PROCEDURE create_seats();
