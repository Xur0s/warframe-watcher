CREATE TABLE app_data.fissure_preferences (
    preference_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    device_id UUID NOT NULL,
    planet TEXT,
    node TEXT,
    enemy_faction TEXT,
    mission_type TEXT,
    tier TEXT,
    is_storm BOOLEAN,
    is_hard BOOLEAN,

    CONSTRAINT fissure_preferences_device_fk
    FOREIGN KEY (device_id)
    REFERENCES app_data.devices(device_id)
    ON DELETE CASCADE
);