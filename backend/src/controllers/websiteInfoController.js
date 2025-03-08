const WebsiteInfo = require('../models/WebsiteInfo');

exports.getWebsiteInfo = async (req, res) => {
  try {
    // Usually just one record for website info
    const info = await WebsiteInfo.findOne({});
    return res.json(info);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

exports.updateWebsiteInfo = async (req, res) => {
  try {
    let info = await WebsiteInfo.findOne({});
    if (!info) {
      // If not exist, create
      info = await WebsiteInfo.create(req.body);
    } else {
      // Else update
      Object.assign(info, req.body);
      info.updatedAt = new Date();
      await info.save();
    }
    return res.json(info);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};
