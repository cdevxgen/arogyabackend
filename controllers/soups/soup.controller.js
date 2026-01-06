import Soup from "../../models/soups/Soup.model.js";

/**
 * CREATE
 */
export const createSoup = async (req, res) => {
  try {
    const soup = await Soup.create(req.body);
    res.status(201).json({ success: true, soup });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};

/**
 * READ ALL
 */
export const getAllSoups = async (req, res) => {
  const soups = await Soup.find({ is_active: true }).sort({ day_code: 1 });
  res.json({ success: true, count: soups.length, soups });
};

/**
 * READ ONE
 */
export const getSoupById = async (req, res) => {
  const soup = await Soup.findById(req.params.id);
  if (!soup) {
    return res.status(404).json({ success: false, message: "Soup not found" });
  }
  res.json({ success: true, soup });
};

/**
 * UPDATE
 */
export const updateSoup = async (req, res) => {
  const soup = await Soup.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.json({ success: true, soup });
};

/**
 * DELETE (Soft Delete)
 */
export const deleteSoup = async (req, res) => {
  await Soup.findByIdAndUpdate(req.params.id, { is_active: false });
  res.json({ success: true, message: "Soup disabled successfully" });
};
