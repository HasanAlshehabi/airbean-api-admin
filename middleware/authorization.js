// Kontrollera att användaren är inloggad
export function requireAuth(req, res, next) {
  if (!req.user || !req.user.userId) {
    return res.status(403).json({ error: "Not logged in" });
  }
  next();
}

// Tillåt antingen inloggad användare eller gäst med guestId
export function allowGuestOrUser(req, res, next) {
  const userId = req.user?.userId;
  const { guestId, cartId } = req.body;

  if ((!userId && !guestId) || !cartId) {
    return res.status(403).json({ error: "Not logged in or missing guest ID or cart ID" });
  }

  next();
}
