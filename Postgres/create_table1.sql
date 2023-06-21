CREATE TABLE IF NOT EXISTS public.movies
(
    movieid character varying(255) PRIMARY KEY,
    title character varying(255),
    runtimeminutes integer,
    budgetm integer,
    boxofficem integer,
    awardnominations integer,
    awardwins integer,
    rtscore integer
)
