CREATE OR REPLACE FUNCTION create_seats()
	RETURNS TRIGGER
	LANGUAGE PLPGSQL
AS $$
BEGIN
	FOR i IN 1..NEW.seat_limit
	LOOP
		RAISE NOTICE 'i:% row:% seat:%', i, NEW.id, i;
		INSERT INTO seats(row_id, seat_number) 
		VALUES (NEW.id, i);
		END LOOP;
	RETURN NEW;
END;
$$;

CREATE OR REPLACE TRIGGER create_seats_trigger
	AFTER INSERT
	ON rows
	FOR EACH ROW
	EXECUTE PROCEDURE create_seats();
