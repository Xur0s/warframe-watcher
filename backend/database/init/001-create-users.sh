#!/usr/bin/env bash

set -euo pipefail

psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" \
    <<-EOSQL
    DO
    \$\$
    BEGIN
        IF NOT EXISTS (SELECT FROM pg_catalog.pg_roles WHERE rolname='worker') THEN
            CREATE ROLE worker LOGIN PASSWORD '${DB_WORKER_PASSWORD}';
        END IF;
        IF NOT EXISTS(SELECT FROM pg_catalog.pg_roles WHERE rolname='api') THEN
            CREATE ROLE api LOGIN PASSWORD '${DB_API_PASSWORD}';
        END IF;
        IF NOT EXISTS(SELECT FROM pg_catalog.pg_roles WHERE rolname='admin') THEN
            CREATE ROLE admin LOGIN PASSWORD '${DB_ADMIN_PASSWORD}';
        END IF;
    END;
    \$\$;

    GRANT CONNECT ON DATABASE ${POSTGRES_DB} TO worker;
    GRANT CONNECT ON DATABASE ${POSTGRES_DB} TO api;
    GRANT CONNECT ON DATABASE ${POSTGRES_DB} TO admin;

    ALTER DATABASE ${POSTGRES_DB} OWNER TO admin;
EOSQL