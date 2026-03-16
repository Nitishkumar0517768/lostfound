const Claim = require('../../models/Claim');

// Submit a new claim
exports.createClaim = async (req, res) => {
  try {
    const claim = await Claim.create(req.body);
    res.status(201).json({ success: true, data: claim });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get claims for a specific item
exports.getClaimsForItem = async (req, res) => {
  try {
    const claims = await Claim.find({ itemId: req.params.itemId }).sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: claims });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Update claim status
exports.updateClaimStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const claim = await Claim.findByIdAndUpdate(
      req.params.claimId,
      { status },
      { new: true, runValidators: true }
    );
    
    if (!claim) {
      return res.status(404).json({ success: false, message: 'Claim not found' });
    }
    
    res.status(200).json({ success: true, data: claim });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
