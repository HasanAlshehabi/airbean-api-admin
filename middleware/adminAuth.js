import jwt from "jsonwebtoken";

const SECRET = process.env.JWT_SECRET || "supersecret123";

// Verifierar token och lägger in decoded info i req.user
export function verifyToken(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader?.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Ingen token hittades" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, SECRET);
    req.user = decoded; // 🧠 spara userId & role
    next();
  } catch (err) {
    return res.status(403).json({ error: "Ogiltig token" });
  }
}

// Kontroll att användaren har rollen admin
export function requireAdmin(req, res, next) {
  if (!req.user || !req.user.role.includes("admin")) {
    return res.status(403).json({ error: "Admin access required" });
  }
  next();
}
