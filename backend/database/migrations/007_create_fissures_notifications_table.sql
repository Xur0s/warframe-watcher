CREATE TABLE app_data.fissures_notfication (
    fissure_id NOT NULL PRIMARY KEY,
    processed_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
)

GRANT SELECT, INSERT, UPDATE, DELETE ON TABLE app_data.fissures_notification TO api;