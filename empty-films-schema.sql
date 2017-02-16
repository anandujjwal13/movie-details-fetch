--
-- PostgreSQL database dump
--

-- Dumped from database version 9.6.1
-- Dumped by pg_dump version 9.6.1

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SET check_function_bodies = false;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: plpgsql; Type: EXTENSION; Schema: -; Owner: 
--

CREATE EXTENSION IF NOT EXISTS plpgsql WITH SCHEMA pg_catalog;


--
-- Name: EXTENSION plpgsql; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION plpgsql IS 'PL/pgSQL procedural language';


SET search_path = public, pg_catalog;

SET default_tablespace = '';

SET default_with_oids = false;

--
-- Name: movies; Type: TABLE; Schema: public; Owner: anandujjwal
--

CREATE TABLE movies (
    moviename text NOT NULL,
    releasedate text,
    actors text[] DEFAULT '{}'::text[],
    studio text
);


ALTER TABLE movies OWNER TO anandujjwal;

--
-- Data for Name: movies; Type: TABLE DATA; Schema: public; Owner: anandujjwal
--

COPY movies (moviename, releasedate, actors, studio) FROM stdin;
\.


--
-- Name: movies movies_pkey; Type: CONSTRAINT; Schema: public; Owner: anandujjwal
--

ALTER TABLE ONLY movies
    ADD CONSTRAINT movies_pkey PRIMARY KEY (moviename);


--
-- PostgreSQL database dump complete
--

