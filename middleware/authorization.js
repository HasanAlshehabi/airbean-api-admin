import { getActiveUserId } from "../globalActiveUser/globalActiveUser.js";

export function requireAuth(req, res, next) {
  const userId = getActiveUserId();
  if (!userId) {
    return res.status(403).json({ error: "Not logged in" });
  }
  next();
}
export function allowGuestOrUser(req, res, next) {
  const userId = getActiveUserId();
  const { guestId, cartId } = req.body;

  if ((!userId && !guestId) || !cartId) {
    return res.status(403).json({ error: "Not logged in or missing guest ID" });
  }

  next();
}
