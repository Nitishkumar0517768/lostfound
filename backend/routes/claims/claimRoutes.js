const express = require('express');
const router = express.Router();
const {
  createClaim,
  getClaimsForItem,
  updateClaimStatus
} = require('../../controllers/claims/claimController');

// POST /api/claims
router.route('/').post(createClaim);

// GET /api/claims/:itemId
router.route('/:itemId').get(getClaimsForItem);

// PUT /api/claims/:claimId
router.route('/:claimId').put(updateClaimStatus);

module.exports = router;
