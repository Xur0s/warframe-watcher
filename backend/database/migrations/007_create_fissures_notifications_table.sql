CREATE TABLE app_data.fissures_notfication (
    fissure_id UUID NOT NULL,
    device_id VARCHAR(45) NOT NULL,
    status VARCHAR(15) NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

    CONSTRAINT fissures_notfication_pk
        PRIMARY KEY (fissure_id, device_id),

    CONSTRAINT fissures_notfication_fissure_id_fk
        FOREIGN KEY (fissure_id)
        REFERENCES app_data.fissures(id)
        ON DELETE CASCADE,

    CONSTRAINT fissures_notfication_device_id_fk
        FOREIGN KEY (device_id)
        REFERENCES app_data.devices(device_id)
        ON DELETE CASCADE
)

GRANT SELECT, INSERT, UPDATE, DELETE 
ON TABLE app_data.fissures_notification 
TO api;