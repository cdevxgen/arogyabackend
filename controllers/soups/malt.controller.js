import Malt from "../../models/soups/Malt.model.js";

export const createMalt = async (req, res) => {
  const malt = await Malt.create(req.body);
  res.status(201).json({ success: true, malt });
};

export const getAllMalts = async (req, res) => {
  const malts = await Malt.find({ is_active: true });
  res.json({ success: true, malts });
};

export const updateMalt = async (req, res) => {
  const malt = await Malt.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.json({ success: true, malt });
};

export const deleteMalt = async (req, res) => {
  await Malt.findByIdAndUpdate(req.params.id, { is_active: false });
  res.json({ success: true, message: "Malt disabled" });
};
