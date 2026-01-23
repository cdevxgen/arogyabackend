import BulkRequest from "../models/BulkRequest.model.js";

/* ---------------- CREATE ---------------- */
export const createBulkRequest = async (req, res) => {
  try {
    const bulkRequest = await BulkRequest.create({
      ...req.body,
      requestedBy: req.user.id,
    });

    res.status(201).json({
      success: true,
      data: bulkRequest,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* ---------------- READ ALL ---------------- */
export const getAllBulkRequests = async (req, res) => {
  try {
    const requests = await BulkRequest.find()
      .populate("requestedBy", "username email role")
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      count: requests.length,
      data: requests,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* ---------------- READ ONE ---------------- */
export const getBulkRequestById = async (req, res) => {
  try {
    const request = await BulkRequest.findById(req.params.id).populate(
      "requestedBy",
      "username email"
    );

    if (!request) return res.status(404).json({ message: "Request not found" });

    res.json({ success: true, data: request });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* ---------------- UPDATE ---------------- */
export const updateBulkRequest = async (req, res) => {
  try {
    const updated = await BulkRequest.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!updated) return res.status(404).json({ message: "Request not found" });

    res.json({
      success: true,
      message: "Bulk request updated",
      data: updated,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* ---------------- DELETE ---------------- */
export const deleteBulkRequest = async (req, res) => {
  try {
    const deleted = await BulkRequest.findByIdAndDelete(req.params.id);

    if (!deleted) return res.status(404).json({ message: "Request not found" });

    res.json({
      success: true,
      message: "Bulk request deleted",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
