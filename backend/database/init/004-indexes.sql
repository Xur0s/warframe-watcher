CREATE INDEX IF NOT EXISTS idx_fissures_expiring
ON wfdata.fissures (expiry)
WHERE expired = false;

CREATE INDEX IF NOT EXISTS idx_fissures_normal
ON wfdata.fissures (expired)
WHERE is_storm = false AND is_hard = false;

CREATE INDEX IF NOT EXISTS idx_fissures_storm
ON wfdata.fissures (expired)
WHERE is_storm = true;

CREATE INDEX IF NOT EXISTS idx_fissures_hard
ON wfdata.fissures (expired)
WHERE is_hard = true;
