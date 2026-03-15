CREATE TABLE IF NOT EXISTS wfdata.fissures (
    id VARCHAR(45) NOT NULL PRIMARY KEY,
    activation TIMESTAMPTZ NOT NULL,
    expiry TIMESTAMPTZ NOT NULL,
    planet VARCHAR(15) NOT NULL,
    node VARCHAR(30) NOT NULL,
    enemy_faction VARCHAR(15) NOT NULL,
    mission_type VARCHAR(15) NOT NULL,
    tier VARCHAR(15) NOT NULL,
    expired BOOLEAN NOT NULL,
    is_storm BOOLEAN NOT NULL,
    is_hard BOOLEAN NOT NULL
);

GRANT SELECT, INSERT, UPDATE, DELETE ON TABLE wfdata.fissures TO worker;

GRANT SELECT ON TABLE wfdata.fissures TO api;