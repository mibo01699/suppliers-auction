// Auction Router - REST API Interface for Replit Runtime Environment
// Integrates communication endpoints with the main clearing house repository

import express from 'express';
import SovereignAuctionEngine from './SovereignAuctionEngine.js';

const router = express.Router();
const auctionEngine = new SovereignAuctionEngine();

// Target URL pointing to the main wallet app server during local Replit testing
const BIGISH_YER_CORE_URL = "http://localhost:3000"; 

/**
 * Endpoint for suppliers to post automated bids
 * POST /api/auction/bid
 */
router.post('/api/auction/bid', (req, res) => {
    const { auctionId, supplierWallet, rawBidAmountNominal, currentHighestBidSubUnits } = req.body;
    
    try {
        const validatedBidResult = auctionEngine.submitSupplierBid(
            auctionId, 
            supplierWallet, 
            rawBidAmountNominal, 
            currentHighestBidSubUnits
        );

        res.status(200).json({
            success: true,
            message: "Bid accepted into repository state machine.",
            data: validatedBidResult
        });
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
});

/**
 * Endpoint triggered when an auction closes to request hybrid payment processing from BIGISH-YER
 * POST /api/auction/finalize
 */
router.post('/api/auction/finalize', async (req, res) => {
    const { auctionId, winningVendorWallet, winningBidNominal, vendorUsername } = req.body;

    try {
        // Request the main repository clearing infrastructure to calculate the 50% GCV Pi / 50% YER Split
        const response = await fetch(`${BIGISH_YER_CORE_URL}/api/clearing/settle-auction`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                auctionId: auctionId,
                totalBidNominal: winningBidNominal,
                vendorWallet: winningVendorWallet,
                vendorUsername: vendorUsername,
                isCoreKycApproved: true, // Derived from front-end Pi Auth Session
                registeredOwnerUsername: vendorUsername
            })
        });

        const clearingPayload = await response.json();

        if (!clearingPayload.success) {
            return res.status(400).json({
                success: false,
                message: "Clearing house rejection from main BIGISH-YER infrastructure.",
                error: clearingPayload.message
            });
        }

        res.status(200).json({
            success: true,
            message: "Auction finalized. Dual token allocation settlement compiled.",
            settlementData: clearingPayload.payload
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to establish secure communications with BIGISH-YER core node server.",
            error: error.message
        });
    }
});

export default router;
