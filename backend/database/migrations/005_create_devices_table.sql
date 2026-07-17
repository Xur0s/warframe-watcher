CREATE TABLE app_data.devices (
    device_id UUID PRIMARY KEY,
    expo_push_token TEXT NOT NULL UNIQUE,
    last_seen TIMESTAMPTZ NOT NULL DEFAULT NOW()
);