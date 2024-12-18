const { searchTerm } = require("../services/data.service");

async function searchdata(req, res) {
  const payload = req.body;

  if (!Array.isArray(payload)) {
    return res.status(400).json({
      status: 400,
      error: "Please enter search input as Array"
    });
  }

  try {
    const results = await searchTerm(payload);
    return res.status(200).json({
      status: 200,
      message: "Data Fatched successfully!",
      data: results
    });
  } catch (error) {
    return res.status(500).json({
      status: 500,
      message: "Something want wrong!",
      error: error
    });
  }
}

module.exports = { searchdata };
