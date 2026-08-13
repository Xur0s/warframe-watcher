import FissureNotficationService from "./src/api/services/FissureNotificationService.js";
import FissureNotificationRepository from "./src/api/repositories/FissureNotificationRepository.js";
import NotificationService from "./src/api/services/NotificationService";
import ExpoService from "./src/api/services/ExpoService.js";
import NotificationRepository from "./src/api/repositories/NotificationRepository";

async function handleNewFissures(fissures) {
  // Used for the "fissure notfication" database table
  const fissureNotificationRepository = new FissureNotificationRepository();
  const fissureNotficationService = new FissureNotficationService(
    fissureNotificationRepository,
  );

  // Used to send notifications using expo tokens
  const expoService = new ExpoService();
  const notificationRepository = new NotificationRepository();
  const notificationService = new NotificationService(
    notificationRepository,
    expoService,
  );

  try {
    // Record all fissures currently avaliable into "fissure notfication" table, if not already inserted
    await Promise.all(
      fissures.map((fissure) => fissureNotficationService.insert(fissure)),
    );

    // Get fissures ids which have not been sent out as notifications
    const unsentIds = await fissureNotficationService.getAllUnsentFissuresIds();
    const unsentIdSet = new Set(unsentIds);

    // Only get fissures from the "fissures" array that have ids that haven't been sent
    const unsentFissures = fissures.filter((fissure) =>
      unsentIdSet.has(fissure.id),
    );

    // Send notifications about all unsent fissures to users who are intrested
    await Promise.all(
      unsentFissures.map((fissure) =>
        notificationService.missionNotifications(fissure),
      ),
    );

    // For all of the newly sent notfications, mark those fissures as being sent in the database
    await Promise.all(
      unsentFissures.map((fissure) =>
        fissureNotficationService.markSent(fissure),
      ),
    );
  } catch (err) {
    console.err("Unable to sent notfications", err);
    throw new Error(err);
  }
}

export default handleNewFissures;
