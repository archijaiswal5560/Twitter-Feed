const { TwitterHandle } = require("../../models");

// Add new Twitter handle
exports.addHandle = async (req, res) => {
  try {
    const { handle } = req.body;

    if (!handle || handle.trim() === "") {
      return res.status(400).json({ message: "Handle is required" });
    }

    const existingHandle = await TwitterHandle.findOne({
      where: { handle }
    });

    if (existingHandle) {
      return res.status(409).json({ message: "Handle already exists" });
    }

    const newHandle = await TwitterHandle.create({ handle });

    res.status(201).json({
      message: "Twitter handle added successfully",
      data: newHandle
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all Twitter handles
exports.getHandles = async (req, res) => {
  try {
    const handles = await TwitterHandle.findAll();
    res.status(200).json(handles);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Toggle handle active/inactive
exports.toggleHandle = async (req, res) => {
  try {
    const { uuid } = req.params;

    const handle = await TwitterHandle.findByPk(uuid);

    if (!handle) {
      return res.status(404).json({ message: "Handle not found" });
    }

    handle.is_active = !handle.is_active;
    await handle.save();

    res.status(200).json({
      message: "Handle status updated",
      data: handle
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
