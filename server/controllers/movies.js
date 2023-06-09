const Movie = require("../models/Movie");
const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));

const handleQuerySort = (query) => {
  try {
    // convert the string to look like json object
    // example "id: -1, name: 1" to "{ "id": -1, "name": 1 }"
    const toJSONString = ("{" + query + "}").replace(
      /(\w+:)|(\w+ :)/g,
      (matched) => {
        return '"' + matched.substring(0, matched.length - 1) + '":';
      }
    );

    return JSON.parse(toJSONString);
  } catch (err) {
    return JSON.parse("{}"); // parse empty json if the clients input wrong query format
  }
};

const getMovies = async (req, res) => {
  const limit = req.query.limit;
  const page = req.query.page;
  const year = req.query.year;
  const fields = req.query.fields;
  const sort = handleQuerySort(req.query.sort);
  await Movie.find(
    year ? { release_date: { $regex: year, $options: "i" } } : {}
  )
    .select(fields ? fields.join(" ") : null)
    .limit(limit * 1)
    .skip((page - 1) * limit)
    .sort(sort)
    .then(async (result) => {
      const count = await Movie.countDocuments();
      res.status(200).json({
        result,
        totalPages: Math.ceil(count / limit),
        currentPage: page,
      });
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({ msg: error });
    });
};

const getMovieById = async (req, res) => {
  const id = req.params.id;
  await Movie.findOne({ id })
    .then(async (result) => {
      res.status(200).json(result);
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({ msg: error });
    });
};

module.exports = {
  getMovies,
  getMovieById,
};
