dropdb -U anandujjwal films-tests
createdb -U anandujjwal films-tests
psql -U anandujjwal -d films-tests -f empty-films-schema.sql