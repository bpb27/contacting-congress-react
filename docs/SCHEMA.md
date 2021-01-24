## states
id (PK)
abbr
name

## zip_codes
id (PK)
zip
state_id (FK)
district

## member
id
name
state_id (FK)
district
level
active
