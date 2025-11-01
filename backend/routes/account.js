const express = require("express");
const { authMiddleware } = require("../middlewares");
const { Account } = require("../db");
const mongoose = require("mongoose");
const accountRouter = express.Router();
const z = require("zod");

const transactionSchema = z.object({
    to: z.string(),
    amount: z.number().positive()
});

accountRouter.get("/balance", authMiddleware, async (req, res) => {
    const account = await Account.findOne({ userId: req.userId });
    res.status(200).json({
        balance: account.balance
    });
});

accountRouter.post("/transfer", authMiddleware, async (req, res) => {
    const parseResult = transactionSchema.safeParse(req.body);
    if (!parseResult.success) {
        return res.status(400).json({
            message: "Invalid account"
        });
    }

    const { amount, to } = parseResult.data;
    const session = await mongoose.startSession();

    try {
        session.startTransaction();

        const account = await Account.findOne({ userId: req.userId }).session(session);
        if (!account || account.balance < amount) {
            await session.abortTransaction();
            return res.status(400).json({
                message: "Insufficient balance"
            });
        }

        const toAccount = await Account.findOne({ userId: to }).session(session);
        if (!toAccount) {
            await session.abortTransaction();
            return res.status(400).json({
                message: "Invalid account"
            });
        }

        await Account.updateOne({ userId: req.userId }, { $inc: { balance: -amount } }, { session });
        await Account.updateOne({ userId: to }, { $inc: { balance: amount } }, { session });

        await session.commitTransaction();
        res.json({
            message: "Transfer successful"
        });
    } catch (error) {
        await session.abortTransaction();
        res.status(400).json({
            message: "Transaction failed"
        });
    } finally {
        session.endSession();
    }
});

module.exports = { accountRouter };
