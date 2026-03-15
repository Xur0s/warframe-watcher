#!/usr/bin/env bash

set -euo pipefail

for i in {1..10}; do
    if psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" -c '\l' >/dev/null 2>&1; then
        break
    fi
    sleep 1
done

psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" <<-EOSQL
    DO
    \$\$
    BEGIN
        IF NOT EXISTS (SELECT FROM pg_catalog.pg_roles WHERE rolname='worker') THEN
            CREATE ROLE worker LOGIN PASSWORD '${DB_PASSWORD_WORKER}';
        END IF;
        IF NOT EXISTS(SELECT FROM pg_catalog.pg_roles WHERE rolname='api') THEN
            CREATE ROLE api LOGIN PASSWORD '${DB_PASSWORD_API}';
        END IF;
    END;
    \$\$;

    GRANT CONNECT ON DATABASE ${POSTGRES_DB} TO worker;
    GRANT CONNECT ON DATABASE ${POSTGRES_DB} TO api;
EOSQL