import Program from "../../models/soups/Program.model.js";

export const getProgram = async (req, res) => {
  const program = await Program.findOne();
  res.json({ success: true, program });
};

export const updateProgram = async (req, res) => {
  const program = await Program.findOneAndUpdate({}, req.body, { new: true });
  res.json({ success: true, program });
};
