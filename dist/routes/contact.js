import { Router } from "express";
import sendMail from "../utils/mailSender.js";
import rateLimit from "express-rate-limit";
import { z } from "zod";
const router = Router();
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    limit: 5,
    standardHeaders: true,
    legacyHeaders: false,
    message: { error: "Trop de messages envoyés, veuillez réessayer plus tard" }
});
const sanitizer = z.object({
    name: z.string().trim().min(1),
    email: z.email().max(200),
    message: z.string().trim().min(10).max(1000),
    pot2miel: z.string().optional()
});
router.post("/contact", limiter, async (req, res) => {
    const parsed = sanitizer.safeParse(req.body);
    if (!parsed.success) {
        res.status(400).json({ error: "Veuillez remplir tous les champs obligatoires et vérifier votre adresse mail" });
        return;
    }
    const { name, email, message, pot2miel } = parsed.data;
    //bot
    if (pot2miel) {
        res.status(200).json({ message: "Message envoyé !" });
        return;
    }
    try {
        await sendMail({
            name: name,
            email: email,
            message: message
        });
        res.status(200).json({ message: "Message envoyé !" });
    }
    catch (err) {
        console.log("Failed to send email", err);
        res.status(500).json({ error: "Erreur lors de l'envoi du mail" });
    }
});
export default router;
