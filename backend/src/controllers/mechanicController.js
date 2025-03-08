const Mechanic = require('../models/Mechanic');

exports.createMechanic = async (req, res) => {
  try {
    const mechanic = await Mechanic.create(req.body);
    return res.status(201).json(mechanic);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

exports.getMechanics = async (req, res) => {
  try {
    const mechanics = await Mechanic.find();
    return res.json(mechanics);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

exports.getMechanicById = async (req, res) => {
  try {
    const mechanic = await Mechanic.findById(req.params.id);
    if (!mechanic) {
      return res.status(404).json({ message: 'Mechanic not found' });
    }
    return res.json(mechanic);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

exports.updateMechanic = async (req, res) => {
  try {
    const mechanic = await Mechanic.findByIdAndUpdate(req.params.id, req.body, {
      new: true
    });
    if (!mechanic) {
      return res.status(404).json({ message: 'Mechanic not found' });
    }
    return res.json(mechanic);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

exports.deleteMechanic = async (req, res) => {
  try {
    const mechanic = await Mechanic.findByIdAndDelete(req.params.id);
    if (!mechanic) {
      return res.status(404).json({ message: 'Mechanic not found' });
    }
    return res.json({ message: 'Mechanic deleted' });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
